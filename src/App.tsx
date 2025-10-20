import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PublicCatalog from "./pages/PublicCatalog";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjectNew from "./pages/AdminProjectNew";
import ReportsTable from "./pages/ReportsTable";
import ReportDetail from "./pages/ReportDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorDashboard from "./pages/VendorDashboard";
import VendorReports from "./pages/VendorReports";
import VendorReportForm from "./pages/VendorReportForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/public" element={<PublicCatalog />} />
          <Route path="/public/catalog" element={<PublicCatalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/project/new" element={<AdminProjectNew />} />
          <Route path="/admin/reports" element={<ReportsTable />} />
          <Route path="/admin/report/:id" element={<ReportDetail />} />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/reports" element={<VendorReports />} />
          <Route path="/vendor/report/new" element={<VendorReportForm />} />
          <Route path="/vendor/report/:id" element={<VendorReportForm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
