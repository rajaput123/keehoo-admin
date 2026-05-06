import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { mockPartners, mockTemples } from "@/data/partnerEcosystemData";

const templeStatusColors: Record<string, string> = {
  Active: "bg-status-success/15 text-status-success",
  Trial: "bg-status-progress/15 text-status-progress",
  Expired: "bg-status-rejected/15 text-status-rejected",
};

const PartnerTemples = () => {
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="px-8 pt-8 pb-2">
        <h1 className="text-2xl font-semibold text-foreground">Temple Mapping</h1>
        <p className="text-sm text-muted-foreground mt-1">All temples with Direct / L1 / L2 partner assignments</p>
      </div>
      <div className="flex-1 px-8 py-5">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Temple</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Referral Code</TableHead>
                  <TableHead>Direct Partner</TableHead>
                  <TableHead>L1 Partner</TableHead>
                  <TableHead>L2 Partner</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Locked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTemples.map(t => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium text-foreground text-sm">{t.templeName}</TableCell>
                    <TableCell className="text-sm">{t.city}</TableCell>
                    <TableCell className="text-sm">{t.registeredDate}</TableCell>
                    <TableCell className="font-mono text-xs">{t.referralCodeUsed || <span className="text-muted-foreground">None</span>}</TableCell>
                    <TableCell className="text-sm">{t.directPartnerId ? mockPartners.find(p => p.id === t.directPartnerId)?.fullName : <span className="text-muted-foreground">Unassigned</span>}</TableCell>
                    <TableCell className="text-sm">{t.l1PartnerId ? mockPartners.find(p => p.id === t.l1PartnerId)?.fullName : "—"}</TableCell>
                    <TableCell className="text-sm">{t.l2PartnerId ? mockPartners.find(p => p.id === t.l2PartnerId)?.fullName : "—"}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{t.subscriptionPlan}</Badge></TableCell>
                    <TableCell className="text-sm font-medium">₹{t.monthlyRevenue.toLocaleString()}</TableCell>
                    <TableCell><Badge className={cn("border-0 text-xs", templeStatusColors[t.status])}>{t.status}</Badge></TableCell>
                    <TableCell>{t.lockedIn ? <Badge className="bg-primary/10 text-primary border-0 text-xs">Locked</Badge> : <span className="text-xs text-muted-foreground">Open</span>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerTemples;
