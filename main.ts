/**
 * Local entry point. HTTP (Streamable HTTP, stateless) by default; --stdio
 * runs a single tool's server for local stdio clients (Claude Desktop):
 * `--stdio` (Did It Win) or `--stdio=masset-guide`.
 *
 * Paths mirror production (mcp.getmasset.com):
 *   /                      tool directory
 *   /<tool>                tool identity
 *   /<tool>/mcp            MCP endpoint
 *   /<tool>/preview        standalone card preview (demo data)
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import cors from "cors";
import express from "express";
import type { Request, Response } from "express";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { DIRECTORY } from "./api/directory.js";
import { createDidItWinServer } from "./tools/did-it-win/server.js";
import { createMassetGuideServer } from "./tools/masset-guide/server.js";

const TOOLS: Record<
  string,
  { create: () => McpServer; html: () => Promise<{ APP_HTML: string }>; dirIndex: number }
> = {
  "did-it-win": {
    create: createDidItWinServer,
    html: () => import("./tools/did-it-win/app-html.generated.js"),
    dirIndex: 0,
  },
  "masset-guide": {
    create: createMassetGuideServer,
    html: () => import("./tools/masset-guide/app-html.generated.js"),
    dirIndex: 1,
  },
};

async function startHttp(): Promise<void> {
  const port = parseInt(process.env.PORT ?? "3006", 10);
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));

  app.get("/", (_req, res) => res.json(DIRECTORY));

  for (const [name, tool] of Object.entries(TOOLS)) {
    app.get(`/${name}`, (_req, res) => res.json(DIRECTORY.tools[tool.dirIndex]));

    app.get(`/${name}/preview`, async (_req, res) => {
      const { APP_HTML } = await tool.html();
      res.type("html").send(APP_HTML);
    });

    app.all(`/${name}/mcp`, async (req: Request, res: Response) => {
      const server = tool.create();
      const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
      res.on("close", () => {
        transport.close().catch(() => {});
        server.close().catch(() => {});
      });
      try {
        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);
      } catch (error) {
        console.error("MCP error:", error);
        if (!res.headersSent) {
          res.status(500).json({
            jsonrpc: "2.0",
            error: { code: -32603, message: "Internal server error" },
            id: null,
          });
        }
      }
    });
  }

  app.listen(port, () => {
    for (const name of Object.keys(TOOLS)) {
      console.log(`${name} MCP server on http://localhost:${port}/${name}/mcp`);
    }
  });
}

async function main() {
  const stdioArg = process.argv.find((a) => a === "--stdio" || a.startsWith("--stdio="));
  if (stdioArg) {
    const name = stdioArg.includes("=") ? stdioArg.split("=")[1] : "did-it-win";
    const tool = TOOLS[name];
    if (!tool) throw new Error(`Unknown tool "${name}". Known: ${Object.keys(TOOLS).join(", ")}`);
    await tool.create().connect(new StdioServerTransport());
  } else {
    await startHttp();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
