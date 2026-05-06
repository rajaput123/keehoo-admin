import { useState } from "react";
import {
  Plus, Pencil, Trash2, Users, CheckCircle, IndianRupee, UserPlus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export interface CommissionTemplate {
  id: string;
  name: string;
  perTemple: number; // ₹ earned per successful temple onboarding
  l1Percent: number;
  l2Percent: number;
}

export interface CommissionAssignment {
  partnerId: string;
  templateId: string | null;
  customPerTemple?: number;
  customL1?: number;
  customL2?: number;
}

let nextId = 4;

const defaultTemplates: CommissionTemplate[] = [
  { id: "t1", name: "Starter Plan", perTemple: 500, l1Percent: 1, l2Percent: 0.5 },
  { id: "t2", name: "Growth Plan", perTemple: 1000, l1Percent: 2, l2Percent: 1 },
  { id: "t3", name: "Premium Plan", perTemple: 2000, l1Percent: 3, l2Percent: 1.5 },
];

const defaultAssignments: CommissionAssignment[] = [
  { partnerId: "p1", templateId: "t3" },
  { partnerId: "p2", templateId: "t2" },
];

const PartnerCommissions = () => {
  const activePartners = mockPartners.filter((p) => p.status === "Active");

  const [templates, setTemplates] = useState<CommissionTemplate[]>(defaultTemplates);
  const [assignments, setAssignments] = useState<CommissionAssignment[]>(defaultAssignments);

  // Template dialog
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<CommissionTemplate | null>(null);
  const [formName, setFormName] = useState("");
  const [formPerTemple, setFormPerTemple] = useState("");
  const [formL1, setFormL1] = useState("");
  const [formL2, setFormL2] = useState("");

  // Assign dialog
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [assignPartnerId, setAssignPartnerId] = useState("");
  const [assignMode, setAssignMode] = useState<"template" | "individual">("template");
  const [assignTemplateId, setAssignTemplateId] = useState("");
  const [indPerTemple, setIndPerTemple] = useState("");
  const [indL1, setIndL1] = useState("");
  const [indL2, setIndL2] = useState("");

  const getTemplate = (id: string) => templates.find((t) => t.id === id);
  const getAssignment = (partnerId: string) => assignments.find((a) => a.partnerId === partnerId);

  const getEffective = (a: CommissionAssignment) => {
    if (a.templateId) {
      const t = getTemplate(a.templateId);
      return t ? { perTemple: t.perTemple, l1: t.l1Percent, l2: t.l2Percent, planName: t.name } : null;
    }
    return { perTemple: a.customPerTemple || 0, l1: a.customL1 || 0, l2: a.customL2 || 0, planName: "Individual" };
  };

  // ── Template CRUD ──
  const openCreateTemplate = () => {
    setEditingTemplate(null);
    setFormName(""); setFormPerTemple(""); setFormL1("2"); setFormL2("1");
    setShowTemplateDialog(true);
  };

  const openEditTemplate = (t: CommissionTemplate) => {
    setEditingTemplate(t);
    setFormName(t.name); setFormPerTemple(String(t.perTemple)); setFormL1(String(t.l1Percent)); setFormL2(String(t.l2Percent));
    setShowTemplateDialog(true);
  };

  const handleSaveTemplate = () => {
    if (!formName.trim()) { toast.error("Plan name is required"); return; }
    const perTemple = parseFloat(formPerTemple) || 0;
    const l1 = parseFloat(formL1) || 0;
    const l2 = parseFloat(formL2) || 0;

    if (editingTemplate) {
      setTemplates((prev) => prev.map((t) => t.id === editingTemplate.id ? { ...t, name: formName, perTemple, l1Percent: l1, l2Percent: l2 } : t));
      toast.success("Plan updated");
    } else {
      setTemplates((prev) => [...prev, { id: `t${nextId++}`, name: formName, perTemple, l1Percent: l1, l2Percent: l2 }]);
      toast.success("Plan created", { description: formName });
    }
    setShowTemplateDialog(false);
  };

  const handleDeleteTemplate = (id: string) => {
    if (assignments.some((a) => a.templateId === id)) { toast.error("Cannot delete — plan is assigned to partners"); return; }
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    toast.success("Plan deleted");
  };

  // ── Assignment ──
  const openAssignDialog = (partnerId?: string) => {
    setAssignPartnerId(partnerId || activePartners[0]?.id || "");
    setAssignMode("template");
    setAssignTemplateId(templates[0]?.id || "");
    setIndPerTemple(""); setIndL1("2"); setIndL2("1");

    if (partnerId) {
      const existing = getAssignment(partnerId);
      if (existing) {
        if (existing.templateId) {
          setAssignMode("template");
          setAssignTemplateId(existing.templateId);
        } else {
          setAssignMode("individual");
          setIndPerTemple(String(existing.customPerTemple || ""));
          setIndL1(String(existing.customL1 || ""));
          setIndL2(String(existing.customL2 || ""));
        }
      }
    }
    setShowAssignDialog(true);
  };

  const handleAssign = () => {
    if (!assignPartnerId) { toast.error("Select a partner"); return; }

    const newAssignment: CommissionAssignment = assignMode === "template"
      ? { partnerId: assignPartnerId, templateId: assignTemplateId }
      : { partnerId: assignPartnerId, templateId: null, customPerTemple: parseFloat(indPerTemple) || 0, customL1: parseFloat(indL1) || 0, customL2: parseFloat(indL2) || 0 };

    setAssignments((prev) => {
      const filtered = prev.filter((a) => a.partnerId !== assignPartnerId);
      return [...filtered, newAssignment];
    });

    const pName = mockPartners.find((p) => p.id === assignPartnerId)?.fullName;
    const label = assignMode === "template" ? getTemplate(assignTemplateId)?.name : "Individual Plan";
    setShowAssignDialog(false);
    toast.success("Plan assigned", { description: `${label} → ${pName}` });
  };

  const handleRemoveAssignment = (partnerId: string) => {
    setAssignments((prev) => prev.filter((a) => a.partnerId !== partnerId));
    toast.success("Assignment removed");
  };

  const assignedCount = assignments.length;

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-2xl font-semibold text-foreground">Commission Module</h1>
        <p className="text-sm text-muted-foreground mt-1">Create commission templates and assign to partners</p>
      </div>

      {/* Summary */}
      <div className="px-8 pb-4 grid grid-cols-2 gap-4">
        <Card><CardContent className="pt-4 pb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted/50 text-primary"><IndianRupee size={18} /></div>
          <div><p className="text-xs text-muted-foreground">Templates</p><p className="text-lg font-bold text-foreground">{templates.length}</p></div>
        </CardContent></Card>
        <Card><CardContent className="pt-4 pb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted/50 text-status-success"><CheckCircle size={18} /></div>
          <div><p className="text-xs text-muted-foreground">Assigned</p><p className="text-lg font-bold text-foreground">{assignedCount} / {activePartners.length}</p></div>
        </CardContent></Card>
      </div>

      {/* Tabs */}
      <div className="px-8 flex-1 pb-8">
        <Tabs defaultValue="templates" className="space-y-5">
          <TabsList>
            <TabsTrigger value="templates">Commission Templates</TabsTrigger>
            <TabsTrigger value="assignments">Partner Assignments</TabsTrigger>
          </TabsList>

          {/* ── Templates Tab ── */}
          <TabsContent value="templates" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={openCreateTemplate} className="gap-1.5">
                <Plus size={16} /> Create Template
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((t) => {
                const usedBy = assignments.filter((a) => a.templateId === t.id).length;
                return (
                  <Card key={t.id}>
                    <CardContent className="pt-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-foreground">{t.name}</h3>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEditTemplate(t)}><Pencil size={12} /></Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => handleDeleteTemplate(t.id)}><Trash2 size={12} /></Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Per Temple</span>
                          <span className="font-semibold text-foreground">₹{t.perTemple.toLocaleString()}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-xs"><span className="text-muted-foreground">L1 Referral</span><span className="font-medium">{t.l1Percent}%</span></div>
                        <div className="flex justify-between text-xs"><span className="text-muted-foreground">L2 Referral</span><span className="font-medium">{t.l2Percent}%</span></div>
                      </div>
                      <Badge variant="outline" className="text-xs">{usedBy} partner{usedBy !== 1 ? "s" : ""} assigned</Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* ── Assignments Tab ── */}
          <TabsContent value="assignments" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => openAssignDialog()} className="gap-1.5">
                <UserPlus size={16} /> Assign Plan
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Partner</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Plan Type</TableHead>
                      <TableHead>Per Temple</TableHead>
                      <TableHead>L1 / L2 %</TableHead>
                      <TableHead className="w-20"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activePartners.map((p) => {
                      const assignment = getAssignment(p.id);
                      const eff = assignment ? getEffective(assignment) : null;
                      return (
                        <TableRow key={p.id}>
                          <TableCell>
                            <p className="text-sm font-medium text-foreground">{p.fullName}</p>
                            <p className="text-xs text-muted-foreground font-mono">{p.referralCode}</p>
                          </TableCell>
                          <TableCell className="text-sm">{p.city}</TableCell>
                          <TableCell>
                            {eff ? (
                              <Badge className={cn("border-0 text-xs", eff.planName === "Individual" ? "bg-status-pending/15 text-status-pending" : "bg-primary/10 text-primary")}>{eff.planName}</Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">Not assigned</span>
                            )}
                          </TableCell>
                          <TableCell className="text-sm font-medium">{eff ? `₹${eff.perTemple.toLocaleString()}` : "—"}</TableCell>
                          <TableCell className="text-sm">{eff ? `${eff.l1}% / ${eff.l2}%` : "—"}</TableCell>
                          <TableCell>
                            {assignment ? (
                              <div className="flex gap-1">
                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openAssignDialog(p.id)}><Pencil size={12} /></Button>
                                <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => handleRemoveAssignment(p.id)}><Trash2 size={12} /></Button>
                              </div>
                            ) : (
                              <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => openAssignDialog(p.id)}>Assign</Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create/Edit Template Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingTemplate ? "Edit Template" : "Create Commission Template"}</DialogTitle>
            <DialogDescription>Define per-temple payout and referral commission rates</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Template Name</label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Gold Plan" className="text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Per Temple Payout (₹)</label>
              <Input type="number" min={0} value={formPerTemple} onChange={(e) => setFormPerTemple(e.target.value)} placeholder="e.g. 1000" className="text-sm" />
              <p className="text-xs text-muted-foreground">Amount earned for each successful temple onboarding</p>
            </div>
            <Separator />
            <p className="text-xs font-medium text-muted-foreground">Referral Commission Rates (%)</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><label className="text-xs text-muted-foreground">L1</label><Input type="number" min={0} max={100} value={formL1} onChange={(e) => setFormL1(e.target.value)} className="text-sm" /></div>
              <div className="space-y-1"><label className="text-xs text-muted-foreground">L2</label><Input type="number" min={0} max={100} value={formL2} onChange={(e) => setFormL2(e.target.value)} className="text-sm" /></div>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowTemplateDialog(false)}>Cancel</Button><Button onClick={handleSaveTemplate}>{editingTemplate ? "Update" : "Create"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Plan Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Commission</DialogTitle>
            <DialogDescription>Use a template or set an individual plan</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Partner</label>
              <Select value={assignPartnerId} onValueChange={setAssignPartnerId}>
                <SelectTrigger className="text-sm"><SelectValue placeholder="Select partner" /></SelectTrigger>
                <SelectContent>
                  {activePartners.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.fullName} — {p.city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Mode toggle */}
            <div className="flex gap-2">
              <Button size="sm" variant={assignMode === "template" ? "default" : "outline"} className="flex-1 text-xs" onClick={() => setAssignMode("template")}>
                Use Template
              </Button>
              <Button size="sm" variant={assignMode === "individual" ? "default" : "outline"} className="flex-1 text-xs" onClick={() => setAssignMode("individual")}>
                Individual Plan
              </Button>
            </div>

            {assignMode === "template" ? (
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Commission Template</label>
                <Select value={assignTemplateId} onValueChange={setAssignTemplateId}>
                  <SelectTrigger className="text-sm"><SelectValue placeholder="Select template" /></SelectTrigger>
                  <SelectContent>
                    {templates.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.name} — ₹{t.perTemple.toLocaleString()}/temple</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Per Temple Payout (₹)</label>
                  <Input type="number" min={0} value={indPerTemple} onChange={(e) => setIndPerTemple(e.target.value)} placeholder="e.g. 1500" className="text-sm" />
                </div>
                <p className="text-xs font-medium text-muted-foreground">Referral Commission Rates (%)</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1"><label className="text-xs text-muted-foreground">L1</label><Input type="number" min={0} max={100} value={indL1} onChange={(e) => setIndL1(e.target.value)} className="text-sm" /></div>
                  <div className="space-y-1"><label className="text-xs text-muted-foreground">L2</label><Input type="number" min={0} max={100} value={indL2} onChange={(e) => setIndL2(e.target.value)} className="text-sm" /></div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowAssignDialog(false)}>Cancel</Button><Button onClick={handleAssign}>Assign</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartnerCommissions;
