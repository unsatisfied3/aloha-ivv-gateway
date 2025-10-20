import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, FileText, X, Circle, Download, Eye, CheckSquare, Square, MoreVertical } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

type OverallRating = "green" | "yellow" | "red";

interface Report {
  id: number;
  projectName: string;
  sponsoringAgency: string;
  ivvVendorName: string;
  reportingMonth: string;
  reportingYear: number;
  overallRating: OverallRating;
  reportStatus: "approved";
  summary: string;
}

const sampleReports: Report[] = [
  {
    id: 1,
    projectName: "Student Information System Modernization",
    sponsoringAgency: "Department of Education",
    ivvVendorName: "TechVision Consulting",
    reportingMonth: "September",
    reportingYear: 2025,
    overallRating: "green",
    reportStatus: "approved",
    summary: "Project on track with all milestones met for Q3 2025",
  },
  {
    id: 2,
    projectName: "Healthcare Data Platform Integration",
    sponsoringAgency: "Department of Health",
    ivvVendorName: "HealthTech Solutions",
    reportingMonth: "August",
    reportingYear: 2025,
    overallRating: "yellow",
    reportStatus: "approved",
    summary: "Minor delays in data migration phase, mitigation plan in place",
  },
  {
    id: 3,
    projectName: "Fleet Management System",
    sponsoringAgency: "Department of Transportation",
    ivvVendorName: "TransTech Partners",
    reportingMonth: "September",
    reportingYear: 2025,
    overallRating: "green",
    reportStatus: "approved",
    summary: "Successful deployment of GPS tracking module across all vehicles",
  },
  {
    id: 4,
    projectName: "Digital Tax Portal",
    sponsoringAgency: "Department of Taxation",
    ivvVendorName: "FiscalTech Group",
    reportingMonth: "July",
    reportingYear: 2025,
    overallRating: "red",
    reportStatus: "approved",
    summary: "Critical security vulnerabilities identified, remediation in progress",
  },
  {
    id: 5,
    projectName: "Benefits Management System",
    sponsoringAgency: "Department of Human Services",
    ivvVendorName: "TechVision Consulting",
    reportingMonth: "August",
    reportingYear: 2025,
    overallRating: "yellow",
    reportStatus: "approved",
    summary: "User acceptance testing phase delayed by 2 weeks",
  },
  {
    id: 6,
    projectName: "Public Safety Communications Upgrade",
    sponsoringAgency: "Department of Public Safety",
    ivvVendorName: "SecureComm Inc",
    reportingMonth: "September",
    reportingYear: 2025,
    overallRating: "green",
    reportStatus: "approved",
    summary: "All communication towers upgraded ahead of schedule",
  },
  {
    id: 7,
    projectName: "Environmental Monitoring System",
    sponsoringAgency: "Department of Health",
    ivvVendorName: "EcoTech Analytics",
    reportingMonth: "June",
    reportingYear: 2025,
    overallRating: "green",
    reportStatus: "approved",
    summary: "Sensor network deployment completed across all islands",
  },
  {
    id: 8,
    projectName: "Student Financial Aid Portal",
    sponsoringAgency: "Department of Education",
    ivvVendorName: "FinAid Systems LLC",
    reportingMonth: "July",
    reportingYear: 2025,
    overallRating: "yellow",
    reportStatus: "approved",
    summary: "Integration with federal systems experiencing intermittent issues",
  },
];

const getRatingIcon = (rating: OverallRating) => {
  const colors = {
    green: "text-green-600",
    yellow: "text-yellow-500",
    red: "text-red-600",
  };
  
  return <Circle className={`h-4 w-4 fill-current ${colors[rating]}`} aria-label={`${rating} rating`} />;
};

const PublicCatalog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [agencyFilter, setAgencyFilter] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [vendorFilter, setVendorFilter] = useState<string>("all");
  const [periodFilter, setPeriodFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [selectedReports, setSelectedReports] = useState<Set<number>>(new Set());

  // Extract unique values for filters
  const agencies = useMemo(() => 
    Array.from(new Set(sampleReports.map(r => r.sponsoringAgency))).sort(),
    []
  );
  
  const projects = useMemo(() => 
    Array.from(new Set(sampleReports.map(r => r.projectName))).sort(),
    []
  );
  
  const vendors = useMemo(() => 
    Array.from(new Set(sampleReports.map(r => r.ivvVendorName))).sort(),
    []
  );
  
  const periods = useMemo(() => {
    const uniquePeriods = Array.from(
      new Set(sampleReports.map(r => `${r.reportingMonth} ${r.reportingYear}`))
    );
    return uniquePeriods.sort((a, b) => {
      const [monthA, yearA] = a.split(' ');
      const [monthB, yearB] = b.split(' ');
      if (yearA !== yearB) return parseInt(yearB) - parseInt(yearA);
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
      return months.indexOf(monthB) - months.indexOf(monthA);
    });
  }, []);

  const filteredReports = useMemo(() => {
    let filtered = sampleReports.filter(report => {
      const matchesSearch = searchQuery === "" || 
        report.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.sponsoringAgency.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesAgency = agencyFilter === "all" || report.sponsoringAgency === agencyFilter;
      const matchesProject = projectFilter === "all" || report.projectName === projectFilter;
      const matchesVendor = vendorFilter === "all" || report.ivvVendorName === vendorFilter;
      const matchesPeriod = periodFilter === "all" || 
        `${report.reportingMonth} ${report.reportingYear}` === periodFilter;
      const matchesRating = ratingFilter === "all" || report.overallRating === ratingFilter;

      return matchesSearch && matchesAgency && matchesProject && matchesVendor && 
             matchesPeriod && matchesRating;
    });

    // Sort by reporting year and month (newest first)
    return filtered.sort((a, b) => {
      if (a.reportingYear !== b.reportingYear) {
        return b.reportingYear - a.reportingYear;
      }
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
      return months.indexOf(b.reportingMonth) - months.indexOf(a.reportingMonth);
    });
  }, [searchQuery, agencyFilter, projectFilter, vendorFilter, periodFilter, ratingFilter]);

  const clearFilters = () => {
    setSearchQuery("");
    setAgencyFilter("all");
    setProjectFilter("all");
    setVendorFilter("all");
    setPeriodFilter("all");
    setRatingFilter("all");
  };

  const hasActiveFilters = searchQuery !== "" || agencyFilter !== "all" || 
    projectFilter !== "all" || vendorFilter !== "all" || 
    periodFilter !== "all" || ratingFilter !== "all";

  const toggleReportSelection = (reportId: number) => {
    const newSelected = new Set(selectedReports);
    if (newSelected.has(reportId)) {
      newSelected.delete(reportId);
    } else {
      newSelected.add(reportId);
    }
    setSelectedReports(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedReports.size === filteredReports.length) {
      setSelectedReports(new Set());
    } else {
      setSelectedReports(new Set(filteredReports.map(r => r.id)));
    }
  };

  const downloadSelected = () => {
    if (selectedReports.size === 0) return;
    console.log(`Downloading ${selectedReports.size} reports:`, Array.from(selectedReports));
    // Simulate bulk download
    setSelectedReports(new Set());
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8FAF9' }}>
      <Header />
      
      <main className="flex-1">
        {/* Compact Hero + Search + Filters Section */}
        <section className="text-white py-6" style={{ background: 'linear-gradient(to bottom, #007C77, #3CC5C0)' }}>
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-3 text-center">
                Public IV&V Reports Catalog
              </h1>

              {/* Search Bar */}
              <div className="flex gap-2 p-2 bg-white rounded-lg shadow-lg mb-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by project name or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 pl-12 border-0 bg-transparent text-base text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                    aria-label="Search reports by keywords"
                  />
                </div>
              </div>

              {/* Horizontal Filters */}
              <div className="p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Select value={agencyFilter} onValueChange={setAgencyFilter}>
                    <SelectTrigger className="h-9 w-auto min-w-[140px] bg-white border-0 text-foreground" aria-label="Filter by agency">
                      <SelectValue placeholder="Agencies" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Agencies</SelectItem>
                      {agencies.map(agency => (
                        <SelectItem key={agency} value={agency}>{agency}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={vendorFilter} onValueChange={setVendorFilter}>
                    <SelectTrigger className="h-9 w-auto min-w-[140px] bg-white border-0 text-foreground" aria-label="Filter by vendor">
                      <SelectValue placeholder="Vendors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Vendors</SelectItem>
                      {vendors.map(vendor => (
                        <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={periodFilter} onValueChange={setPeriodFilter}>
                    <SelectTrigger className="h-9 w-auto min-w-[140px] bg-white border-0 text-foreground" aria-label="Filter by reporting period">
                      <SelectValue placeholder="Periods" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Periods</SelectItem>
                      {periods.map(period => (
                        <SelectItem key={period} value={period}>{period}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger className="h-9 w-auto min-w-[130px] bg-white border-0 text-foreground" aria-label="Filter by overall rating">
                      <SelectValue placeholder="Ratings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Ratings</SelectItem>
                      <SelectItem value="green">🟢 On Track</SelectItem>
                      <SelectItem value="yellow">🟡 At Risk</SelectItem>
                      <SelectItem value="red">🔴 Critical</SelectItem>
                    </SelectContent>
                  </Select>

                  {hasActiveFilters && (
                    <Button 
                      variant="ghost"
                      size="sm" 
                      onClick={clearFilters}
                      className="h-9 text-white underline hover:bg-transparent hover:text-white/90 ml-auto"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-6">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              {/* Results Count */}
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredReports.length}</span> approved report{filteredReports.length !== 1 ? 's' : ''} found
                </p>
                {selectedReports.size > 0 && (
                  <Button 
                    onClick={downloadSelected}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Selected ({selectedReports.size})
                  </Button>
                )}
              </div>

              {/* Results Table */}
              {filteredReports.length > 0 ? (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden md:block">
                    <Card className="bg-white shadow-sm overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">
                              <button
                                onClick={toggleSelectAll}
                                className="flex items-center justify-center w-full"
                                aria-label="Select all reports"
                              >
                                {selectedReports.size === filteredReports.length && filteredReports.length > 0 ? (
                                  <CheckSquare className="h-5 w-5 text-primary" />
                                ) : (
                                  <Square className="h-5 w-5 text-muted-foreground" />
                                )}
                              </button>
                            </TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Agency</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Period</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="text-right"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReports.map((report) => (
                            <TableRow key={report.id} className="cursor-pointer hover:bg-muted/50">
                              <TableCell>
                                <button
                                  onClick={() => toggleReportSelection(report.id)}
                                  className="flex items-center justify-center w-full"
                                  aria-label={`Select report ${report.projectName}`}
                                >
                                  {selectedReports.has(report.id) ? (
                                    <CheckSquare className="h-5 w-5 text-primary" />
                                  ) : (
                                    <Square className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </button>
                              </TableCell>
                              <TableCell className="font-medium">{report.projectName}</TableCell>
                              <TableCell>{report.sponsoringAgency}</TableCell>
                              <TableCell>{report.ivvVendorName}</TableCell>
                              <TableCell>{report.reportingMonth} {report.reportingYear}</TableCell>
                              <TableCell>{getRatingIcon(report.overallRating)}</TableCell>
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
                                        navigate(`/public/report/${report.id}`);
                                      }}
                                    >
                                      <Eye className="h-4 w-4 mr-2" />
                                      View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        console.log(`Downloading report ${report.id}`);
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
                    </Card>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {filteredReports.map((report) => (
                      <Card key={report.id} className="p-4 bg-white shadow-sm">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{report.projectName}</h3>
                            <p className="text-sm text-muted-foreground">{report.sponsoringAgency}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Vendor:</span>
                              <p className="font-medium">{report.ivvVendorName}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Period:</span>
                              <p className="font-medium">{report.reportingMonth} {report.reportingYear}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                              {getRatingIcon(report.overallRating)}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="default"
                                size="sm"
                                onClick={() => navigate(`/public/report/${report.id}`)}
                                className="gap-1.5"
                              >
                                <Eye className="h-4 w-4" />
                                View
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  console.log(`Downloading report ${report.id}`);
                                }}
                                className="gap-1.5"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <Card className="p-12 text-center bg-white shadow-sm">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No reports found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters
                  </p>
                  {hasActiveFilters && (
                    <Button variant="outline" onClick={clearFilters}>
                      Clear All Filters
                    </Button>
                  )}
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PublicCatalog;
