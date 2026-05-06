import { useState, useMemo } from "react";
import { 
  Search, Download, Building2, CreditCard, 
  ChevronLeft, ArrowUpRight, Globe, Mail, Phone,
  CheckCircle2, Clock, Shield, Wallet, LayoutGrid,
  BookOpen, Users, Package, CalendarDays, HeartHandshake,
  Tag, MapPin, FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Mock Data
const mockSubscriptions = [
  { 
    id: "SUB101", temple: "Siddhivinayak Temple", location: "Mumbai, MH", plan: "Premium", 
    status: "Active", startDate: "Jan 12, 2026", nextBilling: "Jan 11, 2027", revenue: 25000,
    modules: ["Rituals", "Catalog", "Finance", "Team", "Inventory", "Events", "CRM"],
    email: "admin@siddhivinayak.org", phone: "+91 22 2437 3626", website: "siddhivinayak.org"
  },
  { 
    id: "SUB102", temple: "Kashi Vishwanath", location: "Varanasi, UP", plan: "Growth", 
    status: "Active", startDate: "Feb 05, 2026", nextBilling: "Feb 04, 2027", revenue: 15000,
    modules: ["Rituals", "Catalog", "Finance", "Team"],
    email: "contact@kashivishwanath.in", phone: "+91 542 239 2629", website: "shrikashivishwanath.org"
  },
  { 
    id: "SUB103", temple: "Meenakshi Amman", location: "Madurai, TN", plan: "Starter", 
    status: "Expiring Soon", startDate: "Mar 20, 2025", nextBilling: "Mar 19, 2026", revenue: 5000,
    modules: ["Rituals", "Catalog"],
    email: "info@meenakshitemple.org", phone: "+91 452 234 4360", website: "maduraimeenakshi.org"
  },
  { 
    id: "SUB104", temple: "Golden Temple", location: "Amritsar, PB", plan: "Premium", 
    status: "Active", startDate: "Apr 10, 2026", nextBilling: "Apr 09, 2027", revenue: 25000,
    modules: ["Rituals", "Catalog", "Finance", "Team", "Inventory", "Events", "CRM"],
    email: "it@sgpc.net", phone: "+91 183 255 3957", website: "sgpc.net"
  },
  { 
    id: "SUB105", temple: "Somnath Temple", location: "Veraval, GJ", plan: "Growth", 
    status: "Expired", startDate: "Jan 01, 2025", nextBilling: "Jan 01, 2026", revenue: 15000,
    modules: ["Rituals", "Catalog", "Finance", "Team"],
    email: "info@somnath.org", phone: "+91 287 623 1212", website: "somnath.org"
  },
];

const statusColors = {
  "Active": "bg-green-100 text-green-700",
  "Expiring Soon": "bg-amber-100 text-amber-700",
  "Expired": "bg-red-100 text-red-700",
};

const planColors = {
  "Premium": "bg-violet-100 text-violet-700",
  "Growth": "bg-blue-100 text-blue-700",
  "Starter": "bg-gray-100 text-gray-700",
};

const Subscriptions = () => {
  const [search, setSearch] = useState("");
  const [viewId, setViewId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return mockSubscriptions.filter(s => 
      s.temple.toLowerCase().includes(search.toLowerCase()) || 
      s.location.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const activeSub = useMemo(() => mockSubscriptions.find(s => s.id === viewId), [viewId]);

  // Detail View
  if (activeSub) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        <button 
          onClick={() => setViewId(null)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors"
        >
          <ChevronLeft size={20} /> Back to List
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-sm border-gray-100">
            <CardHeader className="border-b border-gray-50 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{activeSub.temple}</h2>
                    <p className="text-sm text-gray-500">{activeSub.location}</p>
                  </div>
                </div>
                <Badge className={cn("border-0 font-medium", statusColors[activeSub.status])}>
                  {activeSub.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Current Plan</p>
                  <p className="font-bold text-lg text-gray-900">{activeSub.plan}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Annual Revenue</p>
                  <p className="font-bold text-lg text-gray-900">₹{activeSub.revenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Next Billing</p>
                  <p className="font-bold text-lg text-gray-900">{activeSub.nextBilling}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield size={16} className="text-primary" /> Module Access
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeSub.modules.map(m => (
                    <Badge key={m} variant="outline" className="px-3 py-1 bg-white text-gray-600 border-gray-200 font-medium">
                      {m}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe size={16} className="text-primary" /> Contact Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={14} className="text-gray-400" /> {activeSub.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} className="text-gray-400" /> {activeSub.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe size={14} className="text-gray-400" /> {activeSub.website}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-100">
            <CardHeader className="border-b border-gray-50">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Clock size={18} className="text-primary" /> Billing History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-50">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Renewal Payment</p>
                        <p className="text-[11px] text-gray-400 uppercase font-semibold">Jan {10+i}, 202{5+i}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">₹{activeSub.revenue.toLocaleString()}</p>
                      <button className="text-[10px] text-primary hover:underline font-bold uppercase tracking-tight">
                        Download Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Subscription Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage temple plans and module access</p>
        </div>
        <button className="flex items-center gap-2 h-10 px-4 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          <Download size={16} /> Export Audit
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search temple by name or location..." 
              className="pl-10 h-11 border-gray-200 focus:ring-primary/20"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {filtered.length} Results found
          </div>
        </div>

        <Card className="border-gray-100 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="border-b border-gray-100">
                  <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wide py-4 px-6">Temple</TableHead>
                  <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wide">Plan</TableHead>
                  <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wide">Status</TableHead>
                  <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wide">Module Access</TableHead>
                  <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wide">Next Billing</TableHead>
                  <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wide">Revenue</TableHead>
                  <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wide text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50 group transition-colors">
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/5 text-primary flex items-center justify-center shrink-0 font-bold text-xs border border-primary/10">
                          {s.temple.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{s.temple}</p>
                          <p className="text-[11px] text-gray-500 font-medium uppercase tracking-tighter">{s.location}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("border-0 text-xs font-medium", planColors[s.plan])}>
                        {s.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("border-0 text-xs font-medium", statusColors[s.status])}>
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-[11px] font-semibold text-gray-600 truncate max-w-[150px]">
                        {s.modules.join(", ")}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 font-medium">{s.nextBilling}</TableCell>
                    <TableCell className="text-sm font-bold text-gray-900">₹{s.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <button 
                        onClick={() => setViewId(s.id)}
                        className="text-primary hover:text-primary/80 font-bold text-sm transition-colors"
                      >
                        View Details
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscriptions;
