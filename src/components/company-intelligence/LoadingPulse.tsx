const LINES = [
  "Researching business fundamentals...",
  "Analyzing market valuation...",
  "Checking Serenity's thesis...",
  "Surfacing non-consensus angles...",
];

export function LoadingPulse() {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 px-6 py-5 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:300ms]" />
        </div>
        <span className="text-white/40 text-xs">researching</span>
      </div>
      {LINES.map((line, i) => (
        <div
          key={i}
          className="h-3 rounded bg-white/5 animate-pulse"
          style={{
            width: `${65 + i * 8}%`,
            animationDelay: `${i * 200}ms`,
          }}
        >
          <span className="sr-only">{line}</span>
        </div>
      ))}
    </div>
  );
}
