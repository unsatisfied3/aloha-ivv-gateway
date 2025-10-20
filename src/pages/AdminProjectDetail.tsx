import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ArrowLeft, 
  Pencil, 
  Building2, 
  User, 
  Calendar, 
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data - matches AdminProjects
const mockProjects = [
  {
    id: "1",
    projectName: "Health Connect Modernization",
    sponsoringAgency: "Department of Health",
    ivvVendorName: "Accuity LLP",
    overallProjectStatus: "yellow",
    isActive: true,
    originalContractAmount: 2450000,
    totalPaidToDate: 1592500,
    startDate: "2024-10-01",
    plannedEndDate: "2025-11-30",
    currentProjectedEndDate: "2025-11-30",
    description: "Comprehensive modernization of the state's health information systems to improve patient care coordination, enable real-time data sharing between healthcare providers, and streamline administrative processes. This multi-phase project includes system integration, data migration, and staff training components.",
  },
  {
    id: "2",
    projectName: "Student Information System",
    sponsoringAgency: "Department of Education",
    ivvVendorName: "EduTech Partners",
    overallProjectStatus: "green",
    isActive: true,
    originalContractAmount: 1800000,
    totalPaidToDate: 1200000,
    startDate: "2024-08-15",
    plannedEndDate: "2025-08-15",
    currentProjectedEndDate: "2025-08-15",
    description: "Implementation of a modern student information system to centralize student records, attendance tracking, and academic performance monitoring across all public schools in the state.",
  },
  {
    id: "3",
    projectName: "Fleet Management System",
    sponsoringAgency: "Department of Transportation",
    ivvVendorName: "AutoManage Inc",
    overallProjectStatus: "green",
    isActive: true,
    originalContractAmount: 980000,
    totalPaidToDate: 780000,
    startDate: "2024-07-01",
    plannedEndDate: "2025-06-30",
    currentProjectedEndDate: "2025-06-30",
    description: "Development and deployment of an integrated fleet management platform for tracking vehicle maintenance, fuel consumption, and route optimization across all state-owned vehicles.",
  },
  {
    id: "4",
    projectName: "Digital Tax Portal",
    sponsoringAgency: "Department of Taxation",
    ivvVendorName: "FinTech Solutions",
    overallProjectStatus: "red",
    isActive: true,
    originalContractAmount: 3200000,
    totalPaidToDate: 2100000,
    startDate: "2024-05-01",
    plannedEndDate: "2025-12-31",
    currentProjectedEndDate: "2026-03-15",
    description: "Creation of a secure online portal for tax filing, payment processing, and account management. The system will modernize the state's tax collection infrastructure and improve taxpayer services.",
  },
];

// Mock reports data
const mockReports = [
  { id: "r1", projectId: "1", reportingPeriod: "April 2025", vendorContact: "Jane Doe", status: "Approved", overallRating: "yellow", submittedOn: "2025-04-30" },
  { id: "r2", projectId: "1", reportingPeriod: "March 2025", vendorContact: "Jane Doe", status: "Approved", overallRating: "yellow", submittedOn: "2025-03-31" },
  { id: "r3", projectId: "1", reportingPeriod: "February 2025", vendorContact: "Jane Doe", status: "Approved", overallRating: "green", submittedOn: "2025-02-28" },
  { id: "r4", projectId: "2", reportingPeriod: "April 2025", vendorContact: "John Smith", status: "Approved", overallRating: "green", submittedOn: "2025-04-30" },
];

// Mock findings summary
const mockFindings = {
  open: 3,
  inProgress: 5,
  closed: 12,
};

// Mock activity timeline
const mockActivity = [
  { id: 1, event: "Report Approved", description: "April 2025 monthly report approved by ETS", timestamp: "2025-05-02T14:30:00" },
  { id: 2, event: "Milestone Updated", description: "Phase 2 completion date extended by 2 weeks", timestamp: "2025-04-28T10:15:00" },
  { id: 3, event: "Report Submitted", description: "April 2025 monthly report submitted by vendor", timestamp: "2025-04-30T16:45:00" },
  { id: 4, event: "Finding Closed", description: "Risk issue #12 resolved and verified", timestamp: "2025-04-25T09:20:00" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "green":
      return { label: "On Track", icon: CheckCircle, className: "bg-green-500/20 text-green-700 border-green-500/30" };
    case "yellow":
      return { label: "At Risk", icon: AlertCircle, className: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30" };
    case "red":
      return { label: "Critical", icon: AlertCircle, className: "bg-red-500/20 text-red-700 border-red-500/30" };
    default:
      return { label: "Unknown", icon: AlertCircle, className: "bg-muted text-muted-foreground" };
  }
};

const getRatingBadge = (rating: string) => {
  switch (rating) {
    case "green":
      return "🟢";
    case "yellow":
      return "🟡";
    case "red":
      return "🔴";
    default:
      return "⚪";
  }
};

export default function AdminProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find project - in real app this would be from backend
  const project = mockProjects.find(p => p.id === id);
  
  if (!project) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AdminSidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
              <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
              <Button onClick={() => navigate("/admin/projects")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const statusBadge = getStatusBadge(project.overallProjectStatus);
  const budgetUsed = Math.round((project.totalPaidToDate / project.originalContractAmount) * 100);
  const projectReports = mockReports.filter(r => r.projectId === id).sort((a, b) => 
    new Date(b.submittedOn).getTime() - new Date(a.submittedOn).getTime()
  );

  // Calculate schedule variance
  const plannedEnd = new Date(project.plannedEndDate);
  const projectedEnd = new Date(project.currentProjectedEndDate);
  const scheduleDelayDays = Math.ceil((projectedEnd.getTime() - plannedEnd.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />

        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-16 items-center px-8 gap-4">
              <SidebarTrigger />
              
              <div className="flex-1 flex items-center gap-3">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/admin/projects">Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{project.projectName}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <Badge className={cn("border", statusBadge.className)}>
                  <statusBadge.icon className="h-4 w-4 mr-1" />
                  {statusBadge.label}
                </Badge>
                {!project.isActive && (
                  <Badge variant="outline" className="bg-muted text-muted-foreground border-muted-foreground/30">
                    Archived
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => navigate("/admin/projects")}>
                  <ArrowLeft className="h-4 w-4" />
                  Back to Projects
                </Button>
                <Button onClick={() => navigate(`/admin/project/${id}/edit`)}>
                  <Pencil className="h-4 w-4" />
                  Edit Project
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-8 bg-muted/30">

            {/* Section 1: Project Snapshot */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Sponsoring Agency</p>
                      <p className="font-medium">{project.sponsoringAgency}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">IV&V Vendor</p>
                      <p className="font-medium">{project.ivvVendorName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Project Dates</p>
                      <p className="font-medium">
                        Start: {format(new Date(project.startDate), "MMM dd, yyyy")}
                      </p>
                      <p className="font-medium">
                        Current End: {format(new Date(project.currentProjectedEndDate), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge className={cn("border mt-1", project.isActive ? "bg-primary/10 text-primary border-primary/30" : "bg-muted text-muted-foreground border-muted-foreground/30")}>
                        {project.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Budget & Schedule Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Budget & Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Budget Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Budget Progress</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Budget used {budgetUsed}%</span>
                        <span className="font-medium">
                          ${(project.totalPaidToDate / 1000000).toFixed(2)}M of ${(project.originalContractAmount / 1000000).toFixed(2)}M
                        </span>
                      </div>
                      <Progress value={budgetUsed} className="h-3 bg-muted [&>div]:bg-primary" />
                    </div>
                  </div>

                  {/* Schedule Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Schedule Comparison</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Planned End Date</span>
                        <span className="font-medium">{format(new Date(project.plannedEndDate), "MMM dd, yyyy")}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Current Projected End</span>
                        <span className="font-medium">{format(new Date(project.currentProjectedEndDate), "MMM dd, yyyy")}</span>
                      </div>
                      {scheduleDelayDays > 0 && (
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
                          <p className="text-sm font-medium text-yellow-700">
                            Schedule variance: {scheduleDelayDays} days behind
                          </p>
                        </div>
                      )}
                      {scheduleDelayDays === 0 && (
                        <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
                          <p className="text-sm font-medium text-green-700">
                            On schedule
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section 2: Description */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>Detailed description and scope of work</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground">
                  {project.description || "No description available."}
                </p>
              </CardContent>
            </Card>

            {/* Section 3: Reports for This Project */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Monthly Reports</CardTitle>
                <CardDescription>All IV&V reports submitted for this project</CardDescription>
              </CardHeader>
              <CardContent>
                {projectReports.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reporting Period</TableHead>
                          <TableHead>Vendor Contact</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Risk Tag</TableHead>
                          <TableHead>Submitted On</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projectReports.map((report) => {
                          const ratingBadge = getStatusBadge(report.overallRating);
                          return (
                            <TableRow key={report.id}>
                              <TableCell className="font-medium">{report.reportingPeriod}</TableCell>
                              <TableCell>{report.vendorContact}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                                  {report.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={cn("border", ratingBadge.className)}>
                                  {ratingBadge.label}
                                </Badge>
                              </TableCell>
                              <TableCell>{format(new Date(report.submittedOn), "MMM dd, yyyy")}</TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => navigate(`/admin/report/${report.id}`)}
                                >
                                  View Report
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-40" />
                    <p>No reports have been submitted for this project yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section 4: Findings Summary */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Risk Findings Summary</CardTitle>
                <CardDescription>Current risk issues identified in this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 cursor-pointer hover:bg-red-500/20 transition-colors" onClick={() => navigate(`/admin/reports?status=open&project=${id}`)}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-red-700">Open</span>
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <p className="text-3xl font-bold text-red-700">{mockFindings.open}</p>
                    <p className="text-xs text-red-600 mt-1">Requires immediate attention</p>
                    <Button variant="ghost" size="sm" className="mt-3 w-full text-red-700 hover:text-red-800 hover:bg-red-500/20">
                      View Open Issues
                    </Button>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 cursor-pointer hover:bg-yellow-500/20 transition-colors" onClick={() => navigate(`/admin/reports?status=in-progress&project=${id}`)}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-yellow-700">In Progress</span>
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                    <p className="text-3xl font-bold text-yellow-700">{mockFindings.inProgress}</p>
                    <p className="text-xs text-yellow-600 mt-1">Being addressed by team</p>
                    <Button variant="ghost" size="sm" className="mt-3 w-full text-yellow-700 hover:text-yellow-800 hover:bg-yellow-500/20">
                      View In Progress
                    </Button>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 cursor-pointer hover:bg-green-500/20 transition-colors" onClick={() => navigate(`/admin/reports?status=closed&project=${id}`)}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-700">Closed</span>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-700">{mockFindings.closed}</p>
                    <p className="text-xs text-green-600 mt-1">Successfully resolved</p>
                    <Button variant="ghost" size="sm" className="mt-3 w-full text-green-700 hover:text-green-800 hover:bg-green-500/20">
                      View Closed Issues
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 5: Project Activity Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Timeline of key events and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActivity.map((activity, index) => (
                    <div key={activity.id} className="flex gap-4">
                      <div className="relative flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {index < mockActivity.length - 1 && (
                          <div className="w-px h-full bg-border mt-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <p className="font-medium text-sm">{activity.event}</p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {format(new Date(activity.timestamp), "MMM dd, yyyy")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
