import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const projects = [
  {
    name: "Highway Infrastructure Modernization",
    agency: "DOT",
    vendor: "BuildCorp LLC",
    status: "Active",
    reviewer: "Sarah Chen",
    lastUpdated: "2024-01-15",
  },
  {
    name: "Coastal Protection Initiative",
    agency: "DEP",
    vendor: "EcoSolutions Inc",
    status: "In Review",
    reviewer: "Mike Johnson",
    lastUpdated: "2024-01-14",
  },
  {
    name: "Public School Technology Upgrade",
    agency: "DOE",
    vendor: "TechForward",
    status: "Active",
    reviewer: "Lisa Park",
    lastUpdated: "2024-01-13",
  },
  {
    name: "Water Treatment Facility",
    agency: "DWR",
    vendor: "AquaTech Systems",
    status: "Published",
    reviewer: "David Kim",
    lastUpdated: "2024-01-12",
  },
  {
    name: "Emergency Response System",
    agency: "DHS",
    vendor: "SafetyFirst Group",
    status: "In Review",
    reviewer: "Anna Martinez",
    lastUpdated: "2024-01-11",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-accent/20 text-accent hover:bg-accent/30";
    case "In Review":
      return "bg-primary/20 text-primary hover:bg-primary/30";
    case "Published":
      return "bg-secondary/20 text-secondary hover:bg-secondary/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function ActiveProjectsTable() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Active Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Agency</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reviewer</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.agency}</TableCell>
                <TableCell>{project.vendor}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>{project.reviewer}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(project.lastUpdated).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          <Button variant="outline">View All Reports</Button>
        </div>
      </CardContent>
    </Card>
  );
}
