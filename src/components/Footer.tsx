import { Link } from "react-router-dom";
import lokahiFullLogo from "@/assets/lokahi-full-logo.png";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-primary-light/10">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center">
              <img src={lokahiFullLogo} alt="Lōkahi Dashboard" className="h-8" />
            </div>
            <p className="text-sm text-muted-foreground">
              Built by the Hawai'i Office of Enterprise Technology Services.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div></div>
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
