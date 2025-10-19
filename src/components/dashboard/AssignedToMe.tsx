import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const assignments = [
  {
    name: "Coastal Protection Initiative Review",
    dueDate: "2024-01-20",
    progress: 65,
  },
  {
    name: "Highway Infrastructure Report",
    dueDate: "2024-01-18",
    progress: 80,
  },
  {
    name: "Emergency Response Analysis",
    dueDate: "2024-01-25",
    progress: 40,
  },
  {
    name: "Public School Tech Assessment",
    dueDate: "2024-01-22",
    progress: 55,
  },
];

export function AssignedToMe() {
  const getDaysUntil = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Assigned to Me</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {assignments.map((assignment, index) => (
          <div
            key={index}
            className="space-y-2 pb-4 border-b last:border-0 last:pb-0"
          >
            <div className="flex items-start justify-between">
              <h4 className="text-sm font-medium">{assignment.name}</h4>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                {getDaysUntil(assignment.dueDate)} days
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{assignment.progress}%</span>
              </div>
              <Progress value={assignment.progress} className="h-2" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
