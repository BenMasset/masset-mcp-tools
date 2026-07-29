/**
 * Stats core tests, pinned to scipy/statsmodels reference values.
 * Fixtures: reference.json (regenerate with scripts/gen-reference.py).
 * Run: npm test
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  checkTest,
  normCdf,
  normInv,
  planTest,
  probVariantBeatsControl,
  requiredSamplePerArm,
  twoProportionTest,
  wilson,
} from "./stats.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const REF = JSON.parse(readFileSync(join(HERE, "reference.json"), "utf8"));

function close(actual: number, expected: number, tol: number, msg: string) {
  assert.ok(
    Math.abs(actual - expected) <= tol,
    `${msg}: got ${actual}, expected ${expected} (tol ${tol})`,
  );
}

test("normal CDF matches scipy", () => {
  for (const { x, v } of REF.norm.cdf) close(normCdf(x), v, 2e-7, `normCdf(${x})`);
});

test("inverse normal matches scipy", () => {
  for (const { p, v } of REF.norm.ppf) close(normInv(p), v, 1e-8, `normInv(${p})`);
});

test("two-proportion z-test matches statsmodels", () => {
  for (const c of REF.ztest) {
    const { z, pValue } = twoProportionTest(c.xA, c.nA, c.xB, c.nB);
    close(z, c.z, 1e-9, `${c.label} z`);
    close(pValue, c.pValue, 1e-6, `${c.label} p`);
  }
});

test("Wilson intervals match statsmodels", () => {
  for (const w of REF.wilson) {
    const conf = w.conf ?? 0.95;
    const { lo, hi } = wilson(w.x, w.n, conf);
    close(lo, w.lo, 1e-9, `${w.label} lo`);
    close(hi, w.hi, 1e-9, `${w.label} hi`);
  }
});

test("Bayesian P(variant > control) matches numerical integration", () => {
  for (const b of REF.bayes) {
    const c = REF.ztest.find((z: any) => z.label === b.label)!;
    const p = probVariantBeatsControl(c.xA, c.nA, c.xB, c.nB);
    close(p, b.probBGtA, 1e-6, `${b.label} P(B>A)`);
  }
});

test("Bayesian normal approximation agrees with exact sum at the switchover scale", () => {
  // Big-but-computable case: force both paths and compare.
  const exact = probVariantBeatsControl(2100, 100000, 2250, 100000);
  const meanA = 2101 / 100002, meanB = 2251 / 100002;
  const varA = (2101 * 97901) / (100002 ** 2 * 100003);
  const varB = (2251 * 97751) / (100002 ** 2 * 100003);
  const approx = normCdf((meanB - meanA) / Math.sqrt(varA + varB));
  close(exact, approx, 5e-4, "exact vs normal approx");
});

test("required sample per arm matches the reference formula", () => {
  for (const s of REF.samplesize) {
    close(
      requiredSamplePerArm(s.p1, s.p2, s.alpha, s.power),
      s.n,
      s.n * 1e-7,
      `n(${s.p1}->${s.p2})`,
    );
  }
});

// ---------- Verdict logic ----------

test("checkTest: the Ben example is not_yet with ~91% prob", () => {
  const r = checkTest({
    controlVisitors: 4210, controlConversions: 168,
    variantVisitors: 4305, variantConversions: 203,
  });
  assert.equal(r.verdict, "not_yet");
  close(r.pValue, 0.10133730681056473, 1e-6, "p");
  assert.ok(r.probVariantBetter > 0.9 && r.probVariantBetter < 0.96, `prob ${r.probVariantBetter}`);
  assert.ok(r.sample.perArmNeeded! > 4305, "needs more than we have");
  assert.ok(r.explanation.includes("Don't stop early"));
});

test("checkTest: clear winner / clear loser", () => {
  const w = checkTest({ controlVisitors: 10000, controlConversions: 200, variantVisitors: 10000, variantConversions: 280 });
  assert.equal(w.verdict, "winner");
  const l = checkTest({ controlVisitors: 10000, controlConversions: 300, variantVisitors: 10000, variantConversions: 220 });
  assert.equal(l.verdict, "loser");
});

test("checkTest: near-identical arms is no_difference", () => {
  const r = checkTest({ controlVisitors: 25000, controlConversions: 500, variantVisitors: 25000, variantConversions: 505 });
  assert.equal(r.verdict, "no_difference");
});

test("checkTest: identical rates is no_difference", () => {
  const r = checkTest({ controlVisitors: 1000, controlConversions: 50, variantVisitors: 1000, variantConversions: 50 });
  assert.equal(r.verdict, "no_difference");
});

test("checkTest: tiny samples warn", () => {
  const r = checkTest({ controlVisitors: 40, controlConversions: 3, variantVisitors: 45, variantConversions: 7 });
  assert.equal(r.verdict, "not_yet");
  assert.ok(r.warnings.length > 0);
});

test("checkTest: confidence slider changes the gate", () => {
  const base = { controlVisitors: 4210, controlConversions: 168, variantVisitors: 4305, variantConversions: 203 };
  assert.equal(checkTest({ ...base, confidence: 0.95 }).verdict, "not_yet");
  // p = 0.101, so at 88% confidence (alpha 0.12) this becomes significant.
  assert.equal(checkTest({ ...base, confidence: 0.88 }).verdict, "winner");
});

test("checkTest: daily traffic produces an ETA", () => {
  const r = checkTest({
    controlVisitors: 4210, controlConversions: 168,
    variantVisitors: 4305, variantConversions: 203,
    dailyVisitors: 1200,
  });
  assert.ok(r.sample.daysRemaining! >= 1);
});

test("checkTest: input guards", () => {
  assert.throws(() => checkTest({ controlVisitors: 100, controlConversions: 150, variantVisitors: 100, variantConversions: 5 }));
  assert.throws(() => checkTest({ controlVisitors: 0, controlConversions: 0, variantVisitors: 100, variantConversions: 5 }));
  assert.throws(() => checkTest({ controlVisitors: 100.5 as any, controlConversions: 5, variantVisitors: 100, variantConversions: 5 }));
  assert.throws(() => checkTest({ controlVisitors: 100, controlConversions: 5, variantVisitors: 100, variantConversions: 5, confidence: 0.5 }));
});

// ---------- Planning ----------

test("planTest: matches the reference sample-size math", () => {
  // 2.1% baseline, 10% relative lift -> p2 = 2.31%; reference n from scipy formula.
  const ref = REF.samplesize.find((s: any) => s.p1 === 0.021 && s.alpha === 0.05)!;
  const r = planTest({ baselineRate: 2.1, minDetectableLift: 10 });
  assert.equal(r.perArmNeeded, Math.ceil(ref.n));
  assert.equal(r.totalNeeded, r.perArmNeeded * 2);
});

test("planTest: percent and fraction inputs normalize the same", () => {
  const a = planTest({ baselineRate: 2.1, minDetectableLift: 10 });
  const b = planTest({ baselineRate: 0.021, minDetectableLift: 0.10 });
  assert.equal(a.perArmNeeded, b.perArmNeeded);
});

test("planTest: daily traffic gives days and long tests warn", () => {
  const r = planTest({ baselineRate: 2.1, minDetectableLift: 10, dailyVisitors: 800 });
  assert.equal(r.daysNeeded, Math.ceil(r.totalNeeded / 800));
  assert.ok(r.daysNeeded! > 60 ? r.warnings.length > 0 : true);
});

test("planTest: input guards", () => {
  assert.throws(() => planTest({ baselineRate: 0 }));
  assert.throws(() => planTest({ baselineRate: 120 }));
  assert.throws(() => planTest({ baselineRate: 60, minDetectableLift: 80 })); // target > 100%
});
