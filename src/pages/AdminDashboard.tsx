import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
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
  Calendar as CalendarIcon,
  Building2,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  FolderKanban,
  FileSearch,
  FileCheck,
  AlertTriangle,
  MoreVertical,
  Eye,
  X,
  Check
} from "lucide-react";
import { Link } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

// Generate month-year options (current month and 23 months back = 2 years)
const monthYearOptions = Array.from({ length: 24 }, (_, i) => {
  const date = new Date(currentYear, currentMonth - i, 1);
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return {
    label: `${months[monthIndex]} ${year}`,
    value: `${year}-${String(monthIndex + 1).padStart(2, '0')}`
  };
});

const summaryStats = [
  { 
    title: "Total Active Reports", 
    value: 127, 
    trend: "+12%",
    trendLabel: "from last month",
    isPositive: true,
    icon: FolderKanban,
    linkText: "View projects",
    linkTo: "/admin/projects"
  },
  { 
    title: "Reports in Review", 
    value: 34, 
    trend: "+5%",
    trendLabel: "from last month",
    isPositive: true,
    icon: FileSearch,
    linkText: "View reports",
    linkTo: "/admin/reports"
  },
  { 
    title: "Published Reports", 
    value: 89, 
    trend: "+8%",
    trendLabel: "from last month",
    isPositive: true,
    icon: FileCheck,
    linkText: "View reports",
    linkTo: "/admin/reports"
  },
  { 
    title: "High-Risk Projects", 
    value: 15, 
    trend: "-3%",
    trendLabel: "from last month",
    isPositive: false,
    icon: AlertTriangle,
    linkText: "View projects",
    linkTo: "/admin/projects"
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
  { id: 1, event: "Report submitted for DOH Health Connect", timestamp: "2 hours ago", type: "submission", urgency: "medium", actionable: true },
  { id: 2, event: "Student Info System marked approved", timestamp: "5 hours ago", type: "approval", urgency: "low", actionable: false },
  { id: 3, event: "Tax Portal report revision requested", timestamp: "1 day ago", type: "revision", urgency: "high", actionable: true },
  { id: 4, event: "New project added: Judicial Case Mgmt", timestamp: "2 days ago", type: "project", urgency: "medium", actionable: true },
];

const getUrgencyBorderColor = (urgency: string) => {
  switch (urgency) {
    case 'high':
      return 'border-l-destructive';
    case 'medium':
      return 'border-l-primary';
    case 'low':
      return 'border-l-accent';
    default:
      return 'border-l-muted';
  }
};

const myAssignments = [
  { id: 1, name: "Student Records System", dueDate: "Dec 15, 2024", progress: 65, status: "In Progress" },
  { id: 2, name: "Public Health Portal", dueDate: "Dec 20, 2024", progress: 40, status: "Under Review" },
  { id: 3, name: "Tax Management Platform", dueDate: "Jan 5, 2025", progress: 20, status: "Starting Soon" },
];

// Schedule variance data (baseline vs current)
const scheduleVarianceData = [
  { month: "Oct", baseline: 85, current: 75 },
  { month: "Nov", baseline: 92, current: 88 },
  { month: "Dec", baseline: 100, current: 95 },
];

// Financial variance data (contract vs paid)
const financialVarianceData = [
  { project: "P1", contract: 2450000, paid: 1850000 },
  { project: "P2", contract: 1800000, paid: 1200000 },
  { project: "P3", contract: 980000, paid: 780000 },
];

const chartConfig = {
  baseline: {
    label: "Baseline",
    color: "hsl(var(--primary))",
  },
  current: {
    label: "Current",
    color: "hsl(var(--accent))",
  },
  contract: {
    label: "Contract",
    color: "hsl(var(--primary))",
  },
  paid: {
    label: "Paid",
    color: "hsl(var(--accent))",
  },
};

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
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-16 items-center px-8 gap-4">
              <SidebarTrigger />
              
              <h1 className="text-base font-semibold text-foreground flex-1">
                Dashboard Overview
              </h1>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-background">
                    <CalendarIcon className="h-4 w-4" />
                    {selectedPeriod 
                      ? monthYearOptions.find(opt => opt.value === selectedPeriod)?.label
                      : "Select Period"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2 bg-background" align="end">
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-[180px] bg-background">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      {monthYearOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </PopoverContent>
              </Popover>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-8 bg-muted/30">

            {/* Summary Stats */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {summaryStats.map((stat, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6 pb-5">
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
                      <stat.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Link to={stat.linkTo} className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors">
                      {stat.linkText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Variance Charts */}
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card className="bg-background">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Schedule Variance</CardTitle>
                  <CardDescription>Baseline vs. Current Progress (%)</CardDescription>
                </CardHeader>
                <CardContent className="pb-5">
                  <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={scheduleVarianceData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="baseline" fill="var(--color-baseline)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="current" fill="var(--color-current)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Financial Variance</CardTitle>
                  <CardDescription>Contract vs. Paid Amount ($)</CardDescription>
                </CardHeader>
                <CardContent className="pb-5">
                  <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={financialVarianceData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="project" className="text-xs" />
                        <YAxis className="text-xs" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                        <ChartTooltip content={<ChartTooltipContent formatter={(value) => `$${(value as number).toLocaleString()}`} />} />
                        <Bar dataKey="contract" fill="var(--color-contract)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="paid" fill="var(--color-paid)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Active Projects Table - Full Width */}
            <Card className="bg-background mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Active Projects</CardTitle>
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search projects, vendors, or agencies..."
                      className="pl-9 bg-background"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Agency</TableHead>
                        <TableHead className="hidden md:table-cell">Vendor</TableHead>
                        <TableHead className="whitespace-nowrap">Status</TableHead>
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
                              <Building2 className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                              <span className="hidden sm:inline">{project.sponsoringAgency}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                            {project.ivvVendorName}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <Badge variant="outline" className={getStatusColor(project.overallProjectStatus)}>
                              {getStatusLabel(project.overallProjectStatus)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Assignments & Activity - Side by Side */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Assigned to Me Panel */}
              <Card className="bg-background">
                <CardHeader className="pb-3">
                  <CardTitle>Assigned to Me</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pb-5">
                  {myAssignments.map((assignment) => (
                    <div key={assignment.id} className="space-y-2 pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-medium leading-tight">{assignment.name}</h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 flex-shrink-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-32 bg-background">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Check className="h-4 w-4 mr-2" />
                              Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <X className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {assignment.dueDate}
                      </div>
                      <Progress value={assignment.progress} className="h-2 [&>div]:bg-primary" />
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
                <CardHeader className="pb-3">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pb-5">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className={`flex gap-3 pb-3 border-b last:border-0 last:pb-0 border-l-4 pl-3 -ml-3 ${getUrgencyBorderColor(activity.urgency)}`}>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-tight">{activity.event}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 flex-shrink-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                          {activity.actionable && (
                            <>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Check className="h-4 w-4 mr-2" />
                                Complete
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem>
                            <X className="h-4 w-4 mr-2" />
                            Clear
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                  <div className="pt-2 flex justify-end">
                    <Link to="/admin/reports">
                      <Button variant="ghost" className="text-primary">
                        View All Reports
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
