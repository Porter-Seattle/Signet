import { useState, useRef, useEffect } from "react";
import { useCompanyAnalysis } from "@/hooks/useCompanyAnalysis";
import { SearchInput } from "./SearchInput";
import { AnalysisResponse } from "./AnalysisResponse";
import { WatchlistChips } from "./WatchlistChips";
import { LoadingPulse } from "./LoadingPulse";

const WATCHLIST = ["NBIS", "SIVE", "AMD"];

export default function CompanyIntelligencePage() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const responseRef = useRef<HTMLDivElement>(null);
  const { status, analysis, streamText, error, analyze, reset } = useCompanyAnalysis();

  const handleSubmit = (q: string) => {
    if (!q.trim()) return;
    setSubmittedQuery(q.trim());
    analyze(q.trim());
  };

  const handleNew = () => {
    reset();
    setQuery("");
    setSubmittedQuery("");
  };

  useEffect(() => {
    if (status === "streaming" || status === "done") {
      responseRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [status]);

  const isActive = status !== "idle";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-semibold tracking-tight text-lg">
            happy alpha
          </span>
          <span className="text-white/20 text-sm">·</span>
          <span className="text-white/40 text-sm">company intelligence</span>
        </div>
        {isActive && (
          <button
            onClick={handleNew}
            className="text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            new research
          </button>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 pt-16 pb-24">
        {/* Hero — shown only when idle */}
        {!isActive && (
          <div className="text-center mb-12 max-w-xl">
            <h1 className="text-3xl font-light text-white/90 mb-3 tracking-tight">
              What company do you want to understand?
            </h1>
            <p className="text-white/40 text-sm leading-relaxed">
              Type a ticker or company name. I'll research the business, valuation,
              Serenity's thesis, and what the market might be missing.
            </p>
          </div>
        )}

        {/* Watchlist chips — shown only when idle */}
        {!isActive && (
          <WatchlistChips
            tickers={WATCHLIST}
            onSelect={(t) => {
              setQuery(t);
              handleSubmit(t);
            }}
          />
        )}

        {/* Search input */}
        <div className={`w-full max-w-2xl ${isActive ? "mb-8" : "mt-6"}`}>
          <SearchInput
            value={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
            disabled={status === "loading" || status === "streaming"}
            placeholder={isActive ? `Research another company...` : "e.g. NBIS, Nebius, SIVE..."}
          />
        </div>

        {/* Submitted query echo */}
        {submittedQuery && (
          <div className="w-full max-w-2xl mb-6 flex justify-end">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white/80 max-w-xs text-right">
              {submittedQuery}
            </div>
          </div>
        )}

        {/* Loading state */}
        {status === "loading" && (
          <div className="w-full max-w-2xl">
            <LoadingPulse />
          </div>
        )}

        {/* Response */}
        {(status === "streaming" || status === "done") && analysis && (
          <div ref={responseRef} className="w-full max-w-2xl">
            <AnalysisResponse analysis={analysis} status={status} />
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="w-full max-w-2xl rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4 text-sm text-red-400">
            {error || "Something went wrong. Try again."}
          </div>
        )}
      </main>
    </div>
  );
}
