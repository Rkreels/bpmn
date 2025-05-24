
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVoice } from "@/contexts/VoiceContext";
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
  Settings
} from "lucide-react";

export const TransformationDashboard: React.FC = () => {
  const { speakText } = useVoice();
  const [activeTab, setActiveTab] = useState("portfolio");

  const transformationMetrics = [
    { label: "Total Portfolio Value", value: "$2.4M", change: "+12%", trend: "up" },
    { label: "Active Initiatives", value: "18", change: "+3", trend: "up" },
    { label: "Value Delivered YTD", value: "$890K", change: "+23%", trend: "up" },
    { label: "Transformation ROI", value: "340%", change: "+45%", trend: "up" }
  ];

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Transformation Cockpit. Your central command center for managing digital transformation initiatives. Track portfolio value, monitor progress, manage change, and ensure successful delivery of transformation programs.")}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transformation Cockpit</h1>
          <p className="text-muted-foreground">Orchestrate and monitor your digital transformation journey</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Planning
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Reports
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {transformationMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                  {metric.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1 rotate-180" />}
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="value" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Value
          </TabsTrigger>
          <TabsTrigger value="change" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Change
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Risk
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="portfolio" className="mt-6">
          <PortfolioOverview />
        </TabsContent>
        
        <TabsContent value="value" className="mt-6">
          <ValueRealization />
        </TabsContent>
        
        <TabsContent value="change" className="mt-6">
          <ChangeManagement />
        </TabsContent>
        
        <TabsContent value="risk" className="mt-6">
          <RiskManagement />
        </TabsContent>
        
        <TabsContent value="resources" className="mt-6">
          <ResourcePlanning />
        </TabsContent>
      </Tabs>
    </div>
  );
};
