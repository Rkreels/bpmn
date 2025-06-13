
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useVoice } from "@/contexts/VoiceContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  Settings,
  Users,
  FileText,
  Zap,
  Target,
  GitBranch,
  Activity,
  Database,
  TrendingUp,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart3,
    description: "Overview and key metrics"
  },
  {
    title: "Process Manager",
    href: "/process-manager", 
    icon: GitBranch,
    description: "Design and manage BPMN processes"
  },
  {
    title: "Journey Modeler",
    href: "/journey-modeler",
    icon: Target,
    description: "Map customer experiences"
  },
  {
    title: "Collaboration Hub",
    href: "/collaboration-hub",
    icon: Users,
    description: "Team discussions and approvals"
  },
  {
    title: "Repository",
    href: "/repository",
    icon: Database,
    description: "Process templates and assets"
  },
  {
    title: "Process Intelligence",
    href: "/process-intelligence",
    icon: Activity,
    description: "Advanced process analytics"
  },
  {
    title: "Process Mining",
    href: "/process-mining",
    icon: Zap,
    description: "Discover processes from event logs"
  },
  {
    title: "Transformation Cockpit",
    href: "/transformation-cockpit",
    icon: TrendingUp,
    description: "Digital transformation management"
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
    description: "Analytics and reporting"
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
    description: "User management and permissions"
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Application configuration"
  }
];

export function Sidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { speakText } = useVoice();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNavigation = (item: typeof navigation[0]) => {
    speakText(`Navigating to ${item.title}. ${item.description}`);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    speakText(isCollapsed ? "Sidebar expanded" : "Sidebar collapsed");
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  if (isMobile) {
    return (
      <>
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMobile}
            className="bg-background shadow-md"
          >
            {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        <div className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 bg-background border-r transform transition-transform duration-200 md:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">BPM Platform</h2>
            <Button variant="ghost" size="icon" onClick={toggleMobile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => handleNavigation(item)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                      isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>
        </div>
      </>
    );
  }

  return (
    <div className={cn(
      "flex-shrink-0 bg-background border-r transition-all duration-200",
      isCollapsed ? "w-16" : "w-72"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold">BPM Platform</h2>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleCollapse}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => handleNavigation(item)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent group",
                  isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                )}
                title={isCollapsed ? `${item.title} - ${item.description}` : undefined}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{item.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
