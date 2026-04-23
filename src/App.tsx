import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
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
import TenantLayout from "./components/TenantLayout";
import TenantOverview from "./pages/tenant/Overview";
import AllTenants from "./pages/tenant/AllTenants";
import SubscriptionPlans from "./pages/tenant/SubscriptionPlans";
import UsageMonitoring from "./pages/tenant/UsageMonitoring";
import SuspensionCompliance from "./pages/tenant/SuspensionCompliance";
import RegionManagement from "./pages/tenant/RegionManagement";
import TenantLogs from "./pages/tenant/TenantLogs";
import DevoteeLayout from "./components/DevoteeLayout";
import DevoteeOverview from "./pages/devotee/Overview";
import AllDevotees from "./pages/devotee/AllDevotees";
import DevoteeDetail from "./pages/devotee/DevoteeDetail";
import DevoteeAnalytics from "./pages/devotee/Analytics";
import PricingLayout from "./components/PricingLayout";
import PricingOverview from "./pages/pricing/Overview";
import FreelancerLayout from "./components/FreelancerLayout";
import FreelancerAccounts from "./pages/freelancer/Accounts";
import FreelancerAccountDetails from "./pages/freelancer/AccountDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing & Auth Routes */}
            <Route path="/" element={<LandingPage />} />
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

            {/* Domain: Tenants */}
            <Route path="/domain/tenants" element={<TenantLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<TenantOverview />} />
              <Route path="all" element={<AllTenants />} />
              <Route path="plans" element={<SubscriptionPlans />} />
              <Route path="usage" element={<UsageMonitoring />} />
              <Route path="suspension" element={<SuspensionCompliance />} />
              <Route path="regions" element={<RegionManagement />} />
              <Route path="logs" element={<TenantLogs />} />
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
            </Route>

            <Route path="/domain/freelancer" element={<FreelancerLayout />}>
              <Route index element={<Navigate to="accounts" replace />} />
              <Route path="accounts" element={<FreelancerAccounts />} />
              <Route path="account-details" element={<FreelancerAccountDetails />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
