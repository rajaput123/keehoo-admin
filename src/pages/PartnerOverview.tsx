import { useState } from "react";
import { Users, Building2, DollarSign, Link2, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  mockPartners, mockTemples, mockTransactions, defaultCommissionConfig,
  type CommissionConfig
} from "@/data/partnerEcosystemData";

const PartnerOverview = () => {
  const [commissionConfig, setCommissionConfig] = useState<CommissionConfig>(defaultCommissionConfig);
  const [showCommissionConfig, setShowCommissionConfig] = useState(false);

  const activePartners = mockPartners.filter(p => p.status === "Active").length;
  const pendingPartners = mockPartners.filter(p => p.status === "Pending Review").length;
  const totalTemples = mockTemples.filter(t => t.directPartnerId).length;
  const unassignedTemples = mockTemples.filter(t => !t.directPartnerId).length;
  const totalCommissions = mockTransactions.reduce((s, t) => s + (t.adjustedAmount ?? t.amount), 0);
  const totalRevenue = mockTemples.reduce((s, t) => s + t.monthlyRevenue, 0);
  const avgAchievement = Math.round(mockPartners.filter(p => p.status === "Active").reduce((s, p) => s + p.achievementPercent, 0) / activePartners);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="px-8 pt-8 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Partner Ecosystem</h1>
          <p className="text-sm text-muted-foreground mt-1">Overview of partners, temples & commissions</p>
        </div>
        <Button size="sm" variant="outline" onClick={() => setShowCommissionConfig(true)} className="gap-2">
          <Settings size={14} /> Commission Config
        </Button>
      </div>

      <div className="flex-1 px-8 py-5 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-status-success/10 flex items-center justify-center">
                  <Users size={20} className="text-status-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{activePartners}</p>
                  <p className="text-xs text-muted-foreground">Active Partners</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalTemples}</p>
                  <p className="text-xs text-muted-foreground">Mapped Temples</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-status-progress/10 flex items-center justify-center">
                  <Link2 size={20} className="text-status-progress" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{unassignedTemples}</p>
                  <p className="text-xs text-muted-foreground">Unassigned Temples</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-status-pending/10 flex items-center justify-center">
                  <DollarSign size={20} className="text-status-pending" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">₹{(totalCommissions / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">Total Commissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Partner Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Active</span><span className="font-medium text-foreground">{activePartners}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Pending Review</span><span className="font-medium text-status-progress">{pendingPartners}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Rejected</span><span className="font-medium text-status-rejected">{mockPartners.filter(p => p.status === "Rejected").length}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Avg Achievement</span><span className="font-medium text-foreground">{avgAchievement}%</span></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Temple Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-medium text-foreground">{mockTemples.length}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Mapped</span><span className="font-medium text-status-success">{totalTemples}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Unassigned</span><span className="font-medium text-status-progress">{unassignedTemples}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Monthly Revenue</span><span className="font-medium text-foreground">₹{(totalRevenue / 1000).toFixed(0)}K</span></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Commission Rates</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Direct</span><span className="font-medium text-foreground">{commissionConfig.directPercent}%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">L1 Referral</span><span className="font-medium text-foreground">{commissionConfig.l1Percent}%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">L2 Referral</span><span className="font-medium text-foreground">{commissionConfig.l2Percent}%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Renewal (Direct)</span><span className="font-medium text-foreground">{commissionConfig.renewalDirectPercent}%</span></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Partners */}
        <Card>
          <CardContent className="p-5">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Top Partners by Earnings</h3>
            <div className="space-y-2">
              {[...mockPartners].filter(p => p.status === "Active").sort((a, b) => b.totalEarnings - a.totalEarnings).slice(0, 5).map((p, i) => (
                <div key={p.id} className="flex items-center justify-between py-2 px-3 rounded bg-muted/50">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-5">#{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{p.fullName}</p>
                      <p className="text-xs text-muted-foreground">{p.city} · {p.templesOnboarded} temples</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-foreground">₹{p.totalEarnings.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission Config Dialog */}
      <Dialog open={showCommissionConfig} onOpenChange={setShowCommissionConfig}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Commission Configuration</DialogTitle>
            <DialogDescription>Set default commission rates for all levels</DialogDescription>
          </DialogHeader>
          <CommissionConfigForm config={commissionConfig} onSave={c => { setCommissionConfig(c); setShowCommissionConfig(false); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const CommissionConfigForm = ({ config, onSave }: { config: CommissionConfig; onSave: (c: CommissionConfig) => void }) => {
  const [form, setForm] = useState(config);
  const update = (key: keyof CommissionConfig, val: string) => setForm(prev => ({ ...prev, [key]: parseFloat(val) || 0 }));

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-foreground mb-2">New Subscription</h4>
        <div className="grid grid-cols-3 gap-3">
          <div><label className="text-xs text-muted-foreground">Direct %</label><Input type="number" value={form.directPercent} onChange={e => update("directPercent", e.target.value)} className="h-9 text-sm" /></div>
          <div><label className="text-xs text-muted-foreground">L1 %</label><Input type="number" value={form.l1Percent} onChange={e => update("l1Percent", e.target.value)} className="h-9 text-sm" /></div>
          <div><label className="text-xs text-muted-foreground">L2 %</label><Input type="number" value={form.l2Percent} onChange={e => update("l2Percent", e.target.value)} className="h-9 text-sm" /></div>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-foreground mb-2">Renewal</h4>
        <div className="grid grid-cols-3 gap-3">
          <div><label className="text-xs text-muted-foreground">Direct %</label><Input type="number" value={form.renewalDirectPercent} onChange={e => update("renewalDirectPercent", e.target.value)} className="h-9 text-sm" /></div>
          <div><label className="text-xs text-muted-foreground">L1 %</label><Input type="number" value={form.renewalL1Percent} onChange={e => update("renewalL1Percent", e.target.value)} className="h-9 text-sm" /></div>
          <div><label className="text-xs text-muted-foreground">L2 %</label><Input type="number" value={form.renewalL2Percent} onChange={e => update("renewalL2Percent", e.target.value)} className="h-9 text-sm" /></div>
        </div>
      </div>
      <Button className="w-full" onClick={() => onSave(form)}>Save Configuration</Button>
    </div>
  );
};

export default PartnerOverview;
