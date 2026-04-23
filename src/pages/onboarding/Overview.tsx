import { motion } from "framer-motion";
import { 
  FileInput, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  TrendingUp,
  
  Timer,
  MapPin,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Percent
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const metrics = [
  { label: "Total Registrations", value: "2,847", change: "+12%", up: true, icon: FileInput },
  { label: "Under Review", value: "156", change: "+8", up: true, icon: Clock },
  { label: "Verification Pending", value: "89", change: "-5", up: false, icon: Timer },
  { label: "Approved", value: "2,341", change: "+23", up: true, icon: CheckCircle2 },
  { label: "Rejected", value: "261", change: "+3", up: true, icon: XCircle },
  { label: "Activation Rate", value: "73.4%", change: "+2.1%", up: true, icon: Percent },
];

const funnelStages = [
  { stage: "Submitted", count: 2847, percentage: 100 },
  { stage: "Under Review", count: 2691, percentage: 94.5 },
  { stage: "Verification", count: 2502, percentage: 87.9 },
  { stage: "Approved", count: 2341, percentage: 82.2 },
  { stage: "Tenant Created", count: 2198, percentage: 77.2 },
  { stage: "Activated", count: 2089, percentage: 73.4 },
];




const regionSummary = [
  { region: "Tamil Nadu", registrations: 487, approved: 412, pending: 45, rejected: 30, growth: "+12%" },
  { region: "Uttar Pradesh", registrations: 423, approved: 356, pending: 42, rejected: 25, growth: "+8%" },
  { region: "Maharashtra", registrations: 398, approved: 341, pending: 38, rejected: 19, growth: "+15%" },
  { region: "Karnataka", registrations: 356, approved: 298, pending: 35, rejected: 23, growth: "+6%" },
  { region: "Kerala", registrations: 312, approved: 278, pending: 22, rejected: 12, growth: "+11%" },
];

const recentActivity = [
  { action: "Tenant Created", temple: "Sri Meenakshi Temple", user: "Admin A", time: "2 min ago", type: "approved" },
  { action: "Approved", temple: "Tirupati Balaji Trust", user: "Approver B", time: "5 min ago", type: "approved" },
  { action: "Verification Complete", temple: "ISKCON Mumbai", user: "Verifier C", time: "12 min ago", type: "verified" },
  { action: "Submitted", temple: "Shirdi Sai Sansthan", user: "Self-Registration", time: "18 min ago", type: "submission" },
  { action: "Rejected", temple: "Unknown Temple", user: "Reviewer D", time: "25 min ago", type: "rejected" },
  { action: "Under Review", temple: "Golden Temple Trust", user: "Reviewer A", time: "32 min ago", type: "review" },
];

const slaMetrics = [
  { metric: "Avg. Review Time", value: "4.2 hrs", target: "6 hrs", status: "good" },
  { metric: "Avg. Verification Time", value: "1.8 days", target: "2 days", status: "good" },
  { metric: "Avg. Approval Time", value: "2.5 days", target: "3 days", status: "good" },
  { metric: "Overdue Cases", value: "12", target: "0", status: "warning" },
];




const activityTypeColors: Record<string, string> = {
  approved: "text-success",
  rejected: "text-destructive",
  submission: "text-info",
  verified: "text-primary",
  review: "text-warning",
};

const Overview = () => {
  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-1">Onboarding Overview</h1>
        <p className="text-sm text-muted-foreground mb-8">Monitor registration pipeline, verification status, and activation metrics</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-card rounded-2xl p-4 glass-shadow hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <metric.icon className="h-4 w-4 text-primary" />
              </div>
              <div className={`flex items-center text-xs font-medium ${metric.up ? "text-success" : "text-destructive"}`}>
                {metric.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {metric.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{metric.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Registration Funnel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Registration Funnel
            </h2>
            <span className="text-lg font-bold text-primary">73.4% Activation Rate</span>
          </div>
          <div className="p-5 space-y-4">
            {funnelStages.map((stage, index) => (
              <motion.div 
                key={stage.stage} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{stage.stage}</span>
                  <span className="font-medium">{stage.count.toLocaleString()} ({stage.percentage}%)</span>
                </div>
                <Progress value={stage.percentage} className="h-2" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SLA Monitoring */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Timer className="h-4 w-4 text-primary" />
              SLA Monitoring
            </h2>
          </div>
          <div className="p-4 space-y-3">
            {slaMetrics.map((sla, i) => (
              <motion.div 
                key={sla.metric} 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">{sla.metric}</p>
                  <p className="text-xs text-muted-foreground">Target: {sla.target}</p>
                </div>
                <Badge variant={sla.status === "good" ? "default" : "destructive"}>
                  {sla.value}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Region Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Region Summary
            </h2>
            <button className="text-xs text-primary hover:underline font-medium">View All</button>
          </div>
          <div className="divide-y divide-border/50">
            {regionSummary.map((region, i) => (
              <motion.div 
                key={region.region} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="px-5 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{region.region}</p>
                  <p className="text-xs text-muted-foreground">{region.registrations} registrations</p>
                </div>
                <span className="text-sm font-medium text-success flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  {region.growth}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Recent Activity
            </h2>
            <button className="text-xs text-primary hover:underline font-medium">View All</button>
          </div>
          <div className="divide-y divide-border/50 max-h-[280px] overflow-auto">
            {recentActivity.map((activity, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="px-5 py-3.5 flex items-start gap-3 hover:bg-muted/30 transition-colors"
              >
                <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                  activity.type === "approved" || activity.type === "verified" 
                    ? "bg-success" 
                    : activity.type === "rejected" 
                      ? "bg-destructive" 
                      : "bg-warning"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{activity.temple}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${activityTypeColors[activity.type] || "text-muted-foreground"}`}>{activity.action}</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
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