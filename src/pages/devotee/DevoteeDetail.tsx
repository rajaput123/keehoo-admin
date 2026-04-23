import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface Devotee {
  templeId: string;
  devotee_id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other";
  status: "active" | "inactive" | "pending";
  devotee_type: string[];
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_devotee_registered: boolean;
  is_volunteer: boolean;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  notes: string;
  created_at: Date;
  updated_at: Date;
}

const sampleDevolee: Devotee = {
  templeId: "6bdbdd93-0a7c-46e1-b5a7-301660641aff",
  devotee_id: "USR-57512857",
  user_id: "accf8d07-dd25-47d0-b562-11da1fa40f95",
  name: "Geeta",
  email: "renukarajaput6@gmail.com",
  phone: "9741217909",
  gender: "female",
  status: "active",
  devotee_type: ["devotee", "donars"],
  is_email_verified: false,
  is_phone_verified: false,
  is_devotee_registered: true,
  is_volunteer: false,
  location: {
    address: "Huubali",
    city: "Bijapur(KAR)",
    state: "Karnataka",
    pincode: "586113",
    country: "India",
  },
  notes: "",
  created_at: new Date("2026-03-19T07:38:21.221Z"),
  updated_at: new Date("2026-04-20T19:08:24.119Z"),
};

const DevoteeDetail = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [devotee, setDevotee] = useState<Devotee>(sampleDevolee);

  const handleSave = () => {
    setIsEditing(false);
    // TODO: API call to save devotee
  };

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/devotee/all-devotees")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{devotee.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{devotee.devotee_id}</p>
          </div>
        </div>
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="gap-2"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4" />
              Edit
            </>
          )}
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Personal Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Name</Label>
                <Input
                  value={devotee.name}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setDevotee({ ...devotee, name: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">Email</Label>
                <Input
                  type="email"
                  value={devotee.email}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setDevotee({ ...devotee, email: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">Phone</Label>
                <Input
                  value={devotee.phone}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setDevotee({ ...devotee, phone: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">Gender</Label>
                <Select disabled={!isEditing}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={devotee.gender} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Location Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Location</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Address</Label>
                <Input
                  value={devotee.location.address}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">City</Label>
                <Input
                  value={devotee.location.city}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">State</Label>
                <Input
                  value={devotee.location.state}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">Pincode</Label>
                <Input
                  value={devotee.location.pincode}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-sm">Country</Label>
                <Input
                  value={devotee.location.country}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Status Card */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Status & Type</h3>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Status</Label>
                <Badge className="mt-2 w-full justify-center">{devotee.status}</Badge>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">
                  Devotee Type
                </Label>
                <div className="space-y-2">
                  {devotee.devotee_type.map((type) => (
                    <Badge key={type} variant="secondary">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Verification Card */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Verification</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="email-verified"
                  checked={devotee.is_email_verified}
                  disabled={!isEditing}
                />
                <Label
                  htmlFor="email-verified"
                  className="text-sm font-normal cursor-pointer"
                >
                  Email Verified
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="phone-verified"
                  checked={devotee.is_phone_verified}
                  disabled={!isEditing}
                />
                <Label
                  htmlFor="phone-verified"
                  className="text-sm font-normal cursor-pointer"
                >
                  Phone Verified
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="registered"
                  checked={devotee.is_devotee_registered}
                  disabled={!isEditing}
                />
                <Label
                  htmlFor="registered"
                  className="text-sm font-normal cursor-pointer"
                >
                  Registered
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="volunteer"
                  checked={devotee.is_volunteer}
                  disabled={!isEditing}
                />
                <Label
                  htmlFor="volunteer"
                  className="text-sm font-normal cursor-pointer"
                >
                  Is Volunteer
                </Label>
              </div>
            </div>
          </Card>

          {/* Metadata */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Devotee ID</p>
                <p className="font-medium text-xs mt-1">{devotee.devotee_id}</p>
              </div>
              <div>
                <p className="text-muted-foreground">User ID</p>
                <p className="font-medium text-xs mt-1 break-all">{devotee.user_id}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Temple ID</p>
                <p className="font-medium text-xs mt-1 break-all">{devotee.templeId}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DevoteeDetail;
