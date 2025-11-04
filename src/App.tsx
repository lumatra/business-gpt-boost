import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Examples from "./pages/Examples";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AIAssistants from "./pages/AIAssistants";
import Contact from "./pages/Contact";
import CategoriesPage from "./pages/CategoriesPage";
import OnboardingPortal from "./pages/OnboardingPortal";
import OnboardingManagement from "./pages/OnboardingManagement";
import AdminPortal from "./pages/AdminPortal";
import CompanyProfile from "./pages/CompanyProfile";
import AITrainingData from "./pages/AITrainingData";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import AcceptableUse from "./pages/AcceptableUse";
import DPA from "./pages/DPA";
import AIDisclaimer from "./pages/AIDisclaimer";
import { AuthProvider } from "./hooks/useAuth";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-assistants" element={<AIAssistants />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/onboarding/:token" element={<OnboardingPortal />} />
            <Route path="/onboarding-management" element={<OnboardingManagement />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/company-profile" element={<CompanyProfile />} />
            <Route path="/ai-training-data" element={<AITrainingData />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/acceptable-use" element={<AcceptableUse />} />
            <Route path="/dpa" element={<DPA />} />
            <Route path="/ai-disclaimer" element={<AIDisclaimer />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
