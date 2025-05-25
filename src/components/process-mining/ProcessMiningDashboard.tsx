
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { ProcessMiningActions } from "./ProcessMiningActions";
import { ProcessExplorer } from "./ProcessExplorer";
import { ProcessIntelligenceAnalytics } from "./ProcessIntelligenceAnalytics";
import { ProcessPerformanceDashboard } from "./ProcessPerformanceDashboard";
import { ProcessConformanceChecker } from "./ProcessConformanceChecker";
import { ProcessOptimizationSuite } from "./ProcessOptimizationSuite";
import { EventLogManager } from "./EventLogManager";
import { 
  Search, 
  BarChart3,
  Activity,
  Zap,
  Database,
  AlertTriangle,
  FileText
} from "lucide-react";

export const ProcessMiningDashboard: React.FC = () => {
  const { speakText } = useVoice();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);

  const miningStats = [
    { 
      label: "Processes Analyzed", 
      value: "23", 
      trend: "+12%", 
      icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
      description: "Total business processes discovered and analyzed"
    },
    { 
      label: "Event Logs Processed", 
      value: "1.2M", 
      trend: "+8%", 
      icon: <Database className="h-6 w-6 text-green-500" />,
      description: "Number of process events analyzed"
    },
    { 
      label: "Bottlenecks Identified", 
      value: "7", 
      trend: "-15%", 
      icon: <AlertTriangle className="h-6 w-6 text-orange-500" />,
      description: "Critical performance bottlenecks found"
    },
    { 
      label: "Optimization Potential", 
      value: "34%", 
      trend: "+5%", 
      icon: <Zap className="h-6 w-6 text-purple-500" />,
      description: "Estimated process improvement opportunity"
    }
  ];

  const [recentAnalyses, setRecentAnalyses] = useState([
    { id: 1, name: "Order-to-Cash Process", status: "Completed", date: "2 hours ago", insights: 12, variants: 8 },
    { id: 2, name: "Customer Support Workflow", status: "In Progress", date: "1 day ago", insights: 8, variants: 5 },
    { id: 3, name: "Invoice Processing", status: "Completed", date: "3 days ago", insights: 15, variants: 12 },
    { id: 4, name: "Employee Onboarding", status: "Queued", date: "1 week ago", insights: 0, variants: 0 }
  ]);

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

  const handleNewProject = () => {
    toast({
      title: "New Project",
      description: "Creating new process mining project..."
    });
    speakText("Creating new process mining project. This will set up a workspace for analyzing your business processes.");
    console.log("New project created");
  };

  const handleUploadData = (file: File) => {
    console.log("File uploaded:", file.name);
    toast({
      title: "Upload Complete",
      description: `${file.name} has been uploaded successfully.`
    });
  };

  const handleStartAnalysis = () => {
    setIsAnalysisRunning(true);
    toast({
      title: "Analysis Started",
      description: "Running comprehensive process mining analysis..."
    });
    speakText("Starting process mining analysis. This will discover your actual process flows and identify improvement opportunities.");
    
    setTimeout(() => {
      setIsAnalysisRunning(false);
      toast({
        title: "Analysis Complete",
        description: "Process mining analysis has finished. Results are now available."
      });
      console.log("Analysis completed");
    }, 5000);
  };

  const handleExportResults = () => {
    console.log("Exporting process mining results");
    toast({
      title: "Export Complete",
      description: "Analysis results have been exported successfully."
    });
  };

  const handleAnalysisClick = (analysisId: number) => {
    const analysis = recentAnalyses.find(a => a.id === analysisId);
    if (analysis) {
      toast({
        title: "Analysis Details",
        description: `Opening detailed view for ${analysis.name}`
      });
      console.log("Analysis clicked:", analysis);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Queued": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-full w-full bg-background">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full">
        <div className="border-b bg-muted/20 p-4">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 mb-4">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold">Process Mining</h1>
              <p className="text-muted-foreground text-sm md:text-base">Discover, analyze, and optimize your business processes</p>
            </div>
            
            <ProcessMiningActions
              onNewProject={handleNewProject}
              onUploadData={handleUploadData}
              onStartAnalysis={handleStartAnalysis}
              onExportResults={handleExportResults}
              isAnalysisRunning={isAnalysisRunning}
            />
          </div>
          
          <div className="w-full overflow-x-auto">
            <TabsList className="grid w-full min-w-[700px] grid-cols-6 h-auto">
              <TabsTrigger 
                value="overview"
                className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="explorer"
                className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Explorer</span>
              </TabsTrigger>
              <TabsTrigger 
                value="performance"
                className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm"
              >
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Performance</span>
              </TabsTrigger>
              <TabsTrigger 
                value="conformance"
                className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Conformance</span>
              </TabsTrigger>
              <TabsTrigger 
                value="optimization"
                className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm"
              >
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Optimization</span>
              </TabsTrigger>
              <TabsTrigger 
                value="eventlogs"
                className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm"
              >
                <Database className="h-4 w-4" />
                <span className="hidden sm:inline">Event Logs</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 space-y-6">
          <TabsContent value="overview" className="space-y-6 m-0">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {miningStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer hover-scale">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      {stat.icon}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm text-muted-foreground truncate">{stat.label}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
                          <Badge variant="outline" className="text-xs">
                            {stat.trend}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Analyses */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg md:text-xl">Recent Analyses</CardTitle>
                    <CardDescription>Latest process mining projects and their status</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnalyses.map((analysis) => (
                    <div 
                      key={analysis.id} 
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => handleAnalysisClick(analysis.id)}
                    >
                      <div className="flex-1 space-y-2 md:space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-sm md:text-base">{analysis.name}</h3>
                          <Badge className={`text-xs ${getStatusColor(analysis.status)}`}>
                            {analysis.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs md:text-sm text-muted-foreground">
                          <span>Last updated: {analysis.date}</span>
                          <span>Insights: {analysis.insights}</span>
                          <span>Variants: {analysis.variants}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
