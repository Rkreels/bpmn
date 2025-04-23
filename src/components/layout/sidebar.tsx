
import { useState } from "react";
import { Link } from "react-router-dom";
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

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ className, collapsed = false, onToggle }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar fixed h-screen z-30 transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-[var(--sidebar-width-collapsed)]" : "w-[var(--sidebar-width)]",
        className
      )}
      style={{
        "--sidebar-width": "240px",
        "--sidebar-width-collapsed": "70px",
      } as React.CSSProperties}
    >
      <div className="flex items-center h-14 border-b border-sidebar-border px-4">
        <div className="flex items-center flex-1 gap-2 overflow-hidden">
          <GitMerge className="h-6 w-6 text-primary" />
          {!collapsed && <span className="font-semibold text-sidebar-foreground">ProcessFlow</span>}
        </div>
        {onToggle && (
          <button
            onClick={onToggle}
            className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-sidebar-accent text-sidebar-foreground"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-auto py-4 px-3">
        <nav className="flex flex-col gap-1">
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" collapsed={collapsed} />
          <NavItem to="/process-manager" icon={GitMerge} label="Process Manager" collapsed={collapsed} />
          <NavItem to="/journey-modeler" icon={Globe} label="Journey Modeler" collapsed={collapsed} />
          <NavItem to="/collaboration-hub" icon={MessagesSquare} label="Collaboration Hub" collapsed={collapsed} />
          <NavItem to="/repository" icon={Database} label="Repository" collapsed={collapsed} />
          <NavItem to="/process-intelligence" icon={BarChart3} label="Process Intelligence" collapsed={collapsed} />
          <NavItem to="/transformation-cockpit" icon={Layers} label="Transformation Cockpit" collapsed={collapsed} />
          <NavItem to="/reports" icon={Box} label="Reports" collapsed={collapsed} />
        </nav>
        
        <div className="mt-8 pt-6 border-t border-sidebar-border">
          <span className={cn("text-xs font-medium text-sidebar-foreground/50 px-3", collapsed && "hidden")}>
            Administration
          </span>
          <nav className="mt-2 flex flex-col gap-1">
            <NavItem to="/users" icon={Users} label="User Management" collapsed={collapsed} />
            <NavItem to="/settings" icon={Settings} label="Settings" collapsed={collapsed} />
          </nav>
        </div>
      </div>

      <div className="h-14 border-t border-sidebar-border flex items-center px-3">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            JD
          </div>
          {!collapsed && (
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
  to: string;
  icon: React.FC<{ className?: string }>;
  label: string;
  collapsed: boolean;
  isActive?: boolean;
}

function NavItem({ to, icon: Icon, label, collapsed, isActive = false }: NavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center h-10 px-3 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
        isActive && "bg-sidebar-accent text-sidebar-foreground"
      )}
    >
      <Icon className="h-5 w-5 min-w-5" />
      {!collapsed && <span className="ml-3 truncate">{label}</span>}
    </Link>
  );
}
