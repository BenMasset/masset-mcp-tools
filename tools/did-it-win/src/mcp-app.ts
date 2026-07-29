/**
 * Did It Win? inline card (MCP Apps iframe side).
 *
 * Host mode: results arrive via check_test / plan_test tool results.
 * The confidence slider recomputes locally with the same stats module the
 * server uses, so dragging it never needs a round-trip.
 * Standalone mode (opened directly, no host): renders a demo test.
 */

import { App, applyDocumentTheme } from "@modelcontextprotocol/ext-apps";
import {
  checkTest,
  planTest,
  type CheckInput,
  type CheckResult,
  type PlanResult,
} from "../stats.ts";
import "./fonts.css";
import "./mcp-app.css";

type Result = CheckResult | PlanResult;

interface Model {
  result: Result | null;
  /** Raw inputs of the last check, kept so the slider can recompute. */
  checkInput: CheckInput | null;
  standalone: boolean;
}

const model: Model = { result: null, checkInput: null, standalone: false };

const app = new App({ name: "Did It Win?", version: "0.1.0" });

const $ = <T extends HTMLElement = HTMLElement>(id: string): T =>
  document.getElementById(id) as T;

const cardEl = $("card");
const connEl = $("conn-note");
const eyebrowEl = $("eyebrow");
const bannerEl = $("verdict-banner");
const headlineEl = $("verdict-headline");
const subEl = $("verdict-sub");
const vizEl = $("viz");
const probSection = $("prob-section");
const probValue = $("prob-value");
const probFill = $("prob-fill");
const progressSection = $("progress-section");
const progressValue = $("progress-value");
const progressFill = $("progress-fill");
const progressNote = $("progress-note");
const explanationEl = $("explanation");
const warningsEl = $("warnings");
const confControl = $("confidence-control");
const confSlider = $("conf-slider") as HTMLInputElement;
const confValue = $("conf-value");
const detailsGrid = $("details-grid");

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const pct = (x: number, digits = 2) => `${(x * 100).toFixed(digits)}%`;
const int = (x: number) => Math.round(x).toLocaleString("en-US");

// ---------- Rendering ----------

const VERDICT_COPY: Record<string, { title: string; sub: string }> = {
  winner: { title: "WINNER", sub: "The variant beat the control, and the math holds up." },
  loser: { title: "LOSER", sub: "The variant did significantly worse. Keep the control." },
  not_yet: { title: "NOT YET", sub: "Promising, but not proof. Keep it running." },
  no_difference: { title: "NO REAL DIFFERENCE", sub: "These two are effectively tied. Test something bolder." },
};

function renderCheck(r: CheckResult): void {
  eyebrowEl.textContent = "DID IT WIN?";
  const copy = VERDICT_COPY[r.verdict];
  bannerEl.className = `verdict v-${r.verdict}`;
  headlineEl.textContent = copy.title;
  subEl.textContent = copy.sub;

  // Arm bars with Wilson bands. One shared scale so overlap is honest.
  const scaleMax = Math.max(r.control.ci.hi, r.variant.ci.hi) * 1.2 || 1;
  const px = (v: number) => `${Math.min(100, (v / scaleMax) * 100)}%`;
  const arm = (a: CheckResult["control"], kind: "control" | "variant") => `
    <div class="arm">
      <div class="arm-head">
        <span class="arm-name">${esc(a.label)}<span class="arm-counts mono">${int(a.conversions)} / ${int(a.visitors)}</span></span>
        <span class="arm-rate mono">${pct(a.rate)}</span>
      </div>
      <div class="track">
        <div class="band ${kind}" style="left:${px(a.ci.lo)};width:calc(${px(a.ci.hi)} - ${px(a.ci.lo)})"></div>
        <div class="tick ${kind}" style="left:${px(a.rate)}"></div>
      </div>
    </div>`;

  const lo = Math.max(r.control.ci.lo, r.variant.ci.lo);
  const hi = Math.min(r.control.ci.hi, r.variant.ci.hi);
  const overlap =
    hi > lo
      ? `The shaded ranges are where each true rate plausibly lives, and they <strong>overlap</strong>: that overlap is exactly why this needs more data before it counts as proof.`
      : `The shaded ranges are where each true rate plausibly lives, and they <strong>don't overlap</strong>: that separation is what proof looks like.`;

  vizEl.innerHTML = `
    <span class="section-label">CONVERSION RATES, WITH THEIR UNCERTAINTY</span>
    ${arm(r.control, "control")}
    ${arm(r.variant, "variant")}
    <p class="overlap-note">${overlap}</p>`;

  probSection.hidden = false;
  probValue.textContent = pct(r.probVariantBetter, 1);
  probFill.style.width = pct(r.probVariantBetter, 4);

  if (r.verdict === "not_yet" && r.sample.pctComplete !== null) {
    progressSection.hidden = false;
    progressValue.textContent = `${Math.round(r.sample.pctComplete * 100)}% of the visitors this needs`;
    progressFill.style.width = pct(r.sample.pctComplete, 2);
    const bits: string[] = [];
    if (r.sample.perArmNeeded) bits.push(`~${int(r.sample.perArmNeeded)} visitors per arm needed to trust a lift this size`);
    if (r.sample.moreVisitorsNeeded) bits.push(`${int(r.sample.moreVisitorsNeeded)} more to go`);
    if (r.sample.daysRemaining) bits.push(`about ${r.sample.daysRemaining} day${r.sample.daysRemaining === 1 ? "" : "s"} at your traffic`);
    progressNote.textContent = bits.join(" · ");
  } else {
    progressSection.hidden = true;
  }

  explanationEl.textContent = r.explanation;
  warningsEl.innerHTML = r.warnings.map((w) => `<div class="warning">${esc(w)}</div>`).join("");

  confControl.hidden = false;
  confSlider.value = String(Math.round(r.confidence * 100));
  confValue.textContent = `${Math.round(r.confidence * 100)}%`;

  detailsGrid.innerHTML = [
    ["p-value (two-sided)", r.pValue < 0.0001 ? r.pValue.toExponential(2) : r.pValue.toFixed(4)],
    ["z-score", r.zScore.toFixed(3)],
    [`${r.control.label} CI`, `${pct(r.control.ci.lo)} – ${pct(r.control.ci.hi)}`],
    [`${r.variant.label} CI`, `${pct(r.variant.ci.lo)} – ${pct(r.variant.ci.hi)}`],
    ["Absolute lift", `${r.lift.absolute >= 0 ? "+" : ""}${pct(r.lift.absolute)}`],
    ["Relative lift", r.lift.relative === null ? "n/a" : `${r.lift.relative >= 0 ? "+" : ""}${pct(r.lift.relative, 1)}`],
    ["P(variant better)", pct(r.probVariantBetter, 2)],
  ]
    .map(([k, v]) => `<span class="k">${esc(String(k))}</span><span>${esc(String(v))}</span>`)
    .join("");
}

function renderPlan(r: PlanResult): void {
  eyebrowEl.textContent = "PLAN YOUR TEST";
  bannerEl.className = "verdict v-plan";
  headlineEl.textContent = `${int(r.totalNeeded)} VISITORS`;
  subEl.textContent = r.headline;

  vizEl.innerHTML = `
    <span class="section-label">WHAT THIS TEST NEEDS</span>
    <div class="plan-grid">
      <div class="plan-cell"><div class="num mono">${int(r.perArmNeeded)}</div><div class="lbl">Per arm</div></div>
      <div class="plan-cell"><div class="num mono">${pct(r.baselineRate)} → ${pct(r.targetRate)}</div><div class="lbl">Lift to detect (${pct(r.minDetectableLift, 0)} relative)</div></div>
      <div class="plan-cell"><div class="num mono">${r.daysNeeded === null ? "—" : `${r.daysNeeded}d`}</div><div class="lbl">${r.daysNeeded === null ? "Days (give daily traffic)" : "At your daily traffic"}</div></div>
    </div>`;

  probSection.hidden = true;
  progressSection.hidden = true;
  confControl.hidden = true;

  explanationEl.textContent = r.explanation;
  warningsEl.innerHTML = r.warnings.map((w) => `<div class="warning">${esc(w)}</div>`).join("");

  detailsGrid.innerHTML = [
    ["Confidence", pct(r.confidence, 0)],
    ["Power", pct(r.power, 0)],
    ["Baseline", pct(r.baselineRate)],
    ["Target", pct(r.targetRate)],
  ]
    .map(([k, v]) => `<span class="k">${esc(String(k))}</span><span>${esc(String(v))}</span>`)
    .join("");
}

function render(r: Result): void {
  model.result = r;
  cardEl.hidden = false;
  if (r.kind === "plan") renderPlan(r);
  else renderCheck(r);
}

// ---------- Confidence slider: local recompute, no round-trip ----------

confSlider.addEventListener("input", () => {
  const conf = parseInt(confSlider.value, 10) / 100;
  confValue.textContent = `${confSlider.value}%`;
  if (!model.checkInput) return;
  try {
    render(checkTest({ ...model.checkInput, confidence: conf }));
  } catch {
    /* out-of-range guard; slider bounds already prevent this */
  }
});

// ---------- Host connection ----------

app.ontoolresult = (result) => {
  const sc = result.structuredContent as unknown as Result | undefined;
  if (!sc || (sc.kind !== "check" && sc.kind !== "plan")) return;
  if (sc.kind === "check") {
    model.checkInput = {
      controlVisitors: sc.control.visitors,
      controlConversions: sc.control.conversions,
      variantVisitors: sc.variant.visitors,
      variantConversions: sc.variant.conversions,
      confidence: sc.confidence,
      controlLabel: sc.control.label,
      variantLabel: sc.variant.label,
      dailyVisitors:
        sc.sample.daysRemaining !== null && sc.sample.moreVisitorsNeeded
          ? Math.ceil(sc.sample.moreVisitorsNeeded / sc.sample.daysRemaining)
          : undefined,
    };
  }
  render(sc);
};

app.onhostcontextchanged = (ctx) => {
  if (ctx?.theme) applyDocumentTheme(ctx.theme);
};

function enterStandalone(): void {
  if (model.result) return;
  model.standalone = true;
  connEl.textContent = "DEMO DATA";
  if (new URLSearchParams(window.location.search).get("demo") === "plan") {
    render(planTest({ baselineRate: 2.1, minDetectableLift: 10, dailyVisitors: 800 }));
    return;
  }
  const demo: CheckInput = {
    controlVisitors: 4210,
    controlConversions: 168,
    variantVisitors: 4305,
    variantConversions: 203,
    dailyVisitors: 1200,
    controlLabel: "Old headline",
    variantLabel: "New headline",
  };
  model.checkInput = demo;
  render(checkTest(demo));
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
