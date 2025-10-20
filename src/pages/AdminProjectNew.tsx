import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft, DollarSign } from "lucide-react";
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

const AdminProjectNew = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      isActive: true,
      overallProjectStatus: "green",
    },
  });

  const startDate = watch("startDate");
  const plannedEndDate = watch("plannedEndDate");
  const currentProjectedEndDate = watch("currentProjectedEndDate");
  const overallProjectStatus = watch("overallProjectStatus");
  const isActive = watch("isActive");

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    
    // Mock API call - replace with actual backend call later
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Project data to save:", data);
    
    toast.success("New project record created successfully.");
    
    setIsSubmitting(false);
    
    // Redirect to dashboard after save
    setTimeout(() => {
      navigate("/admin/dashboard");
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
              
              <h1 className="text-base font-semibold text-foreground flex-1">
                Add New Project
              </h1>
              
              <Link to="/admin/dashboard">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                    <CardDescription>Enter the details for the new project record</CardDescription>
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
                    <div className="space-y-2">
                      <Label>
                        Overall Project Status <span className="text-destructive">*</span>
                      </Label>
                      <RadioGroup
                        value={overallProjectStatus}
                        onValueChange={(value) => setValue("overallProjectStatus", value as "green" | "yellow" | "red")}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="green" id="status-green" />
                          <Label htmlFor="status-green" className="flex items-center gap-2 font-normal cursor-pointer">
                            <div className="h-3 w-3 rounded-full bg-accent" />
                            On Track
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yellow" id="status-yellow" />
                          <Label htmlFor="status-yellow" className="flex items-center gap-2 font-normal cursor-pointer">
                            <div className="h-3 w-3 rounded-full bg-yellow-500" />
                            At Risk
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="red" id="status-red" />
                          <Label htmlFor="status-red" className="flex items-center gap-2 font-normal cursor-pointer">
                            <div className="h-3 w-3 rounded-full bg-destructive" />
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
                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/dashboard")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-secondary hover:bg-secondary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Project"}
                  </Button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminProjectNew;
