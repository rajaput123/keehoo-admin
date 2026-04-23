import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Search,
  Filter,
  Download,
  AlertTriangle,
  TrendingUp,
  Zap,
  ShieldAlert,
  ArrowLeft,
  CreditCard,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  getAllTenantUsageSummaries,
  canPerformAction,
  type TenantUsageSummary,
  type UsageModule,
} from "@/data/mockSubscriptions";

const statusConfig = {
  normal: { label: "Normal", color: "bg-success/10 text-success", barColor: "bg-success" },
  "near-limit": { label: "Near Limit", color: "bg-warning/10 text-warning", barColor: "bg-warning" },
  "over-limit": { label: "Over Limit", color: "bg-destructive/10 text-destructive", barColor: "bg-destructive" },
};

const formatValue = (value: number, unit?: string): string => {
  if (unit === "GB") return `${value} GB`;
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  return value.toString();
};

const UsageMonitoring = () => {
  const [selectedTenant, setSelectedTenant] = useState<TenantUsageSummary | null>(null);
  const [regionFilter, setRegionFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allSummaries = getAllTenantUsageSummaries();

  const filtered = allSummaries.filter((s) => {
    if (regionFilter !== "all" && s.region.toLowerCase().replace(/\s+/g, "-") !== regionFilter) return false;
    if (planFilter !== "all" && s.planName.toLowerCase() !== planFilter) return false;
    if (statusFilter !== "all" && s.overallStatus !== statusFilter) return false;
    if (searchQuery && !s.templeName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const normalCount = allSummaries.filter((s) => s.overallStatus === "normal").length;
  const nearLimitCount = allSummaries.filter((s) => s.overallStatus === "near-limit").length;
  const overLimitCount = allSummaries.filter((s) => s.overallStatus === "over-limit").length;

  const categories = [
    { label: "All Tenants", count: allSummaries.length, icon: Activity, color: "text-primary", filterValue: "all" },
    { label: "Normal", count: normalCount, icon: Activity, color: "text-success", filterValue: "normal" },
    { label: "Near Limit", count: nearLimitCount, icon: TrendingUp, color: "text-warning", filterValue: "near-limit" },
    { label: "Over Limit", count: overLimitCount, icon: Zap, color: "text-destructive", filterValue: "over-limit" },
  ];

  // Tenant Detail View
  if (selectedTenant) {
    const enforceResults: { module: UsageModule; label: string; result: ReturnType<typeof canPerformAction> }[] = [
      { module: "bookings", label: "Create Booking", result: canPerformAction(selectedTenant.tenantId, "bookings") },
      { module: "storage", label: "Upload File", result: canPerformAction(selectedTenant.tenantId, "storage") },
      { module: "apiCalls", label: "API Call", result: canPerformAction(selectedTenant.tenantId, "apiCalls") },
      { module: "users", label: "Add Admin User", result: canPerformAction(selectedTenant.tenantId, "users") },
    ];

    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedTenant(null)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <p className="text-lg font-semibold">{selectedTenant.templeName}</p>
              <p className="text-sm text-muted-foreground">
                {selectedTenant.tenantId} · {selectedTenant.planName} · {selectedTenant.region}
              </p>
            </div>
            <Badge className={cn("text-xs capitalize", statusConfig[selectedTenant.overallStatus].color)}>
              {statusConfig[selectedTenant.overallStatus].label}
            </Badge>
          </div>

          {/* Usage Bars */}
          <div className="glass-card rounded-2xl p-5 glass-shadow mb-6">
            <h3 className="text-sm font-semibold mb-4">Usage vs Plan Limits</h3>
            <div className="space-y-5">
              {selectedTenant.modules.map((mod) => {
                const cfg = statusConfig[mod.status];
                return (
                  <div key={mod.module} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{mod.label}</span>
                      <span>
                        <span className={cn(mod.status === "over-limit" && "text-destructive font-semibold")}>
                          {formatValue(mod.used, mod.unit)}
                        </span>
                        <span className="text-muted-foreground"> / {formatValue(mod.limit, mod.unit)}</span>
                        <span className={cn("ml-2 text-xs font-medium", cfg.color.split(" ")[1])}>
                          {mod.percentage}%
                        </span>
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all", cfg.barColor)}
                        style={{ width: `${Math.min(mod.percentage, 100)}%` }}
                      />
                    </div>
                    {mod.status === "over-limit" && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> Exceeded by {mod.percentage - 100}%
                      </p>
                    )}
                    {mod.status === "near-limit" && (
                      <p className="text-xs text-warning">⚠️ Approaching limit</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enforcement Status */}
          <div className="glass-card rounded-2xl p-5 glass-shadow mb-6">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-muted-foreground" />
              Enforcement Status
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {enforceResults.map((e) => (
                <div key={e.module} className="flex items-center justify-between py-3 px-4 border border-border/50 rounded-xl">
                  <span className="text-sm font-medium">{e.label}</span>
                  {e.result.allowed ? (
                    <Badge className="bg-success/10 text-success text-xs">Allowed</Badge>
                  ) : (
                    <div className="text-right">
                      <Badge className="bg-destructive/10 text-destructive text-xs">Blocked</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{e.result.reason}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Upgrade Plan
            </Button>
            <Button size="sm" variant="outline">Contact Tenant</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Usage Monitoring</h1>
            <p className="text-sm text-muted-foreground">
              Track tenant usage against plan limits — data derived from subscription records
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setStatusFilter(cat.filterValue)}
              className={cn(
                "glass-card rounded-2xl p-4 glass-shadow text-left transition-all hover:shadow-xl",
                statusFilter === cat.filterValue && "ring-2 ring-primary"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={cn("p-2 rounded-xl bg-muted", cat.color)}>
                  <cat.icon className="h-4 w-4" />
                </div>
                <span className="text-2xl font-bold text-foreground">{cat.count}</span>
              </div>
              <p className="text-sm text-muted-foreground">{cat.label}</p>
            </motion.button>
          ))}
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4 mb-6 glass-shadow">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tenants..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                <SelectItem value="punjab">Punjab</SelectItem>
                <SelectItem value="gujarat">Gujarat</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
                <SelectItem value="government">Government</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setRegionFilter("all");
                setPlanFilter("all");
                setStatusFilter("all");
                setSearchQuery("");
              }}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tenant-wise Usage Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              Tenant-wise Usage vs Plan Limits
            </h2>
            <span className="text-xs text-muted-foreground">{filtered.length} tenants</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="p-3 text-left text-xs font-medium text-muted-foreground">Tenant</th>
                  <th className="p-3 text-left text-xs font-medium text-muted-foreground">Plan</th>
                  <th className="p-3 text-center text-xs font-medium text-muted-foreground">Bookings</th>
                  <th className="p-3 text-center text-xs font-medium text-muted-foreground">Storage</th>
                  <th className="p-3 text-center text-xs font-medium text-muted-foreground">API Calls</th>
                  <th className="p-3 text-center text-xs font-medium text-muted-foreground">Users</th>
                  <th className="p-3 text-center text-xs font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((summary) => (
                  <tr
                    key={summary.tenantId}
                    className="border-b border-border/50 last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
                    onClick={() => setSelectedTenant(summary)}
                  >
                    <td className="p-3">
                      <p className="text-sm font-medium">{summary.templeName}</p>
                      <p className="text-xs text-muted-foreground">{summary.tenantId} · {summary.region}</p>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-xs">{summary.planName}</Badge>
                    </td>
                    {summary.modules.map((mod) => {
                      const cfg = statusConfig[mod.status];
                      return (
                        <td key={mod.module} className="p-3">
                          <div className="flex flex-col items-center gap-1 min-w-[100px]">
                            <span className="text-xs">
                              {formatValue(mod.used, mod.unit)}/{formatValue(mod.limit, mod.unit)}
                            </span>
                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className={cn("h-full rounded-full", cfg.barColor)}
                                style={{ width: `${Math.min(mod.percentage, 100)}%` }}
                              />
                            </div>
                            <span className={cn("text-[10px] font-medium", cfg.color.split(" ")[1])}>{mod.percentage}%</span>
                          </div>
                        </td>
                      );
                    })}
                    <td className="p-3 text-center">
                      <Badge className={cn("text-xs", statusConfig[summary.overallStatus].color)}>
                        {statusConfig[summary.overallStatus].label}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-sm text-muted-foreground">
                      No tenants match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UsageMonitoring;
