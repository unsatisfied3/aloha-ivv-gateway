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
        <section className="bg-gradient-ocean py-16 px-4">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Open Data API
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Access verified IV&V project data directly for analysis and research.
            </p>
            <p className="text-lg text-white/80 max-w-3xl">
              Lōkahi Dashboard provides REST‑based endpoints for approved reports, projects, and agencies. 
              These APIs are public, standardized, and free to use.
            </p>
          </div>
        </section>

        <div className="container max-w-4xl py-12 px-4 space-y-12">
          {/* Section 1 - Quick Overview */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6 border-l-4 border-primary pl-4">
              Quick Overview
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <Database className="h-12 w-12 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Available Datasets</h3>
                    <p className="text-sm text-muted-foreground">
                      Projects • Reports • Findings
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      (public‑safe fields only)
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <FileCode className="h-12 w-12 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Format</h3>
                    <p className="text-sm text-muted-foreground">
                      JSON (REST API endpoints)
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4">
                    <Shield className="h-12 w-12 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Status</h3>
                    <Badge variant="secondary" className="mt-2">Coming Soon</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 - Example Endpoint */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-foreground border-l-4 border-primary pl-4">
                Example Endpoint
              </h2>
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-lg">GET /api/v1/reports</CardTitle>
                <CardDescription>Retrieve approved IV&V reports with public data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-foreground">
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
            <h2 className="text-3xl font-bold text-foreground mb-6 border-l-4 border-primary pl-4">
              Usage Guidelines
            </h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <p className="text-muted-foreground">
                    Access limited to approved data under Hawai'i's transparency framework.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <p className="text-muted-foreground">
                    ETS retains source ownership; all data released read‑only for public consumption.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="text-muted-foreground mb-2">
                      Learn more about the state's commitment to transparency:
                    </p>
                    <Button variant="link" className="p-0 h-auto text-primary" asChild>
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
            <h2 className="text-3xl font-bold text-foreground mb-6 border-l-4 border-primary pl-4">
              Contact & Updates
            </h2>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <Mail className="h-8 w-8 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-foreground font-medium mb-2">
                      Interested in integrating Lōkahi data?
                    </p>
                    <p className="text-muted-foreground">
                      Contact ETS at{" "}
                      <a 
                        href="mailto:ets@hawaii.gov" 
                        className="text-primary hover:underline font-medium"
                      >
                        ets@hawaii.gov
                      </a>
                    </p>
                  </div>
                  <Button variant="default" size="lg" asChild>
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
