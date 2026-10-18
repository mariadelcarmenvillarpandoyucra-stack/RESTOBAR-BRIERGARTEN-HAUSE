interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
}

export function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value" title={value}>{value}</p>
      {sub && <p className="stat-sub" title={sub}>{sub}</p>}
    </div>
  );
}
