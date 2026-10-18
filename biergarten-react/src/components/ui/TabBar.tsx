import type { ReactNode } from "react";

export interface TabBarItem {
  value: string;
  label: ReactNode;
}

interface TabBarProps {
  tabs: readonly TabBarItem[];
  active: string;
  onChange: (value: string) => void;
  variant?: "pills" | "segmented" | "scroll";
  className?: string;
}

export function TabBar({ tabs, active, onChange, variant = "pills", className = "" }: TabBarProps) {
  return (
    <div
      className={`${variant === "scroll" ? "flex gap-2 overflow-x-auto pb-2" : variant === "segmented" ? "grid gap-px" : "flex flex-wrap gap-2"} ${className}`}
      style={variant === "segmented" ? { gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` } : undefined}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={active === tab.value}
          onClick={() => onChange(tab.value)}
          className={variant === "segmented"
            ? `text-xs py-2.5 px-2 uppercase tracking-[0.12em] font-semibold transition ${active === tab.value ? "bg-gold text-bg-deep" : "bg-bg-card text-cream-dim hover:text-cream"}`
            : variant === "scroll"
              ? `flex items-center gap-1.5 text-xs px-3 py-2 rounded-full whitespace-nowrap flex-shrink-0 ${active === tab.value ? "bg-gold text-bg-deep font-semibold" : "btn-outline"}`
              : `text-xs px-3 py-1.5 rounded-sm border transition ${active === tab.value ? "border-gold bg-gold/10 text-gold" : "border-line text-cream-dim hover:text-cream"}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
