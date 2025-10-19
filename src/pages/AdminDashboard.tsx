import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  FolderOpen, 
  FileCheck, 
  FileText, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  Building2,
  Users,
  Clock,
  CheckCircle2,
  Upload,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

// Mock data
const summaryStats = [
  { title: "Total Active Projects", value: 24, trend: "+3", icon: FolderOpen, color: "#007C77", bgColor: "bg-[#007C77]/10" },
  { title: "Reports In Review", value: 12, icon: FileCheck, color: "#005B7F", bgColor: "bg-[#005B7F]/10" },
  { title: "Published Reports", value: 87, trend: "+5", icon: FileText, color: "#3CC5C0", bgColor: "bg-[#3CC5C0]/10" },
  { title: "High-Risk Projects", value: 3, icon: AlertTriangle, color: "#D32F2F", bgColor: "bg-[#D32F2F]/10" },
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
  { id: 1, name: "Healthcare Data Platform", dueDate: "Oct 25", progress: 75 },
  { id: 2, name: "Digital Tax Portal", dueDate: "Oct 28", progress: 40 },
  { id: 3, name: "Library System Upgrade", dueDate: "Nov 2", progress: 20 },
];

const recentActivity = [
  { id: 1, text: "TechCorp Solutions submitted Healthcare Data Platform Report", time: "2 hours ago", icon: Upload },
  { id: 2, text: "Review completed by J. Lee", time: "5 hours ago", icon: CheckCircle2 },
  { id: 3, text: "Student Information System report published", time: "1 day ago", icon: FileText },
  { id: 4, text: "New assignment: Fleet Management System", time: "2 days ago", icon: Users },
];

const riskData = [
  { name: "Low", value: 18, color: "#3CC5C0" },
  { name: "Medium", value: 3, color: "#FFC107" },
  { name: "High", value: 3, color: "#D32F2F" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-[hsl(178,100%,24%)]/10 text-[hsl(178,100%,24%)] border-[hsl(178,100%,24%)]/20";
    case "In Review":
      return "bg-[hsl(45,100%,51%)]/10 text-[hsl(45,100%,35%)] border-[hsl(45,100%,51%)]/20";
    case "Published":
      return "bg-secondary/10 text-secondary border-secondary/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const AdminDashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[hsl(120,20%,97%)]">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
            <div className="flex h-16 items-center px-6 gap-4">
              <SidebarTrigger />
              
              <div className="flex-1" />
              
              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search project or report..."
                    className="w-64 pl-9 h-9"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <div className="h-8 w-8 rounded-full bg-[hsl(178,100%,24%)]/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-[hsl(178,100%,24%)]" />
                      </div>
                      <div className="hidden md:flex flex-col items-start">
                        <span className="text-sm font-medium">Jennifer Lee</span>
                        <span className="text-xs text-muted-foreground">ETS Reviewer</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white z-50">
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
          <main className="flex-1 p-6 md:p-8">{/* ... keep existing code */}
            {/* Dashboard Header */}
            <div className="mb-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
                <p className="text-muted-foreground">
                  Monitor active projects, report progress, and upcoming reviews.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search projects, reports..."
                    className="pl-9 bg-white"
                  />
                </div>
                <Select defaultValue="quarter">
                  <SelectTrigger className="w-full sm:w-48 bg-white">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {summaryStats.map((stat, index) => (
                <Card 
                  key={index} 
                  className="bg-white hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div 
                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}
                      >
                        <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                      </div>
                      {stat.trend && (
                        <div className="flex items-center gap-1 text-[#3CC5C0] text-sm font-medium">
                          <TrendingUp className="h-4 w-4" />
                          {stat.trend}
                        </div>
                      )}
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.title}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Projects Table + Risk Chart */}
              <div className="lg:col-span-2 space-y-6">{/* ... keep existing code */}
                {/* Projects Table */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Current Projects</CardTitle>
                  </CardHeader>{/* ... keep existing code */}
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
                        <Button variant="ghost" className="w-full sm:w-auto text-[hsl(178,100%,24%)]">
                          View All Reports
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Overview Chart */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Risk Overview</CardTitle>
                    <CardDescription>Project risk distribution across active portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="h-64 w-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={riskData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {riskData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex-1 space-y-4">
                        {riskData.map((item) => (
                          <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div 
                                className="h-3 w-3 rounded-full" 
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-sm font-medium">{item.name} Risk</span>
                            </div>
                            <span className="text-2xl font-bold">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Assignments + Activity */}
              <div className="space-y-6">{/* ... keep existing code */}
                {/* My Assignments */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Assigned to Me</CardTitle>
                    <CardDescription>Your current project assignments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {myAssignments.map((assignment) => (
                      <div key={assignment.id} className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium leading-tight">{assignment.name}</h4>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                            <Clock className="h-3 w-3" />
                            {assignment.dueDate}
                          </div>
                        </div>
                        <Progress value={assignment.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">{assignment.progress}% complete</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2">
                      View All Assignments
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity Feed */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest project updates and submissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex gap-3 pb-3 border-b last:border-0 last:pb-0">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#007C77]/10 text-[#007C77] flex-shrink-0">
                            <activity.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm leading-snug text-foreground">{activity.text}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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
