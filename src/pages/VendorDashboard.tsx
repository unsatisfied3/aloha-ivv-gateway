import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">IV&V Vendor Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Welcome, Vendor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is your vendor dashboard. Features coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboard;
