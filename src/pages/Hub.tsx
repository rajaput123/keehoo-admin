import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Database,
  Building2,
  Users,
  Briefcase,
  Tag,
  Heart,
  LogOut,
  Bell,
  User,
  Settings,
  HelpCircle,
  Handshake,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const domains = [
  {
    id: "information",
    title: "Information",
    icon: Database,
    status: "Active",
    path: "/domain/information/overview",
    description: "Manage temple data, categories, and contributor submissions",
  },
  {
    id: "onboarding",
    title: "Onboarding",
    icon: Building2,
    status: "Active",
    path: "/domain/onboarding/overview",
    description: "Temple registration, verification, and tenant creation workflows",
  },
  {
    id: "devotee",
    title: "Devotee",
    icon: Heart,
    status: "Active",
    path: "/devotee/overview",
    description: "Manage devotee registrations, donations, and volunteer activities",
  },
  {
    id: "freelancer",
    title: "Freelancer",
    icon: Briefcase,
    status: "Active",
    path: "/domain/freelancer/accounts",
    description: "Manage freelance contractors and project assignments",
  },
  {
    id: "pricing",
    title: "Pricing",
    icon: Tag,
    status: "Active",
    path: "/pricing/overview",
    description: "Configure pricing plans and billing models",
  },
  {
    id: "partner",
    title: "Partner",
    icon: Handshake,
    status: "Active",
    path: "/partner/overview",
    description: "Manage partner ecosystem, commissions, and targets",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
};

const Hub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/hub")}
            className="text-xl font-bold text-primary"
          >
            Qoo
          </motion.button>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            {/* Notification Bell */}
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-destructive rounded-full border-2 border-white" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View notifications and alerts</p>
              </TooltipContent>
            </Tooltip>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      SA
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 bg-white border shadow-lg">
                <DropdownMenuItem onClick={() => navigate("/profile")} className="gap-2">
                  <User className="h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/login")} className="gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Admin Hub</h1>
          <p className="text-sm text-muted-foreground">Select a domain to manage</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-4 sm:grid-cols-6 gap-5"
        >
          {domains.map((domain) => (
            <Tooltip key={domain.id} delayDuration={300}>
              <TooltipTrigger asChild>
                <motion.button
                  variants={itemVariants}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(domain.path)}
                  disabled={domain.status === "Coming Soon"}
                  className="group flex flex-col items-center text-center focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {/* Icon Container - Uniform gray color */}
                  <div className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center mb-2
                    ${domain.status === "Active"
                      ? "bg-muted group-hover:bg-primary group-hover:shadow-lg"
                      : "bg-muted"
                    }
                    transition-all duration-200
                  `}>
                    <domain.icon
                      className={`
                        h-6 w-6 transition-colors duration-200
                        ${domain.status === "Active"
                          ? "text-foreground group-hover:text-white"
                          : "text-muted-foreground"
                        }
                      `}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Label */}
                  <span className="text-xs font-medium text-foreground">
                    {domain.title}
                  </span>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[200px] text-center">
                <p className="text-xs">{domain.description}</p>
                {domain.status === "Coming Soon" && (
                  <p className="text-xs text-muted-foreground mt-1">Coming Soon</p>
                )}
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Hub;
