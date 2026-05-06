import { useState } from "react";
import { Target, Pencil, Plus, CheckCircle, Copy, Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { mockPartners } from "@/data/partnerEcosystemData";

export interface PartnerTarget {
  partnerId: string;
  monthly: number;
  monthlyActual: number;
}

const defaultTargets: PartnerTarget[] = [
  { partnerId: "p1", monthly: 30, monthlyActual: 28 },
  { partnerId: "p2", monthly: 20, monthlyActual: 14 },
];

const PartnerTargets = () => {
  const activePartners = mockPartners.filter((p) => p.status === "Active");
  const [targets, setTargets] = useState<PartnerTarget[]>(defaultTargets);

  const [showDialog, setShowDialog] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [formMonthly, setFormMonthly] = useState("");

  const getTarget = (id: string) => targets.find((t) => t.partnerId === id);

  const openSetTarget = (partnerId?: string) => {
    const pid = partnerId || activePartners[0]?.id || "";
    setSelectedPartnerId(pid);
    const existing = getTarget(pid);
    setFormMonthly(existing ? String(existing.monthly) : "");
    setShowDialog(true);
  };

  const handleSave = () => {
    const monthly = parseInt(formMonthly) || 0;
    if (monthly <= 0) { toast.error("Enter a valid monthly target"); return; }

    setTargets((prev) => {
      const exists = prev.find((t) => t.partnerId === selectedPartnerId);
      if (exists) {
        return prev.map((t) => t.partnerId === selectedPartnerId ? { ...t, monthly } : t);
      }
      return [...prev, { partnerId: selectedPartnerId, monthly, monthlyActual: 0 }];
    });

    const name = mockPartners.find((p) => p.id === selectedPartnerId)?.fullName;
    setShowDialog(false);
    toast.success("Targets updated", { description: `${name}: ${monthly}/month` });
  };

  const assignedCount = targets.length;

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="px-8 pt-8 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Target Assignment</h1>
          <p className="text-sm text-muted-foreground mt-1">Set monthly targets for each partner</p>
        </div>
        <Button onClick={() => openSetTarget()} className="gap-1.5">
          <Plus size={16} /> Assign Target
        </Button>
      </div>

      <div className="px-8 py-4 grid grid-cols-3 gap-4">
        <Card><CardContent className="pt-4 pb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted/50 text-primary"><Target size={18} /></div>
          <div><p className="text-xs text-muted-foreground">Targets Assigned</p><p className="text-lg font-bold text-foreground">{assignedCount} / {activePartners.length}</p></div>
        </CardContent></Card>
        <Card><CardContent className="pt-4 pb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted/50 text-status-success"><CheckCircle size={18} /></div>
          <div><p className="text-xs text-muted-foreground">On Track (≥70%)</p><p className="text-lg font-bold text-foreground">{targets.filter((t) => t.monthly > 0 && (t.monthlyActual / t.monthly) >= 0.7).length}</p></div>
        </CardContent></Card>
        <Card><CardContent className="pt-4 pb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted/50 text-status-rejected"><Target size={18} /></div>
          <div><p className="text-xs text-muted-foreground">Below Target</p><p className="text-lg font-bold text-foreground">{targets.filter((t) => t.monthly > 0 && (t.monthlyActual / t.monthly) < 0.7).length}</p></div>
        </CardContent></Card>
      </div>

      <div className="px-8 py-2 flex-1">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Referral Code</TableHead>
                  <TableHead className="text-center">Monthly Target</TableHead>
                  <TableHead className="text-center">Achievement</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activePartners.map((p) => {
                  const t = getTarget(p.id);
                  const monthlyPct = t && t.monthly > 0 ? Math.round((t.monthlyActual / t.monthly) * 100) : 0;
                  return (
                    <TableRow key={p.id}>
                      <TableCell>
                        <p className="text-sm font-medium text-foreground">{p.fullName}</p>
                        <p className="text-xs text-muted-foreground">{p.city}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <code className="text-xs bg-muted/60 px-2 py-0.5 rounded font-mono text-foreground">{p.referralCode}</code>
                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => { navigator.clipboard.writeText(p.referralCode); toast.success("Code copied!"); }}>
                            <Copy size={11} />
                          </Button>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{p.templesOnboarded} temples registered</p>
                      </TableCell>
                      <TableCell className="text-center">
                        {t ? (
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{t.monthlyActual} / {t.monthly}</p>
                            <Progress value={Math.min(monthlyPct, 100)} className="h-1 mx-auto max-w-[60px]" />
                          </div>
                        ) : <span className="text-xs text-muted-foreground">—</span>}
                      </TableCell>
                      <TableCell className="text-center">
                        {t ? (
                          <Badge className={cn("border-0 text-xs",
                            monthlyPct >= 100 ? "bg-status-success/15 text-status-success" :
                            monthlyPct >= 70 ? "bg-status-progress/15 text-status-progress" :
                            "bg-status-rejected/15 text-status-rejected"
                          )}>{monthlyPct}%</Badge>
                        ) : <span className="text-xs text-muted-foreground">Not set</span>}
                      </TableCell>
                      <TableCell>
                        {t ? (
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openSetTarget(p.id)}><Pencil size={12} /></Button>
                        ) : (
                          <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => openSetTarget(p.id)}>Set</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Set Targets</DialogTitle>
            <DialogDescription>Set monthly temple onboarding target</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Partner</label>
              <Select value={selectedPartnerId} onValueChange={(v) => { setSelectedPartnerId(v); const e = getTarget(v); setFormMonthly(e ? String(e.monthly) : ""); }}>
                <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {activePartners.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.fullName} — {p.city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPartnerId && (() => {
              const partner = mockPartners.find(p => p.id === selectedPartnerId);
              if (!partner) return null;
              return (
                <div className="p-3 rounded-lg border border-border bg-muted/30 space-y-2">
                  <div className="flex items-center gap-2">
                    <Link size={14} className="text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">Referral Code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded">{partner.referralCode}</code>
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => { navigator.clipboard.writeText(partner.referralCode); toast.success("Code copied!"); }}>
                      <Copy size={12} />
                    </Button>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    When a temple registers using this code, it counts toward the target and triggers commission payout to the partner's account.
                  </p>
                </div>
              );
            })()}

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Monthly Target (temples)</label>
              <Input type="number" min={1} value={formMonthly} onChange={(e) => setFormMonthly(e.target.value)} placeholder="e.g. 30" className="text-sm" />
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button><Button onClick={handleSave}>Save Targets</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartnerTargets;
