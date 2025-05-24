
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerJourneyCanvas } from "@/components/journey-modeler/CustomerJourneyCanvas";
import { PersonaManagement } from "@/components/journey-modeler/PersonaManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Map, 
  Users, 
  BarChart3, 
  Settings,
  Download,
  Share2,
  Eye,
  TrendingUp,
  Heart,
  Clock,
  Target
} from "lucide-react";

export default function JourneyModeler() {
  const [activeTab, setActiveTab] = useState("canvas");

  const journeyMetrics = [
    { label: "Total Touchpoints", value: "24", change: "+3", trend: "up" },
    { label: "Average Journey Time", value: "5.2 days", change: "-0.8", trend: "down" },
    { label: "Customer Satisfaction", value: "4.2/5", change: "+0.3", trend: "up" },
    { label: "Conversion Rate", value: "12.5%", change: "+2.1%", trend: "up" }
  ];

  return (
    <MainLayout pageTitle="Journey Modeler">
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Journey Modeler</h1>
            <p className="text-muted-foreground">Design and optimize customer experiences</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {journeyMetrics.map((metric, index) => (
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

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="canvas" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              Journey Canvas
            </TabsTrigger>
            <TabsTrigger value="personas" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Personas
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="canvas" className="mt-6">
            <CustomerJourneyCanvas />
          </TabsContent>
          
          <TabsContent value="personas" className="mt-6">
            <PersonaManagement />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Emotion Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Very Positive</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div className="w-1/4 h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Positive</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div className="w-2/5 h-full bg-green-400 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Neutral</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div className="w-1/5 h-full bg-gray-400 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Negative</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div className="w-1/8 h-full bg-orange-400 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">12%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Very Negative</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div className="w-1/32 h-full bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">3%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Journey Duration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">5.2 days</div>
                      <div className="text-sm text-muted-foreground">Average Journey Time</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Fastest Journey</span>
                        <span className="font-medium">2.1 days</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Slowest Journey</span>
                        <span className="font-medium">14.3 days</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Median Duration</span>
                        <span className="font-medium">4.8 days</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-medium text-blue-900 mb-2">High Friction Point Detected</div>
                    <p className="text-sm text-blue-700">
                      Account setup process is causing 45% drop-off rate. Consider implementing guided onboarding.
                    </p>
                    <Badge className="mt-2 bg-blue-600">High Priority</Badge>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="font-medium text-green-900 mb-2">Opportunity Identified</div>
                    <p className="text-sm text-green-700">
                      Customers highly satisfied with demo experience. Expand demo offerings to increase conversion.
                    </p>
                    <Badge className="mt-2 bg-green-600">Medium Priority</Badge>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="font-medium text-yellow-900 mb-2">Channel Optimization</div>
                    <p className="text-sm text-yellow-700">
                      Email channel underperforming. Review messaging and timing for better engagement.
                    </p>
                    <Badge className="mt-2 bg-yellow-600">Low Priority</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="font-medium mb-2">Streamline Onboarding</div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Reduce setup steps from 8 to 4 key actions
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Implementation: 2 weeks</Badge>
                      <Badge>ROI: High</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="font-medium mb-2">Personalize Email Content</div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Segment emails based on user persona and journey stage
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Implementation: 1 week</Badge>
                      <Badge>ROI: Medium</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="font-medium mb-2">Add Progress Indicators</div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Show users their progress through the journey
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Implementation: 3 days</Badge>
                      <Badge>ROI: Medium</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
