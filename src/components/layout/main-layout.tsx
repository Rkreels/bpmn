
import React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      {/* Main content area that adjusts to sidebar */}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300",
        // Add left margin to account for sidebar on desktop
        "md:ml-64"
      )}>
        <Header 
          pageTitle={pageTitle}
          showPageTitle={showPageTitle} 
        />
        
        <main className={cn(
          "flex-1 overflow-auto",
          isMobile ? "p-3" : "p-6",
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}
