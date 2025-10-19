import { Home, FileText, ClipboardList, BarChart3, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
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
  useSidebar,
} from "@/components/ui/sidebar";
import lokahiLogo from "@/assets/lokahi-logo.png";

const menuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Reports", url: "/admin/reports", icon: FileText },
  { title: "Assignments", url: "/admin/assignments", icon: ClipboardList },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className="border-r bg-background">
      <SidebarHeader className="border-b px-6 py-5">
        <div className="flex items-center gap-3">
          <img 
            src={lokahiLogo} 
            alt="Lōkahi" 
            className="h-8 w-8"
          />
          {!collapsed && (
            <div>
              <div className="text-base font-semibold text-[#007C77]">Lōkahi</div>
              <div className="text-sm text-muted-foreground">Dashboard</div>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-medium text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-[#007C77]/10 text-[#007C77] font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
    </Sidebar>
  );
}
