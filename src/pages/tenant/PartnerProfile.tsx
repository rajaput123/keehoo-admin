import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft, Phone, Mail, MapPin, User, CheckCircle, XCircle, IndianRupee,
  Briefcase, Hash, Shield, CreditCard, Building, Calendar,
  Clock, Target, ChevronDown, Pencil, Percent, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  mockPartners, mockTemples, getPartnerTemples,
  type PartnerChain, type PartnerStatus
} from "@/data/partnerEcosystemData";

type InterviewStatus = "Pending" | "Scheduled" | "Completed";
type InterviewMode = "Phone" | "Office";

interface InterviewData {
  status: InterviewStatus;
  date?: string;
  time?: string;
  mode?: InterviewMode;
  notes: string;
}

const statusColors: Record<PartnerStatus, string> = {
  "Pending Review": "bg-status-progress/15 text-status-progress",
  Active: "bg-status-success/15 text-status-success",
  Suspended: "bg-status-pending/15 text-status-pending",
  Rejected: "bg-status-rejected/15 text-status-rejected",
};

const interviewStatusColors: Record<InterviewStatus, string> = {
  Pending: "bg-status-pending/15 text-status-pending",
  Scheduled: "bg-status-progress/15 text-status-progress",
  Completed: "bg-status-success/15 text-status-success",
};

const PartnerProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const partnerData = mockPartners.find((p) => p.id === id);

  const [partner, setPartner] = useState<PartnerChain | null>(partnerData || null);
  const [interview, setInterview] = useState<InterviewData>({ status: "Pending", notes: "" });
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [scheduleMode, setScheduleMode] = useState<InterviewMode>("Phone");
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [decisionNotes, setDecisionNotes] = useState("");

  if (!partner) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Partner not found</p>
      </div>
    );
  }

  const isActive = partner.status === "Active";
  const isPending = partner.status === "Pending Review";
  const chain = getPartnerChain(partner.id, mockPartners);
  const myTemples = getPartnerTemples(partner.id, mockTemples);
  const referred = getReferredPartners(partner.id, mockPartners);
  const canDecide = partner.status === "Pending Review" || (partner.status !== "Active" && partner.status !== "Rejected");

  const handleScheduleInterview = () => {
    if (!scheduleDate || !scheduleTime) { toast.error("Please fill in both date and time"); return; }
    setInterview({ status: "Scheduled", date: scheduleDate, time: scheduleTime, mode: scheduleMode, notes: interview.notes });
    setShowScheduleDialog(false);
    toast.success("Interview scheduled", { description: `${partner.fullName} — ${scheduleDate} at ${scheduleTime} (${scheduleMode})` });
  };

  const handleCompleteInterview = () => {
    setInterview((prev) => ({ ...prev, status: "Completed" }));
    toast.success("Interview marked as completed");
  };

  const handleApprove = () => {
    setPartner((prev) => prev ? { ...prev, status: "Active" as PartnerStatus, approvedDate: new Date().toISOString().split("T")[0] } : prev);
    setShowApproveDialog(false);
    toast.success("Partner approved & activated", { description: `${partner.fullName} is now an active partner.` });
  };

  const handleReject = () => {
    setPartner((prev) => prev ? { ...prev, status: "Rejected" as PartnerStatus } : prev);
    setShowRejectDialog(false);
    toast.success("Partner application rejected");
  };


  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* ─── Compact Header ─── */}
      <div className="px-8 pt-5 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </Button>
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
            {partner.fullName.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-foreground truncate">{partner.fullName}</h1>
              <Badge className={cn("border-0 shrink-0", statusColors[partner.status])}>{partner.status}</Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
              <span>{partner.type}</span>
              <span>·</span>
              <span>{partner.experience}</span>
              <span>·</span>
              <span>{partner.city}</span>
              {isActive && (
                <>
                  <span>·</span>
                  <span className="font-mono">{partner.referralCode}</span>
                </>
              )}
            </div>
          </div>
          {canDecide && (
            <div className="flex items-center gap-2 shrink-0">
              <Button size="sm" onClick={() => setShowApproveDialog(true)} className="gap-1.5 bg-status-success hover:bg-status-success/90 text-white">
                <CheckCircle size={14} /> Approve
              </Button>
              <Button size="sm" variant="destructive" onClick={() => setShowRejectDialog(true)} className="gap-1.5">
                <XCircle size={14} /> Reject
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ─── Tabs ─── */}
      <div className="flex-1 px-8 py-5">
        <Tabs defaultValue="profile" className="space-y-5">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="documents">Bank & Documents</TabsTrigger>
            <TabsTrigger value="interview">Interview</TabsTrigger>
            <TabsTrigger value="commission">Commission & Earnings</TabsTrigger>
            <TabsTrigger value="chain">Chain View</TabsTrigger>
          </TabsList>

          {/* ── Profile Tab ── */}
          <TabsContent value="profile" className="space-y-5">
            <Card>
              <CardContent className="pt-5">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User size={15} className="text-primary" /> Basic Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { icon: User, label: "Full Name", value: partner.fullName },
                    { icon: Phone, label: "Phone", value: partner.phone },
                    { icon: Mail, label: "Email", value: partner.email },
                    { icon: MapPin, label: "City", value: partner.city },
                    { icon: Briefcase, label: "Type", value: partner.type },
                    { icon: Star, label: "Experience", value: partner.experience },
                    { icon: Calendar, label: "Applied Date", value: partner.joinedDate },
                  ].map((f) => (
                    <div key={f.label} className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <f.icon size={12} />
                        <span className="text-xs">{f.label}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">{f.value}</p>
                    </div>
                  ))}
                </div>

              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Bank & Documents Tab ── */}
          <TabsContent value="documents" className="space-y-5">
            <Card>
              <CardContent className="pt-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <CreditCard size={15} className="text-primary" /> KYC Status
                  </h3>
                  <Badge className={cn("border-0 text-xs", partner.kycStatus === "Verified" ? "bg-status-success/15 text-status-success" : partner.kycStatus === "Pending" ? "bg-status-progress/15 text-status-progress" : "bg-muted text-muted-foreground")}>
                    {partner.kycStatus}
                  </Badge>
                </div>

                {partner.kycStatus === "Verified" ? (
                  <>
                    <h4 className="text-xs font-medium text-muted-foreground mb-3">Documents</h4>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div className="p-3 rounded-lg bg-muted/50 space-y-0.5">
                        <span className="text-xs text-muted-foreground">PAN Card</span>
                        <p className="text-sm font-mono font-medium text-foreground">ABCDE1234F</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 space-y-0.5">
                        <span className="text-xs text-muted-foreground">Aadhaar</span>
                        <p className="text-sm font-mono font-medium text-foreground">••••••••5678</p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <h4 className="text-xs font-medium text-muted-foreground mb-3">Bank Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-muted/50 space-y-0.5">
                        <span className="text-xs text-muted-foreground">Bank Account</span>
                        <p className="text-sm font-mono font-medium text-foreground">••••••••1234</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 space-y-0.5">
                        <span className="text-xs text-muted-foreground">IFSC Code</span>
                        <p className="text-sm font-mono font-medium text-foreground">SBIN0001234</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 space-y-0.5">
                        <span className="text-xs text-muted-foreground">UPI ID</span>
                        <p className="text-sm font-medium text-foreground">{partner.email.split("@")[0]}@upi</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 space-y-0.5">
                        <span className="text-xs text-muted-foreground">Account Holder</span>
                        <p className="text-sm font-medium text-foreground">{partner.fullName}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-10">
                    <Shield size={32} className="mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">
                      {partner.kycStatus === "Pending" ? "Documents under review" : "Not yet submitted"}
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Bank details & documents will be collected when partner starts earning</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Interview Tab ── */}
          <TabsContent value="interview" className="space-y-5">
            <Card>
              <CardContent className="pt-5 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Calendar size={15} className="text-primary" /> Interview Management
                  </h3>
                  <Badge className={cn("border-0 text-xs", interviewStatusColors[interview.status])}>
                    {interview.status}
                  </Badge>
                </div>

                {interview.status === "Pending" && (
                  <div className="text-center py-6">
                    <Clock size={32} className="mx-auto text-muted-foreground/40 mb-2" />
                    <p className="text-sm text-muted-foreground">No interview scheduled yet</p>
                    <Button size="sm" variant="outline" className="mt-3 gap-1.5" onClick={() => setShowScheduleDialog(true)}>
                      <Calendar size={14} /> Schedule Now
                    </Button>
                  </div>
                )}

                {interview.status === "Scheduled" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="space-y-0.5"><span className="text-xs text-muted-foreground">Date</span><p className="text-sm font-medium text-foreground">{interview.date}</p></div>
                      <div className="space-y-0.5"><span className="text-xs text-muted-foreground">Time</span><p className="text-sm font-medium text-foreground">{interview.time}</p></div>
                      <div className="space-y-0.5"><span className="text-xs text-muted-foreground">Mode</span><Badge variant="outline" className="text-xs">{interview.mode === "Phone" ? "📞 Phone" : "🏢 Office"}</Badge></div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleCompleteInterview} className="gap-1.5"><CheckCircle size={14} /> Mark Completed</Button>
                      <Button size="sm" variant="outline" onClick={() => setShowScheduleDialog(true)} className="gap-1.5"><Pencil size={14} /> Reschedule</Button>
                    </div>
                  </div>
                )}

                {interview.status === "Completed" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="space-y-0.5"><span className="text-xs text-muted-foreground">Date</span><p className="text-sm font-medium text-foreground">{interview.date}</p></div>
                      <div className="space-y-0.5"><span className="text-xs text-muted-foreground">Time</span><p className="text-sm font-medium text-foreground">{interview.time}</p></div>
                      <div className="space-y-0.5"><span className="text-xs text-muted-foreground">Mode</span><Badge variant="outline" className="text-xs">{interview.mode === "Phone" ? "📞 Phone" : "🏢 Office"}</Badge></div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-status-success">
                      <CheckCircle size={14} /><span className="font-medium">Interview completed</span>
                    </div>
                  </div>
                )}

                <Separator />
                <div className="space-y-2">
                  <span className="text-xs font-medium text-muted-foreground">Interview Notes</span>
                  <Textarea value={interview.notes} onChange={(e) => setInterview((prev) => ({ ...prev, notes: e.target.value }))} placeholder="Add notes about the interview..." className="text-sm min-h-[100px]" />
                  <Button size="sm" variant="outline" onClick={() => toast.success("Notes saved")}>Save Notes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Targets & Salary Tab ── */}
          <TabsContent value="commission" className="space-y-5">
            {isActive ? (() => {
              // Simulated assigned commission plan for this partner
              const assignedPlan = partner.id === "p1"
                ? { name: "Premium Plan", perTemple: 2000, l1Percent: 3, l2Percent: 1.5 }
                : partner.id === "p2"
                ? { name: "Growth Plan", perTemple: 1000, l1Percent: 2, l2Percent: 1 }
                : null;

              const templeEarning = (assignedPlan?.perTemple || 0) * partner.templesOnboarded;
              const l1Earning = partner.l1Earnings || 0;
              const l2Earning = partner.l2Earnings || 0;
              const totalMonthlyEarning = templeEarning + l1Earning + l2Earning;

              return (
                <>
                  {/* Assigned Commission Plan */}
                  <Card>
                    <CardContent className="pt-5 space-y-4">
                      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Percent size={15} className="text-primary" /> Assigned Commission Plan
                      </h3>
                      {assignedPlan ? (
                        <div className="rounded-lg border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead><tr className="bg-muted/50 text-muted-foreground text-xs">
                              <th className="text-left px-4 py-2.5 font-medium">Detail</th>
                              <th className="text-right px-4 py-2.5 font-medium">Value</th>
                            </tr></thead>
                            <tbody className="divide-y divide-border">
                              <tr><td className="px-4 py-2.5 text-foreground">Plan Name</td><td className="px-4 py-2.5 text-right font-semibold text-primary">{assignedPlan.name}</td></tr>
                              <tr><td className="px-4 py-2.5 text-foreground">Per Temple Payout</td><td className="px-4 py-2.5 text-right font-medium text-foreground">₹{assignedPlan.perTemple.toLocaleString()}</td></tr>
                              <tr><td className="px-4 py-2.5 text-foreground">L1 Referral Commission</td><td className="px-4 py-2.5 text-right font-medium text-foreground">{assignedPlan.l1Percent}%</td></tr>
                              <tr><td className="px-4 py-2.5 text-foreground">L2 Referral Commission</td><td className="px-4 py-2.5 text-right font-medium text-foreground">{assignedPlan.l2Percent}%</td></tr>
                              <tr><td className="px-4 py-2.5 text-foreground">Referral Code</td><td className="px-4 py-2.5 text-right font-mono font-medium text-foreground">{partner.referralCode}</td></tr>
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground py-4 text-center">No commission plan assigned yet</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Earnings Breakdown */}
                  <Card>
                    <CardContent className="pt-5 space-y-4">
                      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <IndianRupee size={15} className="text-primary" /> Earnings Breakdown
                      </h3>
                      <div className="rounded-lg border border-border overflow-hidden">
                        <table className="w-full text-sm">
                          <thead><tr className="bg-muted/50 text-muted-foreground text-xs">
                            <th className="text-left px-4 py-2.5 font-medium">Source</th>
                            <th className="text-right px-4 py-2.5 font-medium">Amount</th>
                          </tr></thead>
                          <tbody className="divide-y divide-border">
                            <tr>
                              <td className="px-4 py-2.5 text-foreground">
                                <span>Temple Onboarding</span>
                                <span className="text-xs text-muted-foreground ml-1">({partner.templesOnboarded} × ₹{(assignedPlan?.perTemple || 0).toLocaleString()})</span>
                              </td>
                              <td className="px-4 py-2.5 text-right font-medium text-foreground">₹{templeEarning.toLocaleString()}</td>
                            </tr>
                            <tr><td className="px-4 py-2.5 text-foreground">L1 Referral Earnings</td><td className="px-4 py-2.5 text-right font-medium text-foreground">₹{l1Earning.toLocaleString()}</td></tr>
                            <tr><td className="px-4 py-2.5 text-foreground">L2 Referral Earnings</td><td className="px-4 py-2.5 text-right font-medium text-foreground">₹{l2Earning.toLocaleString()}</td></tr>
                            <tr className="bg-muted/30">
                              <td className="px-4 py-3 font-semibold text-foreground">Total Earning</td>
                              <td className="px-4 py-3 text-right font-bold text-primary text-base">₹{totalMonthlyEarning.toLocaleString()}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mapped Temples */}
                  {myTemples.length > 0 && (
                    <Card>
                      <CardContent className="pt-5 space-y-4">
                        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <Building size={15} className="text-primary" /> Mapped Temples ({myTemples.length})
                        </h3>
                        <div className="rounded-lg border border-border overflow-hidden">
                          <table className="w-full text-sm">
                            <thead><tr className="bg-muted/50 text-muted-foreground text-xs">
                              <th className="text-left px-4 py-2.5 font-medium">Temple</th>
                              <th className="text-left px-4 py-2.5 font-medium">City</th>
                              <th className="text-left px-4 py-2.5 font-medium">Plan</th>
                              <th className="text-right px-4 py-2.5 font-medium">Revenue</th>
                              <th className="text-center px-4 py-2.5 font-medium">Status</th>
                            </tr></thead>
                            <tbody className="divide-y divide-border">
                              {myTemples.map((t) => (
                                <tr key={t.id}>
                                  <td className="px-4 py-2.5 font-medium text-foreground">{t.templeName}</td>
                                  <td className="px-4 py-2.5 text-muted-foreground">{t.city}</td>
                                  <td className="px-4 py-2.5 text-muted-foreground">{t.subscriptionPlan}</td>
                                  <td className="px-4 py-2.5 text-right font-medium text-foreground">₹{t.monthlyRevenue.toLocaleString()}/mo</td>
                                  <td className="px-4 py-2.5 text-center">
                                    <Badge className={cn("border-0 text-xs", t.status === "Active" ? "bg-status-success/15 text-status-success" : t.status === "Trial" ? "bg-status-progress/15 text-status-progress" : "bg-status-rejected/15 text-status-rejected")}>{t.status}</Badge>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              );
            })() : (
              <Card>
                <CardContent className="pt-5">
                  <div className="text-center py-10">
                    <Target size={32} className="mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">No commission assigned yet</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Commission plan & earnings will show after partner is approved and a plan is assigned</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ── Chain View Tab ── */}
          <TabsContent value="chain" className="space-y-5">
            {isActive ? (
              <Card>
                <CardContent className="pt-5 space-y-4">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <GitBranch size={15} className="text-primary" /> Referral Chain
                  </h3>

                  {/* Upline chain */}
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-muted-foreground">Upline Hierarchy</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {chain.l2 && (
                        <>
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                            <UserCircle size={14} className="text-muted-foreground" />
                            <div>
                              <p className="text-xs font-medium text-foreground">{chain.l2.fullName}</p>
                              <p className="text-[10px] text-muted-foreground">L2 · {chain.l2.city}</p>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-muted-foreground" />
                        </>
                      )}
                      {chain.l1 && (
                        <>
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                            <UserCircle size={14} className="text-muted-foreground" />
                            <div>
                              <p className="text-xs font-medium text-foreground">{chain.l1.fullName}</p>
                              <p className="text-[10px] text-muted-foreground">L1 · {chain.l1.city}</p>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-muted-foreground" />
                        </>
                      )}
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                        <UserCircle size={14} className="text-primary" />
                        <div>
                          <p className="text-xs font-medium text-primary">{partner.fullName}</p>
                          <p className="text-[10px] text-muted-foreground">Direct · {partner.city}</p>
                        </div>
                      </div>
                      {!chain.l1 && !chain.l2 && (
                        <p className="text-xs text-muted-foreground ml-2">No parent — top-level partner</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Downline referred partners */}
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-muted-foreground">Referred Partners ({referred.length})</span>
                    {referred.length > 0 ? (
                      <div className="space-y-2">
                        {referred.map((r) => {
                          const rTemples = getPartnerTemples(r.id, mockTemples);
                          const rReferred = getReferredPartners(r.id, mockPartners);
                          return (
                            <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                                  {r.fullName.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-foreground">{r.fullName}</p>
                                  <p className="text-xs text-muted-foreground">{r.city} · {r.referralCode}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span><Building2 size={12} className="inline mr-1" />{rTemples.length}</span>
                                <span><Users size={12} className="inline mr-1" />{rReferred.length}</span>
                                <span className="font-medium text-foreground">₹{r.totalEarnings.toLocaleString()}</span>
                                <Badge className={cn("border-0 text-xs", statusColors[r.status])}>{r.status}</Badge>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Users size={24} className="mx-auto text-muted-foreground/30 mb-2" />
                        <p className="text-xs text-muted-foreground">No referred partners yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-5">
                  <div className="text-center py-10">
                    <GitBranch size={32} className="mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">Chain view not available</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Referral chain will be visible after partner is approved</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

        </Tabs>
      </div>

      {/* ─── Dialogs ─── */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Schedule Interview</DialogTitle><DialogDescription>Set up an interview for {partner.fullName}</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1"><span className="text-sm font-medium text-foreground">Date</span><Input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} className="text-sm" /></div>
            <div className="space-y-1"><span className="text-sm font-medium text-foreground">Time</span><Input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="text-sm" /></div>
            <div className="space-y-1">
              <span className="text-sm font-medium text-foreground">Mode</span>
              <Select value={scheduleMode} onValueChange={(v) => setScheduleMode(v as InterviewMode)}>
                <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Phone">📞 Phone</SelectItem><SelectItem value="Office">🏢 Office</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowScheduleDialog(false)}>Cancel</Button><Button onClick={handleScheduleInterview}>Schedule</Button></DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Approve Partner</DialogTitle><DialogDescription>Activate {partner.fullName}'s partner account?</DialogDescription></DialogHeader>
          <div className="space-y-3">
            <Textarea value={decisionNotes} onChange={(e) => setDecisionNotes(e.target.value)} placeholder="Approval notes (optional)..." className="text-sm min-h-[60px]" />
            <div className="flex gap-2"><Button className="flex-1 bg-status-success hover:bg-status-success/90 text-white" onClick={handleApprove}>Confirm</Button><Button variant="outline" className="flex-1" onClick={() => setShowApproveDialog(false)}>Cancel</Button></div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Reject Application</DialogTitle><DialogDescription>Close {partner.fullName}'s application?</DialogDescription></DialogHeader>
          <div className="space-y-3">
            <Textarea value={decisionNotes} onChange={(e) => setDecisionNotes(e.target.value)} placeholder="Reason for rejection..." className="text-sm min-h-[60px]" />
            <div className="flex gap-2"><Button variant="destructive" className="flex-1" onClick={handleReject}>Confirm</Button><Button variant="outline" className="flex-1" onClick={() => setShowRejectDialog(false)}>Cancel</Button></div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartnerProfile;
