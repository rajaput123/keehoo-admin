import { motion } from "framer-motion";
import { TrendingUp, Users, Calendar, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Analytics = () => {
  const monthlyRegistrations = [
    { month: "January", registrations: 120, active: 95, trend: "+12%" },
    { month: "February", registrations: 150, active: 125, trend: "+25%" },
    { month: "March", registrations: 180, active: 155, trend: "+20%" },
    { month: "April", registrations: 220, active: 185, trend: "+22%" },
    { month: "May", registrations: 185, active: 165, trend: "-16%" },
    { month: "June", registrations: 210, active: 185, trend: "+13%" },
    { month: "July", registrations: 245, active: 215, trend: "+17%" },
    { month: "August", registrations: 280, active: 245, trend: "+14%" },
    { month: "September", registrations: 265, active: 230, trend: "-5%" },
    { month: "October", registrations: 290, active: 260, trend: "+9%" },
    { month: "November", registrations: 320, active: 285, trend: "+10%" },
    { month: "December", registrations: 350, active: 315, trend: "+9%" },
  ];

  const currentYearStats = {
    totalRegistrations: 2875,
    averagePerMonth: 240,
    highestMonth: "December",
    highestCount: 350,
  };

  const maxRegistration = Math.max(...monthlyRegistrations.map((d) => d.registrations));

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Monthly Registration Analytics</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track devotee registrations by month
            </p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="2026">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Year Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="p-6 bg-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Registrations</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{currentYearStats.totalRegistrations}</p>
              </div>
              <Users className="h-10 w-10 text-blue-600 opacity-20" />
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="p-6 bg-green-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Per Month</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{currentYearStats.averagePerMonth}</p>
              </div>
              <BarChart3 className="h-10 w-10 text-green-600 opacity-20" />
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="p-6 bg-purple-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Highest Month</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{currentYearStats.highestCount}</p>
                <p className="text-xs text-muted-foreground mt-1">{currentYearStats.highestMonth}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-purple-600 opacity-20" />
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="p-6 bg-orange-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Registrations</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">2,123</p>
                <p className="text-xs text-muted-foreground mt-1">73.8% active</p>
              </div>
              <Calendar className="h-10 w-10 text-orange-600 opacity-20" />
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Monthly Registration Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <h3 className="font-semibold mb-6 text-lg">Monthly Registration Breakdown (2026)</h3>
          <div className="space-y-5">
            {monthlyRegistrations.map((data, index) => {
              const percentage = (data.registrations / maxRegistration) * 100;
              const trendColor = data.trend.startsWith("+") ? "text-green-600" : "text-red-600";
              return (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{data.month}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="text-right">
                        <p className="text-sm font-semibold">{data.registrations}</p>
                        <p className="text-xs text-muted-foreground">{data.active} active</p>
                      </div>
                      <p className={`text-sm font-semibold w-12 text-right ${trendColor}`}>{data.trend}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Additional Insights */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Best Performing Month</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">December</p>
              <p className="text-xs text-muted-foreground mt-1">350 registrations (+9% growth)</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-900">Growth Rate</p>
              <p className="text-2xl font-bold text-green-600 mt-2">+191%</p>
              <p className="text-xs text-muted-foreground mt-1">From January to December</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-900">Consistency</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">9 months</p>
              <p className="text-xs text-muted-foreground mt-1">With growth (3 months decline)</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm font-medium text-orange-900">Avg Active Rate</p>
              <p className="text-2xl font-bold text-orange-600 mt-2">88.5%</p>
              <p className="text-xs text-muted-foreground mt-1">Of registered devotees</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analytics;
