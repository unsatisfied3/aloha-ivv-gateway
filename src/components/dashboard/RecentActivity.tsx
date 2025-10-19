import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, AlertCircle, Upload } from "lucide-react";

const activities = [
  {
    icon: Upload,
    text: "Vendor A submitted Report #24",
    time: "2 hours ago",
    type: "upload",
  },
  {
    icon: CheckCircle,
    text: "Review completed by J. Lee",
    time: "4 hours ago",
    type: "success",
  },
  {
    icon: FileText,
    text: "New report assigned: Highway Infrastructure",
    time: "6 hours ago",
    type: "info",
  },
  {
    icon: AlertCircle,
    text: "High-risk flag on Water Treatment project",
    time: "8 hours ago",
    type: "warning",
  },
  {
    icon: CheckCircle,
    text: "Report #19 published to public portal",
    time: "1 day ago",
    type: "success",
  },
];

const getIconColor = (type: string) => {
  switch (type) {
    case "success":
      return "text-accent";
    case "warning":
      return "text-destructive";
    case "upload":
      return "text-primary";
    default:
      return "text-muted-foreground";
  }
};

export function RecentActivity() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
            >
              <Icon className={`h-5 w-5 mt-0.5 ${getIconColor(activity.type)}`} />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.text}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
