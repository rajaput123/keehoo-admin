import { useNavigate } from "react-router-dom";
import { Handshake, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { mockDevotees, mockResellers } from "@/data/mockData";
import KpiCard from "@/components/KpiCard";

const kycColors: Record<string, string> = {
  Verified: "bg-status-success/15 text-status-success",
  Pending: "bg-status-progress/15 text-status-progress",
  "Not Submitted": "bg-status-rejected/15 text-status-rejected",
};

const interviewColors: Record<string, string> = {
  Pending: "bg-status-progress/15 text-status-progress",
  Scheduled: "bg-status-pending/15 text-status-pending",
  Completed: "bg-muted text-foreground",
  Approved: "bg-status-success/15 text-status-success",
  Rejected: "bg-status-rejected/15 text-status-rejected",
};

const ResellerPartner = () => {
  const navigate = useNavigate();
  const totalResellers = mockResellers.length;
  const resellerDevotees = mockDevotees.filter((d) => d.becameReseller).length;

  const kpis = [
    { icon: Handshake, value: String(totalResellers), label: "Total Resellers", trend: { value: "+3", direction: "up" as const } },
    { icon: Users, value: String(resellerDevotees), label: "Devotees → Resellers", trend: { value: "+2", direction: "up" as const } },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="px-8 pt-8 pb-2">
        <h1 className="text-2xl font-semibold text-foreground">Reseller / Partner</h1>
        <p className="text-sm text-muted-foreground mt-1">Devotees who became resellers — complete details</p>
      </div>

      <div className="flex-1 px-8 py-5 space-y-6">
        <div className="grid grid-cols-2 gap-3 max-w-lg">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.label} {...kpi} delay={i * 60} />
          ))}
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Devotee Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Partner Type</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Referral Code</TableHead>
                  <TableHead>KYC</TableHead>
                  <TableHead>Interview</TableHead>
                  <TableHead>Onboarded</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDevotees
                  .filter((d) => d.becameReseller)
                  .map((d) => {
                    const reseller = mockResellers.find((r) => r.devoteeId === d.id);
                    if (!reseller) return null;
                    return (
                      <TableRow key={d.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/module/devotee/${d.id}`)}>
                        <TableCell className="font-medium text-foreground">{d.name}</TableCell>
                        <TableCell>{d.city}</TableCell>
                        <TableCell><Badge variant="outline" className="text-xs">{reseller.partnerType}</Badge></TableCell>
                        <TableCell>{reseller.experienceLevel}</TableCell>
                        <TableCell>{reseller.commissionRate}%</TableCell>
                        <TableCell className="font-mono text-xs">{reseller.referralCode}</TableCell>
                        <TableCell><Badge className={cn("border-0 text-xs", kycColors[reseller.kycStatus])}>{reseller.kycStatus}</Badge></TableCell>
                        <TableCell><Badge className={cn("border-0 text-xs", interviewColors[reseller.interviewStatus])}>{reseller.interviewStatus}</Badge></TableCell>
                        <TableCell>{reseller.onboardingDate}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResellerPartner;
