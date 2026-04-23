import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Building2,
  CreditCard,
  ToggleLeft,
  ShieldCheck,
  Settings,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const logs = [
  {
    id: "LOG-001",
    tenantId: "TEN-001",
    tenantName: "Sri Lakshmi Narasimha Temple",
    action: "Plan Upgraded",
    eventType: "plan",
    previousValue: "Standard",
    newValue: "Premium",
    user: "System",
    timestamp: "2024-02-05 14:32:45",
    region: "Tamil Nadu",
    notes: "Auto-upgrade triggered by usage threshold",
  },
  {
    id: "LOG-002",
    tenantId: "TEN-002",
    tenantName: "ISKCON Mumbai",
    action: "Feature Enabled",
    eventType: "feature",
    previousValue: null,
    newValue: "Live Streaming",
    user: "Priya Sharma",
    timestamp: "2024-02-05 12:15:22",
    region: "Maharashtra",
    notes: "Requested by temple admin",
  },
  {
    id: "LOG-003",
    tenantId: "TEN-003",
    tenantName: "Golden Temple Trust",
    action: "Admin Added",
    eventType: "user",
    previousValue: null,
    newValue: "harpreet@goldtemple.org",
    user: "Deepak Singh",
    timestamp: "2024-02-05 10:45:00",
    region: "Punjab",
    notes: "New temple coordinator",
  },
  {
    id: "LOG-004",
    tenantId: "TEN-006",
    tenantName: "Problem Temple XYZ",
    action: "Tenant Suspended",
    eventType: "suspension",
    previousValue: "Active",
    newValue: "Suspended",
    user: "System",
    timestamp: "2024-02-04 18:20:33",
    region: "Gujarat",
    notes: "Payment failure - 3 attempts",
  },
  {
    id: "LOG-005",
    tenantId: "TEN-004",
    tenantName: "Kashi Vishwanath",
    action: "Configuration Override",
    eventType: "config",
    previousValue: "Storage: 5GB",
    newValue: "Storage: 10GB",
    user: "Amit Patel",
    timestamp: "2024-02-04 16:10:15",
    region: "Uttar Pradesh",
    notes: "Enterprise deal special terms",
  },
  {
    id: "LOG-006",
    tenantId: "TEN-001",
    tenantName: "Sri Lakshmi Narasimha Temple",
    action: "Payment Received",
    eventType: "payment",
    previousValue: null,
    newValue: "₹15,000",
    user: "System",
    timestamp: "2024-02-04 14:00:00",
    region: "Tamil Nadu",
    notes: "Monthly subscription",
  },
  {
    id: "LOG-007",
    tenantId: "TEN-005",
    tenantName: "Local Shiva Temple",
    action: "Compliance Updated",
    eventType: "compliance",
    previousValue: "KYC Pending",
    newValue: "KYC Verified",
    user: "Rahul Verma",
    timestamp: "2024-02-04 11:30:45",
    region: "Karnataka",
    notes: "Documents verified",
  },
  {
    id: "LOG-008",
    tenantId: "TEN-007",
    tenantName: "Meenakshi Temple",
    action: "Feature Disabled",
    eventType: "feature",
    previousValue: "API Access",
    newValue: null,
    user: "System",
    timestamp: "2024-02-03 22:15:00",
    region: "Tamil Nadu",
    notes: "Exceeded API limit",
  },
  {
    id: "LOG-009",
    tenantId: "TEN-008",
    tenantName: "Jagannath Puri Temple",
    action: "Tenant Reactivated",
    eventType: "suspension",
    previousValue: "Suspended",
    newValue: "Active",
    user: "Deepak Singh",
    timestamp: "2024-02-03 15:45:22",
    region: "Odisha",
    notes: "Payment cleared",
  },
  {
    id: "LOG-010",
    tenantId: "TEN-002",
    tenantName: "ISKCON Mumbai",
    action: "Contract Extended",
    eventType: "plan",
    previousValue: "Expires: 2024-03-01",
    newValue: "Expires: 2025-03-01",
    user: "Priya Sharma",
    timestamp: "2024-02-03 10:20:00",
    region: "Maharashtra",
    notes: "Annual renewal",
  },
];

const eventTypeIcons: Record<string, any> = {
  plan: CreditCard,
  feature: ToggleLeft,
  user: User,
  suspension: AlertTriangle,
  config: Settings,
  payment: CreditCard,
  compliance: ShieldCheck,
};

const eventTypeColors: Record<string, string> = {
  plan: "text-info",
  feature: "text-primary",
  user: "text-success",
  suspension: "text-destructive",
  config: "text-warning",
  payment: "text-success",
  compliance: "text-info",
};

const TenantLogs = () => {
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedLogs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedLogs((prev) =>
      prev.length === logs.length ? [] : logs.map((l) => l.id)
    );
  };

  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Tenant Logs</h1>
            <p className="text-sm text-muted-foreground">View complete audit trail of tenant actions</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: "Total Logs", value: "45,892", icon: FileText },
            { label: "Plan Changes", value: "234", icon: CreditCard },
            { label: "Feature Toggles", value: "567", icon: ToggleLeft },
            { label: "Suspensions", value: "28", icon: AlertTriangle },
            { label: "Today", value: "156", icon: Clock },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl p-4 glass-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-primary/10">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xl font-bold text-foreground">{stat.value}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4 mb-6 glass-shadow">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search logs..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="plan">Plan Changes</SelectItem>
                <SelectItem value="feature">Feature Toggles</SelectItem>
                <SelectItem value="user">User Management</SelectItem>
                <SelectItem value="suspension">Suspensions</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="config">Configuration</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="glass-card rounded-2xl glass-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="p-4 text-left">
                    <Checkbox
                      checked={selectedLogs.length === logs.length}
                      onCheckedChange={toggleAll}
                    />
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Timestamp</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Tenant</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Action</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">From → To</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">User</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Region</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => {
                  const IconComponent = eventTypeIcons[log.eventType] || FileText;
                  return (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <Checkbox
                          checked={selectedLogs.includes(log.id)}
                          onCheckedChange={() => toggleSelect(log.id)}
                        />
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-mono text-foreground">{log.timestamp.split(" ")[1]}</p>
                        <p className="text-xs text-muted-foreground">{log.timestamp.split(" ")[0]}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-foreground">{log.tenantName}</p>
                        <p className="text-xs text-muted-foreground">{log.tenantId}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={cn("p-1.5 rounded-lg bg-muted/50", eventTypeColors[log.eventType])}>
                            <IconComponent className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-sm font-medium">{log.action}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm">
                          {log.previousValue && (
                            <>
                              <span className="text-muted-foreground">{log.previousValue}</span>
                              <span className="text-muted-foreground">→</span>
                            </>
                          )}
                          <span className="font-medium text-foreground">{log.newValue || "—"}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-xs">{log.user}</Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{log.region}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t border-border/50 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing 1-10 of 45,892 logs</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TenantLogs;
