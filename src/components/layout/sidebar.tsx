
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Box,
  Database,
  GitMerge,
  Globe,
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
}

export function Sidebar({ className }: SidebarProps) {
  const { speakModuleNavigation, speakModuleTooltip, cancelSpeech, isVoiceEnabled } = useVoice();
  const location = useLocation();
  
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen bg-sidebar z-30 border-r border-sidebar-border w-[240px] transition-all duration-300 ease-in-out",
        className
      )}
    >
      <div className="flex items-center h-14 border-b border-sidebar-border px-4">
        <div className="flex items-center flex-1 gap-2">
          <GitMerge className="h-6 w-6 text-primary" />
          <span className="font-semibold text-sidebar-foreground whitespace-nowrap">ProcessFlow</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4 px-3">
        <nav className="flex flex-col gap-1">
          <NavItem 
            id="sidebar-dashboard" 
            to="/" 
            icon={LayoutDashboard} 
            label="Dashboard" 
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
            isActive={location.pathname === "/process-intelligence"}
            onNavigate={() => speakModuleNavigation("sidebar-processIntelligence")}
            onHover={() => isVoiceEnabled && speakModuleTooltip("sidebar-processIntelligence")}
            onLeave={() => cancelSpeech()}
          />
          <NavItem 
            id="sidebar-process-mining" 
            to="/process-mining" 
            icon={Box} 
            label="Process Mining" 
            isActive={location.pathname === "/process-mining"}
            onNavigate={() => speakModuleNavigation("sidebar-processMining")}
            onHover={() => isVoiceEnabled && speakModuleTooltip("sidebar-processMining")}
            onLeave={() => cancelSpeech()}
          />
          <NavItem 
            id="sidebar-transformation-cockpit" 
            to="/transformation-cockpit" 
            icon={Layers} 
            label="Transformation Cockpit" 
            isActive={location.pathname === "/transformation-cockpit"}
            onNavigate={() => speakModuleNavigation("sidebar-transformationCockpit")}
            onHover={() => isVoiceEnabled && speakModuleTooltip("sidebar-transformationCockpit")}
            onLeave={() => cancelSpeech()}
          />
        </nav>
        
        <div className="mt-8 pt-6 border-t border-sidebar-border">
          <span className="text-xs font-medium text-sidebar-foreground/50 px-3">
            Administration
          </span>
          <nav className="mt-2 flex flex-col gap-1">
            <NavItem 
              id="sidebar-users" 
              to="/users" 
              icon={Users} 
              label="User Management" 
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
              isActive={location.pathname === "/settings"}
              onNavigate={() => speakModuleNavigation("sidebar-settings")}
              onHover={() => isVoiceEnabled && speakModuleTooltip("sidebar-settings")}
              onLeave={() => cancelSpeech()}
            />
          </nav>
        </div>
      </div>

      <div className="h-14 border-t border-sidebar-border flex items-center px-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            JD
          </div>
          <div>
            <div className="text-sm font-medium text-sidebar-foreground truncate">John Doe</div>
            <div className="text-xs text-sidebar-foreground/70 truncate">john.doe@example.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface NavItemProps {
  id: string;
  to: string;
  icon: React.FC<{ className?: string }>;
  label: string;
  isActive?: boolean;
  onNavigate?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
}

function NavItem({ id, to, icon: Icon, label, isActive = false, onNavigate, onHover, onLeave }: NavItemProps) {
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
