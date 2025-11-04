import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { VendorSidebar } from "@/components/VendorSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Send, Plus, Trash2, Clock, DollarSign } from "lucide-react";

const reportSchema = z.object({
  projectId: z.string().min(1, "Please select a project"),
  reportingMonth: z.string().min(1, "Month is required"),
  reportingYear: z.string().min(1, "Year is required"),
  executiveSummary: z.string().min(10, "Executive summary must be at least 10 characters").max(5000, "Executive summary must be less than 5000 characters"),
  overallRating: z.enum(["green", "yellow", "red"], { required_error: "Please select an overall rating" }),
  keyAchievements: z.string().optional(),
  keyChallenges: z.string().optional(),
  scheduleVarianceAnalysis: z.string().optional(),
  budgetVarianceAnalysis: z.string().optional(),
  peopleRating: z.enum(["green", "yellow", "red"]).optional(),
  processRating: z.enum(["green", "yellow", "red"]).optional(),
  technologyRating: z.enum(["green", "yellow", "red"]).optional(),
});

const findingSchema = z.object({
  findingNumber: z.string().min(1, "Finding number is required"),
  findingType: z.enum(["risk", "issue"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  impactRating: z.number().min(1).max(3),
  likelihoodRating: z.number().min(1).max(3),
  vendorRecommendation: z.string().optional(),
  currentStatus: z.enum(["open", "in-progress", "closed"]),
});

type ReportFormData = z.infer<typeof reportSchema>;
type FindingFormData = z.infer<typeof findingSchema>;

interface Finding extends FindingFormData {
  calculatedRiskRating: number;
}

const mockProjects = [
  { id: "1", name: "DOH Health Connect Upgrade" },
  { id: "2", name: "Student Information System" },
  { id: "3", name: "Fleet Management System" },
];

const months = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const years = [
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];

const VendorReportForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [findings, setFindings] = useState<Finding[]>([]);
  const [findingDialogOpen, setFindingDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("project");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [currentFinding, setCurrentFinding] = useState<FindingFormData>({
    findingNumber: "",
    findingType: "issue",
    description: "",
    impactRating: 1,
    likelihoodRating: 1,
    vendorRecommendation: "",
    currentStatus: "open",
  });

  const sections = [
    { id: "period", label: "Project & Period" },
    { id: "summary", label: "Summary" },
    { id: "highlights", label: "Highlights" },
    { id: "variance", label: "Variance" },
    { id: "findings", label: "Findings" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      overallRating: undefined,
      reportingMonth: "",
      reportingYear: "",
      projectId: "",
    },
  });

  useEffect(() => {
    setHasUnsavedChanges(isDirty || findings.length > 0);
  }, [isDirty, findings]);

  const executiveSummary = watch("executiveSummary") || "";
  const overallRating = watch("overallRating");

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "green":
        return "bg-accent/20 text-accent border-accent hover:bg-accent/30";
      case "yellow":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500 hover:bg-yellow-500/30 dark:text-yellow-400";
      case "red":
        return "bg-destructive/20 text-destructive border-destructive hover:bg-destructive/30";
      default:
        return "bg-muted text-muted-foreground border-border hover:bg-muted/80";
    }
  };

  const getRatingLabel = (rating: string) => {
    switch (rating) {
      case "green":
        return "On Track";
      case "yellow":
        return "Minor Issues";
      case "red":
        return "Critical";
      default:
        return "";
    }
  };

  const handleAddFinding = () => {
    const calculatedRiskRating = currentFinding.impactRating * currentFinding.likelihoodRating;
    setFindings([...findings, { ...currentFinding, calculatedRiskRating }]);
    setFindingDialogOpen(false);
    setCurrentFinding({
      findingNumber: "",
      findingType: "issue",
      description: "",
      impactRating: 1,
      likelihoodRating: 1,
      vendorRecommendation: "",
      currentStatus: "open",
    });
    toast.success("Finding added successfully");
  };

  const handleRemoveFinding = (index: number) => {
    setFindings(findings.filter((_, i) => i !== index));
    toast.success("Finding removed");
  };

  const onSaveDraft = (data: ReportFormData) => {
    console.log("Saving draft:", { ...data, reportStatus: "draft", findings });
    setHasUnsavedChanges(false);
    toast.success("Report saved as draft");
    navigate("/vendor/dashboard");
  };

  const onSubmitReport = (data: ReportFormData) => {
    console.log("Submitting report:", { ...data, reportStatus: "submitted", findings });
    setHasUnsavedChanges(false);
    toast.success("Report submitted for review");
    navigate("/vendor/dashboard");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />

        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-16 items-center px-8 gap-4">
              <SidebarTrigger />
              <h1 className="text-base font-semibold text-foreground flex-1">
                {id ? "Edit Monthly Report" : "Submit Monthly Report"}
              </h1>
            </div>
          </header>

          <main className="flex-1 p-8 bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-8">
                {/* Main Content */}
                <div className="flex-1 max-w-4xl space-y-6">

                  {/* Project Selection & Reporting Period */}
                  <Card id="period" className="bg-background scroll-mt-24">
                    <CardHeader>
                      <CardTitle>Project & Reporting Period</CardTitle>
                      <CardDescription>Select the project, reporting period, and overall rating</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2 md:col-span-1">
                          <Label htmlFor="project">Project</Label>
                          <Select onValueChange={(value) => setValue("projectId", value)}>
                            <SelectTrigger id="project">
                              <SelectValue placeholder="Select project" />
                            </SelectTrigger>
                            <SelectContent className="bg-background">
                              {mockProjects.map((project) => (
                                <SelectItem key={project.id} value={project.id}>
                                  {project.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.projectId && (
                            <p className="text-sm text-destructive">{errors.projectId.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="month">Month</Label>
                          <Select onValueChange={(value) => setValue("reportingMonth", value)}>
                            <SelectTrigger id="month">
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent className="bg-background">
                              {months.map((month) => (
                                <SelectItem key={month.value} value={month.value}>
                                  {month.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.reportingMonth && (
                            <p className="text-sm text-destructive">{errors.reportingMonth.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="year">Year</Label>
                          <Select onValueChange={(value) => setValue("reportingYear", value)}>
                            <SelectTrigger id="year">
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent className="bg-background">
                              {years.map((year) => (
                                <SelectItem key={year.value} value={year.value}>
                                  {year.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.reportingYear && (
                            <p className="text-sm text-destructive">{errors.reportingYear.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Overall Project Rating</Label>
                        <div className="flex gap-2">
                          {["green", "yellow", "red"].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => setValue("overallRating", rating as "green" | "yellow" | "red")}
                              className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                                overallRating === rating
                                  ? getRatingColor(rating)
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <div className="flex items-center justify-center gap-1.5">
                                <div
                                  className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                    rating === "green"
                                      ? "bg-accent"
                                      : rating === "yellow"
                                      ? "bg-yellow-500"
                                      : "bg-destructive"
                                  }`}
                                />
                                <p className="font-medium text-xs">{getRatingLabel(rating)}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                        {errors.overallRating && (
                          <p className="text-sm text-destructive mt-2">{errors.overallRating.message}</p>
                        )}
                      </div>

                      <div className="space-y-4 pt-6 border-t">
                        <div>
                          <Label className="text-base">Detailed Ratings</Label>
                        </div>

                        {/* Team Performance Rating */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Team Performance</Label>
                            {watch("peopleRating") && (
                              <span className="text-accent text-sm">✓</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Evaluate staffing, communication, and skill adequacy
                          </p>
                          <div className="flex gap-2">
                            {["green", "yellow", "red"].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() => setValue("peopleRating", rating as "green" | "yellow" | "red")}
                                className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                                  watch("peopleRating") === rating
                                    ? getRatingColor(rating)
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <div className="flex items-center justify-center gap-1.5">
                                  <div
                                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                      rating === "green"
                                        ? "bg-accent"
                                        : rating === "yellow"
                                        ? "bg-yellow-500"
                                        : "bg-destructive"
                                    }`}
                                  />
                                  <p className="font-medium text-xs">{getRatingLabel(rating)}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Project Management Rating */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Project Management</Label>
                            {watch("processRating") && (
                              <span className="text-accent text-sm">✓</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Assess organization, communication, and schedule control
                          </p>
                          <div className="flex gap-2">
                            {["green", "yellow", "red"].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() => setValue("processRating", rating as "green" | "yellow" | "red")}
                                className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                                  watch("processRating") === rating
                                    ? getRatingColor(rating)
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <div className="flex items-center justify-center gap-1.5">
                                  <div
                                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                      rating === "green"
                                        ? "bg-accent"
                                        : rating === "yellow"
                                        ? "bg-yellow-500"
                                        : "bg-destructive"
                                    }`}
                                  />
                                  <p className="font-medium text-xs">{getRatingLabel(rating)}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Technical Readiness Rating */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Technical Readiness</Label>
                            {watch("technologyRating") && (
                              <span className="text-accent text-sm">✓</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Assess system stability, implementation readiness, and architecture
                          </p>
                          <div className="flex gap-2">
                            {["green", "yellow", "red"].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() => setValue("technologyRating", rating as "green" | "yellow" | "red")}
                                className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                                  watch("technologyRating") === rating
                                    ? getRatingColor(rating)
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <div className="flex items-center justify-center gap-1.5">
                                  <div
                                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                      rating === "green"
                                        ? "bg-accent"
                                        : rating === "yellow"
                                        ? "bg-yellow-500"
                                        : "bg-destructive"
                                    }`}
                                  />
                                  <p className="font-medium text-xs">{getRatingLabel(rating)}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Executive Summary */}
                  <Card id="summary" className="bg-background scroll-mt-24">
                    <CardHeader>
                      <CardTitle>Executive Summary</CardTitle>
                      <CardDescription>
                        Provide a comprehensive summary of the month's activities (max 5,000 characters)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Textarea
                          {...register("executiveSummary")}
                          placeholder="Provide a comprehensive summary of the month's activities, key accomplishments, challenges, and overall project status..."
                          className="min-h-[300px]"
                        />
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            {executiveSummary.length} / 5,000 characters
                          </span>
                          {errors.executiveSummary && (
                            <p className="text-destructive">{errors.executiveSummary.message}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Highlights */}
                  <Card id="highlights" className="bg-background scroll-mt-24">
                    <CardHeader>
                      <CardTitle>Key Highlights</CardTitle>
                      <CardDescription>Document achievements and challenges</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Key Achievements</Label>
                          <Textarea
                            {...register("keyAchievements")}
                            placeholder="• Achievement 1&#10;• Achievement 2&#10;• Achievement 3"
                            className="min-h-[200px]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Key Challenges</Label>
                          <Textarea
                            {...register("keyChallenges")}
                            placeholder="• Challenge 1&#10;• Challenge 2&#10;• Challenge 3"
                            className="min-h-[200px]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Variance Analysis */}
                  <Card id="variance" className="bg-background scroll-mt-24">
                    <CardHeader>
                      <CardTitle>Variance Analysis</CardTitle>
                      <CardDescription>Explain any schedule or budget differences this period.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <Textarea
                          {...register("scheduleVarianceAnalysis")}
                          placeholder="📅 Schedule Variance&#10;&#10;Describe schedule changes, reasons, and mitigation (e.g., testing delays, resource gaps)."
                          className="min-h-[150px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <Textarea
                          {...register("budgetVarianceAnalysis")}
                          placeholder="💰 Budget Variance&#10;&#10;Describe budget deviations (e.g., spending 10% ahead due to change request #34)."
                          className="min-h-[150px]"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Findings */}
                  <Card id="findings" className="bg-background scroll-mt-24">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Report Findings</CardTitle>
                          <CardDescription>Add risks and issues identified this month</CardDescription>
                        </div>
                        <Dialog open={findingDialogOpen} onOpenChange={setFindingDialogOpen}>
                          <DialogTrigger asChild>
                            <Button className="gap-2">
                              <Plus className="h-4 w-4" />
                              Add Finding
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-background max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Add New Finding</DialogTitle>
                              <DialogDescription>
                                Document a risk or issue identified during this reporting period
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="findingNumber">Finding Number</Label>
                                  <Input
                                    id="findingNumber"
                                    value={currentFinding.findingNumber}
                                    onChange={(e) =>
                                      setCurrentFinding({ ...currentFinding, findingNumber: e.target.value })
                                    }
                                    placeholder="F-001"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="findingType">Type</Label>
                                  <Select
                                    value={currentFinding.findingType}
                                    onValueChange={(value: "risk" | "issue") =>
                                      setCurrentFinding({ ...currentFinding, findingType: value })
                                    }
                                  >
                                    <SelectTrigger id="findingType">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-background">
                                      <SelectItem value="risk">Risk</SelectItem>
                                      <SelectItem value="issue">Issue</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                  id="description"
                                  value={currentFinding.description}
                                  onChange={(e) =>
                                    setCurrentFinding({ ...currentFinding, description: e.target.value })
                                  }
                                  placeholder="Describe the finding in detail..."
                                  className="min-h-[100px]"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="impact">Impact (1-3)</Label>
                                  <Select
                                    value={currentFinding.impactRating.toString()}
                                    onValueChange={(value) =>
                                      setCurrentFinding({
                                        ...currentFinding,
                                        impactRating: parseInt(value),
                                      })
                                    }
                                  >
                                    <SelectTrigger id="impact">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-background">
                                      <SelectItem value="1">1 - Low</SelectItem>
                                      <SelectItem value="2">2 - Medium</SelectItem>
                                      <SelectItem value="3">3 - High</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="likelihood">Likelihood (1-3)</Label>
                                  <Select
                                    value={currentFinding.likelihoodRating.toString()}
                                    onValueChange={(value) =>
                                      setCurrentFinding({
                                        ...currentFinding,
                                        likelihoodRating: parseInt(value),
                                      })
                                    }
                                  >
                                    <SelectTrigger id="likelihood">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-background">
                                      <SelectItem value="1">1 - Low</SelectItem>
                                      <SelectItem value="2">2 - Medium</SelectItem>
                                      <SelectItem value="3">3 - High</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="p-3 bg-muted rounded-lg">
                                <p className="text-sm">
                                  <span className="font-medium">Calculated Risk Rating:</span>{" "}
                                  {currentFinding.impactRating * currentFinding.likelihoodRating}
                                </p>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="recommendation">Vendor Recommendation</Label>
                                <Textarea
                                  id="recommendation"
                                  value={currentFinding.vendorRecommendation}
                                  onChange={(e) =>
                                    setCurrentFinding({
                                      ...currentFinding,
                                      vendorRecommendation: e.target.value,
                                    })
                                  }
                                  placeholder="Recommended actions or mitigation strategies..."
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="status">Current Status</Label>
                                <Select
                                  value={currentFinding.currentStatus}
                                  onValueChange={(value: "open" | "in-progress" | "closed") =>
                                    setCurrentFinding({ ...currentFinding, currentStatus: value })
                                  }
                                >
                                  <SelectTrigger id="status">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-background">
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="button" variant="outline" onClick={() => setFindingDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button type="button" onClick={handleAddFinding}>
                                Add Finding
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {findings.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <p>No findings added yet.</p>
                          <p className="text-sm">Click "Add Finding" to document risks and issues.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {findings.map((finding, index) => (
                            <Card key={index} className="bg-muted/30">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge variant="outline">{finding.findingNumber}</Badge>
                                      <Badge
                                        variant="outline"
                                        className={
                                          finding.findingType === "risk"
                                            ? "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
                                            : "bg-destructive/20 text-destructive border-destructive/30"
                                        }
                                      >
                                        {finding.findingType}
                                      </Badge>
                                      <Badge variant="outline">Risk: {finding.calculatedRiskRating}</Badge>
                                      <Badge variant="outline" className="capitalize">
                                        {finding.currentStatus.replace("-", " ")}
                                      </Badge>
                                    </div>
                                    <p className="text-sm font-medium mb-1">{finding.description}</p>
                                    {finding.vendorRecommendation && (
                                      <p className="text-sm text-muted-foreground">
                                        Recommendation: {finding.vendorRecommendation}
                                      </p>
                                    )}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveFinding(index)}
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <Card className="bg-background">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (hasUnsavedChanges) {
                              if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
                                navigate("/vendor/dashboard");
                              }
                            } else {
                              navigate("/vendor/dashboard");
                            }
                          }}
                        >
                          Cancel
                        </Button>
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleSubmit(onSaveDraft)}
                          >
                            Save Draft
                          </Button>
                          <Button type="button" onClick={handleSubmit(onSubmitReport)}>
                            Submit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sticky Side Navigation - Right */}
                <nav className="hidden lg:block w-48 flex-shrink-0">
                  <div className="sticky top-24 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-3 px-3">
                        SECTIONS
                      </p>
                      <div className="space-y-1">
                        {sections.map((section) => (
                          <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={cn(
                              "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                              activeSection === section.id
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {section.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleSubmit(onSaveDraft)}
                          className="flex-1"
                          size="sm"
                        >
                          Save Draft
                        </Button>
                        <Button
                          type="button"
                          onClick={handleSubmit(onSubmitReport)}
                          className="flex-1"
                          size="sm"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default VendorReportForm;
