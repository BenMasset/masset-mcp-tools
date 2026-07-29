/**
 * Chess engine wrapper tests.
 * Run: npm test
 */

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  applyMove,
  positionReport,
  START_FEN,
  statusOf,
  unicodeBoard,
  validateFen,
} from "./engine.ts";

// ---------- validateFen ----------

test("validateFen: start position is valid", () => {
  assert.equal(validateFen(START_FEN).ok, true);
});

test("validateFen: garbage is invalid with an 'Invalid FEN:' error", () => {
  const r = validateFen("this is not a fen");
  assert.equal(r.ok, false);
  assert.ok(r.error?.startsWith("Invalid FEN:"), `error: ${r.error}`);
});

// ---------- START_FEN / statusOf ----------

test("START_FEN is the standard starting position", () => {
  assert.equal(START_FEN, "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const s = statusOf(START_FEN);
  assert.equal(s.turn, "white");
  assert.equal(s.inCheck, false);
  assert.equal(s.gameOver, false);
  assert.equal(s.result, null);
  assert.equal(s.winner, null);
  assert.equal(s.materialBalance, 0);
});

test("statusOf: stalemate fen reports stalemate", () => {
  const s = statusOf("7k/5Q2/6K1/8/8/8/8/8 b - - 0 1");
  assert.equal(s.result, "stalemate");
  assert.equal(s.gameOver, true);
  assert.equal(s.inCheck, false);
  assert.equal(s.winner, null);
});

test("statusOf: fifty-move-counter fen reports draw-fifty", () => {
  const s = statusOf("8/8/4k3/8/8/4K3/8/8 w - - 100 60");
  assert.equal(s.result, "draw-fifty");
  assert.equal(s.gameOver, true);
});

test("statusOf: king vs king reports draw-material", () => {
  const s = statusOf("8/8/4k3/8/8/4K3/8/8 w - - 0 1");
  assert.equal(s.result, "draw-material");
  assert.equal(s.gameOver, true);
});

// ---------- applyMove ----------

test("applyMove: 1.e4 produces the exact expected fen", () => {
  const r = applyMove(START_FEN, "e4", []);
  assert.equal(r.ok, true);
  assert.equal(r.fen, "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1");
  assert.deepEqual(r.moves, ["e4"]);
  assert.equal(r.san, "e4");
  assert.equal(r.from, "e2");
  assert.equal(r.to, "e4");
  assert.equal(r.captured, null);
  assert.equal(r.status.turn, "black");
});

test("applyMove: illegal move soft-fails, fen and moves unchanged", () => {
  const r = applyMove(START_FEN, "Nf9", []);
  assert.equal(r.ok, false);
  assert.ok(r.error && r.error.length > 0);
  assert.equal(r.fen, START_FEN);
  assert.deepEqual(r.moves, []);
  assert.ok(Array.isArray(r.legalSample));
  assert.ok(r.legalSample!.length > 0 && r.legalSample!.length <= 8);
  assert.equal(r.status.gameOver, false);
});

test("applyMove: invalid fen soft-fails with an 'Invalid FEN:' error", () => {
  const r = applyMove("not a fen", "e4", []);
  assert.equal(r.ok, false);
  assert.ok(r.error?.startsWith("Invalid FEN:"), `error: ${r.error}`);
  assert.equal(r.fen, "not a fen");
  assert.deepEqual(r.moves, []);
});

test("applyMove: SAN and UCI are equivalent", () => {
  const bySan = applyMove(START_FEN, "Nf3", []);
  const byUci = applyMove(START_FEN, "g1f3", []);
  assert.equal(bySan.ok, true);
  assert.equal(byUci.ok, true);
  assert.equal(bySan.fen, byUci.fen);
  assert.equal(bySan.san, "Nf3");
  assert.equal(byUci.san, "Nf3");
});

test("applyMove: fool's mate ends in checkmate, black wins", () => {
  let r = applyMove(START_FEN, "f3", []);
  assert.equal(r.ok, true);
  r = applyMove(r.fen, "e5", r.moves);
  assert.equal(r.ok, true);
  r = applyMove(r.fen, "g4", r.moves);
  assert.equal(r.ok, true);
  r = applyMove(r.fen, "Qh4", r.moves);
  assert.equal(r.ok, true);
  assert.equal(r.san, "Qh4#");
  assert.deepEqual(r.moves, ["f3", "e5", "g4", "Qh4#"]);
  assert.equal(r.status.result, "checkmate");
  assert.equal(r.status.gameOver, true);
  assert.equal(r.status.winner, "black");
});

test("applyMove: promotion via UCI (e7e8q)", () => {
  const fen = "k7/4P3/8/8/8/8/8/7K w - - 0 1";
  const r = applyMove(fen, "e7e8q", []);
  assert.equal(r.ok, true);
  assert.equal(r.san, "e8=Q+");
  assert.equal(r.from, "e7");
  assert.equal(r.to, "e8");
  assert.equal(r.captured, null);
  assert.equal(r.fen, "k3Q3/8/8/8/8/8/8/7K b - - 0 1");
  assert.equal(r.status.inCheck, true);
});

test("applyMove: castling through check is rejected (SAN and UCI)", () => {
  const fen = "4k2r/5r2/8/8/8/8/8/4K2R w K - 0 1";
  const bySan = applyMove(fen, "O-O", []);
  assert.equal(bySan.ok, false);
  assert.equal(bySan.fen, fen);
  const byUci = applyMove(fen, "e1g1", []);
  assert.equal(byUci.ok, false);
  assert.equal(byUci.fen, fen);
});

test("applyMove: deterministic, same call twice is deep-equal", () => {
  const a = applyMove(START_FEN, "e4", []);
  const b = applyMove(START_FEN, "e4", []);
  assert.deepEqual(a, b);
});

// ---------- positionReport ----------

test("positionReport: start position has 20 legal moves", () => {
  const r = positionReport(START_FEN);
  assert.equal(r.legalMoves.length, 20);
  assert.equal(r.turn, "white");
  assert.equal(r.moveNumber, 1);
  assert.equal(r.phase, "opening");
  assert.deepEqual(r.checksAvailable, []);
  assert.deepEqual(r.capturesAvailable, []);
  assert.deepEqual(r.hanging, { white: [], black: [] });
  assert.equal(r.material.white, 39);
  assert.equal(r.material.black, 39);
  assert.equal(r.material.balance, 0);
});

test("positionReport: detects a hanging piece on a crafted fen", () => {
  const r = positionReport("4k3/8/8/8/4n3/3P4/8/4K3 w - - 0 1");
  assert.deepEqual(r.hanging.black, ["n@e4"]);
  assert.deepEqual(r.hanging.white, []);
});

test("positionReport: is deterministic, same call twice is deep-equal", () => {
  const a = positionReport(START_FEN);
  const b = positionReport(START_FEN);
  assert.deepEqual(a, b);
});

// ---------- unicodeBoard ----------

test("unicodeBoard: start position has the correct glyph rows", () => {
  const board = unicodeBoard(START_FEN);
  const lines = board.split("\n");
  assert.equal(lines.length, 9);
  assert.equal(lines[0], "8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜");
  assert.equal(lines[1], "7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟");
  assert.equal(lines[4], "4 · · · · · · · ·");
  assert.equal(lines[6], "2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙");
  assert.equal(lines[7], "1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖");
  assert.equal(lines[8], "  a b c d e f g h");
});

test("unicodeBoard: black orientation flips ranks and files", () => {
  const board = unicodeBoard(START_FEN, "black");
  const lines = board.split("\n");
  assert.equal(lines[0], "1 ♖ ♘ ♗ ♔ ♕ ♗ ♘ ♖");
  assert.equal(lines[7], "8 ♜ ♞ ♝ ♚ ♛ ♝ ♞ ♜");
  assert.equal(lines[8], "  h g f e d c b a");
});
