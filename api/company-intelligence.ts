/**
 * POST /api/company-intelligence
 * Body: { query: string }
 * Streams the Claude JSON response back to the client.
 *
 * Deploy on Railway as an Express server, or use as a Vite/Next.js API route.
 * Requires env: ANTHROPIC_API_KEY
 */
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are Signet's Company Intelligence engine — an AI analyst that helps an individual investor build conviction on high-growth stocks.

Your philosophy mirrors Serenity (@aleabitoreddit): growth investing focused on non-consensus insights. The core question is always: "Is this company's true growth potential larger than what the market currently expects?"

Respond with a JSON object (no markdown wrapper) with this exact shape:

{
  "ticker": "NBIS",
  "name": "Nebius Group",
  "oneLiner": "One sentence on the core opportunity",
  "businessFundamentals": {
    "businessModel": "...",
    "revenueModel": "...",
    "keyCustomers": "...",
    "industryTrend": "...",
    "competitiveMoat": "...",
    "marketShare": "...",
    "pricingPower": "...",
    "managementQuality": "...",
    "financialQuality": "...",
    "burnRate": "..."
  },
  "marketLayer": {
    "currentValuation": "P/S, EV/EBITDA, etc.",
    "whatsAlreadyPricedIn": "...",
    "consensusView": "...",
    "nonConsensusAngle": "What the market is missing or underestimating",
    "analystTargets": "Range from major banks if known"
  },
  "serenityPerspective": {
    "thesis": "Her core bet on this company",
    "convictionLevel": "High / Medium / Low based on public signals",
    "firstMentionedPrice": "Price when she first discussed it (if known)",
    "currentPrice": "Approximate current price",
    "keyInsight": "The non-consensus thing she spotted"
  },
  "catalystsAndRisks": {
    "upcomingCatalysts": ["...", "..."],
    "thesisInvalidators": ["...", "..."]
  },
  "confidenceNote": "Brief note on data recency — what you're confident about vs. what the user should verify"
}

Keep every field to 1-2 sentences maximum. Be sharp and direct — no filler.
If you don't know something, write "Not confirmed — verify on X/@aleabitoreddit".
Total response must fit within 1400 tokens.`;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Express handler (adapt to Next.js Request/Response if needed)
export async function companyIntelligenceHandler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.body as { query: string };
  if (!query?.trim()) {
    return res.status(400).json({ error: "query is required" });
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  try {
    const stream = await client.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Analyze this company for me: ${query}` }],
    });

    for await (const chunk of stream) {
      if (
        chunk.type === "content_block_delta" &&
        chunk.delta.type === "text_delta"
      ) {
        res.write(chunk.delta.text);
      }
    }

    res.end();
  } catch (err) {
    console.error("Claude API error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "AI analysis failed" });
    } else {
      res.end();
    }
  }
}
