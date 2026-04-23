import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  Search,
  Filter,
  Download,
  Pause,
  Play,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Eye,
  MoreHorizontal,
  X,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import SearchableSelect from "@/components/SearchableSelect";

const suspendedTenants = [
  { id: "TEN-006", temple: "Problem Temple XYZ", type: "Soft", reason: "Payment Failure", suspendedDate: "2024-02-01", suspendedBy: "System", region: "Gujarat", plan: "Standard", daysActive: 8, notes: "3 failed payment attempts" },
  { id: "TEN-012", temple: "Fraudulent Temple", type: "Full", reason: "Policy Violation", suspendedDate: "2024-01-28", suspendedBy: "Admin - Priya Sharma", region: "Maharashtra", plan: "Premium", daysActive: 12, notes: "Multiple user complaints about fake bookings" },
  { id: "TEN-018", temple: "Inactive Temple ABC", type: "Soft", reason: "Inactivity", suspendedDate: "2024-01-20", suspendedBy: "System", region: "Karnataka", plan: "Free", daysActive: 20, notes: "No admin login for 90 days" },
  { id: "TEN-024", temple: "Legal Issue Temple", type: "Full", reason: "Legal Issue", suspendedDate: "2024-01-15", suspendedBy: "Admin - Rahul Verma", region: "Tamil Nadu", plan: "Premium", daysActive: 25, notes: "Pending court case regarding temple ownership" },
];

const complianceIssues = [
  { id: "TEN-034", temple: "New Temple ABC", issue: "KYC Pending", severity: "High", daysOpen: 15, region: "Kerala", plan: "Standard", assignedTo: "Priya Sharma" },
  { id: "TEN-045", temple: "Local Shiva Mandir", issue: "Bank Unverified", severity: "Medium", daysOpen: 8, region: "Rajasthan", plan: "Standard", assignedTo: "Rahul Verma" },
  { id: "TEN-056", temple: "Durga Temple Trust", issue: "Agreement Expired", severity: "High", daysOpen: 22, region: "West Bengal", plan: "Premium", assignedTo: "Deepak Singh" },
  { id: "TEN-067", temple: "Village Temple", issue: "Document Missing", severity: "Low", daysOpen: 5, region: "Gujarat", plan: "Free", assignedTo: "Unassigned" },
  { id: "TEN-078", temple: "Heritage Temple", issue: "Legal Verification Pending", severity: "High", daysOpen: 30, region: "Odisha", plan: "Premium", assignedTo: "Amit Patel" },
];

const suspensionReasons = [
  { value: "payment-failure", label: "Payment Failure" },
  { value: "fraud-risk", label: "Fraud Risk" },
  { value: "legal-issue", label: "Legal Issue" },
  { value: "policy-violation", label: "Policy Violation" },
  { value: "inactivity", label: "Inactivity" },
  { value: "manual", label: "Manual Action" },
];

const severityColors: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-muted text-muted-foreground",
};

const typeColors: Record<string, string> = {
  Soft: "bg-warning/10 text-warning",
  Full: "bg-destructive/10 text-destructive",
};

const SuspensionCompliance = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [reactivateOpen, setReactivateOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("suspended");

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
  };

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Inline Detail View
  if (selectedItem) {
    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-destructive/10">
                <Pause className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-lg font-semibold">{selectedItem.temple}</p>
                <p className="text-sm text-muted-foreground">{selectedItem.id}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 pb-4 mb-4 border-b border-border">
            <Button size="sm" className="gap-2 bg-success hover:bg-success/90">
              <Play className="h-4 w-4" />
              Reactivate
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              View Tenant
            </Button>
            <Button size="sm" variant="outline" className="gap-2 text-destructive hover:text-destructive">
              <XCircle className="h-4 w-4" />
              Close Tenant
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Type</label>
                <p className="text-sm font-medium">{selectedItem.type} Suspension</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Reason</label>
                <p className="text-sm font-medium">{selectedItem.reason}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Suspended Date</label>
                <p className="text-sm font-medium">{selectedItem.suspendedDate}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Suspended By</label>
                <p className="text-sm font-medium">{selectedItem.suspendedBy}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Region</label>
                <p className="text-sm font-medium">{selectedItem.region}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Days Suspended</label>
                <p className="text-sm font-medium text-destructive">{selectedItem.daysActive} days</p>
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Notes</label>
              <p className="text-sm mt-1 p-3 bg-muted/50 rounded-lg">{selectedItem.notes}</p>
            </div>
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
            <h1 className="text-2xl font-bold text-foreground mb-1">Suspension & Compliance</h1>
            <p className="text-sm text-muted-foreground">Handle suspensions and compliance issues</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />Export</Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Suspended", value: 28, icon: Pause, color: "text-destructive" },
            { label: "Soft Suspended", value: 18, icon: AlertTriangle, color: "text-warning" },
            { label: "Compliance Issues", value: 45, icon: ShieldAlert, color: "text-warning" },
            { label: "Resolved This Week", value: 12, icon: CheckCircle2, color: "text-success" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl p-4 glass-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={cn("p-2 rounded-xl bg-muted", stat.color)}>
                  <stat.icon className="h-4 w-4" />
                </div>
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="suspended" className="gap-2"><Pause className="h-4 w-4" />Suspended Tenants</TabsTrigger>
            <TabsTrigger value="compliance" className="gap-2"><ShieldAlert className="h-4 w-4" />Compliance Issues</TabsTrigger>
          </TabsList>

          <TabsContent value="suspended">
            <div className="glass-card rounded-2xl p-4 mb-6 glass-shadow">
              <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search suspended tenants..." className="pl-9" />
                </div>
                <Select>
                  <SelectTrigger className="w-[140px]"><SelectValue placeholder="Type" /></SelectTrigger>
                  <SelectContent className="bg-popover"><SelectItem value="all">All Types</SelectItem><SelectItem value="soft">Soft</SelectItem><SelectItem value="full">Full</SelectItem></SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[160px]"><SelectValue placeholder="Reason" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">All Reasons</SelectItem>
                    {suspensionReasons.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
              </div>
            </div>

            {selectedItems.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-6 py-3 rounded-full shadow-xl flex items-center gap-4">
                <span className="text-sm font-medium">{selectedItems.length} selected</span>
                <div className="h-4 w-px bg-background/20" />
                <Button size="sm" variant="ghost" className="text-background hover:text-background hover:bg-background/10 gap-2"><Play className="h-4 w-4" />Reactivate</Button>
                <Button size="sm" variant="ghost" className="text-background hover:text-background hover:bg-background/10 gap-2"><Download className="h-4 w-4" />Export</Button>
                <button onClick={() => setSelectedItems([])} className="ml-2 p-1 hover:bg-background/10 rounded"><X className="h-4 w-4" /></button>
              </motion.div>
            )}

            <div className="glass-card rounded-2xl glass-shadow overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/30">
                    <th className="p-4 text-left">
                      <Checkbox checked={selectedItems.length === suspendedTenants.length} onCheckedChange={() => setSelectedItems(selectedItems.length === suspendedTenants.length ? [] : suspendedTenants.map(t => t.id))} />
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Temple</th>
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Type</th>
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Reason</th>
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Suspended</th>
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Region</th>
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Days</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {suspendedTenants.map((tenant, i) => (
                    <motion.tr
                      key={tenant.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => handleRowClick(tenant)}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <Checkbox checked={selectedItems.includes(tenant.id)} onCheckedChange={() => toggleSelect(tenant.id)} />
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium">{tenant.temple}</p>
                        <p className="text-xs text-muted-foreground">{tenant.id} · {tenant.plan}</p>
                      </td>
                      <td className="p-4"><Badge className={cn("text-xs", typeColors[tenant.type])}>{tenant.type}</Badge></td>
                      <td className="p-4 text-sm">{tenant.reason}</td>
                      <td className="p-4">
                        <p className="text-sm">{tenant.suspendedDate}</p>
                        <p className="text-xs text-muted-foreground">{tenant.suspendedBy}</p>
                      </td>
                      <td className="p-4 text-sm">{tenant.region}</td>
                      <td className="p-4"><span className="text-sm font-medium">{tenant.daysActive}d</span></td>
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => handleRowClick(tenant)}><Eye className="h-4 w-4" />View Details</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-success" onClick={() => setReactivateOpen(true)}><Play className="h-4 w-4" />Reactivate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-destructive"><XCircle className="h-4 w-4" />Close Tenant</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="compliance">
            <div className="glass-card rounded-2xl p-4 mb-6 glass-shadow">
              <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search compliance issues..." className="pl-9" />
                </div>
                <Select>
                  <SelectTrigger className="w-[140px]"><SelectValue placeholder="Severity" /></SelectTrigger>
                  <SelectContent className="bg-popover"><SelectItem value="all">All</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="low">Low</SelectItem></SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[160px]"><SelectValue placeholder="Issue Type" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">All Issues</SelectItem><SelectItem value="kyc">KYC Pending</SelectItem><SelectItem value="bank">Bank Unverified</SelectItem><SelectItem value="agreement">Agreement Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="glass-card rounded-2xl glass-shadow overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/30">
                    <th className="p-4 text-left"><Checkbox /></th>
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Temple</th>
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Issue</th>
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Severity</th>
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Days Open</th>
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Region</th>
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Assigned</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {complianceIssues.map((issue, i) => (
                    <motion.tr
                      key={issue.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => handleRowClick(issue)}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <td className="p-4" onClick={(e) => e.stopPropagation()}><Checkbox /></td>
                      <td className="p-4">
                        <p className="text-sm font-medium">{issue.temple}</p>
                        <p className="text-xs text-muted-foreground">{issue.id} · {issue.plan}</p>
                      </td>
                      <td className="p-4 text-sm">{issue.issue}</td>
                      <td className="p-4"><Badge className={cn("text-xs", severityColors[issue.severity])}>{issue.severity}</Badge></td>
                      <td className="p-4">
                        <span className={cn("text-sm font-medium", issue.daysOpen > 14 ? "text-destructive" : issue.daysOpen > 7 ? "text-warning" : "text-foreground")}>{issue.daysOpen}d</span>
                      </td>
                      <td className="p-4 text-sm">{issue.region}</td>
                      <td className="p-4 text-sm">{issue.assignedTo}</td>
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-popover">
                            <DropdownMenuItem className="gap-2" onClick={() => handleRowClick(issue)}><Eye className="h-4 w-4" />View Details</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-success"><CheckCircle2 className="h-4 w-4" />Mark Resolved</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-destructive"><Pause className="h-4 w-4" />Suspend Tenant</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Reactivate Dialog (keeping as dialog since it's an action modal, not a detail view) */}
      <Dialog open={reactivateOpen} onOpenChange={setReactivateOpen}>
        <DialogContent className="max-w-md bg-card">
          <DialogHeader><DialogTitle>Reactivate Tenant</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Reason for Reactivation</label>
              <Textarea className="mt-1" placeholder="Explain why this tenant is being reactivated..." rows={3} />
            </div>
            <div className="p-3 bg-muted/50 rounded-lg text-sm">
              <p className="font-medium mb-1">This action will:</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Restore full tenant access</li>
                <li>• Re-enable all disabled features</li>
                <li>• Notify tenant admins via email</li>
                <li>• Create an audit log entry</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReactivateOpen(false)}>Cancel</Button>
            <Button onClick={() => setReactivateOpen(false)} className="gap-2"><Play className="h-4 w-4" />Reactivate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuspensionCompliance;
