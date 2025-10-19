import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, LogIn, Search } from "lucide-react";
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
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-primary md:text-6xl animate-fade-in">
            Hawai'i's dashboard for public IT projects
          </h1>
          
          {/* Subheadline */}
          <p className="mb-10 text-xl text-foreground/80 leading-relaxed animate-fade-in">
            Lōkahi Dashboard helps agencies and vendors manage, review, and publish technology project reports — all in one connected system.
          </p>

          {/* Search Bar - Primary Focus */}
          <div className="mb-6 animate-slide-up">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-lg shadow-soft border border-border/50">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search health, education, or technology projects…"
                  className="h-14 pl-12 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button size="lg" className="h-14 px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground whitespace-nowrap">
                <FileText className="mr-2 h-5 w-5" />
                Search Reports
              </Button>
            </div>
          </div>

          {/* Single Access Button */}
          <div className="flex items-center justify-center animate-slide-up">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 px-8"
              title="Vendors and ETS employees sign in here"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Access Dashboard
            </Button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Vendors and ETS employees sign in here
          </p>
        </div>
      </div>
    </section>
  );
};
