import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { ActiveProjectsTable } from "@/components/dashboard/ActiveProjectsTable";
import { AssignedToMe } from "@/components/dashboard/AssignedToMe";
import { RiskOverview } from "@/components/dashboard/RiskOverview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const Index = () => {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 space-y-6">
            <DashboardFilters />
            
            <SummaryCards />
            
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <ActiveProjectsTable />
              </div>
              
              <div className="space-y-6">
                <AssignedToMe />
                <RiskOverview />
              </div>
            </div>
            
            <RecentActivity />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
