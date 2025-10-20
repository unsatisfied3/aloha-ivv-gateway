import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, X, Circle, Download, Eye } from "lucide-react";
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
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-foreground bg-white/90 px-2 py-1 rounded mr-1">Filters:</span>
                  
                  <Select value={agencyFilter} onValueChange={setAgencyFilter}>
                    <SelectTrigger className="h-9 w-auto min-w-[140px] bg-white/95 border-0" aria-label="Filter by agency">
                      <SelectValue placeholder="All Agencies" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Agencies</SelectItem>
                      {agencies.map(agency => (
                        <SelectItem key={agency} value={agency}>{agency}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={vendorFilter} onValueChange={setVendorFilter}>
                    <SelectTrigger className="h-9 w-auto min-w-[140px] bg-white/95 border-0" aria-label="Filter by vendor">
                      <SelectValue placeholder="All Vendors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vendors</SelectItem>
                      {vendors.map(vendor => (
                        <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={periodFilter} onValueChange={setPeriodFilter}>
                    <SelectTrigger className="h-9 w-auto min-w-[140px] bg-white/95 border-0" aria-label="Filter by reporting period">
                      <SelectValue placeholder="All Periods" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Periods</SelectItem>
                      {periods.map(period => (
                        <SelectItem key={period} value={period}>{period}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger className="h-9 w-auto min-w-[130px] bg-white/95 border-0" aria-label="Filter by overall rating">
                      <SelectValue placeholder="All Ratings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="green">🟢 On Track</SelectItem>
                      <SelectItem value="yellow">🟡 At Risk</SelectItem>
                      <SelectItem value="red">🔴 Critical</SelectItem>
                    </SelectContent>
                  </Select>

                  {hasActiveFilters && (
                    <Button 
                      variant="secondary"
                      size="sm" 
                      onClick={clearFilters}
                      className="h-9 gap-1.5 bg-white/95 text-foreground hover:bg-white ml-auto"
                    >
                      <X className="h-3.5 w-3.5" />
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
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredReports.length}</span> approved report{filteredReports.length !== 1 ? 's' : ''} found
                </p>
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
                            <TableHead>Project</TableHead>
                            <TableHead>Agency</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Period</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReports.map((report) => (
                            <TableRow key={report.id} className="cursor-pointer hover:bg-muted/50">
                              <TableCell className="font-medium">{report.projectName}</TableCell>
                              <TableCell>{report.sponsoringAgency}</TableCell>
                              <TableCell>{report.ivvVendorName}</TableCell>
                              <TableCell>{report.reportingMonth} {report.reportingYear}</TableCell>
                              <TableCell>{getRatingIcon(report.overallRating)}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
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
                                      // Simulate download
                                      console.log(`Downloading report ${report.id}`);
                                    }}
                                    className="gap-1.5"
                                  >
                                    <Download className="h-4 w-4" />
                                    Download
                                  </Button>
                                </div>
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
