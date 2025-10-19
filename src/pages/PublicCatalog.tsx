import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, FileText, Calendar, Building2, Filter } from "lucide-react";
import { useState } from "react";

const sampleReports = [
  {
    id: 1,
    title: "Department of Education - Student Information System",
    agency: "Department of Education",
    date: "2025-10-15",
    status: "Approved",
    category: "Education",
  },
  {
    id: 2,
    title: "Department of Health - Healthcare Data Platform",
    agency: "Department of Health",
    date: "2025-10-12",
    status: "Approved",
    category: "Health",
  },
  {
    id: 3,
    title: "Department of Transportation - Fleet Management System",
    agency: "Department of Transportation",
    date: "2025-10-08",
    status: "Approved",
    category: "Technology",
  },
  {
    id: 4,
    title: "Department of Taxation - Digital Tax Portal",
    agency: "Department of Taxation",
    date: "2025-10-05",
    status: "Approved",
    category: "Technology",
  },
  {
    id: 5,
    title: "Department of Human Services - Benefits Management System",
    agency: "Department of Human Services",
    date: "2025-10-01",
    status: "Approved",
    category: "Technology",
  },
];

const PublicCatalog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = sampleReports.filter((report) =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[hsl(197,100%,25%)] to-[hsl(178,100%,24%)] text-white py-6 md:py-8">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">
                Public IV&V Reports
              </h1>

              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-lg shadow-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by project, agency, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 pl-12 border-0 bg-transparent text-base text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Button 
                  size="lg" 
                  className="h-12 px-6 bg-[hsl(178,100%,24%)] hover:bg-[hsl(178,100%,20%)] text-white"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              {/* Stats & Filters */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {filteredReports.length} Report{filteredReports.length !== 1 ? 's' : ''} Found
                  </h2>
                  <p className="text-muted-foreground">
                    Showing all published IV&V reports
                  </p>
                </div>
                <Button variant="outline" size="default">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>

              {/* Reports List */}
              <div className="space-y-4">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <Card
                      key={report.id}
                      className="cursor-pointer p-6 shadow-sm transition-all hover:shadow-md hover:border-primary"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex gap-4 flex-1">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-card-foreground mb-2">
                              {report.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Building2 className="h-4 w-4" />
                                <span>{report.agency}</span>
                              </div>
                              <span className="text-border">•</span>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <span>{report.date}</span>
                              </div>
                              <span className="text-border">•</span>
                              <span className="inline-flex items-center rounded-full bg-secondary/20 px-2.5 py-0.5 text-xs font-medium text-secondary">
                                {report.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                          View Report
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-12 text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No reports found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PublicCatalog;
