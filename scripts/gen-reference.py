import json
from scipy import stats, integrate
from scipy.stats import beta as beta_dist, norm
from statsmodels.stats.proportion import proportions_ztest, proportion_confint

cases = [
    # (label, xA, nA, xB, nB)  A=control, B=variant
    ("ben_example", 168, 4210, 203, 4305),
    ("clear_winner", 200, 10000, 280, 10000),
    ("clear_loser", 300, 10000, 220, 10000),
    ("tiny_sample", 3, 40, 7, 45),
    ("no_diff", 500, 25000, 505, 25000),
    ("high_rate", 4400, 8800, 4600, 8800),
    ("zero_conv_arm", 0, 500, 8, 500),
]

out = {"ztest": [], "wilson": [], "bayes": [], "samplesize": []}

for label, xA, nA, xB, nB in cases:
    # Pooled two-proportion z-test, two-sided (statsmodels)
    z, p = proportions_ztest([xB, xA], [nB, nA], alternative="two-sided", prop_var=False)
    out["ztest"].append({"label": label, "xA": xA, "nA": nA, "xB": xB, "nB": nB,
                         "z": float(z), "pValue": float(p)})
    # Wilson 95% for each arm
    for arm, x, n in (("A", xA, nA), ("B", xB, nB)):
        lo, hi = proportion_confint(x, n, alpha=0.05, method="wilson")
        out["wilson"].append({"label": f"{label}_{arm}", "x": x, "n": n,
                              "lo": float(lo), "hi": float(hi)})
    # Bayesian P(pB > pA), Beta(1,1) priors, by numerical integration
    aA, bA = xA + 1, nA - xA + 1
    aB, bB = xB + 1, nB - xB + 1
    f = lambda x: beta_dist.pdf(x, aB, bB) * beta_dist.cdf(x, aA, bA)
    # Hint the sharp posterior peaks or quad silently misses them (verified:
    # without points, the clear_loser case returns 1.9e-10 vs the true 1.9e-4).
    hints = sorted(set([aA/(aA+bA), aB/(aB+bB)]))
    pb, err = integrate.quad(f, 0, 1, limit=400, points=hints)
    out["bayes"].append({"label": label, "probBGtA": float(pb), "quadErr": float(err)})

# Wilson at other confidences for the slider path
for conf in (0.80, 0.90, 0.99):
    lo, hi = proportion_confint(168, 4210, alpha=1-conf, method="wilson")
    out["wilson"].append({"label": f"ben_A_conf{conf}", "x": 168, "n": 4210,
                          "conf": conf, "lo": float(lo), "hi": float(hi)})

# Sample size per arm: independent recomputation of the classic formula
def n_per_arm(p1, p2, alpha=0.05, power=0.8):
    za = norm.ppf(1 - alpha / 2); zb = norm.ppf(power)
    pbar = (p1 + p2) / 2; qbar = 1 - pbar
    num = (za * (2 * pbar * qbar) ** 0.5 + zb * (p1 * (1 - p1) + p2 * (1 - p2)) ** 0.5) ** 2
    return num / (p2 - p1) ** 2

for p1, p2, alpha, power in [(0.021, 0.0231, 0.05, 0.8), (0.02, 0.024, 0.05, 0.8),
                              (0.10, 0.12, 0.05, 0.8), (0.021, 0.0231, 0.10, 0.9)]:
    out["samplesize"].append({"p1": p1, "p2": p2, "alpha": alpha, "power": power,
                              "n": float(n_per_arm(p1, p2, alpha, power))})

# Normal CDF / inverse reference points for the approximations
out["norm"] = {
    "cdf": [{"x": x, "v": float(norm.cdf(x))} for x in (-3.5, -1.959963984540054, -0.5, 0, 0.5, 1.2815515655446004, 3.5)],
    "ppf": [{"p": p, "v": float(norm.ppf(p))} for p in (0.005, 0.025, 0.05, 0.2, 0.5, 0.8, 0.975, 0.995)],
}
print(json.dumps(out, indent=1))
