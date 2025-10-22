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
  MoreVertical,
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
    plannedEndDate: "2025-07-31",
    currentProjectedEndDate: "2025-10-15",
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

// Mock findings/tasks data
const mockTasks = [
  { id: 1, task: "Security vulnerability in authentication module", riskFactor: "red", assignee: "Security Team", dueDate: "2025-05-15", status: "open" },
  { id: 2, task: "Performance degradation in database queries", riskFactor: "yellow", assignee: "Backend Team", dueDate: "2025-05-20", status: "open" },
  { id: 3, task: "Integration testing incomplete for Phase 2", riskFactor: "yellow", assignee: "QA Team", dueDate: "2025-05-18", status: "open" },
  { id: 4, task: "API documentation needs update", riskFactor: "green", assignee: "Dev Team", dueDate: "2025-05-25", status: "in-progress" },
  { id: 5, task: "User acceptance testing pending approval", riskFactor: "red", assignee: "Project Manager", dueDate: "2025-05-12", status: "open" },
  { id: 6, task: "Third-party service migration delayed", riskFactor: "red", assignee: "DevOps Team", dueDate: "2025-05-10", status: "in-progress" },
  { id: 7, task: "Code review backlog accumulating", riskFactor: "yellow", assignee: "Lead Developer", dueDate: "2025-05-22", status: "in-progress" },
  { id: 8, task: "Accessibility compliance review needed", riskFactor: "yellow", assignee: "UX Team", dueDate: "2025-05-28", status: "open" },
];

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

            {/* Section 1: Project Overview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  {project.description || "No description available."}
                </p>
              </CardContent>
            </Card>

            {/* Section 2: Project Snapshot */}
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
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Project Dates</p>
                      <p className="font-medium">
                        Start: {format(new Date(project.startDate), "MMM dd, yyyy")}
                      </p>
                      <p className={cn("font-medium", scheduleDelayDays > 0 && "text-red-600")}>
                        Current End: {format(new Date(project.currentProjectedEndDate), "MMM dd, yyyy")}
                      </p>
                      {scheduleDelayDays > 0 && (
                        <div className="mt-1">
                          <Badge className="text-xs bg-red-500/20 text-red-700 border-red-500/30">
                            Delayed +{Math.floor(scheduleDelayDays / 7)} weeks
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge className={cn("border mt-1", statusBadge.className)}>
                        <statusBadge.icon className="h-3 w-3 mr-1" />
                        {statusBadge.label}
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
                      {/* Timeline visualization */}
                      <div className="space-y-3 pt-3">
                        {/* Legend */}
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <span className="font-medium">Current</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary/50" />
                            <span className="font-medium">Projected</span>
                          </div>
                        </div>

                        {/* Timeline with dates and month markers */}
                        <div className="space-y-2">
                          <div className="relative pt-8 pb-8">
                            {/* Timeline bars */}
                            <div className="relative space-y-3">
                              {/* Current bar */}
                              <div className="relative h-6 group">
                                <div 
                                  className="absolute h-full bg-primary rounded"
                                  style={{ 
                                    left: '0%', 
                                    width: `${((new Date(project.plannedEndDate).getTime() - new Date(project.startDate).getTime()) / (new Date(project.currentProjectedEndDate).getTime() - new Date(project.startDate).getTime())) * 100}%` 
                                  }}
                                />
                                {/* Current end marker with hover */}
                                <div 
                                  className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity"
                                  style={{ 
                                    left: `${((new Date(project.plannedEndDate).getTime() - new Date(project.startDate).getTime()) / (new Date(project.currentProjectedEndDate).getTime() - new Date(project.startDate).getTime())) * 100}%`,
                                    transform: 'translateX(-50%)'
                                  }}
                                >
                                  <div className="bg-popover rounded px-2 py-1 shadow-sm">
                                    <span className="text-xs font-medium whitespace-nowrap">
                                      {format(new Date(project.plannedEndDate), "MMM dd, yyyy")}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Projected bar */}
                              <div className="relative h-6 group">
                                <div 
                                  className="absolute h-full bg-primary/50 rounded"
                                  style={{ left: '0%', width: '100%' }}
                                />
                                {/* Projected end marker with hover */}
                                <div className="absolute -top-10 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="bg-popover rounded px-2 py-1 shadow-sm">
                                    <span className={cn("text-xs font-semibold whitespace-nowrap", scheduleDelayDays > 0 ? "text-red-600" : "")}>
                                      {format(new Date(project.currentProjectedEndDate), "MMM dd, yyyy")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Month grid lines at bottom */}
                            {(() => {
                              const startDate = new Date(project.startDate);
                              const endDate = new Date(project.currentProjectedEndDate);
                              const totalDuration = endDate.getTime() - startDate.getTime();
                              const monthMarkers = [];
                              
                              let currentDate = new Date(startDate);
                              let lastYear = currentDate.getFullYear();
                              currentDate.setDate(1);
                              
                              while (currentDate <= endDate) {
                                const percentage = ((currentDate.getTime() - startDate.getTime()) / totalDuration) * 100;
                                const currentYear = currentDate.getFullYear();
                                const showYear = currentYear !== lastYear;
                                
                                if (percentage >= 0 && percentage <= 100) {
                                  monthMarkers.push(
                                    <div key={currentDate.toISOString()} className="absolute top-0 bottom-0" style={{ left: `${percentage}%` }}>
                                      <span className="absolute top-full mt-1 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap">
                                        {format(currentDate, showYear ? "MMM yyyy" : "MMM")}
                                      </span>
                                    </div>
                                  );
                                }
                                
                                lastYear = currentYear;
                                currentDate.setMonth(currentDate.getMonth() + 1);
                              }
                              return monthMarkers;
                            })()}

                            {/* Start date marker with hover */}
                            <div className="absolute top-0 -left-1 h-full group">
                              <div className="w-px h-full bg-muted-foreground/30" />
                              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-popover rounded px-2 py-1 shadow-sm">
                                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                                    {format(new Date(project.startDate), "MMM dd, yyyy")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section 4: Reports for This Project */}
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
                          <TableHead className="w-12"></TableHead>
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
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => navigate(`/admin/report/${report.id}`)}
                                >
                                  <MoreVertical className="h-4 w-4" />
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

            {/* Section 5: Risk Findings - Tasks Table */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Risk Findings & Tasks</CardTitle>
                <CardDescription>Action items and issues requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[45%]">Task / Issue</TableHead>
                        <TableHead>Risk Factor</TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTasks.map((task) => {
                        const riskBadge = getStatusBadge(task.riskFactor);
                        return (
                          <TableRow key={task.id}>
                            <TableCell className="font-medium">{task.task}</TableCell>
                            <TableCell>
                              <Badge className={cn("border", riskBadge.className)}>
                                {riskBadge.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{task.assignee}</TableCell>
                            <TableCell className="text-muted-foreground">{format(new Date(task.dueDate), "MMM dd, yyyy")}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Section 6: Project Activity Timeline */}
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
