import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    ExternalLink,
    MoreHorizontal,
    Filter,
    Copy,
    Edit2,
    Save,
    X,
    AlertCircle,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";

const Accounts = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null);
    const [isEditingGateway, setIsEditingGateway] = useState(false);
    const [tempGatewayId, setTempGatewayId] = useState("");
    const [gatewayId, setGatewayId] = useState("");

    const [freelancers, setFreelancers] = useState([
        {
            id: "FL-001245",
            name: "Priya Kumar",
            email: "priya.kumar@example.com",
            mobile: "+91 98765 43210",
            status: "pending",
            joinedDate: "15 Jan 2024",
            payoutMethod: "HDFC Bank",
            verification: "Needs Review",
            bankDetails: {
                accountHolder: "Priya Kumar",
                accountNumber: "1234567890123",
                ifscCode: "HDFC0001234",
                bankName: "HDFC Bank",
                accountType: "Savings",
                upiId: "priyakumar@okhdfcbank",
            }
        },
        {
            id: "FL-001246",
            name: "Rajesh Singh",
            email: "rajesh.singh@example.com",
            mobile: "+91 87654 32109",
            status: "verified",
            joinedDate: "12 Jan 2024",
            payoutMethod: "ICICI Bank",
            verification: "Verified",
            bankDetails: {
                accountHolder: "Rajesh Singh",
                accountNumber: "9876543210987",
                ifscCode: "ICIC0005678",
                bankName: "ICICI Bank",
                accountType: "Current",
                upiId: "rajeshsingh@okicici",
            }
        },
        {
            id: "FL-001247",
            name: "Sneha Patel",
            email: "sneha.patel@example.com",
            mobile: "+91 76543 21098",
            status: "verified",
            joinedDate: "10 Jan 2024",
            payoutMethod: "UPI",
            verification: "Verified",
        },
        {
            id: "FL-001248",
            name: "Amit Verma",
            email: "amit.verma@example.com",
            mobile: "+91 91234 56789",
            status: "pending",
            joinedDate: "08 Jan 2024",
            payoutMethod: "Not Set",
            verification: "Needs Review",
        },
        {
            id: "FL-001249",
            name: "Vikram Malhotra",
            email: "vikram.m@example.com",
            mobile: "+91 99887 76655",
            status: "verified",
            joinedDate: "05 Jan 2024",
            payoutMethod: "SBI Bank",
            verification: "Verified",
        },
    ]);

    const filteredFreelancers = freelancers.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.mobile.includes(searchQuery) ||
        f.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenReview = (freelancer: any) => {
        setSelectedFreelancer(freelancer);
        setGatewayId(freelancer.gatewayId || "");
        setIsEditingGateway(false);
    };

    const handleSaveGateway = () => {
        setGatewayId(tempGatewayId);
        setIsEditingGateway(false);
        toast.success("Gateway ID saved");

        // Mock updating the local list
        setFreelancers(prev => prev.map(f =>
            f.id === selectedFreelancer.id ? { ...f, gatewayId: tempGatewayId } : f
        ));
    };

    const handleApprove = () => {
        if (!gatewayId) {
            toast.error("Please add a Gateway ID");
            return;
        }
        toast.success("Account approved successfully");
        setFreelancers(prev => prev.map(f =>
            f.id === selectedFreelancer.id ? { ...f, status: "verified", verification: "Verified" } : f
        ));
        setSelectedFreelancer(null);
    };

    return (
        <div className="flex-1 p-6 space-y-6 bg-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Freelancer Accounts</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Bulk review and payment gateway configuration
                    </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                </Button>
            </div>

            <Card className="border shadow-none rounded-lg">
                <div className="p-4 border-b flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search accounts..."
                            className="pl-9 h-9 border-none bg-muted/50 focus-visible:ring-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-b bg-muted/20">
                            <TableHead className="font-semibold text-foreground py-3">Freelancer</TableHead>
                            <TableHead className="hidden lg:table-cell">Mobile</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Verification</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredFreelancers.map((f) => (
                            <TableRow key={f.id} className="hover:bg-muted/30 border-b last:border-0">
                                <TableCell className="py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-foreground">{f.name}</span>
                                        <span className="text-xs text-muted-foreground">{f.id} • {f.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden lg:table-cell text-sm">{f.mobile}</TableCell>
                                <TableCell>
                                    <Badge variant={f.status === "verified" ? "default" : "secondary"} className="capitalize text-[10px]">
                                        {f.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className={`h-1.5 w-1.5 rounded-full ${f.verification === "Verified" ? "bg-green-500" : "bg-yellow-500"}`} />
                                        <span className="text-xs">{f.verification}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 text-primary hover:text-primary hover:bg-primary/5"
                                        onClick={() => handleOpenReview(f)}
                                    >
                                        Review
                                        <ExternalLink className="ml-2 h-3 w-3" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {/* Review Drawer */}
            <Sheet open={!!selectedFreelancer} onOpenChange={() => setSelectedFreelancer(null)}>
                <SheetContent className="sm:max-w-md bg-white p-0">
                    <SheetHeader className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <SheetTitle className="text-xl">Account Review</SheetTitle>
                            <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${selectedFreelancer?.status === "verified" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                }`}>
                                {selectedFreelancer?.status}
                            </div>
                        </div>
                    </SheetHeader>

                    <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-140px)]">
                        {/* Gateway Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Payment Gateway</h3>
                            <div className="p-4 rounded-lg border bg-muted/20 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium">Gateway MID</span>
                                    {!isEditingGateway ? (
                                        <Button variant="link" size="sm" onClick={() => { setIsEditingGateway(true); setTempGatewayId(gatewayId); }} className="h-auto p-0 text-xs">
                                            {gatewayId ? "Edit" : "Assign"}
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => setIsEditingGateway(false)} className="h-auto p-0">
                                                <X className="h-3 w-3" />
                                            </Button>
                                            <Button variant="link" size="sm" onClick={handleSaveGateway} className="h-auto p-0 text-xs">
                                                Save
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                {isEditingGateway ? (
                                    <Input
                                        value={tempGatewayId}
                                        onChange={(e) => setTempGatewayId(e.target.value)}
                                        placeholder="MID_123456789"
                                        className="h-8 text-sm"
                                    />
                                ) : (
                                    <div className="text-sm font-mono font-bold text-primary">
                                        {gatewayId || <span className="text-muted-foreground font-normal italic">None assigned</span>}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bank Details Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Bank Settlement</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase mb-1">Account Holder</p>
                                    <p className="font-medium">{selectedFreelancer?.bankDetails?.accountHolder || selectedFreelancer?.name}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] text-muted-foreground uppercase mb-1">Bank Name</p>
                                        <p className="text-sm font-medium">{selectedFreelancer?.bankDetails?.bankName || "HDFC Bank"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-muted-foreground uppercase mb-1">IFSC Code</p>
                                        <p className="text-sm font-mono font-bold">{selectedFreelancer?.bankDetails?.ifscCode || "HDFC0001234"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase mb-1">Account Number</p>
                                    <p className="text-base font-mono font-bold tracking-widest text-foreground">
                                        {selectedFreelancer?.bankDetails?.accountNumber ? `****${selectedFreelancer.bankDetails.accountNumber.slice(-4)}` : "****8927"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase mb-1">UPI ID</p>
                                    <p className="text-sm">{selectedFreelancer?.bankDetails?.upiId || "user@okaxis"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Verification Note */}
                        <div className="p-4 rounded-lg bg-blue-50/50 border border-blue-100 flex gap-3 text-xs text-blue-700">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <p>Verify that the Account Holder name matches the Freelancer Profile name before approval.</p>
                        </div>
                    </div>

                    <div className="p-6 border-t mt-auto">
                        {selectedFreelancer?.status === "pending" ? (
                            <Button
                                className="w-full h-11 text-base font-semibold shadow-sm"
                                onClick={handleApprove}
                                disabled={!gatewayId}
                            >
                                Approve Account
                            </Button>
                        ) : (
                            <Button variant="outline" className="w-full h-11" disabled>
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                Account Verified
                            </Button>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Accounts;
