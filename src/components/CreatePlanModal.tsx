import React, { useState } from "react";
import { X, Check } from "lucide-react";
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
  initialData?: any; // For editing existing plans
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
    planName: initialData?.name || "",
    planCode: initialData?.code || "",
    description: initialData?.description || "",
    tag: initialData?.badge || "None",
    monthlyPrice: initialData?.monthlyPrice || 0,
    annualPrice: initialData?.annualPrice || 0,
    discountPercent: initialData?.discountPercent ?? 0,
    gstPercent: initialData?.gstPercent ?? 18,
    annualDiscountPercent: initialData?.annualDiscountPercent ?? 0,
    freeMonths: initialData?.freeMonths ?? 2,
    billingType: "Both",
    selectedModules: initialData?.modules || ([] as string[]),
    moduleNames: initialData?.moduleNames || ({} as { [key: string]: string }),
  });

  // Reset form when modal opens/closes
  React.useEffect(() => {
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
        freeMonths: initialData?.freeMonths ?? 2,
        billingType: "Both",
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

  const handleModuleNameChange = (moduleName: string, customName: string) => {
    setFormData((prev) => ({
      ...prev,
      moduleNames: {
        ...prev.moduleNames,
        [moduleName]: customName,
      },
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
    if (formData.monthlyPrice <= 0 && formData.annualPrice <= 0) {
      alert("At least one price (Monthly or Annual) is required");
      return;
    }
    onSave(formData);
    setFormData({
      planName: "",
      planCode: "",
      description: "",
      tag: "None",
      monthlyPrice: 0,
      annualPrice: 0,
      discountPercent: 0,
      gstPercent: 18,
      annualDiscountPercent: 0,
      freeMonths: 2,
      billingType: "Both",
      selectedModules: [],
      moduleNames: {},
    });
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
                  onChange={(e) =>
                    setFormData({ ...formData, planName: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of this plan..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1 resize-none"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="planCode">Plan Code *</Label>
                  <Input
                    id="planCode"
                    placeholder="e.g. T4"
                    value={formData.planCode}
                    onChange={(e) =>
                      setFormData({ ...formData, planCode: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="tag">Tag</Label>
                  <Select value={formData.tag} onValueChange={(value) => setFormData({ ...formData, tag: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
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

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-semibold mb-1">Pricing</h3>
            <p className="text-xs text-muted-foreground mb-4">Set base prices, discount, GST and free months. Annual price auto-calculates, or enter manually.</p>
            <div className="space-y-4">

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
                      // Auto-calculate annual as 12 months
                      const autoAnnual = mp > 0 ? mp * 12 : formData.annualPrice;
                      const annualSaving = mp > 0 && fm > 0 ? Math.round((fm / 12) * 100) : formData.annualDiscountPercent;
                      setFormData({ ...formData, monthlyPrice: mp, annualPrice: autoAnnual, annualDiscountPercent: annualSaving });
                    }}
                    className="mt-1"
                  />
                  <p className="text-[10px] text-muted-foreground mt-0.5">Price before discount & GST</p>
                </div>
                <div>
                  <Label htmlFor="annualPrice">Base Annual Price (₹)</Label>
                  <Input
                    id="annualPrice"
                    type="number"
                    placeholder="Auto or enter manually"
                    value={formData.annualPrice || ""}
                    onChange={(e) => {
                      const ap = parseInt(e.target.value) || 0;
                      // When user enters annual manually, compute saving %
                      const saving = formData.monthlyPrice > 0
                        ? Math.round(((formData.monthlyPrice * 12 - ap) / (formData.monthlyPrice * 12)) * 100)
                        : 0;
                      setFormData({ ...formData, annualPrice: ap, annualDiscountPercent: saving });
                    }}
                    className="mt-1"
                  />
                  <p className="text-[10px] text-muted-foreground mt-0.5">Auto-fills when Free Months is set</p>
                </div>
              </div>

              {/* Discount, GST, Free Months */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="discountPercent">Offer Discount (%)</Label>
                  <Input
                    id="discountPercent"
                    type="number"
                    min={0} max={100}
                    placeholder="e.g. 10"
                    value={formData.discountPercent || ""}
                    onChange={(e) => setFormData({ ...formData, discountPercent: parseFloat(e.target.value) || 0 })}
                    className="mt-1"
                  />
                  <p className="text-[10px] text-muted-foreground mt-0.5">Applied to both plans</p>
                </div>
                <div>
                  <Label htmlFor="gstPercent">GST (%)</Label>
                  <Input
                    id="gstPercent"
                    type="number"
                    min={0} max={100}
                    placeholder="e.g. 18"
                    value={formData.gstPercent || ""}
                    onChange={(e) => setFormData({ ...formData, gstPercent: parseFloat(e.target.value) || 0 })}
                    className="mt-1"
                  />
                  <p className="text-[10px] text-muted-foreground mt-0.5">Applied after discount</p>
                </div>
                <div>
                  <Label htmlFor="freeMonths">Free Months (Annual)</Label>
                  <Input
                    id="freeMonths"
                    type="number"
                    min={0} max={6}
                    placeholder="e.g. 2"
                    value={formData.freeMonths ?? ""}
                    onChange={(e) => {
                      const fm = parseInt(e.target.value) || 0;
                      const mp = formData.monthlyPrice;
                      const autoAnnual = mp > 0 ? mp * 12 : formData.annualPrice;
                      const annualSaving = mp > 0 ? Math.round((fm / 12) * 100) : 0;
                      setFormData({ ...formData, freeMonths: fm, annualPrice: autoAnnual, annualDiscountPercent: annualSaving });
                    }}
                    className="mt-1"
                  />
                  <p className="text-[10px] text-muted-foreground mt-0.5">Auto-computes Annual Price</p>
                </div>
              </div>

              {/* Live Dual Breakdown */}
              {(formData.monthlyPrice > 0 || formData.annualPrice > 0) && (() => {
                const disc = formData.discountPercent ?? 0;
                const gst = formData.gstPercent ?? 0;
                const mp = formData.monthlyPrice;
                const ap = formData.annualPrice;
                const fm = formData.freeMonths ?? 0;

                // Monthly calculations
                const mDisc = Math.round(mp * disc / 100);
                const mAfterDisc = mp - mDisc;
                const mGst = Math.round(mAfterDisc * gst / 100);
                const mPayable = mAfterDisc + mGst;

                // Annual calculations
                const baseAnnual = ap;
                const fmSavings = mp * fm;
                const aAfterFm = baseAnnual - fmSavings;
                const aDisc = Math.round(aAfterFm * disc / 100);
                const aAfterDisc = aAfterFm - aDisc;
                const aGst = Math.round(aAfterDisc * gst / 100);
                const aPayable = aAfterDisc + aGst;
                const annualSave = fmSavings + aDisc;

                return (
                  <div className="rounded-lg border bg-muted/20 overflow-hidden text-sm">
                    <div className="grid grid-cols-3 bg-muted/50 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      <div className="px-3 py-2">📊 Breakdown</div>
                      <div className="px-3 py-2 text-center border-l">Monthly</div>
                      <div className="px-3 py-2 text-center border-l">Annual</div>
                    </div>

                    {/* Base price */}
                    <div className="grid grid-cols-3 border-t text-xs">
                      <div className="px-3 py-2 text-muted-foreground">Base Price</div>
                      <div className="px-3 py-2 text-center border-l font-medium">₹{mp.toLocaleString()}</div>
                      <div className="px-3 py-2 text-center border-l font-medium">₹{ap.toLocaleString()}</div>
                    </div>

                    {/* Discount & Free Months */}
                    {(disc > 0 || fm > 0) && (
                      <>
                        {fm > 0 && (
                          <div className="grid grid-cols-3 border-t bg-green-50/50 text-xs text-green-700">
                            <div className="px-3 py-2 font-medium">Free Months ({fm})</div>
                            <div className="px-3 py-2 text-center border-l">—</div>
                            <div className="px-3 py-2 text-center border-l font-bold">− ₹{fmSavings.toLocaleString()}</div>
                          </div>
                        )}
                        {disc > 0 && (
                          <div className="grid grid-cols-3 border-t bg-red-50/50 text-xs">
                            <div className="px-3 py-2 text-muted-foreground">Offer Discount ({disc}%)</div>
                            <div className="px-3 py-2 text-center border-l text-red-500 font-medium">− ₹{mDisc.toLocaleString()}</div>
                            <div className="px-3 py-2 text-center border-l text-red-500 font-medium">− ₹{aDisc.toLocaleString()}</div>
                          </div>
                        )}
                        <div className="grid grid-cols-3 border-t text-xs">
                          <div className="px-3 py-2 text-muted-foreground">After Discount</div>
                          <div className="px-3 py-2 text-center border-l font-medium">₹{mAfterDisc.toLocaleString()}</div>
                          <div className="px-3 py-2 text-center border-l font-medium">₹{aAfterDisc.toLocaleString()}</div>
                        </div>
                      </>
                    )}

                    {/* GST */}
                    {gst > 0 && (
                      <div className="grid grid-cols-3 border-t bg-orange-50/50 text-xs">
                        <div className="px-3 py-2 text-muted-foreground">GST ({gst}%)</div>
                        <div className="px-3 py-2 text-center border-l text-orange-500 font-medium">+ ₹{mGst.toLocaleString()}</div>
                        <div className="px-3 py-2 text-center border-l text-orange-500 font-medium">+ ₹{aGst.toLocaleString()}</div>
                      </div>
                    )}

                    {/* Final payable - bold */}
                    <div className="grid grid-cols-3 border-t bg-foreground/5 font-bold text-xs">
                      <div className="px-3 py-2.5">✅ Final Payable</div>
                      <div className="px-3 py-2.5 text-center border-l text-primary">₹{mPayable.toLocaleString()}/mo</div>
                      <div className="px-3 py-2.5 text-center border-l text-primary">₹{aPayable.toLocaleString()}/yr</div>
                    </div>

                    {/* Free months savings row */}
                    {fm > 0 && annualSave > 0 && (
                      <div className="grid grid-cols-3 border-t bg-green-50 text-xs">
                        <div className="px-3 py-2 text-green-700 font-medium">🎁 {fm} months FREE</div>
                        <div className="px-3 py-2 text-center border-l text-muted-foreground">—</div>
                        <div className="px-3 py-2 text-center border-l text-green-700 font-bold">Save ₹{annualSave.toLocaleString()}</div>
                      </div>
                    )}
                  </div>
                );
              })()}

              <div>
                <Label htmlFor="billingType">Billing Cycle *</Label>
                <Select value={formData.billingType} onValueChange={(value) => setFormData({ ...formData, billingType: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Annual">Yearly</SelectItem>
                    <SelectItem value="Both">Monthly & Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Module Access */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Module Access
              <span className="text-sm text-muted-foreground ml-2">
                {formData.selectedModules.length} features enabled
              </span>
            </h3>
            <div className="space-y-4 max-h-64 overflow-y-auto p-3 bg-muted/30 rounded-lg">
              {modules.map((module) => (
                <div key={module.id} className="space-y-2">
                  {/* Main Module */}
                  <div className="flex items-center gap-3 font-medium">
                    <Checkbox
                      id={module.id}
                      checked={formData.selectedModules.includes(module.id)}
                      onCheckedChange={() => handleModuleToggle(module.id)}
                    />
                    <label
                      htmlFor={module.id}
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <span>{module.icon}</span>
                      {module.name}
                    </label>
                  </div>
                  {/* Sub-modules */}
                  <div className="ml-8 space-y-2">
                    {module.submodules.map((submodule) => (
                      <div key={submodule.id} className="flex items-center gap-3">
                        <Checkbox
                          id={submodule.id}
                          checked={formData.selectedModules.includes(submodule.id)}
                          onCheckedChange={() => handleModuleToggle(submodule.id)}
                        />
                        <label
                          htmlFor={submodule.id}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {submodule.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Module Names */}
          {
            formData.selectedModules.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Customize Module Names</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Set custom display names for the modules you've selected (optional)
                </p>
                <div className="space-y-3 max-h-64 overflow-y-auto p-3 bg-muted/30 rounded-lg">
                  {formData.selectedModules.map((moduleName) => (
                    <div key={moduleName} className="space-y-2">
                      <Label htmlFor={`custom-${moduleName}`} className="text-sm">
                        {moduleName}
                      </Label>
                      <Input
                        id={`custom-${moduleName}`}
                        placeholder={`Enter custom name for ${moduleName}...`}
                        value={formData.moduleNames[moduleName] || ""}
                        onChange={(e) =>
                          handleModuleNameChange(moduleName, e.target.value)
                        }
                        className="text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        </div >

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Check className="h-4 w-4" />
            {isEditing ? "Update Plan" : "Create Plan"}
          </Button>
        </DialogFooter>
      </DialogContent >
    </Dialog >
  );
};

export default CreatePlan;
