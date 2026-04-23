import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Briefcase, CheckCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Overview = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Total Freelancers",
      value: "1,245",
      icon: Users,
      trend: "+8% from last month",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Active Projects",
      value: "892",
      icon: Briefcase,
      trend: "Currently active",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Pending Verification",
      value: "124",
      icon: CheckCircle,
      trend: "Requires review",
      color: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      label: "Current Payouts",
      value: "$125.4K",
      icon: DollarSign,
      trend: "+15% growth",
      color: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="flex-1 p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Freelancer Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time performance metrics and onboarding status
          </p>
        </div>
        <Button className="gap-2" onClick={() => navigate("/domain/freelancer/accounts")}>
          <Users className="h-4 w-4" />
          Manage Accounts
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className={`p-6 ${stat.color} border-none shadow-sm`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-2 font-medium">{stat.trend}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-white shadow-sm`}>
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Activity Mini-List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Registration Activity</h2>
          <div className="space-y-4">
            {[
              { name: "Priya Kumar", action: "New registration", status: "pending", time: "2 hours ago" },
              { name: "Rajesh Singh", action: "Account verified", status: "verified", time: "4 hours ago" },
              { name: "Sneha Patel", action: "Payment method updated", status: "verified", time: "6 hours ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0 border-border/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={activity.status === "verified" ? "default" : "secondary"}
                    className={`capitalize ${activity.status === "verified" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="link"
            className="w-full mt-4 text-primary"
            onClick={() => navigate("/domain/freelancer/accounts")}
          >
            View all account requests
          </Button>
        </Card>
      </motion.div>
    </div>
  );
};

export default Overview;
