import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-primary-light/10">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-ocean">
                <span className="text-xl font-bold text-primary-foreground">IV</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-none">IV&V Nexus</span>
                <span className="text-xs text-muted-foreground">Hawai'i ETS</span>
              </div>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Enterprise Technology Services<br />
              State of Hawai'i
            </p>
            <p className="text-sm text-muted-foreground">
              Bringing transparency and accountability to Hawaii's IT project oversight through
              standardized IV&V reporting.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About IV&V Nexus
                </Link>
              </li>
              <li>
                <Link to="/public" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Public Reports
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/transparency" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Transparency
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
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
