
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart
} from "lucide-react";

export const ReportsDashboard: React.FC = () => {
  const { speakText } = useVoice();
  const [activeTab, setActiveTab] = useState("overview");

  const reportMetrics = [
    { label: "Total Reports", value: "156", change: "+12", trend: "up" },
    { label: "Scheduled Reports", value: "23", change: "+5", trend: "up" },
    { label: "Downloads This Month", value: "1,234", change: "+18%", trend: "up" },
    { label: "Active Dashboards", value: "45", change: "+7", trend: "up" }
  ];

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Reports and Analytics Dashboard. Generate comprehensive reports and insights from your process data.")}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate insights from your process data</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="builder">Report Builder</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Recent Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Process Performance Summary", "Compliance Audit Report", "Customer Journey Analysis"].map((report, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{report}</p>
                        <p className="text-sm text-muted-foreground">Generated 2 hours ago</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Popular Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Executive Dashboard", "Process Metrics", "Compliance Report"].map((template, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{template}</p>
                        <p className="text-sm text-muted-foreground">Used 15 times this month</p>
                      </div>
                      <Button variant="ghost" size="sm">Use Template</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Manage your automated report generation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No scheduled reports configured yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="builder" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Builder</CardTitle>
              <CardDescription>Create custom reports with drag-and-drop interface</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Report builder interface coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
