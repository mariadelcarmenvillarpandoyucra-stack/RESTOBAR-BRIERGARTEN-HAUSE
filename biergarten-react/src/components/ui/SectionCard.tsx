import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, subtitle, action, children, className = "" }: SectionCardProps) {
  return (
    <section className={`card p-4 sm:p-5 ${className}`}>
      <header className="flex items-center justify-between gap-3 mb-4 border-b border-line pb-3">
        <div className="min-w-0">
          <h3 className="font-display text-cream">{title}</h3>
          {subtitle && <p className="text-xs text-cream-dim mt-1">{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
