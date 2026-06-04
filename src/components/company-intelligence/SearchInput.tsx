import { KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function SearchInput({ value, onChange, onSubmit, disabled, placeholder }: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(value);
    }
  };

  return (
    <div className="relative flex items-center w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-emerald-500/50 transition-colors">
      <input
        className="flex-1 bg-transparent text-white placeholder-white/25 text-sm outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? "Enter a company or ticker..."}
        disabled={disabled}
        autoFocus
      />
      <button
        onClick={() => onSubmit(value)}
        disabled={disabled || !value.trim()}
        className="ml-3 w-8 h-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
      >
        <ArrowUp className="w-4 h-4 text-black" />
      </button>
    </div>
  );
}
