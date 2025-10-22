import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const sampleReports = [
  {
    id: "1",
    projectName: "Health Insurance Exchange Modernization",
    sponsoringAgency: "Department of Human Services",
    reportingPeriod: "Q2 2024",
    overallRating: "green" as const,
    executiveSummary: "The project continues to meet key milestones with strong vendor collaboration and stakeholder engagement.",
  },
  {
    id: "2",
    projectName: "Statewide Education Portal",
    sponsoringAgency: "Department of Education",
    reportingPeriod: "Q1 2024",
    overallRating: "yellow" as const,
    executiveSummary: "Progress is steady with some minor technical challenges identified and mitigation plans in place.",
  },
  {
    id: "3",
    projectName: "Tax Modernization Initiative",
    sponsoringAgency: "Department of Taxation",
    reportingPeriod: "Q4 2023",
    overallRating: "green" as const,
    executiveSummary: "Successful completion of Phase 1 with all deliverables met on time and within budget.",
  },
];

const getRatingColor = (rating: string) => {
  switch (rating) {
    case "green":
      return "bg-[hsl(142,76%,36%)] text-white hover:bg-[hsl(142,76%,30%)]";
    case "yellow":
      return "bg-[hsl(45,93%,47%)] text-foreground hover:bg-[hsl(45,93%,40%)]";
    case "red":
      return "bg-[hsl(0,84%,60%)] text-white hover:bg-[hsl(0,84%,50%)]";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const PublicReports = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Recently Published Reports
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse the latest approved IV&V reports from state agencies and programs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {sampleReports.map((report) => (
            <Card key={report.id} className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <FileText className="h-5 w-5 text-[hsl(178,100%,24%)] flex-shrink-0 mt-1" />
                  <Badge className={getRatingColor(report.overallRating)}>
                    {report.overallRating.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-xl line-clamp-2">
                  {report.projectName}
                </CardTitle>
                <CardDescription className="text-sm">
                  {report.sponsoringAgency} • {report.reportingPeriod}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {report.executiveSummary}
                </p>
                <Link to={`/public/report/${report.id}`}>
                  <Button variant="ghost" className="w-full group-hover:bg-accent">
                    View Report
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/public/catalog">
            <Button size="lg" className="bg-[hsl(178,100%,24%)] hover:bg-[hsl(178,100%,20%)] text-white">
              View All Reports
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
