/** The tool directory served at / — one entry per free Masset MCP tool. */

export const DIRECTORY = {
  name: "Masset MCP tools",
  tagline: "Free MCP tools for marketers, from Masset (getmasset.com).",
  note: "Add any tool's mcpEndpoint to your AI as a custom connector. Stateless: nothing you send is stored.",
  source: "https://github.com/BenMasset/masset-mcp-tools",
  tools: [
    {
      name: "Did It Win?",
      description:
        "Honest A/B test verdicts with an inline results card: WINNER, LOSER, NOT YET, or NO REAL DIFFERENCE, " +
        "with real statistics (two-proportion z-test, Wilson intervals, Bayesian probability-to-beat).",
      mcpEndpoint: "/did-it-win/mcp",
      preview: "/did-it-win/preview",
    },
  ],
} as const;
