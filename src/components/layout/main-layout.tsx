
import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  className?: string;
}

// We only pass pageTitle to the Header component since onToggleSidebar isn't defined in its props
export function MainLayout({ children, pageTitle, className }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col" 
        style={{ 
          paddingLeft: sidebarCollapsed ? "var(--sidebar-width-icon)" : "var(--sidebar-width)"
        }}>
        <Header pageTitle={pageTitle} />
        
        <main className={cn("flex-1 p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
