import { motion } from "framer-motion";
import {
  Building2,
  Clock,
  ShieldAlert,
  AlertTriangle,
  TrendingUp,
  CreditCard,
  Activity,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  Pause,
  DollarSign,
  Heart,
} from "lucide-react";

const kpis = [
  { label: "Active Tenants", value: "8,432", change: "+86", up: true, icon: Building2 },
  { label: "Trial Tenants", value: "342", change: "+24", up: true, icon: Clock },
  { label: "Suspended", value: "28", change: "-3", up: false, icon: Pause },
  { label: "Expired", value: "156", change: "+12", up: true, icon: XCircle },
  { label: "Revenue (MTD)", value: "₹24.5L", change: "+8.2%", up: true, icon: DollarSign },
  { label: "Health Score", value: "94.2%", change: "+1.2%", up: true, icon: Heart },
];

const planDistribution = [
  { plan: "Free", count: 2847, percentage: 33.8, color: "bg-muted-foreground" },
  { plan: "Standard", count: 3256, percentage: 38.6, color: "bg-info" },
  { plan: "Premium", count: 1834, percentage: 21.8, color: "bg-primary" },
  { plan: "Enterprise", count: 423, percentage: 5.0, color: "bg-success" },
  { plan: "Government", count: 72, percentage: 0.8, color: "bg-warning" },
];

const regionDistribution = [
  { region: "Tamil Nadu", tenants: 1847, percentage: 21.9, growth: "+12%" },
  { region: "Karnataka", tenants: 1456, percentage: 17.3, growth: "+15%" },
  { region: "Uttar Pradesh", tenants: 1234, percentage: 14.6, growth: "+8%" },
  { region: "Maharashtra", tenants: 1078, percentage: 12.8, growth: "+6%" },
  { region: "Andhra Pradesh", tenants: 892, percentage: 10.6, growth: "+11%" },
  { region: "Others", tenants: 1925, percentage: 22.8, growth: "+9%" },
];

const expiringSoon = [
  { temple: "Sri Lakshmi Temple", plan: "Premium", daysLeft: 3, value: "₹15,000/mo" },
  { temple: "Hanuman Mandir", plan: "Standard", daysLeft: 5, value: "₹8,000/mo" },
  { temple: "Kali Temple Trust", plan: "Enterprise", daysLeft: 7, value: "₹45,000/mo" },
  { temple: "Ganesh Devasthan", plan: "Premium", daysLeft: 10, value: "₹15,000/mo" },
];

const highUsageTenants = [
  { temple: "ISKCON Mumbai", usage: "98%", metric: "API Calls", status: "Critical" },
  { temple: "Tirupati Online", usage: "92%", metric: "Storage", status: "Warning" },
  { temple: "Vaishno Devi Trust", usage: "89%", metric: "Bookings", status: "Warning" },
  { temple: "Golden Temple", usage: "85%", metric: "Users", status: "Warning" },
];

const complianceIssues = [
  { temple: "New Temple ABC", issue: "KYC Pending", severity: "High", daysOpen: 15 },
  { temple: "Local Shiva Mandir", issue: "Bank Unverified", severity: "Medium", daysOpen: 8 },
  { temple: "Durga Temple", issue: "Agreement Expired", severity: "High", daysOpen: 22 },
];

const recentlySuspended = [
  { temple: "Temple XYZ", reason: "Payment Failure", date: "2 days ago", type: "Soft" },
  { temple: "Fraudulent Temple", reason: "Policy Violation", date: "5 days ago", type: "Full" },
  { temple: "Inactive Temple", reason: "Inactivity", date: "1 week ago", type: "Soft" },
];

const atRiskTenants = [
  { temple: "Struggling Temple", healthScore: 45, issues: ["Payment overdue", "Low activity"] },
  { temple: "Problem Temple", healthScore: 52, issues: ["Support escalations", "Compliance pending"] },
  { temple: "Declining Temple", healthScore: 58, issues: ["Usage declining", "No admin login 30d"] },
];

const severityColors: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-success/10 text-success",
  Critical: "bg-destructive/10 text-destructive",
  Warning: "bg-warning/10 text-warning",
};

const Overview = () => {
  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-1">Overview</h1>
        <p className="text-sm text-muted-foreground mb-8">Tenant Management Control Center</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-card rounded-2xl p-4 glass-shadow hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <kpi.icon className="h-4 w-4 text-primary" />
              </div>
              <div className={`flex items-center text-xs font-medium ${kpi.up ? "text-success" : "text-destructive"}`}>
                {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {kpi.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Plan & Region Distribution */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Plan Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              Plan Distribution
            </h2>
            <span className="text-xs text-muted-foreground">8,432 total</span>
          </div>
          <div className="p-5">
            <div className="flex gap-1 h-4 rounded-full overflow-hidden mb-4">
              {planDistribution.map((plan) => (
                <div 
                  key={plan.plan} 
                  className={`${plan.color}`}
                  style={{ width: `${plan.percentage}%` }}
                />
              ))}
            </div>
            <div className="space-y-2">
              {planDistribution.map((plan, i) => (
                <motion.div 
                  key={plan.plan}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-center justify-between py-1"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${plan.color}`} />
                    <span className="text-sm text-foreground">{plan.plan}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">{plan.count.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground w-12 text-right">{plan.percentage}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Region Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              Region Distribution
            </h2>
            <button className="text-xs text-primary hover:underline font-medium">View All</button>
          </div>
          <div className="divide-y divide-border/50">
            {regionDistribution.map((region, i) => (
              <motion.div 
                key={region.region}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="px-5 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{region.region}</p>
                  <p className="text-xs text-muted-foreground">{region.tenants.toLocaleString()} tenants</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${region.percentage}%` }} />
                  </div>
                  <span className="text-sm font-medium text-success flex items-center gap-0.5">
                    <ArrowUpRight className="h-3 w-3" />
                    {region.growth}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Alerts Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Expiring Soon */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              Expiring Soon
            </h2>
            <span className="text-xs bg-warning/10 text-warning px-2 py-0.5 rounded-full font-medium">
              {expiringSoon.length}
            </span>
          </div>
          <div className="divide-y divide-border/50 max-h-[240px] overflow-auto">
            {expiringSoon.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="px-5 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate pr-2">{item.temple}</p>
                  <span className="text-xs bg-warning/10 text-warning px-2 py-0.5 rounded-full">
                    {item.daysLeft}d
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.plan}</span>
                  <span className="text-xs text-foreground font-medium">{item.value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* High Usage */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-destructive" />
              High Usage
            </h2>
            <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full font-medium">
              {highUsageTenants.filter(t => t.status === "Critical").length} Critical
            </span>
          </div>
          <div className="divide-y divide-border/50 max-h-[240px] overflow-auto">
            {highUsageTenants.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="px-5 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate pr-2">{item.temple}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${severityColors[item.status]}`}>
                    {item.usage}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{item.metric}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Issues */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-warning" />
              Compliance Issues
            </h2>
            <span className="text-xs bg-warning/10 text-warning px-2 py-0.5 rounded-full font-medium">
              {complianceIssues.length}
            </span>
          </div>
          <div className="divide-y divide-border/50 max-h-[240px] overflow-auto">
            {complianceIssues.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="px-5 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate pr-2">{item.temple}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${severityColors[item.severity]}`}>
                    {item.severity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.issue}</span>
                  <span className="text-xs text-muted-foreground">{item.daysOpen}d open</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recently Suspended */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Pause className="h-4 w-4 text-destructive" />
              Recently Suspended
            </h2>
            <button className="text-xs text-primary hover:underline font-medium">View All</button>
          </div>
          <div className="divide-y divide-border/50">
            {recentlySuspended.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.05 }}
                className="px-5 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.temple}</p>
                  <p className="text-xs text-muted-foreground">{item.reason}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${item.type === "Full" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"}`}>
                    {item.type}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* At-Risk Tenants */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              At-Risk Tenants
            </h2>
            <button className="text-xs text-primary hover:underline font-medium">View All</button>
          </div>
          <div className="divide-y divide-border/50">
            {atRiskTenants.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.05 }}
                className="px-5 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">{item.temple}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.healthScore < 50 ? "bg-destructive" : "bg-warning"}`}
                        style={{ width: `${item.healthScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground">{item.healthScore}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {item.issues.map((issue, j) => (
                    <span key={j} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                      {issue}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
