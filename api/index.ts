/** Identity routes: / (directory), /<tool> (tool identity), /<tool>/preview (standalone card). */
import type { IncomingMessage, ServerResponse } from "node:http";
import { DIRECTORY } from "./directory.js";

const TOOL_PREFIXES: Record<string, { dirIndex: number; html: () => Promise<{ APP_HTML: string }> }> = {
  "/did-it-win": { dirIndex: 0, html: () => import("../tools/did-it-win/app-html.generated.js") },
  "/chess": { dirIndex: 1, html: () => import("../tools/chess/app-html.generated.js") },
  "/masset-guide": { dirIndex: 2, html: () => import("../tools/masset-guide/app-html.generated.js") },
};

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const url = req.url ?? "/";
  const tool = Object.entries(TOOL_PREFIXES).find(([prefix]) => url.startsWith(prefix))?.[1];

  if (tool && url.includes("/preview")) {
    const { APP_HTML } = await tool.html();
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(APP_HTML);
    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(tool ? DIRECTORY.tools[tool.dirIndex] : DIRECTORY));
}
