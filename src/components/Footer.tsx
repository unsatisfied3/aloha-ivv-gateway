import { Link } from "react-router-dom";
import lokahiFullLogo from "@/assets/lokahi-full-logo.png";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-primary-light/10">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center">
              <img src={lokahiFullLogo} alt="Lōkahi Dashboard" className="h-8" />
            </div>
            <p className="text-sm text-muted-foreground">
              Built by the Hawai'i Office of Enterprise Technology Services.
            </p>
          </div>

          <div className="md:col-span-2">
            <nav className="flex flex-wrap gap-6 justify-end" aria-label="Footer navigation">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/accessibility" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Accessibility
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} State of Hawai'i - Enterprise Technology Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
