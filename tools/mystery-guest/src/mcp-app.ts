/**
 * Mystery Guest inline card (MCP Apps iframe side).
 *
 * Host mode: start_todays_game and check_guess tool results arrive as
 * structuredContent and pick the state. Everything the card shows comes from
 * that payload, so the card never holds the answer and cannot leak it during
 * a game in progress.
 * Standalone mode (opened directly, no host, e.g. the preview route):
 * renders the reveal state with demo data.
 */

import { App, applyDocumentTheme } from "@modelcontextprotocol/ext-apps";
import "./fonts.css";
import "./mcp-app.css";

interface StartedContent {
  kind: "started";
  gameNumber: number;
  dateUtc: string;
}

interface ResultContent {
  kind: "result";
  gameNumber: number;
  dateUtc: string;
  outcome: "correct" | "wrong" | "surrendered";
  questionsUsed: number;
  guestName?: string;
  guestEra?: string;
  revealFact?: string;
  shareText?: string;
}

type CardContent = StartedContent | ResultContent;

interface Model {
  content: CardContent | null;
  standalone: boolean;
  shareText: string;
}

const model: Model = { content: null, standalone: false, shareText: "" };

const app = new App({ name: "Mystery Guest", version: "0.1.0" });

const $ = <T extends HTMLElement = HTMLElement>(id: string): T =>
  document.getElementById(id) as T;

const cardEl = $("card");
const eyebrowEl = $("eyebrow");
const connEl = $("conn-note");
const heroEl = $("hero");
const heroEyebrowEl = $("hero-eyebrow");
const heroTitleEl = $("hero-title");
const heroMetaEl = $("hero-meta");
const accentRuleEl = $("accent-rule");
const heroLineEl = $("hero-line");
const noteSection = $("note-section");
const noteTextEl = $("note-text");
const factSection = $("fact-section");
const factTextEl = $("fact-text");
const shareSection = $("share-section");
const shareTextEl = $("share-text");
const shareNoteEl = $("share-note");
const copyBtn = $("copy-btn") as HTMLButtonElement;

const SHARE_NOTE_DEFAULT = "A new guest is seated every day at midnight UTC.";
const SHARE_NOTE_BLOCKED =
  "Copying is blocked in this window, so the text above is selected for you.";

const SHARE_URL = "mcp.getmasset.com/mystery-guest";

const DEMO_REVEAL_FACT =
  "She was aiming for Paris on her solo Atlantic flight in 1932, ran into ice and a leaking fuel line, and put the plane down in a cow pasture in Northern Ireland instead.";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function questionWord(n: number): string {
  return n === 1 ? "question" : "questions";
}

/** "You got them in 6 questions." with the count set in mono, a size up. */
function countLine(prefix: string, n: number, suffix: string): string {
  return `${esc(prefix)} <span class="score">${esc(String(n))}</span> ${esc(questionWord(n))}${esc(suffix)}`;
}

// ---------- Rendering ----------

function resetCard(): void {
  heroMetaEl.hidden = true;
  accentRuleEl.hidden = true;
  noteSection.hidden = true;
  factSection.hidden = true;
  shareSection.hidden = true;
  heroEyebrowEl.textContent = "";
  heroMetaEl.textContent = "";
  factTextEl.textContent = "";
  heroLineEl.textContent = "";
}

function setTopbar(gameNumber: number, dateUtc: string): void {
  eyebrowEl.textContent = `MYSTERY GUEST · #${gameNumber}`;
  connEl.textContent = model.standalone ? "DEMO DATA" : dateUtc;
}

function setShare(text: string): void {
  model.shareText = text;
  shareTextEl.textContent = text;
  shareSection.hidden = false;
  resetCopyButton();
}

function fallbackShareText(c: ResultContent): string {
  const word = questionWord(c.questionsUsed);
  if (c.outcome === "correct") {
    return `🎙️ Mystery Guest #${c.gameNumber} · ✅ got them in ${c.questionsUsed} ${word} · ${SHARE_URL}`;
  }
  return `🎙️ Mystery Guest #${c.gameNumber} · ❌ gave up after ${c.questionsUsed} ${word} · ${SHARE_URL}`;
}

function renderStarted(c: StartedContent): void {
  resetCard();
  setTopbar(c.gameNumber, c.dateUtc);
  heroEl.className = "hero h-started";
  heroEyebrowEl.textContent = "TODAY'S GUEST IS WAITING";
  heroTitleEl.textContent = "The guest is seated. Ask your first question.";
  heroLineEl.textContent =
    "They will answer in character, and they will be a little evasive, but they will not lie to you.";
  noteTextEl.textContent =
    "One guest a day, and it is the same guest for everyone in the world. Ask anything you like, guess whenever you are ready, and your score is how few questions it took.";
  noteSection.hidden = false;
  cardEl.hidden = false;
}

function renderWrong(c: ResultContent): void {
  resetCard();
  setTopbar(c.gameNumber, c.dateUtc);
  heroEl.className = "hero h-wrong";
  heroEyebrowEl.textContent = "STILL A MYSTERY";
  heroTitleEl.textContent = "Not them. The interview continues.";
  heroLineEl.innerHTML = countLine("You have asked", c.questionsUsed, " so far.");
  noteTextEl.textContent =
    "Nothing is revealed on a wrong guess. Keep interviewing, and guess again when you have a better read on them.";
  noteSection.hidden = false;
  cardEl.hidden = false;
}

function renderReveal(c: ResultContent): void {
  resetCard();
  setTopbar(c.gameNumber, c.dateUtc);

  const solved = c.outcome === "correct";
  heroEl.className = solved ? "hero h-correct" : "hero h-surrendered";
  heroEyebrowEl.textContent = solved ? "SOLVED" : "THE GUEST WAS";
  heroTitleEl.textContent = c.guestName ?? "Today's guest";

  if (c.guestEra) {
    heroMetaEl.textContent = c.guestEra;
    heroMetaEl.hidden = false;
  }

  accentRuleEl.hidden = false;

  heroLineEl.innerHTML = solved
    ? countLine("You got them in", c.questionsUsed, ".")
    : countLine("You gave up after", c.questionsUsed, ".");

  if (c.revealFact) {
    factTextEl.textContent = c.revealFact;
    factSection.hidden = false;
  }

  setShare(c.shareText ?? fallbackShareText(c));
  cardEl.hidden = false;
}

function render(c: CardContent): void {
  model.content = c;
  if (c.kind === "started") {
    renderStarted(c);
    return;
  }
  if (c.outcome === "wrong") {
    renderWrong(c);
    return;
  }
  renderReveal(c);
}

// ---------- Copy button ----------

let copyResetTimer = 0;

function resetCopyButton(): void {
  window.clearTimeout(copyResetTimer);
  copyBtn.classList.remove("copied");
  copyBtn.textContent = "Copy";
  shareNoteEl.textContent = SHARE_NOTE_DEFAULT;
}

/** Last resort: put the share text under the cursor so the reader can copy it. */
function selectShareText(): void {
  const range = document.createRange();
  range.selectNodeContents(shareTextEl);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

function confirmCopied(ok: boolean): void {
  window.clearTimeout(copyResetTimer);
  copyBtn.classList.toggle("copied", ok);
  if (ok) {
    copyBtn.textContent = "Copied";
    shareNoteEl.textContent = SHARE_NOTE_DEFAULT;
  } else {
    copyBtn.textContent = "Selected";
    shareNoteEl.textContent = SHARE_NOTE_BLOCKED;
    selectShareText();
  }
  copyResetTimer = window.setTimeout(resetCopyButton, 2600);
}

/** Older hosts and locked-down iframes have no clipboard API, so fall back. */
function legacyCopy(text: string): boolean {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "0";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(area);
  return ok;
}

copyBtn.addEventListener("click", () => {
  const text = model.shareText;
  if (!text) return;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => confirmCopied(true))
      .catch(() => confirmCopied(legacyCopy(text)));
    return;
  }
  confirmCopied(legacyCopy(text));
});

// ---------- Host connection ----------

function isCardContent(value: unknown): value is CardContent {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<Omit<ResultContent, "kind">> & { kind?: unknown };
  if (v.kind === "started") return typeof v.gameNumber === "number";
  if (v.kind !== "result") return false;
  return (
    typeof v.gameNumber === "number" &&
    typeof v.questionsUsed === "number" &&
    (v.outcome === "correct" || v.outcome === "wrong" || v.outcome === "surrendered")
  );
}

app.ontoolresult = (result) => {
  const sc = result.structuredContent as unknown;
  if (!isCardContent(sc)) return;
  model.standalone = false;
  render(sc);
};

app.onhostcontextchanged = (ctx) => {
  if (ctx?.theme) applyDocumentTheme(ctx.theme);
};

/**
 * No host and no tool result: show the reveal state with demo data.
 * The demo query param renders the other states for preview and review,
 * the same way the Did It Win? card switches its standalone demo.
 */
function enterStandalone(): void {
  if (model.content) return;
  model.standalone = true;

  const demo = new URLSearchParams(window.location.search).get("demo");

  if (demo === "started") {
    render({ kind: "started", gameNumber: 14, dateUtc: "2026-08-11" });
    return;
  }

  if (demo === "wrong") {
    render({
      kind: "result",
      gameNumber: 14,
      dateUtc: "2026-08-11",
      outcome: "wrong",
      questionsUsed: 4,
    });
    return;
  }

  if (demo === "surrendered") {
    render({
      kind: "result",
      gameNumber: 14,
      dateUtc: "2026-08-11",
      outcome: "surrendered",
      questionsUsed: 11,
      guestName: "Amelia Earhart",
      guestEra: "1897-1937",
      revealFact: DEMO_REVEAL_FACT,
      shareText: `🎙️ Mystery Guest #14 · ❌ gave up after 11 questions · ${SHARE_URL}`,
    });
    return;
  }

  render({
    kind: "result",
    gameNumber: 14,
    dateUtc: "2026-08-11",
    outcome: "correct",
    questionsUsed: 6,
    guestName: "Amelia Earhart",
    guestEra: "1897-1937",
    revealFact: DEMO_REVEAL_FACT,
    shareText: `🎙️ Mystery Guest #14 · ✅ got them in 6 questions · ${SHARE_URL}`,
  });
}

const connectTimeout = window.setTimeout(enterStandalone, 1500);

app
  .connect()
  .then(() => {
    window.clearTimeout(connectTimeout);
    const ctx = app.getHostContext();
    if (ctx?.theme) applyDocumentTheme(ctx.theme);
    // If the host never delivers a tool result (unusual), fall back to demo.
    window.setTimeout(enterStandalone, 3000);
  })
  .catch(() => {
    window.clearTimeout(connectTimeout);
    enterStandalone();
  });
