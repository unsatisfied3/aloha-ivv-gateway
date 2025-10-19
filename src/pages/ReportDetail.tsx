import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Download,
  CheckCircle,
  AlertCircle,
  FileText,
  Send,
} from "lucide-react";

// Mock data using schema fields
const mockReport = {
  id: "1",
  projectId: "proj-001",
  projectName: "DOH Health Connect Upgrade",
  reportingPeriod: "Q4 2024",
  reportingMonth: 12,
  reportingYear: 2024,
  reportStatus: "submitted",
  executiveSummary: `The DOH Health Connect Upgrade project continues to progress through Phase 2 of the implementation cycle. This quarter saw significant advancement in the integration layer development and initial security audit completion.

Key milestones achieved include completion of the API gateway architecture, successful integration with three major healthcare systems, and clearance of initial penetration testing results.

Overall project health remains strong with minor schedule adjustments needed for Q1 2025 to accommodate additional stakeholder training sessions.`,
  overallRating: "green",
  peopleRating: "green",
  processRating: "yellow",
  technologyRating: "green",
  keyAchievements: [
    "Completed API gateway architecture and deployment",
    "Successfully integrated with 3 major healthcare provider systems",
    "Passed initial security penetration testing with zero critical findings",
    "Onboarded 15 new staff members to support Phase 3",
  ],
  keyChallenges: [
    "Stakeholder alignment on data sharing protocols delayed by 2 weeks",
    "Vendor resource constraints for specialized FHIR integration expertise",
    "Unexpected complexity in legacy system data migration requiring additional sprint",
  ],
  scheduleVarianceAnalysis: `Current schedule variance is +8 days from baseline. Primary driver is additional time required for stakeholder consensus on data governance framework.

Mitigation: Added dedicated governance workstream and accelerated decision-making process. Forecast shows return to baseline by end of Q1 2025.

Critical path items remain on track. No impact to Phase 3 go-live date expected.`,
  budgetVarianceAnalysis: `Budget variance is -2.3% under allocated funds for Q4. Savings primarily from deferred training costs and favorable vendor contract negotiations.

Total spend to date: $1,850,000 of $2,450,000 contract value (75.5%).

Forecast shows project completing within 98% of approved budget, with contingency fund remaining intact.`,
  agency: "Department of Health",
  vendor: "TechSolutions Inc.",
  submittedByName: "Sarah Johnson",
  submittedAt: "2024-01-20T14:30:00",
  reviewerAssigned: "Mike Chen",
};

// Mock findings from findings table
const mockFindings = [
  {
    id: "f1",
    findingNumber: "F-001",
    findingType: "Schedule Risk",
    description: "Data migration complexity may cause 1-2 week delay in Phase 3 kickoff if not addressed.",
    impactRating: "medium",
    likelihoodRating: "high",
    calculatedRiskRating: "yellow",
    vendorRecommendation: "Allocate additional senior data engineer for 3 weeks; begin parallel test migration immediately.",
    currentStatus: "open",
    dateFirstRaised: "2024-01-15",
  },
  {
    id: "f2",
    findingNumber: "F-002",
    findingType: "Technical Debt",
    description: "Legacy API endpoints require refactoring to meet current security standards.",
    impactRating: "high",
    likelihoodRating: "low",
    calculatedRiskRating: "yellow",
    vendorRecommendation: "Schedule dedicated sprint in Phase 3 to modernize authentication layer.",
    currentStatus: "acknowledged",
    dateFirstRaised: "2024-01-18",
  },
  {
    id: "f3",
    findingNumber: "F-003",
    findingType: "Resource Constraint",
    description: "QA staffing insufficient for planned Phase 3 testing volume.",
    impactRating: "high",
    likelihoodRating: "high",
    calculatedRiskRating: "red",
    vendorRecommendation: "Hire 2 additional QA engineers or engage third-party testing partner by Feb 1.",
    currentStatus: "open",
    dateFirstRaised: "2024-01-12",
  },
  {
    id: "f4",
    findingNumber: "F-004",
    findingType: "Compliance",
    description: "Minor gaps in HIPAA audit trail logging for certain administrative functions.",
    impactRating: "medium",
    likelihoodRating: "medium",
    calculatedRiskRating: "yellow",
    vendorRecommendation: "Implement comprehensive logging module; target completion within 2 sprints.",
    currentStatus: "in_progress",
    dateFirstRaised: "2024-01-10",
  },
];

const mockComments = [
  {
    id: 1,
    author: "Mike Chen",
    timestamp: "2024-01-20 10:30 AM",
    text: "Executive summary is clear and comprehensive. Good visibility into achievements.",
    resolved: true,
  },
  {
    id: 2,
    author: "Lisa Patel",
    timestamp: "2024-01-20 2:15 PM",
    text: "F-003 is concerning. Recommend prioritizing QA staffing resolution immediately.",
    resolved: false,
  },
];

const getRatingColor = (rating: string) => {
  switch (rating) {
    case "green":
      return "bg-accent text-accent-foreground";
    case "yellow":
      return "bg-yellow-500 text-white";
    case "red":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getRatingLabel = (rating: string) => {
  switch (rating) {
    case "green":
      return "On Track";
    case "yellow":
      return "At Risk";
    case "red":
      return "Critical";
    default:
      return rating;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "draft":
      return "bg-muted text-muted-foreground";
    case "submitted":
      return "bg-primary/20 text-primary border-primary/40";
    case "approved":
      return "bg-accent/20 text-accent border-accent/40";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "draft":
      return "Draft";
    case "submitted":
      return "Submitted";
    case "approved":
      return "Approved";
    default:
      return status;
  }
};

const getFindingStatusColor = (status: string) => {
  switch (status) {
    case "open":
      return "bg-destructive/20 text-destructive border-destructive/40";
    case "acknowledged":
      return "bg-primary/20 text-primary border-primary/40";
    case "in_progress":
      return "bg-yellow-500/20 text-yellow-700 border-yellow-500/40 dark:text-yellow-400";
    case "resolved":
      return "bg-accent/20 text-accent border-accent/40";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getFindingStatusLabel = (status: string) => {
  switch (status) {
    case "open":
      return "Open";
    case "acknowledged":
      return "Acknowledged";
    case "in_progress":
      return "In Progress";
    case "resolved":
      return "Resolved";
    default:
      return status;
  }
};

export default function ReportDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");
  const [reportStatus, setReportStatus] = useState(mockReport.reportStatus);

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
      title: "Comment saved",
      description: "Your comment has been added successfully.",
    });
  };

  const handleApprove = () => {
    setReportStatus("approved");
    toast({
      title: "Report approved",
      description: "The report has been marked as approved.",
    });
  };

  const handleRequestChanges = () => {
    toast({
      title: "Revisions requested",
      description: "The vendor has been notified of required revisions.",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Report published",
      description: "The report is now publicly available.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header with Breadcrumb and Actions */}
          <header className="border-b bg-card sticky top-0 z-10">
            <div className="px-8 py-4">
              <div className="flex items-center justify-between mb-3">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/admin/reports">Reports</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{mockReport.projectName}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleApprove}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRequestChanges}>
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Request Revisions
                  </Button>
                  <Button size="sm" onClick={handlePublish}>
                    <FileText className="h-4 w-4 mr-2" />
                    Publish
                  </Button>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {mockReport.projectName} — {mockReport.reportingPeriod}
                  </h1>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>Agency: {mockReport.agency}</span>
                    <span>•</span>
                    <span>Vendor: {mockReport.vendor}</span>
                    <span>•</span>
                    <span>Submitted: {new Date(mockReport.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={cn("border", getStatusColor(reportStatus))}>
                    {getStatusLabel(reportStatus)}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-8 bg-muted/30 overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Report Summary Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Report Summary</CardTitle>
                    <CardDescription>
                      Reporting Period: {mockReport.reportingPeriod} • Overall Rating: {" "}
                      <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium", getRatingColor(mockReport.overallRating))}>
                        {getRatingLabel(mockReport.overallRating)}
                      </span>
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="ratings">Ratings</TabsTrigger>
                    <TabsTrigger value="variances">Variances</TabsTrigger>
                    <TabsTrigger value="findings">Findings</TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Executive Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                          {mockReport.executiveSummary}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Key Achievements</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {mockReport.keyAchievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Key Challenges</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {mockReport.keyChallenges.map((challenge, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Ratings Tab */}
                  <TabsContent value="ratings" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Performance Ratings</CardTitle>
                        <CardDescription>Assessment across key dimensions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium mb-1">People</h4>
                              <p className="text-xs text-muted-foreground">Team capability, staffing, and collaboration</p>
                            </div>
                            <div className={cn("px-4 py-2 rounded-full font-medium", getRatingColor(mockReport.peopleRating))}>
                              {getRatingLabel(mockReport.peopleRating)}
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium mb-1">Process</h4>
                              <p className="text-xs text-muted-foreground">Project management, workflows, and governance</p>
                            </div>
                            <div className={cn("px-4 py-2 rounded-full font-medium", getRatingColor(mockReport.processRating))}>
                              {getRatingLabel(mockReport.processRating)}
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium mb-1">Technology</h4>
                              <p className="text-xs text-muted-foreground">Architecture, security, and technical quality</p>
                            </div>
                            <div className={cn("px-4 py-2 rounded-full font-medium", getRatingColor(mockReport.technologyRating))}>
                              {getRatingLabel(mockReport.technologyRating)}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Variances Tab */}
                  <TabsContent value="variances" className="mt-6">
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle>Schedule Variance Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                          {mockReport.scheduleVarianceAnalysis}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Budget Variance Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                          {mockReport.budgetVarianceAnalysis}
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Findings Tab */}
                  <TabsContent value="findings" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Findings & Recommendations</CardTitle>
                        <CardDescription>{mockFindings.length} findings identified</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-20">ID</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="w-24">Risk</TableHead>
                                <TableHead className="w-32">Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {mockFindings.map((finding) => (
                                <TableRow key={finding.id} className="hover:bg-muted/50">
                                  <TableCell className="font-mono text-xs">{finding.findingNumber}</TableCell>
                                  <TableCell className="text-sm">{finding.findingType}</TableCell>
                                  <TableCell className="text-sm text-muted-foreground max-w-md">
                                    {finding.description}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <div className={cn("h-3 w-3 rounded-full", getRatingColor(finding.calculatedRiskRating).replace("text-", "bg-").split(" ")[0])} />
                                      <span className="text-xs capitalize">{finding.calculatedRiskRating}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge className={cn("border text-xs", getFindingStatusColor(finding.currentStatus))}>
                                      {getFindingStatusLabel(finding.currentStatus)}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>

                        {/* Finding Details (expandable) */}
                        <div className="mt-6 space-y-3">
                          <h4 className="text-sm font-semibold">Critical Finding Detail</h4>
                          {mockFindings.filter(f => f.calculatedRiskRating === "red").map((finding) => (
                            <div key={finding.id} className="border-l-4 border-destructive pl-4 py-3 bg-destructive/5 rounded-r">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-sm">{finding.findingNumber}: {finding.findingType}</h5>
                                <Badge className={cn("border text-xs", getFindingStatusColor(finding.currentStatus))}>
                                  {getFindingStatusLabel(finding.currentStatus)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{finding.description}</p>
                              <div className="bg-card p-3 rounded border mt-2">
                                <p className="text-xs font-medium mb-1">Vendor Recommendation:</p>
                                <p className="text-xs text-muted-foreground">{finding.vendorRecommendation}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                First raised: {new Date(finding.dateFirstRaised).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Reviewer Comments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Reviewer Comments</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {comments.map((comment) => (
                        <div key={comment.id} className="border-l-2 border-primary pl-3 py-2">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs font-medium">{comment.author}</p>
                            {comment.resolved && (
                              <Badge variant="outline" className="text-xs bg-accent/10 text-accent">
                                Resolved
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{comment.timestamp}</p>
                          <p className="text-sm leading-relaxed">{comment.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-2 border-t">
                      <Textarea
                        placeholder="Add your review comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[80px] text-sm"
                      />
                      <Button onClick={handleAddComment} className="w-full" size="sm">
                        <Send className="h-3 w-3 mr-2" />
                        Add Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Report Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Report Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                      <span className="text-sm font-medium">Current Status</span>
                      <Badge className={cn("border", getStatusColor(reportStatus))}>
                        {getStatusLabel(reportStatus)}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <Button onClick={handleApprove} className="w-full" variant="default">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Approved
                      </Button>
                      <Button onClick={handleRequestChanges} className="w-full" variant="outline">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Request Revisions
                      </Button>
                      <Button onClick={handlePublish} className="w-full" variant="secondary">
                        <FileText className="h-4 w-4 mr-2" />
                        Publish Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Achievements</span>
                      <span className="font-medium">{mockReport.keyAchievements.length}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Challenges</span>
                      <span className="font-medium">{mockReport.keyChallenges.length}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Total Findings</span>
                      <span className="font-medium">{mockFindings.length}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Critical Findings</span>
                      <span className="font-medium text-destructive">
                        {mockFindings.filter(f => f.calculatedRiskRating === "red").length}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
