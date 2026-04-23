import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Download, Edit2, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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

interface Devotee {
  devotee_id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  devotee_type: string[];
  is_email_verified: boolean;
  is_phone_verified: boolean;
  city: string;
  state: string;
}

const sampleDevotees: Devotee[] = [
  {
    devotee_id: "USR-57512857",
    name: "Geeta",
    email: "renukarajaput6@gmail.com",
    phone: "9741217909",
    status: "active",
    devotee_type: ["devotee", "donars"],
    is_email_verified: false,
    is_phone_verified: false,
    city: "Bijapur(KAR)",
    state: "Karnataka",
  },
];

const AllDevotees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [devotees] = useState<Devotee[]>(sampleDevotees);

  const filteredDevotees = devotees.filter(
    (devotee) =>
      devotee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      devotee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      devotee.phone.includes(searchQuery)
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      inactive: "secondary",
      pending: "outline",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-foreground mb-1">All Devotees</h1>
          <p className="text-sm text-muted-foreground">Manage registered devotees and their information</p>
        </div>

        {/* Search and Filters */}
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
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <Card className="p-4 bg-blue-50">
          <p className="text-xs text-muted-foreground">Total Registered</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">1</p>
        </Card>
        <Card className="p-4 bg-green-50">
          <p className="text-xs text-muted-foreground">Active Status</p>
          <p className="text-2xl font-bold text-green-600 mt-1">1</p>
        </Card>
        <Card className="p-4 bg-purple-50">
          <p className="text-xs text-muted-foreground">Email Verified</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">0</p>
        </Card>
        <Card className="p-4 bg-orange-50">
          <p className="text-xs text-muted-foreground">Phone Verified</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">0</p>
        </Card>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Devotee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevotees.map((devotee) => (
                <TableRow key={devotee.devotee_id}>
                  <TableCell className="font-medium">{devotee.devotee_id}</TableCell>
                  <TableCell>{devotee.name}</TableCell>
                  <TableCell className="text-sm">{devotee.email}</TableCell>
                  <TableCell>{devotee.phone}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {devotee.devotee_type.map((type) => (
                        <Badge key={type} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(devotee.status)}</TableCell>
                  <TableCell className="text-sm">{devotee.city}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {devotee.is_email_verified && (
                        <Badge variant="outline" className="text-xs">
                          Email
                        </Badge>
                      )}
                      {devotee.is_phone_verified && (
                        <Badge variant="outline" className="text-xs">
                          Phone
                        </Badge>
                      )}
                      {!devotee.is_email_verified && !devotee.is_phone_verified && (
                        <span className="text-xs text-muted-foreground">Pending</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>

      {filteredDevotees.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10"
        >
          <p className="text-muted-foreground">No devotees found matching your search.</p>
        </motion.div>
      )}
    </div>
  );
};

export default AllDevotees;
