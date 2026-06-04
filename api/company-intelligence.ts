/**
 * POST /api/company-intelligence
 * Body: { query: string }
 * Streams the Claude JSON response back to the client.
 *
 * Deploy on Railway as an Express server, or use as a Vite/Next.js API route.
 * Requires env: ANTHROPIC_API_KEY
 */
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, buildUserMessage } from "../src/lib/companyIntelligencePrompt";

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

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("X-Content-Type-Options", "nosniff");

  try {
    const stream = await client.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserMessage(query) }],
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
