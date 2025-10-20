import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
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
  Flag,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const mockReport = {
  id: "1",
  projectName: "DOH Health Connect Upgrade IV&V Report",
  agency: "Department of Health",
  vendor: "TechSolutions Inc.",
  submissionDate: "2024-01-15",
  reviewer: "Sarah Johnson",
  status: "In Review",
  lastUpdated: "2024-01-20",
  progress: 60,
  timeline: {
    submitted: { date: "2024-01-15", completed: true },
    inReview: { date: "2024-01-19", completed: true },
    approved: { date: null, completed: false },
    published: { date: null, completed: false },
  },
};

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
  const [riskStatuses, setRiskStatuses] = useState<Record<string, 'pending' | 'resolved' | 'flagged'>>({});
  const [complianceStatuses, setComplianceStatuses] = useState<Record<string, 'pending' | 'resolved' | 'flagged'>>({});

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

  const handleResolveRisk = (riskId: string) => {
    setRiskStatuses(prev => ({ ...prev, [riskId]: 'resolved' }));
    toast({ title: "Risk resolved", description: "The risk has been marked as resolved." });
  };

  const handleFlagRisk = (riskId: string) => {
    setRiskStatuses(prev => ({ ...prev, [riskId]: 'flagged' }));
    toast({ title: "Risk flagged", description: "The risk has been flagged for follow-up." });
  };

  const handleResolveCompliance = (itemId: string) => {
    setComplianceStatuses(prev => ({ ...prev, [itemId]: 'resolved' }));
    toast({ title: "Item resolved", description: "The compliance item has been marked as resolved." });
  };

  const handleFlagCompliance = (itemId: string) => {
    setComplianceStatuses(prev => ({ ...prev, [itemId]: 'flagged' }));
    toast({ title: "Item flagged", description: "The compliance item has been flagged for follow-up." });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b bg-card">
            <div className="flex items-center justify-between px-8 py-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/admin/dashboard">Reports</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{mockReport.projectName}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              
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
                    {mockReport.projectName}
                  </h1>
                  <Badge className="bg-accent/10 text-accent border-accent/20">
                    {mockReport.status}
                  </Badge>
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

              {/* Condensed metadata table */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Agency</p>
                        <p className="text-sm font-medium">{mockReport.agency}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Vendor</p>
                        <p className="text-sm font-medium">{mockReport.vendor}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Reviewer</p>
                        <p className="text-sm font-medium">{mockReport.reviewer}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Submitted</p>
                        <p className="text-sm font-medium">{mockReport.submissionDate}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Last Updated</p>
                        <p className="text-sm font-medium">{mockReport.lastUpdated}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Review Progress</p>
                        <div className="flex items-center gap-2">
                          <Progress value={mockReport.progress} className="h-2 w-20 bg-muted [&>div]:bg-primary" />
                          <span className="text-sm font-medium">{mockReport.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="mb-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
                <TabsTrigger value="compliance">Compliance Checklist</TabsTrigger>
                <TabsTrigger value="findings">Findings & Recommendations</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Project Overview</CardTitle>
                      <CardDescription>Summary of the IV&V assessment</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        The DOH Health Connect Upgrade project aims to modernize the state's health information exchange system. 
                        This IV&V assessment covers the planning, design, and initial implementation phases of the project.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Key objectives include improving data interoperability, enhancing security protocols, and streamlining 
                        healthcare provider workflows. The project is currently in Phase 2 of 4 planned phases.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Initial assessments indicate strong project management practices and clear stakeholder communication. 
                        Some areas requiring attention include timeline optimization and resource allocation for the testing phase.
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

              <TabsContent value="risk" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Risk Assessment</CardTitle>
                      <CardDescription>Identified risks and mitigation strategies</CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">Schedule Risk</h4>
                              {riskStatuses['schedule'] === 'resolved' && (
                                <Badge className="bg-green-500/10 text-green-700 border-green-500/20">Resolved</Badge>
                              )}
                              {riskStatuses['schedule'] === 'flagged' && (
                                <Badge className="bg-red-500/10 text-red-700 border-red-500/20">Flagged</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-500/20 text-green-700 border-green-500/30">Low</Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-background">
                                  <DropdownMenuItem onClick={() => handleResolveRisk('schedule')}>
                                    <Check className="h-4 w-4 mr-2" />
                                    Resolve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleFlagRisk('schedule')}>
                                    <Flag className="h-4 w-4 mr-2" />
                                    Flag for Follow-up
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Project timeline is realistic with adequate buffer periods. Regular milestone reviews in place.
                          </p>
                        </div>

                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">Resource Allocation</h4>
                              {riskStatuses['resource'] === 'resolved' && (
                                <Badge className="bg-green-500/10 text-green-700 border-green-500/20">Resolved</Badge>
                              )}
                              {riskStatuses['resource'] === 'flagged' && (
                                <Badge className="bg-red-500/10 text-red-700 border-red-500/20">Flagged</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30">Medium</Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-background">
                                  <DropdownMenuItem onClick={() => handleResolveRisk('resource')}>
                                    <Check className="h-4 w-4 mr-2" />
                                    Resolve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleFlagRisk('resource')}>
                                    <Flag className="h-4 w-4 mr-2" />
                                    Flag for Follow-up
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Current staffing levels may be insufficient for peak testing phase. Recommend additional QA resources.
                          </p>
                        </div>

                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">Technical Complexity</h4>
                              {riskStatuses['technical'] === 'resolved' && (
                                <Badge className="bg-green-500/10 text-green-700 border-green-500/20">Resolved</Badge>
                              )}
                              {riskStatuses['technical'] === 'flagged' && (
                                <Badge className="bg-red-500/10 text-red-700 border-red-500/20">Flagged</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-500/20 text-green-700 border-green-500/30">Low</Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-background">
                                  <DropdownMenuItem onClick={() => handleResolveRisk('technical')}>
                                    <Check className="h-4 w-4 mr-2" />
                                    Resolve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleFlagRisk('technical')}>
                                    <Flag className="h-4 w-4 mr-2" />
                                    Flag for Follow-up
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Technology stack is well-established. Team has appropriate expertise in chosen platforms.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Reviewer Comments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Add a comment..."
                          className="min-h-[100px]"
                        />
                        <Button className="w-full">Add Comment</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="compliance" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Compliance Checklist</CardTitle>
                      <CardDescription>Regulatory and policy compliance status</CardDescription>
                    </CardHeader>
                     <CardContent>
                      <div className="space-y-2">
                        {[
                          { id: "hipaa", item: "HIPAA Compliance Review", status: "Complete" },
                          { id: "security", item: "State IT Security Standards", status: "Complete" },
                          { id: "ada", item: "Accessibility (ADA) Requirements", status: "In Progress" },
                          { id: "privacy", item: "Data Privacy Impact Assessment", status: "Complete" },
                          { id: "disaster", item: "Disaster Recovery Plan", status: "In Progress" },
                        ].map((item) => (
                          <div key={item.id} className="flex items-center justify-between border-b py-3">
                            <div className="flex items-center gap-2">
                              <p className="text-sm">{item.item}</p>
                              {complianceStatuses[item.id] === 'resolved' && (
                                <Badge className="bg-green-500/10 text-green-700 border-green-500/20 text-xs">Resolved</Badge>
                              )}
                              {complianceStatuses[item.id] === 'flagged' && (
                                <Badge className="bg-red-500/10 text-red-700 border-red-500/20 text-xs">Flagged</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={
                                item.status === "Complete" 
                                  ? "bg-green-500/20 text-green-700 border-green-500/30" 
                                  : "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
                              }>
                                {item.status}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-background">
                                  <DropdownMenuItem onClick={() => handleResolveCompliance(item.id)}>
                                    <Check className="h-4 w-4 mr-2" />
                                    Resolve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleFlagCompliance(item.id)}>
                                    <Flag className="h-4 w-4 mr-2" />
                                    Flag for Follow-up
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Reviewer Comments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Add a comment..."
                          className="min-h-[100px]"
                        />
                        <Button className="w-full">Add Comment</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="findings" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Findings & Recommendations</CardTitle>
                      <CardDescription>Key observations and suggested actions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="border-l-4 border-primary pl-4">
                          <h4 className="font-medium mb-2">Finding #1: Testing Coverage</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Current test plan covers 85% of critical user workflows. Recommend expanding coverage to include edge cases.
                          </p>
                          <p className="text-sm font-medium text-primary">Recommendation: Add 15 additional test scenarios</p>
                        </div>

                        <div className="border-l-4 border-primary pl-4">
                          <h4 className="font-medium mb-2">Finding #2: Documentation Quality</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Technical documentation is comprehensive and well-organized. User documentation needs enhancement.
                          </p>
                          <p className="text-sm font-medium text-primary">Recommendation: Engage technical writer for user guides</p>
                        </div>

                        <div className="border-l-4 border-primary pl-4">
                          <h4 className="font-medium mb-2">Finding #3: Stakeholder Engagement</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Regular stakeholder meetings are conducted. Consider increasing frequency during critical phases.
                          </p>
                          <p className="text-sm font-medium text-primary">Recommendation: Bi-weekly updates during Phase 3</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Reviewer Comments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Add a comment..."
                          className="min-h-[100px]"
                        />
                        <Button className="w-full">Add Comment</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="attachments" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Supporting Documents</CardTitle>
                      <CardDescription>Attachments and reference materials</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { name: "Project Charter.pdf", size: "2.4 MB", date: "2024-01-10" },
                          { name: "Risk Register.xlsx", size: "1.1 MB", date: "2024-01-12" },
                          { name: "Test Plan v2.docx", size: "3.7 MB", date: "2024-01-15" },
                          { name: "Architecture Diagram.pdf", size: "5.2 MB", date: "2024-01-08" },
                        ].map((file, index) => (
                          <div key={index} className="flex items-center justify-between border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary" />
                              <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{file.size} • {file.date}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Reviewer Comments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Add a comment..."
                          className="min-h-[100px]"
                        />
                        <Button className="w-full">Add Comment</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Report Progress */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Report Progress</CardTitle>
              </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-end text-sm mb-1">
                        <span className="font-medium">{mockReport.progress}%</span>
                      </div>
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div 
                          className="h-full transition-all bg-gradient-to-r from-blue-500 via-yellow-500 to-green-500"
                          style={{ width: `${mockReport.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs text-center">
                      <div>
                        <div className="w-2 h-2 rounded-full bg-blue-500 mx-auto mb-1"></div>
                        <p className={mockReport.timeline.submitted.completed ? "font-medium" : "text-muted-foreground"}>
                          Submitted
                        </p>
                        {mockReport.timeline.submitted.date && (
                          <p className="text-muted-foreground text-[10px] mt-0.5">
                            {format(new Date(mockReport.timeline.submitted.date), "MMM dd")}
                          </p>
                        )}
                      </div>
                      <div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mx-auto mb-1"></div>
                        <p className={mockReport.timeline.inReview.completed ? "font-medium" : "text-muted-foreground"}>
                          In Review
                        </p>
                        {mockReport.timeline.inReview.date && (
                          <p className="text-muted-foreground text-[10px] mt-0.5">
                            {format(new Date(mockReport.timeline.inReview.date), "MMM dd")}
                          </p>
                        )}
                      </div>
                      <div>
                        <div className="w-2 h-2 rounded-full bg-green-500 mx-auto mb-1"></div>
                        <p className={mockReport.timeline.approved.completed ? "font-medium" : "text-muted-foreground"}>
                          Approved
                        </p>
                        {mockReport.timeline.approved.date ? (
                          <p className="text-muted-foreground text-[10px] mt-0.5">
                            {format(new Date(mockReport.timeline.approved.date), "MMM dd")}
                          </p>
                        ) : (
                          <p className="text-muted-foreground text-[10px] mt-0.5">Pending</p>
                        )}
                      </div>
                      <div>
                        <div className="w-2 h-2 rounded-full bg-purple-500 mx-auto mb-1"></div>
                        <p className={mockReport.timeline.published.completed ? "font-medium" : "text-muted-foreground"}>
                          Published
                        </p>
                        {mockReport.timeline.published.date ? (
                          <p className="text-muted-foreground text-[10px] mt-0.5">
                            {format(new Date(mockReport.timeline.published.date), "MMM dd")}
                          </p>
                        ) : (
                          <p className="text-muted-foreground text-[10px] mt-0.5">Pending</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
            </Card>

            {/* Activity Log */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockActivityLog.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
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
