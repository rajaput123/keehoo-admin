import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, MoreHorizontal, Trophy, Star, TrendingUp, ArrowLeft, History, FileText, Check, X, Download, Upload, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";

interface Contributor {
  id: string;
  name: string;
  email: string;
  role: "Editor" | "Viewer" | "Moderator";
  totalSubmissions: number;
  approvedCount: number;
  rejectedCount: number;
  editRequests: number;
  rewardPoints: number;
  status: "Active" | "Inactive" | "Pending";
  joinedDate: string;
  lastActive: string;
}

interface SubmissionHistory {
  id: string;
  temple: string;
  type: "New" | "Edit";
  date: string;
  status: "Approved" | "Rejected" | "Pending";
}

const mockData: Contributor[] = [
  { id: "1", name: "Priya Patel", email: "priya@example.com", role: "Moderator", totalSubmissions: 56, approvedCount: 52, rejectedCount: 2, editRequests: 34, rewardPoints: 2340, status: "Active", joinedDate: "Dec 2025", lastActive: "2 hours ago" },
  { id: "2", name: "Deepa Murthy", email: "deepa@example.com", role: "Moderator", totalSubmissions: 42, approvedCount: 40, rejectedCount: 1, editRequests: 28, rewardPoints: 1890, status: "Active", joinedDate: "Sep 2025", lastActive: "1 hour ago" },
  { id: "3", name: "Lakshmi Rajan", email: "lakshmi@example.com", role: "Editor", totalSubmissions: 31, approvedCount: 29, rejectedCount: 1, editRequests: 15, rewardPoints: 1520, status: "Active", joinedDate: "Oct 2025", lastActive: "3 hours ago" },
  { id: "4", name: "Harpreet Singh", email: "harpreet@example.com", role: "Editor", totalSubmissions: 24, approvedCount: 22, rejectedCount: 1, editRequests: 12, rewardPoints: 1180, status: "Active", joinedDate: "Jan 2026", lastActive: "5 hours ago" },
  { id: "5", name: "Amit Kumar", email: "amit@example.com", role: "Editor", totalSubmissions: 12, approvedCount: 9, rejectedCount: 2, editRequests: 8, rewardPoints: 680, status: "Active", joinedDate: "Jan 2026", lastActive: "1 day ago" },
  { id: "6", name: "Suresh Menon", email: "suresh@example.com", role: "Viewer", totalSubmissions: 8, approvedCount: 5, rejectedCount: 2, editRequests: 3, rewardPoints: 320, status: "Inactive", joinedDate: "Nov 2025", lastActive: "2 weeks ago" },
  { id: "7", name: "Ravi Desai", email: "ravi@example.com", role: "Editor", totalSubmissions: 12, approvedCount: 10, rejectedCount: 1, editRequests: 6, rewardPoints: 580, status: "Active", joinedDate: "Feb 2026", lastActive: "6 hours ago" },
  { id: "8", name: "Ananya Sharma", email: "ananya@example.com", role: "Viewer", totalSubmissions: 3, approvedCount: 2, rejectedCount: 0, editRequests: 1, rewardPoints: 150, status: "Pending", joinedDate: "Feb 2026", lastActive: "Just now" },
];

const submissionHistory: SubmissionHistory[] = [
  { id: "1", temple: "Sri Meenakshi Temple", type: "New", date: "Feb 6, 2026", status: "Approved" },
  { id: "2", temple: "Golden Temple", type: "Edit", date: "Feb 5, 2026", status: "Approved" },
  { id: "3", temple: "Kedarnath Temple", type: "Edit", date: "Feb 4, 2026", status: "Pending" },
  { id: "4", temple: "Jagannath Temple", type: "New", date: "Feb 3, 2026", status: "Approved" },
  { id: "5", temple: "Unknown Temple", type: "New", date: "Feb 2, 2026", status: "Rejected" },
  { id: "6", temple: "Somnath Temple", type: "Edit", date: "Feb 1, 2026", status: "Approved" },
];

const statusColors: Record<string, string> = {
  Active: "bg-success/10 text-success",
  Inactive: "bg-muted text-muted-foreground",
  Pending: "bg-warning/10 text-warning",
};

const roleColors: Record<string, string> = {
  Editor: "bg-info/10 text-info",
  Viewer: "bg-muted text-muted-foreground",
  Moderator: "bg-accent/10 text-accent",
};

const historyStatusColors: Record<string, string> = {
  Approved: "bg-success/10 text-success",
  Rejected: "bg-destructive/10 text-destructive",
  Pending: "bg-warning/10 text-warning",
};

const Contributors = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const filtered = mockData
    .filter((c) => statusFilter === "all" || c.status === statusFilter)
    .filter((c) => roleFilter === "all" || c.role === roleFilter);

  const getApprovalRate = (approved: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((approved / total) * 100);
  };

  const getRank = (points: number) => {
    if (points >= 2000) return { label: "Gold", color: "text-accent" };
    if (points >= 1000) return { label: "Silver", color: "text-muted-foreground" };
    if (points >= 500) return { label: "Bronze", color: "text-warning" };
    return { label: "Starter", color: "text-info" };
  };

  if (selectedContributor) {
    const rank = getRank(selectedContributor.rewardPoints);
    const approvalRate = getApprovalRate(selectedContributor.approvedCount, selectedContributor.totalSubmissions);

    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedContributor(null)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1 flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gold-light text-accent text-lg font-medium">
                  {selectedContributor.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-foreground">{selectedContributor.name}</h1>
                <p className="text-sm text-muted-foreground">{selectedContributor.email}</p>
              </div>
            </div>
            <span className={cn("text-xs font-medium px-3 py-1 rounded-full", roleColors[selectedContributor.role])}>
              {selectedContributor.role}
            </span>
            <span className={cn("text-xs font-medium px-3 py-1 rounded-full", statusColors[selectedContributor.status])}>
              {selectedContributor.status}
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: Stats */}
            <div className="lg:col-span-2 space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card rounded-lg border card-shadow p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{selectedContributor.totalSubmissions}</p>
                  <p className="text-xs text-muted-foreground">Total Submissions</p>
                </div>
                <div className="bg-card rounded-lg border card-shadow p-4 text-center">
                  <p className="text-2xl font-bold text-success">{approvalRate}%</p>
                  <p className="text-xs text-muted-foreground">Approval Rate</p>
                </div>
                <div className="bg-card rounded-lg border card-shadow p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{selectedContributor.editRequests}</p>
                  <p className="text-xs text-muted-foreground">Edit Requests</p>
                </div>
                <div className="bg-card rounded-lg border card-shadow p-4 text-center">
                  <p className="text-2xl font-bold text-accent">{selectedContributor.rewardPoints.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Reward Points</p>
                </div>
              </div>

              {/* Submission History */}
              <div className="bg-card rounded-lg border card-shadow">
                <div className="px-5 py-4 border-b flex items-center justify-between">
                  <h2 className="font-semibold text-foreground flex items-center gap-2">
                    <History className="h-4 w-4 text-muted-foreground" />
                    Submission History
                  </h2>
                </div>
                <div className="divide-y">
                  {submissionHistory.map((item) => (
                    <div key={item.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-1.5 rounded",
                          item.status === "Approved" ? "bg-success/10" : item.status === "Rejected" ? "bg-destructive/10" : "bg-warning/10"
                        )}>
                          {item.status === "Approved" ? <Check className="h-4 w-4 text-success" /> : 
                           item.status === "Rejected" ? <X className="h-4 w-4 text-destructive" /> :
                           <FileText className="h-4 w-4 text-warning" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.temple}</p>
                          <p className="text-xs text-muted-foreground">{item.type} · {item.date}</p>
                        </div>
                      </div>
                      <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", historyStatusColors[item.status])}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Gamification */}
            <div className="space-y-4">
              {/* Rank Card */}
              <div className="bg-card rounded-lg border card-shadow p-5">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-accent" />
                  Contributor Rank
                </h2>
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-light mb-3">
                    <Star className={cn("h-8 w-8", rank.color)} />
                  </div>
                  <p className={cn("text-xl font-bold", rank.color)}>{rank.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{selectedContributor.rewardPoints.toLocaleString()} points</p>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Next rank</span>
                    <span className="font-medium text-foreground">
                      {rank.label === "Starter" ? "Bronze (500 pts)" :
                       rank.label === "Bronze" ? "Silver (1000 pts)" :
                       rank.label === "Silver" ? "Gold (2000 pts)" : "Max Rank"}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ 
                        width: `${rank.label === "Gold" ? 100 : 
                                rank.label === "Silver" ? ((selectedContributor.rewardPoints - 1000) / 1000) * 100 :
                                rank.label === "Bronze" ? ((selectedContributor.rewardPoints - 500) / 500) * 100 :
                                (selectedContributor.rewardPoints / 500) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Activity Summary */}
              <div className="bg-card rounded-lg border card-shadow p-5">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  Activity Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Joined</span>
                    <span className="text-sm font-medium text-foreground">{selectedContributor.joinedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Active</span>
                    <span className="text-sm font-medium text-foreground">{selectedContributor.lastActive}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Approved</span>
                    <span className="text-sm font-medium text-success">{selectedContributor.approvedCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rejected</span>
                    <span className="text-sm font-medium text-destructive">{selectedContributor.rejectedCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Contributors</h1>
            <p className="text-sm text-muted-foreground">Manage and reward community contributors</p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  Bulk Actions
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover">
                <DropdownMenuItem className="gap-2 text-sm" onClick={() => setIsImportOpen(true)}>
                  <Upload className="h-4 w-4" />
                  Bulk Invite
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-sm">
                  <Download className="h-4 w-4" />
                  Export All
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={() => setIsInviteOpen(true)}>
              <Plus className="h-3.5 w-3.5" />
              Invite Contributor
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Invite Contributor Dialog */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent className="sm:max-w-lg bg-card max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Invite Contributor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="contributor-name">Full Name</Label>
              <Input id="contributor-name" placeholder="Enter contributor's name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contributor-email">Email Address</Label>
              <Input id="contributor-email" type="email" placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contributor-role">Role</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="Viewer">Viewer</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Moderator">Moderator</SelectItem>
                  <DropdownMenuSeparator />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="w-full text-left px-2 py-1.5 text-sm text-primary hover:bg-muted rounded flex items-center gap-2"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add New Role
                  </button>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Message (Optional)</Label>
              <Textarea placeholder="Add a personal message to the invitation..." rows={2} />
            </div>

            {/* Custom Fields Section */}
            <CustomFieldsSection 
              fields={customFields} 
              onFieldsChange={setCustomFields} 
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsInviteOpen(false)}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Import Dialog */}
      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
        <DialogContent className="sm:max-w-lg bg-card">
          <DialogHeader>
            <DialogTitle>Bulk Invite Contributors</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-2">Drag & drop your CSV file with email addresses</p>
              <p className="text-xs text-muted-foreground mb-4">or</p>
              <Button variant="outline" size="sm">Browse Files</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">Need a template?</span>
              <Button variant="link" size="sm" className="gap-1.5 h-auto p-0">
                <Download className="h-3.5 w-3.5" />
                Download Template
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsImportOpen(false)}>Send Invitations</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32 h-9 text-sm bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-32 h-9 text-sm bg-card">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Viewer">Viewer</SelectItem>
            <SelectItem value="Moderator">Moderator</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search contributors..." className="h-9 pl-9 text-sm bg-card" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Contributor</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Role</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Submissions</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Approved %</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Rejected %</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Edit Requests</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Points</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Status</th>
                <th className="w-10 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((row) => {
                const approvalRate = getApprovalRate(row.approvedCount, row.totalSubmissions);
                const rejectionRate = getApprovalRate(row.rejectedCount, row.totalSubmissions);
                return (
                  <tr 
                    key={row.id} 
                    className="hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => setSelectedContributor(row)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gold-light text-accent text-xs font-medium">
                            {row.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-sm font-medium text-foreground">{row.name}</span>
                          <p className="text-xs text-muted-foreground hidden lg:block">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full", roleColors[row.role])}>
                        {row.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground hidden md:table-cell">{row.totalSubmissions}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm font-medium text-success">{approvalRate}%</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm font-medium text-destructive">{rejectionRate}%</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{row.editRequests}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Trophy className="h-3.5 w-3.5 text-accent" />
                        <span className="text-sm font-medium text-foreground">{row.rewardPoints.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full", statusColors[row.status])}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1 rounded hover:bg-muted transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contributors;
