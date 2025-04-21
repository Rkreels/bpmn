
import React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  className?: string;
}

export function MainLayout({ children, pageTitle, className }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="pl-[var(--sidebar-width)] flex-1 flex flex-col">
        <Header pageTitle={pageTitle} />
        
        <main className={cn("flex-1 p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
