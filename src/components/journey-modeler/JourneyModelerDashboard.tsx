
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVoice } from "@/contexts/VoiceContext";
import { CustomerJourneyCanvas } from "./CustomerJourneyCanvas";
import { PersonaManagement } from "./PersonaManagement";
import { 
  User, 
  Map, 
  Target, 
  BarChart3,
  Plus,
  Download,
  Share2
} from "lucide-react";

export const JourneyModelerDashboard: React.FC = () => {
  const { speakText } = useVoice();
  const [activeTab, setActiveTab] = useState("journeys");

  const journeyMetrics = [
    { label: "Active Journeys", value: "12", change: "+2", trend: "up" },
    { label: "Customer Personas", value: "8", change: "+1", trend: "up" },
    { label: "Touchpoints Mapped", value: "156", change: "+24", trend: "up" },
    { label: "Journey Completion", value: "87%", change: "+5%", trend: "up" }
  ];

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Journey Modeler. Design and optimize customer experiences across all touchpoints. Create journey maps, manage personas, and analyze customer interactions to improve satisfaction and conversion.")}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Journey Modeler</h1>
          <p className="text-muted-foreground">Design exceptional customer experiences</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Journey
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {journeyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <Badge variant="default" className="text-xs">
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="journeys" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Journeys
          </TabsTrigger>
          <TabsTrigger value="personas" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Personas
          </TabsTrigger>
          <TabsTrigger value="touchpoints" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Touchpoints
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="journeys" className="mt-6">
          <CustomerJourneyCanvas />
        </TabsContent>
        
        <TabsContent value="personas" className="mt-6">
          <PersonaManagement />
        </TabsContent>
        
        <TabsContent value="touchpoints" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Touchpoint Management</CardTitle>
              <CardDescription>Manage all customer touchpoints across channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Target className="h-12 w-12 mx-auto mb-4" />
                <p>Touchpoint management interface will be displayed here</p>
                <p className="text-sm">Map and optimize every customer interaction point</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Journey Analytics</CardTitle>
              <CardDescription>Analyze customer journey performance and optimization opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                <p>Journey analytics dashboard will be displayed here</p>
                <p className="text-sm">Track conversion rates, drop-offs, and satisfaction metrics</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
