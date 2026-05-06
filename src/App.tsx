import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Hub from "./pages/Hub";
import Profile from "./pages/Profile";
import DomainLayout from "./components/DomainLayout";
import Overview from "./pages/domain/Overview";
import Submissions from "./pages/domain/Submissions";
import EditRequests from "./pages/domain/EditRequests";
import Temples from "./pages/domain/Temples";
import Duplicates from "./pages/domain/Duplicates";
import Contributors from "./pages/domain/Contributors";
import Categories from "./pages/domain/Categories";
import AuditHistory from "./pages/domain/AuditHistory";
import OnboardingLayout from "./components/OnboardingLayout";
import OnboardingOverview from "./pages/onboarding/Overview";
import RegistrationPipeline from "./pages/onboarding/RegistrationPipeline";

import DirectOnboarding from "./pages/onboarding/DirectOnboarding";

import ApprovalLogs from "./pages/onboarding/ApprovalLogs";
import DevoteeLayout from "./components/DevoteeLayout";
import DevoteeOverview from "./pages/devotee/Overview";
import AllDevotees from "./pages/devotee/AllDevotees";
import DevoteeDetail from "./pages/devotee/DevoteeDetail";
import DevoteeAnalytics from "./pages/devotee/Analytics";
import PricingLayout from "./components/PricingLayout";
import PricingOverview from "./pages/pricing/Overview";
import PricingSubscriptions from "./pages/pricing/Subscriptions";
import FreelancerLayout from "./components/FreelancerLayout";
import FreelancerAccounts from "./pages/freelancer/Accounts";
import FreelancerAccountDetails from "./pages/freelancer/AccountDetails";
import PartnerLayout from "./components/PartnerLayout";
import PartnerOverview from "./pages/partner/Overview";
import PartnerManagement from "./pages/partner/Management";
import PartnerProfile from "./pages/partner/Profile";
import PartnerCommissions from "./pages/partner/Commissions";
import PartnerTemples from "./pages/partner/Temples";
import AgentPayouts from "./pages/partner/AgentPayouts";
import NotFound from "./pages/NotFound";
import { GlobalNotes } from "./components/GlobalNotes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            {/* Keehoo Admin Hub */}
            <Route path="/hub" element={<Hub />} />
            <Route path="/profile" element={<Profile />} />

            {/* Domain: Information */}
            <Route path="/domain/information" element={<DomainLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<Overview />} />
              <Route path="submissions" element={<Submissions />} />
              <Route path="edit-requests" element={<EditRequests />} />
              <Route path="temples" element={<Temples />} />
              <Route path="duplicates" element={<Duplicates />} />
              <Route path="contributors" element={<Contributors />} />
              <Route path="categories" element={<Categories />} />
              <Route path="audit" element={<AuditHistory />} />
            </Route>

            {/* Domain: Onboarding */}
            <Route path="/domain/onboarding" element={<OnboardingLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OnboardingOverview />} />
              <Route path="registration-pipeline" element={<RegistrationPipeline />} />

              <Route path="direct-onboarding" element={<DirectOnboarding />} />

              <Route path="approval-logs" element={<ApprovalLogs />} />
            </Route>

            {/* Devotee Management */}
            <Route path="/devotee" element={<DevoteeLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<DevoteeOverview />} />
              <Route path="all-devotees" element={<AllDevotees />} />
              <Route path="analytics" element={<DevoteeAnalytics />} />
              <Route path=":devoteeId" element={<DevoteeDetail />} />
            </Route>

            {/* Pricing Management */}
            <Route path="/pricing" element={<PricingLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<PricingOverview />} />
              <Route path="subscriptions" element={<PricingSubscriptions />} />
            </Route>

            <Route path="/domain/freelancer" element={<FreelancerLayout />}>
              <Route index element={<Navigate to="accounts" replace />} />
              <Route path="accounts" element={<FreelancerAccounts />} />
              <Route path="account-details" element={<FreelancerAccountDetails />} />
            </Route>

            {/* Partner Management */}
            <Route path="/partner" element={<PartnerLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<PartnerOverview />} />
              <Route path="management" element={<PartnerManagement />} />
              <Route path="profile/:id" element={<PartnerProfile />} />
              <Route path="commissions" element={<PartnerCommissions />} />
              <Route path="temples" element={<PartnerTemples />} />
              <Route path="payouts" element={<AgentPayouts />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <GlobalNotes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
