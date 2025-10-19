import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Users, Building2, Search } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[500px] md:min-h-[550px] flex items-center overflow-hidden py-12 md:py-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Hawaiian coastal landscape representing government transparency"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background"></div>
      </div>
      
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Headline */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl animate-fade-in">
            Discover Hawai'i's public IT projects
          </h1>
          
          {/* Subheadline */}
          <p className="mb-10 text-lg text-muted-foreground md:text-xl animate-fade-in">
            Search, review, and explore state technology projects in one place.
          </p>

          {/* Search Bar - Primary Focus */}
          <div className="mb-8 animate-slide-up">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-lg shadow-elegant border border-border/50">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search health, education, or technology projects..."
                  className="h-14 pl-12 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button size="lg" className="h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground whitespace-nowrap">
                <FileText className="mr-2 h-5 w-5" />
                Search Reports
              </Button>
            </div>
          </div>

          {/* Portal Shortcuts */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up">
            <Button size="default" variant="outline" className="w-full sm:w-auto bg-background/50 backdrop-blur-sm border-border/50">
              <Users className="mr-2 h-4 w-4" />
              Vendor Portal
            </Button>
            <Button size="default" variant="outline" className="w-full sm:w-auto bg-background/50 backdrop-blur-sm border-border/50">
              <Building2 className="mr-2 h-4 w-4" />
              ETS Employee Panel
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
