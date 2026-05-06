export interface DevoteeData {
  id: string;
  name: string;
  city: string;
  becameReseller: boolean;
}

export interface ResellerData {
  devoteeId: string;
  partnerType: string;
  experienceLevel: string;
  commissionRate: number;
  referralCode: string;
  kycStatus: "Verified" | "Pending" | "Not Submitted";
  interviewStatus: "Pending" | "Scheduled" | "Completed" | "Approved" | "Rejected";
  onboardingDate: string;
}

export const mockDevotees: DevoteeData[] = [
  { id: "d1", name: "Priya Menon", city: "Chennai", becameReseller: true },
  { id: "d2", name: "Arjun Reddy", city: "Hyderabad", becameReseller: false },
  { id: "d3", name: "Meera Iyer", city: "Coimbatore", becameReseller: true },
  { id: "d4", name: "Vikash Kumar", city: "Patna", becameReseller: true },
];

export const mockResellers: ResellerData[] = [
  {
    devoteeId: "d1",
    partnerType: "Channel Partner",
    experienceLevel: "6 yrs",
    commissionRate: 5,
    referralCode: "PRIYA05",
    kycStatus: "Verified",
    interviewStatus: "Completed",
    onboardingDate: "2024-04-12",
  },
  {
    devoteeId: "d3",
    partnerType: "Distributor",
    experienceLevel: "4 yrs",
    commissionRate: 4,
    referralCode: "MEER04",
    kycStatus: "Pending",
    interviewStatus: "Scheduled",
    onboardingDate: "2024-05-01",
  },
  {
    devoteeId: "d4",
    partnerType: "Retailer",
    experienceLevel: "3 yrs",
    commissionRate: 3.5,
    referralCode: "VIK35",
    kycStatus: "Not Submitted",
    interviewStatus: "Pending",
    onboardingDate: "2024-06-03",
  },
];
