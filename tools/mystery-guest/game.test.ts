/**
 * Mystery Guest core tests: guess normalization, guess matching, daily
 * selection, and roster data validation.
 * Run: npm test
 */

import assert from "node:assert/strict";
import { test } from "node:test";
import { FIGURES, type Figure } from "./figures.ts";
import { dateUtc, EPOCH_DATE, figureForGameNumber, gameNumberFor, todaysGame } from "./game.ts";
import { matchesFigure, normalize } from "./guess.ts";

function figureById(id: string): Figure {
  const f = FIGURES.find((x) => x.id === id);
  assert.ok(f, `roster is missing ${id}`);
  return f;
}

// ---------- Normalization ----------

test("normalize lowercases and collapses whitespace", () => {
  assert.equal(normalize("  Marie   CURIE  "), "marie curie");
});

test("normalize strips diacritics", () => {
  assert.equal(normalize("Frida Kählo"), "frida kahlo");
  assert.equal(normalize("Léonard da Vinci"), "leonard da vinci");
  assert.equal(normalize("Cléopâtre"), "cleopatre");
});

test("normalize strips punctuation", () => {
  assert.equal(normalize("Sherlock Holmes?!"), "sherlock holmes");
  assert.equal(normalize("Mr. Holmes"), "mr holmes");
  assert.equal(normalize("van-Beethoven"), "van beethoven");
});

test("normalize drops a leading the", () => {
  assert.equal(normalize("The Bard"), "bard");
  assert.equal(normalize("the  bard"), "bard");
  // Only a leading "the" goes, and only as a whole word.
  assert.equal(normalize("Theodore the Great"), "theodore the great");
});

test("normalize handles empty and punctuation-only input", () => {
  assert.equal(normalize(""), "");
  assert.equal(normalize("   "), "");
  assert.equal(normalize("???"), "");
});

// ---------- Matching ----------

test("matching accepts the canonical name in any casing", () => {
  const einstein = figureById("albert-einstein");
  assert.ok(matchesFigure("Albert Einstein", einstein));
  assert.ok(matchesFigure("albert einstein", einstein));
  assert.ok(matchesFigure("  ALBERT   EINSTEIN!  ", einstein));
});

test("matching accepts a surname alias on its own", () => {
  assert.ok(matchesFigure("Einstein", figureById("albert-einstein")));
  assert.ok(matchesFigure("Curie", figureById("marie-curie")));
  assert.ok(matchesFigure("da Vinci", figureById("leonardo-da-vinci")));
  assert.ok(matchesFigure("Beethoven", figureById("ludwig-van-beethoven")));
  assert.ok(matchesFigure("the Bard", figureById("william-shakespeare")));
});

test("matching accepts the full name inside a sentence", () => {
  const curie = figureById("marie-curie");
  assert.ok(matchesFigure("I think you are Marie Curie", curie));
  assert.ok(matchesFigure("Are you Marie Curie?", curie));
  assert.ok(matchesFigure("my guess is definitely marie curie, final answer", curie));
});

test("matching rejects the wrong person", () => {
  const einstein = figureById("albert-einstein");
  assert.equal(matchesFigure("Isaac Newton", einstein), false);
  assert.equal(matchesFigure("Marie Curie", einstein), false);
  assert.equal(matchesFigure("Eisenstein", einstein), false);
});

test("matching rejects a bare first name that is not an alias", () => {
  // "Albert" alone is not listed, so it must not count.
  assert.equal(matchesFigure("Albert", figureById("albert-einstein")), false);
  // "Frida" is listed for Kahlo, so it must count.
  assert.ok(matchesFigure("Frida", figureById("frida-kahlo")));
});

test("matching rejects an alias buried in a sentence", () => {
  // Only the full canonical name is accepted inside longer text.
  assert.equal(matchesFigure("are you Einstein?", figureById("albert-einstein")), false);
});

test("matching rejects empty and punctuation-only guesses", () => {
  const holmes = figureById("sherlock-holmes");
  assert.equal(matchesFigure("", holmes), false);
  assert.equal(matchesFigure("   ", holmes), false);
  assert.equal(matchesFigure("???", holmes), false);
});

test("matching works for the fictional guest", () => {
  const holmes = figureById("sherlock-holmes");
  assert.ok(matchesFigure("Sherlock Holmes", holmes));
  assert.ok(matchesFigure("Holmes", holmes));
  assert.equal(matchesFigure("Mycroft Holmes", holmes), false);
  assert.equal(matchesFigure("Doctor Watson", holmes), false);
});

// ---------- Daily selection ----------

test("the epoch date is game 1", () => {
  assert.equal(gameNumberFor(EPOCH_DATE), 1);
  assert.equal(gameNumberFor("2026-07-29"), 1);
  assert.equal(gameNumberFor(new Date("2026-07-29T00:00:00Z")), 1);
});

test("game number advances one per UTC day", () => {
  assert.equal(gameNumberFor("2026-07-30"), 2);
  assert.equal(gameNumberFor("2026-08-01"), 4);
  assert.equal(gameNumberFor("2026-08-28"), 31);
});

test("game number is stable across a whole UTC day", () => {
  assert.equal(gameNumberFor("2026-08-11T00:00:00Z"), 14);
  assert.equal(gameNumberFor("2026-08-11T12:30:00Z"), 14);
  assert.equal(gameNumberFor("2026-08-11T23:59:59Z"), 14);
});

test("the game rolls over at UTC midnight, not local midnight", () => {
  // 23:30 in New York on Aug 11 is already Aug 12 in UTC, so it is the next game.
  assert.equal(gameNumberFor("2026-08-11T23:59:59Z"), 14);
  assert.equal(gameNumberFor("2026-08-12T00:00:00Z"), 15);
  assert.equal(gameNumberFor("2026-08-12T03:30:00Z"), 15);
});

test("dates before the epoch clamp to game 1 instead of failing", () => {
  assert.equal(gameNumberFor("2026-07-28"), 1);
  assert.equal(gameNumberFor("2020-01-01"), 1);
});

test("an invalid date is rejected", () => {
  assert.throws(() => gameNumberFor("not a date"));
  assert.throws(() => gameNumberFor(new Date("nope")));
});

test("dateUtc returns the UTC calendar date", () => {
  assert.equal(dateUtc("2026-07-29"), "2026-07-29");
  assert.equal(dateUtc("2026-08-12T23:59:59Z"), "2026-08-12");
});

test("the roster order is the schedule", () => {
  assert.equal(figureForGameNumber(1).id, FIGURES[0]!.id);
  assert.equal(figureForGameNumber(2).id, FIGURES[1]!.id);
  assert.equal(figureForGameNumber(FIGURES.length).id, FIGURES[FIGURES.length - 1]!.id);
});

test("selection wraps past the end of the roster", () => {
  const n = FIGURES.length;
  assert.equal(figureForGameNumber(n + 1).id, figureForGameNumber(1).id);
  assert.equal(figureForGameNumber(n + 2).id, figureForGameNumber(2).id);
  assert.equal(figureForGameNumber(2 * n + 3).id, figureForGameNumber(3).id);
});

test("selection rejects a game number that is not a positive integer", () => {
  assert.throws(() => figureForGameNumber(0));
  assert.throws(() => figureForGameNumber(-4));
  assert.throws(() => figureForGameNumber(2.5));
});

test("a fixed date always produces the same guest", () => {
  const a = todaysGame("2026-08-05T09:00:00Z");
  const b = todaysGame("2026-08-05T21:15:00Z");
  assert.equal(a.gameNumber, 8);
  assert.equal(a.dateUtc, "2026-08-05");
  assert.equal(a.figure.id, b.figure.id);
  assert.equal(a.figure.id, FIGURES[7]!.id);
});

test("todaysGame with no argument returns a playable game", () => {
  const g = todaysGame();
  assert.ok(g.gameNumber >= 1);
  assert.match(g.dateUtc, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(g.figure.name.length > 0);
});

// ---------- Roster data validation ----------

test("the roster is not empty", () => {
  assert.ok(FIGURES.length > 0);
});

test("figure ids are unique and kebab-case", () => {
  const seen = new Set<string>();
  for (const f of FIGURES) {
    assert.match(f.id, /^[a-z0-9]+(-[a-z0-9]+)*$/, `id not kebab-case: ${f.id}`);
    assert.ok(!seen.has(f.id), `duplicate id: ${f.id}`);
    seen.add(f.id);
  }
});

test("figure names are unique", () => {
  const seen = new Set<string>();
  for (const f of FIGURES) {
    const key = normalize(f.name);
    assert.ok(!seen.has(key), `duplicate name: ${f.name}`);
    seen.add(key);
  }
});

test("every figure has 8 to 12 dossier facts", () => {
  for (const f of FIGURES) {
    assert.ok(
      f.dossier.length >= 8 && f.dossier.length <= 12,
      `${f.name} has ${f.dossier.length} dossier facts, expected 8 to 12`,
    );
    for (const fact of f.dossier) {
      assert.ok(fact.trim().length > 0, `${f.name} has an empty dossier fact`);
    }
  }
});

test("every figure has at least one alias, and the alias is not the name again", () => {
  for (const f of FIGURES) {
    assert.ok(f.aliases.length >= 1, `${f.name} has no aliases`);
    for (const alias of f.aliases) {
      assert.ok(alias.trim().length > 0, `${f.name} has an empty alias`);
      assert.notEqual(normalize(alias), normalize(f.name), `${f.name} lists its own name as an alias`);
    }
  }
});

test("every figure has a persona and a reveal fact", () => {
  for (const f of FIGURES) {
    assert.ok(f.persona.trim().length > 0, `${f.name} has no persona`);
    assert.ok(f.revealFact.trim().length > 0, `${f.name} has no reveal fact`);
    assert.ok(f.era.trim().length > 0, `${f.name} has no era`);
  }
});

test("difficulty is 1, 2, or 3", () => {
  for (const f of FIGURES) {
    assert.ok([1, 2, 3].includes(f.difficulty), `${f.name} has difficulty ${f.difficulty}`);
  }
});

test("no string field contains an em dash", () => {
  const EM_DASH = "\u2014"; // Escaped so the character itself never appears in this repo.
  for (const f of FIGURES) {
    const strings = [f.id, f.name, f.category, f.era, f.persona, f.revealFact, ...f.aliases, ...f.dossier];
    for (const s of strings) {
      assert.ok(!s.includes(EM_DASH), `em dash in ${f.id}: ${s}`);
    }
  }
});

test("dossier facts are written in the third person, not the figure's voice", () => {
  // Deliberately narrow so regnal numerals ("King Francis I of France", "Elizabeth I")
  // never trip it. These markers only appear in genuinely first-person writing.
  const firstPerson = [/^I[\s']/, /\bI'(m|ve|ll|d)\b/i, /\bI (am|was|have)\b/, /\b(my|me|mine|myself)\b/i];
  for (const f of FIGURES) {
    for (const fact of f.dossier) {
      for (const marker of firstPerson) {
        assert.ok(!marker.test(fact), `first-person dossier fact for ${f.id}: ${fact}`);
      }
    }
  }
});

test("every figure guesses correctly against its own name and aliases", () => {
  for (const f of FIGURES) {
    assert.ok(matchesFigure(f.name, f), `${f.name} does not match its own name`);
    for (const alias of f.aliases) {
      assert.ok(matchesFigure(alias, f), `${f.name} does not match its alias ${alias}`);
    }
  }
});
