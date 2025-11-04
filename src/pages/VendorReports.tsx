import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { VendorSidebar } from "@/components/VendorSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Search, Plus, FileText, MoreVertical, Eye, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Report {
  id: string;
  projectId: string;
  projectName: string;
  reportingPeriod: string;
  reportingMonth: number;
  reportingYear: number;
  overallRating: "green" | "yellow" | "red";
  reportStatus: "draft" | "submitted" | "approved";
  submittedAt: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    projectId: "1",
    projectName: "DOH Health Connect Upgrade",
    reportingPeriod: "April 2025",
    reportingMonth: 4,
    reportingYear: 2025,
    overallRating: "yellow",
    reportStatus: "submitted",
    submittedAt: "2025-04-05",
  },
  {
    id: "2",
    projectId: "2",
    projectName: "Student Information System",
    reportingPeriod: "March 2025",
    reportingMonth: 3,
    reportingYear: 2025,
    overallRating: "green",
    reportStatus: "approved",
    submittedAt: "2025-03-08",
  },
  {
    id: "3",
    projectId: "3",
    projectName: "Fleet Management System",
    reportingPeriod: "May 2025",
    reportingMonth: 5,
    reportingYear: 2025,
    overallRating: "green",
    reportStatus: "draft",
    submittedAt: "2025-05-02",
  },
  {
    id: "4",
    projectId: "1",
    projectName: "DOH Health Connect Upgrade",
    reportingPeriod: "March 2025",
    reportingMonth: 3,
    reportingYear: 2025,
    overallRating: "yellow",
    reportStatus: "approved",
    submittedAt: "2025-03-12",
  },
  {
    id: "5",
    projectId: "2",
    projectName: "Student Information System",
    reportingPeriod: "February 2025",
    reportingMonth: 2,
    reportingYear: 2025,
    overallRating: "green",
    reportStatus: "approved",
    submittedAt: "2025-02-10",
  },
];

const VendorReports = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline" className="bg-muted text-muted-foreground">Draft</Badge>;
      case "submitted":
        return <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">Submitted</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30">Approved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case "green":
        return <Badge className="bg-accent/20 text-accent border-accent/30">On Track</Badge>;
      case "yellow":
        return <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30">At Risk</Badge>;
      case "red":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Critical</Badge>;
      default:
        return <Badge variant="outline">{rating}</Badge>;
    }
  };

  const filteredReports = mockReports.filter((report) => {
    const matchesStatus = statusFilter === "all" || report.reportStatus === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      report.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportingPeriod.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />

        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-16 items-center px-8 gap-4">
              <SidebarTrigger />
              <h1 className="text-base font-semibold text-foreground flex-1">Reports</h1>
            </div>
          </header>

          <main className="flex-1 p-8 bg-muted/30">
            <div className="max-w-7xl mx-auto">

              <Card className="bg-background">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <div className="relative flex-1 w-full">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search by project or month..."
                        className="pl-9 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-3 items-center w-full sm:w-auto">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="submitted">Submitted</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={() => navigate("/vendor/report/new")} className="gap-2 shrink-0">
                        <Plus className="h-4 w-4" />
                        New Report
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredReports.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {searchQuery || statusFilter !== "all"
                          ? "No reports found"
                          : "You haven't submitted any reports yet"}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {searchQuery || statusFilter !== "all"
                          ? "Try adjusting your filters"
                          : "Get started by submitting your first monthly report"}
                      </p>
                      <Button onClick={() => navigate("/vendor/report/new")} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Submit New Report
                      </Button>
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Period</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Submitted At</TableHead>
                            <TableHead className="text-right"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReports.map((report) => (
                            <TableRow
                              key={report.id}
                              className="cursor-pointer hover:bg-muted/50"
                              onClick={() => navigate(`/vendor/report/${report.id}`)}
                            >
                              <TableCell className="font-medium">{report.projectName}</TableCell>
                              <TableCell>{report.reportingPeriod}</TableCell>
                              <TableCell>
                                {getRatingBadge(report.overallRating)}
                              </TableCell>
                              <TableCell>{getStatusBadge(report.reportStatus)}</TableCell>
                              <TableCell className="text-muted-foreground">
                                {formatDate(report.submittedAt)}
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="bg-background">
                                    {report.reportStatus === "draft" ? (
                                      <>
                                         <DropdownMenuItem
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/vendor/report/${report.id}/edit`);
                                          }}
                                        >
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          className="text-destructive"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            // Delete placeholder
                                          }}
                                        >
                                          <FileText className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </>
                                    ) : (
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate(`/vendor/report/${report.id}`);
                                        }}
                                      >
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
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default VendorReports;
