import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus,
  Building2,
  Users,
  Shield,
  Rocket,
  ChevronRight,
  ChevronLeft,
  Check,
  Search,
  Link2,
  Download,
  Upload,
  MoreHorizontal,
  Eye,
  MapPin,
  Landmark,
  CreditCard,
  ClipboardCheck,
  UserCheck,
  FileText,
  ArrowLeft
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchableSelect from "@/components/SearchableSelect";

const steps = [
  { id: 1, label: "Role", icon: Users },
  { id: 2, label: "Temple Details", icon: Building2 },
  { id: 3, label: "Location", icon: MapPin },
  { id: 4, label: "Trust / Legal", icon: Landmark },
  { id: 5, label: "Admin", icon: UserCheck },
  { id: 6, label: "Bank", icon: CreditCard },
  { id: 7, label: "Review", icon: ClipboardCheck },
];

const recentOnboardings = [
  { 
    id: "ONB-2001", 
    templeName: "Sri Padmanabhaswamy Temple", 
    region: "Kerala",
    city: "Thiruvananthapuram",
    status: "Activated",
    createdBy: "Admin A",
    createdAt: "2024-01-15 14:30",
    completedSteps: 7,
    templeType: "Government Managed",
    primaryDeity: "Vishnu",
    trustName: "Travancore Devaswom Board",
    adminName: "Rajesh Nair",
    adminEmail: "rajesh@tdb.org",
    adminMobile: "+91 9876543210",
    bankName: "State Bank of India",
    accountNumber: "XXXX4567",
    ifscCode: "SBIN0004567",
  },
  { 
    id: "ONB-2000", 
    templeName: "Meenakshi Amman Temple", 
    region: "Tamil Nadu",
    city: "Madurai",
    status: "Pending Activation",
    createdBy: "Admin B",
    createdAt: "2024-01-15 11:20",
    completedSteps: 5,
    templeType: "Public",
    primaryDeity: "Meenakshi",
    trustName: "HR&CE Department",
    adminName: "Sundar Rajan",
    adminEmail: "sundar@hrce.org",
    adminMobile: "+91 9876543211",
    bankName: "Indian Bank",
    accountNumber: "XXXX8901",
    ifscCode: "IDIB0008901",
  },
  { 
    id: "ONB-1999", 
    templeName: "Jagannath Temple", 
    region: "Odisha",
    city: "Puri",
    status: "In Progress",
    createdBy: "Admin A",
    createdAt: "2024-01-15 09:45",
    completedSteps: 3,
    templeType: "Government Managed",
    primaryDeity: "Jagannath",
    trustName: "Shree Jagannath Temple Administration",
    adminName: "Biswajit Mohapatra",
    adminEmail: "biswajit@sjta.org",
    adminMobile: "+91 9876543212",
    bankName: "UCO Bank",
    accountNumber: "XXXX2345",
    ifscCode: "UCBA0002345",
  },
];

const statusColors: Record<string, string> = {
  "In Progress": "bg-warning/10 text-warning",
  "Pending Activation": "bg-info/10 text-info",
  "Activated": "bg-success/10 text-success",
};

const templeTypeOptions = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
  { value: "trust-managed", label: "Trust Managed" },
  { value: "govt-managed", label: "Government Managed" },
];

const countryOptions = [
  { value: "in", label: "India" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "sg", label: "Singapore" },
];

const stateOptions = [
  { value: "tn", label: "Tamil Nadu" },
  { value: "kl", label: "Kerala" },
  { value: "ka", label: "Karnataka" },
  { value: "ap", label: "Andhra Pradesh" },
  { value: "mh", label: "Maharashtra" },
  { value: "up", label: "Uttar Pradesh" },
];

const legalEntityOptions = [
  { value: "public-trust", label: "Public Trust" },
  { value: "society", label: "Society" },
  { value: "section-8", label: "Section 8 Company" },
  { value: "govt-body", label: "Government Body" },
];

const adminRoleOptions = [
  { value: "trustee", label: "Trustee" },
  { value: "president", label: "President" },
  { value: "secretary", label: "Secretary" },
  { value: "manager", label: "Manager" },
];

const idProofOptions = [
  { value: "aadhar", label: "Aadhar" },
  { value: "pan", label: "PAN" },
  { value: "passport", label: "Passport" },
];

const accountTypeOptions = [
  { value: "savings", label: "Savings" },
  { value: "current", label: "Current" },
];

const dummyDocuments = [
  { name: "Trust Registration Certificate", status: "Uploaded", required: true },
  { name: "PAN of Trust", status: "Uploaded", required: true },
  { name: "Temple Photos (3)", status: "Uploaded", required: true },
  { name: "Admin ID Proof (Aadhar)", status: "Uploaded", required: true },
  { name: "Admin Profile Photo", status: "Uploaded", required: true },
  { name: "Cancelled Cheque", status: "Uploaded", required: true },
  { name: "80G Certificate", status: "Pending", required: false },
  { name: "12A Certificate", status: "Not Uploaded", required: false },
  { name: "GST Certificate", status: "Not Uploaded", required: false },
  { name: "Trust Deed Copy", status: "Not Uploaded", required: false },
  { name: "Authorization Letter", status: "Not Required", required: false },
];

const DirectOnboarding = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedOnboarding, setSelectedOnboarding] = useState<typeof recentOnboardings[0] | null>(null);

  const totalSteps = steps.length;

  const handleNextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(prev => 
      prev.length === recentOnboardings.length ? [] : recentOnboardings.map(r => r.id)
    );
  };

  // Inline Detail View
  if (selectedOnboarding) {
    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedOnboarding(null)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">{selectedOnboarding.templeName}</h1>
              <p className="text-sm text-muted-foreground">{selectedOnboarding.id} · Created by {selectedOnboarding.createdBy}</p>
            </div>
            <Badge className={statusColors[selectedOnboarding.status]} variant="secondary">
              {selectedOnboarding.status}
            </Badge>
          </div>

          <div className="glass-card rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Onboarding Progress</h3>
              <span className="text-sm text-muted-foreground">{selectedOnboarding.completedSteps}/7 steps completed</span>
            </div>
            <Progress value={(selectedOnboarding.completedSteps / 7) * 100} className="h-2 mb-4" />
            <div className="flex items-center justify-between">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    selectedOnboarding.completedSteps >= step.id 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}>
                    {selectedOnboarding.completedSteps >= step.id ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <step.icon className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <span className="text-[10px] mt-1 text-muted-foreground">{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            {selectedOnboarding.status === "Pending Activation" && (
              <Button size="sm" className="gap-2">
                <Rocket className="h-4 w-4" />
                Activate
              </Button>
            )}
            {selectedOnboarding.status === "In Progress" && (
              <Button size="sm" className="gap-2">
                <ChevronRight className="h-4 w-4" />
                Continue Onboarding
              </Button>
            )}
            <Button size="sm" variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Details
            </Button>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="temple">Temple Info</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="bank">Bank</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Quick Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: "Onboarding ID", value: selectedOnboarding.id },
                      { label: "Temple Name", value: selectedOnboarding.templeName },
                      { label: "Region", value: selectedOnboarding.region },
                      { label: "City", value: selectedOnboarding.city },
                      { label: "Status", value: selectedOnboarding.status },
                      { label: "Created By", value: selectedOnboarding.createdBy },
                      { label: "Created At", value: selectedOnboarding.createdAt },
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
                    <FileText className="h-4 w-4 text-primary" />
                    Document Summary
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-success/10 rounded-lg">
                      <p className="text-xl font-bold text-success">{dummyDocuments.filter(d => d.status === "Uploaded").length}</p>
                      <p className="text-xs text-muted-foreground">Uploaded</p>
                    </div>
                    <div className="p-3 bg-warning/10 rounded-lg">
                      <p className="text-xl font-bold text-warning">{dummyDocuments.filter(d => d.status === "Pending").length}</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xl font-bold text-muted-foreground">{dummyDocuments.filter(d => d.status === "Not Uploaded").length}</p>
                      <p className="text-xs text-muted-foreground">Missing</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="temple" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <h4 className="text-sm font-semibold">Temple Details</h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: "Temple Name", value: selectedOnboarding.templeName },
                      { label: "Temple Type", value: selectedOnboarding.templeType },
                      { label: "Primary Deity", value: selectedOnboarding.primaryDeity },
                      { label: "Trust Name", value: selectedOnboarding.trustName },
                      { label: "City", value: selectedOnboarding.city },
                      { label: "Region", value: selectedOnboarding.region },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
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
            </TabsContent>

            <TabsContent value="admin" className="space-y-4 mt-4">
              <div className="glass-card rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-primary" />
                  Admin Details
                </h4>
                <div className="space-y-2 text-sm">
                  {[
                    { label: "Admin Name", value: selectedOnboarding.adminName },
                    { label: "Email", value: selectedOnboarding.adminEmail },
                    { label: "Mobile", value: selectedOnboarding.adminMobile },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bank" className="space-y-4 mt-4">
              <div className="glass-card rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Bank Details
                </h4>
                <div className="space-y-2 text-sm">
                  {[
                    { label: "Bank Name", value: selectedOnboarding.bankName },
                    { label: "Account Number", value: selectedOnboarding.accountNumber },
                    { label: "IFSC Code", value: selectedOnboarding.ifscCode },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-mono">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4 mt-4">
              <div className="glass-card rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold">All Documents</h4>
                  <span className="text-xs text-muted-foreground">{dummyDocuments.filter(d => d.status === "Uploaded").length}/{dummyDocuments.length} uploaded</span>
                </div>
                <Progress value={(dummyDocuments.filter(d => d.status === "Uploaded").length / dummyDocuments.length) * 100} className="h-2 mb-4" />
                <div className="space-y-2">
                  {dummyDocuments.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{doc.name}</span>
                        {doc.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                      </div>
                      <Badge variant={doc.status === "Uploaded" ? "default" : doc.status === "Pending" ? "secondary" : "outline"}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    );
  }

  // Inline New Onboarding Wizard
  if (showWizard) {
    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => { setShowWizard(false); setCurrentStep(1); }} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Direct Temple Onboarding</h1>
              <p className="text-sm text-muted-foreground">Platform-initiated temple and tenant creation</p>
            </div>
          </div>

          {/* Stepper */}
          <div className="glass-card rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between px-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                      currentStep > step.id 
                        ? "bg-primary border-primary text-primary-foreground" 
                        : currentStep === step.id
                          ? "border-primary text-primary"
                          : "border-muted-foreground/30 text-muted-foreground"
                    }`}>
                      {currentStep > step.id ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <step.icon className="h-4 w-4" />
                      )}
                    </div>
                    <span className={`text-[10px] mt-1.5 text-center w-16 ${
                      currentStep >= step.id ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-1 ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <div className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Select Registration Type</h3>
                  <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-primary cursor-pointer bg-primary/5">
                    <input type="radio" name="role" value="institution" defaultChecked className="mt-1" />
                    <div>
                      <p className="text-sm font-medium">Register as Temple / Trust (Institution)</p>
                      <p className="text-xs text-muted-foreground mt-1">Register a temple, trust, or religious institution on the platform</p>
                    </div>
                  </label>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Temple Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Temple Name *</Label><Input placeholder="Enter temple name" /></div>
                    <div className="space-y-2"><Label>Temple Alternate Name</Label><Input placeholder="Enter alternate name" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Temple Type *</Label><SearchableSelect options={templeTypeOptions} placeholder="Select type" onValueChange={() => {}} /></div>
                    <div className="space-y-2"><Label>Established Year</Label><Input placeholder="e.g. 1850" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Primary Deity *</Label><Input placeholder="Enter primary deity" /></div>
                    <div className="space-y-2"><Label>Secondary Deities</Label><Input placeholder="Comma-separated names" /></div>
                  </div>
                  <div className="space-y-2"><Label>Short Description *</Label><Textarea placeholder="Brief description..." className="min-h-[80px]" /></div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Temple Photos (Minimum 3) *</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-muted-foreground cursor-pointer hover:bg-muted/50">
                        <Upload className="h-5 w-5 mx-auto mb-1" />Click to upload photos
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Temple Logo (Optional)</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-muted-foreground cursor-pointer hover:bg-muted/50">
                        <Upload className="h-5 w-5 mx-auto mb-1" />Click to upload logo
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Address Information</h3>
                  <div className="space-y-2"><Label>Address Line 1 *</Label><Input placeholder="Street address" /></div>
                  <div className="space-y-2"><Label>Address Line 2</Label><Input placeholder="Additional address" /></div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>City *</Label><Input placeholder="City" /></div>
                    <div className="space-y-2"><Label>District *</Label><Input placeholder="District" /></div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2"><Label>State *</Label><SearchableSelect options={stateOptions} placeholder="Select state" onValueChange={() => {}} onAddNew={() => alert("Add new state")} addNewLabel="Add State" /></div>
                    <div className="space-y-2"><Label>Country *</Label><SearchableSelect options={countryOptions} placeholder="Select country" onValueChange={() => {}} /></div>
                    <div className="space-y-2"><Label>Pincode *</Label><Input placeholder="Pincode" /></div>
                  </div>
                  <h3 className="text-sm font-semibold pt-2">Geo Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>GPS Latitude</Label><Input placeholder="e.g. 13.0827" /></div>
                    <div className="space-y-2"><Label>GPS Longitude</Label><Input placeholder="e.g. 80.2707" /></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Map Pin Selection *</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center text-sm text-muted-foreground">
                      <MapPin className="h-6 w-6 mx-auto mb-2" />Click to select location on map
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Organization Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Trust / Society Name *</Label><Input placeholder="Enter trust name" /></div>
                    <div className="space-y-2"><Label>Legal Entity Type</Label><SearchableSelect options={legalEntityOptions} placeholder="Select type" onValueChange={() => {}} /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Trust Registration Number *</Label><Input placeholder="e.g. TR/2020/12345" /></div>
                    <div className="space-y-2"><Label>Date of Registration</Label><Input type="date" /></div>
                  </div>
                  <h3 className="text-sm font-semibold pt-2">Document Uploads</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Trust Registration Certificate (PDF) *", required: true },
                      { label: "Trust Deed Copy (Optional)", required: false },
                      { label: "PAN of Trust *", required: true },
                      { label: "GST Number (Optional)", required: false },
                      { label: "80G Certificate (Optional)", required: false },
                      { label: "12A Certificate (Optional)", required: false },
                    ].map((doc) => (
                      <div key={doc.label} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{doc.label}</span>
                        </div>
                        <Button variant="outline" size="sm"><Upload className="h-3 w-3 mr-1" />Upload</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Personal Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Full Name *</Label><Input placeholder="Enter full name" /></div>
                    <div className="space-y-2"><Label>Role *</Label><SearchableSelect options={adminRoleOptions} placeholder="Select role" onValueChange={() => {}} /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Mobile Number *</Label><Input placeholder="+91 XXXXXXXXXX" /></div>
                    <div className="space-y-2"><Label>Email Address *</Label><Input type="email" placeholder="admin@temple.com" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>ID Proof Type *</Label><SearchableSelect options={idProofOptions} placeholder="Select ID type" onValueChange={() => {}} /></div>
                    <div className="space-y-2"><Label>ID Proof Number *</Label><Input placeholder="Enter ID number" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Upload ID Proof *</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-muted-foreground cursor-pointer hover:bg-muted/50">
                        <Upload className="h-5 w-5 mx-auto mb-1" />Upload ID document
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Profile Photo *</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-muted-foreground cursor-pointer hover:bg-muted/50">
                        <Upload className="h-5 w-5 mx-auto mb-1" />Upload photo
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Checkbox id="authConfirm" />
                    <label htmlFor="authConfirm" className="text-sm">"I confirm I am legally authorized to represent this temple."</label>
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Bank Account Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Account Holder Name *</Label><Input placeholder="Enter account holder name" /></div>
                    <div className="space-y-2"><Label>Bank Name *</Label><Input placeholder="Enter bank name" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Account Number *</Label><Input placeholder="Enter account number" /></div>
                    <div className="space-y-2"><Label>IFSC Code *</Label><Input placeholder="e.g. SBIN0001234" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Account Type</Label><SearchableSelect options={accountTypeOptions} placeholder="Select type" onValueChange={() => {}} /></div>
                    <div className="space-y-2"><Label>UPI ID (Optional)</Label><Input placeholder="e.g. temple@upi" /></div>
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Cancelled Cheque *</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-muted-foreground cursor-pointer hover:bg-muted/50">
                      <Upload className="h-5 w-5 mx-auto mb-1" />Upload cancelled cheque image
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold pt-2">Payment Settings</h3>
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium">Enable Online Donations?</p>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium">Enable Seva Payments?</p>
                      <Switch />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Governance & Legal Consent</h3>
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    {["Accept Terms & Conditions *","Accept Platform Governance Policy *","Accept Commission Structure *","Accept Data Privacy Policy *","Confirm Documents Are Authentic *"].map((item) => (
                      <div key={item} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                        <Checkbox />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <h3 className="text-sm font-semibold pt-2">Verification & Activation</h3>
                  <div className="glass-card rounded-xl p-4 space-y-2">
                    {["Legal Documents Verified","Bank Details Verified","KYC Completed"].map((item) => (
                      <div key={item} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <span className="text-sm">{item}</span>
                        <Switch />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 1}>
              <ChevronLeft className="h-4 w-4 mr-2" />Previous
            </Button>
            {currentStep < totalSteps ? (
              <Button onClick={handleNextStep}>Next<ChevronRight className="h-4 w-4 ml-2" /></Button>
            ) : (
              <Button onClick={() => { setShowWizard(false); setCurrentStep(1); }}>
                <Rocket className="h-4 w-4 mr-2" />Submit & Activate
              </Button>
            )}
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
          <h1 className="text-2xl font-bold text-foreground">Direct Onboarding</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Platform-initiated temple and tenant creation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowWizard(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Onboarding
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Onboarded", count: 1247, icon: Building2 },
          { label: "In Progress", count: 12, icon: Users },
          { label: "Pending Activation", count: 8, icon: Shield },
          { label: "Activated This Month", count: 45, icon: Rocket },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-4 glass-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{item.count}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-3 mb-4 flex items-center justify-between"
        >
          <span className="text-sm font-medium">{selectedItems.length} item(s) selected</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Rocket className="h-4 w-4 mr-2" />Activate Selected</Button>
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Export Selected</Button>
          </div>
        </motion.div>
      )}

      {/* Recent Onboardings Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card rounded-2xl glass-shadow overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Recent Onboardings</h2>
          <Button variant="link" size="sm" className="text-primary">View All</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedItems.length === recentOnboardings.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Temple</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOnboardings.map((item) => (
              <TableRow 
                key={item.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedOnboarding(item)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleSelectItem(item.id)}
                  />
                </TableCell>
                <TableCell className="font-mono text-xs">{item.id}</TableCell>
                <TableCell className="font-medium">{item.templeName}</TableCell>
                <TableCell className="text-sm">{item.region}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={(item.completedSteps / 7) * 100} className="w-16 h-1.5" />
                    <span className="text-xs text-muted-foreground">{item.completedSteps}/7</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[item.status]} variant="secondary">
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{item.createdBy}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem onClick={() => setSelectedOnboarding(item)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Rocket className="h-4 w-4 mr-2" />
                        Continue Onboarding
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

export default DirectOnboarding;
