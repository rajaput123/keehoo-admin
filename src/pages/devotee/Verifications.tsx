import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, CheckCircle, XCircle, Clock, Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VerificationRequest {
  id: string;
  devoteeId: string;
  name: string;
  email: string;
  phone: string;
  type: "email" | "phone";
  status: "pending" | "verified" | "rejected";
  requestedAt: string;
  verificationType: string;
}

const sampleVerifications: VerificationRequest[] = [
  {
    id: "VER-001",
    devoteeId: "USR-57512857",
    name: "Geeta",
    email: "renukarajaput6@gmail.com",
    phone: "9741217909",
    type: "email",
    status: "pending",
    requestedAt: "2026-04-20",
    verificationType: "Email Verification",
  },
  {
    id: "VER-002",
    devoteeId: "USR-57512857",
    name: "Geeta",
    email: "renukarajaput6@gmail.com",
    phone: "9741217909",
    type: "phone",
    status: "pending",
    requestedAt: "2026-04-20",
    verificationType: "Phone Verification",
  },
];

const Verifications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [verifications] = useState<VerificationRequest[]>(sampleVerifications);
  const [filterType, setFilterType] = useState<"all" | "email" | "phone">("all");

  const stats = [
    {
      label: "Pending Verifications",
      value: "2",
      icon: Clock,
      color: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      label: "Verified",
      value: "1,856",
      icon: CheckCircle,
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Rejected",
      value: "24",
      icon: XCircle,
      color: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  const filteredVerifications = verifications.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.phone.includes(searchQuery);
    const matchesFilter = filterType === "all" || v.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      verified: "default",
      rejected: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    if (status === "pending") return <Clock className="h-4 w-4 text-yellow-600" />;
    if (status === "verified") return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (status === "rejected") return <XCircle className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Verifications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage email and phone verification requests
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className={`p-6 ${stat.color}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <Icon className={`h-10 w-10 ${stat.iconColor} opacity-20`} />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Type
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterType("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("email")}>Email</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("phone")}>Phone</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Devotee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVerifications.map((verification) => (
                <TableRow key={verification.id}>
                  <TableCell className="font-medium">{verification.devoteeId}</TableCell>
                  <TableCell>{verification.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {verification.type === "email" ? (
                        <Mail className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Phone className="h-4 w-4 text-green-600" />
                      )}
                      <span className="capitalize">{verification.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {verification.type === "email" ? verification.email : verification.phone}
                  </TableCell>
                  <TableCell>{getStatusBadge(verification.status)}</TableCell>
                  <TableCell className="text-sm">{verification.requestedAt}</TableCell>
                  <TableCell className="text-right">
                    {verification.status === "pending" && (
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="default"
                          className="gap-1"
                          onClick={() => {
                            // TODO: Handle approve
                          }}
                        >
                          <CheckCircle className="h-3 w-3" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="gap-1"
                          onClick={() => {
                            // TODO: Handle reject
                          }}
                        >
                          <XCircle className="h-3 w-3" />
                          Reject
                        </Button>
                      </div>
                    )}
                    {verification.status !== "pending" && (
                      <span className="text-sm text-muted-foreground">No action</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>

      {filteredVerifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10"
        >
          <p className="text-muted-foreground">No verifications found matching your search.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Verifications;
