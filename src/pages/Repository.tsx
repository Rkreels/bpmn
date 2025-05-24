
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RepositoryContent } from "@/components/repository/RepositoryContent";
import { AdvancedSearch } from "@/components/repository/AdvancedSearch";
import { ProcessHierarchy } from "@/components/repository/ProcessHierarchy";
import { 
  Database, 
  Search, 
  BarChart3, 
  Settings,
  Upload,
  Download,
  Share2,
  TrendingUp,
  FileText,
  Folder,
  Users,
  Clock
} from "lucide-react";

export default function Repository() {
  const [activeTab, setActiveTab] = useState("browse");

  const repositoryMetrics = [
    { label: "Total Assets", value: "156", change: "+12", trend: "up" },
    { label: "Active Processes", value: "89", change: "+5", trend: "up" },
    { label: "Contributors", value: "24", change: "+3", trend: "up" },
    { label: "This Month's Updates", value: "47", change: "+18", trend: "up" }
  ];

  const recentActivity = [
    {
      id: "1",
      action: "uploaded",
      item: "Customer Onboarding Process v2.1",
      user: "Sarah Chen",
      time: "2 hours ago",
      type: "process"
    },
    {
      id: "2", 
      action: "updated",
      item: "Invoice Processing Model",
      user: "Mike Rodriguez",
      time: "4 hours ago",
      type: "model"
    },
    {
      id: "3",
      action: "created",
      item: "Compliance Checklist Template",
      user: "Lisa Wang",
      time: "1 day ago",
      type: "template"
    },
    {
      id: "4",
      action: "archived",
      item: "Legacy Order Process",
      user: "System",
      time: "2 days ago",
      type: "process"
    }
  ];

  const popularAssets = [
    { name: "Order to Cash Process", views: 156, downloads: 23, type: "process" },
    { name: "Employee Onboarding Template", views: 134, downloads: 45, type: "template" },
    { name: "Approval Workflow Model", views: 98, downloads: 12, type: "model" },
    { name: "Compliance Framework", views: 87, downloads: 8, type: "framework" },
    { name: "Risk Assessment Process", views: 76, downloads: 15, type: "process" }
  ];

  return (
    <MainLayout pageTitle="Repository">
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Process Repository</h1>
            <p className="text-muted-foreground">Centralized library of processes, models, and templates</p>
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
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Manage
            </Button>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {repositoryMetrics.map((metric, index) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="browse" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Browse
                </TabsTrigger>
                <TabsTrigger value="search" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </TabsTrigger>
                <TabsTrigger value="hierarchy" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Hierarchy
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="browse" className="mt-6">
                <RepositoryContent />
              </TabsContent>
              
              <TabsContent value="search" className="mt-6">
                <AdvancedSearch />
                <div className="mt-6">
                  <RepositoryContent />
                </div>
              </TabsContent>
              
              <TabsContent value="hierarchy" className="mt-6">
                <ProcessHierarchy />
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Usage Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Downloads</span>
                            <span>1,234 this month</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Views</span>
                            <span>5,678 this month</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-secondary h-2 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Contributions</span>
                            <span>47 this month</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-accent h-2 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Asset Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">Processes</span>
                          </div>
                          <Badge variant="outline">89</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Folder className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Templates</span>
                          </div>
                          <Badge variant="outline">34</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-purple-500" />
                            <span className="text-sm">Models</span>
                          </div>
                          <Badge variant="outline">23</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4 text-orange-500" />
                            <span className="text-sm">Frameworks</span>
                          </div>
                          <Badge variant="outline">10</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="space-y-1">
                    <div className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.action} </span>
                      <span className="font-medium">{activity.item}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Popular Assets */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Popular Assets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {popularAssets.map((asset, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{asset.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {asset.views} views • {asset.downloads} downloads
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {asset.type}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Popular
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
