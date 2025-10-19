import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import lokahiFullLogo from "@/assets/lokahi-full-logo.png";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <img src={lokahiFullLogo} alt="Lōkahi Dashboard" className="h-8" />
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
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="h-10 w-64 pl-9"
            />
          </div>
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
