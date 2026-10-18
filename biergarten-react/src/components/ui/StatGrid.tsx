import type { ReactNode } from "react";

interface StatGridProps {
  children: ReactNode;
  columns?: 3 | 4;
}

const GRID_COLUMNS = {
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 xl:grid-cols-4",
};

export function StatGrid({ children, columns = 4 }: StatGridProps) {
  return <div className={`grid ${GRID_COLUMNS[columns]} gap-3 sm:gap-4`}>{children}</div>;
}
