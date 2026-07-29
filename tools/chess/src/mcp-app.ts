/**
 * Check, Mate? inline card (MCP Apps iframe side).
 *
 * Host mode: the board arrives via chess_new_game / chess_move tool results
 * (structuredContent shaped as ChessCard, see CONTRACT.md). Legal moves for
 * click-to-move are computed locally with a bundled chess.js instance kept in
 * sync with the card's current fen, so highlighting destinations never needs
 * a round-trip.
 * Standalone mode (opened directly, no host): renders a fixed, non-interactive
 * demo position and tells the visitor to connect via MCP to actually play.
 */

import { App, applyDocumentTheme } from "@modelcontextprotocol/ext-apps";
import { Chess, type Move, type PieceSymbol, type Square } from "chess.js";
import "./fonts.css";
import "./mcp-app.css";

// ---------- Contract types (mirrors CONTRACT.md's ChessCard exactly) ----------

type Color = "white" | "black";

interface Status {
  turn: Color;
  inCheck: boolean;
  gameOver: boolean;
  result: "checkmate" | "stalemate" | "draw-threefold" | "draw-fifty" | "draw-material" | null;
  winner: Color | null;
  materialBalance: number;
}

interface LastMove {
  from: string;
  to: string;
  san: string;
}

interface ChessCard {
  kind: "chess";
  fen: string;
  moves: string[];
  playerColor: Color;
  lastMove: LastMove | null;
  status: Status;
  message: string;
}

// ---------- Constants ----------

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8];

const GLYPHS: Record<string, string> = {
  wp: "♙", wn: "♘", wb: "♗", wr: "♖", wq: "♕", wk: "♔",
  bp: "♟", bn: "♞", bb: "♝", br: "♜", bq: "♛", bk: "♚",
};

const PIECE_NAMES: Record<PieceSymbol, string> = {
  p: "pawn", n: "knight", b: "bishop", r: "rook", q: "queen", k: "king",
};

const PIECE_VALUE: Record<PieceSymbol, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

const PROMOTION_CHOICES: { letter: "q" | "r" | "b" | "n"; name: string }[] = [
  { letter: "q", name: "queen" },
  { letter: "r", name: "rook" },
  { letter: "b", name: "bishop" },
  { letter: "n", name: "knight" },
];

const DEMO_MOVES = [
  "e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d4", "exd4", "cxd4", "Bb4+",
  "Bd2", "Bxd2+", "Nbxd2", "d5", "exd5", "Nxd5", "Qb3", "Nce7", "O-O", "O-O",
];

// ---------- Small helpers ----------

function toChessColor(c: Color): "w" | "b" {
  return c === "white" ? "w" : "b";
}

function fromChessColor(c: "w" | "b"): Color {
  return c === "w" ? "white" : "black";
}

// ---------- Model ----------

interface Model {
  card: ChessCard | null;
  local: Chess;
  selected: string | null;
  legalByTo: Map<string, Move[]>;
  standalone: boolean;
  connected: boolean;
  busy: boolean;
  /** moves.length we already sent a "your move" nudge for, so it fires once per turn change. */
  notifiedForMoveCount: number;
}

const model: Model = {
  card: null,
  local: new Chess(),
  selected: null,
  legalByTo: new Map(),
  standalone: false,
  connected: false,
  busy: false,
  notifiedForMoveCount: -1,
};

const app = new App({ name: "Check, Mate?", version: "0.1.0" });

const $ = <T extends HTMLElement = HTMLElement>(id: string): T => document.getElementById(id) as T;

const cardEl = $("card");
const statusBannerEl = $("status-banner");
const boardEl = $("board");
const materialRowEl = $("material-row");
const capturedRowEl = $("captured-row");
const moveListEl = $("move-list");
const newGameBtn = $<HTMLButtonElement>("new-game-btn");
const promoOverlayEl = $("promo-overlay");
const promoPickerEl = $("promo-picker");

// ---------- Local rules helpers (chess.js does all the rules) ----------

function computeMaterialBalance(chess: Chess): number {
  let balance = 0;
  for (const row of chess.board()) {
    for (const cell of row) {
      if (!cell) continue;
      const value = PIECE_VALUE[cell.type];
      balance += cell.color === "w" ? value : -value;
    }
  }
  return balance;
}

function computeStatus(chess: Chess): Status {
  const turn = fromChessColor(chess.turn());
  let result: Status["result"] = null;
  let winner: Color | null = null;
  if (chess.isCheckmate()) {
    result = "checkmate";
    winner = turn === "white" ? "black" : "white";
  } else if (chess.isStalemate()) {
    result = "stalemate";
  } else if (chess.isThreefoldRepetition()) {
    result = "draw-threefold";
  } else if (chess.isDrawByFiftyMoves()) {
    result = "draw-fifty";
  } else if (chess.isInsufficientMaterial()) {
    result = "draw-material";
  }
  return {
    turn,
    inCheck: chess.isCheck(),
    gameOver: result !== null,
    result,
    winner,
    materialBalance: computeMaterialBalance(chess),
  };
}

interface CapturedTally {
  byWhite: PieceSymbol[];
  byBlack: PieceSymbol[];
}

/**
 * Replays a SAN move history from the standard start position to recover
 * which pieces were captured, by whom. Only works when the game began at
 * the normal starting position (chess_new_game with a custom fen won't
 * replay cleanly); on any failure this degrades to null and the captured
 * row simply stays empty.
 */
function computeCaptured(moves: string[]): CapturedTally | null {
  try {
    const replay = new Chess();
    const byWhite: PieceSymbol[] = [];
    const byBlack: PieceSymbol[] = [];
    for (const san of moves) {
      const move = replay.move(san);
      if (move.captured) {
        if (move.color === "w") byWhite.push(move.captured);
        else byBlack.push(move.captured);
      }
    }
    return { byWhite, byBlack };
  } catch {
    return null;
  }
}

function buildDemoCard(): ChessCard {
  const chess = new Chess();
  let lastMove: LastMove | null = null;
  try {
    for (const san of DEMO_MOVES) {
      const move = chess.move(san);
      lastMove = { from: move.from, to: move.to, san: move.san };
    }
  } catch {
    /* fall back to whatever legal prefix applied before the bad move */
  }
  return {
    kind: "chess",
    fen: chess.fen(),
    moves: chess.history(),
    playerColor: "white",
    lastMove,
    status: computeStatus(chess),
    message: "Demo board. Connect via MCP to play.",
  };
}

// ---------- Rendering ----------

function squareAriaLabel(square: string, piece: { color: "w" | "b"; type: PieceSymbol } | undefined): string {
  if (!piece) return `${square}, empty`;
  return `${square}, ${fromChessColor(piece.color)} ${PIECE_NAMES[piece.type]}`;
}

function renderBoard(): void {
  if (!model.card) return;
  const { card } = model;
  const chess = model.local;
  const playerColor = card.playerColor;
  const files = playerColor === "black" ? [...FILES].reverse() : FILES;
  const ranksDisplay = playerColor === "black" ? RANKS : [...RANKS].reverse();
  const bottomRank = ranksDisplay[ranksDisplay.length - 1];
  const leftFile = files[0];

  const canInteract = !model.standalone && !model.busy && !card.status.gameOver && card.status.turn === playerColor;

  boardEl.innerHTML = "";
  const frag = document.createDocumentFragment();

  for (const rank of ranksDisplay) {
    for (const file of files) {
      const square = `${file}${rank}`;
      const fileIdx = FILES.indexOf(file);
      const isLight = (fileIdx + (rank - 1)) % 2 === 1;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `square ${isLight ? "light" : "dark"}`;
      btn.dataset.square = square;

      const piece = chess.get(square as Square);
      if (piece) {
        const glyph = document.createElement("span");
        glyph.className = "glyph";
        glyph.textContent = GLYPHS[`${piece.color}${piece.type}`] ?? "";
        btn.appendChild(glyph);
      }

      if (card.lastMove && (square === card.lastMove.from || square === card.lastMove.to)) {
        btn.classList.add("last-move");
      }
      if (model.selected === square) btn.classList.add("selected");

      const destMoves = model.legalByTo.get(square);
      if (model.selected && destMoves && destMoves.length > 0) {
        const dot = document.createElement("span");
        dot.className = destMoves[0].isCapture() ? "dot capture" : "dot";
        btn.appendChild(dot);
      }

      const isOwnPiece = !!piece && fromChessColor(piece.color) === playerColor;
      const isClickable =
        canInteract &&
        (model.selected === square || // deselect
          (!!model.selected && !!destMoves) || // legal destination
          isOwnPiece); // select or reselect a piece of the player's color
      if (isClickable) {
        btn.classList.add("interactive");
        btn.addEventListener("click", () => onSquareClick(square));
      }

      if (rank === bottomRank) {
        const lbl = document.createElement("span");
        lbl.className = "label file";
        lbl.textContent = file;
        btn.appendChild(lbl);
      }
      if (file === leftFile) {
        const lbl = document.createElement("span");
        lbl.className = "label rank";
        lbl.textContent = String(rank);
        btn.appendChild(lbl);
      }

      btn.setAttribute("aria-label", squareAriaLabel(square, piece));
      frag.appendChild(btn);
    }
  }

  boardEl.appendChild(frag);
}

function renderMaterial(status: Status): void {
  materialRowEl.innerHTML = "";
  const chip = document.createElement("span");
  const bal = status.materialBalance;
  if (bal === 0) {
    chip.className = "chip";
    chip.textContent = "Material even";
  } else if (bal > 0) {
    chip.className = "chip lead";
    chip.textContent = `White +${bal}`;
  } else {
    chip.className = "chip lead";
    chip.textContent = `Black +${Math.abs(bal)}`;
  }
  materialRowEl.appendChild(chip);
}

function pieceSortValue(p: PieceSymbol): number {
  return -PIECE_VALUE[p];
}

function renderCaptured(moves: string[]): void {
  capturedRowEl.innerHTML = "";
  const tally = computeCaptured(moves);
  if (!tally || (tally.byWhite.length === 0 && tally.byBlack.length === 0)) return;

  const buildRow = (label: string, mover: "w" | "b", pieces: PieceSymbol[]): HTMLDivElement => {
    const row = document.createElement("div");
    row.className = "captured-line";
    const lbl = document.createElement("span");
    lbl.className = "cap-label";
    lbl.textContent = label;
    row.appendChild(lbl);
    const takenColor: "w" | "b" = mover === "w" ? "b" : "w";
    for (const p of [...pieces].sort((a, b) => pieceSortValue(a) - pieceSortValue(b))) {
      const span = document.createElement("span");
      span.textContent = GLYPHS[`${takenColor}${p}`] ?? "";
      row.appendChild(span);
    }
    return row;
  };

  if (tally.byWhite.length > 0) capturedRowEl.appendChild(buildRow("White has taken", "w", tally.byWhite));
  if (tally.byBlack.length > 0) capturedRowEl.appendChild(buildRow("Black has taken", "b", tally.byBlack));
}

function renderMoveList(moves: string[]): void {
  moveListEl.innerHTML = "";
  const frag = document.createDocumentFragment();
  for (let i = 0; i < moves.length; i += 2) {
    const num = document.createElement("span");
    num.className = "move-num";
    num.textContent = `${i / 2 + 1}.`;

    const white = document.createElement("span");
    white.className = "move-san";
    white.textContent = moves[i] ?? "";

    const black = document.createElement("span");
    black.className = "move-san";
    black.textContent = moves[i + 1] ?? "";

    if (i + 2 >= moves.length) {
      const last = moves[i + 1] !== undefined ? black : white;
      last.classList.add("current");
    }

    frag.append(num, white, black);
  }
  moveListEl.appendChild(frag);
  moveListEl.scrollTop = moveListEl.scrollHeight;
}

function render(): void {
  if (!model.card) return;
  const { card } = model;
  cardEl.hidden = false;

  statusBannerEl.className = "status-banner";
  if (model.standalone) {
    statusBannerEl.textContent = "Demo board - connect via MCP to play";
    statusBannerEl.classList.add("demo");
  } else {
    statusBannerEl.textContent = card.message;
    if (card.status.gameOver) {
      statusBannerEl.classList.add("gameover");
    } else if (card.status.inCheck) {
      statusBannerEl.classList.add("check");
    }
    const claudesTurn = !card.status.gameOver && card.status.turn !== card.playerColor;
    if (claudesTurn) statusBannerEl.classList.add("pulsing");
  }

  renderBoard();
  renderMaterial(card.status);
  renderCaptured(card.moves);
  renderMoveList(card.moves);

  newGameBtn.hidden = model.standalone || !model.connected;
}

// ---------- Selection / interaction ----------

function clearSelection(): void {
  model.selected = null;
  model.legalByTo = new Map();
  renderBoard();
}

function selectSquare(square: string): void {
  model.selected = square;
  const moves = model.local.moves({ square: square as Square, verbose: true });
  const byTo = new Map<string, Move[]>();
  for (const m of moves) {
    const list = byTo.get(m.to) ?? [];
    list.push(m);
    byTo.set(m.to, list);
  }
  model.legalByTo = byTo;
  renderBoard();
}

function openPromotionPicker(from: string, to: string): void {
  if (!model.card) return;
  const color = toChessColor(model.card.playerColor);
  promoPickerEl.innerHTML = "";
  for (const choice of PROMOTION_CHOICES) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "promo-btn";
    btn.setAttribute("aria-label", `Promote to ${choice.name}`);
    btn.textContent = GLYPHS[`${color}${choice.letter}`] ?? choice.letter.toUpperCase();
    btn.addEventListener("click", () => {
      promoOverlayEl.hidden = true;
      void submitMove(`${from}${to}${choice.letter}`);
    });
    promoPickerEl.appendChild(btn);
  }
  promoOverlayEl.hidden = false;
}

promoOverlayEl.addEventListener("click", (e) => {
  if (e.target === promoOverlayEl) {
    promoOverlayEl.hidden = true;
  }
});

function onSquareClick(square: string): void {
  if (!model.card || model.standalone || model.busy) return;
  const { card } = model;
  if (card.status.gameOver || card.status.turn !== card.playerColor) return;

  if (model.selected === square) {
    clearSelection();
    return;
  }

  if (model.selected && model.legalByTo.has(square)) {
    const from = model.selected;
    const moves = model.legalByTo.get(square) ?? [];
    clearSelection();
    if (moves.some((m) => m.promotion)) {
      openPromotionPicker(from, square);
    } else {
      void submitMove(`${from}${square}`);
    }
    return;
  }

  const piece = model.local.get(square as Square);
  if (piece && fromChessColor(piece.color) === card.playerColor) {
    selectSquare(square);
    return;
  }

  clearSelection();
}

// ---------- Server tool calls ----------

function applyCard(card: ChessCard, options: { notify?: boolean } = {}): void {
  model.card = card;
  model.local = new Chess(card.fen);
  model.selected = null;
  model.legalByTo = new Map();
  render();
  if (options.notify) maybeNotifyClaudeTurn(card);
}

function maybeNotifyClaudeTurn(card: ChessCard): void {
  if (model.standalone) return;
  if (card.status.gameOver) return;
  if (card.status.turn === card.playerColor) return;
  if (model.notifiedForMoveCount === card.moves.length) return;
  model.notifiedForMoveCount = card.moves.length;

  if (typeof app.sendMessage !== "function") return;
  const lastSan = card.lastMove?.san;
  const text = lastSan ? `I played ${lastSan}. Your move.` : "Your move.";
  app.sendMessage({ role: "user", content: [{ type: "text", text }] }).catch(() => {
    /* best effort; the pulsing status banner still communicates it's Claude's turn */
  });
}

async function submitMove(uci: string): Promise<void> {
  if (!model.card || model.busy) return;
  const { card } = model;
  model.busy = true;
  renderBoard();
  try {
    const result = await app.callServerTool({
      name: "chess_move",
      arguments: {
        fen: card.fen,
        move: uci,
        moves: card.moves,
        player_color: card.playerColor,
      },
    });
    const sc = result.structuredContent as unknown as ChessCard | undefined;
    if (!result.isError && sc && sc.kind === "chess") {
      applyCard(sc, { notify: true });
    }
  } catch {
    /* transport error; leave the board as-is and let the player retry */
  } finally {
    model.busy = false;
    renderBoard();
  }
}

newGameBtn.addEventListener("click", () => {
  if (!model.card || model.standalone || model.busy) return;
  const playerColor = model.card.playerColor;
  model.busy = true;
  renderBoard();
  void (async () => {
    try {
      const result = await app.callServerTool({
        name: "chess_new_game",
        arguments: { player_color: playerColor },
      });
      const sc = result.structuredContent as unknown as ChessCard | undefined;
      if (!result.isError && sc && sc.kind === "chess") {
        model.notifiedForMoveCount = -1;
        applyCard(sc);
      }
    } catch {
      /* leave the current game on screen */
    } finally {
      model.busy = false;
      renderBoard();
    }
  })();
});

// ---------- Host connection ----------

app.ontoolresult = (result) => {
  const sc = result.structuredContent as unknown as ChessCard | undefined;
  if (!sc || sc.kind !== "chess") return;
  applyCard(sc);
};

app.onhostcontextchanged = (ctx) => {
  if (ctx?.theme) applyDocumentTheme(ctx.theme);
};

function enterStandalone(): void {
  if (model.card) return;
  model.standalone = true;
  applyCard(buildDemoCard());
}

const connectTimeout = window.setTimeout(enterStandalone, 1500);

app
  .connect()
  .then(() => {
    window.clearTimeout(connectTimeout);
    model.connected = true;
    const ctx = app.getHostContext();
    if (ctx?.theme) applyDocumentTheme(ctx.theme);
    // If the host never delivers a tool result (unusual), fall back to demo.
    window.setTimeout(enterStandalone, 3000);
  })
  .catch(() => {
    window.clearTimeout(connectTimeout);
    enterStandalone();
  });
