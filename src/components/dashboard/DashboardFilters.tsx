import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";

export function DashboardFilters() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor active projects, report progress, and upcoming reviews.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects, vendors, or agencies..."
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range
        </Button>
      </div>
    </div>
  );
}
