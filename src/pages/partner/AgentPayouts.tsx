import { useState, useMemo } from "react";
import { 
  IndianRupee, Users, ArrowUpRight, 
  Download, Filter, Search, 
  CheckCircle2, Clock, MoreHorizontal,
  Calendar, CreditCard, ChevronDown, ChevronUp,
  Building2, MapPin, Tag, Check, Loader2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock Data for Agents with Onboards
const initialMockAgents = [
  { 
    id: "A1", name: "Rahul Sharma", referrals: 3, amount: 600, status: "Paid", date: "April 2026",
    onboards: [
      { id: "T1", name: "Siddhivinayak Temple", city: "Mumbai", plan: "Premium", date: "2026-04-02" },
      { id: "T2", name: "Mumba Devi Temple", city: "Mumbai", plan: "Growth", date: "2026-04-10" },
      { id: "T3", name: "Mahalakshmi Temple", city: "Mumbai", plan: "Starter", date: "2026-04-15" },
    ]
  },
  { 
    id: "A2", name: "Priya Patel", referrals: 2, amount: 400, status: "Pending", date: "April 2026",
    onboards: [
      { id: "T4", name: "Somnath Temple", city: "Veraval", plan: "Premium", date: "2026-04-05" },
      { id: "T5", name: "Dwarkadhish Temple", city: "Dwarka", plan: "Growth", date: "2026-04-12" },
    ]
  },
  { 
    id: "A3", name: "Amit Kumar", referrals: 2, amount: 400, status: "Paid", date: "April 2026",
    onboards: [
      { id: "T6", name: "Kashi Vishwanath", city: "Varanasi", plan: "Premium", date: "2026-04-01" },
      { id: "T7", name: "Banke Bihari", city: "Vrindavan", plan: "Premium", date: "2026-04-20" },
    ]
  },
  { 
    id: "A4", name: "Sneha Reddy", referrals: 1, amount: 200, status: "Pending", date: "April 2026",
    onboards: [
      { id: "T8", name: "Tirumala Venkateswara", city: "Tirupati", plan: "Premium", date: "2026-04-18" },
    ]
  },
];

const AgentPayouts = () => {
  const [agents, setAgents] = useState(initialMockAgents);
  const [search, setSearch] = useState("");
  const [filterMonth, setFilterMonth] = useState("April 2026");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

  const filteredAgents = useMemo(() => {
    return agents.filter(a => 
      (a.name.toLowerCase().includes(search.toLowerCase())) &&
      (filterMonth === "All" || a.date === filterMonth)
    );
  }, [agents, search, filterMonth]);

  const stats = useMemo(() => {
    const total = filteredAgents.reduce((sum, a) => sum + a.amount, 0);
    const pending = filteredAgents.filter(a => a.status === "Pending").reduce((sum, a) => sum + a.amount, 0);
    const paid = filteredAgents.filter(a => a.status === "Paid").reduce((sum, a) => sum + a.amount, 0);
    
    return [
      { label: "Total Payouts", value: `₹${total.toLocaleString()}`, icon: IndianRupee, color: "text-primary", bg: "bg-primary/10" },
      { label: "Pending Approval", value: `₹${pending.toLocaleString()}`, icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
      { label: "Successfully Paid", value: `₹${paid.toLocaleString()}`, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
      { label: "Active Agents", value: filteredAgents.length.toString(), icon: Users, color: "text-violet-600", bg: "bg-violet-100" },
    ];
  }, [filteredAgents]);

  const totals = useMemo(() => {
    return filteredAgents.reduce((acc, a) => ({
      referrals: acc.referrals + a.referrals,
      amount: acc.amount + a.amount
    }), { referrals: 0, amount: 0 });
  }, [filteredAgents]);

  const toggleExpand = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    const pendings = filteredAgents.filter(a => a.status === "Pending").map(a => a.id);
    if (selectedIds.length === pendings.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pendings);
    }
  };

  const processPayment = (ids: string[]) => {
    const isBulk = ids.length > 1;
    if (isBulk) setIsBulkProcessing(true);
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: isBulk ? 'Processing bulk payments...' : 'Processing payout...',
        success: () => {
          setAgents(prev => prev.map(a => ids.includes(a.id) ? { ...a, status: "Paid" } : a));
          setSelectedIds(prev => prev.filter(id => !ids.includes(id)));
          if (isBulk) setIsBulkProcessing(false);
          return `${ids.length} Payout(s) processed successfully`;
        },
        error: 'Failed to process payment',
      }
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen overflow-auto">
      {/* ── Header ── */}
      <div className="px-8 pt-8 pb-6 flex items-start justify-between border-b border-gray-50">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Agent Payouts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track monthly referral payouts for agents</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 h-10 px-4 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <Download size={16} /> Export Report
          </button>
          <button 
            disabled={isBulkProcessing}
            onClick={() => {
              const pendings = filteredAgents.filter(a => a.status === "Pending").map(a => a.id);
              if (pendings.length > 0) processPayment(pendings);
              else toast.info("No pending payouts to process");
            }}
            className="flex items-center gap-2 h-10 px-4 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {isBulkProcessing ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} />}
            Process All Payouts
          </button>
        </div>
      </div>

      {/* ── Stats Strip ── */}
      <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} className="border border-gray-100 shadow-none rounded-2xl overflow-hidden hover:border-primary/20 transition-all group">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform", s.bg)}>
                <s.icon size={22} className={s.color} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Filters & Table ── */}
      <div className="px-8 pb-10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search agent name..." 
                className="pl-10 h-11 border-gray-200 rounded-xl focus:ring-primary/20"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="relative">
              <select 
                className="h-11 pl-10 pr-8 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={filterMonth}
                onChange={e => setFilterMonth(e.target.value)}
              >
                <option value="All">All Months</option>
                <option value="April 2026">April 2026</option>
                <option value="March 2026">March 2026</option>
              </select>
              <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-200"></div><span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Paid</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-200"></div><span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Pending</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-200"></div><span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Processing</span></div>
            <div className="w-px h-4 bg-gray-200 mx-1"></div>
            <div className="text-[11px] text-gray-400">Showing {filteredAgents.length} agents</div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-5 py-3 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                {selectedIds.length}
              </div>
              <p className="text-sm font-semibold text-primary">Agents selected for payout</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setSelectedIds([])} className="text-xs text-gray-500 font-medium hover:underline px-3">Cancel</button>
              <button 
                onClick={() => processPayment(selectedIds)}
                className="flex items-center gap-2 h-9 px-4 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
              >
                <CreditCard size={13} /> Process {selectedIds.length} Payments (₹{(selectedIds.length * 200).toLocaleString()})
              </button>
            </div>
          </div>
        )}

        <Card className="border border-gray-100 shadow-xl shadow-gray-200/40 rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-b border-gray-100">
                  <TableHead className="w-12 px-6">
                    <button 
                      onClick={toggleSelectAll}
                      className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center transition-all",
                        selectedIds.length > 0 && selectedIds.length === filteredAgents.filter(a => a.status === "Pending").length
                        ? "bg-primary border-primary text-white" 
                        : "border-gray-300 bg-white hover:border-primary"
                      )}
                    >
                      {selectedIds.length > 0 && <Check size={12} strokeWidth={4} />}
                    </button>
                  </TableHead>
                  <TableHead className="w-10"></TableHead>
                  <TableHead className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Agent Name</TableHead>
                  <TableHead className="py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Month</TableHead>
                  <TableHead className="py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Successful Onboards</TableHead>
                  <TableHead className="py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Payout Amount</TableHead>
                  <TableHead className="py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</TableHead>
                  <TableHead className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="h-64 text-center text-gray-400">No agent records found</TableCell></TableRow>
                ) : (
                  filteredAgents.map((a) => (
                    <>
                      <TableRow 
                        key={a.id} 
                        className={cn(
                          "border-b border-gray-50 transition-colors group",
                          expandedId === a.id ? "bg-primary/[0.03]" : "hover:bg-primary/[0.01]",
                          selectedIds.includes(a.id) && "bg-primary/[0.04]"
                        )}
                      >
                        <TableCell className="py-4 px-6">
                          <button 
                            disabled={a.status === "Paid"}
                            onClick={() => toggleSelect(a.id)}
                            className={cn(
                              "w-5 h-5 rounded border flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed",
                              selectedIds.includes(a.id)
                              ? "bg-primary border-primary text-white" 
                              : "border-gray-300 bg-white hover:border-primary"
                            )}
                          >
                            {selectedIds.includes(a.id) && <Check size={12} strokeWidth={4} />}
                          </button>
                        </TableCell>
                        <TableCell className="py-4 px-0 cursor-pointer" onClick={(e) => toggleExpand(e, a.id)}>
                          {expandedId === a.id ? <ChevronUp size={16} className="text-primary" /> : <ChevronDown size={16} className="text-gray-400" />}
                        </TableCell>
                        <TableCell className="py-4 px-6 cursor-pointer" onClick={(e) => toggleExpand(e, a.id)}>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-white shadow-sm">
                              {a.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{a.name}</p>
                              <p className="text-[10px] text-gray-400">ID: {a.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{a.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-gray-900">{a.referrals}</span>
                            <ArrowUpRight size={14} className="text-green-500" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-bold text-gray-900">₹{a.amount.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "px-2.5 py-0.5 rounded-full text-[10px] font-bold border-none",
                            a.status === "Paid" ? "bg-green-100 text-green-700" :
                            a.status === "Pending" ? "bg-amber-100 text-amber-700" :
                            "bg-blue-100 text-blue-700"
                          )}>
                            {a.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {a.status === "Pending" ? (
                              <button 
                                onClick={() => processPayment([a.id])}
                                className="px-3 h-8 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg text-[11px] font-bold transition-all border border-primary/20"
                              >
                                Pay Individual
                              </button>
                            ) : (
                              <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                                <MoreHorizontal size={16} />
                              </button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                      
                      {expandedId === a.id && (
                        <TableRow className="bg-gray-50/40 border-b border-gray-100">
                          <TableCell colSpan={8} className="p-0">
                            <div className="px-24 py-6 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                              <div className="flex items-center gap-2 mb-2">
                                <Building2 size={14} className="text-primary" />
                                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Successful Onboards for {a.date}</h4>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {a.onboards.map((t) => (
                                  <div key={t.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex flex-col gap-2 hover:border-primary/30 transition-all">
                                    <div className="flex items-start justify-between">
                                      <p className="text-sm font-bold text-gray-900">{t.name}</p>
                                      <Badge variant="outline" className="text-[9px] font-bold py-0 h-4 border-primary/20 text-primary">{t.plan}</Badge>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <div className="flex items-center gap-1 text-[11px] text-gray-500"><MapPin size={11} /> {t.city}</div>
                                      <div className="flex items-center gap-1 text-[11px] text-gray-500"><Tag size={11} /> {t.date}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))
                )}

                {/* ── Summary Footer Row ── */}
                {filteredAgents.length > 0 && (
                  <TableRow className="bg-gray-50/80 hover:bg-gray-50/80 border-t-2 border-gray-100">
                    <TableCell colSpan={4} className="py-5 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Total Payout Summary</span>
                        <span className="text-[10px] text-gray-400 font-medium">({filteredAgents.length} Agents)</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-gray-900">{totals.referrals}</span>
                        <ArrowUpRight size={14} className="text-green-500" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-base font-black text-primary">₹{totals.amount.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell colSpan={2}></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentPayouts;
