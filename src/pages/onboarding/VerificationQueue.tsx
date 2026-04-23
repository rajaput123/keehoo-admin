import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal,
  FileCheck,
  AlertTriangle,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Download,
  Upload,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SearchableSelect from "@/components/SearchableSelect";

const verificationQueue = [
  { 
    id: "VER-1021", 
    registrationId: "REG-4520",
    templeName: "Kashi Vishwanath Mandir", 
    documentsSubmitted: 10,
    documentsVerified: 7,
    documentsPending: 3,
    verificationStatus: "In Progress",
    assignedVerifier: "Verifier A",
    slaRemaining: "1d 2h",
    region: "Uttar Pradesh",
    submittedAt: "2024-01-15"
  },
  { 
    id: "VER-1020", 
    registrationId: "REG-4519",
    templeName: "ISKCON Bangalore", 
    documentsSubmitted: 12,
    documentsVerified: 0,
    documentsPending: 12,
    verificationStatus: "Pending",
    assignedVerifier: "Unassigned",
    slaRemaining: "2d 4h",
    region: "Karnataka",
    submittedAt: "2024-01-15"
  },
  { 
    id: "VER-1019", 
    registrationId: "REG-4518",
    templeName: "Tirupati Balaji Temple", 
    documentsSubmitted: 15,
    documentsVerified: 15,
    documentsPending: 0,
    verificationStatus: "Completed",
    assignedVerifier: "Verifier B",
    slaRemaining: "—",
    region: "Andhra Pradesh",
    submittedAt: "2024-01-14"
  },
  { 
    id: "VER-1018", 
    registrationId: "REG-4521",
    templeName: "Sri Lakshmi Narasimha Temple", 
    documentsSubmitted: 8,
    documentsVerified: 5,
    documentsPending: 3,
    verificationStatus: "Issues Found",
    assignedVerifier: "Verifier A",
    slaRemaining: "4h",
    region: "Tamil Nadu",
    submittedAt: "2024-01-15"
  },
];

const documents = [
  { name: "Trust Registration Certificate", status: "Verified", verifiedBy: "Verifier A", verifiedAt: "2024-01-15 10:30" },
  { name: "PAN Card", status: "Verified", verifiedBy: "Verifier A", verifiedAt: "2024-01-15 10:35" },
  { name: "Bank Statement", status: "Pending", verifiedBy: null, verifiedAt: null },
  { name: "Authorized Signatory ID", status: "Rejected", verifiedBy: "Verifier A", verifiedAt: "2024-01-15 11:00", remarks: "Image unclear, please resubmit" },
  { name: "Address Proof", status: "Pending", verifiedBy: null, verifiedAt: null },
  { name: "GST Certificate", status: "Verified", verifiedBy: "Verifier A", verifiedAt: "2024-01-15 10:45" },
];

const statusColors: Record<string, string> = {
  "Pending": "bg-muted text-muted-foreground",
  "In Progress": "bg-warning/10 text-warning",
  "Completed": "bg-success/10 text-success",
  "Issues Found": "bg-destructive/10 text-destructive",
};

const docStatusColors: Record<string, string> = {
  "Pending": "bg-muted text-muted-foreground",
  "Verified": "bg-success/10 text-success",
  "Rejected": "bg-destructive/10 text-destructive",
};

const verifierOptions = [
  { value: "verifier-a", label: "Verifier A" },
  { value: "verifier-b", label: "Verifier B" },
  { value: "verifier-c", label: "Verifier C" },
];

const VerificationQueue = () => {
  const [selectedItem, setSelectedItem] = useState<typeof verificationQueue[0] | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleRowClick = (item: typeof verificationQueue[0]) => {
    setSelectedItem(item);
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(prev => 
      prev.length === verificationQueue.length ? [] : verificationQueue.map(v => v.id)
    );
  };

  // Inline Detail View
  if (selectedItem) {
    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Document Verification: {selectedItem.templeName}
              </h1>
              <p className="text-sm text-muted-foreground">{selectedItem.id} · {selectedItem.registrationId} · {selectedItem.region}</p>
            </div>
            <Badge className={statusColors[selectedItem.verificationStatus]} variant="secondary">
              {selectedItem.verificationStatus}
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pb-4 mb-4 border-b">
            <Button size="sm" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Complete Verification
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Request Resubmission
            </Button>
            <Button size="sm" variant="outline" className="gap-2 text-destructive hover:text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Escalate Case
            </Button>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="glass-card rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-success">{selectedItem.documentsVerified}</p>
              <p className="text-xs text-muted-foreground">Verified</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-warning">{selectedItem.documentsPending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{selectedItem.documentsSubmitted}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>

          {/* Documents List */}
          <div className="glass-card rounded-xl p-4 space-y-3 mb-6">
            <h4 className="text-sm font-semibold mb-2">Documents</h4>
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl border hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    doc.status === "Verified" ? "bg-success/10" :
                    doc.status === "Rejected" ? "bg-destructive/10" : "bg-muted"
                  }`}>
                    {doc.status === "Verified" ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : doc.status === "Rejected" ? (
                      <XCircle className="h-4 w-4 text-destructive" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    {doc.verifiedBy && (
                      <p className="text-xs text-muted-foreground">
                        {doc.verifiedBy} · {doc.verifiedAt}
                      </p>
                    )}
                    {(doc as any).remarks && (
                      <p className="text-xs text-destructive mt-1">{(doc as any).remarks}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={docStatusColors[doc.status]} variant="secondary">
                    {doc.status}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  {doc.status === "Pending" && (
                    <>
                      <Button variant="outline" size="sm" className="h-8">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-destructive hover:text-destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Remarks */}
          <div className="glass-card rounded-xl p-4 space-y-3">
            <Label className="text-sm font-semibold">Verification Remarks</Label>
            <Textarea placeholder="Add verification remarks..." className="min-h-[80px]" />
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
          <h1 className="text-2xl font-bold text-foreground">Verification Queue</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Document verification and compliance validation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Pending", count: 67, icon: Clock, color: "text-muted-foreground", bg: "bg-muted" },
          { label: "In Progress", count: 23, icon: FileCheck, color: "text-warning", bg: "bg-warning/10" },
          { label: "Completed", count: 156, icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
          { label: "Issues Found", count: 8, icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
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
            <Input placeholder="Search by temple or ID..." className="pl-9" />
          </div>
          <SearchableSelect
            options={[
              { value: "all", label: "All Status" },
              { value: "pending", label: "Pending" },
              { value: "in-progress", label: "In Progress" },
              { value: "completed", label: "Completed" },
              { value: "issues", label: "Issues Found" },
            ]}
            placeholder="Status"
            onValueChange={() => {}}
            className="w-[150px]"
          />
          <SearchableSelect
            options={[
              { value: "all", label: "All Regions" },
              { value: "tn", label: "Tamil Nadu" },
              { value: "up", label: "Uttar Pradesh" },
              { value: "ka", label: "Karnataka" },
            ]}
            placeholder="Region"
            onValueChange={() => {}}
            onAddNew={() => alert("Add new region")}
            addNewLabel="Add Region"
            className="w-[150px]"
          />
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
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark Completed
            </Button>
          </div>
        </motion.div>
      )}

      {/* Table */}
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
                  checked={selectedItems.length === verificationQueue.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Temple</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>SLA</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verificationQueue.map((item) => (
              <TableRow 
                key={item.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(item)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleSelectItem(item.id)}
                  />
                </TableCell>
                <TableCell className="font-mono text-xs">{item.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{item.templeName}</p>
                    <p className="text-xs text-muted-foreground">{item.registrationId} · {item.region}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(item.documentsVerified / item.documentsSubmitted) * 100} 
                      className="w-20 h-1.5" 
                    />
                    <span className="text-xs text-muted-foreground">
                      {item.documentsVerified}/{item.documentsSubmitted}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[item.verificationStatus]} variant="secondary">
                    {item.verificationStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`text-xs font-medium ${
                    item.slaRemaining === "—" ? "text-muted-foreground" :
                    item.slaRemaining.includes("h") && !item.slaRemaining.includes("d") 
                      ? "text-warning" 
                      : "text-foreground"
                  }`}>
                    {item.slaRemaining}
                  </span>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem onClick={() => handleRowClick(item)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Verify Documents
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Escalate Case
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default VerificationQueue;
