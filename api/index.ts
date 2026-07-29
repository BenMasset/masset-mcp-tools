/** Identity routes: / (directory), /did-it-win (tool identity), /did-it-win/preview (standalone card). */
import type { IncomingMessage, ServerResponse } from "node:http";
import { APP_HTML } from "../tools/did-it-win/app-html.generated.js";
import { DIRECTORY } from "./directory.js";

export default function handler(req: IncomingMessage, res: ServerResponse): void {
  const url = req.url ?? "/";
  if (url.includes("/preview")) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(APP_HTML);
    return;
  }
  res.setHeader("Content-Type", "application/json");
  if (url.startsWith("/did-it-win")) {
    res.end(JSON.stringify(DIRECTORY.tools[0]));
    return;
  }
  res.end(JSON.stringify(DIRECTORY));
}
