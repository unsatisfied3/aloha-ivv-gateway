import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

const summaryData = [
  {
    title: "Total Active Projects",
    value: "127",
    trend: "+12%",
    isPositive: true,
  },
  {
    title: "Reports in Review",
    value: "34",
    trend: "+5%",
    isPositive: true,
  },
  {
    title: "Published Reports",
    value: "89",
    trend: "+8%",
    isPositive: true,
  },
  {
    title: "High-Risk Projects",
    value: "15",
    trend: "-3%",
    isPositive: true,
  },
];

export function SummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item, index) => (
        <Card key={index} className="bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </p>
                <p className="text-3xl font-bold text-foreground">{item.value}</p>
              </div>
              <div className="h-8 w-16 flex items-end justify-end space-x-1">
                {/* Simple sparkline visualization */}
                <div className="h-3 w-1 bg-primary/30 rounded-sm"></div>
                <div className="h-5 w-1 bg-primary/50 rounded-sm"></div>
                <div className="h-4 w-1 bg-primary/40 rounded-sm"></div>
                <div className="h-6 w-1 bg-primary/60 rounded-sm"></div>
                <div className="h-8 w-1 bg-primary rounded-sm"></div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              {item.isPositive ? (
                <TrendingUp className="h-4 w-4 text-accent" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span
                className={
                  item.isPositive ? "text-accent" : "text-destructive"
                }
              >
                {item.trend}
              </span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
