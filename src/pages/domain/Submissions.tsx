import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, Eye, Check, X, MapPin, User, Clock, Image, FileText, ArrowLeft, Copy, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Submission {
  id: string;
  temple: string;
  city: string;
  state: string;
  submittedBy: string;
  submitterEmail: string;
  submitterSubmissions: number;
  submitterApprovalRate: number;
  source: "Devotee" | "Scraped" | "Platform";
  date: string;
  status: "Draft" | "Submitted" | "Under Review" | "Approved" | "Published" | "Rejected";
  
  description?: string;
  address?: string;
  timings?: string;
  deity?: string;
  images?: string[];
}

const mockData: Submission[] = [
  { id: "1", temple: "Sri Meenakshi Temple", city: "Madurai", state: "TN", submittedBy: "Lakshmi R.", submitterEmail: "lakshmi@example.com", submitterSubmissions: 15, submitterApprovalRate: 93, source: "Devotee", date: "Feb 6, 2026", status: "Submitted", description: "Ancient Dravidian temple dedicated to Goddess Meenakshi", address: "Madurai, Tamil Nadu 625001", timings: "5:00 AM - 12:30 PM, 4:00 PM - 10:00 PM", deity: "Goddess Meenakshi" },
  { id: "2", temple: "Jagannath Temple", city: "Puri", state: "OD", submittedBy: "Suresh M.", submitterEmail: "suresh@example.com", submitterSubmissions: 8, submitterApprovalRate: 75, source: "Platform", date: "Feb 5, 2026", status: "Approved", description: "Famous temple dedicated to Lord Jagannath", deity: "Lord Jagannath" },
  { id: "3", temple: "Unknown Temple", city: "Varanasi", state: "UP", submittedBy: "Amit K.", submitterEmail: "amit@example.com", submitterSubmissions: 2, submitterApprovalRate: 50, source: "Scraped", date: "Feb 5, 2026", status: "Rejected", description: "Temple data scraped from web" },
  { id: "4", temple: "Tirupati Balaji", city: "Tirupati", state: "AP", submittedBy: "Priya P.", submitterEmail: "priya@example.com", submitterSubmissions: 56, submitterApprovalRate: 98, source: "Devotee", date: "Feb 4, 2026", status: "Under Review", description: "One of the most visited religious sites in the world", deity: "Lord Venkateswara" },
  { id: "5", temple: "Golden Temple", city: "Amritsar", state: "PB", submittedBy: "Harpreet S.", submitterEmail: "harpreet@example.com", submitterSubmissions: 24, submitterApprovalRate: 92, source: "Devotee", date: "Feb 4, 2026", status: "Submitted" },
  { id: "6", temple: "Somnath Temple", city: "Gir Somnath", state: "GJ", submittedBy: "Ravi D.", submitterEmail: "ravi@example.com", submitterSubmissions: 12, submitterApprovalRate: 83, source: "Platform", date: "Feb 3, 2026", status: "Published" },
  { id: "7", temple: "Kedarnath Temple", city: "Rudraprayag", state: "UK", submittedBy: "Ananya S.", submitterEmail: "ananya@example.com", submitterSubmissions: 5, submitterApprovalRate: 60, source: "Devotee", date: "Feb 3, 2026", status: "Submitted" },
  { id: "8", temple: "Ramanathaswamy", city: "Rameswaram", state: "TN", submittedBy: "Deepa M.", submitterEmail: "deepa@example.com", submitterSubmissions: 42, submitterApprovalRate: 95, source: "Devotee", date: "Feb 2, 2026", status: "Published" },
];

const duplicateSuggestions = [
  { name: "Sri Meenakshi Amman Temple", location: "Madurai, TN", similarity: 92 },
  { name: "Meenakshi Sundareswarar Temple", location: "Madurai, TN", similarity: 88 },
];

const statusColors: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Submitted: "bg-info/10 text-info",
  "Under Review": "bg-warning/10 text-warning",
  Approved: "bg-success/10 text-success",
  Published: "bg-primary/10 text-primary",
  Rejected: "bg-destructive/10 text-destructive",
};

const sourceColors: Record<string, string> = {
  Devotee: "bg-success/10 text-success",
  Scraped: "bg-warning/10 text-warning",
  Platform: "bg-info/10 text-info",
};




const Submissions = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const filtered = mockData
    .filter((s) => statusFilter === "all" || s.status === statusFilter)
    .filter((s) => sourceFilter === "all" || s.source === sourceFilter)
;

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((s) => s.id)));
    }
  };

  const toggleOne = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  if (selectedSubmission) {
    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedSubmission(null)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">{selectedSubmission.temple}</h1>
              <p className="text-sm text-muted-foreground">{selectedSubmission.city}, {selectedSubmission.state}</p>
            </div>
            <span className={cn("text-xs font-medium px-3 py-1 rounded-full", statusColors[selectedSubmission.status])}>
              {selectedSubmission.status}
            </span>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left: Temple Details */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-card rounded-lg border card-shadow p-5">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Temple Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider">Temple Name</label>
                    <p className="text-sm font-medium text-foreground mt-1">{selectedSubmission.temple}</p>
                  </div>
                  {selectedSubmission.deity && (
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider">Primary Deity</label>
                      <p className="text-sm text-foreground mt-1">{selectedSubmission.deity}</p>
                    </div>
                  )}
                  {selectedSubmission.description && (
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider">Description</label>
                      <p className="text-sm text-foreground mt-1">{selectedSubmission.description}</p>
                    </div>
                  )}
                  {selectedSubmission.timings && (
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider">Timings</label>
                      <p className="text-sm text-foreground mt-1">{selectedSubmission.timings}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-card rounded-lg border card-shadow p-5">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Location
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider">Address</label>
                    <p className="text-sm text-foreground mt-1">{selectedSubmission.address || `${selectedSubmission.city}, ${selectedSubmission.state}`}</p>
                  </div>
                  {/* Map Placeholder */}
                  <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Map View</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border card-shadow p-5">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Image className="h-4 w-4 text-muted-foreground" />
                  Uploaded Images
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <Image className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="lg:col-span-2 space-y-4">
              {/* Contributor Profile */}
              <div className="bg-card rounded-lg border card-shadow p-5">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Contributor Profile
                </h2>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gold-light text-accent text-sm font-medium">
                      {selectedSubmission.submittedBy.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{selectedSubmission.submittedBy}</p>
                    <p className="text-xs text-muted-foreground">{selectedSubmission.submitterEmail}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-lg font-bold text-foreground">{selectedSubmission.submitterSubmissions}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Submissions</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-lg font-bold text-success">{selectedSubmission.submitterApprovalRate}%</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Approval Rate</p>
                  </div>
                </div>
              </div>

              {/* Duplicate Suggestions */}
              <div className="bg-card rounded-lg border card-shadow p-5">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Copy className="h-4 w-4 text-warning" />
                  Duplicate Suggestions
                </h2>
                {duplicateSuggestions.length > 0 ? (
                  <div className="space-y-3">
                    {duplicateSuggestions.map((dup, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-warning/5 rounded-lg border border-warning/20">
                        <div>
                          <p className="text-sm font-medium text-foreground">{dup.name}</p>
                          <p className="text-xs text-muted-foreground">{dup.location}</p>
                        </div>
                        <span className="text-xs font-medium text-warning">{dup.similarity}% match</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No duplicates detected</p>
                )}
              </div>




              {/* Internal Notes */}
              <div className="bg-card rounded-lg border card-shadow p-5">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  Internal Notes
                </h2>
                <textarea
                  className="w-full h-24 bg-muted/50 rounded-lg p-3 text-sm resize-none border-0 focus:ring-1 focus:ring-accent"
                  placeholder="Add internal notes for moderators..."
                />
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 lg:left-56 bg-card border-t p-4 flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" className="gap-1.5">
              <MessageSquare className="h-4 w-4" />
              Request Edit
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-warning border-warning/30">
              <Copy className="h-4 w-4" />
              Mark Duplicate
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-destructive border-destructive/30">
              <X className="h-4 w-4" />
              Reject
            </Button>
            <Button size="sm" className="gap-1.5">
              <Check className="h-4 w-4" />
              Approve
            </Button>
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
            <h1 className="text-2xl font-bold text-foreground mb-1">Submissions</h1>
            <p className="text-sm text-muted-foreground">Review new temple submission requests</p>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 h-9 text-sm bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Submitted">Submitted</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-36 h-9 text-sm bg-card">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="Devotee">Devotee</SelectItem>
            <SelectItem value="Scraped">Scraped</SelectItem>
            <SelectItem value="Platform">Platform</SelectItem>
          </SelectContent>
        </Select>




        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search temples..." className="h-9 pl-9 text-sm bg-card" />
        </div>

        {selected.size > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-muted-foreground">{selected.size} selected</span>
            <Button size="sm" className="h-8 gap-1 text-xs">
              <Check className="h-3 w-3" />
              Approve
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1 text-xs text-destructive border-destructive/30">
              <X className="h-3 w-3" />
              Reject
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="w-10 px-4 py-3">
                  <Checkbox
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Temple Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">City / State</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Submitted By</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Source</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Date</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                <th className="w-10 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "hover:bg-muted/20 transition-colors cursor-pointer",
                    selected.has(row.id) && "bg-gold-light/30"
                  )}
                  onClick={() => setSelectedSubmission(row)}
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={selected.has(row.id)} onCheckedChange={() => toggleOne(row.id)} />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{row.temple}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{row.city}, {row.state}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{row.submittedBy}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full", sourceColors[row.source])}>
                      {row.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{row.date}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full", statusColors[row.status])}>
                      {row.status}
                    </span>
                  </td>


                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <button className="p-1 rounded hover:bg-muted transition-colors">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t flex items-center justify-between text-sm">
          <span className="text-muted-foreground text-xs">
            Showing {filtered.length} of {mockData.length} submissions
          </span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-7 text-xs" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submissions;
