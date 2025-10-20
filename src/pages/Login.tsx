import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import lokahiFullLogo from "@/assets/lokahi-full-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Mock authentication delay
    setTimeout(() => {
      toast.success("Signed in successfully (mock)");
      
      // Mock role-based redirect
      // In production, this would come from the auth response
      const mockRole = email.includes("admin") ? "ets-admin" : "ivv-vendor";
      
      if (mockRole === "ets-admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/vendor/dashboard");
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-[480px] shadow-medium">
        <CardHeader className="space-y-4 pb-6">
          <div className="flex justify-center">
            <img 
              src={lokahiFullLogo} 
              alt="Lōkahi Dashboard" 
              className="h-12 w-auto"
            />
          </div>
          <div className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">Access Lōkahi Dashboard</CardTitle>
            <CardDescription className="text-sm">
              For ETS employees and approved IV&V vendors.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-center text-sm text-muted-foreground pt-2">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-accent hover:text-accent/90 font-medium underline-offset-4 hover:underline"
              >
                Get started
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
