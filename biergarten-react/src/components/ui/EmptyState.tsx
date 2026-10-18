import type { ReactNode } from "react";
import { Icon } from "../../lib/icons";
import type { IconName } from "../../lib/icons";

interface EmptyStateProps {
  message: string;
  icon?: IconName;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ message, icon = "productos", action, className = "" }: EmptyStateProps) {
  return (
    <div className={`text-center py-8 text-sm text-cream-dim border border-dashed border-line rounded-sm ${className}`}>
      <Icon name={icon} className="w-6 h-6 mx-auto mb-2 text-gold-dim" />
      <p>{message}</p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
