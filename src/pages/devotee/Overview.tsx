import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Plus, TrendingUp, CheckCircle, Heart, UserCheck, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Overview = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Total Devotees",
      value: "2,547",
      icon: Users,
      trend: "+12% from last month",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Registered Devotees",
      value: "2,123",
      icon: UserCheck,
      trend: "Active registrations",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Email Verified",
      value: "1,856",
      icon: Mail,
      trend: "73% verified",
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Phone Verified",
      value: "1,432",
      icon: Phone,
      trend: "56% verified",
      color: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Devotee Management</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage all devotees, donations, and registrations
            </p>
          </div>
          <Button
            onClick={() => navigate("/devotee/all-devotees")}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            View All Devotees
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className={`p-6 ${stat.color}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-2">{stat.trend}</p>
                  </div>
                  <Icon className={`h-10 w-10 ${stat.iconColor} opacity-20`} />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Registrations</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <div>
                <p className="font-medium text-sm">Geeta</p>
                <p className="text-xs text-muted-foreground">USR-57512857</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
            </div>
            <button onClick={() => navigate("/devotee/all-devotees")} className="text-sm text-primary hover:underline">
              View all registrations →
            </button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Verification Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Verified</span>
              <span className="text-sm font-semibold">73%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "73%" }}></div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm">Phone Verified</span>
              <span className="text-sm font-semibold">56%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "56%" }}></div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Overview;
