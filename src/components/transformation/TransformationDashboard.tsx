
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { PortfolioOverview } from "./PortfolioOverview";
import { ValueRealization } from "./ValueRealization";
import { ChangeManagement } from "./ChangeManagement";
import { RiskManagement } from "./RiskManagement";
import { ResourcePlanning } from "./ResourcePlanning";
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  Users,
  AlertTriangle,
  Calendar,
  BarChart3,
  Settings,
  Plus,
  Download,
  FileText,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

export const TransformationDashboard: React.FC = () => {
  const { speakText } = useVoice();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isLoading, setIsLoading] = useState(false);

  const transformationMetrics = [
    { label: "Total Portfolio Value", value: "$2.4M", change: "+12%", trend: "up", icon: DollarSign },
    { label: "Active Initiatives", value: "18", change: "+3", trend: "up", icon: Target },
    { label: "Value Delivered YTD", value: "$890K", change: "+23%", trend: "up", icon: TrendingUp },
    { label: "Transformation ROI", value: "340%", change: "+45%", trend: "up", icon: BarChart3 }
  ];

  const recentInitiatives = [
    { id: 1, name: "Digital Customer Onboarding", status: "In Progress", progress: 75, budget: "$250K", timeline: "Q2 2024" },
    { id: 2, name: "Process Automation Suite", status: "Planning", progress: 25, budget: "$180K", timeline: "Q3 2024" },
    { id: 3, name: "Data Analytics Platform", status: "Completed", progress: 100, budget: "$320K", timeline: "Q1 2024" },
    { id: 4, name: "Mobile Experience Upgrade", status: "At Risk", progress: 40, budget: "$150K", timeline: "Q2 2024" }
  ];

  const handleNewInitiative = async () => {
    setIsLoading(true);
    toast({
      title: "Creating Initiative",
      description: "Opening initiative creation wizard..."
    });
    speakText("Creating new transformation initiative. This will open the initiative planning wizard to define objectives, scope, and resources.");
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Initiative Created",
        description: "New transformation initiative has been added to your portfolio."
      });
    }, 2000);
  };

  const handleGenerateReport = async () => {
    setIsLoading(true);
    toast({
      title: "Generating Report",
      description: "Creating comprehensive transformation report..."
    });
    speakText("Generating transformation report. This includes portfolio status, value realization metrics, and risk assessments.");
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Report Generated",
        description: "Transformation report is ready for download."
      });
    }, 3000);
  };

  const handleConfigureSettings = () => {
    toast({
      title: "Configuration",
      description: "Opening transformation settings panel..."
    });
    speakText("Opening transformation configuration. Here you can set up governance frameworks, approval workflows, and reporting preferences.");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const tabMessages = {
      portfolio: "Portfolio Overview. Monitor all transformation initiatives and their strategic alignment.",
      value: "Value Realization. Track benefits delivery and ROI across your transformation programs.",
      change: "Change Management. Manage organizational change and adoption strategies.",
      risk: "Risk Management. Identify and mitigate transformation risks and dependencies.",
      resources: "Resource Planning. Optimize resource allocation across transformation initiatives."
    };
    speakText(tabMessages[value as keyof typeof tabMessages] || "Transformation section opened");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "In Progress": return <Clock className="h-4 w-4 text-blue-500" />;
      case "At Risk": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Target className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "At Risk": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div 
      className="w-full min-h-screen p-4 md:p-6 space-y-6 animate-fade-in"
      onMouseEnter={() => speakText("Transformation Cockpit. Your central command center for managing digital transformation initiatives. Track portfolio value, monitor progress, manage change, and ensure successful delivery of transformation programs.")}
    >
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">Transformation Cockpit</h1>
          <p className="text-muted-foreground text-sm md:text-base">Orchestrate and monitor your digital transformation journey</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => speakText("Opening transformation planning tools to create roadmaps and timelines.")}
            className="hover-scale text-xs md:text-sm"
            size="sm"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Planning
          </Button>
          <Button 
            variant="outline"
            onClick={handleGenerateReport}
            disabled={isLoading}
            className="hover-scale text-xs md:text-sm"
            size="sm"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            {isLoading ? "Generating..." : "Reports"}
          </Button>
          <Button 
            onClick={handleConfigureSettings}
            className="hover-scale text-xs md:text-sm"
            size="sm"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button 
            onClick={handleNewInitiative}
            disabled={isLoading}
            className="hover-scale text-xs md:text-sm"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            {isLoading ? "Creating..." : "New Initiative"}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {transformationMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer hover-scale">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="h-4 w-4 text-primary flex-shrink-0" />
                      <p className="text-xs md:text-sm text-muted-foreground truncate">{metric.label}</p>
                    </div>
                    <p className="text-xl md:text-2xl font-bold">{metric.value}</p>
                  </div>
                  <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs ml-2 flex-shrink-0">
                    {metric.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1 rotate-180" />}
                    {metric.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Initiatives */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg md:text-xl">Recent Initiatives</CardTitle>
              <CardDescription>Active transformation projects and their status</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setActiveTab("portfolio")}>
              <FileText className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInitiatives.map((initiative) => (
              <div key={initiative.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1 space-y-2 md:space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(initiative.status)}
                    <h3 className="font-medium text-sm md:text-base">{initiative.name}</h3>
                    <Badge className={`text-xs ${getStatusColor(initiative.status)}`}>
                      {initiative.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs md:text-sm text-muted-foreground">
                    <span>Budget: {initiative.budget}</span>
                    <span>Timeline: {initiative.timeline}</span>
                    <span>Progress: {initiative.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${initiative.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-2 md:mt-0 md:ml-4">
                  <Button variant="outline" size="sm" onClick={() => toast({ title: "Initiative Details", description: `Opening details for ${initiative.name}` })}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="w-full overflow-x-auto">
          <TabsList className="grid w-full min-w-[600px] grid-cols-5 h-auto">
            <TabsTrigger value="portfolio" className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Portfolio</span>
            </TabsTrigger>
            <TabsTrigger value="value" className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Value</span>
            </TabsTrigger>
            <TabsTrigger value="change" className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Change</span>
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Risk</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2 p-2 md:p-3 text-xs md:text-sm">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="mt-6 w-full">
          <TabsContent value="portfolio" className="mt-0 w-full">
            <PortfolioOverview />
          </TabsContent>
          
          <TabsContent value="value" className="mt-0 w-full">
            <ValueRealization />
          </TabsContent>
          
          <TabsContent value="change" className="mt-0 w-full">
            <ChangeManagement />
          </TabsContent>
          
          <TabsContent value="risk" className="mt-0 w-full">
            <RiskManagement />
          </TabsContent>
          
          <TabsContent value="resources" className="mt-0 w-full">
            <ResourcePlanning />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
