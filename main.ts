/**
 * Local entry point. HTTP (Streamable HTTP, stateless) by default; --stdio
 * runs the Did It Win server alone for local stdio clients (Claude Desktop).
 *
 * Paths mirror production (mcp.getmasset.com):
 *   /                    tool directory
 *   /did-it-win          tool identity
 *   /did-it-win/mcp      MCP endpoint
 *   /did-it-win/preview  standalone card preview (demo data)
 *   /chess               tool identity
 *   /chess/mcp           MCP endpoint
 *   /chess/preview       standalone card preview (demo data)
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import cors from "cors";
import express from "express";
import type { Request, Response } from "express";
import { DIRECTORY } from "./api/directory.js";
import { createDidItWinServer } from "./tools/did-it-win/server.js";
import { createChessServer } from "./tools/chess/server.js";

const TOOLS = {
  "did-it-win": createDidItWinServer,
  chess: createChessServer,
} as const;

async function startHttp(): Promise<void> {
  const port = parseInt(process.env.PORT ?? "3006", 10);
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));

  app.get("/", (_req, res) => res.json(DIRECTORY));
  app.get("/did-it-win", (_req, res) => res.json(DIRECTORY.tools[0]));
  app.get("/chess", (_req, res) => res.json(DIRECTORY.tools[1]));

  app.get("/did-it-win/preview", async (_req, res) => {
    const { APP_HTML } = await import("./tools/did-it-win/app-html.generated.js");
    res.type("html").send(APP_HTML);
  });

  app.get("/chess/preview", async (_req, res) => {
    const { APP_HTML } = await import("./tools/chess/app-html.generated.js");
    res.type("html").send(APP_HTML);
  });

  app.all("/did-it-win/mcp", async (req: Request, res: Response) => {
    const server = TOOLS["did-it-win"]();
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

  app.all("/chess/mcp", async (req: Request, res: Response) => {
    const server = TOOLS.chess();
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

  app.listen(port, () => {
    console.log(`Did It Win MCP server on http://localhost:${port}/did-it-win/mcp`);
    console.log(`Check, Mate? MCP server on http://localhost:${port}/chess/mcp`);
  });
}

async function main() {
  if (process.argv.includes("--stdio")) {
    await createDidItWinServer().connect(new StdioServerTransport());
  } else {
    await startHttp();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
