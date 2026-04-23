import { useState } from "react";
import { CustomField } from "@/components/CustomFieldsSection";
import { motion } from "framer-motion";
import {
  Building2,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  ExternalLink,
  Pause,
  Play,
  UserCog,
  Globe,
  CreditCard,
  Activity,
  Heart,
  ChevronDown,
  X,
  Settings,
  Users,
  Gauge,
  ToggleLeft,
  ShieldCheck,
  StickyNote,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import SearchableSelect from "@/components/SearchableSelect";
import CustomFieldsSection from "@/components/CustomFieldsSection";
import TenantSubscriptionTab from "@/components/TenantSubscriptionTab";
import { tenants, getSubscriptionByTenantId, getPlanById, getTenantUsageSummary, canPerformAction, type UsageModule } from "@/data/mockSubscriptions";

const adminUsers = [
  { name: "Ramesh Kumar", email: "ramesh@temple.org", role: "Super Admin", status: "Active", lastLogin: "2 hours ago", mfa: true },
  { name: "Priya Devi", email: "priya@temple.org", role: "Admin", status: "Active", lastLogin: "1 day ago", mfa: false },
  { name: "Suresh Pillai", email: "suresh@temple.org", role: "Manager", status: "Inactive", lastLogin: "30 days ago", mfa: true },
];

// Usage metrics are now derived from subscription data via getTenantUsageSummary

const featureToggles = [
  { feature: "Booking System", enabled: true, effectiveDate: "2024-01-15" },
  { feature: "Live Streaming", enabled: true, effectiveDate: "2024-02-01" },
  { feature: "Multi-Branch", enabled: true, effectiveDate: "2024-01-15" },
  { feature: "Volunteer Module", enabled: false, effectiveDate: null },
  { feature: "VIP Devotee Module", enabled: true, effectiveDate: "2024-03-01" },
  { feature: "Reports", enabled: true, effectiveDate: "2024-01-15" },
  { feature: "API Access", enabled: false, effectiveDate: null },
];

const activityLogs = [
  { action: "Plan upgraded", from: "Standard", to: "Premium", user: "System", date: "2024-02-01", type: "plan" },
  { action: "Feature enabled", from: null, to: "Live Streaming", user: "Admin", date: "2024-02-01", type: "feature" },
  { action: "Admin added", from: null, to: "priya@temple.org", user: "Super Admin", date: "2024-01-28", type: "user" },
  { action: "Payment received", from: null, to: "₹15,000", user: "System", date: "2024-01-25", type: "payment" },
];

const planOptions = [
  { value: "free", label: "Free" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "enterprise", label: "Enterprise" },
  { value: "government", label: "Government" },
];

const tenantStatusColors: Record<string, string> = {
  active: "bg-success/10 text-success",
  trial: "bg-info/10 text-info",
  suspended: "bg-destructive/10 text-destructive",
  expired: "bg-muted text-muted-foreground",
};

const regionOptions = [
  { value: "tamil-nadu", label: "Tamil Nadu" },
  { value: "karnataka", label: "Karnataka" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "uttar-pradesh", label: "Uttar Pradesh" },
  { value: "punjab", label: "Punjab" },
  { value: "gujarat", label: "Gujarat" },
];

// Status colors now use tenantStatusColors defined above

const healthColors = (score: number) => {
  if (score >= 80) return "text-success";
  if (score >= 50) return "text-warning";
  return "text-destructive";
};

const AllTenants = () => {
  const [selectedTenants, setSelectedTenants] = useState<string[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<typeof tenants[0] | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const handleRowClick = (tenant: typeof tenants[0]) => {
    setSelectedTenant(tenant);
    setActiveTab("overview");
  };

  const toggleSelect = (id: string) => {
    setSelectedTenants((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedTenants((prev) =>
      prev.length === tenants.length ? [] : tenants.map((t) => t.id)
    );
  };

  // Inline Detail View
  if (selectedTenant) {
    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedTenant(null)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold">{selectedTenant.templeName}</p>
                <p className="text-sm text-muted-foreground">{selectedTenant.id} · {selectedTenant.directoryId}</p>
              </div>
            </div>
            <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full capitalize", tenantStatusColors[selectedTenant.tenantStatus])}>
              {selectedTenant.tenantStatus}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 pb-4 mb-4 border-b border-border">
            <Button size="sm" variant="outline" className="gap-2"><Pause className="h-4 w-4" />Suspend</Button>
            <Button size="sm" variant="outline" className="gap-2"><CreditCard className="h-4 w-4" />Change Plan</Button>
            <Button size="sm" variant="outline" className="gap-2"><Users className="h-4 w-4" />Reset Admin Password</Button>
            <Button size="sm" variant="outline" className="gap-2 text-destructive hover:text-destructive"><X className="h-4 w-4" />Close Tenant</Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-9 h-auto p-1">
              <TabsTrigger value="overview" className="text-xs py-2"><Settings className="h-3 w-3 mr-1" />Overview</TabsTrigger>
              <TabsTrigger value="subscription" className="text-xs py-2"><CreditCard className="h-3 w-3 mr-1" />Subscription</TabsTrigger>
              <TabsTrigger value="admins" className="text-xs py-2"><Users className="h-3 w-3 mr-1" />Admins</TabsTrigger>
              <TabsTrigger value="usage" className="text-xs py-2"><Gauge className="h-3 w-3 mr-1" />Usage</TabsTrigger>
              <TabsTrigger value="features" className="text-xs py-2"><ToggleLeft className="h-3 w-3 mr-1" />Features</TabsTrigger>
              <TabsTrigger value="compliance" className="text-xs py-2"><ShieldCheck className="h-3 w-3 mr-1" />Compliance</TabsTrigger>
              <TabsTrigger value="config" className="text-xs py-2"><Settings className="h-3 w-3 mr-1" />Config</TabsTrigger>
              <TabsTrigger value="notes" className="text-xs py-2"><StickyNote className="h-3 w-3 mr-1" />Notes</TabsTrigger>
              <TabsTrigger value="logs" className="text-xs py-2"><FileText className="h-3 w-3 mr-1" />Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {(() => {
                    const sub = getSubscriptionByTenantId(selectedTenant.id);
                    const plan = sub ? getPlanById(sub.planId) : null;
                    return [
                      { label: "Tenant ID", value: selectedTenant.id },
                      { label: "Directory Link", value: selectedTenant.directoryId },
                      { label: "Registration ID", value: selectedTenant.registrationId },
                      { label: "Current Plan", value: plan?.name || "Not Assigned" },
                      { label: "Tenant Status", value: selectedTenant.tenantStatus },
                    ];
                  })().map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className={`text-sm font-medium ${item.label === "Directory Link" ? "text-primary" : ""} capitalize`}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Region", value: selectedTenant.region },
                    { label: "Account Manager", value: selectedTenant.accountManager },
                    { label: "Created Date", value: selectedTenant.createdDate },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Health Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", selectedTenant.healthScore >= 80 ? "bg-success" : "bg-warning")} style={{ width: `${selectedTenant.healthScore}%` }} />
                      </div>
                      <span className={cn("text-sm font-medium", healthColors(selectedTenant.healthScore))}>{selectedTenant.healthScore}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="subscription" className="mt-4">
              <TenantSubscriptionTab tenant={selectedTenant} />
            </TabsContent>

            <TabsContent value="admins" className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-semibold">Admin Users (3/15)</h4>
                <Button size="sm" className="gap-2"><Users className="h-4 w-4" />Add User</Button>
              </div>
              <div className="border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border">
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">Name</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">Email</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">Role</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">MFA</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">Last Login</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map((user, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="p-3 text-sm font-medium">{user.name}</td>
                        <td className="p-3 text-sm text-muted-foreground">{user.email}</td>
                        <td className="p-3 text-sm">{user.role}</td>
                        <td className="p-3">
                          <Badge variant="outline" className={cn("text-xs", user.status === "Active" ? "border-success text-success" : "border-muted-foreground text-muted-foreground")}>{user.status}</Badge>
                        </td>
                        <td className="p-3">
                          {user.mfa ? <Badge className="bg-success/10 text-success text-xs">Enabled</Badge> : <Badge variant="outline" className="text-xs">Disabled</Badge>}
                        </td>
                        <td className="p-3 text-xs text-muted-foreground">{user.lastLogin}</td>
                        <td className="p-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover">
                              <DropdownMenuItem>Change Role</DropdownMenuItem>
                              <DropdownMenuItem>Reset Password</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Disable User</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="usage" className="mt-4 space-y-4">
              {(() => {
                const summary = getTenantUsageSummary(selectedTenant.id);
                if (!summary) return <p className="text-sm text-muted-foreground">No usage data available.</p>;
                return (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold">Usage & Limits (from Subscription)</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Auto Restrict on Over-limit</span>
                        <Switch />
                      </div>
                    </div>
                    <div className="space-y-4">
                      {summary.modules.map((mod) => (
                        <div key={mod.module} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{mod.label}</span>
                            <span className="text-sm">
                              <span className={cn(mod.percentage >= 90 ? "text-destructive font-semibold" : "text-foreground")}>
                                {mod.unit ? mod.used : mod.used.toLocaleString()}{mod.unit ? ` ${mod.unit}` : ""}
                              </span>
                              <span className="text-muted-foreground">
                                {" "}/ {mod.unit ? mod.limit : mod.limit.toLocaleString()}{mod.unit ? ` ${mod.unit}` : ""}
                              </span>
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={cn("h-full rounded-full transition-all", mod.percentage >= 100 ? "bg-destructive" : mod.percentage >= 75 ? "bg-warning" : "bg-primary")}
                              style={{ width: `${Math.min(mod.percentage, 100)}%` }}
                            />
                          </div>
                          {mod.status === "over-limit" && <p className="text-xs text-destructive">⚠️ Over limit by {mod.percentage - 100}%</p>}
                          {mod.status === "near-limit" && <p className="text-xs text-warning">⚠️ Approaching limit</p>}
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </TabsContent>

            <TabsContent value="features" className="mt-4">
              <h4 className="text-sm font-semibold mb-4">Feature Controls</h4>
              <div className="space-y-3">
                {featureToggles.map((feature) => (
                  <div key={feature.feature} className="flex items-center justify-between py-3 border-b border-border/50">
                    <div>
                      <p className="text-sm font-medium">{feature.feature}</p>
                      {feature.effectiveDate && <p className="text-xs text-muted-foreground">Enabled since {feature.effectiveDate}</p>}
                    </div>
                    <Switch checked={feature.enabled} />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="mt-4 space-y-4">
              <h4 className="text-sm font-semibold">Compliance Status</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {[
                    { label: "Legal Verified", value: "Verified" },
                    { label: "Bank Verified", value: "Verified" },
                    { label: "KYC Completed", value: "Completed" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <Badge className="bg-success/10 text-success text-xs">{item.value}</Badge>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Agreement Signed", value: "Signed" },
                    { label: "Risk Level", value: "Low" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <Badge className="bg-success/10 text-success text-xs">{item.value}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4">
                <label className="text-sm font-medium">Compliance Notes</label>
                <Textarea className="mt-2" placeholder="Add compliance notes..." rows={3} />
              </div>
            </TabsContent>

            <TabsContent value="config" className="mt-4 space-y-4">
              <h4 className="text-sm font-semibold">Custom Configuration Overrides</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div><label className="text-xs text-muted-foreground">Custom Booking Limit</label><Input type="number" placeholder="Default: 10,000" className="mt-1" /></div>
                  <div><label className="text-xs text-muted-foreground">Custom Storage Limit (GB)</label><Input type="number" placeholder="Default: 5" className="mt-1" /></div>
                  <div><label className="text-xs text-muted-foreground">Custom Commission %</label><Input type="number" placeholder="Default: 2.5%" className="mt-1" /></div>
                </div>
                <div className="space-y-3">
                  <div><label className="text-xs text-muted-foreground">Custom API Limit</label><Input type="number" placeholder="Default: 50,000" className="mt-1" /></div>
                  <div>
                    <label className="text-xs text-muted-foreground">Custom Payment Gateway</label>
                    <SearchableSelect
                      options={[{ value: "razorpay", label: "Razorpay" },{ value: "payu", label: "PayU" },{ value: "stripe", label: "Stripe" }]}
                      placeholder="Select gateway..."
                      onValueChange={() => {}}
                      onAddNew={() => {}}
                      addNewLabel="Add Gateway"
                    />
                  </div>
                </div>
              </div>
              <CustomFieldsSection fields={customFields} onFieldsChange={setCustomFields} />
            </TabsContent>

            <TabsContent value="notes" className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold">Internal Notes</h4>
                <Button size="sm">Add Note</Button>
              </div>
              <div className="space-y-3">
                {[
                  { note: "Customer requested custom pricing for enterprise deal", category: "Billing", by: "Priya Sharma", date: "2024-02-01", escalated: true },
                  { note: "Technical support provided for API integration", category: "Technical", by: "Rahul Verma", date: "2024-01-28", escalated: false },
                  { note: "KYC documents verified successfully", category: "Compliance", by: "System", date: "2024-01-15", escalated: false },
                ].map((note, i) => (
                  <div key={i} className="p-4 border border-border rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">{note.category}</Badge>
                      {note.escalated && <Badge className="bg-warning/10 text-warning text-xs">Escalated</Badge>}
                    </div>
                    <p className="text-sm text-foreground mb-2">{note.note}</p>
                    <p className="text-xs text-muted-foreground">{note.by} · {note.date}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="logs" className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-semibold">Activity Logs</h4>
                <Button size="sm" variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button>
              </div>
              <div className="border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border">
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">Action</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">From</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">To</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">User</th>
                      <th className="p-3 text-left text-xs font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityLogs.map((log, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="p-3 text-sm font-medium">{log.action}</td>
                        <td className="p-3 text-sm text-muted-foreground">{log.from || "—"}</td>
                        <td className="p-3 text-sm">{log.to}</td>
                        <td className="p-3 text-sm text-muted-foreground">{log.user}</td>
                        <td className="p-3 text-xs text-muted-foreground">{log.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">All Tenants</h1>
            <p className="text-sm text-muted-foreground">Manage all active temple SaaS accounts</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />Export</Button>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4 mb-6 glass-shadow">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tenants..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Region" /></SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Regions</SelectItem>
                {regionOptions.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Plan" /></SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Plans</SelectItem>
                {planOptions.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedTenants.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-6 py-3 rounded-full shadow-xl flex items-center gap-4">
            <span className="text-sm font-medium">{selectedTenants.length} selected</span>
            <div className="h-4 w-px bg-background/20" />
            <Button size="sm" variant="ghost" className="text-background hover:text-background hover:bg-background/10 gap-2"><Globe className="h-4 w-4" />Assign Region</Button>
            <Button size="sm" variant="ghost" className="text-background hover:text-background hover:bg-background/10 gap-2"><UserCog className="h-4 w-4" />Assign Manager</Button>
            <Button size="sm" variant="ghost" className="text-background hover:text-background hover:bg-background/10 gap-2"><Download className="h-4 w-4" />Export</Button>
            <button onClick={() => setSelectedTenants([])} className="ml-2 p-1 hover:bg-background/10 rounded"><X className="h-4 w-4" /></button>
          </motion.div>
        )}

        {/* Table */}
        <div className="glass-card rounded-2xl glass-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="p-4 text-left"><Checkbox checked={selectedTenants.length === tenants.length} onCheckedChange={toggleAll} /></th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Tenant ID</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Temple Name</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Plan / Tier</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Region</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Health</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Last Activity</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide"></th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant, i) => (
                  <motion.tr
                    key={tenant.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => handleRowClick(tenant)}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <Checkbox checked={selectedTenants.includes(tenant.id)} onCheckedChange={() => toggleSelect(tenant.id)} />
                    </td>
                    <td className="p-4 text-sm font-mono text-muted-foreground">{tenant.id}</td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{tenant.templeName}</p>
                        <p className="text-xs text-muted-foreground">{tenant.directoryId}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      {(() => {
                        const sub = getSubscriptionByTenantId(tenant.id);
                        const plan = sub ? getPlanById(sub.planId) : null;
                        return (
                          <div>
                            <p className="text-sm font-medium text-foreground">{plan?.name || "Not Assigned"}</p>
                            <p className="text-xs text-muted-foreground capitalize">{sub?.billingCycle || "—"}</p>
                          </div>
                        );
                      })()}
                    </td>
                    <td className="p-4">
                      <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full capitalize", tenantStatusColors[tenant.tenantStatus])}>{tenant.tenantStatus}</span>
                    </td>
                    <td className="p-4 text-sm text-foreground">{tenant.region}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", tenant.healthScore >= 80 ? "bg-success" : tenant.healthScore >= 50 ? "bg-warning" : "bg-destructive")} style={{ width: `${tenant.healthScore}%` }} />
                        </div>
                        <span className={cn("text-xs font-medium", healthColors(tenant.healthScore))}>{tenant.healthScore}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-muted-foreground">{tenant.lastActivity}</td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover">
                          <DropdownMenuItem className="gap-2" onClick={() => handleRowClick(tenant)}><Eye className="h-4 w-4" />View Details</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2"><ExternalLink className="h-4 w-4" />Open Portal</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2"><Pause className="h-4 w-4" />Suspend</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AllTenants;
