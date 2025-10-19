import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  User, 
  Calendar,
  Building2,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  FolderKanban,
  FileSearch,
  FileCheck,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";

const summaryStats = [
  { 
    title: "Total Active Projects", 
    value: 127, 
    trend: "+12%",
    trendLabel: "from last month",
    isPositive: true,
    icon: FolderKanban,
  },
  { 
    title: "Reports in Review", 
    value: 34, 
    trend: "+5%",
    trendLabel: "from last month",
    isPositive: true,
    icon: FileSearch,
  },
  { 
    title: "Published Reports", 
    value: 89, 
    trend: "+8%",
    trendLabel: "from last month",
    isPositive: true,
    icon: FileCheck,
  },
  { 
    title: "High-Risk Projects", 
    value: 15, 
    trend: "-3%",
    trendLabel: "from last month",
    isPositive: false,
    icon: AlertTriangle,
  },
];

// Mock data using schema field names
const currentProjects = [
  {
    id: 1,
    projectName: "DOH Health Connect Upgrade",
    sponsoringAgency: "Department of Health",
    ivvVendorName: "TechCorp Solutions",
    overallProjectStatus: "yellow", // red, yellow, green
    isActive: true,
    originalContractAmount: 2450000,
    totalPaidToDate: 1850000,
  },
  {
    id: 2,
    projectName: "Student Information System",
    sponsoringAgency: "Department of Education",
    ivvVendorName: "EduTech Partners",
    overallProjectStatus: "green",
    isActive: true,
    originalContractAmount: 1800000,
    totalPaidToDate: 1200000,
  },
  {
    id: 3,
    projectName: "Fleet Management System",
    sponsoringAgency: "Department of Transportation",
    ivvVendorName: "AutoManage Inc",
    overallProjectStatus: "green",
    isActive: true,
    originalContractAmount: 980000,
    totalPaidToDate: 780000,
  },
  {
    id: 4,
    projectName: "Digital Tax Portal",
    sponsoringAgency: "Department of Taxation",
    ivvVendorName: "FinTech Solutions",
    overallProjectStatus: "red",
    isActive: true,
    originalContractAmount: 3200000,
    totalPaidToDate: 2100000,
  },
  {
    id: 5,
    projectName: "Benefits Management System",
    sponsoringAgency: "Department of Human Services",
    ivvVendorName: "Social Systems Co",
    overallProjectStatus: "yellow",
    isActive: true,
    originalContractAmount: 1650000,
    totalPaidToDate: 980000,
  },
];

const recentActivity = [
  { id: 1, event: "Report submitted for DOH Health Connect", timestamp: "2 hours ago", type: "submission" },
  { id: 2, event: "Student Info System marked approved", timestamp: "5 hours ago", type: "approval" },
  { id: 3, event: "Tax Portal report revision requested", timestamp: "1 day ago", type: "revision" },
  { id: 4, event: "New project added: Judicial Case Mgmt", timestamp: "2 days ago", type: "project" },
];

const myAssignments = [
  { id: 1, name: "Student Records System", dueDate: "Dec 15, 2024", progress: 65, status: "In Progress" },
  { id: 2, name: "Public Health Portal", dueDate: "Dec 20, 2024", progress: 40, status: "Under Review" },
  { id: 3, name: "Tax Management Platform", dueDate: "Jan 5, 2025", progress: 20, status: "Starting Soon" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "green":
      return "bg-accent/20 text-accent border-accent/30";
    case "yellow":
      return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30 dark:text-yellow-400";
    case "red":
      return "bg-destructive/20 text-destructive border-destructive/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "green":
      return "On Track";
    case "yellow":
      return "At Risk";
    case "red":
      return "Critical";
    default:
      return "Unknown";
  }
};

const AdminDashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-16 items-center px-8 gap-4">
              <SidebarTrigger />
              
              <h1 className="text-xl font-semibold text-foreground flex-1">
                Admin Dashboard — State Project Oversight
              </h1>
              
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-background z-50">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                    <DropdownMenuItem>Notifications</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-8 bg-muted/30">
            {/* Dashboard Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
              <p className="text-muted-foreground mb-6">
                Monitor active projects, report progress, and upcoming reviews.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search projects, vendors, or agencies..."
                    className="pl-9 bg-background"
                  />
                </div>
                <Button variant="outline" className="gap-2 bg-background">
                  <Calendar className="h-4 w-4" />
                  Date Range
                </Button>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {summaryStats.map((stat, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-2">{stat.title}</p>
                        <p className="text-4xl font-bold text-foreground mb-3">{stat.value}</p>
                        <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? 'text-primary' : 'text-muted-foreground'}`}>
                          {stat.isPositive ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span>{stat.trend}</span>
                          <span className="text-muted-foreground font-normal">{stat.trendLabel}</span>
                        </div>
                      </div>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Active Projects Table */}
              <div className="lg:col-span-2">
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle>Active Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Project Name</TableHead>
                            <TableHead>Agency</TableHead>
                            <TableHead className="hidden md:table-cell">Vendor</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentProjects.map((project) => (
                            <TableRow 
                              key={project.id} 
                              className="cursor-pointer hover:bg-muted/50"
                              onClick={() => window.location.href = `/admin/report/${project.id}`}
                            >
                              <TableCell className="font-medium">{project.projectName}</TableCell>
                              <TableCell className="text-sm">
                                <div className="flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-muted-foreground" />
                                  <span className="hidden sm:inline">{project.sponsoringAgency}</span>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                                {project.ivvVendorName}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={getStatusColor(project.overallProjectStatus)}>
                                  {getStatusLabel(project.overallProjectStatus)}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-4">
                      <Link to="/admin/reports">
                        <Button variant="ghost" className="w-full sm:w-auto text-primary">
                          View All Reports
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Assignments & Activity */}
              <div className="space-y-6">
                {/* Assigned to Me Panel */}
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle>Assigned to Me</CardTitle>
                    <CardDescription>Your current project assignments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {myAssignments.map((assignment) => (
                      <div key={assignment.id} className="space-y-2 pb-4 border-b last:border-0 last:pb-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium leading-tight">{assignment.name}</h4>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {assignment.dueDate}
                        </div>
                        <Progress value={assignment.progress} className="h-2" />
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">{assignment.progress}% complete</p>
                          <Badge variant="outline" className="text-xs">
                            {assignment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Activity Panel */}
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates and events</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex gap-3 pb-3 border-b last:border-0 last:pb-0">
                        <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${
                          activity.type === 'approval' ? 'bg-accent' :
                          activity.type === 'revision' ? 'bg-destructive' :
                          activity.type === 'submission' ? 'bg-primary' :
                          'bg-muted-foreground'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-tight">{activity.event}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
