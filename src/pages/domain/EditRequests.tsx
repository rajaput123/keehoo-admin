import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Check, X, MessageSquare, ArrowLeft, User, History, ArrowRight } from "lucide-react";
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
import { cn } from "@/lib/utils";

interface EditRequest {
  id: string;
  temple: string;
  field: string;
  requestedBy: string;
  requestedByEmail: string;
  requestedBySubmissions: number;
  requestedByApprovalRate: number;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
  currentValue: string;
  proposedValue: string;
}

const mockData: EditRequest[] = [
  { 
    id: "1", 
    temple: "Golden Temple", 
    field: "Contact Info", 
    requestedBy: "Harpreet S.", 
    requestedByEmail: "harpreet@example.com",
    requestedBySubmissions: 24,
    requestedByApprovalRate: 92,
    date: "Feb 6, 2026", 
    status: "Pending",
    currentValue: "+91 183 255 3954",
    proposedValue: "+91 183 255 3955 (Updated main line)",
  },
  { 
    id: "2", 
    temple: "Tirupati Balaji", 
    field: "Temple Timings", 
    requestedBy: "Priya P.", 
    requestedByEmail: "priya@example.com",
    requestedBySubmissions: 56,
    requestedByApprovalRate: 98,
    date: "Feb 5, 2026", 
    status: "Pending",
    currentValue: "6:00 AM - 9:00 PM",
    proposedValue: "3:00 AM - 12:00 AM (Extended for festival season)",
  },
  { 
    id: "3", 
    temple: "Kedarnath Temple", 
    field: "Description", 
    requestedBy: "Amit K.", 
    requestedByEmail: "amit@example.com",
    requestedBySubmissions: 12,
    requestedByApprovalRate: 75,
    date: "Feb 5, 2026", 
    status: "Approved",
    currentValue: "Ancient temple dedicated to Lord Shiva",
    proposedValue: "Ancient temple dedicated to Lord Shiva, part of Char Dham pilgrimage. Located at an altitude of 3,583m.",
  },
  { 
    id: "4", 
    temple: "Jagannath Temple", 
    field: "Address", 
    requestedBy: "Suresh M.", 
    requestedByEmail: "suresh@example.com",
    requestedBySubmissions: 8,
    requestedByApprovalRate: 62,
    date: "Feb 4, 2026", 
    status: "Rejected",
    currentValue: "Grand Road, Puri, Odisha 752001",
    proposedValue: "Bada Danda, Puri, Odisha 752001",
  },
  { 
    id: "5", 
    temple: "Somnath Temple", 
    field: "Deity", 
    requestedBy: "Ravi D.", 
    requestedByEmail: "ravi@example.com",
    requestedBySubmissions: 12,
    requestedByApprovalRate: 83,
    date: "Feb 4, 2026", 
    status: "Pending",
    currentValue: "Lord Shiva",
    proposedValue: "Lord Shiva (Jyotirlinga - First among 12)",
  },
  { 
    id: "6", 
    temple: "Kashi Vishwanath", 
    field: "History", 
    requestedBy: "Deepa M.", 
    requestedByEmail: "deepa@example.com",
    requestedBySubmissions: 42,
    requestedByApprovalRate: 95,
    date: "Feb 3, 2026", 
    status: "Approved",
    currentValue: "One of the most famous Hindu temples",
    proposedValue: "One of the most famous Hindu temples dedicated to Lord Shiva. The temple stands on the western bank of the holy river Ganga, and is one of the twelve Jyotirlingas.",
  },
];

const previousEdits = [
  { field: "Timings", date: "Jan 28, 2026", by: "Lakshmi R.", status: "Approved" },
  { field: "Photos", date: "Jan 15, 2026", by: "Amit K.", status: "Approved" },
  { field: "Contact", date: "Dec 20, 2025", by: "Priya P.", status: "Rejected" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-warning/10 text-warning",
  Approved: "bg-success/10 text-success",
  Rejected: "bg-destructive/10 text-destructive",
};




const EditRequests = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<EditRequest | null>(null);

  const filtered = statusFilter === "all"
    ? mockData
    : mockData.filter((s) => s.status === statusFilter);

  if (selectedRequest) {
    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedRequest(null)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">{selectedRequest.temple}</h1>
              <p className="text-sm text-muted-foreground">Edit Request: {selectedRequest.field}</p>
            </div>
            <span className={cn("text-xs font-medium px-3 py-1 rounded-full", statusColors[selectedRequest.status])}>
              {selectedRequest.status}
            </span>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left: Comparison View */}
            <div className="lg:col-span-3 space-y-4">
              {/* Two-Column Comparison */}
              <div className="bg-card rounded-lg border card-shadow overflow-hidden">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                  {/* Current Published Data */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                      <h3 className="font-semibold text-foreground text-sm">Current Published</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider">Field</label>
                        <p className="text-sm font-medium text-foreground mt-1">{selectedRequest.field}</p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider">Value</label>
                        <div className="mt-1 p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-foreground">{selectedRequest.currentValue}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Proposed Changes */}
                  <div className="p-5 bg-success/5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-2 w-2 rounded-full bg-success" />
                      <h3 className="font-semibold text-foreground text-sm">Proposed Changes</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider">Field</label>
                        <p className="text-sm font-medium text-foreground mt-1">{selectedRequest.field}</p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider">Value</label>
                        <div className="mt-1 p-3 bg-success/10 rounded-lg border border-success/20">
                          <p className="text-sm text-foreground">{selectedRequest.proposedValue}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diff Indicator */}
                <div className="px-5 py-3 bg-muted/30 border-t">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ArrowRight className="h-3 w-3" />
                    <span>
                      <span className="text-destructive line-through">{selectedRequest.currentValue.substring(0, 30)}...</span>
                      {" → "}
                      <span className="text-success">{selectedRequest.proposedValue.substring(0, 30)}...</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="bg-card rounded-lg border card-shadow p-5">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  Moderator Notes
                </h2>
                <textarea
                  className="w-full h-24 bg-muted/50 rounded-lg p-3 text-sm resize-none border-0 focus:ring-1 focus:ring-accent"
                  placeholder="Add notes for the contributor or internal team..."
                />
              </div>
            </div>

            {/* Right: Side Panel */}
            <div className="lg:col-span-2 space-y-4">
              {/* Contributor Details */}
              <div className="bg-card rounded-lg border card-shadow p-5">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Contributor Details
                </h2>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gold-light text-accent text-sm font-medium">
                      {selectedRequest.requestedBy.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{selectedRequest.requestedBy}</p>
                    <p className="text-xs text-muted-foreground">{selectedRequest.requestedByEmail}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-lg font-bold text-foreground">{selectedRequest.requestedBySubmissions}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Total Edits</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-lg font-bold text-success">{selectedRequest.requestedByApprovalRate}%</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Approval Rate</p>
                  </div>
                </div>
              </div>

              {/* Previous Edit History */}
              <div className="bg-card rounded-lg border card-shadow p-5">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <History className="h-4 w-4 text-muted-foreground" />
                  Previous Edits (This Temple)
                </h2>
                <div className="space-y-3">
                  {previousEdits.map((edit, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-foreground">{edit.field}</p>
                        <p className="text-xs text-muted-foreground">{edit.by} · {edit.date}</p>
                      </div>
                      <span className={cn(
                        "text-[10px] font-medium px-2 py-0.5 rounded-full",
                        edit.status === "Approved" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                      )}>
                        {edit.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>



            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 lg:left-56 bg-card border-t p-4 flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" className="gap-1.5">
              <MessageSquare className="h-4 w-4" />
              Request Clarification
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-destructive border-destructive/30">
              <X className="h-4 w-4" />
              Reject
            </Button>
            <Button size="sm" className="gap-1.5">
              <Check className="h-4 w-4" />
              Approve Changes
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-bold text-foreground mb-1">Edit Requests</h1>
        <p className="text-sm text-muted-foreground mb-6">Review proposed changes to published temples</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-9 text-sm bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search requests..." className="h-9 pl-9 text-sm bg-card" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Temple</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Field Changed</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Requested By</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Date</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                <th className="w-32 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((row) => (
                <tr 
                  key={row.id} 
                  className="hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={() => setSelectedRequest(row)}
                >
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{row.temple}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{row.field}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{row.requestedBy}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{row.date}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full", statusColors[row.status])}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded hover:bg-muted transition-colors" title="View">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </button>
                      {row.status === "Pending" && (
                        <>
                          <button className="p-1.5 rounded hover:bg-success/10 transition-colors" title="Approve">
                            <Check className="h-4 w-4 text-success" />
                          </button>
                          <button className="p-1.5 rounded hover:bg-destructive/10 transition-colors" title="Reject">
                            <X className="h-4 w-4 text-destructive" />
                          </button>
                          <button className="p-1.5 rounded hover:bg-muted transition-colors" title="Request Clarification">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </>
                      )}
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

export default EditRequests;
