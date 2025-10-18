import { Card } from "@/components/ui/card";
import { FileCheck, Search, Settings, Smartphone, Link2 } from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "Standardized Reporting",
    description: "Consistent formatting across all agencies ensures clarity and comparability",
  },
  {
    icon: Search,
    title: "Public Transparency",
    description: "Every approved report is searchable and shareable with the community",
  },
  {
    icon: Settings,
    title: "Smart Validation",
    description: "Automated compliance checker before submission saves time and errors",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Designed for phones and tablets from the start for accessibility",
  },
  {
    icon: Link2,
    title: "Open Data API",
    description: "Watchdog agencies can integrate external tools for deeper analysis",
  },
];

export const Features = () => {
  return (
    <section className="bg-primary-light/20 py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Key Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for transparency, efficiency, and public trust
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-card p-6 shadow-soft transition-all hover:shadow-medium hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-ocean text-primary-foreground transition-transform group-hover:scale-110">
                <feature.icon className="h-6 w-6" />
              </div>
              
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
