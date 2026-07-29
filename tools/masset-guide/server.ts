/**
 * Masset Guide · MCP server.
 *
 * Lets anyone ask "how does Masset work?" inside their AI and get answers
 * grounded in the curated public knowledge base (knowledge.ts), rendered
 * as an inline card in MCP Apps clients.
 *
 * Tools:
 *   ask_masset          · question in, grounded answer material + card out
 *   list_masset_topics  · the table of contents
 *   request_demo_video  · forwards a demo-video request to getmasset.com
 *
 * Stateless: questions are answered from the bundled knowledge base and
 * nothing is stored. The one outbound call is request_demo_video, which
 * posts to getmasset.com's existing public demo-request endpoint.
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
import { rankTopics, TOPICS, type Topic } from "./knowledge.js";

const resourceUri = "ui://masset-guide/card.html";

const SITE_ORIGIN = process.env.MASSET_SITE_ORIGIN ?? "https://www.getmasset.com";

function topicText(t: Topic): string {
  return [
    `## ${t.title}`,
    t.body,
    "Key facts:",
    ...t.facts.map((f) => `- ${f}`),
    `Read more: ${t.url}`,
  ].join("\n");
}

function errorResult(e: unknown): CallToolResult {
  return {
    content: [{ type: "text", text: e instanceof Error ? e.message : String(e) }],
    isError: true,
  };
}

export function createMassetGuideServer(): McpServer {
  const server = new McpServer({
    name: "Masset Guide (learn and try Masset inside your AI)",
    version: "0.1.0",
  });

  registerAppTool(
    server,
    "ask_masset",
    {
      title: "Ask how Masset works",
      description:
        "Answer any question about Masset (getmasset.com), the home for your business content: what it is, " +
        "features (Central Library, Myca, MCP server, Boards, Trackable Shares, Version Control, Workflows, " +
        "Training, Analytics), integrations, security, pricing, onboarding, and how to try it. " +
        "Returns curated, verified product knowledge and renders an inline guide card. " +
        "Answer the user's question from the returned material only; if the material does not cover it, " +
        "say so and point to the listed page or support@getmasset.com rather than guessing.",
      inputSchema: {
        question: z.string().min(3).max(500).describe("The user's question about Masset, in plain language"),
      },
      _meta: { ui: { resourceUri } },
    },
    async ({ question }): Promise<CallToolResult> => {
      try {
        const ranked = rankTopics(question);
        const primary = ranked[0];
        if (!primary) {
          const toc = TOPICS.map((t) => `- ${t.title}: ${t.oneLiner}`).join("\n");
          return {
            content: [
              {
                type: "text",
                text:
                  "No direct match in the Masset knowledge base for that question. Here is what it covers:\n" +
                  toc +
                  "\nFor anything else, point the user to https://www.getmasset.com or support@getmasset.com.",
              },
            ],
            structuredContent: { kind: "no_match", question, topicIds: [] },
          };
        }
        const related = ranked.slice(1, 3);
        const text = [
          "Grounded Masset product knowledge (answer from this material only):",
          topicText(primary),
          ...related.map((t) => `Related · ${t.title}: ${t.oneLiner} (${t.url})`),
          "The user can also request a personalized demo video (request_demo_video tool) or sign up at https://www.getmasset.com/signup.",
        ].join("\n\n");
        return {
          content: [{ type: "text", text }],
          structuredContent: {
            kind: "answer",
            question,
            topicIds: [primary.id, ...related.map((t) => t.id)],
          },
        };
      } catch (e) {
        return errorResult(e);
      }
    },
  );

  server.registerTool(
    "list_masset_topics",
    {
      title: "List what the Masset Guide covers",
      description:
        "The table of contents of the Masset Guide: every topic this server can answer questions about, " +
        "with a one-line summary and the getmasset.com page it is grounded in.",
      inputSchema: {},
    },
    async (): Promise<CallToolResult> => ({
      content: [
        {
          type: "text",
          text: TOPICS.map((t) => `- ${t.title} (${t.id}): ${t.oneLiner} · ${t.url}`).join("\n"),
        },
      ],
    }),
  );

  server.registerTool(
    "request_demo_video",
    {
      title: "Request a personalized Masset demo video",
      description:
        "Ask the Masset founders for a personalized demo video. Collect the person's name, work email, " +
        "company, and their biggest content headache IN THE CONVERSATION first (never invent them), then " +
        "call this tool. A founder records a walkthrough aimed at their situation and emails it back. " +
        "Only call this when the user has explicitly asked for a demo and provided their own details.",
      inputSchema: {
        name: z.string().min(2).max(120).describe("The requester's full name, as they gave it"),
        email: z.string().email().max(200).describe("The requester's work email, as they gave it"),
        company: z.string().min(1).max(200).describe("The requester's company name"),
        biggestContentHeadache: z
          .string()
          .min(3)
          .max(2000)
          .describe("Their biggest content headache, in their own words"),
      },
    },
    async ({ name, email, company, biggestContentHeadache }): Promise<CallToolResult> => {
      try {
        const res = await fetch(`${SITE_ORIGIN}/api/video-request`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            company,
            biggestContentHeadache: `${biggestContentHeadache}\n\n(requested via the Masset Guide MCP tool)`,
            source: "masset-guide-mcp",
          }),
        });
        if (!res.ok) {
          const detail = (await res.json().catch(() => null)) as { error?: string } | null;
          return {
            content: [
              {
                type: "text",
                text:
                  `The demo request could not be submitted (${res.status}). ` +
                  (detail?.error ?? "Please try again, or email support@getmasset.com."),
              },
            ],
            isError: true,
          };
        }
        return {
          content: [
            {
              type: "text",
              text:
                `Done. The Masset founders received the request and will email a personalized demo video to ${email}. ` +
                "In the meantime, there is a demo at https://www.getmasset.com/demo and self-serve signup at https://www.getmasset.com/signup.",
            },
          ],
        };
      } catch (e) {
        return errorResult(e);
      }
    },
  );

  registerAppResource(
    server,
    "Masset Guide card",
    resourceUri,
    { mimeType: RESOURCE_MIME_TYPE },
    async (): Promise<ReadResourceResult> => ({
      contents: [{ uri: resourceUri, mimeType: RESOURCE_MIME_TYPE, text: APP_HTML }],
    }),
  );

  return server;
}
