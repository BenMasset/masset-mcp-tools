/**
 * Masset Guide inline card (MCP Apps iframe side).
 *
 * Host mode: ask_masset tool results carry topic ids; the card renders the
 * matching topics from the bundled knowledge base (no round-trip needed).
 * Clicking a related chip re-renders locally and tells the model what the
 * user is now looking at via updateModelContext.
 * Standalone mode (opened directly, no host): renders the overview topic.
 */

import { App, applyDocumentTheme } from "@modelcontextprotocol/ext-apps";
import { getTopic, TOPICS, type Topic } from "../knowledge.js";
import "./fonts.css";
import "./mcp-app.css";

const app = new App({ name: "Masset Guide", version: "0.1.0" });

const $ = <T extends HTMLElement = HTMLElement>(id: string): T =>
  document.getElementById(id) as T;

const cardEl = $("card");
const connEl = $("conn-note");
const titleEl = $("topic-title");
const oneLinerEl = $("topic-oneliner");
const bodyEl = $("topic-body");
const factsEl = $("facts-list");
const relatedSection = $("related-section");
const chipsEl = $("related-chips");
const readBtn = $("cta-read") as HTMLButtonElement;
const tryBtn = $("cta-try") as HTMLButtonElement;

interface Model {
  current: Topic | null;
  related: Topic[];
  standalone: boolean;
}

const model: Model = { current: null, related: [], standalone: false };

function render(topic: Topic, related: Topic[]): void {
  model.current = topic;
  model.related = related;

  titleEl.textContent = topic.title;
  oneLinerEl.textContent = topic.oneLiner;
  bodyEl.textContent = topic.body;

  factsEl.replaceChildren(
    ...topic.facts.map((f) => {
      const li = document.createElement("li");
      li.textContent = f;
      return li;
    }),
  );

  const chips = related.length > 0 ? related : TOPICS.filter((t) => t.id !== topic.id).slice(0, 3);
  chipsEl.replaceChildren(
    ...chips.map((t) => {
      const btn = document.createElement("button");
      btn.className = "chip";
      btn.type = "button";
      btn.textContent = t.title;
      btn.addEventListener("click", () => {
        render(t, TOPICS.filter((x) => x.id !== t.id).slice(0, 3));
        // Keep the model in sync with what the user is now reading.
        app
          .updateModelContext({
            content: [
              {
                type: "text",
                text: `The user tapped into the "${t.title}" topic on the Masset Guide card. Summary: ${t.oneLiner}`,
              },
            ],
          })
          .catch(() => {});
      });
      return btn;
    }),
  );
  relatedSection.hidden = false;

  cardEl.hidden = false;
}

function openUrl(url: string): void {
  app.openLink({ url }).catch(() => {
    window.open(url, "_blank", "noopener");
  });
}

readBtn.addEventListener("click", () => {
  if (model.current) openUrl(model.current.url);
});

tryBtn.addEventListener("click", () => {
  openUrl("https://www.getmasset.com/signup");
});

// ---------- Host connection ----------

interface AnswerContent {
  kind: string;
  question?: string;
  topicIds?: string[];
}

app.ontoolresult = (result) => {
  const sc = result.structuredContent as unknown as AnswerContent | undefined;
  if (!sc || sc.kind !== "answer" || !sc.topicIds?.length) return;
  const topics = sc.topicIds.map(getTopic).filter((t): t is Topic => Boolean(t));
  if (topics.length === 0) return;
  render(topics[0], topics.slice(1));
};

app.onhostcontextchanged = (ctx) => {
  if (ctx?.theme) applyDocumentTheme(ctx.theme);
};

function enterStandalone(): void {
  if (model.current) return;
  model.standalone = true;
  connEl.textContent = "DEMO";
  const overview = getTopic("overview") ?? TOPICS[0];
  render(overview, TOPICS.filter((t) => t.id !== overview.id).slice(0, 3));
}

const connectTimeout = window.setTimeout(enterStandalone, 1500);

app
  .connect()
  .then(() => {
    window.clearTimeout(connectTimeout);
    const ctx = app.getHostContext();
    if (ctx?.theme) applyDocumentTheme(ctx.theme);
    window.setTimeout(enterStandalone, 3000);
  })
  .catch(() => {
    window.clearTimeout(connectTimeout);
    enterStandalone();
  });
