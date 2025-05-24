
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { CustomerJourneyCanvas } from "./CustomerJourneyCanvas";
import { PersonaManagement } from "./PersonaManagement";
import { TouchpointManager } from "./TouchpointManager";
import { JourneyAnalytics } from "./JourneyAnalytics";
import { JourneyLibrary } from "./JourneyLibrary";
import { 
  User, 
  Map, 
  Target, 
  BarChart3,
  Plus,
  Download,
  Share2,
  FileText,
  Settings,
  TrendingUp,
  Users,
  Activity
} from "lucide-react";

export const JourneyModelerDashboard: React.FC = () => {
  const { speakText } = useVoice();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("journeys");
  const [isLoading, setIsLoading] = useState(false);

  const journeyMetrics = [
    { 
      label: "Active Journeys", 
      value: "12", 
      change: "+2", 
      trend: "up",
      icon: Map,
      description: "Currently mapped customer journeys"
    },
    { 
      label: "Customer Personas", 
      value: "8", 
      change: "+1", 
      trend: "up",
      icon: Users,
      description: "Defined customer personas"
    },
    { 
      label: "Touchpoints Mapped", 
      value: "156", 
      change: "+24", 
      trend: "up",
      icon: Target,
      description: "Total customer touchpoints"
    },
    { 
      label: "Journey Completion", 
      value: "87%", 
      change: "+5%", 
      trend: "up",
      icon: TrendingUp,
      description: "Average completion rate"
    }
  ];

  const handleNewJourney = async () => {
    setIsLoading(true);
    toast({
      title: "Creating New Journey",
      description: "Opening journey builder..."
    });
    speakText("Creating a new customer journey. Journey mapping helps visualize the complete customer experience from initial awareness through advocacy.");
    
    // Simulate async operation
    setTimeout(() => {
      setIsLoading(false);
      setActiveTab("journeys");
    }, 1000);
  };

  const handleExport = async () => {
    setIsLoading(true);
    toast({
      title: "Export Started",
      description: "Preparing journey maps for export..."
    });
    speakText("Exporting journey maps. This includes all touchpoints, personas, and analytics data for stakeholder sharing.");
    
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Export Complete",
        description: "Journey maps have been exported successfully."
      });
    }, 2000);
  };

  const handleShare = () => {
    toast({
      title: "Share Journey",
      description: "Sharing options opened"
    });
    speakText("Opening sharing options for your journey maps.");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const tabNames = {
      journeys: "Journey Canvas",
      personas: "Persona Management", 
      touchpoints: "Touchpoint Manager",
      analytics: "Journey Analytics",
      library: "Journey Library"
    };
    speakText(`Switched to ${tabNames[value as keyof typeof tabNames]}`);
  };

  return (
    <div 
      className="space-y-6 animate-fade-in"
      onMouseEnter={() => speakText("Journey Modeler. Design and optimize customer experiences across all touchpoints. Create journey maps, manage personas, and analyze customer interactions to improve satisfaction and conversion.")}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Journey Modeler</h1>
          <p className="text-muted-foreground">Design exceptional customer experiences</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleExport}
            disabled={isLoading}
            className="hover-scale"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            onClick={handleShare}
            className="hover-scale"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button 
            onClick={handleNewJourney}
            disabled={isLoading}
            className="hover-scale"
          >
            <Plus className="h-4 w-4 mr-2" />
            {isLoading ? "Creating..." : "New Journey"}
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {journeyMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer hover-scale">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="h-4 w-4 text-primary" />
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                    </div>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                  </div>
                  <Badge variant="default" className="text-xs">
                    {metric.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto">
          <TabsTrigger value="journeys" className="flex items-center gap-2 p-3">
            <Map className="h-4 w-4" />
            <span className="hidden sm:inline">Journeys</span>
          </TabsTrigger>
          <TabsTrigger value="personas" className="flex items-center gap-2 p-3">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Personas</span>
          </TabsTrigger>
          <TabsTrigger value="touchpoints" className="flex items-center gap-2 p-3">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Touchpoints</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 p-3">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="library" className="flex items-center gap-2 p-3">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Library</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="journeys" className="mt-6">
          <CustomerJourneyCanvas />
        </TabsContent>
        
        <TabsContent value="personas" className="mt-6">
          <PersonaManagement />
        </TabsContent>
        
        <TabsContent value="touchpoints" className="mt-6">
          <TouchpointManager />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <JourneyAnalytics />
        </TabsContent>
        
        <TabsContent value="library" className="mt-6">
          <JourneyLibrary />
        </TabsContent>
      </Tabs>
    </div>
  );
};
