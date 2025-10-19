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
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Sparkline component
const Sparkline = ({ data, positive = true }: { data: number[], positive?: boolean }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 100" className="w-20 h-12" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#3CC5C0" : "#94A3B8"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
};

// Mock data
const sparklineData = [60, 70, 65, 80, 75, 90, 100];

const summaryStats = [
  { 
    title: "Total Active Projects", 
    value: 127, 
    trend: "+12%",
    trendLabel: "from last month",
    isPositive: true,
    sparkline: sparklineData
  },
  { 
    title: "Reports in Review", 
    value: 34, 
    trend: "+5%",
    trendLabel: "from last month",
    isPositive: true,
    sparkline: [40, 45, 50, 55, 48, 52, 60]
  },
  { 
    title: "Published Reports", 
    value: 89, 
    trend: "+8%",
    trendLabel: "from last month",
    isPositive: true,
    sparkline: [70, 75, 72, 80, 85, 88, 95]
  },
  { 
    title: "High-Risk Projects", 
    value: 15, 
    trend: "-3%",
    trendLabel: "from last month",
    isPositive: false,
    sparkline: [25, 22, 20, 18, 17, 16, 15]
  },
];

const currentProjects = [
  {
    id: 1,
    name: "Healthcare Data Platform",
    agency: "Department of Health",
    vendor: "TechCorp Solutions",
    status: "In Review",
    reviewer: "J. Lee",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    name: "Student Information System",
    agency: "Department of Education",
    vendor: "EduTech Partners",
    status: "Active",
    reviewer: "M. Santos",
    lastUpdated: "1 day ago",
  },
  {
    id: 3,
    name: "Fleet Management System",
    agency: "Department of Transportation",
    vendor: "AutoManage Inc",
    status: "Published",
    reviewer: "K. Wong",
    lastUpdated: "3 days ago",
  },
  {
    id: 4,
    name: "Digital Tax Portal",
    agency: "Department of Taxation",
    vendor: "FinTech Solutions",
    status: "Active",
    reviewer: "J. Lee",
    lastUpdated: "5 hours ago",
  },
  {
    id: 5,
    name: "Benefits Management System",
    agency: "Department of Human Services",
    vendor: "Social Systems Co",
    status: "In Review",
    reviewer: "M. Santos",
    lastUpdated: "1 day ago",
  },
];

const myAssignments = [
  { id: 1, name: "Student Records System", dueDate: "Dec 15, 2024", progress: 65, status: "In Progress" },
  { id: 2, name: "Public Health Portal", dueDate: "Dec 20, 2024", progress: 40, status: "Under Review" },
  { id: 3, name: "Tax Management Platform", dueDate: "Jan 5, 2025", progress: 20, status: "Starting Soon" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-[#007C77]/10 text-[#007C77] border-[#007C77]/20";
    case "In Review":
      return "bg-[#3CC5C0]/10 text-[#3CC5C0] border-[#3CC5C0]/20";
    case "Published":
      return "bg-[#005B7F]/10 text-[#005B7F] border-[#005B7F]/20";
    default:
      return "bg-muted text-muted-foreground";
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
                      <div className="h-8 w-8 rounded-full bg-[#007C77]/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-[#007C77]" />
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
          <main className="flex-1 p-8 bg-[#F8FAF9]">
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
                        <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? 'text-[#3CC5C0]' : 'text-muted-foreground'}`}>
                          {stat.isPositive ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span>{stat.trend}</span>
                          <span className="text-muted-foreground font-normal">{stat.trendLabel}</span>
                        </div>
                      </div>
                      <Sparkline data={stat.sparkline} positive={stat.isPositive} />
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
                            <TableHead className="hidden lg:table-cell">Reviewer</TableHead>
                            <TableHead className="hidden xl:table-cell">Last Updated</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentProjects.map((project) => (
                            <TableRow 
                              key={project.id} 
                              className="cursor-pointer hover:bg-muted/50"
                              onClick={() => window.location.href = `/admin/report/${project.id}`}
                            >
                              <TableCell className="font-medium">{project.name}</TableCell>
                              <TableCell className="text-sm">
                                <div className="flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-muted-foreground" />
                                  <span className="hidden sm:inline">{project.agency}</span>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                                {project.vendor}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={getStatusColor(project.status)}>
                                  {project.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden lg:table-cell text-sm">
                                {project.reviewer}
                              </TableCell>
                              <TableCell className="hidden xl:table-cell text-sm text-muted-foreground">
                                {project.lastUpdated}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-4">
                      <Link to="/admin/reports">
                        <Button variant="ghost" className="w-full sm:w-auto text-[#007C77]">
                          View All Reports
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Assigned to Me Panel */}
              <div>
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
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
