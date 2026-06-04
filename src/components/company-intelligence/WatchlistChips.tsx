interface Props {
  tickers: string[];
  onSelect: (ticker: string) => void;
}

export function WatchlistChips({ tickers, onSelect }: Props) {
  return (
    <div className="flex gap-2 flex-wrap justify-center mb-2">
      <span className="text-white/25 text-xs self-center mr-1">watchlist</span>
      {tickers.map((t) => (
        <button
          key={t}
          onClick={() => onSelect(t)}
          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60 hover:text-emerald-400 hover:border-emerald-500/40 transition-all font-mono tracking-wide"
        >
          {t}
        </button>
      ))}
    </div>
  );
}
