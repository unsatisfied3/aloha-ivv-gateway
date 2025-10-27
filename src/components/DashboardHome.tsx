import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardHome = () => {
  const stats = [
    {
      title: "Active Projects",
      value: "12",
      description: "Projects in progress",
      icon: BarChart3,
      color: "text-blue-500",
    },
    {
      title: "Reports Submitted",
      value: "34",
      description: "This month",
      icon: FileText,
      color: "text-green-500",
    },
    {
      title: "Team Members",
      value: "8",
      description: "Active users",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Completion Rate",
      value: "94%",
      description: "On-time delivery",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  const recentActivity = [
    { action: "Report submitted", project: "Project Alpha", time: "2 hours ago" },
    { action: "Project updated", project: "Project Beta", time: "5 hours ago" },
    { action: "New milestone reached", project: "Project Gamma", time: "1 day ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg p-6 border border-border">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your projects and recent activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/project/new">
                <BarChart3 className="mr-2 h-4 w-4" />
                Create New Project
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/vendor/report/new">
                <FileText className="mr-2 h-4 w-4" />
                Submit Report
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/projects">
                <Users className="mr-2 h-4 w-4" />
                View All Projects
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across all projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-between items-start border-b border-border pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.project}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
