import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Download, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { DetailedRatings } from "@/components/DetailedRatings";

type OverallRating = "green" | "yellow" | "red";

interface Finding {
  id: number;
  description: string;
  impact: string;
  likelihood: string;
  rating: OverallRating;
  status: string;
}

interface ReportData {
  id: number;
  projectName: string;
  sponsoringAgency: string;
  ivvVendorName: string;
  reportingPeriod: string;
  overallRating: OverallRating;
  reportStatus: "approved";
  executiveSummary: string;
  keyAchievements: string[];
  keyChallenges: string[];
  peopleRating: OverallRating;
  processRating: OverallRating;
  technologyRating: OverallRating;
  publicationDate: string;
  findings: Finding[];
}

// Mock data
const mockReport: ReportData = {
  id: 1,
  projectName: "Student Information System Modernization",
  sponsoringAgency: "Department of Education",
  ivvVendorName: "TechVision Consulting",
  reportingPeriod: "September 2025",
  overallRating: "green",
  reportStatus: "approved",
  executiveSummary: "The Student Information System Modernization project continues to make substantial progress in Q3 2025. All major milestones have been achieved on schedule, with the core platform deployment successfully completed across pilot schools. The development team has demonstrated strong technical capabilities and effective collaboration with stakeholders. User acceptance testing results have been positive, with over 85% satisfaction rates among educators and administrators.",
  keyAchievements: [
    "Successfully deployed core platform to 12 pilot schools across 3 districts",
    "Completed data migration for 150,000+ student records with 99.8% accuracy",
    "Achieved 85% user satisfaction rating in initial user acceptance testing",
    "Implemented real-time parent portal with mobile app accessibility",
    "Established comprehensive security protocols meeting all federal compliance requirements",
  ],
  keyChallenges: [
    "Integration with legacy grading systems requires additional API development",
    "Staff training schedule conflicts with academic calendar constraints",
    "Limited bandwidth in rural schools affecting cloud-based features",
    "Custom reporting requirements vary significantly across districts",
    "Budget constraints may impact planned expansion to remaining schools",
  ],
  peopleRating: "green",
  processRating: "green",
  technologyRating: "yellow",
  publicationDate: "October 15, 2025",
  findings: [
    {
      id: 1,
      description: "Legacy system integration dependencies not fully documented",
      impact: "Medium",
      likelihood: "High",
      rating: "yellow",
      status: "In Progress",
    },
    {
      id: 2,
      description: "Rural connectivity affecting cloud performance",
      impact: "Medium",
      likelihood: "Medium",
      rating: "yellow",
      status: "Mitigated",
    },
    {
      id: 3,
      description: "Training completion rates below target threshold",
      impact: "Low",
      likelihood: "Medium",
      rating: "green",
      status: "Monitoring",
    },
    {
      id: 4,
      description: "Custom reporting specifications incomplete",
      impact: "Medium",
      likelihood: "High",
      rating: "yellow",
      status: "In Progress",
    },
    {
      id: 5,
      description: "Budget variance tracking shows potential overrun",
      impact: "High",
      likelihood: "Low",
      rating: "yellow",
      status: "Monitoring",
    },
  ],
};

const getRatingConfig = (rating: OverallRating) => {
  const configs = {
    green: {
      label: "On Track",
      className: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircle,
      color: "#10B981",
    },
    yellow: {
      label: "At Risk",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: AlertCircle,
      color: "#F59E0B",
    },
    red: {
      label: "Critical",
      className: "bg-red-100 text-red-800 border-red-200",
      icon: XCircle,
      color: "#EF4444",
    },
  };
  return configs[rating];
};

const PublicReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, fetch report data based on id
  const report = mockReport;

  const handleDownloadPDF = () => {
    console.log(`Downloading PDF for report ${id}`);
    // Implement PDF download logic
  };

  const overallConfig = getRatingConfig(report.overallRating);
  const OverallIcon = overallConfig.icon;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8FAF9' }}>
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-8">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={() => navigate('/public/catalog')}
                    className="cursor-pointer hover:text-primary"
                  >
                    Reports
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink className="cursor-pointer hover:text-primary">
                    {report.projectName}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage>{report.reportingPeriod}</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {report.projectName}
                </h1>
                <p className="text-lg text-muted-foreground mb-3">
                  IV&V Report — {report.reportingPeriod}
                </p>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                  Approved
                </Badge>
              </div>
              <Button onClick={handleDownloadPDF} className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Section 1 - Overview */}
          <section className="mb-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Executive Summary</h3>
                  <p className="text-foreground leading-relaxed">{report.executiveSummary}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">Sponsoring Agency</h4>
                    <p className="text-foreground">{report.sponsoringAgency}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">IV&V Vendor</h4>
                    <p className="text-foreground">{report.ivvVendorName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">Publication Date</h4>
                    <p className="text-foreground">{report.publicationDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 - Ratings */}
          <section className="mb-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Project Ratings</CardTitle>
                <CardDescription>Assessment across key project dimensions</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Overall Rating - Prominent Display */}
                <div className="mb-6 p-6 rounded-lg" style={{ backgroundColor: '#F0FFFE', border: '2px solid #3CC5C0' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-full" style={{ backgroundColor: overallConfig.color + '20' }}>
                        <OverallIcon className="h-8 w-8" style={{ color: overallConfig.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">Overall Rating</p>
                        <p className="text-2xl font-bold text-foreground">{overallConfig.label}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={overallConfig.className + " text-base px-4 py-2"}>
                      {overallConfig.label}
                    </Badge>
                  </div>
                </div>

                {/* Detailed Ratings */}
                <DetailedRatings
                  peopleRating={report.peopleRating}
                  processRating={report.processRating}
                  technologyRating={report.technologyRating}
                />
              </CardContent>
            </Card>
          </section>

          {/* Section 3 - Key Highlights */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Key Achievements */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Key Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {report.keyAchievements.map((achievement, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Key Challenges */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    Key Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {report.keyChallenges.map((challenge, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-yellow-600 mt-1">•</span>
                        <span className="text-foreground">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 4 - Findings Summary */}
          <section className="mb-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Findings Summary</CardTitle>
                <CardDescription>Top findings identified during this reporting period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Impact</TableHead>
                        <TableHead>Likelihood</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {report.findings.slice(0, 5).map((finding) => {
                        const config = getRatingConfig(finding.rating);
                        return (
                          <TableRow key={finding.id}>
                            <TableCell className="font-medium max-w-md">{finding.description}</TableCell>
                            <TableCell>{finding.impact}</TableCell>
                            <TableCell>{finding.likelihood}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={config.className}>
                                {config.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{finding.status}</Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                {report.findings.length > 5 && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Showing 5 of {report.findings.length} findings
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Footer Note */}
          <div className="mt-12 p-6 bg-white border rounded-lg shadow-sm">
            <p className="text-sm text-muted-foreground text-center">
              This report was prepared by <span className="font-semibold text-foreground">{report.ivvVendorName}</span> for the{" "}
              <span className="font-semibold text-foreground">Hawai'i Office of Enterprise Technology Services</span>{" "}
              as part of the IV&V oversight process.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicReportDetail;
