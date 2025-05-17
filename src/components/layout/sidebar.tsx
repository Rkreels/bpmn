import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Box,
  ChevronLeft,
  ChevronRight,
  Database,
  GitMerge,
  Globe,
  Home,
  Layers,
  LayoutDashboard,
  MessagesSquare,
  Settings,
  Users,
} from "lucide-react";
import { useVoice } from "@/contexts/VoiceContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ className, collapsed = false, onToggle }: SidebarProps) {
  const { speakModuleNavigation, speakModuleTooltip, cancelSpeech, isVoiceEnabled } = useVoice();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoCollapsed, setIsAutoCollapsed] = useState(true);
  
  // Effect to manage auto-collapse timers
  useEffect(() => {
    let collapseTimer: NodeJS.Timeout;
    
    // Auto-expand when hovering
    if (isHovered && isAutoCollapsed) {
      setIsAutoCollapsed(false);
    }
    
    // Auto-collapse after leaving with delay
    if (!isHovered && !isAutoCollapsed) {
      collapseTimer = setTimeout(() => {
        setIsAutoCollapsed(true);
      }, 800); // Delay before auto-collapsing
    }
    
    return () => {
      if (collapseTimer) {
        clearTimeout(collapseTimer);
      }
    };
  }, [isHovered, isAutoCollapsed]);
  
  // Determine if sidebar should be collapsed based on manual toggle or auto-collapse
  const shouldCollapse = collapsed || (isAutoCollapsed && !isHovered);
  
  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar fixed h-screen z-30 transition-all duration-300 border-r border-sidebar-border",
        shouldCollapse ? "w-[70px]" : "w-[240px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center h-14 border-b border-sidebar-border px-4">
        <div className="flex items-center flex-1 gap-2 overflow-hidden">
          <GitMerge className="h-6 w-6 text-primary" />
          {!shouldCollapse && <span className="font-semibold text-sidebar-foreground">ProcessFlow</span>}
        </div>
        {onToggle && (
          <button
            onClick={onToggle}
            className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-sidebar-accent text-sidebar-foreground"
          >
            {shouldCollapse ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-auto py-4 px-3">
        <nav className="flex flex-col gap-1">
          <NavItem 
            id="sidebar-dashboard" 
            to="/" 
            icon={LayoutDashboard} 
            label="Dashboard" 
            collapsed={shouldCollapse} 
            isActive={location.pathname === "/"}
            onNavigate={() => speakModuleNavigation("sidebar-dashboard")}
            onHover={() => isVoiceEnabled && speakModuleTooltip("sidebar-dashboard")}
            onLeave={() => cancelSpeech()}
          />
          <NavItem 
            id="sidebar-process-manager" 
            to="/process-manager" 
            icon={GitMerge} 
            label="Process Manager" 
            collapsed={shouldCollapse} 
            isActive={location.pathname === "/process-manager"}
            onNavigate={() => speakModuleNavigation("sidebar-processManager")}
            onHover={() => isVoiceEnabled && speakModuleTooltip("sidebar-processManager")}
            onLeave={() => cancelSpeech()}
          />
          <NavItem 
            id="sidebar-journey-modeler" 
            to="/journey-modeler" 
            icon={Globe} 
            label="Journey Modeler" 
            collapsed={shouldCollapse} 
            isActive={location.pathname === "/journey-modeler"}
            onNavigate={() => speakModuleNavigation("sidebar-journeyModeler")}
            onHover={() => isVoiceEnabled && speakModuleTooltip("sidebar-journeyModeler")}
            onLeave={() => cancelSpeech()}
          />
          <NavItem 
            id="sidebar-collaboration-hub" 
            to="/collaboration-hub" 
            icon={MessagesSquare} 
            label="Collaboration Hub" 
            collapsed={shouldCollapse} 
            isActive={location.pathname === "/collaboration-hub"}
            onNavigate={() => speakModuleNavigation("sidebar-collaborationHub")}
            onHover={() => isVoiceEnabled && speakModuleTooltip("sidebar-collaborationHub")}
            onLeave={() => cancelSpeech()}
          />
          <NavItem 
            id="sidebar-repository" 
            to="/repository" 
            icon={Database} 
            label="Repository" 
            collapsed={shouldCollapse} 
            isActive={location.pathname === "/repository"}
            onNavigate={() => speakModuleNavigation("sidebar-repository")}
            onHover={() => isVoiceEnabled && speakModuleTooltip("sidebar-repository")}
            onLeave={() => cancelSpeech()}
          />
          <NavItem 
            id="sidebar-process-intelligence" 
            to="/process-intelligence" 
            icon={BarChart3} 
            label="Process Intelligence" 
            collapsed={shouldCollapse} 
            isActive={location.pathname === "/process-intelligence"}
            onNavigate={() => speakModuleNavigation("sidebar-processIntelligence")}
            onHover={() => isVoiceEnabled && speakModuleTooltip("sidebar-processIntelligence")}
            onLeave={() => cancelSpeech()}
          />
          <NavItem 
            id="sidebar-transformation-cockpit" 
            to="/transformation-cockpit" 
            icon={Layers} 
            label="Transformation Cockpit" 
            collapsed={shouldCollapse} 
            isActive={location.pathname === "/transformation-cockpit"}
            onNavigate={() => speakModuleNavigation("sidebar-transformationCockpit")}
            onHover={() => isVoiceEnabled && speakModuleTooltip("sidebar-transformationCockpit")}
            onLeave={() => cancelSpeech()}
          />
          <NavItem 
            id="sidebar-reports" 
            to="/reports" 
            icon={Box} 
            label="Reports" 
            collapsed={shouldCollapse} 
            isActive={location.pathname === "/reports" || location.pathname === "/reports-dashboards"}
            onNavigate={() => speakModuleNavigation("sidebar-reports")}
            onHover={() => isVoiceEnabled && speakModuleTooltip("sidebar-reports")}
            onLeave={() => cancelSpeech()}
          />
        </nav>
        
        <div className="mt-8 pt-6 border-t border-sidebar-border">
          <span className={cn("text-xs font-medium text-sidebar-foreground/50 px-3", shouldCollapse && "hidden")}>
            Administration
          </span>
          <nav className="mt-2 flex flex-col gap-1">
            <NavItem 
              id="sidebar-users" 
              to="/users" 
              icon={Users} 
              label="User Management" 
              collapsed={shouldCollapse} 
              isActive={location.pathname === "/users" || location.pathname === "/user-management"}
              onNavigate={() => speakModuleNavigation("sidebar-users")}
              onHover={() => isVoiceEnabled && speakModuleTooltip("sidebar-users")}
              onLeave={() => cancelSpeech()}
            />
            <NavItem 
              id="sidebar-settings" 
              to="/settings" 
              icon={Settings} 
              label="Settings" 
              collapsed={shouldCollapse} 
              isActive={location.pathname === "/settings"}
              onNavigate={() => speakModuleNavigation("sidebar-settings")}
              onHover={() => isVoiceEnabled && speakModuleTooltip("sidebar-settings")}
              onLeave={() => cancelSpeech()}
            />
          </nav>
        </div>
      </div>

      <div className="h-14 border-t border-sidebar-border flex items-center px-3">
        <div className={cn("flex items-center gap-3", shouldCollapse && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            JD
          </div>
          {!shouldCollapse && (
            <div className="overflow-hidden">
              <div className="text-sm font-medium text-sidebar-foreground truncate">John Doe</div>
              <div className="text-xs text-sidebar-foreground/70 truncate">john.doe@example.com</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  id: string;
  to: string;
  icon: React.FC<{ className?: string }>;
  label: string;
  collapsed: boolean;
  isActive?: boolean;
  onNavigate?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
}

function NavItem({ id, to, icon: Icon, label, collapsed, isActive = false, onNavigate, onHover, onLeave }: NavItemProps) {
  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              id={id}
              to={to}
              className={cn(
                "flex items-center h-10 px-3 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
                isActive && "bg-sidebar-accent text-sidebar-foreground"
              )}
              onClick={onNavigate}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              <Icon className="h-5 w-5 min-w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Link
      id={id}
      to={to}
      className={cn(
        "flex items-center h-10 px-3 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
        isActive && "bg-sidebar-accent text-sidebar-foreground"
      )}
      onClick={onNavigate}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Icon className="h-5 w-5 min-w-5" />
      <span className="ml-3 truncate">{label}</span>
    </Link>
  );
}
