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
  description?: string;
  modulesCount: number;
  modules: string[];
  moduleNames?: { [key: string]: string }; // Custom display names for modules
  status: "active" | "inactive" | "draft";
  badge?: "Recommended" | "Most Popular";
}

const samplePlans: PricingPlan[] = [
  {
    id: "1",
    name: "Parambh",
    code: "T1",
    monthlyPrice: 1999,
    annualPrice: 19990,
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
    description: "Great for medium temples with expanded operational needs",
    modulesCount: 5,
    modules: ["Temple", "Seva", "Donations", "Payments", "Events"],
    status: "active",
  },
  {
    id: "3",
    name: "Shradha",
    code: "T3",
    monthlyPrice: 5999,
    annualPrice: 59990,
    description: "Our recommended plan for most established temples",
    modulesCount: 7,
    modules: ["Temple", "Seva", "Donations", "Events", "Staff", "PR", "Payments"],
    status: "active",
    badge: "Recommended",
  },
  {
    id: "4",
    name: "Sampoorna",
    code: "T4",
    monthlyPrice: 7999,
    annualPrice: 79990,
    description: "Comprehensive solution for large temples with complex operations",
    modulesCount: 9,
    modules: ["Temple", "Seva", "Donations", "Events", "Staff", "PR", "Payments", "Inventory", "Knowledge"],
    status: "active",
    badge: "Most Popular",
  },
  {
    id: "5",
    name: "Sanskriti",
    code: "T5",
    monthlyPrice: 9999,
    annualPrice: 99990,
    description: "Premium plan with all features and unlimited access",
    modulesCount: 10,
    modules: ["Temple", "Seva", "Donations", "Events", "Staff", "PR", "Payments", "Inventory", "Knowledge", "Prasadam"],
    status: "active",
  },
  {
    id: "6",
    name: "Parampara",
    code: "T6",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Custom enterprise solution tailored to your temple's needs",
    modulesCount: 10,
    modules: ["Temple", "Seva", "Donations", "Events", "Staff", "PR", "Payments", "Inventory", "Knowledge", "Prasadam"],
    status: "active",
  },
  {
    id: "7",
    name: "Complete Pro",
    code: "T7",
    monthlyPrice: 12999,
    annualPrice: 129990,
    description: "All-in-one solution with complete temple management ecosystem",
    modulesCount: 27,
    modules: [
      "Temple",
      "temple-settings",
      "temple-rituals",
      "temple-inventory",
      "Seva",
      "seva-booking",
      "seva-calendar",
      "seva-reports",
      "Donations",
      "donations-mgmt",
      "donations-projects",
      "donations-tracking",
      "Events",
      "events-mgmt",
      "events-devotee",
      "events-registrations",
      "Staff",
      "staff-mgmt",
      "staff-finance",
      "staff-payroll",
      "PR",
      "pr-communications",
      "pr-campaigns",
      "pr-media",
      "Inventory",
      "inventory-mgmt",
      "inventory-assets",
      "inventory-reports",
      "Knowledge",
      "knowledge-library",
      "knowledge-docs",
      "knowledge-faq",
      "Prasadam",
      "prasadam-mgmt",
      "prasadam-distribution",
      "prasadam-inventory",
    ],
    status: "active",
    badge: "Most Popular",
    moduleNames: {
      "Temple": "Temple Structure & Info",
      "temple-settings": "Temple Settings",
      "temple-rituals": "Rituals & Schedules",
      "temple-inventory": "Temple Inventory",
      "Seva": "Seva Management",
      "seva-booking": "Booking Management",
      "seva-calendar": "Seva Calendar",
      "seva-reports": "Seva Reports",
      "Donations": "Donation Management",
      "donations-mgmt": "Donation Processing",
      "donations-projects": "Donation Projects",
      "donations-tracking": "Donation Tracking",
      "Events": "Event Management",
      "events-mgmt": "Event Organization",
      "events-devotee": "Devotee Management",
      "events-registrations": "Event Registrations",
      "Staff": "Staff Management",
      "staff-mgmt": "Staff Directory",
      "staff-finance": "Finance & Accounting",
      "staff-payroll": "Payroll System",
      "PR": "PR & Media",
      "pr-communications": "Communications",
      "pr-campaigns": "Campaigns",
      "pr-media": "Media Management",
      "Inventory": "Asset Management",
      "inventory-mgmt": "Inventory Management",
      "inventory-assets": "Asset Tracking",
      "inventory-reports": "Reports",
      "Knowledge": "Knowledge Base",
      "knowledge-library": "Knowledge Library",
      "knowledge-docs": "Documentation",
      "knowledge-faq": "FAQ",
      "Prasadam": "Prasadam Distribution",
      "prasadam-mgmt": "Prasadam Management",
      "prasadam-distribution": "Distribution Tracking",
      "prasadam-inventory": "Inventory Tracking",
    },
  },
];

const Overview = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [plans, setPlans] = useState<PricingPlan[]>(samplePlans);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  // Module display name mapping
  const moduleDisplayNames: { [key: string]: string } = {
    "Temple": "Temple Structure",
    "Seva": "Seva Management",
    "Donations": "Donation Projects",
    "Payments": "Payment Gateway",
    "Events": "Event Organization",
    "Staff": "Staff Directory",
    "PR": "PR & Media",
    "Inventory": "Asset Management",
    "Knowledge": "Knowledge Base",
    "Prasadam": "Prasadam Distribution",
  };

  const getDisplayModuleName = (moduleName: string) => {
    return moduleDisplayNames[moduleName] || moduleName;
  };

  const handleCreatePlan = (planData: any) => {
    // Check for duplicate plan name
    if (plans.some((p) => p.id !== editingPlan?.id && p.name.toLowerCase() === planData.planName.toLowerCase())) {
      alert(`Plan "${planData.planName}" already exists. Please use a different name.`);
      return;
    }

    if (editingPlan) {
      // Update existing plan
      setPlans(plans.map((p) =>
        p.id === editingPlan.id
          ? {
              ...p,
              name: planData.planName,
              code: planData.planCode,
              monthlyPrice: planData.monthlyPrice,
              annualPrice: planData.annualPrice,
              description: planData.description,
              modulesCount: planData.selectedModules.length,
              modules: planData.selectedModules,
              moduleNames: planData.moduleNames || {},
              badge: planData.tag === "None" ? undefined : planData.tag,
            }
          : p
      ));
      setEditingPlan(null);
    } else {
      // Create new plan
      const newPlan: PricingPlan = {
        id: `${plans.length + 1}`,
        name: planData.planName,
        code: planData.planCode,
        monthlyPrice: planData.monthlyPrice,
        annualPrice: planData.annualPrice,
        description: planData.description,
        modulesCount: planData.selectedModules.length,
        modules: planData.selectedModules,
        moduleNames: planData.moduleNames || {}, // Store custom module names
        status: "active",
        badge: planData.tag === "None" ? undefined : planData.tag,
      };
      setPlans([...plans, newPlan]);
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Plans & Pricing</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create and manage pricing plans for your platform
            </p>
          </div>onClick={() => setIsCreateModalOpen(true)} 
          <div className="flex gap-2">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Plan
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`p-6 relative ${plan.badge ? "border-2 border-amber-200 bg-amber-50" : ""}`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-4">
                    <Badge className="bg-amber-500 text-white">{plan.badge}</Badge>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">{plan.code}</p>
                    <h3 className="text-xl font-bold mt-1">{plan.name}</h3>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-muted rounded">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditPlan(plan)} className="gap-2">
                        <Edit2 className="h-4 w-4" />
                        Edit Plan
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeletePlan(plan.id)} className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">₹{plan.monthlyPrice.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                  <p className="text-xs text-muted-foreground">₹{plan.annualPrice.toLocaleString()}/yr</p>
                </div>

                <div className="mb-4 p-3 bg-background rounded-lg">
                  <p className="text-sm font-medium mb-2">{plan.modulesCount} modules included</p>
                  <div className="flex flex-wrap gap-1">
                    {plan.modules.slice(0, 3).map((module) => (
                      <Badge key={module} variant="secondary" className="text-xs">
                        {plan.moduleNames?.[module] || getDisplayModuleName(module)}
                      </Badge>
                    ))}
                    {plan.modules.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{plan.modules.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                  <Button variant="outline" size="sm">
                    Edit Plan
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {plans.map((plan) => (
            <Card key={plan.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                    {plan.badge && <Badge className="bg-amber-500 text-white text-xs">{plan.badge}</Badge>}
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      Active
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{plan.description}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">₹{plan.monthlyPrice.toLocaleString()}/mo</span>
                    <span>₹{plan.annualPrice.toLocaleString()}/yr</span>
                    <span className="font-semibold cursor-pointer text-blue-600" onClick={() => setExpandedPlanId(expandedPlanId === plan.id ? null : plan.id)}>
                      {plan.modulesCount} modules {expandedPlanId === plan.id ? "▼" : "▶"}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditPlan(plan)} className="gap-2">
                      <Edit2 className="h-4 w-4" />
                      Edit Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeletePlan(plan.id)} className="gap-2 text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Expandable Modules List */}
              {expandedPlanId === plan.id && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-semibold mb-3">Included Modules:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {plan.modules.map((module) => (
                      <div key={module} className="p-2 bg-muted rounded text-xs">
                        <Badge variant="outline">{plan.moduleNames?.[module] || getDisplayModuleName(module)}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </motion.div>
      )}

      {/* Create/Edit Plan Modal */}
      <CreatePlanModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingPlan(null);
        }}
        onSave={handleCreatePlan}
        initialData={editingPlan}
      />
    </div>
  );
};

export default Overview;
