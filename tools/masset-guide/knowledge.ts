/**
 * Masset Guide · the curated knowledge base.
 *
 * Every fact here is public: sourced from getmasset.com pages and the
 * published product docs. This file is the single source the ask_masset
 * tool answers from; if a fact changes on the site, change it here too.
 */

export interface Topic {
  id: string;
  title: string;
  oneLiner: string;
  url: string;
  keywords: string[];
  facts: string[];
  body: string;
}

const SITE = "https://www.getmasset.com";

export const TOPICS: Topic[] = [
  {
    id: "overview",
    title: "What is Masset?",
    oneLiner: "The best home for your business content, built for the AI era.",
    url: `${SITE}/`,
    keywords: [
      "what", "overview", "about", "masset", "dam", "digital asset management",
      "content home", "who is it for", "why", "company", "founders",
    ],
    facts: [
      "One home for every piece of business content: decks, docs, videos, case studies, brand guides.",
      "Your team finds content by asking in plain language, in Slack, Microsoft Teams, or the app.",
      "Your AI tools connect to it over MCP, so AI drafts from approved content instead of guessing.",
      "Update a file once and every copy, share link, and board updates with it.",
      "Built and run by its two founders; customers are on month-to-month terms.",
    ],
    body:
      "Masset is the home for your business content. Instead of content scattered across drives, " +
      "inboxes, and wikis, everything lives in one searchable library that your team, and your team's " +
      "AI tools, can actually use. People ask for what they need in plain language and get the right, " +
      "current, approved version. It is built for teams whose story gets retold by many people: " +
      "marketing teams, sales teams, franchises, multi-location groups, and agencies.",
  },
  {
    id: "central-library",
    title: "Central Library",
    oneLiner: "One searchable pool for every asset, fed by the tools you already use.",
    url: `${SITE}/software/central-library`,
    keywords: [
      "library", "search", "find", "assets", "files", "storage", "upload",
      "organize", "tags", "collections", "natural language",
    ],
    facts: [
      "Ingests content from Google Drive, Notion, YouTube, and Slack, plus direct upload and linked assets from anywhere on the web.",
      "Indexed for natural-language search: ask for what you need, not where it lives.",
      "Assets carry tags, collections, extracted text, and preview images.",
      "Permissions control who sees what, everywhere the library is surfaced.",
    ],
    body:
      "The Central Library is the asset pool everything else draws from. Connect the places your " +
      "content already lives and Masset pulls it into one indexed, searchable home. From there, " +
      "search works the way people actually talk: 'the latest pricing deck', 'the Acme case study', " +
      "'our security one-pager'. Boards, shares, training, and the MCP server all read from this " +
      "same pool, so there is one source of truth.",
  },
  {
    id: "myca",
    title: "Myca, the AI content assistant",
    oneLiner: "Ask for content in plain language in Slack, Teams, or the app.",
    url: `${SITE}/software/myca`,
    keywords: [
      "myca", "assistant", "ai search", "chatbot", "slack bot", "teams bot",
      "ask", "conversation", "find content",
    ],
    facts: [
      "Lives in Slack, Microsoft Teams, and the Masset app.",
      "Searches only approved content, and only what the asker has permission to see.",
      "Answers with the actual asset, not just a link into a folder tree.",
      "Also powers Training: Myca extracts testable facts and writes quiz questions.",
    ],
    body:
      "Myca is Masset's AI assistant. A rep in Slack types 'I need the ROI one-pager for healthcare' " +
      "and gets the right, current asset back in seconds, without logging into anything. Because Myca " +
      "only draws from the approved library and respects permissions, the answer is the answer, " +
      "not a guess.",
  },
  {
    id: "mcp-server",
    title: "The MCP Server: connect your AI to your content",
    oneLiner: "Every MCP-compatible AI can read and write your approved content.",
    url: `${SITE}/software/mcp`,
    keywords: [
      "mcp", "model context protocol", "claude", "chatgpt", "cursor", "copilot",
      "ai tools", "connect ai", "api", "tools", "read", "write", "hallucination",
    ],
    facts: [
      "35 MCP tools: 21 reads and 14 writes.",
      "Works with Claude, ChatGPT, Cursor, Copilot, and every other MCP-compatible client.",
      "Every tool enforces the connecting user's Masset permissions: no one can read or change anything over MCP they could not touch in the app.",
      "AI can search assets, pull content, create shares and boards, request new content, and manage training.",
      "Ends AI guessing: your team's AI drafts from what your company actually says.",
    ],
    body:
      "The MCP server is how Masset makes your AI smarter about your business. Connect Claude, " +
      "ChatGPT, Cursor, or any MCP-compatible tool, and it can search and use your approved content " +
      "directly: real case studies, real pricing, real brand voice. It reads and writes, so your AI " +
      "can also file content requests, share assets, and build boards, always inside the same " +
      "permissions you set in Masset.",
  },
  {
    id: "boards",
    title: "Boards (Content Rooms)",
    oneLiner: "Curated, shareable content hubs for any audience.",
    url: `${SITE}/software/boards`,
    keywords: [
      "boards", "content rooms", "hub", "portal", "onboarding", "enablement",
      "events", "partners", "deal room", "microsite",
    ],
    facts: [
      "A board is a curated set of assets with its own shareable page.",
      "Common uses: new-hire onboarding, sales enablement, events, partners, and deal rooms.",
      "Engagement is tracked, and boards can be associated with CRM records.",
      "Assets on boards stay current automatically through Version Control.",
    ],
    body:
      "Boards let you hand a specific audience exactly the content they need, in one link. Build a " +
      "board for a new hire, a partner, an event, or a specific deal. Because boards draw from the " +
      "Central Library, the content on them is always the current version, and you can see who " +
      "engaged with what.",
  },
  {
    id: "shares",
    title: "Trackable Shares",
    oneLiner: "Share content as tracked links and see who engaged, in your CRM.",
    url: `${SITE}/software/shares`,
    keywords: [
      "shares", "share link", "tracking", "engagement", "who viewed",
      "crm writeback", "hubspot", "salesforce", "attachments",
    ],
    facts: [
      "Assets go out as tracked links instead of attachments.",
      "You see opens and engagement per recipient.",
      "Engagement writes back to HubSpot and Salesforce on the matching records.",
      "Recipients always get the current version, even if the file is updated after sending.",
    ],
    body:
      "Trackable Shares replace the attachment black hole. Send a link instead of a file and you " +
      "know whether it was opened and what got attention, with that signal landing in your CRM " +
      "where the deal lives. And because the link points at the library, updating the asset updates " +
      "what the recipient sees.",
  },
  {
    id: "version-control",
    title: "Version Control",
    oneLiner: "Fix it once and it is fixed everywhere.",
    url: `${SITE}/software/version-control`,
    keywords: [
      "version", "versions", "update", "stale", "outdated", "v2", "final",
      "single source of truth", "cascade", "old deck",
    ],
    facts: [
      "Update an asset at the source and the change cascades to every share link, board, and AI surface.",
      "No republishing, no chasing down old copies.",
      "Kills the 'PricingDeck_v3_FINAL_final' problem at the root.",
    ],
    body:
      "Version Control is the single-source-of-truth backbone. When pricing changes or a claim gets " +
      "corrected, you update the asset once. Every place it lives, every share link already sent, " +
      "every board, every AI answer, serves the new version from that moment. The old copy simply " +
      "stops existing as something people can find.",
  },
  {
    id: "workflows",
    title: "Workflows: Asset Requests and Content Flagging",
    oneLiner: "A real process for requesting new content and flagging bad content.",
    url: `${SITE}/software/workflows`,
    keywords: [
      "workflows", "request", "asset request", "content request", "flag",
      "outdated content", "governance", "duplicate",
    ],
    facts: [
      "Asset Requests: when someone cannot find what they need, they file a structured request instead of a Slack ping.",
      "Admins can build custom request forms and route requests to the right owner.",
      "Smart duplicate check: the AI flags when something similar already exists before a request is filed.",
      "Content Flagger: anyone can flag an asset as outdated or wrong, so bad content gets fixed instead of reshared.",
    ],
    body:
      "Workflows give content a governance loop. Requests for new content are structured, routed, " +
      "and visible instead of lost in chat. Flags on outdated content go to the owner so problems " +
      "get fixed at the source. The AI even checks new requests against the library first, so teams " +
      "stop rebuilding things that already exist.",
  },
  {
    id: "training",
    title: "Training: daily two-minute quizzes",
    oneLiner: "Your team actually remembers your story, two minutes a day in Slack or Teams.",
    url: `${SITE}/training`,
    keywords: [
      "training", "quiz", "quizzes", "learning", "lms", "onboarding",
      "mastery", "retention", "gamification", "streak", "leaderboard",
    ],
    facts: [
      "One question per day per learner, about two minutes, delivered in Slack or Microsoft Teams.",
      "Questions are generated from your approved content by Myca; admins can edit everything.",
      "Open-ended or multiple choice, scored automatically in real time.",
      "Mastery tracking: once a learner proves they know a topic, the system moves on.",
      "Gamified: points, streaks, head-to-head battles, and team leaderboards.",
      "No login required; it lives where your team already works.",
    ],
    body:
      "Training turns your content library into daily reinforcement. People forget about 80% of " +
      "what they read within a week; Training fights that with one short question a day, generated " +
      "from your real content, delivered in Slack or Teams. Mastery tracking means nobody wastes " +
      "time on what they already know, and the gamification keeps participation high without a " +
      "manager chasing anyone.",
  },
  {
    id: "analytics",
    title: "Analytics and ContentGPS",
    oneLiner: "Know what content gets used, by whom, and what it is worth.",
    url: `${SITE}/software/analytics`,
    keywords: [
      "analytics", "reporting", "contentgps", "usage", "roi", "attribution",
      "measure", "engagement data", "adoption",
    ],
    facts: [
      "Content reporting: what gets found, used, and shared, and what never does.",
      "User reporting: who is adopting the library and who needs help.",
      "ContentGPS: where each asset travels after it leaves the library.",
      "Revenue attribution through the CRM: connect content engagement to real deals.",
    ],
    body:
      "Analytics answers the question every content team gets asked: is any of this working? See " +
      "which assets actually get used, track where content travels via ContentGPS, and tie " +
      "engagement to deals through the HubSpot or Salesforce integration, so content stops being " +
      "a cost center with no receipts.",
  },
  {
    id: "integrations",
    title: "Integrations",
    oneLiner: "Masset meets your team where they already work.",
    url: `${SITE}/software/integrations`,
    keywords: [
      "integrations", "slack", "teams", "microsoft teams", "hubspot",
      "salesforce", "google drive", "sharepoint", "onedrive", "notion",
      "youtube", "dropbox", "connect",
    ],
    facts: [
      "Slack and Microsoft Teams: full-parity Myca search, sharing, and Training in both.",
      "HubSpot and Salesforce: share from the CRM, engagement writes back to records.",
      "Google Drive, Notion, and YouTube: content sources that feed the library.",
      "Raw files are never uploaded into the third-party tools; downloads always route through Masset, so permissions and version control hold.",
    ],
    body:
      "Masset does not ask your team to live in a new tab. Sellers search and share from Slack, " +
      "Teams, HubSpot, or Salesforce; content flows in from the drives and wikis where it is " +
      "created. Every integration honors the same permissions as the app, and files never get " +
      "scattered into third-party copies.",
  },
  {
    id: "security",
    title: "Security and AI data handling",
    oneLiner: "SOC 2, independent pen testing, and your data never trains AI models.",
    url: `${SITE}/software/security`,
    keywords: [
      "security", "soc 2", "soc2", "compliance", "privacy", "data",
      "train", "training data", "ai training", "pen test", "sso", "permissions",
    ],
    facts: [
      "SOC 2 report maintained; periodic penetration testing by independent third parties.",
      "Masset does NOT use customer data to train AI models, and its agreements with AI sub-processors restrict training use.",
      "Permissions are enforced on every surface: the app, Slack, Teams, CRM integrations, and the MCP server.",
      "Unlimited user seats on every plan, so security is never undermined by shared logins.",
      "SSO is available on the Enterprise plan.",
    ],
    body:
      "Masset holds what your company knows, so it is built to be trusted with it. SOC 2, " +
      "independent penetration tests, and a hard line on AI: your content is never used to train " +
      "AI models. Access control follows your rules everywhere, including when an AI connects " +
      "over MCP: nobody can reach anything through AI that they could not open in the app.",
  },
  {
    id: "pricing",
    title: "Pricing and plans",
    oneLiner: "Standard is $500/mo for teams under 500 employees; Enterprise for 500 and up.",
    url: `${SITE}/pricing`,
    keywords: [
      "pricing", "price", "cost", "how much", "plans", "standard",
      "enterprise", "limits", "storage", "overage", "seats", "trial",
    ],
    facts: [
      "Standard: $500/mo, built for teams under 500 employees, self-serve signup at getmasset.com/signup.",
      "Unlimited users and unlimited uploads on both plans.",
      "Standard includes 500 GB storage, 500 GB monthly downloads, 2,500 monthly AI interactions, and 10,000 monthly external board impressions, with published overage pricing beyond each.",
      "Free onboarding: account setup and content move-in happen on an included onboarding call.",
      "Enterprise (teams of 500 or more): more storage, the Training feature, dedicated support, and SSO. Talk to the team for pricing.",
    ],
    body:
      "Pricing is public and simple. Teams under 500 employees run on Standard at $500 a month, " +
      "with unlimited users, generous published limits, and self-serve signup that ends in a real " +
      "onboarding call where the Masset team helps move your content in. Larger organizations run " +
      "on Enterprise, which adds scale, Training, dedicated support, and SSO.",
  },
  {
    id: "moving-in",
    title: "Moving in: migration and onboarding",
    oneLiner: "Getting your content into Masset is guided, fast, and reversible.",
    url: `${SITE}/software/moving-in`,
    keywords: [
      "onboarding", "migration", "move in", "setup", "import", "getting set up",
      "export", "lock in", "leave", "switching",
    ],
    facts: [
      "Connect Google Drive, Notion, and the other places your content lives, and it flows into the library.",
      "Onboarding is free: the included call covers account setup and content move-in.",
      "The export promise: your content is yours, and you can take all of it with you. No lock-in.",
    ],
    body:
      "Moving in is not a months-long migration project. Connect the sources where content already " +
      "lives, and the library fills. The onboarding call, included free with signup, is where the " +
      "Masset team sets up your account and moves your content in with you. And Masset is a home, " +
      "not a trap: everything you put in, you can export back out.",
  },
  {
    id: "getting-started",
    title: "Try Masset: demos and signup",
    oneLiner: "Watch a demo, request a personalized demo video, or sign up self-serve.",
    url: `${SITE}/demo`,
    keywords: [
      "demo", "try", "trial", "test", "see it", "video", "signup", "sign up",
      "get started", "buy", "purchase", "contact", "support",
    ],
    facts: [
      "Watch a demo at getmasset.com/demo.",
      "Request a personalized demo video right here: this tool's request_demo_video sends your question to the founders, who reply with a video walkthrough made for you.",
      "Self-serve signup for the $500/mo Standard plan at getmasset.com/signup, onboarding call included.",
      "Support: support@getmasset.com.",
    ],
    body:
      "There are three ways in. Watch the demo on the site. Or, right from this conversation, " +
      "request a personalized demo video: tell us your name, work email, company, and your biggest " +
      "content headache, and a founder records a walkthrough aimed at exactly that and emails it to " +
      "you. When you are ready, signup is self-serve and ends with a real onboarding call.",
  },
];

/** Case-insensitive keyword scoring: returns topics ranked by relevance to the question. */
export function rankTopics(question: string): Topic[] {
  const q = question.toLowerCase();
  const tokens = q.split(/[^a-z0-9]+/).filter((t) => t.length > 2);
  const scored = TOPICS.map((topic) => {
    let score = 0;
    for (const kw of topic.keywords) {
      if (q.includes(kw)) score += kw.includes(" ") ? 6 : 3;
    }
    const titleWords = topic.title.toLowerCase();
    const bodyWords = topic.body.toLowerCase();
    for (const t of tokens) {
      if (titleWords.includes(t)) score += 2;
      else if (bodyWords.includes(t)) score += 1;
    }
    return { topic, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.topic);
}

export function getTopic(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id);
}
