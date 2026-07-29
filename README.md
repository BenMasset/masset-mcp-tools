# Masset MCP Tools

Free MCP tools for marketers, from [Masset](https://www.getmasset.com). Each tool renders an interactive card **inside your AI chat** using [MCP Apps](https://blog.modelcontextprotocol.io/posts/2026-07-28/), the interactive-UI extension that became official in the 2026-07-28 MCP spec.

Nothing you send is stored. Every tool is stateless, deterministic, and open source.

## Did It Win? Honest A/B test verdicts

You tell your AI the numbers from your A/B test. It answers with a visual verdict card: **WINNER**, **LOSER**, **NOT YET**, or **NO REAL DIFFERENCE**, with real statistics computed in code (never estimated by the model).

The card shows:

- Both conversion rates with their uncertainty ranges, so you can *see* whether they overlap
- The probability the variant is genuinely better (the sentence marketers actually want)
- How many more visitors the test needs before you can trust it, and roughly how many days that is
- A confidence slider you can drag to feel what "95% confidence" trades away
- A warning against peeking, because calling tests early is the #1 way teams ship false winners

### Try it in one minute (claude.ai or Claude Desktop)

1. Open **Settings → Connectors → Add custom connector**
2. Paste: `https://mcp.getmasset.com/did-it-win/mcp`
3. Ask: *"Control got 168 signups from 4,210 visitors. Variant got 203 from 4,305. Did it win?"*

### Claude Code

```bash
claude mcp add did-it-win --transport http https://mcp.getmasset.com/did-it-win/mcp
```

### Tools

| Tool | What it does |
|---|---|
| `check_test` | Verdict on a running or finished test. Inputs: visitors + conversions per arm. Optional: confidence (default 0.95), dailyVisitors (enables the finish-date estimate), display labels. |
| `plan_test` | Sample size before you start. Inputs: baseline conversion rate. Optional: smallest relative lift worth detecting (default 10%), confidence, power, dailyVisitors. |

### The math

All deterministic, all in [`tools/did-it-win/stats.ts`](tools/did-it-win/stats.ts), all unit-tested against scipy/statsmodels reference values (see [`stats.test.ts`](tools/did-it-win/stats.test.ts) and [`scripts/gen-reference.py`](scripts/gen-reference.py)):

- **Pooled two-proportion z-test** (two-sided): the significance gate
- **Wilson score intervals**: the uncertainty bars
- **Bayesian probability-to-beat**: exact closed form with flat Beta(1,1) priors (normal approximation above 20,000 conversions)
- **Classic two-proportion sample-size formula**: the finish line (80% power by default)

Honesty notes: the "visitors needed" figure is the sample required to detect the *observed* difference, so it moves as your data moves. When detecting the observed gap would take over a million visitors per arm, the tool says "no real difference" instead of stringing you along. And the verdict gate is fixed-horizon statistics: decide your end date up front, then check.

## Check, Mate? Chess against Claude

You play chess against Claude on a real, interactive board, right inside the chat. There is no chess engine anywhere in this tool. Claude picks its own moves, and [chess.js](https://github.com/jhlywa/chess.js) enforces the rules (legal moves, check, checkmate, stalemate, draws). The tool is stateless: every call passes the current position (FEN) and move history back in, and gets the new position back out.

Claude's chess is honestly not that strong. Expect an enthusiastic club player at best, not a grandmaster, and that is most of the fun of it.

### Try it in one minute (claude.ai or Claude Desktop)

1. Open **Settings → Connectors → Add custom connector**
2. Paste: `https://mcp.getmasset.com/chess/mcp`
3. Ask: *"Let's play chess. I'll take white."*

### Claude Code

```bash
claude mcp add chess --transport http https://mcp.getmasset.com/chess/mcp
```

### Tools

| Tool | What it does |
|---|---|
| `chess_new_game` | Starts a game and renders the board. Inputs: player_color (which color the human plays, default white), optional custom starting fen. |
| `chess_move` | Plays one move and renders the updated board. Inputs: fen, move (SAN like Nf3 or UCI like g1f3), moves (the SAN history so far), player_color. Illegal moves fail softly: the position stays unchanged and a few legal alternatives are suggested. |
| `chess_position` | No board, just analysis: legal moves, checks available, safe captures, hanging pieces, material balance, move number, and game phase. Claude calls this before choosing a move. |

## Masset Guide · ask anything about Masset, right in your AI

Wondering what Masset is, what it costs, how the MCP server works, or whether it fits your team? Connect the Masset Guide and ask in plain language. Answers come from a curated, verified knowledge base (never model guesswork) and render as an inline guide card with the key facts, related topics you can tap through, and links to the real pages.

You can even request a **personalized demo video** without leaving the chat: give it your name, work email, company, and your biggest content headache, and a Masset founder records a walkthrough for exactly that and emails it to you.

### Try it in one minute (claude.ai or Claude Desktop)

1. Open **Settings → Connectors → Add custom connector**
2. Paste: `https://mcp.getmasset.com/masset-guide/mcp`
3. Ask: *"What is Masset, and how does it work with Claude?"*

### Claude Code

```bash
claude mcp add masset-guide --transport http https://mcp.getmasset.com/masset-guide/mcp
```

### Tools

| Tool | What it does |
|---|---|
| `ask_masset` | Any question about Masset: features, integrations, security, pricing, onboarding. Returns grounded product knowledge and renders the guide card. |
| `list_masset_topics` | The guide's table of contents. |
| `request_demo_video` | Sends a personalized demo-video request to the Masset founders (name, work email, company, and your biggest content headache required). This is the one tool that transmits what you provide; everything else is stateless. |

## Mystery Guest · a daily guessing game

One secret famous guest per day, and it is the same guest for everyone in the world. Your AI plays the guest in character. You interview them, and you guess who they are in as few questions as you can.

Ask anything. "Are you alive today?" "What did you do for a living?" "Would I have heard of your work?" The host answers in the first person, one to three sentences at a time, playful and a little evasive, and it will never tell you the name until you get it or you give up. The server is the referee: it holds the answer, judges every guess, and issues your share card.

The card shows:

- The game number, so you can compare with everyone else who played today
- Your score, which is simply how few questions you needed
- The guest's name and era, plus one delightful fact about them, revealed only when the game is over
- A share line with a Copy button, for the group chat

### Try it in one minute (claude.ai or Claude Desktop)

1. Open **Settings → Connectors → Add custom connector**
2. Paste: `https://mcp.getmasset.com/mystery-guest/mcp`
3. Ask: *"Play today's Mystery Guest with me."*

### Claude Code

```bash
claude mcp add mystery-guest --transport http https://mcp.getmasset.com/mystery-guest/mcp
```

### Tools

| Tool | What it does |
|---|---|
| `start_todays_game` | Starts today's game and hands your AI the secret host briefing for the day. No inputs. |
| `check_guess` | Judges a guess, or ends the game when you give up. Inputs: the name you guessed, how many questions you have asked, and an optional surrender flag. A wrong guess returns nothing about the real guest, so the game cannot be reverse engineered by guessing. |

### How the daily guest is chosen

The game day is the UTC date, and game #1 is 2026-07-29. The guest is `roster[(gameNumber - 1) % roster.length]`, so the schedule is just the order of the roster in [`tools/mystery-guest/figures.ts`](tools/mystery-guest/figures.ts). Nothing is stored: the server derives the guest from the date every time, which is exactly why the whole world gets the same guest and why the server has no idea how your game is going. Everyone on the roster is either a historical figure who has died or a fictional character, and every fact the host answers from lives in that file.

## Self-host

```bash
git clone https://github.com/BenMasset/masset-mcp-tools
cd masset-mcp-tools
npm install
npm start          # builds the cards + serves /did-it-win/mcp, /chess/mcp, /masset-guide/mcp, and /mystery-guest/mcp on http://localhost:3006
node smoke.mjs     # end-to-end check against the running server
```

`npm run serve -- --stdio` runs the Did It Win server over stdio for local clients; `--stdio=chess`, `--stdio=masset-guide`, and `--stdio=mystery-guest` run the others.

Example numbers in this README are fictional.

## Roadmap (v2 candidates)

- A/B/n (multiple variants, with correction)
- Revenue-per-visitor tests (continuous outcomes)
- Sequential testing support, so peeking is *managed* instead of just warned about

## License

MIT. Built by [Masset](https://www.getmasset.com), the home for your business content.
