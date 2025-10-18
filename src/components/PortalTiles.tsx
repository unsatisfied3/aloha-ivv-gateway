import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Shield, Globe } from "lucide-react";

const portals = [
  {
    icon: Upload,
    title: "Vendor Portal",
    description: "Submit and track IV&V reports with automated validation and progress monitoring",
    route: "/vendor/dashboard",
    color: "bg-primary",
  },
  {
    icon: Shield,
    title: "ETS Employee Panel",
    description: "Review incoming reports, validate compliance, and publish approved deliverables",
    route: "/admin/dashboard",
    color: "bg-secondary",
  },
  {
    icon: Globe,
    title: "Explore Public Reports",
    description: "View approved reports and project data for complete transparency and oversight",
    route: "/public/catalog",
    color: "bg-accent",
  },
];

export const PortalTiles = () => {
  return (
    <section className="bg-gradient-hero py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Access Your Portal
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose your entry point based on your role
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {portals.map((portal, index) => (
            <Card
              key={index}
              className="group overflow-hidden bg-card shadow-medium transition-all hover:shadow-large hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-8">
                <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl ${portal.color} text-white transition-transform group-hover:scale-110`}>
                  <portal.icon className="h-8 w-8" />
                </div>
                
                <h3 className="mb-3 text-2xl font-bold text-card-foreground">
                  {portal.title}
                </h3>
                
                <p className="mb-6 text-muted-foreground">
                  {portal.description}
                </p>

                <Button className="w-full" variant="outline">
                  Enter Portal
                </Button>
              </div>
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 -z-10 bg-gradient-ocean opacity-0 transition-opacity group-hover:opacity-5"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
