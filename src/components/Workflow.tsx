import { Card } from "@/components/ui/card";
import { Upload, CheckCircle2, Eye } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Vendors Submit Reports",
    description: "Digitally submit IV&V deliverables with built-in standardization",
    color: "text-primary",
  },
  {
    icon: CheckCircle2,
    title: "ETS Reviews & Validates",
    description: "Assess quality, compliance, and project health",
    color: "text-secondary",
  },
  {
    icon: Eye,
    title: "Reports Published Publicly",
    description: "Browse validated reports for transparency and oversight",
    color: "text-accent",
  },
];

export const Workflow = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            How Lōkahi Works
          </h2>
          <p className="text-lg text-muted-foreground">
            A simple three-step process for transparent project oversight
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full bg-gradient-card p-8 shadow-soft transition-all hover:shadow-medium animate-fade-in">
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 ${step.color}`}>
                  <step.icon className="h-7 w-7" />
                </div>
                
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-card-foreground">{step.title}</h3>
                </div>
                
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
