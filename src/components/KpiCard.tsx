import type { ComponentType } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TrendData {
  value: string;
  direction: "up" | "down";
}

interface KpiCardProps {
  icon: ComponentType<{ size?: number; className?: string }>;
  value: string;
  label: string;
  trend: TrendData;
  delay?: number;
}

const KpiCard = ({ icon: Icon, value, label, trend, delay = 0 }: KpiCardProps) => {
  return (
    <Card className="shadow-sm" style={{ animationDelay: `${delay}ms` }}>
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Icon size={18} />
          </div>
          <span className={trend.direction === "up" ? "text-status-success" : "text-status-rejected"}>
            {trend.direction === "up" ? "▲" : "▼"} {trend.value}
          </span>
        </div>
        <div>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
