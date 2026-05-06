import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Download, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { mockPartners } from "@/data/partnerEcosystemData";

const kycStatusColors: Record<string, string> = {
  "Verified": "bg-green-100/50 text-green-700",
  "Pending": "bg-blue-100/50 text-blue-700",
  "Rejected": "bg-red-100/50 text-red-700",
};

const partnerStatusColors: Record<string, string> = {
  "Pending Review": "bg-blue-100/50 text-blue-700",
  "Active": "bg-green-100/50 text-green-700",
  "Approved": "bg-green-100/50 text-green-700",
  "Suspended": "bg-gray-100/50 text-gray-700",
  "Rejected": "bg-red-100/50 text-red-700",
  "Submitted": "bg-orange-100/50 text-orange-700",
};

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const partner = mockPartners.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState("profile");
  const [interviewNotes, setInterviewNotes] = useState("");
  const [year, setYear] = useState("2026");
  const [month, setMonth] = useState("April");

  if (!partner) {
    return <div className="p-8">Partner not found</div>;
  }

  const handleApprove = () => {
    alert("Partner approved");
  };

  const handleReject = () => {
    alert("Partner rejected");
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      {/* Header */}
      <div className="px-8 pt-6 pb-4 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <button onClick={() => navigate(-1)} className="mt-1 text-gray-600 hover:text-gray-900">
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{partner.fullName}</h1>
                <Badge className={cn("border-0 text-xs font-medium", partnerStatusColors[partner.status] || "bg-gray-100/50 text-gray-700")}>
                  {partner.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="uppercase font-semibold text-gray-500">{partner.type}</span>
                <span>•</span>
                <span className="uppercase font-semibold text-gray-500">Beginner</span>
                <span>•</span>
                <span>{partner.city}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              ✓ Approve
            </Button>
            <Button
              onClick={handleReject}
              className="bg-red-600 hover:bg-red-700 text-white gap-2"
            >
              ✕ Reject
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-8 pt-6">
        <Tabs defaultValue="profile" onValueChange={setActiveTab} className="w-full">
          <TabsList className="border-b border-gray-200 bg-transparent p-0 w-full justify-start h-auto">
            <TabsTrigger
              value="profile"
              className="px-4 py-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none text-gray-600 hover:text-foreground"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="px-4 py-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none text-gray-600 hover:text-foreground"
            >
              Bank & Documents
            </TabsTrigger>
            <TabsTrigger
              value="interview"
              className="px-4 py-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none text-gray-600 hover:text-foreground"
            >
              Interview
            </TabsTrigger>
            <TabsTrigger
              value="earnings"
              className="px-4 py-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none text-gray-600 hover:text-foreground"
            >
              Commission & Earnings
            </TabsTrigger>
            <TabsTrigger
              value="chain"
              className="px-4 py-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none text-gray-600 hover:text-foreground"
            >
              Chain View
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6 pb-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span>👤</span> Basic Details
                </h3>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
                    <p className="font-medium text-foreground">{partner.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Phone</label>
                    <p className="font-medium text-foreground">{partner.phone || "—"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Email</label>
                    <p className="font-medium text-foreground truncate">{partner.email || "—"}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">City</label>
                  <p className="font-medium text-foreground">{partner.city}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Type</label>
                  <p className="font-medium text-foreground capitalize">{partner.type}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Experience</label>
                  <p className="font-medium text-foreground">Beginner</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Applied Date</label>
                  <p className="font-medium text-foreground">{partner.appliedDate || "5/5/2026"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Resume</label>
                  <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1">
                    <FileText size={16} />
                    View Resume
                    <span>›</span>
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Bank & Documents Tab */}
          <TabsContent value="documents" className="mt-6 pb-8">
            <div className="space-y-6">
              {/* KYC Status */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <FileText size={20} /> KYC Status
                  </h3>
                  <Badge className="bg-orange-100/50 text-orange-700">Submitted</Badge>
                </div>

                {/* Verification Documents */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Verification Documents</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <label className="text-sm text-gray-600 mb-2 block">PAN Card</label>
                      <p className="font-medium text-gray-400">N/A</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <label className="text-sm text-gray-600 mb-2 block">Aadhaar Card</label>
                      <p className="font-medium text-foreground">Aadhaar Registered</p>
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Bank Details</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <label className="text-sm text-gray-600 mb-2 block">Bank Account Number</label>
                      <p className="font-medium text-gray-400">N/A</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <label className="text-sm text-gray-600 mb-2 block">IFSC Code</label>
                      <p className="font-medium text-gray-400">N/A</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <label className="text-sm text-gray-600 mb-2 block">UPI ID</label>
                      <p className="font-medium text-gray-400">N/A</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <label className="text-sm text-gray-600 mb-2 block">Account Holder</label>
                      <p className="font-medium text-foreground">{partner.fullName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Interview Tab */}
          <TabsContent value="interview" className="mt-6 pb-8">
            <div className="space-y-6">
              {/* Interview Management */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <FileText size={20} /> Interview Management
                  </h3>
                  <Badge className="bg-orange-100/50 text-orange-700">Pending</Badge>
                </div>

                {/* No Interview Scheduled */}
                <div className="flex flex-col items-center justify-center py-12 mb-8 bg-gray-50 rounded-lg">
                  <Clock size={40} className="text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-4">No interview scheduled yet</p>
                  <Button className="bg-gray-700 hover:bg-gray-800 text-white">
                    📅 Schedule Now
                  </Button>
                </div>

                {/* Interview Notes */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">Interview Notes</label>
                  <Textarea
                    placeholder="Add notes about the interview..."
                    className="min-h-[150px] border-gray-200 rounded-lg"
                    value={interviewNotes}
                    onChange={(e) => setInterviewNotes(e.target.value)}
                  />
                  <Button className="mt-4 bg-gray-700 hover:bg-gray-800 text-white">
                    Save Notes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Commission & Earnings Tab */}
          <TabsContent value="earnings" className="mt-6 pb-8">
            <div className="space-y-6">
              {/* Header with filters */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span>₹</span> Monthly Earnings Breakdown
                </h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">YEAR</label>
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded px-3 py-2">
                      <span>{year}</span>
                      <ChevronDown size={16} className="text-gray-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">MONTH</label>
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded px-3 py-2">
                      <span>{month}</span>
                      <ChevronDown size={16} className="text-gray-600" />
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <span className="text-gray-600">↻</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Temple Commission */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <FileText size={18} /> Temple Commission (Direct)
                      </h4>
                      <span className="text-red-700 font-bold">₹0</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-xs text-green-700 font-semibold uppercase mb-2">New Activations</p>
                        <p className="text-2xl font-bold text-green-700 mb-2">₹0</p>
                        <p className="text-xs text-green-600">10% Rate</p>
                        <p className="text-xs text-gray-600">Base: ₹0</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-xs text-blue-700 font-semibold uppercase mb-2">Renewals</p>
                        <p className="text-2xl font-bold text-blue-700 mb-2">₹0</p>
                        <p className="text-xs text-blue-600">5% Rate</p>
                        <p className="text-xs text-gray-600">Base: ₹0</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">new: 0 INR × (10 / 100) = 0 INR; renewal: 0 INR × (5 / 100) = 0 INR; L0 total = 0 INR</p>
                  </div>

                  {/* L1 & L2 Referral */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-foreground mb-4">L1 REFERRAL</h4>
                      <p className="text-lg font-bold text-gray-700 mb-4">₹0</p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Commission Rate</span>
                          <span className="font-medium">0%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Temple Subscriptions</span>
                          <span className="font-medium">0</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-4">0 INR base (L1) × (0 / 100) = 0 INR</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-foreground mb-4">L2 REFERRAL</h4>
                      <p className="text-lg font-bold text-gray-700 mb-4">₹0</p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Commission Rate</span>
                          <span className="font-medium">0%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Temple Subscriptions</span>
                          <span className="font-medium">0</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-4">0 INR base (L2) × (0 / 100) = 0 INR</p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Monthly Total Card */}
                <div className="bg-red-900 text-white rounded-lg p-6 h-fit">
                  <h4 className="text-sm font-semibold uppercase tracking-wide mb-6">Monthly Total</h4>
                  <div className="text-5xl font-bold mb-8">₹0</div>

                  <div className="space-y-4 border-t border-red-800 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-red-100">Temple</span>
                      <span className="font-bold">₹0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-100">L1</span>
                      <span className="font-bold">₹0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-100">L2</span>
                      <span className="font-bold">₹0</span>
                    </div>
                  </div>

                  <div className="border-t border-red-800 mt-4 pt-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold">₹0</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-red-100">Applied Template:</span>
                        <span className="font-bold">34567</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-100">Total Events:</span>
                        <span className="font-bold">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Chain View Tab */}
          <TabsContent value="chain" className="mt-6 pb-8">
            <div className="space-y-6">
              {/* Referral Chain */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <span>🔗</span> Referral Chain
                </h3>

                {/* Upline Hierarchy */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Upline Hierarchy</h4>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                      I
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{partner.fullName}</p>
                      <p className="text-xs text-gray-600">Direct · {partner.city}</p>
                    </div>
                  </div>
                </div>

                {/* Referred Partners */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Referred Partners (0)</h4>
                  <div className="text-center py-8 text-gray-500">
                    <p>No referred partners yet</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
