import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreatePlanProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plan: any) => void;
  initialData?: any;
}

const modules = [
  {
    id: "temple",
    name: "Temple Management",
    icon: "🏛️",
    submodules: [
      { id: "temple-settings", name: "Temple Settings" },
      { id: "temple-rituals", name: "Rituals & Schedules" },
      { id: "temple-inventory", name: "Temple Inventory" },
    ],
  },
  {
    id: "seva",
    name: "Seva & Booking",
    icon: "📅",
    submodules: [
      { id: "seva-booking", name: "Booking Management" },
      { id: "seva-calendar", name: "Seva Calendar" },
      { id: "seva-reports", name: "Seva Reports" },
    ],
  },
  {
    id: "donations",
    name: "Donations & Projects",
    icon: "❤️",
    submodules: [
      { id: "donations-mgmt", name: "Donation Management" },
      { id: "donations-projects", name: "Projects" },
      { id: "donations-tracking", name: "Donation Tracking" },
    ],
  },
  {
    id: "events",
    name: "Events & Devotee",
    icon: "👥",
    submodules: [
      { id: "events-mgmt", name: "Event Management" },
      { id: "events-devotee", name: "Devotee Management" },
      { id: "events-registrations", name: "Registrations" },
    ],
  },
  {
    id: "staff",
    name: "Staff & Finance",
    icon: "👔",
    submodules: [
      { id: "staff-mgmt", name: "Staff Management" },
      { id: "staff-finance", name: "Finance & Accounting" },
      { id: "staff-payroll", name: "Payroll" },
    ],
  },
  {
    id: "pr",
    name: "PR & Communication",
    icon: "📢",
    submodules: [
      { id: "pr-communications", name: "Communications" },
      { id: "pr-campaigns", name: "Campaigns" },
      { id: "pr-media", name: "Media Management" },
    ],
  },
  {
    id: "inventory",
    name: "Inventory & Assets",
    icon: "📦",
    submodules: [
      { id: "inventory-mgmt", name: "Inventory Management" },
      { id: "inventory-assets", name: "Asset Tracking" },
      { id: "inventory-reports", name: "Reports" },
    ],
  },
  {
    id: "knowledge",
    name: "Knowledge",
    icon: "📚",
    submodules: [
      { id: "knowledge-library", name: "Knowledge Library" },
      { id: "knowledge-docs", name: "Documentation" },
      { id: "knowledge-faq", name: "FAQ" },
    ],
  },
  {
    id: "prasadam",
    name: "Prasadam",
    icon: "🙏",
    submodules: [
      { id: "prasadam-mgmt", name: "Prasadam Management" },
      { id: "prasadam-distribution", name: "Distribution" },
      { id: "prasadam-inventory", name: "Inventory Tracking" },
    ],
  },
];

const CreatePlan = ({ isOpen, onClose, onSave, initialData }: CreatePlanProps) => {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    planName: "",
    planCode: "",
    description: "",
    tag: "None",
    monthlyPrice: 0,
    annualPrice: 0,
    discountPercent: 0,
    gstPercent: 18,
    annualDiscountPercent: 0,
    freeMonths: 0,
    isCustomPrice: false,
    customPriceLabel: "",
    customPriceDescription: "",
    ctaText: "",
    billingType: "Both",
    selectedModules: [] as string[],
    moduleNames: {} as { [key: string]: string },
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        planName: initialData?.name || "",
        planCode: initialData?.code || "",
        description: initialData?.description || "",
        tag: initialData?.badge || "None",
        monthlyPrice: initialData?.monthlyPrice || 0,
        annualPrice: initialData?.annualPrice || 0,
        discountPercent: initialData?.discountPercent ?? 0,
        gstPercent: initialData?.gstPercent ?? 18,
        annualDiscountPercent: initialData?.annualDiscountPercent ?? 0,
        freeMonths: initialData?.freeMonths ?? 0,
        isCustomPrice: initialData?.isCustomPrice ?? false,
        customPriceLabel: initialData?.customPriceLabel || "",
        customPriceDescription: initialData?.customPriceDescription || "",
        ctaText: initialData?.ctaText || "",
        billingType: initialData?.billingType || "Both",
        selectedModules: initialData?.modules || ([] as string[]),
        moduleNames: initialData?.moduleNames || ({} as { [key: string]: string }),
      });
    }
  }, [isOpen, initialData]);

  const handleModuleToggle = (moduleId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedModules: prev.selectedModules.includes(moduleId)
        ? prev.selectedModules.filter((id) => id !== moduleId)
        : [...prev.selectedModules, moduleId],
    }));
  };

  const handleSave = () => {
    if (!formData.planName.trim()) {
      alert("Plan Name is required");
      return;
    }
    if (!formData.planCode.trim()) {
      alert("Plan Code is required");
      return;
    }
    if (!formData.isCustomPrice && formData.monthlyPrice <= 0 && formData.annualPrice <= 0) {
      alert("At least one price is required");
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Plan" : "Create Plan"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update pricing plan details" : "Define a new pricing plan"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Plan Basics */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Plan Basics</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="planName">Plan Name *</Label>
                <Input
                  id="planName"
                  placeholder="e.g. Sampoorna"
                  value={formData.planName}
                  onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Base Requirement)</Label>
                <Input
                  id="description"
                  placeholder="e.g. Everything in Pro, plus:"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="planCode">Plan Code *</Label>
                  <Input
                    id="planCode"
                    placeholder="e.g. T4"
                    value={formData.planCode}
                    onChange={(e) => setFormData({ ...formData, planCode: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="tag">Tag</Label>
                  <Select value={formData.tag} onValueChange={(value) => setFormData({ ...formData, tag: value })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Recommended">Recommended</SelectItem>
                      <SelectItem value="Most Popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pricing Configuration</h3>
              <div className="flex items-center gap-2 bg-muted/80 px-3 py-1 rounded-full border">
                <Label htmlFor="pricingMode" className="text-xs font-bold cursor-pointer">
                  {formData.isCustomPrice ? "Custom Price / Contact Us" : "Standard Price (Money)"}
                </Label>
                <Switch
                  id="pricingMode"
                  checked={formData.isCustomPrice}
                  onCheckedChange={(checked) => setFormData({ ...formData, isCustomPrice: checked })}
                />
              </div>
            </div>

            {formData.isCustomPrice ? (
              <div className="bg-muted/30 p-4 rounded-lg border border-dashed space-y-4">
                <div>
                  <Label htmlFor="customPriceLabel">Custom Price Label</Label>
                  <Input
                    id="customPriceLabel"
                    placeholder="e.g. Contact Us, Request Quote"
                    value={formData.customPriceLabel}
                    onChange={(e) => setFormData({ ...formData, customPriceLabel: e.target.value })}
                    className="mt-1 font-bold"
                  />
                </div>
                <div>
                  <Label htmlFor="customPriceDescription">Price Description (Subtitle)</Label>
                  <Input
                    id="customPriceDescription"
                    placeholder="e.g. Based on company size, covering all employees"
                    value={formData.customPriceDescription}
                    onChange={(e) => setFormData({ ...formData, customPriceDescription: e.target.value })}
                    className="mt-1"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1 italic">
                    Shown below the big title (e.g. 'Platform fee').
                  </p>
                </div>
                <div>
                  <Label htmlFor="ctaText">Button CTA Text</Label>
                  <Input
                    id="ctaText"
                    placeholder="e.g. Contact Sales, Get Teams"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Monthly & Annual base prices */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monthlyPrice">Base Monthly Price (₹) *</Label>
                    <Input
                      id="monthlyPrice"
                      type="number"
                      placeholder="e.g. 8999"
                      value={formData.monthlyPrice || ""}
                      onChange={(e) => {
                        const mp = parseInt(e.target.value) || 0;
                        const fm = formData.freeMonths ?? 0;
                        // Auto-calculate annual based on monthly
                        const autoAnnual = mp > 0 ? mp * 12 : formData.annualPrice;
                        setFormData({ ...formData, monthlyPrice: mp, annualPrice: autoAnnual });
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="annualPrice">Base Annual Price (₹)</Label>
                    <Input
                      id="annualPrice"
                      type="number"
                      placeholder="Auto or enter manually"
                      value={formData.annualPrice || ""}
                      onChange={(e) => setFormData({ ...formData, annualPrice: parseInt(e.target.value) || 0 })}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Discount, GST, Free Months */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="discountPercent">Offer Discount (%)</Label>
                    <Input id="discountPercent" type="number" min={0} max={100} value={formData.discountPercent || ""} onChange={(e) => setFormData({ ...formData, discountPercent: parseFloat(e.target.value) || 0 })} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="gstPercent">GST (%)</Label>
                    <Input id="gstPercent" type="number" min={0} max={100} value={formData.gstPercent || ""} onChange={(e) => setFormData({ ...formData, gstPercent: parseFloat(e.target.value) || 0 })} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="freeMonths">Free Months (Annual)</Label>
                    <Input id="freeMonths" type="number" min={0} max={6} value={formData.freeMonths || ""} onChange={(e) => setFormData({ ...formData, freeMonths: parseInt(e.target.value) || 0 })} className="mt-1" />
                  </div>
                </div>

                {/* Live Dual Breakdown */}
                {(formData.monthlyPrice > 0 || formData.annualPrice > 0) && (() => {
                  const mp = formData.monthlyPrice;
                  const ap = formData.annualPrice;
                  const disc = formData.discountPercent ?? 0;
                  const gst = formData.gstPercent ?? 0;
                  const fm = formData.freeMonths ?? 0;

                  const mDisc = Math.round(mp * disc / 100);
                  const mAfterD = mp - mDisc;
                  const mGst = Math.round(mAfterD * gst / 100);
                  const mPayable = mAfterD + mGst;

                  const aFmSaving = mp * fm;
                  const aEffective = ap - aFmSaving;
                  const aDisc = Math.round(aEffective * disc / 100);
                  const aAfterD = aEffective - aDisc;
                  const aGst = Math.round(aAfterD * gst / 100);
                  const aPayable = aAfterD + aGst;

                  return (
                    <div className="rounded-lg border bg-muted/20 overflow-hidden text-xs">
                      <div className="grid grid-cols-3 bg-muted/50 p-2 font-bold opacity-70">
                        <div>💰 Breakdown</div>
                        <div className="text-center">Monthly</div>
                        <div className="text-center border-l">Annual</div>
                      </div>
                      <div className="grid grid-cols-3 p-2 border-t">
                        <div className="text-muted-foreground">Base</div>
                        <div className="text-center">₹{mp.toLocaleString()}</div>
                        <div className="text-center border-l">₹{ap.toLocaleString()}</div>
                      </div>
                      {(disc > 0 || fm > 0) && (
                        <div className="grid grid-cols-3 p-2 border-t bg-red-50/30 text-red-600">
                          <div>Saving (Disc/FM)</div>
                          <div className="text-center">−₹{mDisc.toLocaleString()}</div>
                          <div className="text-center border-l font-bold">−₹{(aFmSaving + aDisc).toLocaleString()}</div>
                        </div>
                      )}
                      <div className="grid grid-cols-3 p-2 border-t bg-primary/5 font-bold">
                        <div>Payable (+GST)</div>
                        <div className="text-center">₹{mPayable.toLocaleString()}</div>
                        <div className="text-center border-l text-primary">₹{aPayable.toLocaleString()}</div>
                      </div>
                    </div>
                  );
                })()}

                <div>
                  <Label htmlFor="billingType">Billing Cycle *</Label>
                  <Select value={formData.billingType} onValueChange={(v) => setFormData({ ...formData, billingType: v })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Annual">Yearly</SelectItem>
                      <SelectItem value="Both">Monthly & Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Module Access</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto p-3 bg-muted/30 rounded-lg">
              {modules.map((module) => (
                <div key={module.id} className="space-y-2">
                  <div className="flex items-center gap-3 font-medium">
                    <Checkbox id={module.id} checked={formData.selectedModules.includes(module.id)} onCheckedChange={() => handleModuleToggle(module.id)} />
                    <label htmlFor={module.id} className="cursor-pointer">{module.icon} {module.name}</label>
                  </div>
                  <div className="ml-8 grid grid-cols-2 gap-2 border-l pl-4 border-muted">
                    {module.submodules.map((sub) => (
                      <div key={sub.id} className="flex items-center gap-3">
                        <Checkbox id={sub.id} checked={formData.selectedModules.includes(sub.id)} onCheckedChange={() => handleModuleToggle(sub.id)} />
                        <label htmlFor={sub.id} className="text-sm cursor-pointer hover:text-primary transition-colors">{sub.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Discard</Button>
          <Button onClick={handleSave} className="gap-2 px-8">
            <Check className="h-4 w-4" />
            {isEditing ? "Update Plan" : "Create Plan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlan;
