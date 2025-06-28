
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  LayoutDashboard, 
  Settings, 
  Workflow, 
  Route, 
  Users, 
  Database,
  BarChart3,
  Search,
  Target,
  FileText,
  UserCog,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  description: string;
}

const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Overview and key metrics"
  },
  {
    title: "Process Manager",
    href: "/process-manager",
    icon: Workflow,
    description: "Design and manage processes"
  },
  {
    title: "Journey Modeler",
    href: "/journey-modeler",
    icon: Route,
    description: "Map customer journeys"
  },
  {
    title: "Collaboration Hub",
    href: "/collaboration-hub",
    icon: Users,
    description: "Team collaboration tools"
  },
  {
    title: "Repository",
    href: "/repository",
    icon: Database,
    description: "Asset and knowledge management"
  },
  {
    title: "Process Intelligence",
    href: "/process-intelligence",
    icon: BarChart3,
    description: "Analytics and insights"
  },
  {
    title: "Process Mining",
    href: "/process-mining",
    icon: Search,
    description: "Discover and analyze processes"
  },
  {
    title: "Transformation Cockpit",
    href: "/transformation-cockpit",
    icon: Target,
    description: "Digital transformation management"
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
    description: "Generate and view reports"
  },
  {
    title: "Users",
    href: "/users",
    icon: UserCog,
    description: "User management"
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Application settings"
  }
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { speakText, isVoiceEnabled } = useVoice();

  const handleNavClick = (item: NavigationItem) => {
    if (isVoiceEnabled) {
      speakText(`Navigating to ${item.title}. ${item.description}`);
    }
    setIsMobileOpen(false);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (isVoiceEnabled) {
      speakText(isCollapsed ? "Sidebar expanded" : "Sidebar collapsed");
    }
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleMobile}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-background border-r transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Workflow className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">ProcessAI</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="hidden md:flex"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            const IconComponent = item.icon;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <IconComponent className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-primary-foreground" : ""
                )} />
                {!isCollapsed && (
                  <span className="font-medium truncate">{item.title}</span>
                )}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.title}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          {!isCollapsed ? (
            <div className="text-xs text-muted-foreground">
              <p>ProcessAI Platform</p>
              <p>Version 2.1.0</p>
            </div>
          ) : (
            <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
              <span className="text-xs font-bold">v2</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
