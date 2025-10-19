import { Card } from "@/components/ui/card";
import { Upload, CheckCircle2, Eye } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Vendors Submit Reports",
    description: "Upload standardized IV&V deliverables",
    color: "text-primary",
  },
  {
    icon: CheckCircle2,
    title: "ETS Reviews & Validates",
    description: "Oversee compliance and project health",
    color: "text-secondary",
  },
  {
    icon: Eye,
    title: "Reports Published Publicly",
    description: "Transparency for all",
    color: "text-accent",
  },
];

export const Workflow = () => {
  return (
    <section className="py-16 md:py-20 bg-[hsl(120,20%,97%)]">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            How Lōkahi Works
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full bg-card p-8 shadow-sm transition-all hover:shadow-md animate-fade-in">
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 ${step.color}`}>
                  <step.icon className="h-7 w-7" />
                </div>
                
                <h3 className="text-xl font-semibold text-card-foreground mb-3">{step.title}</h3>
                
                <p className="text-muted-foreground">{step.description}</p>
              </Card>

              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-0.5 w-8 -translate-y-1/2 translate-x-full bg-border md:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
