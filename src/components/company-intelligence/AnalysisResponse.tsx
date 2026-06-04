import { useState } from "react";
import type { CompanyAnalysis, AnalysisStatus } from "@/hooks/useCompanyAnalysis";
import { ConvictionJudgment } from "./ConvictionJudgment";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  analysis: CompanyAnalysis;
  status: AnalysisStatus;
}

export function AnalysisResponse({ analysis, status }: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    business: false,
    market: false,
  });

  const toggle = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-3 animate-in fade-in duration-500">
      {/* Header */}
      <div className="rounded-2xl border border-white/10 bg-white/3 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-emerald-400 font-semibold tracking-wide text-lg">
                {analysis.ticker}
              </span>
              <span className="text-white/30 text-sm">·</span>
              <span className="text-white/60 text-sm">{analysis.name}</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">{analysis.oneLiner}</p>
          </div>
        </div>
      </div>

      {/* Non-consensus angle — surface this first, it's the most valuable */}
      <SectionCard
        label="what the market is missing"
        accent="emerald"
        content={analysis.marketLayer.nonConsensusAngle}
      />

      {/* Serenity's take */}
      <div className="rounded-2xl border border-white/10 bg-white/3 px-6 py-5 space-y-3">
        <SectionHeader label="serenity's thesis" />
        <p className="text-white/70 text-sm leading-relaxed">{analysis.serenityPerspective.thesis}</p>
        <div className="grid grid-cols-2 gap-3 pt-1">
          <Stat label="conviction" value={analysis.serenityPerspective.convictionLevel} />
          <Stat label="key insight" value={analysis.serenityPerspective.keyInsight} />
          <Stat label="first mentioned" value={analysis.serenityPerspective.firstMentionedPrice} />
          <Stat label="current price" value={analysis.serenityPerspective.currentPrice} />
        </div>
      </div>

      {/* Catalysts & Risks — side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4">
          <SectionHeader label="catalysts" />
          <ul className="mt-3 space-y-2">
            {analysis.catalystsAndRisks.upcomingCatalysts.map((c, i) => (
              <li key={i} className="text-white/65 text-xs leading-relaxed flex gap-2">
                <span className="text-emerald-400 mt-0.5">↑</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4">
          <SectionHeader label="thesis killers" />
          <ul className="mt-3 space-y-2">
            {analysis.catalystsAndRisks.thesisInvalidators.map((r, i) => (
              <li key={i} className="text-white/65 text-xs leading-relaxed flex gap-2">
                <span className="text-red-400 mt-0.5">↓</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Market layer — collapsible */}
      <CollapsibleSection
        label="market valuation"
        open={expanded.market}
        onToggle={() => toggle("market")}
      >
        <div className="grid grid-cols-2 gap-3 pt-1">
          <Stat label="current valuation" value={analysis.marketLayer.currentValuation} />
          <Stat label="analyst targets" value={analysis.marketLayer.analystTargets} />
          <Stat label="consensus view" value={analysis.marketLayer.consensusView} />
          <Stat label="what's priced in" value={analysis.marketLayer.whatsAlreadyPricedIn} />
        </div>
      </CollapsibleSection>

      {/* Business fundamentals — collapsible */}
      <CollapsibleSection
        label="business fundamentals"
        open={expanded.business}
        onToggle={() => toggle("business")}
      >
        <div className="grid grid-cols-2 gap-3 pt-1">
          {Object.entries(analysis.businessFundamentals).map(([k, v]) => (
            <Stat key={k} label={k.replace(/([A-Z])/g, " $1").toLowerCase()} value={v} />
          ))}
        </div>
      </CollapsibleSection>

      {/* My Judgment */}
      <ConvictionJudgment ticker={analysis.ticker} />

      {/* Confidence note */}
      <p className="text-white/25 text-xs px-2 leading-relaxed">
        {analysis.confidenceNote}
      </p>
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <p className="text-white/35 text-xs uppercase tracking-widest font-medium">{label}</p>
  );
}

function SectionCard({
  label,
  content,
  accent = "default",
}: {
  label: string;
  content: string;
  accent?: "emerald" | "default";
}) {
  const border =
    accent === "emerald"
      ? "border-emerald-500/30 bg-emerald-500/5"
      : "border-white/10 bg-white/3";
  return (
    <div className={`rounded-2xl border ${border} px-6 py-5`}>
      <SectionHeader label={label} />
      <p className="mt-2 text-white/75 text-sm leading-relaxed">{content}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-white/30 text-xs mb-0.5">{label}</p>
      <p className="text-white/75 text-xs leading-relaxed">{value}</p>
    </div>
  );
}

function CollapsibleSection({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 px-6 py-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group"
      >
        <SectionHeader label={label} />
        {open ? (
          <ChevronUp className="w-3.5 h-3.5 text-white/25 group-hover:text-white/50 transition-colors" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-white/25 group-hover:text-white/50 transition-colors" />
        )}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}
