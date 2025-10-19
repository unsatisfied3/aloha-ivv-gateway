import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Users, Building2, Search } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 opacity-10">
        <img
          src={heroImage}
          alt="Hawaiian coastal landscape with modern government buildings"
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="container relative py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl animate-fade-in">
            Hawai'i's platform for managing and reviewing public IT projects
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground md:text-xl animate-slide-up">
            Lōkahi Dashboard simplifies how Hawai'i's state IT projects are tracked, reviewed, and shared publicly — bringing everything into one connected system.
          </p>

          {/* Search Bar */}
          <div className="mb-8 animate-slide-up">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search health, education, or technology projects..."
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg">
                <FileText className="mr-2 h-5 w-5" />
                Search Reports
              </Button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Users className="mr-2 h-5 w-5" />
              Vendor Portal
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Building2 className="mr-2 h-5 w-5" />
              ETS Employee Panel
            </Button>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
