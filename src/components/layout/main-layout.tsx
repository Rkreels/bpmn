
import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  className?: string;
  showPageTitle?: boolean;
}

export function MainLayout({ 
  children, 
  pageTitle, 
  className, 
  showPageTitle = true 
}: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <div className="flex-1 flex flex-col transition-all duration-300" 
        style={{ 
          paddingLeft: sidebarCollapsed ? "var(--sidebar-width-collapsed)" : "var(--sidebar-width)"
        }}>
        <Header 
          pageTitle={pageTitle} 
          onToggleSidebar={toggleSidebar} 
          showPageTitle={showPageTitle} 
        />
        
        <main className={cn("flex-1 p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
