/**
 * Did It Win? — deterministic A/B test statistics.
 *
 * Pure math, no dependencies, no LLM anywhere. Shared by the MCP server
 * (tool results) and the inline UI (live confidence-slider recompute).
 * Every function is unit-tested against scipy/statsmodels reference values
 * in stats.test.ts; regenerate fixtures with scripts/gen-reference.py.
 *
 * Methods:
 *  - Two-proportion z-test, pooled variance, two-sided (the significance gate)
 *  - Wilson score intervals per arm (the uncertainty bars)
 *  - Bayesian P(variant > control), Beta(1,1) priors, exact closed form
 *    with a normal approximation above EXACT_SUM_LIMIT conversions
 *  - Classic two-proportion sample-size formula (the finish line)
 */

// ---------- Normal distribution primitives ----------

/** Abramowitz & Stegun 7.1.26 erf approximation, |error| < 1.5e-7. */
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-ax * ax);
  return sign * y;
}

export function normCdf(x: number): number {
  return 0.5 * (1 + erf(x / Math.SQRT2));
}

/** Acklam's inverse normal CDF, |relative error| < 1.15e-9. */
export function normInv(p: number): number {
  if (p <= 0 || p >= 1) throw new Error(`normInv domain: ${p}`);
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const plow = 0.02425;
  let q: number, r: number, x: number;
  if (p < plow) {
    q = Math.sqrt(-2 * Math.log(p));
    x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  } else if (p <= 1 - plow) {
    q = p - 0.5;
    r = q * q;
    x = ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
         ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  // No refinement: raw Acklam (|rel err| < 1.15e-9) beats refining through
  // the ~1.5e-7-accurate erf above, which was measurably worse in tests.
  return x;
}

// ---------- Log-gamma / log-beta (for the exact Bayesian sum) ----------

/** Lanczos approximation, g=7, n=9. */
export function logGamma(x: number): number {
  const g = 7;
  const coef = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  if (x < 0.5) {
    // Reflection formula
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  }
  x -= 1;
  let a = coef[0];
  const t = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += coef[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

function logBeta(a: number, b: number): number {
  return logGamma(a) + logGamma(b) - logGamma(a + b);
}

// ---------- Two-proportion z-test (pooled, two-sided) ----------

export interface ZTestResult {
  z: number;
  pValue: number;
}

export function twoProportionTest(xA: number, nA: number, xB: number, nB: number): ZTestResult {
  const pA = xA / nA;
  const pB = xB / nB;
  const pooled = (xA + xB) / (nA + nB);
  const se = Math.sqrt(pooled * (1 - pooled) * (1 / nA + 1 / nB));
  if (se === 0) return { z: 0, pValue: 1 };
  const z = (pB - pA) / se;
  const pValue = 2 * (1 - normCdf(Math.abs(z)));
  return { z, pValue: Math.min(1, Math.max(0, pValue)) };
}

// ---------- Wilson score interval ----------

export interface Interval {
  lo: number;
  hi: number;
}

export function wilson(x: number, n: number, confidence = 0.95): Interval {
  const z = normInv(1 - (1 - confidence) / 2);
  const p = x / n;
  const z2 = z * z;
  const denom = 1 + z2 / n;
  const center = (p + z2 / (2 * n)) / denom;
  const half = (z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / denom;
  return { lo: Math.max(0, center - half), hi: Math.min(1, center + half) };
}

// ---------- Bayesian probability the variant beats control ----------

/** Above this many variant successes, switch to the normal approximation. */
const EXACT_SUM_LIMIT = 20000;

/**
 * P(pB > pA) with independent Beta(1,1) priors.
 * Exact closed form (Evan Miller): sum over the variant's successes.
 */
export function probVariantBeatsControl(xA: number, nA: number, xB: number, nB: number): number {
  const aA = xA + 1, bA = nA - xA + 1;
  const aB = xB + 1, bB = nB - xB + 1;

  if (aB <= EXACT_SUM_LIMIT) {
    let total = 0;
    const lbA = logBeta(aA, bA);
    for (let i = 0; i < aB; i++) {
      total += Math.exp(
        logBeta(aA + i, bA + bB) - Math.log(bB + i) - logBeta(1 + i, bB) - lbA,
      );
    }
    return Math.min(1, Math.max(0, total));
  }

  // Normal approximation on the Beta posteriors (excellent at this size).
  const meanA = aA / (aA + bA);
  const meanB = aB / (aB + bB);
  const varA = (aA * bA) / ((aA + bA) ** 2 * (aA + bA + 1));
  const varB = (aB * bB) / ((aB + bB) ** 2 * (aB + bB + 1));
  return normCdf((meanB - meanA) / Math.sqrt(varA + varB));
}

// ---------- Sample size (per arm) ----------

/**
 * Classic two-proportion formula:
 * n = (z_{1-a/2} * sqrt(2*pbar*qbar) + z_{power} * sqrt(p1*q1 + p2*q2))^2 / (p2-p1)^2
 */
export function requiredSamplePerArm(
  p1: number,
  p2: number,
  alpha = 0.05,
  power = 0.8,
): number {
  if (p1 <= 0 && p2 <= 0) return Infinity;
  const delta = Math.abs(p2 - p1);
  if (delta === 0) return Infinity;
  const za = normInv(1 - alpha / 2);
  const zb = normInv(power);
  const pbar = (p1 + p2) / 2;
  const num = (za * Math.sqrt(2 * pbar * (1 - pbar)) + zb * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2;
  return num / (delta * delta);
}

// ---------- The verdict (check_test core) ----------

export type Verdict = "winner" | "loser" | "not_yet" | "no_difference";

export interface ArmSummary {
  label: string;
  visitors: number;
  conversions: number;
  rate: number;
  ci: Interval;
}

export interface CheckResult {
  kind: "check";
  verdict: Verdict;
  confidence: number;
  control: ArmSummary;
  variant: ArmSummary;
  lift: { absolute: number; relative: number | null };
  pValue: number;
  zScore: number;
  probVariantBetter: number;
  sample: {
    perArmNeeded: number | null;
    perArmSmallest: number;
    pctComplete: number | null;
    moreVisitorsNeeded: number | null;
    daysRemaining: number | null;
  };
  warnings: string[];
  headline: string;
  explanation: string;
}

export interface CheckInput {
  controlVisitors: number;
  controlConversions: number;
  variantVisitors: number;
  variantConversions: number;
  confidence?: number; // 0.80–0.99, default 0.95
  dailyVisitors?: number; // total/day across both arms, for the ETA
  controlLabel?: string;
  variantLabel?: string;
}

/** When detecting the observed difference needs more than this many visitors per arm, call it "no difference". */
const NO_DIFFERENCE_CEILING = 1_000_000;

function pct(x: number, digits = 2): string {
  return `${(x * 100).toFixed(digits)}%`;
}

export function checkTest(input: CheckInput): CheckResult {
  const {
    controlVisitors: nA,
    controlConversions: xA,
    variantVisitors: nB,
    variantConversions: xB,
  } = input;
  const confidence = input.confidence ?? 0.95;

  for (const [name, v] of Object.entries({
    controlVisitors: nA, controlConversions: xA, variantVisitors: nB, variantConversions: xB,
  })) {
    if (!Number.isFinite(v) || v < 0 || !Number.isInteger(v)) {
      throw new Error(`${name} must be a non-negative whole number (got ${v}).`);
    }
  }
  if (xA > nA) throw new Error("Control conversions exceed control visitors.");
  if (xB > nB) throw new Error("Variant conversions exceed variant visitors.");
  if (nA === 0 || nB === 0) throw new Error("Both arms need at least 1 visitor.");
  if (confidence < 0.8 || confidence > 0.99) {
    throw new Error("confidence must be between 0.80 and 0.99.");
  }

  const alpha = 1 - confidence;
  const pA = xA / nA;
  const pB = xB / nB;
  const { z, pValue } = twoProportionTest(xA, nA, xB, nB);
  const prob = probVariantBeatsControl(xA, nA, xB, nB);
  const liftAbs = pB - pA;
  const liftRel = pA > 0 ? liftAbs / pA : null;

  const warnings: string[] = [];
  if (nA < 100 || nB < 100) {
    warnings.push("Sample sizes under 100 per arm: the normal approximation behind this test is shaky. Treat this as directional only.");
  } else if (xA < 10 || xB < 10 || nA - xA < 10 || nB - xB < 10) {
    warnings.push("Fewer than 10 conversions (or non-conversions) in an arm: results are unstable at this count.");
  }

  // Finish line: visitors per arm needed to detect the OBSERVED difference.
  let perArmNeeded: number | null = null;
  const perArmSmallest = Math.min(nA, nB);
  if (xA + xB > 0 && liftAbs !== 0) {
    const n = requiredSamplePerArm(pA, pB, alpha, 0.8);
    perArmNeeded = Number.isFinite(n) ? Math.ceil(n) : null;
  }

  const significant = pValue < alpha;
  let verdict: Verdict;
  if (significant && liftAbs > 0) verdict = "winner";
  else if (significant && liftAbs < 0) verdict = "loser";
  else if (perArmNeeded !== null && perArmNeeded > NO_DIFFERENCE_CEILING) verdict = "no_difference";
  else if (xA + xB === 0) verdict = "not_yet";
  else if (liftAbs === 0) verdict = "no_difference";
  else verdict = "not_yet";

  const pctComplete =
    perArmNeeded !== null && verdict === "not_yet"
      ? Math.min(1, perArmSmallest / perArmNeeded)
      : null;
  const moreVisitorsNeeded =
    perArmNeeded !== null && verdict === "not_yet"
      ? Math.max(0, perArmNeeded - nA) + Math.max(0, perArmNeeded - nB)
      : null;
  const daysRemaining =
    moreVisitorsNeeded !== null && input.dailyVisitors && input.dailyVisitors > 0
      ? Math.ceil(moreVisitorsNeeded / input.dailyVisitors)
      : null;

  const controlLabel = input.controlLabel ?? "Control";
  const variantLabel = input.variantLabel ?? "Variant";

  let headline: string;
  let explanation: string;
  const confPct = Math.round(confidence * 100);
  switch (verdict) {
    case "winner":
      headline = `${variantLabel} won.`;
      explanation =
        `${variantLabel} converted at ${pct(pB)} vs ${pct(pA)} for ${controlLabel}, and the difference is statistically significant at ${confPct}% confidence ` +
        `(p = ${pValue.toPrecision(2)}). There is a ${pct(prob, 1)} probability the variant is genuinely better. Ship it.`;
      break;
    case "loser":
      headline = `${variantLabel} lost.`;
      explanation =
        `${variantLabel} converted at ${pct(pB)} vs ${pct(pA)} for ${controlLabel}, and the drop is statistically significant at ${confPct}% confidence ` +
        `(p = ${pValue.toPrecision(2)}). Keep ${controlLabel}.`;
      break;
    case "no_difference":
      headline = "No real difference.";
      explanation =
        `The observed gap between ${pct(pA)} and ${pct(pB)} is so small that proving it real would take ` +
        `${perArmNeeded === null ? "an impractical number of" : `over ${perArmNeeded.toLocaleString()}`} visitors per arm. ` +
        `If a difference this small matters to your business, keep running; otherwise call it a tie and test something bolder.`;
      break;
    default:
      headline = "Not yet. Keep it running.";
      explanation =
        `There's a ${pct(prob, 1)} probability ${variantLabel} is better, but that is not proof at ${confPct}% confidence (p = ${pValue.toPrecision(2)}). ` +
        (perArmNeeded !== null
          ? `To reliably detect the lift you're seeing, you need about ${perArmNeeded.toLocaleString()} visitors per arm; the smaller arm has ${perArmSmallest.toLocaleString()}.`
          : "Keep collecting data.") +
        (daysRemaining !== null ? ` At your current traffic that's roughly ${daysRemaining} more day${daysRemaining === 1 ? "" : "s"}.` : "") +
        " Don't stop early: calling tests before the finish line is the #1 way teams ship false winners.";
  }

  return {
    kind: "check",
    verdict,
    confidence,
    control: { label: controlLabel, visitors: nA, conversions: xA, rate: pA, ci: wilson(xA, nA, confidence) },
    variant: { label: variantLabel, visitors: nB, conversions: xB, rate: pB, ci: wilson(xB, nB, confidence) },
    lift: { absolute: liftAbs, relative: liftRel },
    pValue,
    zScore: z,
    probVariantBetter: prob,
    sample: { perArmNeeded, perArmSmallest, pctComplete, moreVisitorsNeeded, daysRemaining },
    warnings,
    headline,
    explanation,
  };
}

// ---------- Test planning (plan_test core) ----------

export interface PlanInput {
  baselineRate: number; // fraction (0.021) or percent (2.1); >1 treated as percent
  minDetectableLift?: number; // RELATIVE lift, fraction (0.10) or percent (10); default 10%
  confidence?: number; // default 0.95
  power?: number; // default 0.80
  dailyVisitors?: number; // total/day across both arms
}

export interface PlanResult {
  kind: "plan";
  baselineRate: number;
  targetRate: number;
  minDetectableLift: number;
  confidence: number;
  power: number;
  perArmNeeded: number;
  totalNeeded: number;
  daysNeeded: number | null;
  headline: string;
  explanation: string;
  warnings: string[];
}

function normalizeRate(v: number, name: string): number {
  if (!Number.isFinite(v) || v <= 0) throw new Error(`${name} must be a positive number.`);
  const frac = v > 1 ? v / 100 : v;
  if (frac >= 1) throw new Error(`${name} must be below 100%.`);
  return frac;
}

export function planTest(input: PlanInput): PlanResult {
  const baseline = normalizeRate(input.baselineRate, "baselineRate");
  const liftRaw = input.minDetectableLift ?? 0.10;
  const lift = liftRaw > 1 ? liftRaw / 100 : liftRaw;
  if (!Number.isFinite(lift) || lift <= 0) throw new Error("minDetectableLift must be positive.");
  const confidence = input.confidence ?? 0.95;
  const power = input.power ?? 0.8;
  if (confidence < 0.8 || confidence > 0.99) throw new Error("confidence must be between 0.80 and 0.99.");
  if (power < 0.5 || power > 0.99) throw new Error("power must be between 0.50 and 0.99.");

  const target = baseline * (1 + lift);
  if (target >= 1) throw new Error("baseline times (1 + lift) exceeds 100%; check your inputs.");

  const perArm = Math.ceil(requiredSamplePerArm(baseline, target, 1 - confidence, power));
  const total = perArm * 2;
  const daysNeeded =
    input.dailyVisitors && input.dailyVisitors > 0 ? Math.ceil(total / input.dailyVisitors) : null;

  const warnings: string[] = [];
  if (daysNeeded !== null && daysNeeded > 60) {
    warnings.push("Over two months at your traffic: consider testing a bolder change (bigger expected lift) or a higher-traffic page.");
  }
  if (lift < 0.05) {
    warnings.push("Detecting lifts under 5% takes enormous samples. Most teams should test bigger swings.");
  }

  const headline = `You need about ${total.toLocaleString()} visitors (${perArm.toLocaleString()} per arm).`;
  const explanation =
    `To detect a ${pct(lift, 0)} relative lift on a ${pct(baseline, 1)} baseline (from ${pct(baseline)} to ${pct(target)}) ` +
    `at ${Math.round(confidence * 100)}% confidence with ${Math.round(power * 100)}% power, plan for ${perArm.toLocaleString()} visitors per arm.` +
    (daysNeeded !== null ? ` At ${input.dailyVisitors!.toLocaleString()} visitors/day, that's about ${daysNeeded} days. Decide the end date now, and don't call it early.` : " Decide the end date before you start, and don't call it early.");

  return {
    kind: "plan",
    baselineRate: baseline,
    targetRate: target,
    minDetectableLift: lift,
    confidence,
    power,
    perArmNeeded: perArm,
    totalNeeded: total,
    daysNeeded,
    headline,
    explanation,
    warnings,
  };
}
