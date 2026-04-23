import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Download,
  Calendar,
  User,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Eye,
  ArrowLeft
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import SearchableSelect from "@/components/SearchableSelect";

const auditLogs = [
  { id: "LOG-10521", caseId: "REG-4521", templeName: "Sri Lakshmi Narasimha Temple", previousStatus: "Submitted", newStatus: "Under Review", action: "Status Changed", user: "Reviewer A", role: "Reviewer", timestamp: "2024-01-15 09:35:22", region: "Tamil Nadu", notes: "Initial review started" },
  { id: "LOG-10520", caseId: "REG-4520", templeName: "Kashi Vishwanath Mandir", previousStatus: "Under Review", newStatus: "Verification Pending", action: "Moved to Verification", user: "Reviewer A", role: "Reviewer", timestamp: "2024-01-15 09:30:15", region: "Uttar Pradesh", notes: "Documents require verification" },
  { id: "LOG-10519", caseId: "REG-4518", templeName: "Tirupati Balaji Temple", previousStatus: "Verification Pending", newStatus: "Approved", action: "Approved", user: "Approver C", role: "Approver", timestamp: "2024-01-15 09:25:48", region: "Andhra Pradesh", notes: "All documents verified, ready for tenant creation" },
  { id: "LOG-10518", caseId: "REG-4517", templeName: "Shirdi Sai Sansthan", previousStatus: "Approved", newStatus: "Tenant Created", action: "Tenant Created", user: "System", role: "System", timestamp: "2024-01-15 09:20:33", region: "Maharashtra", notes: "Tenant ID: TEN-4999 created automatically" },
  { id: "LOG-10517", caseId: "REG-4515", templeName: "Unknown Temple", previousStatus: "Under Review", newStatus: "Rejected", action: "Rejected", user: "Reviewer B", role: "Reviewer", timestamp: "2024-01-15 09:15:10", region: "Delhi", notes: "Invalid trust registration documents" },
  { id: "LOG-10516", caseId: "REG-4514", templeName: "ISKCON Mumbai", previousStatus: "Tenant Created", newStatus: "Activated", action: "Activated", user: "Admin A", role: "Super Admin", timestamp: "2024-01-15 09:10:05", region: "Maharashtra", notes: "Full SaaS access enabled" },
  { id: "LOG-10515", caseId: "VER-1019", templeName: "Meenakshi Temple", previousStatus: "Pending", newStatus: "Verified", action: "Document Verified", user: "Verifier A", role: "Verifier", timestamp: "2024-01-15 09:05:22", region: "Tamil Nadu", notes: "Trust registration certificate verified" },
];

const actionColors: Record<string, string> = {
  "Status Changed": "bg-muted text-muted-foreground",
  "Moved to Verification": "bg-info/10 text-info",
  "Approved": "bg-success/10 text-success",
  "Rejected": "bg-destructive/10 text-destructive",
  "Tenant Created": "bg-primary/10 text-primary",
  "Activated": "bg-emerald-100 text-emerald-700",
  "Document Verified": "bg-cyan-100 text-cyan-700",
};

const roleColors: Record<string, string> = {
  "Reviewer": "bg-info/10 text-info",
  "Verifier": "bg-purple-100 text-purple-700",
  "Approver": "bg-success/10 text-success",
  "Super Admin": "bg-primary/10 text-primary",
  "System": "bg-muted text-muted-foreground",
};

const ApprovalLogs = () => {
  const [selectedLog, setSelectedLog] = useState<typeof auditLogs[0] | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleRowClick = (log: typeof auditLogs[0]) => {
    setSelectedLog(log);
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(prev => 
      prev.length === auditLogs.length ? [] : auditLogs.map(l => l.id)
    );
  };

  // Inline Detail View
  if (selectedLog) {
    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedLog(null)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Audit Log Details</h1>
              <p className="text-sm text-muted-foreground">{selectedLog.id} · {selectedLog.caseId}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-3">
                <p className="text-xs text-muted-foreground">Log ID</p>
                <p className="font-mono text-sm">{selectedLog.id}</p>
              </div>
              <div className="glass-card rounded-xl p-3">
                <p className="text-xs text-muted-foreground">Case ID</p>
                <p className="font-mono text-sm">{selectedLog.caseId}</p>
              </div>
            </div>

            <div className="glass-card rounded-xl p-3">
              <p className="text-xs text-muted-foreground">Temple</p>
              <p className="font-medium">{selectedLog.templeName}</p>
              <p className="text-sm text-muted-foreground">{selectedLog.region}</p>
            </div>

            <div className="p-4 rounded-xl bg-muted/50">
              <p className="text-xs text-muted-foreground mb-2">Status Transition</p>
              <div className="flex items-center gap-3">
                <Badge variant="outline">{selectedLog.previousStatus}</Badge>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <Badge className={actionColors[selectedLog.action]}>{selectedLog.newStatus}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-3">
                <p className="text-xs text-muted-foreground">Action</p>
                <Badge className={actionColors[selectedLog.action]} variant="secondary">
                  {selectedLog.action}
                </Badge>
              </div>
              <div className="glass-card rounded-xl p-3">
                <p className="text-xs text-muted-foreground">Performed By</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium">{selectedLog.user}</span>
                  <Badge className={`${roleColors[selectedLog.role]} text-xs`} variant="secondary">
                    {selectedLog.role}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-3">
              <p className="text-xs text-muted-foreground">Timestamp</p>
              <p className="text-sm">{selectedLog.timestamp}</p>
            </div>

            <div className="glass-card rounded-xl p-3">
              <p className="text-xs text-muted-foreground">Notes</p>
              <p className="text-sm">{selectedLog.notes}</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Approval Logs</h1>
          <p className="text-muted-foreground text-sm mt-1">Complete audit trail of all onboarding actions</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: "Total Logs", count: "12,847", icon: FileText, color: "text-muted-foreground", bg: "bg-muted" },
          { label: "Approvals", count: "3,421", icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
          { label: "Rejections", count: "456", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Active Users", count: "28", icon: User, color: "text-info", bg: "bg-info/10" },
          { label: "Today's Actions", count: "847", icon: Clock, color: "text-warning", bg: "bg-warning/10" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-4 glass-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${item.bg}`}>
                <item.icon className={`h-4 w-4 ${item.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{item.count}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card rounded-2xl glass-shadow p-4 mb-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by case ID, temple, or user..." className="pl-9" />
          </div>
          <SearchableSelect
            options={[
              { value: "all", label: "All Actions" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
              { value: "verification", label: "Verification" },
              { value: "tenant", label: "Tenant Created" },
              { value: "activated", label: "Activated" },
            ]}
            placeholder="Action Type"
            onValueChange={() => {}}
            className="w-[150px]"
          />
          <SearchableSelect
            options={[
              { value: "all", label: "All Roles" },
              { value: "reviewer", label: "Reviewer" },
              { value: "verifier", label: "Verifier" },
              { value: "approver", label: "Approver" },
              { value: "admin", label: "Super Admin" },
            ]}
            placeholder="User Role"
            onValueChange={() => {}}
            className="w-[150px]"
          />
          <SearchableSelect
            options={[
              { value: "all", label: "All Regions" },
              { value: "tn", label: "Tamil Nadu" },
              { value: "up", label: "Uttar Pradesh" },
              { value: "mh", label: "Maharashtra" },
            ]}
            placeholder="Region"
            onValueChange={() => {}}
            onAddNew={() => alert("Add new region")}
            addNewLabel="Add Region"
            className="w-[150px]"
          />
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-3 mb-4 flex items-center justify-between"
        >
          <span className="text-sm font-medium">{selectedItems.length} item(s) selected</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Selected
            </Button>
          </div>
        </motion.div>
      )}

      {/* Logs Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card rounded-2xl glass-shadow overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedItems.length === auditLogs.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[100px]">Log ID</TableHead>
              <TableHead className="w-[100px]">Case ID</TableHead>
              <TableHead>Temple</TableHead>
              <TableHead>Status Change</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow 
                key={log.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(log)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedItems.includes(log.id)}
                    onCheckedChange={() => toggleSelectItem(log.id)}
                  />
                </TableCell>
                <TableCell className="font-mono text-xs">{log.id}</TableCell>
                <TableCell className="font-mono text-xs">{log.caseId}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{log.templeName}</p>
                    <p className="text-xs text-muted-foreground">{log.region}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{log.previousStatus}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{log.newStatus}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={actionColors[log.action]} variant="secondary">
                    {log.action}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{log.user}</span>
                    <Badge className={`${roleColors[log.role]} text-xs`} variant="secondary">
                      {log.role}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{log.timestamp}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleRowClick(log)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">Showing 1-10 of 12,847 logs</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalLogs;
