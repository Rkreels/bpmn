
import React from "react";
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
  // Remove the collapsible state
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-[240px]">
        <Header 
          pageTitle={pageTitle}
          showPageTitle={showPageTitle} 
        />
        
        <main className={cn("flex-1 p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
