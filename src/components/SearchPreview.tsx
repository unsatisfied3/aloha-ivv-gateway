import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, FileText, Calendar } from "lucide-react";

const recentReports = [
  {
    title: "Department of Education - Student Information System",
    date: "2025-10-15",
    status: "Approved",
  },
  {
    title: "Department of Health - Healthcare Data Platform",
    date: "2025-10-12",
    status: "Approved",
  },
  {
    title: "Department of Transportation - Fleet Management System",
    date: "2025-10-08",
    status: "Approved",
  },
];

export const SearchPreview = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Search Public Reports
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore validated IV&V reports across all state agencies
            </p>
          </div>

          <div className="mb-8 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search health, education, or technology projects..."
                className="pl-10"
              />
            </div>
            <Button>Search</Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
            {recentReports.map((report, index) => (
              <Card
                key={index}
                className="cursor-pointer p-4 shadow-soft transition-all hover:shadow-medium hover:border-primary"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-card-foreground">
                        {report.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{report.date}</span>
                        <span className="mx-2">•</span>
                        <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-medium text-secondary">
                          {report.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
