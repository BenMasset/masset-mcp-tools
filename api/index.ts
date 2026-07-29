/**
 * Identity routes: / (directory), /did-it-win (tool identity), /did-it-win/preview (standalone card),
 * /chess (tool identity), /chess/preview (standalone card).
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import { APP_HTML as DID_IT_WIN_APP_HTML } from "../tools/did-it-win/app-html.generated.js";
import { APP_HTML as CHESS_APP_HTML } from "../tools/chess/app-html.generated.js";
import { DIRECTORY } from "./directory.js";

export default function handler(req: IncomingMessage, res: ServerResponse): void {
  const url = req.url ?? "/";
  if (url.includes("/preview")) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    if (url.startsWith("/chess")) {
      res.end(CHESS_APP_HTML);
      return;
    }
    res.end(DID_IT_WIN_APP_HTML);
    return;
  }
  res.setHeader("Content-Type", "application/json");
  if (url.startsWith("/did-it-win")) {
    res.end(JSON.stringify(DIRECTORY.tools[0]));
    return;
  }
  if (url.startsWith("/chess")) {
    res.end(JSON.stringify(DIRECTORY.tools[1]));
    return;
  }
  res.end(JSON.stringify(DIRECTORY));
}
