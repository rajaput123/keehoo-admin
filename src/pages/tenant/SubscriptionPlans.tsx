import { useState } from "react";
import { CustomField } from "@/components/CustomFieldsSection";
import { motion } from "framer-motion";
import {
  CreditCard,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Archive,
  Copy,
  Check,
  X,
  Download,
  ArrowLeft,
  Users,
  Database,
  Zap,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import CustomFieldsSection from "@/components/CustomFieldsSection";
import { subscriptionPlans, type SubscriptionPlan } from "@/data/mockSubscriptions";

const SubscriptionPlans = () => {
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const handleRowClick = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
  };

  const toggleSelect = (id: string) => {
    setSelectedPlans((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Inline Plan Detail View
  if (selectedPlan) {
    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedPlan(null)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold">{selectedPlan.name}</p>
                <p className="text-sm text-muted-foreground">{selectedPlan.id} · v{selectedPlan.version}</p>
              </div>
            </div>
            <Badge className={cn("text-xs", selectedPlan.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground")}>
              {selectedPlan.status}
            </Badge>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 pb-4 mb-4 border-b border-border">
            <Button size="sm" variant="outline" className="gap-2"><Edit className="h-4 w-4" />Edit Plan</Button>
            <Button size="sm" variant="outline" className="gap-2"><Copy className="h-4 w-4" />Duplicate</Button>
            <Button size="sm" variant="outline" className="gap-2 text-destructive hover:text-destructive"><Archive className="h-4 w-4" />Archive</Button>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Plan Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="tenants">Tenants ({selectedPlan.tenantCount})</TabsTrigger>
              <TabsTrigger value="history">Change History</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Pricing */}
                <div className="glass-card rounded-xl p-4 space-y-4">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    Pricing
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-border rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">Monthly</p>
                      <p className="text-2xl font-bold">₹{selectedPlan.monthlyPrice.toLocaleString()}</p>
                    </div>
                    <div className="p-4 border border-border rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">Yearly</p>
                      <p className="text-2xl font-bold">₹{selectedPlan.yearlyPrice.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Limits */}
                <div className="glass-card rounded-xl p-4 space-y-4">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    Resource Limits
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: "Max Users", value: selectedPlan.maxUsers, icon: Users },
                      { label: "Max Bookings", value: selectedPlan.maxBookings.toLocaleString() },
                      { label: "Storage", value: `${selectedPlan.maxStorage} GB`, icon: Database },
                      { label: "API Calls", value: selectedPlan.apiLimit.toLocaleString(), icon: Globe },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Usage Stats */}
              <div className="glass-card rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold">Usage Statistics</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 border border-border rounded-xl text-center">
                    <p className="text-2xl font-bold text-primary">{selectedPlan.tenantCount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Active Tenants</p>
                  </div>
                  <div className="p-3 border border-border rounded-xl text-center">
                    <p className="text-2xl font-bold text-foreground">
                      ₹{(selectedPlan.tenantCount * selectedPlan.monthlyPrice).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Est. Monthly Revenue</p>
                  </div>
                  <div className="p-3 border border-border rounded-xl text-center">
                    <p className="text-2xl font-bold text-foreground">v{selectedPlan.version}</p>
                    <p className="text-xs text-muted-foreground">Current Version</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-4">
              <div className="glass-card rounded-xl p-4 space-y-4">
                <h4 className="text-sm font-semibold">Enabled Features</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {["Directory Listing", "Booking System", "Reports", "Live Streaming", "Multi-Branch", "Volunteer Module", "VIP Module", "API Access", "Priority Support", "Custom Integrations"].map((feature) => {
                    const enabled = selectedPlan.features.some(f => f.toLowerCase().includes(feature.toLowerCase()) || selectedPlan.features.includes("All Features"));
                    return (
                      <div key={feature} className="flex items-center justify-between py-2 px-3 rounded-lg border border-border/50">
                        <span className="text-sm">{feature}</span>
                        <Switch checked={enabled} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tenants" className="mt-4">
              <div className="glass-card rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Tenants on {selectedPlan.name} Plan</h4>
                  <Button size="sm" variant="outline" className="gap-2"><Download className="h-4 w-4" />Export List</Button>
                </div>
                <div className="border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border">
                        <th className="p-3 text-left text-xs font-medium text-muted-foreground">Tenant ID</th>
                        <th className="p-3 text-left text-xs font-medium text-muted-foreground">Temple Name</th>
                        <th className="p-3 text-left text-xs font-medium text-muted-foreground">Billing</th>
                        <th className="p-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                        <th className="p-3 text-left text-xs font-medium text-muted-foreground">Expiry</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: "TEN-001", name: "Sri Lakshmi Temple", billing: "Monthly", status: "Active", expiry: "2026-03-15" },
                        { id: "TEN-012", name: "Durga Mandir", billing: "Yearly", status: "Active", expiry: "2026-12-01" },
                        { id: "TEN-045", name: "Ram Temple Trust", billing: "Monthly", status: "Trial", expiry: "2026-02-28" },
                      ].map((t) => (
                        <tr key={t.id} className="border-b border-border/50 last:border-0">
                          <td className="p-3 text-sm font-mono text-muted-foreground">{t.id}</td>
                          <td className="p-3 text-sm font-medium">{t.name}</td>
                          <td className="p-3 text-sm">{t.billing}</td>
                          <td className="p-3"><Badge variant="outline" className="text-xs">{t.status}</Badge></td>
                          <td className="p-3 text-xs text-muted-foreground">{t.expiry}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground text-center">Showing 3 of {selectedPlan.tenantCount} tenants</p>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <div className="glass-card rounded-xl p-4 space-y-4">
                <h4 className="text-sm font-semibold">Plan Change History</h4>
                <div className="border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border">
                        <th className="p-3 text-left text-xs font-medium text-muted-foreground">Date</th>
                        <th className="p-3 text-left text-xs font-medium text-muted-foreground">Change</th>
                        <th className="p-3 text-left text-xs font-medium text-muted-foreground">By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: "2024-06-01", change: "Price updated: ₹12,000 → ₹15,000/mo", by: "Admin" },
                        { date: "2024-03-15", change: "Added Live Streaming feature", by: "System" },
                        { date: "2024-01-01", change: "Plan created (v1.0)", by: "Admin" },
                      ].map((h, i) => (
                        <tr key={i} className="border-b border-border/50 last:border-0">
                          <td className="p-3 text-xs text-muted-foreground">{h.date}</td>
                          <td className="p-3 text-sm">{h.change}</td>
                          <td className="p-3 text-sm text-muted-foreground">{h.by}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    );
  }

  // Inline Create Plan View
  if (showCreate) {
    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setShowCreate(false)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Create New Plan</h1>
              <p className="text-sm text-muted-foreground">Configure plan details, pricing, and features</p>
            </div>
          </div>

          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Limits</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="custom">Custom Fields</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-4 space-y-4">
              <div className="glass-card rounded-xl p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Plan Name</Label>
                    <Input className="mt-1" placeholder="e.g., Premium Plus" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Plan ID (Auto-generated)</Label>
                    <Input className="mt-1" placeholder="PLAN-007" disabled />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Version</Label>
                    <Input className="mt-1" placeholder="1.0" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <Input className="mt-1" value="Active" disabled />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <Input className="mt-1" placeholder="Brief description of what this plan offers..." />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="mt-4 space-y-4">
              <div className="glass-card rounded-xl p-6 space-y-4">
                <h4 className="text-sm font-semibold">Pricing</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Monthly Price (₹)</Label>
                    <Input type="number" className="mt-1" placeholder="0" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Yearly Price (₹)</Label>
                    <Input type="number" className="mt-1" placeholder="0" />
                  </div>
                </div>
                <h4 className="text-sm font-semibold pt-4">Resource Limits</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Max Users</Label>
                    <Input type="number" className="mt-1" placeholder="5" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Max Bookings</Label>
                    <Input type="number" className="mt-1" placeholder="5000" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Max Storage (GB)</Label>
                    <Input type="number" className="mt-1" placeholder="5" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">API Call Limit</Label>
                    <Input type="number" className="mt-1" placeholder="50000" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-4 space-y-4">
              <div className="glass-card rounded-xl p-6 space-y-4">
                <h4 className="text-sm font-semibold">Enable Features</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {["Directory Listing", "Booking System", "Reports", "Live Streaming", "Multi-Branch", "Volunteer Module", "VIP Module", "API Access", "Priority Support", "Custom Integrations", "SLA Guarantee", "Compliance Reports"].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 py-2 px-3 border border-border/50 rounded-lg">
                      <Checkbox id={`create-${feature}`} />
                      <label htmlFor={`create-${feature}`} className="text-sm">{feature}</label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="mt-4 space-y-4">
              <div className="glass-card rounded-xl p-6">
                <CustomFieldsSection fields={customFields} onFieldsChange={setCustomFields} />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-2 mt-6">
            <Button className="gap-2"><Check className="h-4 w-4" />Create Plan</Button>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main list view
  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Subscription Plans</h1>
            <p className="text-sm text-muted-foreground">Configure global subscription plans and pricing</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2" onClick={() => setShowCreate(true)}>
              <Plus className="h-4 w-4" />
              New Plan
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4 mb-6 glass-shadow">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search plans..." className="pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show Archived</span>
              <Switch />
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedPlans.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-6 py-3 rounded-full shadow-xl flex items-center gap-4"
          >
            <span className="text-sm font-medium">{selectedPlans.length} selected</span>
            <div className="h-4 w-px bg-background/20" />
            <Button size="sm" variant="ghost" className="text-background hover:text-background hover:bg-background/10 gap-2">
              <Archive className="h-4 w-4" />
              Archive
            </Button>
            <Button size="sm" variant="ghost" className="text-background hover:text-background hover:bg-background/10 gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <button onClick={() => setSelectedPlans([])} className="ml-2 p-1 hover:bg-background/10 rounded">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptionPlans.filter(p => p.status === "Active").map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleRowClick(plan)}
              className="glass-card rounded-2xl glass-shadow overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground">v{plan.version}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem className="gap-2"><Edit className="h-4 w-4" />Edit Plan</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2"><Copy className="h-4 w-4" />Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-destructive"><Archive className="h-4 w-4" />Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">₹{plan.monthlyPrice.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                  <p className="text-xs text-muted-foreground">₹{plan.yearlyPrice.toLocaleString()}/year</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Users</span>
                    <span className="font-medium">{plan.maxUsers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bookings</span>
                    <span className="font-medium">{plan.maxBookings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="font-medium">{plan.maxStorage} GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">API Calls</span>
                    <span className="font-medium">{plan.apiLimit.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{plan.tenantCount.toLocaleString()} tenants</span>
                    <Badge className="bg-success/10 text-success text-xs">{plan.status}</Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Archived Plans */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Archived Plans</h2>
          <div className="glass-card rounded-2xl glass-shadow overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="p-4 text-left">
                    <Checkbox
                      checked={selectedPlans.length === subscriptionPlans.filter(p => p.status === "Archived").length && selectedPlans.length > 0}
                      onCheckedChange={() => {}}
                    />
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Plan Name</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Monthly Price</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Tenants</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Version</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {subscriptionPlans.filter(p => p.status === "Archived").map((plan) => (
                  <tr key={plan.id} className="border-b border-border/50 hover:bg-muted/30 cursor-pointer" onClick={() => handleRowClick(plan)}>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedPlans.includes(plan.id)}
                        onCheckedChange={() => toggleSelect(plan.id)}
                      />
                    </td>
                    <td className="p-4 text-sm font-medium">{plan.name}</td>
                    <td className="p-4 text-sm">₹{plan.monthlyPrice.toLocaleString()}</td>
                    <td className="p-4 text-sm">{plan.tenantCount}</td>
                    <td className="p-4 text-sm text-muted-foreground">v{plan.version}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">{plan.status}</Badge>
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm">Restore</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionPlans;
