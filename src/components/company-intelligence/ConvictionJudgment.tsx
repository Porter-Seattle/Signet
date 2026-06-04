import { useState } from "react";

interface Props {
  ticker: string;
}

const SCORES = [1, 2, 3, 4, 5];
const SCORE_LABELS: Record<number, string> = {
  1: "pass",
  2: "watching",
  3: "interested",
  4: "high conviction",
  5: "back up the truck",
};

export function ConvictionJudgment({ ticker }: Props) {
  const [score, setScore] = useState<number | null>(null);
  const [rationale, setRationale] = useState("");
  const [risks, setRisks] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    // TODO: persist to Supabase my_judgments table
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 px-6 py-5 space-y-4">
      <p className="text-white/35 text-xs uppercase tracking-widest font-medium">my judgment</p>

      {/* Conviction score */}
      <div>
        <p className="text-white/45 text-xs mb-2">conviction score</p>
        <div className="flex gap-2">
          {SCORES.map((s) => (
            <button
              key={s}
              onClick={() => setScore(s)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all border ${
                score === s
                  ? "bg-emerald-500 border-emerald-400 text-black"
                  : "bg-white/5 border-white/8 text-white/40 hover:text-white/70 hover:border-white/20"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {score && (
          <p className="text-emerald-400 text-xs mt-1.5 text-center">
            {SCORE_LABELS[score]}
          </p>
        )}
      </div>

      {/* Rationale */}
      <div>
        <p className="text-white/45 text-xs mb-1.5">why I'd buy</p>
        <textarea
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
          placeholder="What gives you conviction..."
          rows={2}
          className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-xs text-white/70 placeholder-white/20 outline-none focus:border-white/20 resize-none transition-colors"
        />
      </div>

      {/* Key risks */}
      <div>
        <p className="text-white/45 text-xs mb-1.5">what could kill the thesis</p>
        <textarea
          value={risks}
          onChange={(e) => setRisks(e.target.value)}
          placeholder="What would make you exit..."
          rows={2}
          className="w-full bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 text-xs text-white/70 placeholder-white/20 outline-none focus:border-white/20 resize-none transition-colors"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={!score}
        className="w-full py-2.5 rounded-xl bg-white/8 hover:bg-white/12 disabled:opacity-30 disabled:cursor-not-allowed text-white/60 hover:text-white/80 text-xs font-medium transition-all border border-white/10"
      >
        {saved ? "saved ✓" : "save judgment"}
      </button>
    </div>
  );
}
