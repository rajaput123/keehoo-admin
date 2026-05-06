import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  mockPartners,
  type PartnerStatus
} from "@/data/partnerEcosystemData";

const kycStatusColors: Record<string, string> = {
  "Verified": "bg-green-100/50 text-green-700",
  "Pending": "bg-blue-100/50 text-blue-700",
  "Rejected": "bg-red-100/50 text-red-700",
};

const partnerStatusColors: Record<string, string> = {
  "Pending Review": "bg-blue-100/50 text-blue-700",
  "Active": "bg-red-900/20 text-red-700",
  "Approved": "bg-red-900/20 text-red-700",
  "Suspended": "bg-gray-100/50 text-gray-700",
  "Rejected": "bg-red-100/50 text-red-700",
  "Submitted": "bg-orange-100/50 text-orange-700",
};

const Management = () => {
  const navigate = useNavigate();
  const [partners] = useState(mockPartners);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filtered = partners.filter(p => {
    const matchSearch = p.fullName.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getParentName = (parentId: string | null) => {
    if (!parentId) return "—";
    return partners.find(p => p.id === parentId)?.fullName || "—";
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="px-8 pt-8 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Partner Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Review, approve, and manage all partners registered via the ecosystem</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex-1 px-8 py-5 space-y-4">
        <div className="flex gap-3 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 text-sm" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px] h-9 text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending Review">Pending Review</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 hover:bg-transparent">
                  <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wide">Partner</TableHead>
                  <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wide">City</TableHead>
                  <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wide">Type</TableHead>
                  <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wide">Referred By</TableHead>
                  <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wide">KYC</TableHead>
                  <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wide">Status</TableHead>
                  <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wide text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p, idx) => (
                  <TableRow key={p.id} className={cn("border-b border-gray-100 hover:bg-gray-50/50", idx === filtered.length - 1 && "border-b-0")}>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-medium text-sm">
                          {p.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{p.fullName}</p>
                          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mt-0.5">Beginner</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">{p.city}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs bg-white text-gray-700 border-gray-200">
                        {p.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">{getParentName(p.parentPartnerId)}</TableCell>
                    <TableCell>
                      <Badge className={cn("border-0 text-xs font-medium", kycStatusColors[p.kycStatus] || "bg-gray-100/50 text-gray-700")}>
                        {p.kycStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("border-0 text-xs font-medium", partnerStatusColors[p.status] || "bg-gray-100/50 text-gray-700")}>
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <button 
                        onClick={() => navigate(`/partner/profile/${p.id}`)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        View Details
                      </button>
                    </TableCell>
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

export default Management;
