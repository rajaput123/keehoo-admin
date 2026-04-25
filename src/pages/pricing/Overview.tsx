import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Grid3x3, List, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CreatePlanModal from "@/components/CreatePlanModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PricingPlan {
  id: string;
  name: string;
  code: string;
  monthlyPrice: number;
  annualPrice: number;
  discountPercent?: number;
  gstPercent?: number;
  annualDiscountPercent?: number;
  freeMonths?: number;
  description?: string;
  modulesCount: number;
  modules: string[];
  moduleNames?: { [key: string]: string };
  status: "active" | "inactive" | "draft";
  badge?: "Recommended" | "Most Popular";
  isCustomPrice?: boolean;
  customPriceLabel?: string;
  customPriceDescription?: string;
  ctaText?: string;
}

const samplePlans: PricingPlan[] = [
  {
    id: "1",
    name: "Parambh",
    code: "T1",
    monthlyPrice: 1999,
    annualPrice: 19990,
    discountPercent: 10,
    gstPercent: 18,
    freeMonths: 2,
    annualDiscountPercent: 17,
    description: "Perfect for small temples getting started with digital management",
    modulesCount: 3,
    modules: ["Temple", "Seva", "Donations"],
    status: "active",
  },
  {
    id: "2",
    name: "Seva",
    code: "T2",
    monthlyPrice: 3999,
    annualPrice: 39990,
    discountPercent: 10,
    gstPercent: 18,
    freeMonths: 2,
    description: "Great for medium temples with expanded operational needs",
    modulesCount: 5,
    modules: ["Temple", "Seva", "Donations", "Payments", "Events"],
    status: "active",
  },
  {
    id: "6",
    name: "Enterprise Custom",
    code: "T6",
    monthlyPrice: 0,
    annualPrice: 0,
    isCustomPrice: true,
    customPriceLabel: "Platform fee",
    customPriceDescription: "Based on company size, covering all employees",
    ctaText: "Book a demo",
    description: "Custom enterprise solution tailored to your temple's needs",
    modulesCount: 10,
    modules: ["Temple", "Seva", "Donations", "Events", "Staff", "PR", "Payments", "Inventory", "Knowledge", "Prasadam"],
    status: "active",
  },
];

const Overview = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [plans, setPlans] = useState<PricingPlan[]>(samplePlans);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  const getDisplayModuleName = (moduleName: string) => moduleName;

  const handleCreatePlan = (planData: any) => {
    if (plans.some((p) => p.id !== editingPlan?.id && p.name.toLowerCase() === planData.planName.toLowerCase())) {
      alert(`Plan "${planData.planName}" already exists.`);
      return;
    }

    const updatedPlan: PricingPlan = {
      id: editingPlan?.id || `${plans.length + 1}`,
      name: planData.planName,
      code: planData.planCode,
      monthlyPrice: planData.monthlyPrice,
      annualPrice: planData.annualPrice,
      discountPercent: planData.discountPercent ?? 0,
      gstPercent: planData.gstPercent ?? 18,
      annualDiscountPercent: planData.annualDiscountPercent ?? 0,
      freeMonths: planData.freeMonths ?? 0,
      isCustomPrice: planData.isCustomPrice,
      customPriceLabel: planData.customPriceLabel,
      customPriceDescription: planData.customPriceDescription,
      ctaText: planData.ctaText,
      description: planData.description,
      modulesCount: planData.selectedModules.length,
      modules: planData.selectedModules,
      moduleNames: planData.moduleNames || {},
      status: editingPlan?.status || "active",
      badge: planData.tag === "None" ? undefined : planData.tag,
    };

    if (editingPlan) {
      setPlans(plans.map((p) => (p.id === editingPlan.id ? updatedPlan : p)));
      setEditingPlan(null);
    } else {
      setPlans([...plans, updatedPlan]);
    }
  };

  const handleEditPlan = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setIsCreateModalOpen(true);
  };

  const handleDeletePlan = (planId: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter((p) => p.id !== planId));
    }
  };

  return (
    <div className="flex-1 p-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Plans & Pricing</h1>
            <p className="text-sm text-muted-foreground mt-1">Create and manage pricing plans for your platform</p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <button onClick={() => setViewMode("grid")} className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}><Grid3x3 className="h-4 w-4" /></button>
              <button onClick={() => setViewMode("list")} className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}><List className="h-4 w-4" /></button>
            </div>
            <Button onClick={() => { setEditingPlan(null); setIsCreateModalOpen(true); }} className="gap-2">
              <Plus className="h-4 w-4" /> Create Plan
            </Button>
          </div>
        </div>
      </motion.div>

      {viewMode === "grid" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card className={`p-6 relative flex flex-col h-full ${plan.badge ? "border-2 border-amber-200 bg-amber-50" : ""}`}>
                {plan.badge && <div className="absolute -top-3 left-4"><Badge className="bg-amber-500 text-white">{plan.badge}</Badge></div>}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">{plan.code}</p>
                    <h3 className="text-xl font-bold mt-1">{plan.name}</h3>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-muted rounded"><MoreVertical className="h-4 w-4" /></button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditPlan(plan)} className="gap-2"><Edit2 className="h-4 w-4" /> Edit Plan</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeletePlan(plan.id)} className="gap-2 text-destructive"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mb-4 space-y-1">
                  <div className="flex items-baseline gap-1">
                    {plan.isCustomPrice ? (
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-primary">{plan.customPriceLabel || "Contact Us"}</span>
                        {plan.customPriceDescription && (
                          <span className="text-[10px] font-medium text-muted-foreground mt-0.5 leading-tight">
                            {plan.customPriceDescription}
                          </span>
                        )}
                      </div>
                    ) : (
                      <>
                        <span className="text-2xl font-bold">₹{plan.monthlyPrice.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground">/mo</span>
                      </>
                    )}
                  </div>
                  {!plan.isCustomPrice && (plan.discountPercent! > 0 || plan.gstPercent! > 0) && (() => {
                    const disc = plan.discountPercent ?? 0;
                    const afterD = plan.monthlyPrice - Math.round(plan.monthlyPrice * disc / 100);
                    const gst = plan.gstPercent ?? 0;
                    const gstAmt = Math.round(afterD * gst / 100);
                    const payable = afterD + gstAmt;
                    return (
                      <div className="text-xs space-y-0.5 text-muted-foreground">
                        {disc > 0 && <div className="flex justify-between"><span>Offer Discount ({disc}%)</span><span className="text-red-500 font-medium">-₹{(plan.monthlyPrice - afterD).toLocaleString()}</span></div>}
                        {gst > 0 && <div className="flex justify-between"><span>GST ({gst}%)</span><span>+₹{gstAmt.toLocaleString()}</span></div>}
                        <div className="flex justify-between font-semibold text-foreground border-t pt-0.5 mt-0.5"><span>Payable/mo</span><span>₹{payable.toLocaleString()}</span></div>
                      </div>
                    );
                  })()}
                  {!plan.isCustomPrice && (
                    <div className="mt-3 pt-2 border-t border-dashed border-border">
                      <div className="flex items-center justify-between">
                        <div><span className="text-xs text-muted-foreground">Annual Plan: </span><span className="text-sm font-bold text-foreground">₹{plan.annualPrice.toLocaleString()}/yr</span></div>
                        {plan.freeMonths! > 0 && <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-bold tracking-wide">🎁 {plan.freeMonths} month{plan.freeMonths > 1 ? "s" : ""} FREE</span>}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-4 p-3 bg-background rounded-lg flex-1">
                  <p className="text-sm font-medium mb-2">{plan.modulesCount} modules included</p>
                  <div className="flex flex-wrap gap-1">
                    {plan.modules.slice(0, 3).map((module) => (
                      <Badge key={module} variant="secondary" className="text-xs">{plan.moduleNames?.[module] || module}</Badge>
                    ))}
                    {plan.modules.length > 3 && <Badge variant="secondary" className="text-xs">+{plan.modules.length - 3}</Badge>}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                  <Button variant="outline" size="sm" onClick={() => handleEditPlan(plan)}>
                    {plan.ctaText || (plan.isCustomPrice ? "Contact Us" : "Edit Plan")}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {viewMode === "list" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {plans.map((plan) => (
            <Card key={plan.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                    {plan.badge && <Badge className="bg-amber-500 text-white text-xs">{plan.badge}</Badge>}
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">Active</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{plan.description}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{plan.isCustomPrice ? (plan.customPriceLabel || "Custom") : `₹${plan.monthlyPrice.toLocaleString()}/mo`}</span>
                    {!plan.isCustomPrice && <span>₹{plan.annualPrice.toLocaleString()}/yr</span>}
                    <span className="font-semibold cursor-pointer text-blue-600" onClick={() => setExpandedPlanId(expandedPlanId === plan.id ? null : plan.id)}>
                      {plan.modulesCount} modules {expandedPlanId === plan.id ? "▼" : "▶"}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditPlan(plan)} className="gap-2"><Edit2 className="h-4 w-4" /> Edit Plan</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeletePlan(plan.id)} className="gap-2 text-destructive"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </motion.div>
      )}

      <CreatePlanModal isOpen={isCreateModalOpen} onClose={() => { setIsCreateModalOpen(false); setEditingPlan(null); }} onSave={handleCreatePlan} initialData={editingPlan} />
    </div>
  );
};

export default Overview;
