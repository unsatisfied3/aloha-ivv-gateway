import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, FileCode, Shield, Mail } from "lucide-react";

export default function PublicApiInfo() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-ocean py-8 px-4">
          <div className="container max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Open Data API
            </h1>
            <p className="text-lg text-white/90 mb-2">
              Access verified IV&V project data directly for analysis and research.
            </p>
            <p className="text-sm text-white/80 max-w-3xl">
              Lōkahi Dashboard provides REST‑based endpoints for approved reports, projects, and agencies. 
              These APIs are public, standardized, and free to use.
            </p>
          </div>
        </section>

        <div className="container max-w-4xl py-6 px-4 space-y-6">
          {/* Section 1 - Quick Overview */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3 border-l-4 border-primary pl-4">
              Quick Overview
            </h2>
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-2">
                    <Database className="h-10 w-10 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground mb-1 text-sm">Available Datasets</h3>
                    <p className="text-xs text-muted-foreground">
                      Projects • Reports • Findings
                    </p>
                    <p className="text-xs text-muted-foreground">
                      (public‑safe fields only)
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-2">
                    <FileCode className="h-10 w-10 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground mb-1 text-sm">Format</h3>
                    <p className="text-xs text-muted-foreground">
                      JSON (REST API endpoints)
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-2">
                    <Shield className="h-10 w-10 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground mb-1 text-sm">Status</h3>
                    <Badge variant="secondary" className="mt-1">Coming Soon</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 - Example Endpoint */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-2xl font-bold text-foreground border-l-4 border-primary pl-4">
                Example Endpoint
              </h2>
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-base">GET /api/v1/reports</CardTitle>
                <CardDescription className="text-xs">Retrieve approved IV&V reports with public data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-3 overflow-x-auto">
                  <pre className="text-xs font-mono text-foreground">
{`{
  "projectName": "Health Connect Modernization",
  "reportingPeriod": "April 2025",
  "overallRating": "yellow",
  "ivvVendorName": "Accuity LLP"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 3 - Usage Guidelines */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3 border-l-4 border-primary pl-4">
              Usage Guidelines
            </h2>
            <Card>
              <CardContent className="pt-4 pb-4 space-y-2">
                <div className="flex gap-2">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                  <p className="text-sm text-muted-foreground">
                    Access limited to approved data under Hawai'i's transparency framework.
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                  <p className="text-sm text-muted-foreground">
                    ETS retains source ownership; all data released read‑only for public consumption.
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Learn more about the state's commitment to transparency:
                    </p>
                    <Button variant="link" className="p-0 h-auto text-primary text-sm" asChild>
                      <a 
                        href="https://opendata.hawaii.gov" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Read the State of Hawai'i Open Data Policy →
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 - Contact */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3 border-l-4 border-primary pl-4">
              Contact & Updates
            </h2>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-4 pb-4">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-foreground font-medium mb-1 text-sm">
                      Interested in integrating Lōkahi data?
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Contact ETS at{" "}
                      <a 
                        href="mailto:ets@hawaii.gov" 
                        className="text-primary hover:underline font-medium"
                      >
                        ets@hawaii.gov
                      </a>
                    </p>
                  </div>
                  <Button variant="default" asChild>
                    <a href="mailto:ets@hawaii.gov">Contact ETS</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
