import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const SearchPreview = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-[hsl(120,20%,97%)]">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Explore Published Reports
            </h2>
            <p className="text-lg text-muted-foreground">
              Browse or search published IV&V reports across agencies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-lg shadow-elegant border border-border/50 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search health, education, or technology projects..."
                className="h-14 pl-12 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button 
              size="lg" 
              className="h-14 px-8 bg-[hsl(178,100%,24%)] hover:bg-[hsl(178,100%,20%)] text-white whitespace-nowrap"
              onClick={() => window.location.href = '/public/catalog'}
            >
              Search Reports
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
