
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProcessExplorer } from "./ProcessExplorer";
import { ProcessIntelligenceAnalytics } from "./ProcessIntelligenceAnalytics";
import { ProcessPerformanceDashboard } from "./ProcessPerformanceDashboard";
import { ProcessConformanceChecker } from "./ProcessConformanceChecker";
import { ProcessOptimizationSuite } from "./ProcessOptimizationSuite";
import { EventLogManager } from "./EventLogManager";

export const ProcessMiningDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="h-full w-full bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <div className="border-b bg-muted/20 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Process Mining</h1>
              <p className="text-muted-foreground">Discover, analyze, and optimize your business processes</p>
            </div>
          </div>
          
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="explorer">Process Explorer</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="conformance">Conformance</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="eventlogs">Event Logs</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 p-6">
          <TabsContent value="overview" className="space-y-6 m-0">
            <ProcessIntelligenceAnalytics />
          </TabsContent>
          
          <TabsContent value="explorer" className="m-0">
            <ProcessExplorer />
          </TabsContent>
          
          <TabsContent value="performance" className="m-0">
            <ProcessPerformanceDashboard />
          </TabsContent>
          
          <TabsContent value="conformance" className="m-0">
            <ProcessConformanceChecker />
          </TabsContent>
          
          <TabsContent value="optimization" className="m-0">
            <ProcessOptimizationSuite />
          </TabsContent>
          
          <TabsContent value="eventlogs" className="m-0">
            <EventLogManager />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
