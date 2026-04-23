import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  AlertTriangle,
  Calendar,
  RefreshCw,
  ArrowLeft,
  Check,
  Clock,
  Ban,
  Zap,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  type Tenant,
  type SubscriptionRecord,
  type SubscriptionPlan,
  type SubscriptionHistoryEntry,
  type BillingCycle,
  subscriptionPlans,
  getPlanById,
  getSubscriptionByTenantId,
  getSubscriptionHistoryByTenantId,
} from "@/data/mockSubscriptions";

interface TenantSubscriptionTabProps {
  tenant: Tenant;
}

const subscriptionStatusColors: Record<string, string> = {
  active: "bg-success/10 text-success",
  trial: "bg-info/10 text-info",
  expired: "bg-destructive/10 text-destructive",
  suspended: "bg-warning/10 text-warning",
  cancelled: "bg-muted text-muted-foreground",
};

const TenantSubscriptionTab = ({ tenant }: TenantSubscriptionTabProps) => {
  const [view, setView] = useState<"overview" | "change-plan" | "extend" | "assign">("overview");
  const [selectedNewPlan, setSelectedNewPlan] = useState("");
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>("monthly");

  const subscription = getSubscriptionByTenantId(tenant.id);
  const plan = subscription ? getPlanById(subscription.planId) : null;
  const history = getSubscriptionHistoryByTenantId(tenant.id);

  const activePlans = subscriptionPlans.filter((p) => p.status === "Active");

  // Change Plan inline view
  if (view === "change-plan") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setView("overview")} className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h4 className="text-sm font-semibold">Change Subscription Plan</h4>
        </div>

        <div className="glass-card rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-info/5 border border-info/20 rounded-lg">
            <CreditCard className="h-5 w-5 text-info" />
            <div>
              <p className="text-sm font-medium">Current Plan: {plan?.name || "None"}</p>
              <p className="text-xs text-muted-foreground">
                {subscription ? `${subscription.billingCycle} · Expires ${subscription.expiryDate}` : "No active subscription"}
              </p>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Select New Plan</Label>
            <div className="grid md:grid-cols-3 gap-3 mt-2">
              {activePlans.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedNewPlan(p.id)}
                  className={cn(
                    "p-4 border rounded-xl cursor-pointer transition-all",
                    selectedNewPlan === p.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className="text-lg font-bold mt-1">₹{p.monthlyPrice.toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                  <p className="text-xs text-muted-foreground mt-1">{p.maxUsers} users · {p.maxBookings.toLocaleString()} bookings</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Billing Cycle</Label>
              <Select value={selectedCycle} onValueChange={(v) => setSelectedCycle(v as BillingCycle)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly (Save ~17%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Effective From</Label>
              <Input type="date" className="mt-1" defaultValue={new Date().toISOString().split("T")[0]} />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Reason for Change</Label>
            <Textarea className="mt-1" placeholder="e.g., Customer requested upgrade for additional features..." rows={2} />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button className="gap-2" disabled={!selectedNewPlan}>
              <Check className="h-4 w-4" />
              Confirm Plan Change
            </Button>
            <Button variant="outline" onClick={() => setView("overview")}>Cancel</Button>
          </div>
        </div>
      </div>
    );
  }

  // Extend subscription inline view
  if (view === "extend") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setView("overview")} className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h4 className="text-sm font-semibold">Extend Subscription</h4>
        </div>

        <div className="glass-card rounded-xl p-4 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Current Expiry Date</Label>
              <Input className="mt-1" value={subscription?.expiryDate || "N/A"} disabled />
            </div>
            <div>
              <Label className="text-sm font-medium">New Expiry Date</Label>
              <Input type="date" className="mt-1" />
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium">Extension Reason</Label>
            <Textarea className="mt-1" placeholder="e.g., Grace period for payment processing..." rows={2} />
          </div>
          <div className="flex items-center gap-2">
            <Switch id="waive" />
            <Label htmlFor="waive" className="text-sm">Waive extension charges</Label>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <Button className="gap-2"><Calendar className="h-4 w-4" />Confirm Extension</Button>
            <Button variant="outline" onClick={() => setView("overview")}>Cancel</Button>
          </div>
        </div>
      </div>
    );
  }

  // Assign plan inline view (no subscription exists)
  if (view === "assign") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setView("overview")} className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h4 className="text-sm font-semibold">Assign Subscription Plan</h4>
        </div>

        <div className="glass-card rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div>
              <p className="text-sm font-medium">No active subscription for this tenant</p>
              <p className="text-xs text-muted-foreground">Assign a plan to activate this tenant's SaaS access.</p>
            </div>
          </div>

          <Tabs defaultValue="manual">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="trial">Start Trial (14 days)</TabsTrigger>
              <TabsTrigger value="manual">Assign Plan Manually</TabsTrigger>
            </TabsList>

            <TabsContent value="trial" className="space-y-4 mt-4">
              <div className="p-4 border border-border rounded-xl">
                <p className="text-sm font-medium mb-2">Trial Plan Configuration</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-medium">Free (Trial)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">14 days</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground">Start Date</span>
                    <span className="font-medium">{new Date().toISOString().split("T")[0]}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-muted-foreground">Expiry Date</span>
                    <span className="font-medium">
                      {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                    </span>
                  </div>
                </div>
              </div>
              <Button className="gap-2">
                <Zap className="h-4 w-4" />
                Start 14-Day Trial
              </Button>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4 mt-4">
              <div>
                <Label className="text-sm font-medium">Select Plan</Label>
                <div className="grid md:grid-cols-3 gap-3 mt-2">
                  {activePlans.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedNewPlan(p.id)}
                      className={cn(
                        "p-4 border rounded-xl cursor-pointer transition-all",
                        selectedNewPlan === p.id
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <p className="font-semibold text-sm">{p.name}</p>
                      <p className="text-lg font-bold mt-1">₹{p.monthlyPrice.toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Billing Cycle</Label>
                  <Select value={selectedCycle} onValueChange={(v) => setSelectedCycle(v as BillingCycle)}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Start Date</Label>
                  <Input type="date" className="mt-1" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>
              </div>
              <Button className="gap-2" disabled={!selectedNewPlan}>
                <Check className="h-4 w-4" />
                Assign Plan & Activate
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Overview (default)
  return (
    <div className="space-y-6">
      {/* No subscription warning */}
      {!subscription && (
        <div className="flex items-center justify-between p-4 bg-warning/10 border border-warning/20 rounded-xl">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div>
              <p className="text-sm font-semibold text-warning">No Active Subscription</p>
              <p className="text-xs text-muted-foreground">This tenant has no subscription record. Assign a plan to activate.</p>
            </div>
          </div>
          <Button size="sm" className="gap-2" onClick={() => setView("assign")}>
            <CreditCard className="h-4 w-4" />
            Assign Plan
          </Button>
        </div>
      )}

      {/* Current subscription card */}
      {subscription && plan && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Current Subscription
                </h4>
                <Badge className={cn("text-xs capitalize", subscriptionStatusColors[subscription.subscriptionStatus])}>
                  {subscription.subscriptionStatus}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Plan Name", value: plan.name },
                  { label: "Subscription ID", value: subscription.id },
                  { label: "Billing Cycle", value: subscription.billingCycle.charAt(0).toUpperCase() + subscription.billingCycle.slice(1) },
                  { label: "Start Date", value: subscription.startDate },
                  { label: "Expiry Date", value: subscription.expiryDate },
                  { label: "Auto Renew", value: subscription.autoRenew ? "Yes" : "No" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className={cn("font-medium", item.label === "Subscription ID" && "font-mono text-xs")}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass-card rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Billing Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground">Current Rate</span>
                    <span className="font-bold text-lg">
                      ₹{(subscription.billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice).toLocaleString()}
                      <span className="text-xs font-normal text-muted-foreground">/{subscription.billingCycle === "yearly" ? "yr" : "mo"}</span>
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/50">
                    <span className="text-muted-foreground">Last Payment</span>
                    <span className="font-medium">
                      {subscription.lastPaymentDate
                        ? `₹${subscription.lastPaymentAmount?.toLocaleString()} on ${subscription.lastPaymentDate}`
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-muted-foreground">Days Until Expiry</span>
                    <span className={cn(
                      "font-medium",
                      Math.ceil((new Date(subscription.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) <= 7
                        ? "text-destructive"
                        : "text-foreground"
                    )}>
                      {Math.max(0, Math.ceil((new Date(subscription.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))} days
                    </span>
                  </div>
                </div>
              </div>

              {/* Plan limits summary */}
              <div className="glass-card rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold">Plan Limits</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Users</span>
                    <span className="font-medium">{plan.maxUsers}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Bookings</span>
                    <span className="font-medium">{plan.maxBookings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="font-medium">{plan.maxStorage} GB</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">API Calls</span>
                    <span className="font-medium">{plan.apiLimit.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button size="sm" variant="outline" className="gap-2" onClick={() => setView("change-plan")}>
              <RefreshCw className="h-4 w-4" />
              Change Plan
            </Button>
            <Button size="sm" variant="outline" className="gap-2" onClick={() => setView("extend")}>
              <Calendar className="h-4 w-4" />
              Extend Subscription
            </Button>
            <Button size="sm" variant="outline" className="gap-2 text-destructive hover:text-destructive">
              <Ban className="h-4 w-4" />
              Cancel Subscription
            </Button>
          </div>
        </>
      )}

      {/* Subscription History */}
      <div>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Subscription History
        </h4>
        {history.length > 0 ? (
          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  <th className="p-3 text-left text-xs font-medium text-muted-foreground">Date</th>
                  <th className="p-3 text-left text-xs font-medium text-muted-foreground">Action</th>
                  <th className="p-3 text-left text-xs font-medium text-muted-foreground">Change</th>
                  <th className="p-3 text-left text-xs font-medium text-muted-foreground">By</th>
                  <th className="p-3 text-left text-xs font-medium text-muted-foreground">Reason</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id} className="border-b border-border/50 last:border-0">
                    <td className="p-3 text-xs text-muted-foreground">{h.date}</td>
                    <td className="p-3 text-sm font-medium">{h.action}</td>
                    <td className="p-3 text-sm">
                      {h.fromPlan && h.toPlan ? (
                        <span className="flex items-center gap-1">
                          {h.fromPlan} <ArrowUpRight className="h-3 w-3 text-primary" /> {h.toPlan}
                        </span>
                      ) : h.toPlan ? (
                        <span>{h.toPlan}{h.toCycle ? ` (${h.toCycle})` : ""}</span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">{h.performedBy}</td>
                    <td className="p-3 text-xs text-muted-foreground max-w-[200px] truncate">{h.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground p-4 border border-border rounded-xl text-center">No subscription history available</p>
        )}
      </div>
    </div>
  );
};

export default TenantSubscriptionTab;
