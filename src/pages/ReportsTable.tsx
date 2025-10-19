import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
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
import { Upload, Search, Download, Eye, Calendar as CalendarIcon, FileText } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data
const mockReports = [
  {
    id: "1",
    projectName: "DOH Health Connect Upgrade IV&V Report",
    agency: "Department of Health",
    vendor: "TechSolutions Inc.",
    status: "In Review",
    reviewer: "Sarah Johnson",
    lastUpdated: "2024-01-20",
  },
  {
    id: "2",
    projectName: "Education Portal Enhancement",
    agency: "Department of Education",
    vendor: "EduTech Partners",
    status: "Approved",
    reviewer: "Mike Chen",
    lastUpdated: "2024-01-19",
  },
  {
    id: "3",
    projectName: "Transportation System Modernization",
    agency: "Department of Transportation",
    vendor: "Smart Transit Co.",
    status: "Published",
    reviewer: "Lisa Patel",
    lastUpdated: "2024-01-18",
  },
  {
    id: "4",
    projectName: "Tax Processing System Update",
    agency: "Department of Taxation",
    vendor: "TechSolutions Inc.",
    status: "Draft",
    reviewer: "Unassigned",
    lastUpdated: "2024-01-17",
  },
  {
    id: "5",
    projectName: "Environmental Data Platform",
    agency: "Department of Land & Natural Resources",
    vendor: "GreenData Systems",
    status: "In Review",
    reviewer: "Sarah Johnson",
    lastUpdated: "2024-01-16",
  },
  {
    id: "6",
    projectName: "Public Safety Communication Upgrade",
    agency: "Department of Public Safety",
    vendor: "SecureComm Ltd.",
    status: "High-Risk",
    reviewer: "Mike Chen",
    lastUpdated: "2024-01-15",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Draft":
      return "bg-muted text-muted-foreground border-muted-foreground/20";
    case "In Review":
      return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    case "Approved":
      return "bg-accent/10 text-accent border-accent/20";
    case "Published":
      return "bg-primary/10 text-primary border-primary/20";
    case "High-Risk":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground";
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
  const statuses = Array.from(new Set(mockReports.map((r) => r.status)));

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch = report.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgency = agencyFilter === "all" || report.agency === agencyFilter;
    const matchesVendor = vendorFilter === "all" || report.vendor === vendorFilter;
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesAgency && matchesVendor && matchesStatus;
  });

  const handleRowClick = (reportId: string) => {
    navigate(`/admin/report/${reportId}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />

        <div className="flex-1 flex flex-col">
          {/* Main Content */}
          <main className="flex-1 p-8 bg-muted/30">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">All Reports</h1>
                  <p className="text-muted-foreground">
                    View, filter, and manage IV&V reports across all Hawaiʻi agencies.
                  </p>
                </div>
                <Button>
                  <Upload className="h-4 w-4" />
                  Upload New Report
                </Button>
              </div>

              {/* Filter Bar */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Search */}
                    <div className="lg:col-span-2 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by project or report title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* Agency Filter */}
                    <Select value={agencyFilter} onValueChange={setAgencyFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Agencies" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Agencies</SelectItem>
                        {agencies.map((agency) => (
                          <SelectItem key={agency} value={agency}>
                            {agency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Vendor Filter */}
                    <Select value={vendorFilter} onValueChange={setVendorFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Vendors" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Vendors</SelectItem>
                        {vendors.map((vendor) => (
                          <SelectItem key={vendor} value={vendor}>
                            {vendor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Status Filter */}
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Table */}
            {filteredReports.length > 0 ? (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="sticky top-0 bg-muted/50">
                        <TableRow>
                          <TableHead className="font-semibold">Project / Report Title</TableHead>
                          <TableHead className="font-semibold">Agency</TableHead>
                          <TableHead className="font-semibold">Vendor</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Reviewer Assigned</TableHead>
                          <TableHead className="font-semibold">Last Updated</TableHead>
                          <TableHead className="text-right font-semibold">Actions</TableHead>
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
                            <TableCell className="text-muted-foreground">{report.agency}</TableCell>
                            <TableCell className="text-muted-foreground">{report.vendor}</TableCell>
                            <TableCell>
                              <Badge className={cn("border", getStatusColor(report.status))}>
                                {report.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{report.reviewer}</TableCell>
                            <TableCell className="text-muted-foreground">{report.lastUpdated}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/admin/report/${report.id}`);
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Export placeholder
                                  }}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
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
