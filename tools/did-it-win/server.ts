/**
 * Did It Win? — MCP server.
 *
 * Two tools, both rendering the same inline results card (MCP Apps):
 *   check_test — verdict on a finished-or-running A/B test
 *   plan_test  — how big the test needs to be before you start
 *
 * Stateless by design: nothing is stored, logged, or sent anywhere.
 * All math is deterministic (see stats.ts); the model never does statistics.
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
import { checkTest, planTest } from "./stats.ts";

const resourceUri = "ui://did-it-win/card.html";

function errorResult(e: unknown): CallToolResult {
  return {
    content: [{ type: "text", text: e instanceof Error ? e.message : String(e) }],
    isError: true,
  };
}

export function createDidItWinServer(): McpServer {
  const server = new McpServer({
    name: "Did It Win? (free A/B test verdicts from Masset)",
    version: "0.1.0",
  });

  registerAppTool(
    server,
    "check_test",
    {
      title: "Check whether an A/B test won",
      description:
        "Give an honest, statistically sound verdict on an A/B test: WINNER, LOSER, NOT YET, or NO REAL DIFFERENCE. " +
        "Renders an inline results card with the conversion rates, their uncertainty ranges, the probability the variant " +
        "is genuinely better, and (when the test is not done) how many more visitors it needs. " +
        "Pass visitors and conversions for each arm. Optional: confidence (0.80-0.99, default 0.95), " +
        "dailyVisitors (total per day across both arms, enables a finish-date estimate), and display labels. " +
        "The math is a pooled two-proportion z-test plus a Bayesian probability-to-beat with Wilson intervals, " +
        "computed deterministically in code, never estimated by the model.",
      inputSchema: {
        controlVisitors: z.number().int().nonnegative().describe("Visitors in the control (A) arm"),
        controlConversions: z.number().int().nonnegative().describe("Conversions in the control (A) arm"),
        variantVisitors: z.number().int().nonnegative().describe("Visitors in the variant (B) arm"),
        variantConversions: z.number().int().nonnegative().describe("Conversions in the variant (B) arm"),
        confidence: z.number().min(0.8).max(0.99).optional()
          .describe("Confidence level for the significance gate, default 0.95"),
        dailyVisitors: z.number().positive().optional()
          .describe("Total visitors per day across both arms, for the time-remaining estimate"),
        controlLabel: z.string().max(40).optional().describe("Display name for the control, e.g. 'Old headline'"),
        variantLabel: z.string().max(40).optional().describe("Display name for the variant, e.g. 'New headline'"),
      },
      _meta: { ui: { resourceUri } },
    },
    async (input): Promise<CallToolResult> => {
      try {
        const r = checkTest(input);
        return {
          content: [{ type: "text", text: `${r.headline} ${r.explanation}` }],
          structuredContent: r as unknown as Record<string, unknown>,
        };
      } catch (e) {
        return errorResult(e);
      }
    },
  );

  registerAppTool(
    server,
    "plan_test",
    {
      title: "Plan an A/B test (sample size)",
      description:
        "Before starting an A/B test: how many visitors it needs and how long it will take. " +
        "Renders an inline planning card. Pass the baseline conversion rate (2.1 means 2.1%; 0.021 also accepted) " +
        "and optionally the smallest RELATIVE lift worth detecting (default 10%), confidence (default 0.95), " +
        "power (default 0.80), and dailyVisitors (total per day across both arms) for a duration estimate. " +
        "Uses the classic two-proportion sample-size formula, computed deterministically in code.",
      inputSchema: {
        baselineRate: z.number().positive()
          .describe("Current conversion rate. 2.1 means 2.1 percent; fractions like 0.021 also work"),
        minDetectableLift: z.number().positive().optional()
          .describe("Smallest relative lift worth detecting. 10 means 10 percent relative; default 10"),
        confidence: z.number().min(0.8).max(0.99).optional().describe("Default 0.95"),
        power: z.number().min(0.5).max(0.99).optional().describe("Default 0.80"),
        dailyVisitors: z.number().positive().optional()
          .describe("Total visitors per day across both arms, for the duration estimate"),
      },
      _meta: { ui: { resourceUri } },
    },
    async (input): Promise<CallToolResult> => {
      try {
        const r = planTest(input);
        return {
          content: [{ type: "text", text: `${r.headline} ${r.explanation}` }],
          structuredContent: r as unknown as Record<string, unknown>,
        };
      } catch (e) {
        return errorResult(e);
      }
    },
  );

  registerAppResource(
    server,
    "Did It Win results card",
    resourceUri,
    { mimeType: RESOURCE_MIME_TYPE },
    async (): Promise<ReadResourceResult> => ({
      contents: [{ uri: resourceUri, mimeType: RESOURCE_MIME_TYPE, text: APP_HTML }],
    }),
  );

  return server;
}
