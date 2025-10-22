import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft, DollarSign, ChevronRight, Trash2 } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const projectFormSchema = z.object({
  projectName: z.string().trim().min(1, "Project name is required").max(200, "Project name must be less than 200 characters"),
  sponsoringAgency: z.string().trim().min(1, "Sponsoring agency is required").max(150, "Agency name must be less than 150 characters"),
  description: z.string().trim().min(1, "Description is required").max(2000, "Description must be less than 2000 characters"),
  originalContractAmount: z.coerce.number().min(0, "Amount must be positive").max(999999999, "Amount too large"),
  totalPaidToDate: z.coerce.number().min(0, "Amount must be positive").max(999999999, "Amount too large"),
  startDate: z.date({ required_error: "Start date is required" }),
  plannedEndDate: z.date({ required_error: "Planned end date is required" }),
  currentProjectedEndDate: z.date({ required_error: "Current projected end date is required" }),
  overallProjectStatus: z.enum(["green", "yellow", "red"], { required_error: "Project status is required" }),
  isActive: z.boolean().default(true),
  ivvVendorName: z.string().trim().max(150, "Vendor name must be less than 150 characters").optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

// Mock data - matches AdminProjects
const mockProjects = [
  {
    id: "1",
    projectName: "Health Connect Modernization",
    sponsoringAgency: "Department of Health",
    ivvVendorName: "Accuity LLP",
    overallProjectStatus: "yellow",
    isActive: true,
    originalContractAmount: 2450000,
    totalPaidToDate: 1592500,
    startDate: "2024-10-01",
    plannedEndDate: "2025-07-31",
    currentProjectedEndDate: "2025-10-15",
    description: "Comprehensive modernization of the state's health information systems to improve patient care coordination, enable real-time data sharing between healthcare providers, and streamline administrative processes. This multi-phase project includes system integration, data migration, and staff training components.",
  },
  {
    id: "2",
    projectName: "Student Information System",
    sponsoringAgency: "Department of Education",
    ivvVendorName: "EduTech Partners",
    overallProjectStatus: "green",
    isActive: true,
    originalContractAmount: 1800000,
    totalPaidToDate: 1200000,
    startDate: "2024-08-15",
    plannedEndDate: "2025-08-15",
    currentProjectedEndDate: "2025-08-15",
    description: "Implementation of a modern student information system to centralize student records, attendance tracking, and academic performance monitoring across all public schools in the state.",
  },
  {
    id: "3",
    projectName: "Fleet Management System",
    sponsoringAgency: "Department of Transportation",
    ivvVendorName: "AutoManage Inc",
    overallProjectStatus: "green",
    isActive: true,
    originalContractAmount: 980000,
    totalPaidToDate: 780000,
    startDate: "2024-07-01",
    plannedEndDate: "2025-06-30",
    currentProjectedEndDate: "2025-06-30",
    description: "Development and deployment of an integrated fleet management platform for tracking vehicle maintenance, fuel consumption, and route optimization across all state-owned vehicles.",
  },
  {
    id: "4",
    projectName: "Digital Tax Portal",
    sponsoringAgency: "Department of Taxation",
    ivvVendorName: "FinTech Solutions",
    overallProjectStatus: "red",
    isActive: true,
    originalContractAmount: 3200000,
    totalPaidToDate: 2100000,
    startDate: "2024-05-01",
    plannedEndDate: "2025-12-31",
    currentProjectedEndDate: "2026-03-15",
    description: "Creation of a secure online portal for tax filing, payment processing, and account management. The system will modernize the state's tax collection infrastructure and improve taxpayer services.",
  },
];

const AdminProjectEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Find project - in real app this would be from backend
  const project = mockProjects.find(p => p.id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: project ? {
      projectName: project.projectName,
      sponsoringAgency: project.sponsoringAgency,
      description: project.description,
      originalContractAmount: project.originalContractAmount,
      totalPaidToDate: project.totalPaidToDate,
      startDate: new Date(project.startDate),
      plannedEndDate: new Date(project.plannedEndDate),
      currentProjectedEndDate: new Date(project.currentProjectedEndDate),
      overallProjectStatus: project.overallProjectStatus as "green" | "yellow" | "red",
      isActive: project.isActive,
      ivvVendorName: project.ivvVendorName || "",
    } : undefined,
  });

  const startDate = watch("startDate");
  const plannedEndDate = watch("plannedEndDate");
  const currentProjectedEndDate = watch("currentProjectedEndDate");
  const overallProjectStatus = watch("overallProjectStatus");
  const isActive = watch("isActive");

  if (!project) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AdminSidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
              <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist.</p>
              <Button onClick={() => navigate("/admin/projects")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    
    // Mock API call - replace with actual backend call later
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Project data to update:", data);
    
    toast.success("Project updated successfully.");
    
    setIsSubmitting(false);
    
    // Redirect to project detail after save
    setTimeout(() => {
      navigate(`/admin/project/${id}`);
    }, 1500);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    
    // Mock API call - replace with actual backend call later
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Deleting project:", id);
    
    toast.success("Project deleted successfully.");
    
    setIsDeleting(false);
    
    // Redirect to projects list after delete
    setTimeout(() => {
      navigate("/admin/projects");
    }, 1500);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-16 items-center px-8 gap-4">
              <SidebarTrigger />
              
              <div className="flex-1">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/admin/projects">Projects</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={`/admin/project/${id}`}>{project.projectName}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <Button variant="outline" onClick={() => navigate(`/admin/project/${id}`)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Project Details
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle>Edit Project</CardTitle>
                    <CardDescription>Update or correct project details. Changes are tracked for audit.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Project Name */}
                    <div className="space-y-2">
                      <Label htmlFor="projectName">
                        Project Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="projectName"
                        placeholder="Enter project name"
                        {...register("projectName")}
                        className={errors.projectName ? "border-destructive" : ""}
                      />
                      {errors.projectName && (
                        <p className="text-sm text-destructive">{errors.projectName.message}</p>
                      )}
                    </div>

                    {/* Sponsoring Agency */}
                    <div className="space-y-2">
                      <Label htmlFor="sponsoringAgency">
                        Sponsoring Agency <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="sponsoringAgency"
                        placeholder="e.g., Department of Health"
                        {...register("sponsoringAgency")}
                        className={errors.sponsoringAgency ? "border-destructive" : ""}
                      />
                      {errors.sponsoringAgency && (
                        <p className="text-sm text-destructive">{errors.sponsoringAgency.message}</p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Description <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the project scope, objectives, and key details"
                        rows={4}
                        {...register("description")}
                        className={errors.description ? "border-destructive" : ""}
                      />
                      {errors.description && (
                        <p className="text-sm text-destructive">{errors.description.message}</p>
                      )}
                    </div>

                    {/* Financial Information */}
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="originalContractAmount">
                          Original Contract Amount <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="originalContractAmount"
                            type="number"
                            placeholder="0"
                            step="0.01"
                            className={cn("pl-9", errors.originalContractAmount && "border-destructive")}
                            {...register("originalContractAmount")}
                          />
                        </div>
                        {errors.originalContractAmount && (
                          <p className="text-sm text-destructive">{errors.originalContractAmount.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="totalPaidToDate">
                          Total Paid To Date <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="totalPaidToDate"
                            type="number"
                            placeholder="0"
                            step="0.01"
                            className={cn("pl-9", errors.totalPaidToDate && "border-destructive")}
                            {...register("totalPaidToDate")}
                          />
                        </div>
                        {errors.totalPaidToDate && (
                          <p className="text-sm text-destructive">{errors.totalPaidToDate.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>
                          Start Date <span className="text-destructive">*</span>
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !startDate && "text-muted-foreground",
                                errors.startDate && "border-destructive"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? format(startDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={(date) => setValue("startDate", date as Date)}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.startDate && (
                          <p className="text-sm text-destructive">{errors.startDate.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>
                          Planned End Date <span className="text-destructive">*</span>
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !plannedEndDate && "text-muted-foreground",
                                errors.plannedEndDate && "border-destructive"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {plannedEndDate ? format(plannedEndDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={plannedEndDate}
                              onSelect={(date) => setValue("plannedEndDate", date as Date)}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.plannedEndDate && (
                          <p className="text-sm text-destructive">{errors.plannedEndDate.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>
                          Current Projected End Date <span className="text-destructive">*</span>
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !currentProjectedEndDate && "text-muted-foreground",
                                errors.currentProjectedEndDate && "border-destructive"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {currentProjectedEndDate ? format(currentProjectedEndDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={currentProjectedEndDate}
                              onSelect={(date) => setValue("currentProjectedEndDate", date as Date)}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.currentProjectedEndDate && (
                          <p className="text-sm text-destructive">{errors.currentProjectedEndDate.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Overall Project Status */}
                    <div className="space-y-3">
                      <Label>
                        Overall Project Status <span className="text-destructive">*</span>
                      </Label>
                      <RadioGroup
                        value={overallProjectStatus}
                        onValueChange={(value) => setValue("overallProjectStatus", value as "green" | "yellow" | "red")}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="green" id="status-green" />
                          <Label htmlFor="status-green" className="flex items-center gap-2 font-normal cursor-pointer">
                            <div className="h-3 w-3 rounded-full bg-green-500" />
                            On Track
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="yellow" id="status-yellow" />
                          <Label htmlFor="status-yellow" className="flex items-center gap-2 font-normal cursor-pointer">
                            <div className="h-3 w-3 rounded-full bg-yellow-500" />
                            At Risk
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="red" id="status-red" />
                          <Label htmlFor="status-red" className="flex items-center gap-2 font-normal cursor-pointer">
                            <div className="h-3 w-3 rounded-full bg-red-500" />
                            Critical
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors.overallProjectStatus && (
                        <p className="text-sm text-destructive">{errors.overallProjectStatus.message}</p>
                      )}
                    </div>

                    {/* Active Project Toggle */}
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label htmlFor="isActive" className="text-base cursor-pointer">
                          Active Project
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Enable this to mark the project as currently active
                        </p>
                      </div>
                      <Switch
                        id="isActive"
                        checked={isActive}
                        onCheckedChange={(checked) => setValue("isActive", checked)}
                      />
                    </div>

                    {/* IV&V Vendor Name */}
                    <div className="space-y-2">
                      <Label htmlFor="ivvVendorName">
                        IV&V Vendor Name <span className="text-muted-foreground">(Optional)</span>
                      </Label>
                      <Input
                        id="ivvVendorName"
                        placeholder="e.g., TechCorp Solutions"
                        {...register("ivvVendorName")}
                        className={errors.ivvVendorName ? "border-destructive" : ""}
                      />
                      {errors.ivvVendorName && (
                        <p className="text-sm text-destructive">{errors.ivvVendorName.message}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex justify-between items-center mt-6">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="text-destructive border-destructive hover:bg-destructive/10"
                        disabled={isSubmitting || isDeleting}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Project
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the project "{project.projectName}". This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          {isDeleting ? "Deleting..." : "Delete Project"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate(`/admin/project/${id}`)}
                      disabled={isSubmitting || isDeleting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-secondary hover:bg-secondary/90"
                      disabled={isSubmitting || isDeleting}
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminProjectEdit;
