export type PartnerStatus = "Pending Review" | "Active" | "Suspended" | "Rejected";

export interface PartnerChain {
  id: string;
  fullName: string;
  city: string;
  type: string;
  experience: string;
  status: PartnerStatus;
  referralCode: string;
  parentPartnerId: string | null;
  totalEarnings: number;
  templesOnboarded: number;
  achievementPercent: number;
  monthlyTarget: number;
  joinedDate: string;
  phone: string;
  email: string;
  kycStatus: "Verified" | "Pending" | "Not Submitted";
  approvedDate?: string;
}

export interface TempleData {
  id: string;
  templeName: string;
  city: string;
  registeredDate: string;
  referralCodeUsed?: string;
  directPartnerId?: string;
  l1PartnerId?: string;
  l2PartnerId?: string;
  subscriptionPlan: string;
  monthlyRevenue: number;
  status: string;
  lockedIn: boolean;
}

export interface TransactionData {
  id: string;
  partnerId: string;
  amount: number;
  adjustedAmount?: number;
  date: string;
  type: string;
}

export interface CommissionConfig {
  directPercent: number;
  l1Percent: number;
  l2Percent: number;
  renewalDirectPercent: number;
  renewalL1Percent: number;
  renewalL2Percent: number;
}

export const defaultCommissionConfig: CommissionConfig = {
  directPercent: 4,
  l1Percent: 2,
  l2Percent: 1,
  renewalDirectPercent: 2,
  renewalL1Percent: 1,
  renewalL2Percent: 0.5,
};

export const mockPartners: PartnerChain[] = [
  {
    id: "p1",
    fullName: "Ananya Sharma",
    city: "Bangalore",
    type: "Channel Partner",
    experience: "8 yrs",
    status: "Active",
    referralCode: "ANKA21",
    parentPartnerId: null,
    totalEarnings: 185000,
    templesOnboarded: 18,
    achievementPercent: 92,
    monthlyTarget: 20,
    joinedDate: "2024-04-18",
    phone: "+91 98765 43210",
    email: "ananya.sharma@example.com",
    kycStatus: "Verified",
    approvedDate: "2024-04-22",
  },
  {
    id: "p2",
    fullName: "Rohit Patel",
    city: "Ahmedabad",
    type: "Distributor",
    experience: "5 yrs",
    status: "Active",
    referralCode: "ROH23",
    parentPartnerId: "p1",
    totalEarnings: 122000,
    templesOnboarded: 12,
    achievementPercent: 88,
    monthlyTarget: 15,
    joinedDate: "2024-05-02",
    phone: "+91 90210 34567",
    email: "rohit.patel@example.com",
    kycStatus: "Verified",
  },
  {
    id: "p3",
    fullName: "Sanya Kapoor",
    city: "Mumbai",
    type: "Consultant",
    experience: "3 yrs",
    status: "Pending Review",
    referralCode: "SKAP99",
    parentPartnerId: "p2",
    totalEarnings: 56000,
    templesOnboarded: 6,
    achievementPercent: 62,
    monthlyTarget: 12,
    joinedDate: "2024-06-10",
    phone: "+91 88776 55443",
    email: "sanya.kapoor@example.com",
    kycStatus: "Pending",
  },
  {
    id: "p4",
    fullName: "Vikram Singh",
    city: "Lucknow",
    type: "Retailer",
    experience: "2 yrs",
    status: "Rejected",
    referralCode: "VSING45",
    parentPartnerId: "p1",
    totalEarnings: 32000,
    templesOnboarded: 4,
    achievementPercent: 41,
    monthlyTarget: 10,
    joinedDate: "2024-06-17",
    phone: "+91 94567 12345",
    email: "vikram.singh@example.com",
    kycStatus: "Not Submitted",
  },
];

export const mockTemples: TempleData[] = [
  {
    id: "t1",
    templeName: "Sri Sai Baba Temple",
    city: "Bangalore",
    registeredDate: "2024-03-10",
    referralCodeUsed: "ANKA21",
    directPartnerId: "p1",
    l1PartnerId: null,
    l2PartnerId: null,
    subscriptionPlan: "Growth Plan",
    monthlyRevenue: 22000,
    status: "Active",
    lockedIn: true,
  },
  {
    id: "t2",
    templeName: "Shree Krishna Mandir",
    city: "Ahmedabad",
    registeredDate: "2024-05-18",
    referralCodeUsed: "ROH23",
    directPartnerId: "p2",
    l1PartnerId: "p1",
    l2PartnerId: null,
    subscriptionPlan: "Starter Plan",
    monthlyRevenue: 15000,
    status: "Trial",
    lockedIn: false,
  },
  {
    id: "t3",
    templeName: "Hanuman Mandir",
    city: "Mumbai",
    registeredDate: "2024-06-01",
    referralCodeUsed: "SKAP99",
    directPartnerId: "p3",
    l1PartnerId: "p2",
    l2PartnerId: "p1",
    subscriptionPlan: "Premium Plan",
    monthlyRevenue: 31000,
    status: "Active",
    lockedIn: true,
  },
  {
    id: "t4",
    templeName: "Ganesh Mandir",
    city: "Lucknow",
    registeredDate: "2024-06-20",
    referralCodeUsed: undefined,
    directPartnerId: undefined,
    l1PartnerId: undefined,
    l2PartnerId: undefined,
    subscriptionPlan: "Starter Plan",
    monthlyRevenue: 7800,
    status: "Expired",
    lockedIn: false,
  },
];

export const mockTransactions: TransactionData[] = [
  { id: "trx1", partnerId: "p1", amount: 38000, adjustedAmount: 35000, date: "2024-07-01", type: "Commission" },
  { id: "trx2", partnerId: "p2", amount: 22000, date: "2024-06-25", type: "Commission" },
  { id: "trx3", partnerId: "p3", amount: 14000, adjustedAmount: 13000, date: "2024-06-30", type: "Commission" },
  { id: "trx4", partnerId: "p1", amount: 18000, date: "2024-06-18", type: "Renewal" },
  { id: "trx5", partnerId: "p2", amount: 16000, date: "2024-06-10", type: "Commission" },
];

export const getReferredPartners = (partnerId: string, partners: PartnerChain[]) => {
  return partners.filter((p) => p.parentPartnerId === partnerId);
};

export const getPartnerTemples = (partnerId: string, temples: TempleData[]) => {
  return temples.filter((t) => t.directPartnerId === partnerId || t.l1PartnerId === partnerId || t.l2PartnerId === partnerId);
};

export const getPartnerChain = (partnerId: string, partners: PartnerChain[]) => {
  const partner = partners.find((p) => p.id === partnerId);
  if (!partner) return { direct: null, l1: null, l2: null };

  const l1 = partner.parentPartnerId ? partners.find((p) => p.id === partner.parentPartnerId) ?? null : null;
  const l2 = l1?.parentPartnerId ? partners.find((p) => p.id === l1.parentPartnerId) ?? null : null;

  return { direct: partner, l1, l2 };
};
