import { LayoutDashboard, FileText, Plus, Settings, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import lokahiLogo from "@/assets/lokahi-logo.png";
import lokahiFullLogo from "@/assets/lokahi-full-logo.png";

const menuItems = [
  { title: "Dashboard", url: "/vendor/dashboard", icon: LayoutDashboard },
  { title: "My Reports", url: "/vendor/reports", icon: FileText },
];

export function VendorSidebar() {
  const { open } = useSidebar();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          {open ? (
            <img 
              src={lokahiFullLogo} 
              alt="Lōkahi Dashboard" 
              className="h-6 w-auto"
            />
          ) : (
            <img 
              src={lokahiLogo} 
              alt="Lōkahi" 
              className="h-8 w-8 object-contain"
            />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                  <NavLink to="/vendor/report/new">
                    <Plus className="h-4 w-4" />
                    <span>New Report</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-foreground/70 hover:bg-accent hover:text-accent-foreground"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="data-[state=open]:bg-accent/10">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                      VU
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Vendor User</span>
                    <span className="text-xs text-muted-foreground">IV&V Vendor</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/vendor/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
