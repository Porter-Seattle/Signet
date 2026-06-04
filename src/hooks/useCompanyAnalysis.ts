import { useState } from "react";
import { SYSTEM_PROMPT, buildUserMessage } from "@/lib/companyIntelligencePrompt";

export type AnalysisStatus = "idle" | "loading" | "streaming" | "done" | "error";

export interface CompanyAnalysis {
  ticker: string;
  name: string;
  oneLiner: string;
  businessFundamentals: Record<string, string>;
  marketLayer: Record<string, string>;
  serenityPerspective: Record<string, string>;
  catalystsAndRisks: {
    upcomingCatalysts: string[];
    thesisInvalidators: string[];
  };
  confidenceNote: string;
}

export function useCompanyAnalysis() {
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [analysis, setAnalysis] = useState<CompanyAnalysis | null>(null);
  const [streamText, setStreamText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const analyze = async (query: string) => {
    setStatus("loading");
    setAnalysis(null);
    setStreamText("");
    setError(null);

    try {
      // Call your backend proxy (Railway) — never expose API key in frontend
      const res = await fetch("/api/company-intelligence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No stream");

      setStatus("streaming");
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setStreamText(fullText);
      }

      const parsed: CompanyAnalysis = JSON.parse(fullText);
      setAnalysis(parsed);
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setAnalysis(null);
    setStreamText("");
    setError(null);
  };

  return { status, analysis, streamText, error, analyze, reset };
}
