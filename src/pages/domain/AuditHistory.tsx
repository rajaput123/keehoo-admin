import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Download, User, Clock, FileText, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface AuditEntry {
  id: string;
  action: string;
  entity: string;
  entityName: string;
  user: string;
  timestamp: string;
  status: "Success" | "Failed" | "Warning";
  details: string;
}

const mockData: AuditEntry[] = [
  { id: "1", action: "CREATE", entity: "Temple", entityName: "Sri Meenakshi Temple", user: "Lakshmi R.", timestamp: "Feb 6, 2026 14:32", status: "Success", details: "New temple submission created" },
  { id: "2", action: "UPDATE", entity: "Temple", entityName: "Golden Temple", user: "Harpreet S.", timestamp: "Feb 6, 2026 12:15", status: "Success", details: "Contact information updated" },
  { id: "3", action: "APPROVE", entity: "Submission", entityName: "Jagannath Temple", user: "Admin", timestamp: "Feb 6, 2026 11:45", status: "Success", details: "Submission approved and published" },
  { id: "4", action: "REJECT", entity: "Submission", entityName: "Duplicate Entry", user: "Admin", timestamp: "Feb 6, 2026 10:30", status: "Warning", details: "Rejected due to duplicate content" },
  { id: "5", action: "DELETE", entity: "Category", entityName: "Deprecated Category", user: "Admin", timestamp: "Feb 5, 2026 16:20", status: "Success", details: "Category removed from system" },
  { id: "6", action: "UPDATE", entity: "Contributor", entityName: "Amit Kumar", user: "Admin", timestamp: "Feb 5, 2026 14:00", status: "Success", details: "Role changed from Viewer to Editor" },
  { id: "7", action: "CREATE", entity: "Contributor", entityName: "Ravi Desai", user: "System", timestamp: "Feb 5, 2026 09:30", status: "Success", details: "New contributor invitation sent" },
  { id: "8", action: "UPDATE", entity: "Temple", entityName: "Kedarnath Temple", user: "Ananya S.", timestamp: "Feb 4, 2026 17:45", status: "Failed", details: "Update failed due to validation error" },
];

const actionColors: Record<string, string> = {
  CREATE: "bg-success/10 text-success",
  UPDATE: "bg-info/10 text-info",
  DELETE: "bg-destructive/10 text-destructive",
  APPROVE: "bg-success/10 text-success",
  REJECT: "bg-warning/10 text-warning",
};

const statusIcons: Record<string, React.ReactNode> = {
  Success: <CheckCircle className="h-4 w-4 text-success" />,
  Failed: <XCircle className="h-4 w-4 text-destructive" />,
  Warning: <AlertCircle className="h-4 w-4 text-warning" />,
};

const AuditHistory = () => {
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [entityFilter, setEntityFilter] = useState<string>("all");

  const filtered = mockData
    .filter((a) => actionFilter === "all" || a.action === actionFilter)
    .filter((a) => entityFilter === "all" || a.entity === entityFilter);

  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Audit History</h1>
            <p className="text-sm text-muted-foreground">Track all changes and actions in the system</p>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-32 h-9 text-sm bg-card">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="CREATE">Create</SelectItem>
            <SelectItem value="UPDATE">Update</SelectItem>
            <SelectItem value="DELETE">Delete</SelectItem>
            <SelectItem value="APPROVE">Approve</SelectItem>
            <SelectItem value="REJECT">Reject</SelectItem>
          </SelectContent>
        </Select>

        <Select value={entityFilter} onValueChange={setEntityFilter}>
          <SelectTrigger className="w-36 h-9 text-sm bg-card">
            <SelectValue placeholder="Entity" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Entities</SelectItem>
            <SelectItem value="Temple">Temple</SelectItem>
            <SelectItem value="Submission">Submission</SelectItem>
            <SelectItem value="Category">Category</SelectItem>
            <SelectItem value="Contributor">Contributor</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search audit logs..." className="h-9 pl-9 text-sm bg-card" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="w-10 px-4 py-3" />
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Action</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Entity</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">User</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Details</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    {statusIcons[row.status]}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full", actionColors[row.action])}>
                      {row.action}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{row.entityName}</p>
                      <p className="text-xs text-muted-foreground">{row.entity}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{row.user}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell max-w-xs truncate">
                    {row.details}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {row.timestamp}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditHistory;
