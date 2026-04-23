import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Copy, CheckCircle2, AlertCircle, Save, X } from "lucide-react";
import { toast } from "sonner";

const AccountDetails = () => {
  const [status, setStatus] = useState<"pending" | "verified">("pending");
  const [gatewayId, setGatewayId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tempGatewayId, setTempGatewayId] = useState("");

  const bankAccount = {
    accountHolder: "Priya Kumar",
    accountNumber: "1234567890123",
    ifscCode: "HDFC0001234",
    bankName: "HDFC Bank",
    accountType: "Savings",
    upiId: "priyakumar@okhdfcbank",
  };

  const handleEdit = () => {
    setTempGatewayId(gatewayId);
    setIsEditing(true);
  };

  const handleSave = () => {
    setGatewayId(tempGatewayId);
    setIsEditing(false);
    toast.success("Gateway ID updated successfully");
  };

  const handleApprove = () => {
    if (!gatewayId) {
      toast.error("Please add a Gateway ID before approving");
      return;
    }
    setStatus("verified");
    toast.success("Account approved successfully");
  };

  return (
    <div className="flex-1 p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Freelancer Account</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review bank details and approve account for payments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${status === "pending"
              ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
              : "bg-green-50 text-green-700 border border-green-200"
            }`}>
            {status === "pending" ? (
              <>
                <AlertCircle className="h-4 w-4" />
                Pending Approval
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Verified & Active
              </>
            )}
          </div>

          {status === "pending" && (
            <Button
              onClick={handleApprove}
              disabled={!gatewayId}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg px-6"
            >
              Approve Account
            </Button>
          )}
        </div>
      </motion.div>

      {/* Gateway Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 border-2 border-primary/10 bg-primary/[0.02]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              Payment Gateway Setup
            </h2>
            {!isEditing ? (
              <Button variant="ghost" size="sm" onClick={handleEdit} className="gap-2">
                <Edit2 className="h-4 w-4" />
                {gatewayId ? "Edit ID" : "Add ID"}
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="text-muted-foreground">
                  <X className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSave} className="text-primary font-bold">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Gateway ID
            </label>
            {isEditing ? (
              <Input
                value={tempGatewayId}
                onChange={(e) => setTempGatewayId(e.target.value)}
                placeholder="Enter Gateway ID (e.g., MID_987654321)"
                className="bg-white border-primary/20 focus:border-primary"
              />
            ) : (
              <div className="flex items-center gap-3 p-3 bg-white border border-dashed border-primary/30 rounded-lg">
                {gatewayId ? (
                  <>
                    <code className="text-lg font-mono text-primary font-bold">{gatewayId}</code>
                    <button className="text-muted-foreground hover:text-primary transition-colors ml-auto">
                      <Copy className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <span className="text-muted-foreground italic">No Gateway ID assigned yet</span>
                )}
              </div>
            )}
            <p className="text-[11px] text-muted-foreground mt-2">
              * The Gateway ID is required to process automated payouts to this freelancer.
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Bank Account Details */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Settlement Bank Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Account Holder</p>
                <p className="text-lg font-medium text-foreground">{bankAccount.accountHolder}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Bank Name</p>
                <p className="text-lg font-medium text-foreground">{bankAccount.bankName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Account Type</p>
                <p className="text-lg font-medium text-foreground">{bankAccount.accountType}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Account Number</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-mono font-bold text-foreground tracking-tighter">
                    ****{bankAccount.accountNumber.slice(-4)}
                  </p>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">IFSC Code</p>
                <p className="text-xl font-mono font-bold text-foreground">{bankAccount.ifscCode}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">UPI ID</p>
                <p className="text-lg font-medium text-foreground">{bankAccount.upiId}</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-xs text-muted-foreground mt-8"
      >
        Verified by Finance Team • Last modified: {new Date().toLocaleDateString()}
      </motion.p>
    </div>
  );
};

export default AccountDetails;
