import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Upload, Search, Download, Eye, Calendar as CalendarIcon, FileText, MoreVertical, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data using schema field names
const mockReports = [
  {
    id: "1",
    projectId: "proj-001",
    projectName: "DOH Health Connect Upgrade", // placeholder lookup
    reportingPeriod: "Q4 2024",
    reportingMonth: 12,
    reportingYear: 2024,
    reportStatus: "submitted",
    executiveSummary: "Project on track with minor delays...",
    overallRating: "green",
    submittedAt: "2024-01-20T14:30:00",
    submittedByName: "Sarah Johnson",
    agency: "Department of Health",
    vendor: "TechSolutions Inc.",
  },
  {
    id: "2",
    projectId: "proj-002",
    projectName: "Education Portal Enhancement",
    reportingPeriod: "Q4 2024",
    reportingMonth: 12,
    reportingYear: 2024,
    reportStatus: "approved",
    executiveSummary: "Successfully completed testing phase...",
    overallRating: "green",
    submittedAt: "2024-01-19T10:15:00",
    submittedByName: "Mike Chen",
    agency: "Department of Education",
    vendor: "EduTech Partners",
  },
  {
    id: "3",
    projectId: "proj-003",
    projectName: "Transportation System Modernization",
    reportingPeriod: "Q3 2024",
    reportingMonth: 11,
    reportingYear: 2024,
    reportStatus: "approved",
    executiveSummary: "Phase 2 deployment complete...",
    overallRating: "yellow",
    submittedAt: "2024-01-18T16:45:00",
    submittedByName: "Lisa Patel",
    agency: "Department of Transportation",
    vendor: "Smart Transit Co.",
  },
  {
    id: "4",
    projectId: "proj-004",
    projectName: "Tax Processing System Update",
    reportingPeriod: "Q4 2024",
    reportingMonth: 12,
    reportingYear: 2024,
    reportStatus: "draft",
    executiveSummary: "Initial assessment in progress...",
    overallRating: "yellow",
    submittedAt: "2024-01-17T09:00:00",
    submittedByName: "Unassigned",
    agency: "Department of Taxation",
    vendor: "TechSolutions Inc.",
  },
  {
    id: "5",
    projectId: "proj-005",
    projectName: "Environmental Data Platform",
    reportingPeriod: "Q4 2024",
    reportingMonth: 12,
    reportingYear: 2024,
    reportStatus: "submitted",
    executiveSummary: "Critical infrastructure upgrade underway...",
    overallRating: "red",
    submittedAt: "2024-01-16T11:30:00",
    submittedByName: "Sarah Johnson",
    agency: "Department of Land & Natural Resources",
    vendor: "GreenData Systems",
  },
  {
    id: "6",
    projectId: "proj-006",
    projectName: "Public Safety Communication Upgrade",
    reportingPeriod: "Q3 2024",
    reportingMonth: 11,
    reportingYear: 2024,
    reportStatus: "submitted",
    executiveSummary: "Security concerns identified, action plan submitted...",
    overallRating: "red",
    submittedAt: "2024-01-15T13:20:00",
    submittedByName: "Mike Chen",
    agency: "Department of Public Safety",
    vendor: "SecureComm Ltd.",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "draft":
      return "bg-muted text-muted-foreground border-muted-foreground/30 whitespace-nowrap pointer-events-none";
    case "submitted":
      return "bg-primary/20 text-primary border-primary/40 whitespace-nowrap pointer-events-none";
    case "approved":
      return "bg-accent/20 text-accent border-accent/40 whitespace-nowrap pointer-events-none";
    default:
      return "bg-muted text-muted-foreground whitespace-nowrap pointer-events-none";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "draft":
      return "Draft";
    case "submitted":
      return "Submitted";
    case "approved":
      return "Approved";
    default:
      return status;
  }
};

const getRatingBadge = (rating: string) => {
  switch (rating) {
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

export default function ReportsTable() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const agencies = Array.from(new Set(mockReports.map((r) => r.agency)));
  const vendors = Array.from(new Set(mockReports.map((r) => r.vendor)));
  const statuses = ["draft", "submitted", "approved"];

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch = report.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgency = agencyFilter === "all" || report.agency === agencyFilter;
    const matchesVendor = vendorFilter === "all" || report.vendor === vendorFilter;
    const matchesStatus = statusFilter === "all" || report.reportStatus === statusFilter;
    return matchesSearch && matchesAgency && matchesVendor && matchesStatus;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setAgencyFilter("all");
    setVendorFilter("all");
    setStatusFilter("all");
    setDateRange({});
  };

  const handleRowClick = (reportId: string) => {
    navigate(`/admin/report/${reportId}`);
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
              
              <h1 className="text-base font-semibold text-foreground flex-1">
                All Reports
              </h1>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-8 bg-muted/30">
            {/* Filter Bar */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                  {/* Search */}
                  <div className="lg:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by project or report title..."
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
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {getStatusLabel(status)}
                        </SelectItem>
                      ))}
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
                              {statuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {getStatusLabel(status)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>

            {/* Data Table */}
            {filteredReports.length > 0 ? (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="sticky top-0 bg-muted/50">
                        <TableRow>
                          <TableHead className="font-semibold">Name</TableHead>
                          <TableHead className="font-semibold">Period</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Rating</TableHead>
                          <TableHead className="font-semibold">Reporter</TableHead>
                          <TableHead className="font-semibold">Submission Date</TableHead>
                          <TableHead className="text-right font-semibold"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredReports.map((report) => (
                          <TableRow
                            key={report.id}
                            className="cursor-pointer hover:bg-primary/5 transition-colors"
                            onClick={() => handleRowClick(report.id)}
                          >
                            <TableCell className="font-medium">{report.projectName}</TableCell>
                            <TableCell className="text-muted-foreground">{report.reportingPeriod}</TableCell>
                            <TableCell>
                              <Badge className={cn("border", getStatusColor(report.reportStatus))}>
                                {getStatusLabel(report.reportStatus)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {(() => {
                                const rating = getRatingBadge(report.overallRating);
                                return (
                                  <Badge className={cn("border", rating.className)}>
                                    {rating.label}
                                  </Badge>
                                );
                              })()}
                            </TableCell>
                            <TableCell className="text-muted-foreground">{report.submittedByName}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {format(new Date(report.submittedAt), "MMM dd, yyyy")}
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
                                      navigate(`/admin/report/${report.id}`);
                                    }}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Export placeholder
                                    }}
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
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
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No reports found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or upload a new one.
                    </p>
                    <Button>
                      <Upload className="h-4 w-4" />
                      Upload Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pagination Placeholder */}
            {filteredReports.length > 0 && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredReports.length} of {mockReports.length} reports
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
