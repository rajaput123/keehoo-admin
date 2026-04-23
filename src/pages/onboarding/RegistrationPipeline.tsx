import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  User,
  FileText,
  Shield,
  Download,
  Upload,
  Trash2,
  Send,
  MessageSquare,
  MapPin,
  Landmark,
  CreditCard,
  ClipboardCheck,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SearchableSelect from "@/components/SearchableSelect";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";

const registrations = [
  { 
    id: "REG-4521", 
    templeName: "Sri Lakshmi Narasimha Temple", 
    trustName: "Sri Lakshmi Trust",
    region: "Tamil Nadu",
    city: "Chennai",
    submittedAt: "2024-01-15 09:30",
    status: "Under Review",
    duplicateScore: 85,
    slaRemaining: "4h 30m",
    documents: 8,
    verified: 5,
    templeType: "Public",
    primaryDeity: "Narasimha",
    establishedYear: "1850",
    adminName: "Ramesh Kumar",
    adminRole: "Trustee",
    adminMobile: "+91 9876543210",
    adminEmail: "ramesh@srilakshmi.org",
    bankName: "State Bank of India",
    accountNumber: "XXXX1234",
    ifscCode: "SBIN0001234",
  },
  { 
    id: "REG-4520", 
    templeName: "Kashi Vishwanath Mandir", 
    trustName: "Kashi Trust Board",
    region: "Uttar Pradesh",
    city: "Varanasi",
    submittedAt: "2024-01-15 08:45",
    status: "Verification Pending",
    duplicateScore: 23,
    slaRemaining: "1d 2h",
    documents: 10,
    verified: 10,
    templeType: "Government Managed",
    primaryDeity: "Shiva",
    establishedYear: "Ancient",
    adminName: "Suresh Sharma",
    adminRole: "Secretary",
    adminMobile: "+91 9876543211",
    adminEmail: "suresh@kashitrust.org",
    bankName: "Punjab National Bank",
    accountNumber: "XXXX5678",
    ifscCode: "PUNB0005678",
  },
  { 
    id: "REG-4519", 
    templeName: "ISKCON Bangalore", 
    trustName: "ISKCON Foundation",
    region: "Karnataka",
    city: "Bangalore",
    submittedAt: "2024-01-15 07:20",
    status: "Submitted",
    duplicateScore: 5,
    slaRemaining: "5h 45m",
    documents: 12,
    verified: 0,
    templeType: "Trust Managed",
    primaryDeity: "Krishna",
    establishedYear: "1997",
    adminName: "Govind Das",
    adminRole: "President",
    adminMobile: "+91 9876543212",
    adminEmail: "govind@iskcon.org",
    bankName: "HDFC Bank",
    accountNumber: "XXXX9012",
    ifscCode: "HDFC0009012",
  },
  { 
    id: "REG-4518", 
    templeName: "Tirupati Balaji Temple", 
    trustName: "TTD Board",
    region: "Andhra Pradesh",
    city: "Tirupati",
    submittedAt: "2024-01-14 16:30",
    status: "Under Review",
    duplicateScore: 12,
    slaRemaining: "2h 15m",
    documents: 15,
    verified: 8,
    templeType: "Government Managed",
    primaryDeity: "Venkateswara",
    establishedYear: "Ancient",
    adminName: "Prasad Reddy",
    adminRole: "Manager",
    adminMobile: "+91 9876543213",
    adminEmail: "prasad@ttd.org",
    bankName: "Canara Bank",
    accountNumber: "XXXX3456",
    ifscCode: "CNRB0003456",
  },
  { 
    id: "REG-4517", 
    templeName: "Shirdi Sai Sansthan", 
    trustName: "Sai Baba Trust",
    region: "Maharashtra",
    city: "Shirdi",
    submittedAt: "2024-01-14 14:00",
    status: "Approved",
    duplicateScore: 0,
    slaRemaining: "—",
    documents: 11,
    verified: 11,
    templeType: "Public",
    primaryDeity: "Sai Baba",
    establishedYear: "1922",
    adminName: "Manoj Patil",
    adminRole: "Secretary",
    adminMobile: "+91 9876543214",
    adminEmail: "manoj@saibaba.org",
    bankName: "Bank of Maharashtra",
    accountNumber: "XXXX7890",
    ifscCode: "MAHB0007890",
  },
];

const statusColors: Record<string, string> = {
  "Draft": "bg-muted text-muted-foreground",
  "Submitted": "bg-info/10 text-info",
  "Under Review": "bg-warning/10 text-warning",
  "Verification Pending": "bg-orange-100 text-orange-700",
  "Approved": "bg-success/10 text-success",
  "Rejected": "bg-destructive/10 text-destructive",
  "Tenant Created": "bg-primary/10 text-primary",
  "Activated": "bg-emerald-100 text-emerald-700",
};

const regionOptions = [
  { value: "tn", label: "Tamil Nadu" },
  { value: "up", label: "Uttar Pradesh" },
  { value: "mh", label: "Maharashtra" },
  { value: "ka", label: "Karnataka" },
  { value: "kl", label: "Kerala" },
  { value: "ap", label: "Andhra Pradesh" },
];

const RegistrationPipeline = () => {
  const [selectedRegistration, setSelectedRegistration] = useState<typeof registrations[0] | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleViewDetails = (registration: typeof registrations[0]) => {
    setSelectedRegistration(registration);
  };

  const handleRowClick = (registration: typeof registrations[0]) => {
    handleViewDetails(registration);
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(prev => 
      prev.length === registrations.length ? [] : registrations.map(r => r.id)
    );
  };

  // Inline Detail View
  if (selectedRegistration) {
    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedRegistration(null)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">{selectedRegistration.templeName}</h1>
              <p className="text-sm text-muted-foreground">{selectedRegistration.id} · {selectedRegistration.trustName}</p>
            </div>
            <Badge className={statusColors[selectedRegistration.status]} variant="secondary">
              {selectedRegistration.status}
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pb-4 mb-4 border-b">
            <Button size="sm" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Approve & Activate
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Send className="h-4 w-4" />
              Request More Info
            </Button>
            <Button size="sm" variant="outline" className="gap-2 text-destructive hover:text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Reject
            </Button>
          </div>

          <Tabs defaultValue="temple">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="temple">Temple</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="trust">Trust/Legal</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="bank">Bank</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            {/* Temple Details Tab */}
            <TabsContent value="temple" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Temple Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: "Temple Name", value: selectedRegistration.templeName },
                      { label: "Alternate Name", value: "—" },
                      { label: "Temple Type", value: selectedRegistration.templeType },
                      { label: "Established Year", value: selectedRegistration.establishedYear },
                      { label: "Primary Deity", value: selectedRegistration.primaryDeity },
                      { label: "Secondary Deities", value: "—" },
                      { label: "Category", value: "—" },
                      { label: "Registration ID", value: selectedRegistration.id },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className={item.label === "Registration ID" ? "font-mono" : "font-medium"}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-semibold">Short Description</h4>
                    <p className="text-sm text-muted-foreground">
                      A historic temple dedicated to {selectedRegistration.primaryDeity}, located in {selectedRegistration.city}.
                    </p>
                  </div>
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-semibold">Temple Photos</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-square rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                          Photo {i}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Address Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: "Address Line 1", value: "123 Temple Street" },
                      { label: "Landmark", value: "Near Main Market" },
                      { label: "City", value: selectedRegistration.city },
                      { label: "District", value: selectedRegistration.city },
                      { label: "State", value: selectedRegistration.region },
                      { label: "Country", value: "India" },
                      { label: "Pincode", value: "600001" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Geo Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1.5 border-b border-border/50">
                      <span className="text-muted-foreground">GPS Latitude</span>
                      <span className="font-medium">13.0827°</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/50">
                      <span className="text-muted-foreground">GPS Longitude</span>
                      <span className="font-medium">80.2707°</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-muted-foreground">Map Pin</span>
                      <Badge variant="outline" className="text-success border-success">Verified</Badge>
                    </div>
                  </div>
                  <div className="aspect-video rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground mt-2">
                    Map Preview
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Trust/Legal Tab */}
            <TabsContent value="trust" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Landmark className="h-4 w-4 text-primary" />
                    Organization Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: "Trust / Society Name", value: selectedRegistration.trustName },
                      { label: "Legal Entity Type", value: "Public Trust" },
                      { label: "Registration Number", value: "TR/2020/12345" },
                      { label: "Date of Registration", value: "15-Mar-2020" },
                      { label: "Place of Registration", value: selectedRegistration.city },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className={item.label === "Registration Number" ? "font-mono" : "font-medium"}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Legal Documents
                  </h4>
                  <div className="space-y-2">
                    {[
                      { name: "Trust Registration Certificate", status: "Uploaded", required: true },
                      { name: "Trust Deed Copy", status: "Not Uploaded", required: false },
                      { name: "PAN of Trust", status: "Uploaded", required: true },
                      { name: "GST Number", status: "Not Uploaded", required: false },
                      { name: "80G Certificate", status: "Uploaded", required: false },
                      { name: "12A Certificate", status: "Not Uploaded", required: false },
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{doc.name}</span>
                          {doc.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                        </div>
                        <Badge variant={doc.status === "Uploaded" ? "default" : "secondary"}>
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Admin Details Tab */}
            <TabsContent value="admin" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Authorized Person Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: "Full Name", value: selectedRegistration.adminName },
                      { label: "Role", value: selectedRegistration.adminRole },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between py-1.5 border-b border-border/50">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between py-1.5 border-b border-border/50">
                      <span className="text-muted-foreground">Mobile Number</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{selectedRegistration.adminMobile}</span>
                        <Badge variant="outline" className="text-xs text-success border-success">OTP Verified</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/50">
                      <span className="text-muted-foreground">Email</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{selectedRegistration.adminEmail}</span>
                        <Badge variant="outline" className="text-xs text-success border-success">Verified</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/50">
                      <span className="text-muted-foreground">Date of Birth</span>
                      <span className="font-medium">15-Jun-1980</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-border/50">
                      <span className="text-muted-foreground">ID Proof Type</span>
                      <span className="font-medium">Aadhar</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-muted-foreground">ID Proof Number</span>
                      <span className="font-mono">XXXX XXXX 1234</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-semibold">ID & Photo Uploads</h4>
                    <div className="space-y-2">
                      {[
                        { name: "ID Proof Document", status: "Uploaded" },
                        { name: "Profile Photo", status: "Uploaded" },
                        { name: "Authorization Letter", status: "Not Required" },
                      ].map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg border">
                          <span className="text-sm">{doc.name}</span>
                          <Badge variant={doc.status === "Uploaded" ? "default" : "secondary"}>
                            {doc.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-semibold">Authority Confirmation</h4>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <Checkbox checked={true} disabled />
                      <span className="text-sm">"I confirm I am legally authorized to represent this temple."</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Bank Details Tab */}
            <TabsContent value="bank" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    Bank Account Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: "Account Holder Name", value: selectedRegistration.trustName },
                      { label: "Bank Name", value: selectedRegistration.bankName },
                      { label: "Branch Name", value: `${selectedRegistration.city} Main Branch` },
                      { label: "Account Number", value: selectedRegistration.accountNumber, mono: true },
                      { label: "IFSC Code", value: selectedRegistration.ifscCode, mono: true },
                      { label: "Account Type", value: "Current" },
                      { label: "UPI ID", value: "—" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className={item.mono ? "font-mono" : "font-medium"}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-semibold">Cancelled Cheque</h4>
                    <div className="aspect-video rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                      Cancelled Cheque Image
                    </div>
                  </div>
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-semibold">Payment Settings</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-1.5 border-b border-border/50">
                        <span className="text-muted-foreground">Online Donations</span>
                        <Badge variant="outline" className="text-success border-success">Enabled</Badge>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-muted-foreground">Seva Payments</span>
                        <Badge variant="outline" className="text-success border-success">Enabled</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-4 mt-4">
              <div className="glass-card rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold">All Documents ({selectedRegistration.verified}/{selectedRegistration.documents} Verified)</h4>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Request Document
                  </Button>
                </div>
                <Progress value={(selectedRegistration.verified / selectedRegistration.documents) * 100} className="h-2 mb-4" />
                <div className="space-y-2">
                  {[
                    { name: "Trust Registration Certificate", status: "Verified", required: true },
                    { name: "PAN of Trust", status: "Verified", required: true },
                    { name: "80G Certificate", status: "Verified", required: false },
                    { name: "Temple Photos (3)", status: "Verified", required: true },
                    { name: "Admin ID Proof", status: "Verified", required: true },
                    { name: "Admin Profile Photo", status: "Pending", required: true },
                    { name: "Cancelled Cheque", status: "Pending", required: true },
                    { name: "Authorization Letter", status: "Pending", required: false },
                    { name: "GST Certificate", status: "Not Uploaded", required: false },
                    { name: "12A Certificate", status: "Not Uploaded", required: false },
                    { name: "Trust Deed Copy", status: "Not Uploaded", required: false },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{doc.name}</span>
                        {doc.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                      </div>
                      <Badge variant={doc.status === "Verified" ? "default" : doc.status === "Pending" ? "secondary" : "outline"}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Governance & Consent */}
              <div className="glass-card rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-primary" />
                  Governance & Legal Consent
                </h4>
                {[
                  { label: "Accept Terms & Conditions", checked: true },
                  { label: "Accept Platform Governance Policy", checked: true },
                  { label: "Accept Commission Structure", checked: true },
                  { label: "Accept Data Privacy Policy", checked: true },
                  { label: "Confirm Documents Are Authentic", checked: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <Checkbox checked={item.checked} disabled />
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
                <div className="flex justify-between py-1.5 text-sm mt-2 pt-2 border-t border-border/50">
                  <span className="text-muted-foreground">Digital Confirmation</span>
                  <span className="font-medium">{selectedRegistration.adminName} • {selectedRegistration.submittedAt}</span>
                </div>
              </div>

              {/* Notes */}
              <div className="glass-card rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold">Internal Notes</h4>
                <Textarea placeholder="Add internal notes..." className="min-h-[100px]" />
              </div>
            </TabsContent>
          </Tabs>
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
          <h1 className="text-2xl font-bold text-foreground">Registration Pipeline</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage temple self-registration submissions and workflow
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        {[
          { label: "All", count: 2847, active: true },
          { label: "Submitted", count: 156, active: false },
          { label: "Under Review", count: 89, active: false },
          { label: "Verification", count: 67, active: false },
          { label: "Approved", count: 2341, active: false },
          { label: "Rejected", count: 261, active: false },
          { label: "Activated", count: 2089, active: false },
        ].map((status, i) => (
          <motion.button
            key={status.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`p-3 rounded-xl border text-left transition-all hover:shadow-md ${
              status.active 
                ? "border-primary bg-primary/5 shadow-sm" 
                : "border-border hover:border-primary/50"
            }`}
          >
            <p className="text-lg font-bold">{status.count}</p>
            <p className="text-xs text-muted-foreground">{status.label}</p>
          </motion.button>
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
            <Input placeholder="Search by temple, trust, or ID..." className="pl-9" />
          </div>
          <SearchableSelect
            options={[{ value: "all", label: "All Status" }, ...Object.keys(statusColors).map(s => ({ value: s.toLowerCase().replace(/\s+/g, "-"), label: s }))]}
            placeholder="Status"
            onValueChange={() => {}}
            className="w-[150px]"
          />
          <SearchableSelect
            options={[{ value: "all", label: "All Regions" }, ...regionOptions]}
            value={selectedRegion}
            onValueChange={setSelectedRegion}
            placeholder="Region"
            onAddNew={() => alert("Add new region")}
            addNewLabel="Add Region"
            className="w-[150px]"
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Bulk Actions Bar */}
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
              Bulk Approve
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Reject Selected
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
                  checked={selectedItems.length === registrations.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Temple</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duplicate</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.map((reg) => (
              <TableRow 
                key={reg.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(reg)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedItems.includes(reg.id)}
                    onCheckedChange={() => toggleSelectItem(reg.id)}
                  />
                </TableCell>
                <TableCell className="font-mono text-xs">{reg.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{reg.templeName}</p>
                    <p className="text-xs text-muted-foreground">{reg.trustName}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{reg.region}</p>
                    <p className="text-xs text-muted-foreground">{reg.city}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={(reg.verified / reg.documents) * 100} className="w-16 h-1.5" />
                    <span className="text-xs text-muted-foreground">{reg.verified}/{reg.documents}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[reg.status]} variant="secondary">
                    {reg.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={reg.duplicateScore} className="w-16 h-1.5" />
                    <span className="text-xs text-muted-foreground">{reg.duplicateScore}%</span>
                  </div>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem onClick={() => handleViewDetails(reg)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Shield className="h-4 w-4 mr-2" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Reject
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

export default RegistrationPipeline;
