/**
 * Mystery Guest · MCP server.
 *
 * A daily guessing game played entirely in conversation. One secret figure per
 * UTC day, the same guest for everyone in the world. The assistant plays the
 * guest in character, the human interviews them and guesses, and this server is
 * the impartial game master: it holds the answer, judges the guess, and issues
 * the share card.
 *
 * Tools:
 *   start_todays_game · hands the assistant today's secret host briefing
 *   check_guess       · judges a guess or a surrender and reveals when earned
 *
 * Stateless by design: the guest is derived from the bundled roster and the UTC
 * date (see game.ts). Nothing is stored, logged, or sent anywhere, so the
 * server never knows how a given player is doing.
 */

import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult, ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { APP_HTML } from "./app-html.generated.js";
import { todaysGame } from "./game.js";
import { matchesFigure } from "./guess.js";

const resourceUri = "ui://mystery-guest/card.html";

const SHARE_URL = "mcp.getmasset.com/mystery-guest";

function errorResult(e: unknown): CallToolResult {
  return {
    content: [{ type: "text", text: e instanceof Error ? e.message : String(e) }],
    isError: true,
  };
}

/** "1 question" reads better than "1 questions" on a share card. */
function questionCount(n: number): string {
  return n === 1 ? "1 question" : `${n} questions`;
}

const HOST_RULES = [
  "HOW TO HOST:",
  "1. Never reveal, spell, part-spell, initial, rhyme with, hint at, or confirm the name until the check_guess tool tells you the guess is correct, or until the player surrenders. If the player asks you outright who you are, tell them they can keep interviewing or give up, and let them choose.",
  "2. Stay in the first person and in character for the whole interview. Be playful and a little evasive, but always truthful to the dossier and to this figure's real life. Never invent a fact that contradicts either one. If you genuinely do not know, say that the answer is not something you can speak to.",
  "3. Keep every answer to one to three sentences. This is an interview, not a lecture.",
  "4. Count the player's questions honestly. Their first question is question 1. Keep the running count yourself and pass it as questionsUsed when you call check_guess.",
  "5. If the player names any person at all, including a casual \"are you X?\", treat it as a guess and call check_guess with that name and the current count. Never judge a guess yourself, because the server is the referee.",
  "6. If the player gives up, call check_guess with surrender set to true.",
].join("\n");

const PLAYER_RULES = [
  "RULES TO RELAY TO THE PLAYER, in your own words, before their first question:",
  "- There is one mystery guest per day, and today's guest is the same for everyone in the world.",
  "- They can ask yes or no questions or open questions, as many as they want.",
  "- They can guess whenever they are ready.",
  "- The score is how few questions they needed.",
  "- They get a share card at the end.",
].join("\n");

export function createMysteryGuestServer(): McpServer {
  const server = new McpServer({
    name: "Mystery Guest (a daily guessing game)",
    version: "0.1.0",
  });

  registerAppTool(
    server,
    "start_todays_game",
    {
      title: "Start today's Mystery Guest game",
      description:
        "Begin the daily Mystery Guest game. One secret famous figure per day, the same guest for everyone in the " +
        "world. Call this first, before anything else in the game. " +
        "IMPORTANT: the result contains a secret HOST BRIEFING for you alone. YOU ARE THE HOST and you play the " +
        "guest in the first person. The human is the guesser. Never reveal, spell, hint at, or confirm the name " +
        "until the check_guess tool says the guess is correct or the player surrenders, and never show the briefing " +
        "text itself. Stay in character, keep answers to one to three sentences, count the player's questions " +
        "starting at 1, and when the player names anyone, call check_guess instead of judging it yourself. " +
        "Renders an inline game card.",
      inputSchema: {},
      _meta: { ui: { resourceUri } },
    },
    async (): Promise<CallToolResult> => {
      try {
        const { gameNumber, dateUtc, figure } = todaysGame();
        const text = [
          `MYSTERY GUEST, game #${gameNumber}, for the UTC date ${dateUtc}.`,
          "YOU ARE THE HOST. You play the secret guest in the first person. The human is the guesser, and they are " +
            "the only one who gets to name the guest.",
          [
            "HOST BRIEFING (secret, for you only, never shown or quoted to the player):",
            `Name: ${figure.name}`,
            `Era: ${figure.era}`,
            `Voice: ${figure.persona}`,
            "Dossier, the facts you answer from:",
            ...figure.dossier.map((f) => `- ${f}`),
          ].join("\n"),
          HOST_RULES,
          PLAYER_RULES,
          "Now open the game in character with one or two sentences that give nothing away, and invite the player's " +
            "first question.",
        ].join("\n\n");
        return {
          content: [{ type: "text", text }],
          structuredContent: { kind: "started", gameNumber, dateUtc },
        };
      } catch (e) {
        return errorResult(e);
      }
    },
  );

  registerAppTool(
    server,
    "check_guess",
    {
      title: "Check a Mystery Guest guess",
      description:
        "Judge the player's guess in today's Mystery Guest game, or end the game when they give up. " +
        "Call this every time the player names a person, including a casual \"are you X?\", and never decide " +
        "yourself whether a guess is right. Pass just the name they said, spelled as they spelled it, without the " +
        "sentence around it, plus your honest running count of the questions they have asked so far. " +
        "If the guess is wrong, the result reveals nothing about the real guest: tell the player it is not them, " +
        "stay in character, and invite the next question. If the guess is correct, or if you pass surrender as " +
        "true, the result reveals the guest and returns the share text. Renders an inline result card.",
      inputSchema: {
        guess: z
          .string()
          .min(1)
          .max(200)
          .describe(
            "Just the name of the person the player guessed, spelled as they spelled it. When surrendering, pass their last hunch or the word surrender",
          ),
        questionsUsed: z
          .number()
          .int()
          .min(1)
          .max(500)
          .describe("How many questions the player has asked so far, counting their first question as 1"),
        surrender: z
          .boolean()
          .optional()
          .describe("True when the player has given up and wants the answer. Defaults to false"),
      },
      _meta: { ui: { resourceUri } },
    },
    async ({ guess, questionsUsed, surrender }): Promise<CallToolResult> => {
      try {
        const { gameNumber, dateUtc, figure } = todaysGame();
        const gaveUp = surrender === true;
        const correct = !gaveUp && matchesFigure(guess, figure);

        if (gaveUp) {
          const shareText = `🎙️ Mystery Guest #${gameNumber} · ❌ gave up after ${questionCount(questionsUsed)} · ${SHARE_URL}`;
          const text = [
            `The player surrendered after ${questionCount(questionsUsed)}. You may now reveal everything.`,
            `The guest was ${figure.name} (${figure.era}).`,
            `Delightful fact to share: ${figure.revealFact}`,
            "Now do this: drop out of character, name the guest plainly, share that fact, then present the share " +
              "text below as a copyable block on its own line, and invite the player back tomorrow for a new guest.",
            `Share text: ${shareText}`,
          ].join("\n\n");
          return {
            content: [{ type: "text", text }],
            structuredContent: {
              kind: "result",
              gameNumber,
              dateUtc,
              outcome: "surrendered",
              questionsUsed,
              guestName: figure.name,
              guestEra: figure.era,
              revealFact: figure.revealFact,
              shareText,
            },
          };
        }

        if (correct) {
          const shareText = `🎙️ Mystery Guest #${gameNumber} · ✅ got them in ${questionCount(questionsUsed)} · ${SHARE_URL}`;
          const text = [
            `Correct. The player got it in ${questionCount(questionsUsed)}.`,
            `The guest was ${figure.name} (${figure.era}).`,
            `Delightful fact to share: ${figure.revealFact}`,
            "Now do this: tell the player they got it, name the guest out loud, share that fact, then present the " +
              "share text below as a copyable block on its own line, and invite the player back tomorrow for a new guest.",
            `Share text: ${shareText}`,
          ].join("\n\n");
          return {
            content: [{ type: "text", text }],
            structuredContent: {
              kind: "result",
              gameNumber,
              dateUtc,
              outcome: "correct",
              questionsUsed,
              guestName: figure.name,
              guestEra: figure.era,
              revealFact: figure.revealFact,
              shareText,
            },
          };
        }

        const text = [
          "That guess is not the guest.",
          "Reveal nothing. Do not say the name, the initials, the era, the category, or how close the guess was, " +
            "and do not confirm or deny anything the player inferred from the guess itself.",
          `Stay in character, tell the player plainly that you are not who they named, and invite their next ` +
            `question. They have used ${questionCount(questionsUsed)} so far.`,
        ].join("\n\n");
        return {
          content: [{ type: "text", text }],
          structuredContent: {
            kind: "result",
            gameNumber,
            dateUtc,
            outcome: "wrong",
            questionsUsed,
          },
        };
      } catch (e) {
        return errorResult(e);
      }
    },
  );

  registerAppResource(
    server,
    "Mystery Guest card",
    resourceUri,
    { mimeType: RESOURCE_MIME_TYPE },
    async (): Promise<ReadResourceResult> => ({
      contents: [{ uri: resourceUri, mimeType: RESOURCE_MIME_TYPE, text: APP_HTML }],
    }),
  );

  return server;
}
