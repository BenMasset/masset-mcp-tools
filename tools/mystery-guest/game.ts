/**
 * Mystery Guest · daily figure selection.
 *
 * Everyone in the world gets the same guest on the same UTC day, and the
 * server stores nothing: the game number is a pure function of the date, and
 * the guest is a pure function of the game number.
 *
 *   game #1  = EPOCH_DATE (2026-07-29, UTC)
 *   game #N  = N - 1 days after the epoch
 *   guest    = FIGURES[(N - 1) % FIGURES.length]
 *
 * Every function takes an optional date (a Date or an ISO string) so tests can
 * pin the clock. Defaults to now.
 */

import { FIGURES, type Figure } from "./figures.js";

/** The UTC day that is game #1. */
export const EPOCH_DATE = "2026-07-29";

const MS_PER_DAY = 86_400_000;

/** Parses a Date or ISO string and returns the UTC midnight that contains it. */
function utcMidnight(when: Date | string): number {
  const d = typeof when === "string" ? new Date(when.length === 10 ? `${when}T00:00:00Z` : when) : when;
  const ms = d.getTime();
  if (Number.isNaN(ms)) throw new Error(`Invalid date: ${String(when)}`);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

/** The UTC calendar date, formatted YYYY-MM-DD. */
export function dateUtc(when: Date | string = new Date()): string {
  return new Date(utcMidnight(when)).toISOString().slice(0, 10);
}

/**
 * The game number for a moment in time. Game #1 is EPOCH_DATE.
 * Dates before the epoch clamp to game #1 rather than failing, so a client
 * with a badly set clock still gets a playable game.
 */
export function gameNumberFor(when: Date | string = new Date()): number {
  const days = Math.round((utcMidnight(when) - utcMidnight(EPOCH_DATE)) / MS_PER_DAY);
  return Math.max(1, days + 1);
}

/** The guest for a given game number. The roster order is the schedule. */
export function figureForGameNumber(gameNumber: number): Figure {
  if (!Number.isInteger(gameNumber) || gameNumber < 1) {
    throw new Error(`Game number must be a positive integer, got ${gameNumber}`);
  }
  const figure = FIGURES[(gameNumber - 1) % FIGURES.length];
  if (!figure) throw new Error("The figure roster is empty.");
  return figure;
}

export interface DailyGame {
  gameNumber: number;
  dateUtc: string;
  figure: Figure;
}

/** Everything the server needs for one day of play. */
export function todaysGame(when: Date | string = new Date()): DailyGame {
  const gameNumber = gameNumberFor(when);
  return { gameNumber, dateUtc: dateUtc(when), figure: figureForGameNumber(gameNumber) };
}
