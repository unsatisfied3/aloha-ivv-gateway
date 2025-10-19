import { Link } from "react-router-dom";
import lokahiLogo from "@/assets/lokahi-logo.png";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-primary-light/10">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary p-1.5">
                <img src={lokahiLogo} alt="Lōkahi Dashboard" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold leading-none">Lōkahi</span>
                <span className="text-xs text-muted-foreground">Dashboard</span>
              </div>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Enterprise Technology Services<br />
              State of Hawai'i
            </p>
            <p className="text-sm text-muted-foreground">
              Built with aloha, powered by data integrity. Together for transparency in Hawai'i's IT project oversight.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Lōkahi Dashboard
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
