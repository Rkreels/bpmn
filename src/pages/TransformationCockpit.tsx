
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TransformationRoadmap } from "@/components/transformation/TransformationRoadmap";
import { 
  Zap, 
  Target, 
  BarChart3, 
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings,
  Download,
  Plus
} from "lucide-react";

export default function TransformationCockpit() {
  const [activeTab, setActiveTab] = useState("roadmap");

  const dashboardMetrics = [
    { label: "Active Initiatives", value: "12", change: "+2", trend: "up", icon: Target },
    { label: "Total Investment", value: "$2.4M", change: "+15%", trend: "up", icon: DollarSign },
    { label: "Expected ROI", value: "285%", change: "+12%", trend: "up", icon: TrendingUp },
    { label: "On Track", value: "9/12", change: "75%", trend: "stable", icon: CheckCircle }
  ];

  const portfolioHealth = [
    { phase: "Planning", count: 3, color: "bg-blue-500" },
    { phase: "In Progress", count: 5, color: "bg-yellow-500" },
    { phase: "Testing", count: 2, color: "bg-orange-500" },
    { phase: "Completed", count: 2, color: "bg-green-500" },
    { phase: "On Hold", count: 0, color: "bg-red-500" }
  ];

  const riskAssessment = [
    { 
      initiative: "Procurement Automation",
      risk: "Medium",
      issues: ["Resource availability", "Technical complexity"],
      mitigation: "Additional training planned"
    },
    {
      initiative: "Customer Service Digital",
      risk: "Low", 
      issues: ["Vendor delays"],
      mitigation: "Alternative vendors identified"
    },
    {
      initiative: "Financial Reporting",
      risk: "High",
      issues: ["Data quality", "User adoption"],
      mitigation: "Enhanced testing phase"
    }
  ];

  const keyMilestones = [
    {
      date: "2024-02-15",
      title: "Financial Reporting Go-Live",
      initiative: "Financial Reporting Modernization",
      status: "upcoming"
    },
    {
      date: "2024-03-01",
      title: "Customer Service Phase 1",
      initiative: "Customer Service Digital Transformation", 
      status: "upcoming"
    },
    {
      date: "2024-03-15",
      title: "Procurement Automation Pilot",
      initiative: "Procurement Process Automation",
      status: "upcoming"
    }
  ];

  return (
    <MainLayout pageTitle="Transformation Cockpit">
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Zap className="h-8 w-8" />
              Transformation Cockpit
            </h1>
            <p className="text-muted-foreground">Monitor and manage your digital transformation portfolio</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Initiative
            </Button>
          </div>
        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon className="h-8 w-8 text-primary/60" />
                      <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="roadmap" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Roadmap
                </TabsTrigger>
                <TabsTrigger value="portfolio" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Portfolio
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Performance
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Resources
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="roadmap" className="mt-6">
                <TransformationRoadmap />
              </TabsContent>
              
              <TabsContent value="portfolio" className="mt-6">
                <div className="space-y-6">
                  {/* Portfolio Health */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Portfolio Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {portfolioHealth.map((phase, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full ${phase.color}`} />
                              <span className="font-medium">{phase.phase}</span>
                            </div>
                            <Badge variant="outline">{phase.count} initiatives</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Assessment */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {riskAssessment.map((item, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{item.initiative}</h4>
                              <Badge variant={
                                item.risk === "High" ? "destructive" :
                                item.risk === "Medium" ? "secondary" : "outline"
                              }>
                                {item.risk} Risk
                              </Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium">Issues: </span>
                                <span className="text-muted-foreground">{item.issues.join(", ")}</span>
                              </div>
                              <div>
                                <span className="font-medium">Mitigation: </span>
                                <span className="text-muted-foreground">{item.mitigation}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">Performance Analytics</h3>
                      <p className="text-muted-foreground">
                        Detailed performance metrics and analytics for transformation initiatives.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resource Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">Resource Allocation</h3>
                      <p className="text-muted-foreground">
                        Manage team assignments, capacity planning, and resource optimization.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Milestones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {keyMilestones.map((milestone, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <div className="font-medium text-sm">{milestone.title}</div>
                    </div>
                    <div className="text-xs text-muted-foreground ml-4">
                      {new Date(milestone.date).toLocaleDateString()} • {milestone.initiative}
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Milestones
                </Button>
              </CardContent>
            </Card>

            {/* Alerts & Issues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Alerts & Issues
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Resource Conflict</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Sarah Chen scheduled on 2 initiatives simultaneously next week
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Milestone Due</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Financial Reporting go-live in 5 days
                  </p>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  New Initiative
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Resources
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Portfolio Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
