/**
 * End-to-end smoke test against a running server.
 * Usage: node smoke.mjs [baseUrl]   (default http://localhost:3006)
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const base = process.argv[2] ?? "http://localhost:3006";
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

// ---------- Masset Guide ----------

const guide = new Client({ name: "smoke-guide", version: "0.0.1" });
await guide.connect(new StreamableHTTPClientTransport(new URL(`${base}/masset-guide/mcp`)));

const gTools = await guide.listTools();
console.log("GUIDE TOOLS:", gTools.tools.map((t) => t.name).join(", "));
if (gTools.tools.length !== 3) throw new Error("expected 3 guide tools");

const gRes = await guide.readResource({ uri: "ui://masset-guide/card.html" });
console.log("GUIDE RESOURCE:", gRes.contents[0].mimeType, "bytes:", gRes.contents[0].text.length);

const pricing = await guide.callTool({
  name: "ask_masset",
  arguments: { question: "how much does Masset cost?" },
});
console.log("GUIDE pricing topics:", pricing.structuredContent.topicIds.join(", "));
if (pricing.structuredContent.topicIds[0] !== "pricing") throw new Error("expected pricing topic first");

const noMatch = await guide.callTool({
  name: "ask_masset",
  arguments: { question: "zzz qqq xyzzy" },
});
if (noMatch.structuredContent.kind !== "no_match") throw new Error("expected no_match");
console.log("GUIDE no_match: ok");

console.log("SMOKE OK");
process.exit(0);
