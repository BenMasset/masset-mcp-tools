/**
 * Mystery Guest · guess matching.
 *
 * The server is the impartial judge, so matching has to be generous about how
 * a person types a name and strict about who the name belongs to. It accepts
 * the canonical name, any listed alias, and a sentence that contains the full
 * canonical name ("I think you are Marie Curie"). It accepts nothing else.
 */

import type { Figure } from "./figures.js";

/** Unicode combining marks, stripped after an NFD decomposition. */
const DIACRITICS = /[\u0300-\u036f]/g;

/**
 * Lowercases, strips diacritics, removes punctuation, collapses whitespace,
 * and drops a leading "the". So "Thé  Bard!" and "the bard" both become "bard".
 */
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^the\s+/, "")
    .trim();
}

/** True when the guess names this figure. */
export function matchesFigure(guess: string, figure: Figure): boolean {
  const g = normalize(guess);
  if (!g) return false;

  const name = normalize(figure.name);
  if (name && g === name) return true;

  for (const alias of figure.aliases) {
    const a = normalize(alias);
    if (a && g === a) return true;
  }

  return name.length > 0 && g.includes(name);
}
