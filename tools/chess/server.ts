/**
 * Check, Mate? MCP server.
 *
 * Three tools:
 *   chess_new_game: start a game, renders the interactive board
 *   chess_move: play one move, renders the updated board
 *   chess_position: plain analysis tool (no UI), for Claude to consult before moving
 *
 * Stateless by design: nothing is stored between calls. The caller passes the
 * current fen (and SAN move history) back in on every call. There is no engine:
 * chess.js (via engine.ts) enforces the rules, and Claude picks its own moves.
 */

import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult, ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { APP_HTML } from "./app-html.generated.js";
import {
  applyMove,
  positionReport,
  START_FEN,
  statusOf,
  unicodeBoard,
  validateFen,
} from "./engine.js";
import type { Color, MoveOutcome, PositionReport, Status } from "./engine.js";

const resourceUri = "ui://chess/board.html";

function errorResult(e: unknown): CallToolResult {
  return {
    content: [{ type: "text", text: e instanceof Error ? e.message : String(e) }],
    isError: true,
  };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function resultMessage(status: Status): string {
  switch (status.result) {
    case "checkmate":
      return `Checkmate. ${capitalize(status.winner ?? "")} wins.`;
    case "stalemate":
      return "Stalemate. The game is a draw.";
    case "draw-threefold":
      return "Draw by threefold repetition.";
    case "draw-fifty":
      return "Draw by the fifty-move rule.";
    case "draw-material":
      return "Draw by insufficient material.";
    default:
      return "Game over.";
  }
}

function turnMessage(status: Status, playerColor: Color): string {
  const isPlayerTurn = status.turn === playerColor;
  if (isPlayerTurn) {
    return status.inCheck ? "Check! Your move." : "Your move.";
  }
  return status.inCheck
    ? "Check! Claude's turn: send a message in the chat and it will play its move."
    : "Claude's turn: send a message in the chat and it will play its move.";
}

/** One-line card message. Shared by chess_new_game and chess_move so the wording stays consistent. */
function cardMessage(status: Status, playerColor: Color, illegalError?: string): string {
  if (illegalError) return `Illegal move: ${illegalError}.`;
  if (status.gameOver) return resultMessage(status);
  return turnMessage(status, playerColor);
}

/** The explicit next-step instruction that closes out every content-text block. */
function newGameInstruction(status: Status, playerColor: Color): string {
  if (playerColor === "black") {
    return "You are playing White. Analyze the position (chess_position) and make your first move with chess_move.";
  }
  if (status.turn === playerColor) {
    return "Waiting for the human's move on the board.";
  }
  return "It is now your (Claude's) turn. Call chess_position to analyze, then reply with chess_move.";
}

function moveInstruction(outcome: MoveOutcome, playerColor: Color): string {
  if (!outcome.ok) {
    const examples = (outcome.legalSample ?? []).join(", ");
    return `Illegal move: ${outcome.error}. Legal examples: ${examples}. Position unchanged.`;
  }
  if (outcome.status.gameOver) {
    return `${resultMessage(outcome.status)} Start a new game with chess_new_game for a rematch.`;
  }
  if (outcome.status.turn === playerColor) {
    return "Waiting for the human's move on the board.";
  }
  return "It is now your (Claude's) turn. Call chess_position to analyze, then reply with chess_move.";
}

function formatMoveList(moves: string[]): string {
  if (moves.length === 0) return "(no moves yet)";
  const parts: string[] = [];
  for (let i = 0; i < moves.length; i += 2) {
    const num = i / 2 + 1;
    const white = moves[i];
    const black = moves[i + 1];
    parts.push(black ? `${num}. ${white} ${black}` : `${num}. ${white}`);
  }
  return parts.join(" ");
}

function buildContentText(opts: {
  fen: string;
  moves: string[];
  playerColor: Color;
  statusLine: string;
  instruction: string;
}): string {
  const board = unicodeBoard(opts.fen, opts.playerColor);
  return [
    board,
    "",
    opts.statusLine,
    `FEN: ${opts.fen}`,
    `Moves: ${formatMoveList(opts.moves)}`,
    "",
    opts.instruction,
  ].join("\n");
}

export function createChessServer(): McpServer {
  const server = new McpServer({
    name: "check-mate",
    version: "0.1.0",
  });

  registerAppTool(
    server,
    "chess_new_game",
    {
      title: "Start a new chess game",
      description:
        "Start a new chess game against Claude, rendered as an interactive board inside the chat. " +
        "The human plays on the board by clicking pieces and squares; when it becomes Claude's turn, " +
        "Claude analyzes the position with chess_position and then plays its move by calling chess_move. " +
        "Optional: choose which color the human plays (player_color, default white) and an optional " +
        "custom starting position (fen). Stateless: nothing is stored between calls, so the resulting " +
        "fen and moves must be passed back in on the next chess_move call.",
      inputSchema: {
        player_color: z
          .enum(["white", "black"])
          .default("white")
          .describe("Which color the human plays on the board. Claude plays the other color."),
        fen: z.string().optional().describe("Optional custom start position (FEN)"),
      },
      _meta: { ui: { resourceUri } },
    },
    async (input): Promise<CallToolResult> => {
      try {
        const playerColor = input.player_color as Color;
        const fen = input.fen ?? START_FEN;
        if (input.fen !== undefined) {
          const check = validateFen(fen);
          if (!check.ok) {
            throw new Error(`Invalid custom start position: ${check.error}`);
          }
        }
        const status = statusOf(fen);
        const message = cardMessage(status, playerColor);
        const instruction = newGameInstruction(status, playerColor);
        const card = {
          kind: "chess" as const,
          fen,
          moves: [] as string[],
          playerColor,
          lastMove: null,
          status,
          message,
        };
        const text = buildContentText({
          fen,
          moves: [],
          playerColor,
          statusLine: message,
          instruction,
        });
        return {
          content: [{ type: "text", text }],
          structuredContent: card as unknown as Record<string, unknown>,
        };
      } catch (e) {
        return errorResult(e);
      }
    },
  );

  registerAppTool(
    server,
    "chess_move",
    {
      title: "Play a chess move",
      description:
        "Play one move in the current chess game and render the updated board. This tool is fully " +
        "stateless: pass the current fen and the full moves history (SAN list) you have so far, plus the " +
        "move to apply. It returns the new fen and moves array, which must be passed into the next call. " +
        "Illegal moves fail softly (the position is unchanged and a few legal alternatives are suggested) " +
        "instead of erroring. Alternate turns with the human: when it becomes Claude's turn, call " +
        "chess_position first to analyze, then call this tool with Claude's chosen move.",
      inputSchema: {
        fen: z.string().describe("Current position (FEN)"),
        move: z.string().describe("SAN like Nf3 or UCI like g1f3"),
        moves: z
          .array(z.string())
          .default([])
          .describe("Full SAN move history so far, in order"),
        player_color: z
          .enum(["white", "black"])
          .default("white")
          .describe("Which color the human plays on the board. Claude plays the other color."),
      },
      _meta: { ui: { resourceUri } },
    },
    async (input): Promise<CallToolResult> => {
      try {
        const playerColor = input.player_color as Color;
        const outcome = applyMove(input.fen, input.move, input.moves);
        const message = cardMessage(outcome.status, playerColor, outcome.ok ? undefined : outcome.error);
        const instruction = moveInstruction(outcome, playerColor);
        const card = {
          kind: "chess" as const,
          fen: outcome.fen,
          moves: outcome.moves,
          playerColor,
          lastMove:
            outcome.ok && outcome.from && outcome.to && outcome.san
              ? { from: outcome.from, to: outcome.to, san: outcome.san }
              : null,
          status: outcome.status,
          message,
        };
        const text = buildContentText({
          fen: outcome.fen,
          moves: outcome.moves,
          playerColor,
          statusLine: message,
          instruction,
        });
        return {
          content: [{ type: "text", text }],
          structuredContent: card as unknown as Record<string, unknown>,
        };
      } catch (e) {
        return errorResult(e);
      }
    },
  );

  server.registerTool(
    "chess_position",
    {
      title: "Analyze a chess position",
      description:
        "Analyze a chess position: legal moves, checks available, captures available with material delta, " +
        "hanging (undefended, attacked) pieces, material balance, move number, and game phase. " +
        "Call this before choosing your move. Prefer checks, safe captures (positive delta), and moves that " +
        "rescue your hanging pieces; avoid moves that hang material.",
      inputSchema: {
        fen: z.string().describe("Position to analyze (FEN)"),
      },
    },
    async (input): Promise<CallToolResult> => {
      try {
        const check = validateFen(input.fen);
        if (!check.ok) {
          throw new Error(`Invalid FEN: ${check.error}`);
        }
        const report: PositionReport = positionReport(input.fen);
        const summary = summarizeReport(report);
        const text = `${summary}\n\n${JSON.stringify(report, null, 2)}`;
        return {
          content: [{ type: "text", text }],
        };
      } catch (e) {
        return errorResult(e);
      }
    },
  );

  registerAppResource(
    server,
    "Chess board card",
    resourceUri,
    { mimeType: RESOURCE_MIME_TYPE },
    async (): Promise<ReadResourceResult> => ({
      contents: [{ uri: resourceUri, mimeType: RESOURCE_MIME_TYPE, text: APP_HTML }],
    }),
  );

  return server;
}

function summarizeReport(report: PositionReport): string {
  const turn = capitalize(report.turn);
  const balance =
    report.material.balance === 0
      ? "material is level"
      : `${report.material.balance > 0 ? "white" : "black"} is up ${Math.abs(report.material.balance)}`;
  const checks = report.checksAvailable.length;
  const captures = report.capturesAvailable.length;
  const hangingWhite = report.hanging.white.length;
  const hangingBlack = report.hanging.black.length;
  return (
    `${turn} to move, move ${report.moveNumber}, ${report.phase}. Material: white ${report.material.white}, ` +
    `black ${report.material.black} (${balance}). ${checks} check${checks === 1 ? "" : "s"} available, ` +
    `${captures} capture${captures === 1 ? "" : "s"} available, ${hangingWhite} white piece${hangingWhite === 1 ? "" : "s"} ` +
    `hanging, ${hangingBlack} black piece${hangingBlack === 1 ? "" : "s"} hanging.`
  );
}
