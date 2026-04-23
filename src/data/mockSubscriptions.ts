// Subscription Plans (Global catalog)
export interface SubscriptionPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  maxUsers: number;
  maxBookings: number;
  maxStorage: number; // in GB
  features: string[];
  enabledModules: string[];
  apiLimit: number;
  status: "Active" | "Archived";
  version: string;
  tenantCount: number;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "PLAN-001",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    maxUsers: 2,
    maxBookings: 100,
    maxStorage: 0.5,
    features: ["Directory Listing", "Basic Profile"],
    enabledModules: ["directory"],
    apiLimit: 1000,
    status: "Active",
    version: "1.0",
    tenantCount: 2847,
  },
  {
    id: "PLAN-002",
    name: "Standard",
    monthlyPrice: 8000,
    yearlyPrice: 80000,
    maxUsers: 5,
    maxBookings: 5000,
    maxStorage: 2,
    features: ["Directory Listing", "Booking System", "Reports", "Email Support"],
    enabledModules: ["directory", "bookings", "reports"],
    apiLimit: 25000,
    status: "Active",
    version: "2.1",
    tenantCount: 3256,
  },
  {
    id: "PLAN-003",
    name: "Premium",
    monthlyPrice: 15000,
    yearlyPrice: 150000,
    maxUsers: 15,
    maxBookings: 10000,
    maxStorage: 5,
    features: ["Directory Listing", "Booking System", "Reports", "Live Streaming", "Multi-Branch", "Priority Support"],
    enabledModules: ["directory", "bookings", "reports", "streaming", "multi-branch", "volunteers"],
    apiLimit: 50000,
    status: "Active",
    version: "2.0",
    tenantCount: 1834,
  },
  {
    id: "PLAN-004",
    name: "Enterprise",
    monthlyPrice: 45000,
    yearlyPrice: 450000,
    maxUsers: 50,
    maxBookings: 50000,
    maxStorage: 20,
    features: ["All Features", "Dedicated Support", "Custom Integrations", "SLA Guarantee"],
    enabledModules: ["directory", "bookings", "reports", "streaming", "multi-branch", "volunteers", "vip", "api-access"],
    apiLimit: 200000,
    status: "Active",
    version: "1.5",
    tenantCount: 423,
  },
  {
    id: "PLAN-005",
    name: "Government",
    monthlyPrice: 25000,
    yearlyPrice: 250000,
    maxUsers: 30,
    maxBookings: 25000,
    maxStorage: 15,
    features: ["All Features", "Compliance Reports", "Audit Logs", "Government Portal Integration"],
    enabledModules: ["directory", "bookings", "reports", "streaming", "multi-branch", "volunteers", "vip", "compliance"],
    apiLimit: 100000,
    status: "Active",
    version: "1.0",
    tenantCount: 72,
  },
  {
    id: "PLAN-006",
    name: "Starter (Legacy)",
    monthlyPrice: 5000,
    yearlyPrice: 50000,
    maxUsers: 3,
    maxBookings: 2000,
    maxStorage: 1,
    features: ["Directory Listing", "Basic Booking"],
    enabledModules: ["directory", "bookings"],
    apiLimit: 10000,
    status: "Archived",
    version: "1.0",
    tenantCount: 156,
  },
];

// Subscription Records (per-tenant, source of truth for billing)
export type BillingCycle = "monthly" | "yearly" | "trial";
export type SubscriptionStatus = "trial" | "active" | "expired" | "suspended" | "cancelled";

export interface SubscriptionRecord {
  id: string;
  tenantId: string;
  planId: string;
  billingCycle: BillingCycle;
  startDate: string;
  expiryDate: string;
  subscriptionStatus: SubscriptionStatus;
  autoRenew: boolean;
  lastPaymentDate: string | null;
  lastPaymentAmount: number | null;
  createdAt: string;
  updatedAt: string;
}

export const subscriptionRecords: SubscriptionRecord[] = [
  {
    id: "SUB-001",
    tenantId: "TEN-001",
    planId: "PLAN-003",
    billingCycle: "monthly",
    startDate: "2024-01-15",
    expiryDate: "2026-03-15",
    subscriptionStatus: "active",
    autoRenew: true,
    lastPaymentDate: "2026-02-01",
    lastPaymentAmount: 15000,
    createdAt: "2024-01-15",
    updatedAt: "2026-02-01",
  },
  {
    id: "SUB-002",
    tenantId: "TEN-002",
    planId: "PLAN-004",
    billingCycle: "yearly",
    startDate: "2023-06-20",
    expiryDate: "2026-06-20",
    subscriptionStatus: "active",
    autoRenew: true,
    lastPaymentDate: "2025-06-20",
    lastPaymentAmount: 450000,
    createdAt: "2023-06-20",
    updatedAt: "2025-06-20",
  },
  {
    id: "SUB-003",
    tenantId: "TEN-003",
    planId: "PLAN-005",
    billingCycle: "yearly",
    startDate: "2023-03-10",
    expiryDate: "2026-03-10",
    subscriptionStatus: "active",
    autoRenew: true,
    lastPaymentDate: "2025-03-10",
    lastPaymentAmount: 250000,
    createdAt: "2023-03-10",
    updatedAt: "2025-03-10",
  },
  {
    id: "SUB-004",
    tenantId: "TEN-004",
    planId: "PLAN-004",
    billingCycle: "monthly",
    startDate: "2023-08-15",
    expiryDate: "2026-03-15",
    subscriptionStatus: "active",
    autoRenew: false,
    lastPaymentDate: "2026-02-10",
    lastPaymentAmount: 45000,
    createdAt: "2023-08-15",
    updatedAt: "2026-02-10",
  },
  {
    id: "SUB-005",
    tenantId: "TEN-005",
    planId: "PLAN-001",
    billingCycle: "trial",
    startDate: "2026-02-01",
    expiryDate: "2026-02-15",
    subscriptionStatus: "trial",
    autoRenew: false,
    lastPaymentDate: null,
    lastPaymentAmount: null,
    createdAt: "2026-02-01",
    updatedAt: "2026-02-01",
  },
  {
    id: "SUB-006",
    tenantId: "TEN-006",
    planId: "PLAN-002",
    billingCycle: "monthly",
    startDate: "2023-11-20",
    expiryDate: "2025-12-20",
    subscriptionStatus: "suspended",
    autoRenew: false,
    lastPaymentDate: "2025-10-20",
    lastPaymentAmount: 8000,
    createdAt: "2023-11-20",
    updatedAt: "2025-12-21",
  },
];

// Subscription history (for change plan flow)
export interface SubscriptionHistoryEntry {
  id: string;
  tenantId: string;
  action: string;
  fromPlan: string | null;
  toPlan: string | null;
  fromCycle: string | null;
  toCycle: string | null;
  performedBy: string;
  reason: string;
  date: string;
}

export const subscriptionHistory: SubscriptionHistoryEntry[] = [
  { id: "SH-001", tenantId: "TEN-001", action: "Plan Upgrade", fromPlan: "Standard", toPlan: "Premium", fromCycle: "monthly", toCycle: "monthly", performedBy: "Admin", reason: "Customer requested upgrade for Live Streaming", date: "2024-06-01" },
  { id: "SH-002", tenantId: "TEN-002", action: "Subscription Created", fromPlan: null, toPlan: "Enterprise", fromCycle: null, toCycle: "yearly", performedBy: "System", reason: "Initial activation", date: "2023-06-20" },
  { id: "SH-003", tenantId: "TEN-006", action: "Subscription Suspended", fromPlan: null, toPlan: null, fromCycle: null, toCycle: null, performedBy: "System", reason: "Payment failed - auto suspended", date: "2025-12-21" },
  { id: "SH-004", tenantId: "TEN-005", action: "Trial Started", fromPlan: null, toPlan: "Free", fromCycle: null, toCycle: "trial", performedBy: "System", reason: "Auto-trial on registration approval", date: "2026-02-01" },
  { id: "SH-005", tenantId: "TEN-001", action: "Subscription Created", fromPlan: null, toPlan: "Standard", fromCycle: null, toCycle: "monthly", performedBy: "System", reason: "Initial activation", date: "2024-01-15" },
];

// Helpers
export const getPlanById = (planId: string): SubscriptionPlan | undefined =>
  subscriptionPlans.find((p) => p.id === planId);

export const getSubscriptionByTenantId = (tenantId: string): SubscriptionRecord | undefined =>
  subscriptionRecords.find((s) => s.tenantId === tenantId);

export const getSubscriptionHistoryByTenantId = (tenantId: string): SubscriptionHistoryEntry[] =>
  subscriptionHistory.filter((h) => h.tenantId === tenantId);

// Tenant data (plan is NOT stored here - derived from subscription)
export interface Tenant {
  id: string;
  templeName: string;
  directoryId: string;
  tenantStatus: "trial" | "active" | "suspended" | "expired";
  registrationId: string;
  region: string;
  accountManager: string;
  healthScore: number;
  createdDate: string;
  lastActivity: string;
}

export const tenants: Tenant[] = [
  { id: "TEN-001", templeName: "Sri Lakshmi Narasimha Temple", directoryId: "DIR-4521", tenantStatus: "active", registrationId: "REG-4521", region: "Tamil Nadu", accountManager: "Priya Sharma", healthScore: 92, createdDate: "2024-01-15", lastActivity: "2 hours ago" },
  { id: "TEN-002", templeName: "ISKCON Mumbai", directoryId: "DIR-1234", tenantStatus: "active", registrationId: "REG-1234", region: "Maharashtra", accountManager: "Rahul Verma", healthScore: 98, createdDate: "2023-06-20", lastActivity: "10 min ago" },
  { id: "TEN-003", templeName: "Golden Temple Trust", directoryId: "DIR-0089", tenantStatus: "active", registrationId: "REG-0089", region: "Punjab", accountManager: "Deepak Singh", healthScore: 95, createdDate: "2023-03-10", lastActivity: "1 hour ago" },
  { id: "TEN-004", templeName: "Kashi Vishwanath", directoryId: "DIR-2345", tenantStatus: "active", registrationId: "REG-2345", region: "Uttar Pradesh", accountManager: "Amit Patel", healthScore: 88, createdDate: "2023-08-15", lastActivity: "3 hours ago" },
  { id: "TEN-005", templeName: "Local Shiva Temple", directoryId: "DIR-8877", tenantStatus: "trial", registrationId: "REG-8877", region: "Karnataka", accountManager: "Unassigned", healthScore: 65, createdDate: "2026-02-01", lastActivity: "1 day ago" },
  { id: "TEN-006", templeName: "Problem Temple XYZ", directoryId: "DIR-5544", tenantStatus: "suspended", registrationId: "REG-5544", region: "Gujarat", accountManager: "Neha Kumar", healthScore: 32, createdDate: "2023-11-20", lastActivity: "2 weeks ago" },
];

// ============ TENANT USAGE TRACKING ============

export interface TenantUsage {
  tenantId: string;
  bookings: number;
  storage: number; // GB
  apiCalls: number;
  users: number;
  periodStart: string;
  periodEnd: string;
}

export const tenantUsageRecords: TenantUsage[] = [
  { tenantId: "TEN-001", bookings: 8432, storage: 4.2, apiCalls: 45000, users: 12, periodStart: "2026-02-01", periodEnd: "2026-02-28" },
  { tenantId: "TEN-002", bookings: 48500, storage: 18.5, apiCalls: 195000, users: 42, periodStart: "2026-02-01", periodEnd: "2026-02-28" },
  { tenantId: "TEN-003", bookings: 22000, storage: 12.1, apiCalls: 92000, users: 26, periodStart: "2026-02-01", periodEnd: "2026-02-28" },
  { tenantId: "TEN-004", bookings: 9200, storage: 4.8, apiCalls: 42000, users: 14, periodStart: "2026-02-01", periodEnd: "2026-02-28" },
  { tenantId: "TEN-005", bookings: 45, storage: 0.1, apiCalls: 320, users: 1, periodStart: "2026-02-01", periodEnd: "2026-02-15" },
  { tenantId: "TEN-006", bookings: 0, storage: 1.2, apiCalls: 0, users: 3, periodStart: "2026-02-01", periodEnd: "2026-02-28" },
];

export const getTenantUsage = (tenantId: string): TenantUsage | undefined =>
  tenantUsageRecords.find((u) => u.tenantId === tenantId);

// ============ ENFORCEMENT HELPERS ============

export type UsageModule = "bookings" | "storage" | "apiCalls" | "users";

export interface UsageStatus {
  module: UsageModule;
  label: string;
  used: number;
  limit: number;
  percentage: number;
  status: "normal" | "near-limit" | "over-limit";
  unit?: string;
}

export interface TenantUsageSummary {
  tenantId: string;
  templeName: string;
  planName: string;
  tenantStatus: string;
  subscriptionStatus: string;
  region: string;
  modules: UsageStatus[];
  overallStatus: "normal" | "near-limit" | "over-limit";
}

const getUsageStatus = (used: number, limit: number): "normal" | "near-limit" | "over-limit" => {
  const pct = limit > 0 ? (used / limit) * 100 : 0;
  if (pct >= 100) return "over-limit";
  if (pct >= 75) return "near-limit";
  return "normal";
};

export const getTenantUsageSummary = (tenantId: string): TenantUsageSummary | null => {
  const tenant = tenants.find((t) => t.id === tenantId);
  if (!tenant) return null;

  const sub = getSubscriptionByTenantId(tenantId);
  const plan = sub ? getPlanById(sub.planId) : null;
  const usage = getTenantUsage(tenantId);

  const modules: UsageStatus[] = [
    {
      module: "bookings",
      label: "Bookings",
      used: usage?.bookings ?? 0,
      limit: plan?.maxBookings ?? 0,
      percentage: plan?.maxBookings ? Math.round(((usage?.bookings ?? 0) / plan.maxBookings) * 100) : 0,
      status: getUsageStatus(usage?.bookings ?? 0, plan?.maxBookings ?? 0),
    },
    {
      module: "storage",
      label: "Storage",
      used: usage?.storage ?? 0,
      limit: plan?.maxStorage ?? 0,
      percentage: plan?.maxStorage ? Math.round(((usage?.storage ?? 0) / plan.maxStorage) * 100) : 0,
      status: getUsageStatus(usage?.storage ?? 0, plan?.maxStorage ?? 0),
      unit: "GB",
    },
    {
      module: "apiCalls",
      label: "API Calls",
      used: usage?.apiCalls ?? 0,
      limit: plan?.apiLimit ?? 0,
      percentage: plan?.apiLimit ? Math.round(((usage?.apiCalls ?? 0) / plan.apiLimit) * 100) : 0,
      status: getUsageStatus(usage?.apiCalls ?? 0, plan?.apiLimit ?? 0),
    },
    {
      module: "users",
      label: "Admin Users",
      used: usage?.users ?? 0,
      limit: plan?.maxUsers ?? 0,
      percentage: plan?.maxUsers ? Math.round(((usage?.users ?? 0) / plan.maxUsers) * 100) : 0,
      status: getUsageStatus(usage?.users ?? 0, plan?.maxUsers ?? 0),
    },
  ];

  const overallStatus = modules.some((m) => m.status === "over-limit")
    ? "over-limit"
    : modules.some((m) => m.status === "near-limit")
    ? "near-limit"
    : "normal";

  return {
    tenantId,
    templeName: tenant.templeName,
    planName: plan?.name ?? "Not Assigned",
    tenantStatus: tenant.tenantStatus,
    subscriptionStatus: sub?.subscriptionStatus ?? "none",
    region: tenant.region,
    modules,
    overallStatus,
  };
};

export const getAllTenantUsageSummaries = (): TenantUsageSummary[] =>
  tenants.map((t) => getTenantUsageSummary(t.id)!).filter(Boolean);

export const canPerformAction = (
  tenantId: string,
  module: UsageModule
): { allowed: boolean; reason?: string } => {
  const sub = getSubscriptionByTenantId(tenantId);
  if (!sub) return { allowed: false, reason: "No active subscription" };
  if (sub.subscriptionStatus === "expired") return { allowed: false, reason: "Subscription expired" };
  if (sub.subscriptionStatus === "suspended") return { allowed: false, reason: "Subscription suspended" };
  if (sub.subscriptionStatus === "cancelled") return { allowed: false, reason: "Subscription cancelled" };

  const plan = getPlanById(sub.planId);
  const usage = getTenantUsage(tenantId);
  if (!plan || !usage) return { allowed: true };

  const limits: Record<UsageModule, { used: number; limit: number }> = {
    bookings: { used: usage.bookings, limit: plan.maxBookings },
    storage: { used: usage.storage, limit: plan.maxStorage },
    apiCalls: { used: usage.apiCalls, limit: plan.apiLimit },
    users: { used: usage.users, limit: plan.maxUsers },
  };

  const { used, limit } = limits[module];
  if (used >= limit) return { allowed: false, reason: `${module} limit reached (${used}/${limit})` };
  return { allowed: true };
};
