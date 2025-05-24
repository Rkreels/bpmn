
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { ProcessExplorer } from "./ProcessExplorer";
import { ProcessIntelligenceAnalytics } from "./ProcessIntelligenceAnalytics";
import { ProcessPerformanceDashboard } from "./ProcessPerformanceDashboard";
import { ProcessConformanceChecker } from "./ProcessConformanceChecker";
import { ProcessOptimizationSuite } from "./ProcessOptimizationSuite";
import { EventLogManager } from "./EventLogManager";
import { 
  Search, 
  Upload, 
  Download, 
  Settings,
  Play,
  BarChart3,
  Activity,
  Zap,
  Database,
  AlertTriangle
} from "lucide-react";

export const ProcessMiningDashboard: React.FC = () => {
  const { speakText } = useVoice();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const tabMessages = {
      overview: "Process Mining Overview. Get insights into your process performance and discover optimization opportunities.",
      explorer: "Process Explorer. Visualize and analyze your actual process flows discovered from event logs.",
      performance: "Performance Analysis. Monitor key performance indicators and identify bottlenecks.",
      conformance: "Conformance Checking. Compare actual process execution against designed models.",
      optimization: "Process Optimization. Get AI-powered recommendations for process improvements.",
      eventlogs: "Event Log Manager. Upload, manage, and analyze your process event data."
    };
    speakText(tabMessages[tab as keyof typeof tabMessages] || "Process Mining section opened");
  };

  const miningStats = [
    { label: "Processes Analyzed", value: "23", trend: "+12%", icon: <BarChart3 className="h-6 w-6 text-blue-500" /> },
    { label: "Event Logs Processed", value: "1.2M", trend: "+8%", icon: <Database className="h-6 w-6 text-green-500" /> },
    { label: "Bottlenecks Identified", value: "7", trend: "-15%", icon: <AlertTriangle className="h-6 w-6 text-orange-500" /> },
    { label: "Optimization Potential", value: "34%", trend: "+5%", icon: <Zap className="h-6 w-6 text-purple-500" /> }
  ];

  const handleUploadEventLog = () => {
    toast({
      title: "Event Log Upload",
      description: "Event log upload functionality will be implemented."
    });
    speakText("Opening event log upload. Upload your process data to discover actual workflows and performance patterns.");
  };

  const handleStartAnalysis = () => {
    toast({
      title: "Analysis Started",
      description: "Process mining analysis has been initiated."
    });
    speakText("Starting process mining analysis. This will discover your actual process flows and identify improvement opportunities.");
  };

  return (
    <div 
      className="h-full w-full bg-background"
      onMouseEnter={() => speakText("Process Mining Dashboard. Discover, analyze, and optimize your business processes using advanced process mining techniques and AI-powered insights.")}
    >
      <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full">
        <div className="border-b bg-muted/20 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Process Mining</h1>
              <p className="text-muted-foreground">Discover, analyze, and optimize your business processes</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                onClick={handleUploadEventLog}
                onMouseEnter={() => speakText("Upload event logs to start process discovery and analysis.")}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Data
              </Button>
              <Button 
                variant="outline"
                onMouseEnter={() => speakText("Download analysis results and process models.")}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                onClick={handleStartAnalysis}
                onMouseEnter={() => speakText("Start comprehensive process mining analysis.")}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Analysis
              </Button>
            </div>
          </div>
          
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger 
              value="overview"
              onMouseEnter={() => speakText("Overview tab. Get a comprehensive view of your process mining insights.")}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="explorer"
              onMouseEnter={() => speakText("Process Explorer. Visualize discovered process models.")}
            >
              Explorer
            </TabsTrigger>
            <TabsTrigger 
              value="performance"
              onMouseEnter={() => speakText("Performance analysis. Monitor process KPIs and bottlenecks.")}
            >
              Performance
            </TabsTrigger>
            <TabsTrigger 
              value="conformance"
              onMouseEnter={() => speakText("Conformance checking. Compare actual vs designed processes.")}
            >
              Conformance
            </TabsTrigger>
            <TabsTrigger 
              value="optimization"
              onMouseEnter={() => speakText("Optimization recommendations. Get AI-powered improvement suggestions.")}
            >
              Optimization
            </TabsTrigger>
            <TabsTrigger 
              value="eventlogs"
              onMouseEnter={() => speakText("Event log management. Upload and manage your process data.")}
            >
              Event Logs
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 p-6">
          <TabsContent value="overview" className="space-y-6 m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {miningStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      {stat.icon}
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <Badge variant="outline" className="text-xs">
                            {stat.trend}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
