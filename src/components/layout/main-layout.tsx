
import React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { VoiceTrainerToggle } from "../voice/VoiceTrainerToggle";

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
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        isMobile ? "mt-16" : "ml-[240px]"
      )}>
        <Header 
          pageTitle={pageTitle}
          showPageTitle={showPageTitle} 
        />
        
        <main className={cn("flex-1 p-3 md:p-6", className)}>
          {children}
        </main>
        
        <VoiceTrainerToggle />
      </div>
    </div>
  );
}
