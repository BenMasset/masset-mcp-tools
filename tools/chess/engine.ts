/**
 * Check, Mate? chess engine wrapper.
 *
 * chess.js does ALL rules (legality, check, checkmate, stalemate, draws,
 * castling, promotion, en passant). This module never hand-rolls rules;
 * it only shapes chess.js output into the contract's types and never
 * throws on bad input.
 */

import { Chess, validateFen as chessValidateFen } from "chess.js";

export type Color = "white" | "black";

export interface Status {
  turn: Color;
  inCheck: boolean;
  gameOver: boolean;
  result: "checkmate" | "stalemate" | "draw-threefold" | "draw-fifty" | "draw-material" | null;
  winner: Color | null;
  materialBalance: number;
}

export interface MoveOutcome {
  ok: boolean;
  error?: string;
  legalSample?: string[];
  fen: string;
  moves: string[];
  san?: string;
  from?: string;
  to?: string;
  captured?: string | null;
  status: Status;
}

export interface PositionReport {
  turn: Color;
  legalMoves: string[];
  checksAvailable: string[];
  capturesAvailable: { san: string; captured: string; delta: number }[];
  hanging: { white: string[]; black: string[] };
  material: { white: number; black: number; balance: number };
  moveNumber: number;
  phase: "opening" | "middlegame" | "endgame";
  status: Status;
}

export const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const PIECE_VALUES: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

const FALLBACK_STATUS: Status = {
  turn: "white",
  inCheck: false,
  gameOver: false,
  result: null,
  winner: null,
  materialBalance: 0,
};

const UCI_RE = /^[a-h][1-8][a-h][1-8][qrbn]?$/i;

function toColor(chessColor: "w" | "b"): Color {
  return chessColor === "w" ? "white" : "black";
}

function opponentOf(chessColor: "w" | "b"): "w" | "b" {
  return chessColor === "w" ? "b" : "w";
}

export function validateFen(fen: string): { ok: boolean; error?: string } {
  if (typeof fen !== "string" || fen.trim().length === 0) {
    return { ok: false, error: "Invalid FEN: must be a non-empty string" };
  }
  try {
    return chessValidateFen(fen);
  } catch (e) {
    return { ok: false, error: `Invalid FEN: ${e instanceof Error ? e.message : String(e)}` };
  }
}

function materialFor(chess: Chess, color: "w" | "b"): number {
  let total = 0;
  for (const row of chess.board()) {
    for (const sq of row) {
      if (sq && sq.color === color) total += PIECE_VALUES[sq.type] ?? 0;
    }
  }
  return total;
}

function deriveStatus(chess: Chess): Status {
  const turn = toColor(chess.turn());
  const isCheckmate = chess.isCheckmate();
  const isStalemate = chess.isStalemate();
  const isThreefold = chess.isThreefoldRepetition();
  const isFifty = chess.isDrawByFiftyMoves();
  const isInsufficient = chess.isInsufficientMaterial();

  let result: Status["result"] = null;
  let winner: Color | null = null;
  if (isCheckmate) {
    result = "checkmate";
    winner = turn === "white" ? "black" : "white";
  } else if (isStalemate) {
    result = "stalemate";
  } else if (isThreefold) {
    result = "draw-threefold";
  } else if (isFifty) {
    result = "draw-fifty";
  } else if (isInsufficient) {
    result = "draw-material";
  }

  return {
    turn,
    inCheck: chess.inCheck(),
    gameOver: chess.isGameOver(),
    result,
    winner,
    materialBalance: materialFor(chess, "w") - materialFor(chess, "b"),
  };
}

export function statusOf(fen: string): Status {
  const validation = validateFen(fen);
  if (!validation.ok) return FALLBACK_STATUS;
  try {
    return deriveStatus(new Chess(fen));
  } catch {
    return FALLBACK_STATUS;
  }
}

/**
 * Best-effort reconstruction of the full game so chess.js's own repetition
 * counter reflects the whole sequence, not just this single fen. Falls back
 * to null (caller loads the bare fen instead) whenever the replay does not
 * land on the exact same fen, e.g. a custom starting position.
 */
function tryReconstructWithHistory(fen: string, moves: string[]): Chess | null {
  if (moves.length === 0) return null;
  try {
    const replay = new Chess(START_FEN);
    for (const san of moves) replay.move(san);
    return replay.fen() === fen ? replay : null;
  } catch {
    return null;
  }
}

function isUciMove(move: string): boolean {
  return UCI_RE.test(move.trim());
}

function parseUci(move: string): { from: string; to: string; promotion?: string } {
  const trimmed = move.trim().toLowerCase();
  const from = trimmed.slice(0, 2);
  const to = trimmed.slice(2, 4);
  const promotion = trimmed.length > 4 ? trimmed[4] : undefined;
  return promotion ? { from, to, promotion } : { from, to };
}

export function applyMove(fen: string, move: string, moves: string[]): MoveOutcome {
  const validation = validateFen(fen);
  if (!validation.ok) {
    return {
      ok: false,
      error: validation.error ?? "Invalid FEN",
      fen,
      moves,
      status: FALLBACK_STATUS,
    };
  }

  let chess: Chess;
  try {
    chess = tryReconstructWithHistory(fen, moves) ?? new Chess(fen);
  } catch (e) {
    return {
      ok: false,
      error: `Invalid FEN: ${e instanceof Error ? e.message : String(e)}`,
      fen,
      moves,
      status: FALLBACK_STATUS,
    };
  }

  try {
    const result = isUciMove(move) ? chess.move(parseUci(move)) : chess.move(move);
    return {
      ok: true,
      fen: chess.fen(),
      moves: [...moves, result.san],
      san: result.san,
      from: result.from,
      to: result.to,
      captured: result.captured ?? null,
      status: deriveStatus(chess),
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
      legalSample: chess.moves().slice(0, 8),
      fen,
      moves,
      status: deriveStatus(chess),
    };
  }
}

function hangingFor(chess: Chess, color: "w" | "b"): string[] {
  const opponent = opponentOf(color);
  const result: string[] = [];
  for (const row of chess.board()) {
    for (const sq of row) {
      if (!sq || sq.color !== color || sq.type === "k") continue;
      const enemyAttackers = chess.attackers(sq.square, opponent);
      const ownDefenders = chess.attackers(sq.square, color);
      if (enemyAttackers.length > 0 && ownDefenders.length === 0) {
        result.push(`${sq.type}@${sq.square}`);
      }
    }
  }
  return result;
}

function nonPawnMaterialTotal(chess: Chess): number {
  let total = 0;
  for (const row of chess.board()) {
    for (const sq of row) {
      if (!sq || sq.type === "p" || sq.type === "k") continue;
      total += PIECE_VALUES[sq.type] ?? 0;
    }
  }
  return total;
}

function queensOnBoard(chess: Chess): boolean {
  return chess.board().some((row) => row.some((sq) => sq?.type === "q"));
}

export function positionReport(fen: string): PositionReport {
  const validation = validateFen(fen);
  let chess: Chess;
  try {
    chess = new Chess(validation.ok ? fen : START_FEN);
  } catch {
    chess = new Chess(START_FEN);
  }

  const status = deriveStatus(chess);
  const legalMoves = chess.moves();
  const verboseMoves = chess.moves({ verbose: true });

  const checksAvailable = verboseMoves
    .filter((m) => m.san.endsWith("+") || m.san.endsWith("#"))
    .map((m) => m.san);

  const capturesAvailable = verboseMoves
    .filter((m) => m.captured)
    .map((m) => ({
      san: m.san,
      captured: m.captured as string,
      delta: PIECE_VALUES[m.captured as string] ?? 0,
    }));

  const hanging = { white: hangingFor(chess, "w"), black: hangingFor(chess, "b") };
  const white = materialFor(chess, "w");
  const black = materialFor(chess, "b");

  const fullmove = chess.moveNumber();
  let phase: "opening" | "middlegame" | "endgame";
  if (fullmove <= 10 && queensOnBoard(chess)) {
    phase = "opening";
  } else if (nonPawnMaterialTotal(chess) <= 13) {
    phase = "endgame";
  } else {
    phase = "middlegame";
  }

  return {
    turn: status.turn,
    legalMoves,
    checksAvailable,
    capturesAvailable,
    hanging,
    material: { white, black, balance: white - black },
    moveNumber: fullmove,
    phase,
    status,
  };
}

const WHITE_GLYPHS: Record<string, string> = {
  p: "♙", n: "♘", b: "♗", r: "♖", q: "♕", k: "♔",
};
const BLACK_GLYPHS: Record<string, string> = {
  p: "♟", n: "♞", b: "♝", r: "♜", q: "♛", k: "♚",
};

export function unicodeBoard(fen: string, orientation: Color = "white"): string {
  const validation = validateFen(fen);
  let chess: Chess;
  try {
    chess = new Chess(validation.ok ? fen : START_FEN);
  } catch {
    chess = new Chess(START_FEN);
  }

  const board = chess.board();
  const rows = orientation === "white" ? board : [...board].reverse().map((row) => [...row].reverse());
  const rankLabels = orientation === "white" ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8];
  const fileLabels =
    orientation === "white" ? ["a", "b", "c", "d", "e", "f", "g", "h"] : ["h", "g", "f", "e", "d", "c", "b", "a"];

  const lines: string[] = [];
  for (let i = 0; i < 8; i++) {
    const cells = rows[i].map((sq) => {
      if (!sq) return "·";
      return sq.color === "w" ? WHITE_GLYPHS[sq.type] : BLACK_GLYPHS[sq.type];
    });
    lines.push(`${rankLabels[i]} ${cells.join(" ")}`);
  }
  lines.push(`  ${fileLabels.join(" ")}`);
  return lines.join("\n");
}
