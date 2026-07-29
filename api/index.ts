/** Identity routes: / (directory), /<tool> (tool identity), /<tool>/preview (standalone card). */
import type { IncomingMessage, ServerResponse } from "node:http";
import { DIRECTORY } from "./directory.js";

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const url = req.url ?? "/";

  if (url.includes("/preview")) {
    const { APP_HTML } = url.startsWith("/masset-guide")
      ? await import("../tools/masset-guide/app-html.generated.js")
      : await import("../tools/did-it-win/app-html.generated.js");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(APP_HTML);
    return;
  }

  res.setHeader("Content-Type", "application/json");
  if (url.startsWith("/did-it-win")) {
    res.end(JSON.stringify(DIRECTORY.tools[0]));
    return;
  }
  if (url.startsWith("/masset-guide")) {
    res.end(JSON.stringify(DIRECTORY.tools[1]));
    return;
  }
  res.end(JSON.stringify(DIRECTORY));
}
