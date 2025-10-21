import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { VendorSidebar } from "@/components/VendorSidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, TrendingUp, CheckCircle, FileText, Eye, Edit, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

// Mock data for vendor dashboard
const mockMetrics = {
  activeProjects: 3,
  reportsThisMonth: 2,
  approvedReports: 8,
};

const mockReports = [
  {
    id: "1",
    projectName: "Department of Education Portal",
    reportingPeriod: "October 2024",
    overallRating: "Satisfactory",
    reportStatus: "Approved",
    submittedAt: "2024-10-25",
  },
  {
    id: "2",
    projectName: "Hawaii Health Connector",
    reportingPeriod: "October 2024",
    overallRating: "Unsatisfactory",
    reportStatus: "Submitted",
    submittedAt: "2024-10-28",
  },
  {
    id: "3",
    projectName: "Tax Modernization System",
    reportingPeriod: "September 2024",
    overallRating: "Satisfactory",
    reportStatus: "Draft",
    submittedAt: "2024-10-15",
  },
];

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "approved":
      return <Badge className="bg-green-500/10 text-green-700 border-green-200">Approved</Badge>;
    case "submitted":
      return <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">Submitted</Badge>;
    case "draft":
      return <Badge variant="outline">Draft</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getRatingDot = (rating: string) => {
  const color = rating === "Satisfactory" ? "bg-green-500" : "bg-amber-500";
  return <div className={`h-2 w-2 rounded-full ${color}`} />;
};

const VendorDashboard = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />
        
        <main className="flex-1">
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-base font-semibold text-foreground">My Projects</h1>
                <p className="text-sm text-muted-foreground">View and manage your assigned IV&V projects</p>
              </div>
              <Button onClick={() => navigate("/vendor/report/new")} className="bg-secondary hover:bg-secondary/90">
                <Plus className="mr-2 h-4 w-4" />
                Submit New Report
              </Button>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Summary Metrics */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Projects
                  </CardTitle>
                  <FileText className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent className="pb-5">
                  <div className="text-3xl font-bold text-foreground">{mockMetrics.activeProjects}</div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-600">+1</span> vs last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Reports This Month
                  </CardTitle>
                  <FileText className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent className="pb-5">
                  <div className="text-3xl font-bold text-foreground">{mockMetrics.reportsThisMonth}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Submitted in October
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Reports Approved
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent className="pb-5">
                  <div className="text-3xl font-bold text-foreground">{mockMetrics.approvedReports}</div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-600">+6%</span> vs last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports Table */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="pb-5">
                {mockReports.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Update</TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.projectName}</TableCell>
                          <TableCell>{report.reportingPeriod}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getRatingDot(report.overallRating)}
                              <span>{report.overallRating}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(report.reportStatus)}</TableCell>
                          <TableCell>{new Date(report.submittedAt).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-background">
                                {report.reportStatus.toLowerCase() === "draft" ? (
                                  <>
                                    <DropdownMenuItem onClick={() => navigate(`/vendor/report/${report.id}`)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                      <FileText className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </>
                                ) : (
                                  <DropdownMenuItem onClick={() => navigate(`/vendor/report/${report.id}`)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No reports submitted yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get started by submitting your first report
                    </p>
                    <Button onClick={() => navigate("/vendor/report/new")} className="bg-secondary hover:bg-secondary/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Submit New Report
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Access Section */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-accent/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Projects Needing a New Report</CardTitle>
                </CardHeader>
                <CardContent className="pb-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <span className="text-sm">Tax Modernization System</span>
                      <Badge variant="outline" className="text-xs">November Due</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Reports Draft</CardTitle>
                </CardHeader>
                <CardContent className="pb-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <span className="text-sm">Tax Modernization System - Sep 2024</span>
                        <div className="flex items-center gap-2">
                          <Button variant="secondary" size="sm" onClick={() => navigate("/vendor/report/3")}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default VendorDashboard;
