import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import lokahiLogo from "@/assets/lokahi-logo.png";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary p-1.5">
            <img src={lokahiLogo} alt="Lōkahi Dashboard" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold leading-none">Lōkahi</span>
            <span className="text-xs text-muted-foreground">Dashboard</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/public" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Public Reports
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/api" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            API
          </Link>
          <Link to="/help" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Help
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden md:flex">
            Sign In
          </Button>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <div className="container flex flex-col gap-4 py-4">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/public" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Public Reports
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/api" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              API
            </Link>
            <Link to="/help" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Help
            </Link>
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
