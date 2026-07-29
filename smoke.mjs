/**
 * End-to-end smoke test against a running server.
 * Usage: node smoke.mjs [baseUrl]   (default http://localhost:3006)
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const base = process.argv[2] ?? "http://localhost:3006";

// --- Did It Win? -----------------------------------------------------------

const client = new Client({ name: "smoke", version: "0.0.1" });
await client.connect(new StreamableHTTPClientTransport(new URL(`${base}/did-it-win/mcp`)));

const tools = await client.listTools();
console.log("TOOLS:", tools.tools.map((t) => t.name).join(", "));
const uiTool = tools.tools.find((t) => t.name === "check_test");
console.log("UI META:", JSON.stringify(uiTool._meta));

const res = await client.readResource({ uri: "ui://did-it-win/card.html" });
console.log("RESOURCE:", res.contents[0].mimeType, "bytes:", res.contents[0].text.length);

const notYet = await client.callTool({
  name: "check_test",
  arguments: { controlVisitors: 4210, controlConversions: 168, variantVisitors: 4305, variantConversions: 203, dailyVisitors: 1200 },
});
console.log("NOT_YET verdict:", notYet.structuredContent.verdict, "| p:", notYet.structuredContent.pValue.toFixed(4), "| prob:", notYet.structuredContent.probVariantBetter.toFixed(4));
if (notYet.structuredContent.verdict !== "not_yet") throw new Error("expected not_yet");

const winner = await client.callTool({
  name: "check_test",
  arguments: { controlVisitors: 10000, controlConversions: 200, variantVisitors: 10000, variantConversions: 280 },
});
console.log("WINNER verdict:", winner.structuredContent.verdict);
if (winner.structuredContent.verdict !== "winner") throw new Error("expected winner");

const plan = await client.callTool({
  name: "plan_test",
  arguments: { baselineRate: 2.1, minDetectableLift: 10, dailyVisitors: 800 },
});
console.log("PLAN:", plan.structuredContent.perArmNeeded, "per arm,", plan.structuredContent.daysNeeded, "days");
if (plan.structuredContent.perArmNeeded !== 76757) throw new Error("unexpected sample size");

const bad = await client.callTool({
  name: "check_test",
  arguments: { controlVisitors: 100, controlConversions: 150, variantVisitors: 100, variantConversions: 5 },
});
console.log("BAD INPUT isError:", bad.isError, "-", bad.content[0].text);
if (!bad.isError) throw new Error("expected isError");

console.log("DID IT WIN SMOKE OK");

// --- Check, Mate? ------------------------------------------------------------

const chessClient = new Client({ name: "smoke-chess", version: "0.0.1" });
await chessClient.connect(new StreamableHTTPClientTransport(new URL(`${base}/chess/mcp`)));

const chessTools = await chessClient.listTools();
const chessToolNames = chessTools.tools.map((t) => t.name);
console.log("CHESS TOOLS:", chessToolNames.join(", "));
for (const name of ["chess_new_game", "chess_move", "chess_position"]) {
  if (!chessToolNames.includes(name)) throw new Error(`expected chess tool ${name}`);
}

const chessResource = await chessClient.readResource({ uri: "ui://chess/board.html" });
console.log("CHESS RESOURCE:", chessResource.contents[0].mimeType, "bytes:", chessResource.contents[0].text.length);

const newGame = await chessClient.callTool({
  name: "chess_new_game",
  arguments: {},
});
console.log("NEW GAME:", newGame.structuredContent.kind, "-", newGame.structuredContent.message);
if (newGame.structuredContent.kind !== "chess") throw new Error("expected kind chess");

const startFen = newGame.structuredContent.fen;
const afterE4 = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1";

const e4 = await chessClient.callTool({
  name: "chess_move",
  arguments: { fen: startFen, move: "e4", moves: [] },
});
console.log("E4:", e4.structuredContent.fen);
if (e4.structuredContent.kind !== "chess") throw new Error("expected kind chess after e4");
if (e4.structuredContent.fen !== afterE4) {
  throw new Error(`expected fen after 1.e4 to be "${afterE4}", got "${e4.structuredContent.fen}"`);
}

const illegal = await chessClient.callTool({
  name: "chess_move",
  arguments: { fen: e4.structuredContent.fen, move: "Ke5", moves: e4.structuredContent.moves },
});
console.log("ILLEGAL:", illegal.content[0].text.split("\n").slice(0, 1).join(""));
if (illegal.isError) throw new Error("illegal move should soft-fail, not set isError");
if (!illegal.content[0].text.includes("Illegal")) throw new Error("expected 'Illegal' in illegal-move text");
if (illegal.structuredContent.fen !== afterE4) throw new Error("illegal move should leave the fen unchanged");

console.log("CHESS SMOKE OK");

console.log("SMOKE OK");
process.exit(0);
