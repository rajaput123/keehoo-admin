import { useState } from "react";
import { CustomField } from "@/components/CustomFieldsSection";
import { motion } from "framer-motion";
import {
  Globe,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Building2,
  Download,
  MapPin,
  X,
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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import SearchableSelect from "@/components/SearchableSelect";
import CustomFieldsSection from "@/components/CustomFieldsSection";

const regions = [
  {
    id: "REG-001",
    name: "Tamil Nadu",
    code: "TN",
    tenants: 1847,
    activeTenants: 1756,
    accountManagers: ["Priya Sharma", "Deepa Murthy"],
    status: "Active",
    timezone: "IST",
    currency: "INR",
    languages: ["Tamil", "English"],
  },
  {
    id: "REG-002",
    name: "Karnataka",
    code: "KA",
    tenants: 1456,
    activeTenants: 1389,
    accountManagers: ["Rahul Verma"],
    status: "Active",
    timezone: "IST",
    currency: "INR",
    languages: ["Kannada", "English"],
  },
  {
    id: "REG-003",
    name: "Maharashtra",
    code: "MH",
    tenants: 1234,
    activeTenants: 1178,
    accountManagers: ["Amit Patel", "Neha Kumar"],
    status: "Active",
    timezone: "IST",
    currency: "INR",
    languages: ["Marathi", "Hindi", "English"],
  },
  {
    id: "REG-004",
    name: "Uttar Pradesh",
    code: "UP",
    tenants: 1078,
    activeTenants: 1012,
    accountManagers: ["Deepak Singh"],
    status: "Active",
    timezone: "IST",
    currency: "INR",
    languages: ["Hindi", "English"],
  },
  {
    id: "REG-005",
    name: "Gujarat",
    code: "GJ",
    tenants: 892,
    activeTenants: 845,
    accountManagers: ["Vikram Mehta"],
    status: "Active",
    timezone: "IST",
    currency: "INR",
    languages: ["Gujarati", "Hindi", "English"],
  },
  {
    id: "REG-006",
    name: "Punjab",
    code: "PB",
    tenants: 567,
    activeTenants: 534,
    accountManagers: ["Harpreet Singh"],
    status: "Active",
    timezone: "IST",
    currency: "INR",
    languages: ["Punjabi", "Hindi", "English"],
  },
  {
    id: "REG-007",
    name: "International",
    code: "INTL",
    tenants: 89,
    activeTenants: 78,
    accountManagers: ["Global Team"],
    status: "Active",
    timezone: "Multiple",
    currency: "USD",
    languages: ["English"],
  },
];

const accountManagers = [
  { value: "priya-sharma", label: "Priya Sharma" },
  { value: "rahul-verma", label: "Rahul Verma" },
  { value: "amit-patel", label: "Amit Patel" },
  { value: "deepak-singh", label: "Deepak Singh" },
  { value: "neha-kumar", label: "Neha Kumar" },
  { value: "vikram-mehta", label: "Vikram Mehta" },
  { value: "harpreet-singh", label: "Harpreet Singh" },
];

const RegionManagement = () => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<typeof regions[0] | null>(null);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const handleRowClick = (region: typeof regions[0]) => {
    setSelectedRegion(region);
    setDetailOpen(true);
  };

  const toggleSelect = (id: string) => {
    setSelectedRegions((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedRegions((prev) =>
      prev.length === regions.length ? [] : regions.map((r) => r.id)
    );
  };

  const totalTenants = regions.reduce((sum, r) => sum + r.tenants, 0);
  const totalActive = regions.reduce((sum, r) => sum + r.activeTenants, 0);

  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Region Management</h1>
            <p className="text-sm text-muted-foreground">Manage regional settings and segmentation</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2" onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Region
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Regions", value: regions.length, icon: Globe },
            { label: "Total Tenants", value: totalTenants.toLocaleString(), icon: Building2 },
            { label: "Active Tenants", value: totalActive.toLocaleString(), icon: Users },
            { label: "Account Managers", value: 8, icon: Users },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl p-4 glass-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-primary/10">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4 mb-6 glass-shadow">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search regions..." className="pl-9" />
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedRegions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-6 py-3 rounded-full shadow-xl flex items-center gap-4"
          >
            <span className="text-sm font-medium">{selectedRegions.length} selected</span>
            <div className="h-4 w-px bg-background/20" />
            <Button size="sm" variant="ghost" className="text-background hover:text-background hover:bg-background/10 gap-2">
              <Users className="h-4 w-4" />
              Assign Managers
            </Button>
            <Button size="sm" variant="ghost" className="text-background hover:text-background hover:bg-background/10 gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <button onClick={() => setSelectedRegions([])} className="ml-2 p-1 hover:bg-background/10 rounded">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {/* Regions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region, i) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleRowClick(region)}
              className="glass-card rounded-2xl glass-shadow overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{region.name}</h3>
                      <p className="text-xs text-muted-foreground">{region.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedRegions.includes(region.id)}
                      onCheckedChange={() => toggleSelect(region.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" />
                          Edit Region
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-muted/30 rounded-xl">
                    <p className="text-2xl font-bold text-foreground">{region.tenants.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Tenants</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-xl">
                    <p className="text-2xl font-bold text-success">{region.activeTenants.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Account Managers</span>
                    <span className="font-medium">{region.accountManagers.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Timezone</span>
                    <span className="font-medium">{region.timezone}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Currency</span>
                    <span className="font-medium">{region.currency}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border/50">
                  <div className="flex flex-wrap gap-1">
                    {region.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Add Region Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-auto bg-white">
          <DialogHeader>
            <DialogTitle>Add New Region</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Region Name</label>
                <Input className="mt-1" placeholder="e.g., Rajasthan" />
              </div>
              <div>
                <label className="text-sm font-medium">Region Code</label>
                <Input className="mt-1" placeholder="e.g., RJ" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Timezone</label>
                <SearchableSelect
                  options={[
                    { value: "ist", label: "IST (UTC+5:30)" },
                    { value: "pst", label: "PST (UTC-8)" },
                    { value: "est", label: "EST (UTC-5)" },
                  ]}
                  placeholder="Select timezone..."
                  onValueChange={() => {}}
                  onAddNew={() => {}}
                  addNewLabel="Add Timezone"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Currency</label>
                <SearchableSelect
                  options={[
                    { value: "inr", label: "INR (₹)" },
                    { value: "usd", label: "USD ($)" },
                    { value: "gbp", label: "GBP (£)" },
                  ]}
                  placeholder="Select currency..."
                  onValueChange={() => {}}
                  onAddNew={() => {}}
                  addNewLabel="Add Currency"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Account Managers</label>
              <SearchableSelect
                options={accountManagers}
                placeholder="Assign managers..."
                onValueChange={() => {}}
                onAddNew={() => {}}
                addNewLabel="Add Manager"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Languages</label>
              <Input className="mt-1" placeholder="e.g., Hindi, Rajasthani, English" />
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea className="mt-1" placeholder="Additional notes about this region..." rows={3} />
            </div>
            <CustomFieldsSection fields={customFields} onFieldsChange={setCustomFields} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}>Create Region</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Region Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-auto bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold">{selectedRegion?.name}</p>
                <p className="text-sm text-muted-foreground font-normal">{selectedRegion?.id} • {selectedRegion?.code}</p>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 py-3 border-b border-border">
            <Button size="sm" variant="outline" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              Manage Managers
            </Button>
          </div>

          <div className="py-4 space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-xl text-center">
                <p className="text-3xl font-bold text-foreground">{selectedRegion?.tenants.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Tenants</p>
              </div>
              <div className="p-4 border border-border rounded-xl text-center">
                <p className="text-3xl font-bold text-success">{selectedRegion?.activeTenants.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Active Tenants</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Timezone</span>
                <span className="text-sm font-medium">{selectedRegion?.timezone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Currency</span>
                <span className="text-sm font-medium">{selectedRegion?.currency}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className="bg-success/10 text-success text-xs">{selectedRegion?.status}</Badge>
              </div>
            </div>

            {/* Account Managers */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Account Managers</h4>
              <div className="space-y-2">
                {selectedRegion?.accountManagers.map((manager) => (
                  <div key={manager} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">{manager.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <span className="text-sm">{manager}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Supported Languages</h4>
              <div className="flex flex-wrap gap-2">
                {selectedRegion?.languages.map((lang) => (
                  <Badge key={lang} variant="outline">{lang}</Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegionManagement;
