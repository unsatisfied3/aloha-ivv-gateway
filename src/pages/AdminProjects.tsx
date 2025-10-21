import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Plus, Eye, Pencil, FolderKanban, MoreVertical, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data using schema field names
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
  },
  {
    id: "5",
    projectName: "Benefits Management System",
    sponsoringAgency: "Department of Human Services",
    ivvVendorName: "Social Systems Co",
    overallProjectStatus: "yellow",
    isActive: true,
    originalContractAmount: 1650000,
    totalPaidToDate: 980000,
    startDate: "2024-09-01",
    plannedEndDate: "2025-10-31",
    currentProjectedEndDate: "2025-12-15",
  },
  {
    id: "6",
    projectName: "Environmental Data Platform",
    sponsoringAgency: "Department of Land & Natural Resources",
    ivvVendorName: "GreenData Systems",
    overallProjectStatus: "green",
    isActive: true,
    originalContractAmount: 1250000,
    totalPaidToDate: 625000,
    startDate: "2024-11-01",
    plannedEndDate: "2026-02-28",
    currentProjectedEndDate: "2026-02-28",
  },
  {
    id: "7",
    projectName: "Public Safety Communication Upgrade",
    sponsoringAgency: "Department of Public Safety",
    ivvVendorName: "SecureComm Ltd",
    overallProjectStatus: "red",
    isActive: false,
    originalContractAmount: 2800000,
    totalPaidToDate: 2800000,
    startDate: "2023-06-01",
    plannedEndDate: "2024-11-30",
    currentProjectedEndDate: "2024-11-30",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "green":
      return { label: "On Track", className: "bg-green-500/20 text-green-700 border-green-500/30 whitespace-nowrap pointer-events-none" };
    case "yellow":
      return { label: "At Risk", className: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30 whitespace-nowrap pointer-events-none" };
    case "red":
      return { label: "Critical", className: "bg-red-500/20 text-red-700 border-red-500/30 whitespace-nowrap pointer-events-none" };
    default:
      return { label: "Unknown", className: "bg-muted text-muted-foreground whitespace-nowrap pointer-events-none" };
  }
};

const calculateBudgetUsed = (paid: number, total: number) => {
  return Math.round((paid / total) * 100);
};

export default function AdminProjects() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("open");

  const agencies = Array.from(new Set(mockProjects.map((p) => p.sponsoringAgency)));
  const vendors = Array.from(new Set(mockProjects.map((p) => p.ivvVendorName)));
  const statuses = ["green", "yellow", "red"];

  const filteredProjects = mockProjects
    .filter((project) => {
      const matchesSearch = 
        project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.sponsoringAgency.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAgency = agencyFilter === "all" || project.sponsoringAgency === agencyFilter;
      const matchesVendor = vendorFilter === "all" || project.ivvVendorName === vendorFilter;
      const matchesStatus = statusFilter === "all" || project.overallProjectStatus === statusFilter;
      const matchesState = 
        stateFilter === "all" || 
        (stateFilter === "open" && project.isActive) ||
        (stateFilter === "closed" && !project.isActive);
      return matchesSearch && matchesAgency && matchesVendor && matchesStatus && matchesState;
    })
    .sort((a, b) => {
      // Sort by isActive first (active projects first)
      if (a.isActive !== b.isActive) return b.isActive ? 1 : -1;
      // Then by status (red > yellow > green)
      const statusOrder = { red: 0, yellow: 1, green: 2 };
      return statusOrder[a.overallProjectStatus as keyof typeof statusOrder] - 
             statusOrder[b.overallProjectStatus as keyof typeof statusOrder];
    });

  const handleRowClick = (projectId: string) => {
    navigate(`/admin/project/${projectId}`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setAgencyFilter("all");
    setVendorFilter("all");
    setStatusFilter("all");
    setStateFilter("open");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />

        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-16 items-center px-8 gap-4">
              <SidebarTrigger />
              
              <div className="flex-1">
                <h1 className="text-base font-semibold text-foreground">
                  Projects
                </h1>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-8 bg-muted/30">
            {/* Filter Bar */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 flex-1">
                    {/* Search */}
                    <div className="lg:col-span-2 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search project or agency..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-background"
                      />
                    </div>

                  {/* Agency Filter */}
                  <Select value={agencyFilter} onValueChange={setAgencyFilter}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Agency" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      <SelectItem value="all">Agency</SelectItem>
                      {agencies.map((agency) => (
                        <SelectItem key={agency} value={agency}>
                          {agency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Vendor Filter */}
                  <Select value={vendorFilter} onValueChange={setVendorFilter}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Vendor" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      <SelectItem value="all">Vendor</SelectItem>
                      {vendors.map((vendor) => (
                        <SelectItem key={vendor} value={vendor}>
                          {vendor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Status Filter */}
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      <SelectItem value="all">Status</SelectItem>
                      {statuses.map((status) => {
                        const badge = getStatusBadge(status);
                        return (
                          <SelectItem key={status} value={status}>
                            {badge.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  {/* Project State Filter */}
                  <Select value={stateFilter} onValueChange={setStateFilter}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Project State" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="open">Open Only</SelectItem>
                      <SelectItem value="closed">Closed Only</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Filter Popover Button */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon" className="bg-background">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 bg-background z-50" align="end">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm">Filters</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={clearFilters}
                            className="h-8 px-2 text-xs"
                          >
                            Reset All
                          </Button>
                        </div>

                        {/* Agency Filter */}
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-muted-foreground">Agency</label>
                          <Select value={agencyFilter} onValueChange={setAgencyFilter}>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Agency" />
                            </SelectTrigger>
                            <SelectContent className="bg-background z-50">
                              <SelectItem value="all">All Agencies</SelectItem>
                              {agencies.map((agency) => (
                                <SelectItem key={agency} value={agency}>
                                  {agency}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Vendor Filter */}
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-muted-foreground">Vendor</label>
                          <Select value={vendorFilter} onValueChange={setVendorFilter}>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Vendor" />
                            </SelectTrigger>
                            <SelectContent className="bg-background z-50">
                              <SelectItem value="all">All Vendors</SelectItem>
                              {vendors.map((vendor) => (
                                <SelectItem key={vendor} value={vendor}>
                                  {vendor}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Status Filter */}
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-muted-foreground">Status</label>
                          <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-background z-50">
                              <SelectItem value="all">All Statuses</SelectItem>
                              {statuses.map((status) => {
                                const badge = getStatusBadge(status);
                                return (
                                  <SelectItem key={status} value={status}>
                                    {badge.label}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Project State Filter */}
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-muted-foreground">Project State</label>
                          <Select value={stateFilter} onValueChange={setStateFilter}>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Project State" />
                            </SelectTrigger>
                            <SelectContent className="bg-background z-50">
                              <SelectItem value="all">All Projects</SelectItem>
                              <SelectItem value="open">Open Only</SelectItem>
                              <SelectItem value="closed">Closed Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  </div>
                  
                  {/* New Project Button */}
                  <Link to="/admin/project/new">
                    <Button className="whitespace-nowrap">
                      <Plus className="h-4 w-4" />
                      New Project
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Data Table */}
            {filteredProjects.length > 0 ? (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="sticky top-0 bg-muted/50">
                        <TableRow>
                          <TableHead className="font-semibold">Project</TableHead>
                          <TableHead className="font-semibold">Agency</TableHead>
                          <TableHead className="font-semibold">Vendor</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Budget Used</TableHead>
                          <TableHead className="font-semibold">Timeline</TableHead>
                          <TableHead className="text-right font-semibold"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProjects.map((project) => {
                          const budgetUsed = calculateBudgetUsed(
                            project.totalPaidToDate,
                            project.originalContractAmount
                          );
                          const statusBadge = getStatusBadge(project.overallProjectStatus);

                          return (
                            <TableRow
                              key={project.id}
                              className="cursor-pointer hover:bg-primary/5 transition-colors"
                              onClick={() => handleRowClick(project.id)}
                            >
                              <TableCell className="font-medium">
                                <div className="flex flex-col">
                                  <span>{project.projectName}</span>
                                  {!project.isActive && (
                                    <Badge variant="outline" className="mt-1 w-fit text-xs bg-muted text-muted-foreground border-muted-foreground/30 whitespace-nowrap pointer-events-none">
                                      Closed
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {project.sponsoringAgency}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {project.ivvVendorName}
                              </TableCell>
                              <TableCell>
                                <Badge className={cn("border", statusBadge.className)}>
                                  {statusBadge.label}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-2 min-w-[120px]">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">{budgetUsed}%</span>
                                    <span className="text-muted-foreground">
                                      ${(project.totalPaidToDate / 1000000).toFixed(1)}M / ${(project.originalContractAmount / 1000000).toFixed(1)}M
                                    </span>
                                  </div>
                                  <Progress value={budgetUsed} className="h-2 bg-muted [&>div]:bg-primary" />
                                </div>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                                {format(new Date(project.startDate), "MM/yyyy")} → {format(new Date(project.currentProjectedEndDate), "MM/yyyy")}
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="bg-background">
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/admin/project/${project.id}`);
                                      }}
                                    >
                                      <Eye className="h-4 w-4 mr-2" />
                                      View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/admin/project/${project.id}/edit`);
                                      }}
                                    >
                                      <Pencil className="h-4 w-4 mr-2" />
                                      Edit
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Empty State
              <Card>
                <CardContent className="py-16">
                  <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
                    <div className="rounded-full bg-muted p-6 mb-4">
                      <FolderKanban className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Get started by adding your first project.
                    </p>
                    <Link to="/admin/project/new">
                      <Button>
                        <Plus className="h-4 w-4" />
                        Add New Project
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pagination Placeholder */}
            {filteredProjects.length > 0 && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProjects.length} of {mockProjects.length} projects
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
