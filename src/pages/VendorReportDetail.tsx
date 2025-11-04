import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { VendorSidebar } from "@/components/VendorSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  ArrowLeft, 
  Calendar, 
  Building2, 
  Users, 
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Download,
  Edit,
  FileText
} from "lucide-react";

interface MockReport {
  id: string;
  projectId: string;
  projectName: string;
  reportingPeriod: string;
  reportingMonth: number;
  reportingYear: number;
  overallRating: "green" | "yellow" | "red";
  teamRating: "green" | "yellow" | "red";
  processRating: "green" | "yellow" | "red";
  techRating: "green" | "yellow" | "red";
  reportStatus: "draft" | "submitted" | "approved";
  submittedAt: string;
  vendorName: string;
  keyAccomplishments: string[];
  challenges: string[];
  upcomingMilestones: string[];
  budgetStatus: string;
  scheduleStatus: string;
  riskSummary: string;
  adminComments?: string;
}

const mockReport: MockReport = {
  id: "1",
  projectId: "1",
  projectName: "DOH Health Connect Upgrade",
  reportingPeriod: "April 2025",
  reportingMonth: 4,
  reportingYear: 2025,
  overallRating: "yellow",
  teamRating: "green",
  processRating: "yellow",
  techRating: "yellow",
  reportStatus: "submitted",
  submittedAt: "2025-04-05",
  vendorName: "TechCorp Solutions",
  keyAccomplishments: [
    "Completed Phase 1 database migration (90% of records)",
    "Successfully deployed UAT environment for client testing",
    "Onboarded 3 additional senior developers to accelerate timeline",
    "Resolved 45 critical bugs identified in initial testing"
  ],
  challenges: [
    "Delay in receiving production API credentials from DOH IT team",
    "Performance issues identified during load testing with concurrent users",
    "Two key team members on medical leave affecting velocity"
  ],
  upcomingMilestones: [
    "Complete integration testing with legacy systems (May 15)",
    "User acceptance testing sign-off (May 28)",
    "Production deployment preparation (June 1)",
    "Go-live planned for June 15, 2025"
  ],
  budgetStatus: "On track - 65% of allocated budget utilized",
  scheduleStatus: "2 weeks behind original timeline due to API credential delays",
  riskSummary: "Medium risk: API integration delays and performance optimization needed. Mitigation: Added specialized DevOps resource and extended testing phase.",
  adminComments: "Report reviewed. Please provide detailed performance metrics in next submission."
};

const VendorReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In real implementation, fetch report data using id
  const report = mockReport;

  const getRatingConfig = (rating: "green" | "yellow" | "red") => {
    switch (rating) {
      case "green":
        return {
          label: "On Track",
          className: "bg-accent/20 text-accent border-accent/30",
          icon: CheckCircle2,
          color: "text-accent"
        };
      case "yellow":
        return {
          label: "At Risk",
          className: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
          icon: AlertCircle,
          color: "text-yellow-700"
        };
      case "red":
        return {
          label: "Critical",
          className: "bg-destructive/20 text-destructive border-destructive/30",
          icon: XCircle,
          color: "text-destructive"
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline" className="bg-muted text-muted-foreground">Draft</Badge>;
      case "submitted":
        return <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">Submitted</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30">Approved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const overallConfig = getRatingConfig(report.overallRating);
  const OverallIcon = overallConfig.icon;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-16 items-center px-8 gap-4">
              <SidebarTrigger />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/vendor/reports">Reports</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{report.projectName}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="ml-auto flex gap-2">
                {report.reportStatus === "draft" && (
                  <Button 
                    onClick={() => navigate(`/vendor/report/${id}`)}
                    variant="default"
                    className="gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Report
                  </Button>
                )}
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-8 bg-muted/30">
            <div className="max-w-7xl mx-auto space-y-6">
              
              {/* Report Header */}
              <Card className="bg-background">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-2xl">{report.projectName}</CardTitle>
                      <CardDescription className="text-base">
                        Monthly Status Report - {report.reportingPeriod}
                      </CardDescription>
                    </div>
                    {getStatusBadge(report.reportStatus)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Vendor</p>
                        <p className="text-base font-semibold">{report.vendorName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                        <p className="text-base font-semibold">
                          {new Date(report.submittedAt).toLocaleDateString("en-US", { 
                            month: "long", 
                            day: "numeric", 
                            year: "numeric" 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <OverallIcon className={`h-5 w-5 ${overallConfig.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Overall Status</p>
                        <Badge className={overallConfig.className}>
                          {overallConfig.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Ratings */}
              <Card className="bg-background">
                <CardHeader>
                  <CardTitle className="text-lg">Detailed Ratings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Team Performance", rating: report.teamRating },
                      { label: "Project Management", rating: report.processRating },
                      { label: "Technical Readiness", rating: report.techRating }
                    ].map((item) => {
                      const config = getRatingConfig(item.rating);
                      const Icon = config.icon;
                      return (
                        <div key={item.label} className="flex items-center gap-3 p-4 border rounded-lg">
                          <Icon className={`h-5 w-5 ${config.color}`} />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                            <Badge className={config.className} variant="outline">
                              {config.label}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Tabs for detailed information */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="accomplishments">Accomplishments</TabsTrigger>
                  <TabsTrigger value="challenges">Challenges & Risks</TabsTrigger>
                  <TabsTrigger value="milestones">Upcoming Milestones</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Card className="bg-background">
                    <CardHeader>
                      <CardTitle>Budget & Schedule Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Budget Status</h4>
                        <p className="text-base">{report.budgetStatus}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Schedule Status</h4>
                        <p className="text-base">{report.scheduleStatus}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Risk Summary</h4>
                        <p className="text-base">{report.riskSummary}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {report.adminComments && (
                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-primary" />
                          Admin Feedback
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-base">{report.adminComments}</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="accomplishments">
                  <Card className="bg-background">
                    <CardHeader>
                      <CardTitle>Key Accomplishments This Period</CardTitle>
                      <CardDescription>Major achievements and completed deliverables</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {report.keyAccomplishments.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                            <span className="text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="challenges">
                  <Card className="bg-background">
                    <CardHeader>
                      <CardTitle>Challenges & Issues</CardTitle>
                      <CardDescription>Current obstacles and risk factors</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {report.challenges.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
                            <span className="text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="milestones">
                  <Card className="bg-background">
                    <CardHeader>
                      <CardTitle>Upcoming Milestones</CardTitle>
                      <CardDescription>Planned deliverables for next reporting period</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {report.upcomingMilestones.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <TrendingUp className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <span className="text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default VendorReportDetail;
