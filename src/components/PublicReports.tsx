import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Calendar, Search } from "lucide-react";
import { Link } from "react-router-dom";

const sampleReports = [
  {
    id: "1",
    projectName: "Student Information System",
    sponsoringAgency: "Department of Education",
    date: "2025-10-15",
  },
  {
    id: "2",
    projectName: "Healthcare Data Platform",
    sponsoringAgency: "Department of Health",
    date: "2025-10-12",
  },
  {
    id: "3",
    projectName: "Fleet Management System",
    sponsoringAgency: "Department of Transportation",
    date: "2025-10-08",
  },
];


export const PublicReports = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Search Public Reports
          </h2>
          <p className="text-base text-muted-foreground">
            Explore validated IV&V reports across all state agencies
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search health, education, or technology projects..."
              className="pl-10 h-12 bg-background border-border"
            />
          </div>
          <Button size="lg" className="bg-[hsl(178,100%,24%)] hover:bg-[hsl(178,100%,20%)] text-white px-8">
            Search
          </Button>
        </div>

        {/* Recent Reports */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">Recent Reports</h3>
          <div className="space-y-3">
            {sampleReports.map((report) => (
              <Link
                key={report.id}
                to={`/public/report/${report.id}`}
                className="block"
              >
                <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(178,100%,24%)]/10 flex-shrink-0">
                    <FileText className="h-5 w-5 text-[hsl(178,100%,24%)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground group-hover:text-[hsl(178,100%,24%)] transition-colors">
                      {report.sponsoringAgency} - {report.projectName}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{report.date}</span>
                      </div>
                      <span>•</span>
                      <Badge variant="secondary" className="bg-[hsl(142,76%,36%)]/10 text-[hsl(142,76%,36%)] hover:bg-[hsl(142,76%,36%)]/20 border-0">
                        Approved
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/public/catalog">
            <Button size="lg" className="bg-[hsl(178,100%,24%)] hover:bg-[hsl(178,100%,20%)] text-white">
              View All Reports
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
