import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Pencil, MapPin, MoreHorizontal, ExternalLink, GitMerge, Archive, Flag, Link2, Users, Download, Upload, ChevronDown, ArrowLeft, Building2, Globe, FileText, CreditCard, Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Temple {
  id: string;
  name: string;
  location: string;
  state: string;
  category: string;
  status: "Published" | "Hidden";
  linkedTenant: string | null;
  lastUpdated: string;
  contributorCount: number;
}

const mockData: Temple[] = [
  { id: "1", name: "Sri Meenakshi Temple", location: "Madurai", state: "TN", category: "Shakti Peetha", status: "Published", linkedTenant: "Madurai Temple Board", lastUpdated: "Feb 6, 2026", contributorCount: 12 },
  { id: "2", name: "Jagannath Temple", location: "Puri", state: "OD", category: "Vaishnavism", status: "Published", linkedTenant: "Puri Temple Trust", lastUpdated: "Feb 5, 2026", contributorCount: 8 },
  { id: "3", name: "Kashi Vishwanath", location: "Varanasi", state: "UP", category: "Jyotirlinga", status: "Published", linkedTenant: null, lastUpdated: "Feb 5, 2026", contributorCount: 15 },
  { id: "4", name: "Tirupati Balaji", location: "Tirupati", state: "AP", category: "Vaishnavism", status: "Published", linkedTenant: "TTD", lastUpdated: "Feb 4, 2026", contributorCount: 23 },
  { id: "5", name: "Golden Temple", location: "Amritsar", state: "PB", category: "Sikh", status: "Published", linkedTenant: "SGPC", lastUpdated: "Feb 4, 2026", contributorCount: 18 },
  { id: "6", name: "Somnath Temple", location: "Gir Somnath", state: "GJ", category: "Jyotirlinga", status: "Published", linkedTenant: "Somnath Trust", lastUpdated: "Feb 3, 2026", contributorCount: 6 },
  { id: "7", name: "Kedarnath Temple", location: "Rudraprayag", state: "UK", category: "Jyotirlinga", status: "Hidden", linkedTenant: null, lastUpdated: "Feb 3, 2026", contributorCount: 4 },
  { id: "8", name: "Ramanathaswamy", location: "Rameswaram", state: "TN", category: "Jyotirlinga", status: "Published", linkedTenant: null, lastUpdated: "Feb 2, 2026", contributorCount: 9 },
  { id: "9", name: "Brihadeeswara Temple", location: "Thanjavur", state: "TN", category: "Shiva", status: "Published", linkedTenant: "ASI", lastUpdated: "Feb 1, 2026", contributorCount: 7 },
  { id: "10", name: "Konark Sun Temple", location: "Konark", state: "OD", category: "Surya", status: "Published", linkedTenant: "ASI", lastUpdated: "Jan 30, 2026", contributorCount: 5 },
  { id: "11", name: "Siddhivinayak Temple", location: "Mumbai", state: "MH", category: "Ganesha", status: "Published", linkedTenant: "Siddhivinayak Trust", lastUpdated: "Jan 28, 2026", contributorCount: 11 },
  { id: "12", name: "Vaishno Devi Temple", location: "Katra", state: "JK", category: "Shakti Peetha", status: "Published", linkedTenant: "Shrine Board", lastUpdated: "Jan 25, 2026", contributorCount: 14 },
];

const statusColors: Record<string, string> = {
  Published: "bg-success/10 text-success",
  Hidden: "bg-muted text-muted-foreground",
};

const categories = [...new Set(mockData.map((t) => t.category))];

const Temples = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [tenantFilter, setTenantFilter] = useState<string>("all");
  const [showAddTemple, setShowAddTemple] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);

  const filtered = mockData
    .filter((t) => statusFilter === "all" || t.status === statusFilter)
    .filter((t) => categoryFilter === "all" || t.category === categoryFilter)
    .filter((t) => {
      if (tenantFilter === "all") return true;
      if (tenantFilter === "linked") return t.linkedTenant !== null;
      return t.linkedTenant === null;
    });

  // Temple Detail Inline View
  if (selectedTemple) {
    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedTemple(null)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">{selectedTemple.name}</h1>
              <p className="text-sm text-muted-foreground">{selectedTemple.category} · {selectedTemple.location}, {selectedTemple.state}</p>
            </div>
            <Badge className={statusColors[selectedTemple.status]} variant="secondary">
              {selectedTemple.status}
            </Badge>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Temple Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: "Temple Name", value: selectedTemple.name },
                      { label: "Category", value: selectedTemple.category },
                      { label: "Status", value: selectedTemple.status },
                      { label: "Last Updated", value: selectedTemple.lastUpdated },
                      { label: "Contributors", value: String(selectedTemple.contributorCount) },
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
                    <Link2 className="h-4 w-4 text-primary" />
                    Linked Tenant
                  </h4>
                  {selectedTemple.linkedTenant ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-1.5">
                        <span className="text-muted-foreground">Tenant Name</span>
                        <span className="font-medium">{selectedTemple.linkedTenant}</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-muted-foreground">Status</span>
                        <Badge className="bg-success/10 text-success" variant="secondary">Active</Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-sm text-muted-foreground mb-3">No tenant linked</p>
                      <Button size="sm" variant="outline">Link Tenant</Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4 mt-4">
              <div className="glass-card rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Location Details
                </h4>
                <div className="space-y-2 text-sm">
                  {[
                    { label: "City", value: selectedTemple.location },
                    { label: "State", value: selectedTemple.state },
                    { label: "Country", value: "India" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="border-2 border-dashed rounded-lg p-8 text-center text-sm text-muted-foreground mt-4">
                  <MapPin className="h-6 w-6 mx-auto mb-2" />
                  Map view placeholder
                </div>
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-4 mt-4">
              <div className="glass-card rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Image className="h-4 w-4 text-primary" />
                  Temple Photos
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                      Photo {i}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4 mt-4">
              <div className="glass-card rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold">Audit Trail</h4>
                <div className="space-y-3">
                  {[
                    { action: "Status changed to Published", by: "Admin A", date: selectedTemple.lastUpdated },
                    { action: "Photos updated (3 added)", by: "Contributor B", date: "Jan 28, 2026" },
                    { action: "Temple created", by: "Admin A", date: "Jan 15, 2026" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm">{item.action}</p>
                        <p className="text-xs text-muted-foreground">{item.by} · {item.date}</p>
                      </div>
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

  // Add Temple Inline Page
  if (showAddTemple) {
    return (
      <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setShowAddTemple(false)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Add New Temple</h1>
              <p className="text-sm text-muted-foreground">Add a new temple to the master directory</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowAddTemple(false)}>Cancel</Button>
              <Button onClick={() => setShowAddTemple(false)}>Save Temple</Button>
            </div>
          </div>

          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-4">
              <div className="glass-card rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Temple Identity
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Temple Name *</Label>
                    <Input placeholder="Enter temple name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Alternate Name</Label>
                    <Input placeholder="Enter alternate / local name" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                        <DropdownMenuSeparator />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsAddCategoryOpen(true);
                          }}
                          className="w-full text-left px-2 py-1.5 text-sm text-primary hover:bg-muted rounded flex items-center gap-2"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Add New Category
                        </button>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sub-Category</Label>
                    <Input placeholder="e.g., Dwadash Jyotirlinga" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Deity *</Label>
                    <Input placeholder="e.g., Lord Shiva" />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Deities</Label>
                    <Input placeholder="Comma-separated names" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Established Year</Label>
                    <Input placeholder="e.g., 1600 CE" />
                  </div>
                  <div className="space-y-2">
                    <Label>Temple Style</Label>
                    <Input placeholder="e.g., Dravidian, Nagara" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea placeholder="Brief description of the temple, its significance, and history" rows={4} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="mt-4">
              <div className="glass-card rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  Address & Location
                </h3>
                <div className="space-y-2">
                  <Label>Address Line 1 *</Label>
                  <Input placeholder="Street address" />
                </div>
                <div className="space-y-2">
                  <Label>Address Line 2</Label>
                  <Input placeholder="Landmark / area" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>City *</Label>
                    <Input placeholder="e.g., Madurai" />
                  </div>
                  <div className="space-y-2">
                    <Label>District</Label>
                    <Input placeholder="e.g., Madurai" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>State *</Label>
                    <Input placeholder="e.g., Tamil Nadu" />
                  </div>
                  <div className="space-y-2">
                    <Label>Country *</Label>
                    <Input placeholder="e.g., India" />
                  </div>
                  <div className="space-y-2">
                    <Label>Pincode</Label>
                    <Input placeholder="e.g., 625001" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold pt-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Geo Coordinates
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>GPS Latitude</Label>
                    <Input placeholder="e.g., 9.9195" />
                  </div>
                  <div className="space-y-2">
                    <Label>GPS Longitude</Label>
                    <Input placeholder="e.g., 78.1193" />
                  </div>
                </div>
                <div className="border-2 border-dashed rounded-lg p-8 text-center text-sm text-muted-foreground">
                  <MapPin className="h-6 w-6 mx-auto mb-2" />
                  Click to pin location on map
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-4">
              <div className="glass-card rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Additional Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Temple Timings</Label>
                    <Input placeholder="e.g., 6:00 AM - 9:00 PM" />
                  </div>
                  <div className="space-y-2">
                    <Label>Darshan Duration</Label>
                    <Input placeholder="e.g., 30 min average" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Festivals / Key Events</Label>
                    <Textarea placeholder="List major festivals celebrated at this temple" rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label>Special Poojas / Sevas</Label>
                    <Textarea placeholder="List special poojas or sevas offered" rows={3} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nearest Railway Station</Label>
                    <Input placeholder="e.g., Madurai Junction" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nearest Airport</Label>
                    <Input placeholder="e.g., Madurai Airport" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>How to Reach</Label>
                  <Textarea placeholder="Travel directions and transportation options" rows={3} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Website URL</Label>
                    <Input placeholder="https://" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Phone</Label>
                    <Input placeholder="+91 XXXXXXXXXX" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="media" className="mt-4">
              <div className="glass-card rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Image className="h-4 w-4 text-primary" />
                  Photos & Media
                </h3>
                <div className="space-y-2">
                  <Label>Temple Photos (Minimum 3) *</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center text-sm text-muted-foreground cursor-pointer hover:bg-muted/50">
                    <Upload className="h-6 w-6 mx-auto mb-2" />
                    <p>Drag & drop photos or click to browse</p>
                    <p className="text-xs mt-1">JPG, PNG up to 5MB each</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Temple Logo</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-muted-foreground cursor-pointer hover:bg-muted/50">
                      <Upload className="h-5 w-5 mx-auto mb-1" />Upload logo
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-muted-foreground cursor-pointer hover:bg-muted/50">
                      <Upload className="h-5 w-5 mx-auto mb-1" />Upload cover image
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Virtual Tour Link (Optional)</Label>
                  <Input placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label>YouTube Video Link (Optional)</Label>
                  <Input placeholder="https://youtube.com/..." />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <div className="glass-card rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Visibility & Settings
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Initial Status *</Label>
                    <Select>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="Published">Published</SelectItem>
                        <SelectItem value="Hidden">Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Source</Label>
                    <Input placeholder="e.g., Manual entry, Import" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Comma-separated tags, e.g., UNESCO, Heritage, Pilgrimage" />
                </div>
                <div className="space-y-2">
                  <Label>Internal Notes</Label>
                  <Textarea placeholder="Any internal notes for the admin team" rows={3} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Temples</h1>
            <p className="text-sm text-muted-foreground">Master directory of published temples</p>
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
                  Bulk Import
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-sm">
                  <Download className="h-4 w-4" />
                  Export All
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-sm">
                  <Download className="h-4 w-4" />
                  Export Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="gap-1.5" onClick={() => setShowAddTemple(true)}>
              <Plus className="h-3.5 w-3.5" />
              Add Temple
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Category Name</Label>
              <Input placeholder="Enter category name" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input placeholder="Brief description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddCategoryOpen(false)}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Import Dialog */}
      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
        <DialogContent className="sm:max-w-lg bg-card">
          <DialogHeader>
            <DialogTitle>Bulk Import Temples</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-2">Drag & drop your CSV or Excel file here</p>
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
            <Button onClick={() => setIsImportOpen(false)}>Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-9 text-sm bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Hidden">Hidden</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40 h-9 text-sm bg-card">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={tenantFilter} onValueChange={setTenantFilter}>
          <SelectTrigger className="w-40 h-9 text-sm bg-card">
            <SelectValue placeholder="Tenant" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Temples</SelectItem>
            <SelectItem value="linked">Linked to Tenant</SelectItem>
            <SelectItem value="unlinked">Not Linked</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search temples..." className="h-9 pl-9 text-sm bg-card" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Temple Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Location</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Linked Tenant</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Last Updated</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Contributors</th>
                <th className="w-12 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => setSelectedTemple(row)}>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{row.name}</p>
                      <p className="text-xs text-muted-foreground">{row.category}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {row.location}, {row.state}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {row.linkedTenant ? (
                      <div className="flex items-center gap-1.5">
                        <Link2 className="h-3.5 w-3.5 text-success" />
                        <span className="text-sm text-foreground">{row.linkedTenant}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full", statusColors[row.status])}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{row.lastUpdated}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      {row.contributorCount}
                    </div>
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded hover:bg-muted transition-colors">
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-popover">
                        <DropdownMenuItem className="gap-2 text-sm">
                          <ExternalLink className="h-4 w-4" />
                          View Public Page
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-sm">
                          <Pencil className="h-4 w-4" />
                          Request Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-sm">
                          <GitMerge className="h-4 w-4" />
                          Merge with Another
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-sm">
                          <Archive className="h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-sm text-warning">
                          <Flag className="h-4 w-4" />
                          Flag for Review
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t flex items-center justify-between text-sm">
          <span className="text-muted-foreground text-xs">
            Showing {filtered.length} of {mockData.length} temples
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

export default Temples;
