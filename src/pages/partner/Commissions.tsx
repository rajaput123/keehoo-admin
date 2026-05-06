import { useState } from "react";
import { Plus, Trash2, IndianRupee, Target, RefreshCw, Users, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface CommissionTemplate {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  newSubscriptionPct: number;
  renewalSubscriptionPct: number;
  line1HeadPct: number;
  line2HeadPct: number;
  monthlyTarget: number;
  yearlyTarget: number;
  assignedPartners: number;
}

/* ── Numeric Spinner ── */
const NumField = ({ label, sublabel, value, onChange, max = 100000 }: {
  label: string; sublabel?: string; value: number;
  onChange: (v: number) => void; max?: number;
}) => (
  <div className="space-y-1.5">
    <label className="text-[13px] font-medium text-gray-700">{label}</label>
    <div className="relative">
      <input type="number" min={0} max={max} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 pr-8 bg-white"
      />
      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
        <button type="button" onClick={() => onChange(value + 1)} className="text-gray-400 hover:text-gray-600 text-[9px] leading-none">▲</button>
        <button type="button" onClick={() => onChange(Math.max(0, value - 1))} className="text-gray-400 hover:text-gray-600 text-[9px] leading-none">▼</button>
      </div>
    </div>
    {sublabel && <p className="text-[11px] text-gray-400">{sublabel}</p>}
  </div>
);

let nextId = 4;

const defaultTemplates: CommissionTemplate[] = [
  {
    id: "t1", name: "Starter Plan",
    startDate: "2026-01-15", endDate: "2026-12-31",
    newSubscriptionPct: 5, renewalSubscriptionPct: 3,
    line1HeadPct: 0, line2HeadPct: 0,
    monthlyTarget: 5, yearlyTarget: 60,
    assignedPartners: 4,
  },
  {
    id: "t2", name: "Growth Plan",
    startDate: "2026-01-15", endDate: "2026-12-31",
    newSubscriptionPct: 10, renewalSubscriptionPct: 5,
    line1HeadPct: 1, line2HeadPct: 0,
    monthlyTarget: 10, yearlyTarget: 120,
    assignedPartners: 2,
  },
  {
    id: "t3", name: "Gold Plan Q2",
    startDate: "2026-04-01", endDate: "2026-12-31",
    newSubscriptionPct: 15, renewalSubscriptionPct: 8,
    line1HeadPct: 2, line2HeadPct: 1,
    monthlyTarget: 20, yearlyTarget: 200,
    assignedPartners: 1,
  },
];

const BLANK_FORM = {
  name: "Platinum Partner Plan", startDate: "2026-06-01", endDate: "2026-12-31",
  newSub: 12, renewalSub: 6, l1: 3, l2: 1,
  monthlyTarget: 15, yearlyTarget: 150,
};

const Commissions = () => {
  const [templates, setTemplates] = useState<CommissionTemplate[]>(defaultTemplates);
  const [showDialog, setShowDialog] = useState(false);
  const [bonusAmount, setBonusAmount] = useState(20);
  const [bonusSaved, setBonusSaved] = useState(true);

  const [f, setF] = useState(BLANK_FORM);
  const upd = (k: keyof typeof BLANK_FORM, v: string | number) => setF(p => ({ ...p, [k]: v }));

  const openDialog = () => { setF(BLANK_FORM); setShowDialog(true); };

  const handleCreate = () => {
    if (!f.name.trim()) { toast.error("Template name is required"); return; }
    setTemplates(prev => [...prev, {
      id: `t${nextId++}`, name: f.name.trim(),
      startDate: f.startDate, endDate: f.endDate,
      newSubscriptionPct: f.newSub, renewalSubscriptionPct: f.renewalSub,
      line1HeadPct: f.l1, line2HeadPct: f.l2,
      monthlyTarget: f.monthlyTarget, yearlyTarget: f.yearlyTarget,
      assignedPartners: 0,
    }]);
    toast.success("Template created", { description: f.name });
    setShowDialog(false);
  };

  const handleDelete = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    toast.success("Template deleted");
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white min-h-screen relative">

      {/* Header */}
      <div className="px-8 pt-8 pb-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Commission Module</h1>
          <p className="text-sm text-gray-500 mt-0.5">Create commission templates and assign to partners</p>
        </div>
        <Button onClick={openDialog} className="gap-1.5 bg-primary hover:bg-primary/90 text-white">
          <Plus size={16} /> Create Template
        </Button>
      </div>

      {/* Bonus Config */}
      <div className="px-8 pb-6">
        <Card className="border border-gray-100 shadow-none rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <IndianRupee size={17} className="text-gray-600" />
                <span className="text-sm font-semibold text-gray-800">Agent Referral Bonus Configuration</span>
              </div>
              <button className="text-sm text-primary font-medium hover:underline">Global Setting</button>
            </div>
            <div className="flex items-end gap-3">
              <div className="flex-1 max-w-[500px] space-y-1.5">
                <label className="text-[11px] font-semibold tracking-widest text-gray-500 uppercase">Bonus Amount (₹)</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2"><IndianRupee size={14} className="text-gray-400" /></div>
                  <input type="number" min={0} value={bonusAmount}
                    onChange={(e) => { setBonusAmount(parseFloat(e.target.value) || 0); setBonusSaved(false); }}
                    className="w-full h-10 border border-gray-200 rounded-lg pl-8 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                  />
                  <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                    <button type="button" onClick={() => { setBonusAmount(b => b + 1); setBonusSaved(false); }} className="text-gray-400 hover:text-gray-600 text-[9px] leading-none">▲</button>
                    <button type="button" onClick={() => { setBonusAmount(b => Math.max(0, b - 1)); setBonusSaved(false); }} className="text-gray-400 hover:text-gray-600 text-[9px] leading-none">▼</button>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400">This amount will be awarded to agents for every successful partner referral.</p>
              </div>
              <div className="flex items-center gap-2 pb-6">
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                <Button onClick={() => { setBonusSaved(true); toast.success("Bonus saved"); }} disabled={bonusSaved}
                  className={cn("gap-1.5 px-4 text-sm", bonusSaved ? "bg-primary/70 cursor-default" : "bg-primary hover:bg-primary/90")}>
                  <RefreshCw size={14} /> Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Template Cards */}
      <div className="px-8 pb-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {templates.length === 0 ? (
          <div className="col-span-3 text-center py-16 text-gray-400">
            <IndianRupee size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No templates yet.</p>
            <button onClick={openDialog} className="mt-3 text-primary text-sm font-medium hover:underline">Create your first template →</button>
          </div>
        ) : (
          templates.map((t) => (
            <TemplateCard key={t.id} template={t} onDelete={handleDelete} />
          ))
        )}
      </div>

      {/* ── Create Template Popup ── */}
      {showDialog && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px]" onClick={() => setShowDialog(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

              {/* Dialog Header */}
              <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Create Commission Template</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Define commission rates and targets</p>
                </div>
                <button onClick={() => setShowDialog(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Dialog Body */}
              <div className="overflow-y-auto flex-1 px-6 py-6 space-y-8">

                {/* Template Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900">Template Details</h3>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-medium text-gray-700">Template Name</label>
                      <input type="text" value={f.name} onChange={(e) => upd("name", e.target.value)}
                        placeholder="e.g. Gold Plan Q2 2026"
                        className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-gray-700">Start Date</label>
                        <input type="date" value={f.startDate} onChange={(e) => upd("startDate", e.target.value)}
                          className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-gray-700">End Date</label>
                        <input type="date" value={f.endDate} onChange={(e) => upd("endDate", e.target.value)}
                          className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subscription Commission */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-primary" />
                    <h3 className="text-sm font-semibold text-gray-900">Subscription Commission</h3>
                  </div>
                  <p className="text-xs text-gray-500 -mt-2">Commission rates for new and renewed subscriptions</p>
                  <div className="grid grid-cols-2 gap-4">
                    <NumField label="New Subscription %" sublabel="On every fresh temple onboarding" value={f.newSub} onChange={v => upd("newSub", v)} />
                    <NumField label="Renewal Subscription %" sublabel="Commission on recurring subscription revenue" value={f.renewalSub} onChange={v => upd("renewalSub", v)} />
                    <NumField label="Line 1 Head %" value={f.l1} onChange={v => upd("l1", v)} />
                    <NumField label="Line 2 Head %" value={f.l2} onChange={v => upd("l2", v)} />
                  </div>
                </div>

                {/* Targets */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target size={13} className="text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">Targets</h3>
                  </div>
                  <p className="text-xs text-gray-500 -mt-2">Set temple onboarding target counts</p>
                  <div className="grid grid-cols-2 gap-4">
                    <NumField label="Monthly Target (Count)" value={f.monthlyTarget} onChange={v => upd("monthlyTarget", v)} max={9999} />
                    <NumField label="Yearly Target (Count)" value={f.yearlyTarget} onChange={v => upd("yearlyTarget", v)} max={9999} />
                  </div>
                </div>

              </div>

              {/* Dialog Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/60">
                <Button variant="outline" onClick={() => setShowDialog(false)} className="px-5 border-gray-200 text-gray-700 hover:bg-gray-100">Cancel</Button>
                <Button onClick={handleCreate} className="px-5 bg-primary hover:bg-primary/90 text-white">Create Template</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/* ── Template Card ── */
const TemplateCard = ({ template: t, onDelete }: { template: CommissionTemplate; onDelete: (id: string) => void }) => {
  return (
    <Card className="border border-gray-100 shadow-none rounded-xl hover:shadow-sm transition-shadow flex flex-col">
      <CardContent className="p-5 flex flex-col flex-1">

        {/* Name */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-base font-bold text-gray-900">{t.name}</h3>
        </div>

        {/* Date */}
        {(t.startDate || t.endDate) && (
          <p className="text-xs text-gray-400 mb-4">{t.startDate} · {t.endDate}</p>
        )}

        {/* Commission rates */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold text-primary mb-2 uppercase tracking-wide">Subscription Commission</p>
          <div className="space-y-2">
            {[
              { label: "New Subscription", val: `${t.newSubscriptionPct}%` },
              { label: "Renewal Subscription", val: `${t.renewalSubscriptionPct}%` },
              { label: "Line 1 Head", val: `${t.line1HeadPct}%` },
              { label: "Line 2 Head", val: `${t.line2HeadPct}%` },
            ].map(c => (
              <div key={c.label} className="flex justify-between">
                <span className="text-xs text-gray-500">{c.label}</span>
                <span className="text-xs font-semibold text-gray-900">{c.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <Badge variant="outline" className="text-[11px] text-primary border-primary/30 bg-primary/5 gap-1 py-1 px-2">
            <Users size={10} />
            {t.assignedPartners} partner{t.assignedPartners !== 1 ? "s" : ""} assigned
          </Badge>
          <button onClick={() => onDelete(t.id)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Commissions;
