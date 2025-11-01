import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Download,
  CheckCircle,
  AlertCircle,
  FileText,
  Calendar,
  Building2,
  Users,
  Clock,
  MoreVertical,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data matching database schema
const mockProject = {
  id: "project-1",
  projectName: "KEIKI Replatform Off Mainframe (KROM)",
  sponsoringAgency: "ATG",
  description: "Modernizing the child support enforcement system",
  originalContractAmount: 6400000,
  totalPaidToDate: 4200000,
  startDate: "2024-01-15",
  plannedEndDate: "2025-09-22",
  currentProjectedEndDate: "2025-11-11",
  overallProjectStatus: "yellow",
  ivvVendorName: "Accuity LLP",
};

const mockReport = {
  id: "report-1",
  projectId: "project-1",
  reportingPeriod: "April 2025",
  reportingMonth: 4,
  reportingYear: 2025,
  submittedAt: "2025-04-30T23:45:00Z",
  reportStatus: "submitted",
  executiveSummary: "The project achieved strong execution in April with 100% SIT pass rate. However, critical readiness gaps remain with zero schedule float and incomplete D-21 deliverable. Key achievements include completion of SIT Iteration 2 with 100% test pass rate and successful deployment to staging environment. Challenges include UAT training not yet scheduled, D-21 deliverable incomplete, and resource constraints affecting timeline.",
  overallRating: "yellow",
  peopleRating: "green",
  processRating: "yellow",
  technologyRating: "yellow",
  keyAchievements: [
    "Completed SIT Iteration 2 with 100% pass rate",
    "Successfully deployed to staging environment",
    "All critical security patches applied"
  ],
  keyChallenges: [
    "UAT training not yet scheduled",
    "D-21 deliverable incomplete",
    "Resource constraints affecting timeline"
  ],
  submittedByName: "Jane Doe - Accuity LLP"
};

const mockFindings = [
  {
    id: "finding-1",
    projectId: "project-1",
    monthlyReportId: "report-1",
    findingNumber: "Risk-70",
    findingType: "risk",
    description: "File sort logic discrepancies identified during batch testing affecting data output reliability",
    impactRating: 3,
    likelihoodRating: 3,
    calculatedRiskRating: 9,
    vendorRecommendation: "Resolve sort logic or document approved exception; validate against full data extract",
    currentStatus: "open",
    dateFirstRaised: "2025-04-15",
    significance: "Unresolved discrepancies could corrupt child support payment calculations in production"
  },
  {
    id: "finding-2",
    projectId: "project-1",
    monthlyReportId: "report-1",
    findingNumber: "Risk-45",
    findingType: "risk",
    description: "UAT training materials not yet developed with UAT phase scheduled to begin in 4 weeks",
    impactRating: 2,
    likelihoodRating: 3,
    calculatedRiskRating: 6,
    vendorRecommendation: "Expedite training material development and schedule training sessions immediately",
    currentStatus: "in-progress",
    dateFirstRaised: "2025-03-20"
  },
  {
    id: "finding-3",
    projectId: "project-1",
    monthlyReportId: "report-1",
    findingNumber: "Issue-12",
    findingType: "issue",
    description: "Performance degradation observed in batch processing for files over 50MB",
    impactRating: 2,
    likelihoodRating: 2,
    calculatedRiskRating: 4,
    vendorRecommendation: "Optimize batch processing algorithm and implement chunking for large files",
    currentStatus: "closed",
    dateFirstRaised: "2025-02-10",
    closureDate: "2025-04-20"
  }
];

const mockComments = [
  {
    id: 1,
    author: "Sarah Johnson",
    timestamp: "2024-01-20 10:30 AM",
    text: "Initial review completed. Risk assessment looks thorough.",
    resolved: true,
  },
  {
    id: 2,
    author: "Mike Chen",
    timestamp: "2024-01-20 2:15 PM",
    text: "Need clarification on budget allocation in section 3.",
    resolved: false,
  },
];

const mockActivityLog = [
  { date: "2024-01-20", action: "Review started by Sarah Johnson" },
  { date: "2024-01-19", action: "Report assigned to Sarah Johnson" },
  { date: "2024-01-15", action: "Report submitted by TechSolutions Inc." },
  { date: "2024-01-10", action: "Report created" },
];

export default function ReportDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");
  
  const budgetPercentage = Math.round((mockProject.totalPaidToDate / mockProject.originalContractAmount) * 100);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: comments.length + 1,
      author: "Current User",
      timestamp: new Date().toLocaleString(),
      text: newComment,
      resolved: false,
    };
    
    setComments([...comments, comment]);
    setNewComment("");
    toast({
      title: "Comment added",
      description: "Your comment has been saved successfully.",
    });
  };

  const handleApprove = () => {
    toast({
      title: "Report approved",
      description: "The report has been marked as approved.",
    });
  };

  const handleRequestChanges = () => {
    toast({
      title: "Changes requested",
      description: "The vendor has been notified of required revisions.",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Report published",
      description: "The report is now publicly available.",
    });
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "green": return "bg-green-500/10 text-green-700 border-green-500/20";
      case "yellow": return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
      case "red": return "bg-red-500/10 text-red-700 border-red-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRiskColor = (rating: number) => {
    if (rating >= 6) return "bg-red-500/10 text-red-700 border-red-500/20";
    if (rating >= 3) return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
    return "bg-green-500/10 text-green-700 border-green-500/20";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-500/10 text-red-700 border-red-500/20";
      case "in-progress": return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
      case "closed": return "bg-green-500/10 text-green-700 border-green-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b bg-card">
            <div className="flex items-center justify-between px-8 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/admin/dashboard">Reports</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{mockProject.projectName}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleApprove}>
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </Button>
                <Button variant="outline" onClick={handleRequestChanges}>
                  <AlertCircle className="h-4 w-4" />
                  Request Changes
                </Button>
                <Button onClick={handlePublish}>
                  <FileText className="h-4 w-4" />
                  Publish
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-8 bg-muted/30 overflow-auto">
            {/* Report Overview */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {mockProject.projectName}
                  </h1>
                  <div className="flex gap-2 items-center">
                    <Badge className={getRatingColor(mockReport.overallRating)}>
                      Overall: {mockReport.overallRating.toUpperCase()}
                    </Badge>
                    <Badge className="bg-accent/10 text-accent border-accent/20">
                      {mockReport.reportStatus}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Download className="h-4 w-4" />
                      Download
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background">
                    <DropdownMenuItem onClick={() => toast({ title: "Downloading PDF..." })}>
                      PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast({ title: "Downloading Word document..." })}>
                      Word
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Report & Project Metadata */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Report Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Reporting Period</p>
                        <p className="text-sm font-medium">{mockReport.reportingPeriod}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Submitted</p>
                        <p className="text-sm font-medium">{format(new Date(mockReport.submittedAt), "PPP")}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Submitted By</p>
                        <p className="text-sm font-medium">{mockReport.submittedByName}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Ratings</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getRatingColor(mockReport.peopleRating)}>
                          People: {mockReport.peopleRating}
                        </Badge>
                        <Badge className={getRatingColor(mockReport.processRating)}>
                          Process: {mockReport.processRating}
                        </Badge>
                        <Badge className={getRatingColor(mockReport.technologyRating)}>
                          Technology: {mockReport.technologyRating}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Sponsoring Agency</p>
                        <p className="text-sm font-medium">{mockProject.sponsoringAgency}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">IV&V Vendor</p>
                        <p className="text-sm font-medium">{mockProject.ivvVendorName}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Budget Progress</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>${(mockProject.totalPaidToDate / 1000000).toFixed(1)}M spent</span>
                          <span>${(mockProject.originalContractAmount / 1000000).toFixed(1)}M total</span>
                        </div>
                        <Progress value={budgetPercentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">{budgetPercentage}% of budget used</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Timeline</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Planned End:</span>
                          <span>{format(new Date(mockProject.plannedEndDate), "PP")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Projected End:</span>
                          <span className="font-medium">{format(new Date(mockProject.currentProjectedEndDate), "PP")}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="mb-6">
              <TabsList>
                <TabsTrigger value="overview">Executive Summary</TabsTrigger>
                <TabsTrigger value="highlights">Key Highlights</TabsTrigger>
                <TabsTrigger value="findings">Findings</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Executive Summary</CardTitle>
                      <CardDescription>Overall assessment for {mockReport.reportingPeriod}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {mockReport.executiveSummary}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Reviewer Comments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {comments.filter(c => !c.resolved).map((comment) => (
                          <div key={comment.id} className="border-l-2 border-primary pl-3 py-2">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-xs font-medium">{comment.author}</p>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MoreVertical className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-background">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      const updatedComments = comments.map(c => 
                                        c.id === comment.id ? { ...c, resolved: true } : c
                                      );
                                      setComments(updatedComments);
                                      toast({ title: "Comment resolved" });
                                    }}
                                  >
                                    Resolve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      toast({ title: "Reply feature coming soon" });
                                    }}
                                  >
                                    Reply
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => {
                                      const updatedComments = comments.filter(c => c.id !== comment.id);
                                      setComments(updatedComments);
                                      toast({ title: "Comment deleted" });
                                    }}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{comment.timestamp}</p>
                            <p className="text-sm">{comment.text}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <Textarea
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <Button onClick={handleAddComment} className="w-full">
                          Add Comment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="highlights" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Key Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {mockReport.keyAchievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                        Key Challenges
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {mockReport.keyChallenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-yellow-600 mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="findings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Findings Summary</CardTitle>
                    <CardDescription>Risks and issues identified in this report</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockFindings.map((finding) => (
                      <div key={finding.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="font-mono text-xs">
                                {finding.findingNumber}
                              </Badge>
                              <Badge variant="outline" className="capitalize">
                                {finding.findingType}
                              </Badge>
                              <Badge className={getRiskColor(finding.calculatedRiskRating)}>
                                Risk: {finding.calculatedRiskRating}/9
                              </Badge>
                              <Badge className={getStatusColor(finding.currentStatus)}>
                                {finding.currentStatus.replace('-', ' ')}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium mb-2">{finding.description}</p>
                            {finding.significance && (
                              <p className="text-xs text-muted-foreground italic mb-2">
                                Significance: {finding.significance}
                              </p>
                            )}
                            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                              <div>
                                <span className="text-muted-foreground">Impact: </span>
                                <span className="font-medium">{finding.impactRating}/3</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Likelihood: </span>
                                <span className="font-medium">{finding.likelihoodRating}/3</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">First Raised: </span>
                                <span className="font-medium">{format(new Date(finding.dateFirstRaised), "PP")}</span>
                              </div>
                              {finding.closureDate && (
                                <div>
                                  <span className="text-muted-foreground">Closed: </span>
                                  <span className="font-medium">{format(new Date(finding.closureDate), "PP")}</span>
                                </div>
                              )}
                            </div>
                            <div className="bg-muted/50 rounded p-3 mt-2">
                              <p className="text-xs font-medium text-muted-foreground mb-1">Vendor Recommendation:</p>
                              <p className="text-sm">{finding.vendorRecommendation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attachments" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Report Attachments</CardTitle>
                    <CardDescription>Supporting documents and files</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
                      No attachments available for this report
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Activity Log */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockActivityLog.map((activity, index) => (
                    <div key={index} className="flex gap-3 text-sm">
                      <div className="text-muted-foreground min-w-[100px]">{activity.date}</div>
                      <div>{activity.action}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
