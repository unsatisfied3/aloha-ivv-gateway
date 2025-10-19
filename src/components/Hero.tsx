import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[500px] md:min-h-[550px] flex items-center overflow-hidden py-4 md:py-6">
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
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-[hsl(197,100%,25%)] md:text-5xl lg:text-6xl animate-fade-in max-w-[700px] mx-auto">
            One place to review and publish projects.
          </h1>
          
          {/* Subheadline */}
          <p className="mb-10 text-lg text-muted-foreground md:text-xl animate-fade-in">
            Ditch the endless PDFs and review and track reports in real time.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up">
            <Button 
              size="lg" 
              className="w-full sm:w-auto h-12 px-8 bg-[hsl(178,100%,24%)] hover:bg-[hsl(178,100%,20%)] text-white"
              onClick={() => window.location.href = '/login'}
            >
              Access Dashboard
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto h-12 px-8 border-[hsl(178,100%,24%)] text-[hsl(178,100%,24%)] hover:bg-[hsl(178,100%,24%)]/10"
              onClick={() => window.location.href = '/register'}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
