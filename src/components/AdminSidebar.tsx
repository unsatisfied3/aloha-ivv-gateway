import { Home, FileText, ClipboardList, BarChart3, Settings, User, LogOut, Bell, Plus, FolderKanban } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
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
import { Button } from "@/components/ui/button";
import lokahiFullLogo from "@/assets/lokahi-full-logo.png";
import lokahiLogo from "@/assets/lokahi-logo.png";

const menuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Projects", url: "/admin/projects", icon: FolderKanban },
  { title: "Reports", url: "/admin/reports", icon: FileText },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className="border-r bg-background">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          {!collapsed ? (
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
      
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-medium">
                  <Link to="/admin/project/new">
                    <Plus className="h-4 w-4" />
                    {!collapsed && <span>New Project</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "text-foreground/70 hover:bg-accent hover:text-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-primary" />
              </div>
              {!collapsed && (
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground">Admin User</span>
                  <span className="text-xs text-muted-foreground truncate">admin@lokahi.gov</span>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-background">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
