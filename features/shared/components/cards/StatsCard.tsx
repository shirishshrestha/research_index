import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-primary",
  iconBgColor = "bg-blue-02",
  description,
  trend,
}: StatsCardProps) {
  return (
    <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-gray">{title}</p>
          <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
          {description && (
            <p className="mt-1 text-sm text-text-gray">{description}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-text-gray">vs last month</span>
            </div>
          )}
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconBgColor}`}
        >
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
