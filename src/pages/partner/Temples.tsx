import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  ChevronDown, Search, Building2, Users, IndianRupee,
  CheckCircle2, Clock, XCircle, AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockPartners, mockTemples } from "@/data/partnerEcosystemData";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const YEARS  = ["2024","2025","2026"];

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  Active:     { color: "bg-green-100 text-green-700",  icon: <CheckCircle2 size={11} /> },
  Subscribed: { color: "bg-green-100 text-green-700",  icon: <CheckCircle2 size={11} /> },
  Trial:      { color: "bg-blue-100 text-blue-700",    icon: <Clock size={11} /> },
  Onboarded:  { color: "bg-gray-100 text-gray-600",    icon: <CheckCircle2 size={11} /> },
  Expired:    { color: "bg-red-100 text-red-600",      icon: <XCircle size={11} /> },
};

const planColor: Record<string, string> = {
  "Growth Plan":   "bg-violet-100 text-violet-700 border-violet-200",
  "Premium Plan":  "bg-amber-100  text-amber-700  border-amber-200",
  "Starter Plan":  "bg-sky-100    text-sky-700    border-sky-200",
};

const Temples = () => {
  const [year,  setYear]  = useState("2026");
  const [month, setMonth] = useState("April");
  const [search, setSearch] = useState("");
  const [showYear,  setShowYear]  = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowYear(false);
        setShowMonth(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = mockTemples.filter(t =>
    t.templeName.toLowerCase().includes(search.toLowerCase()) ||
    t.city.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = filtered.reduce((s, t) => s + t.monthlyRevenue, 0);
  const mappedCount  = filtered.filter(t => t.directPartnerId).length;

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white min-h-screen">

      {/* ── Header ── */}
      <div className="px-8 pt-8 pb-4 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Temple Mapping</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            All temples with Direct / L1 / L2 partner assignments
          </p>
        </div>

        <div className="flex items-center gap-2" ref={dropdownRef}>
          {/* Month picker */}
          <div className="relative">
            <button
              onClick={() => { setShowMonth(p => !p); setShowYear(false); }}
              className="flex items-center gap-2 h-9 px-3 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {month} <ChevronDown size={14} className="text-gray-400" />
            </button>
            {showMonth && (
              <div className="absolute right-0 top-10 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-36 max-h-52 overflow-y-auto">
                {MONTHS.map(m => (
                  <button key={m} onClick={() => { setMonth(m); setShowMonth(false); }}
                    className={cn("w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors",
                      m === month ? "text-primary font-medium" : "text-gray-700")}>
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year picker */}
          <div className="relative">
            <button
              onClick={() => { setShowYear(p => !p); setShowMonth(false); }}
              className="flex items-center gap-2 h-9 px-3 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {year} <ChevronDown size={14} className="text-gray-400" />
            </button>
            {showYear && (
              <div className="absolute right-0 top-10 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-24">
                {YEARS.map(y => (
                  <button key={y} onClick={() => { setYear(y); setShowYear(false); }}
                    className={cn("w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors",
                      y === year ? "text-primary font-medium" : "text-gray-700")}>
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── KPI Strip ── */}
      <div className="px-8 pb-5 grid grid-cols-3 gap-4">
        <Card className="border border-gray-100 shadow-none rounded-xl">
          <CardContent className="flex items-center gap-3 py-4 px-5">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Temples</p>
              <p className="text-xl font-bold text-gray-900">{filtered.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-100 shadow-none rounded-xl">
          <CardContent className="flex items-center gap-3 py-4 px-5">
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
              <Users size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Partner Mapped</p>
              <p className="text-xl font-bold text-gray-900">{mappedCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-100 shadow-none rounded-xl">
          <CardContent className="flex items-center gap-3 py-4 px-5">
            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
              <IndianRupee size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Revenue</p>
              <p className="text-xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Search ── */}
      <div className="px-8 pb-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="relative max-w-sm flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search temple or city…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm border-gray-200"
          />
        </div>

        {/* Eligibility Legend */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-gray-400 font-medium mr-1">Eligibility:</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700"
            title="Active subscription + partner mapped + commission unlocked">
            <CheckCircle2 size={11} /> Eligible — Active & partner-mapped
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700"
            title="Commission already counted for this billing cycle">
            <Clock size={11} /> Locked — Commission counted this cycle
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
            title="Expired, in trial, or no partner assigned">
            <XCircle size={11} /> Ineligible — Expired / Trial / No partner
          </span>
        </div>
      </div>


      {/* ── Table ── */}
      <div className="flex-1 px-8 pb-10">
        <Card className="border border-gray-100 shadow-none rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-100 bg-gray-50/70 hover:bg-gray-50/70">
                  {["Temple","City","Referral Code","Direct Partner","L1 Partner","Plan","Revenue","Status","Eligibility"].map(h => (
                    <TableHead key={h} className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider py-3">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-16 text-gray-400">
                      <Building2 size={28} className="mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No temples found</p>
                    </TableCell>
                  </TableRow>
                ) : filtered.map((t, idx) => {
                  const directPartner = t.directPartnerId ? mockPartners.find(p => p.id === t.directPartnerId) : null;
                  const l1Partner     = t.l1PartnerId     ? mockPartners.find(p => p.id === t.l1PartnerId)     : null;
                  const statusCfg     = statusConfig[t.status] ?? { color: "bg-gray-100 text-gray-600", icon: <AlertCircle size={11} /> };

                  // Eligibility logic:
                  // Eligible   = Active/Subscribed + not locked in + has a partner mapped
                  // Locked     = Active but lockedIn (commission already counted this cycle)
                  // Ineligible = Expired / Trial / no partner mapped
                  const isActive = t.status === "Active" || t.status === "Subscribed";
                  const eligibility = isActive && !t.lockedIn && !!t.directPartnerId
                    ? { label: "Eligible",   reason: "Active, partner-mapped & commission unlocked",    color: "bg-green-100 text-green-700",  icon: <CheckCircle2 size={11} /> }
                    : isActive && t.lockedIn
                    ? { label: "Locked",     reason: "Commission already counted for this cycle",       color: "bg-amber-100  text-amber-700",  icon: <Clock size={11} /> }
                    : { label: "Ineligible", reason: t.status === "Expired" ? "Subscription expired" : !t.directPartnerId ? "No partner mapped" : "Temple in trial period", color: "bg-gray-100 text-gray-500", icon: <XCircle size={11} /> };

                  return (
                    <TableRow
                      key={t.id}
                      className={cn(
                        "border-b border-gray-100 hover:bg-gray-50/60 transition-colors",
                        idx === filtered.length - 1 && "border-b-0"
                      )}
                    >
                      {/* Temple Name */}
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Building2 size={14} className="text-primary/70" />
                          </div>
                          <p className="text-sm font-medium text-gray-900">{t.templeName}</p>
                        </div>
                      </TableCell>

                      {/* City */}
                      <TableCell className="text-sm text-gray-600">{t.city}</TableCell>

                      {/* Referral Code */}
                      <TableCell>
                        {t.referralCodeUsed
                          ? <span className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded uppercase">{t.referralCodeUsed}</span>
                          : <span className="text-gray-300 text-sm">—</span>}
                      </TableCell>

                      {/* Direct Partner */}
                      <TableCell className="text-sm text-gray-700">
                        {directPartner
                          ? <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-bold shrink-0">
                                {directPartner.fullName.charAt(0)}
                              </div>
                              <span className="text-sm text-gray-800">{directPartner.fullName}</span>
                            </div>
                          : <span className="text-gray-300">—</span>}
                      </TableCell>

                      {/* L1 Partner */}
                      <TableCell className="text-sm text-gray-700">
                        {l1Partner
                          ? <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-[9px] font-bold shrink-0">
                                {l1Partner.fullName.charAt(0)}
                              </div>
                              <span className="text-sm text-gray-800">{l1Partner.fullName}</span>
                            </div>
                          : <span className="text-gray-300">—</span>}
                      </TableCell>

                      {/* Plan */}
                      <TableCell>
                        <Badge variant="outline"
                          className={cn("text-[11px] font-medium border", planColor[t.subscriptionPlan] ?? "bg-gray-100 text-gray-600 border-gray-200")}>
                          {t.subscriptionPlan}
                        </Badge>
                      </TableCell>

                      {/* Revenue */}
                      <TableCell>
                        <span className="text-sm font-semibold text-gray-800">₹{t.monthlyRevenue.toLocaleString()}</span>
                        <span className="text-[11px] text-gray-400 ml-1">/mo</span>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <span className={cn("inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full", statusCfg.color)}>
                          {statusCfg.icon} {t.status}
                        </span>
                      </TableCell>

                      {/* Eligibility */}
                      <TableCell>
                        <span
                          title={eligibility.reason}
                          className={cn(
                            "inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full cursor-help",
                            eligibility.color
                          )}
                        >
                          {eligibility.icon}
                          {eligibility.label}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Temples;
