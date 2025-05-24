
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from "recharts";
import { 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  Activity,
  DollarSign,
  Users,
  Target,
  Zap
} from "lucide-react";

export const ProcessIntelligenceAnalytics: React.FC = () => {
  const { speakText } = useVoice();
  const [selectedTimeframe, setSelectedTimeframe] = useState("last30days");

  const kpiData = [
    { name: "Process Efficiency", value: 87, target: 90, status: "warning" },
    { name: "SLA Compliance", value: 94, target: 95, status: "good" },
    { name: "Cost per Case", value: 125, target: 110, status: "alert" },
    { name: "Customer Satisfaction", value: 4.6, target: 4.5, status: "excellent" }
  ];

  const performanceTrends = [
    { date: "Jan", efficiency: 82, compliance: 89, cost: 140, satisfaction: 4.2 },
    { date: "Feb", efficiency: 84, compliance: 91, cost: 135, satisfaction: 4.3 },
    { date: "Mar", efficiency: 86, compliance: 93, cost: 130, satisfaction: 4.4 },
    { date: "Apr", efficiency: 87, compliance: 94, cost: 125, satisfaction: 4.6 },
    { date: "May", efficiency: 87, compliance: 94, cost: 125, satisfaction: 4.6 }
  ];

  const processBreakdown = [
    { name: "Order Processing", cases: 1250, avgTime: 2.3, efficiency: 92 },
    { name: "Customer Onboarding", cases: 340, avgTime: 4.1, efficiency: 88 },
    { name: "Issue Resolution", cases: 890, avgTime: 1.8, efficiency: 85 },
    { name: "Invoice Processing", cases: 450, avgTime: 3.2, efficiency: 90 },
    { name: "Product Returns", cases: 220, avgTime: 5.5, efficiency: 78 }
  ];

  const bottleneckData = [
    { process: "Credit Approval", impact: "High", delay: "2.3 days", cases: 450 },
    { process: "Manager Review", impact: "Medium", delay: "1.1 days", cases: 320 },
    { process: "Document Verification", impact: "High", delay: "3.2 days", cases: 180 },
    { process: "Quality Check", impact: "Low", delay: "0.8 days", cases: 890 }
  ];

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Process Intelligence Analytics. This overview dashboard provides key insights into your process performance, bottlenecks, and optimization opportunities. Monitor KPIs, track trends, and identify areas for improvement.")}
    >
      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">{kpi.name}</h3>
                <Badge variant={
                  kpi.status === "excellent" ? "default" :
                  kpi.status === "good" ? "secondary" :
                  kpi.status === "warning" ? "outline" : "destructive"
                }>
                  {kpi.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold">{kpi.value}{kpi.name.includes("Cost") ? "$" : kpi.name.includes("Satisfaction") ? "/5" : "%"}</div>
              <div className="text-xs text-muted-foreground">
                Target: {kpi.target}{kpi.name.includes("Cost") ? "$" : kpi.name.includes("Satisfaction") ? "/5" : "%"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Trends
            </CardTitle>
            <CardDescription>Key metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="efficiency" stroke="#8884d8" name="Efficiency %" />
                <Line type="monotone" dataKey="compliance" stroke="#82ca9d" name="Compliance %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Process Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Process Performance
            </CardTitle>
            <CardDescription>Performance by process type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cases" fill="#8884d8" name="Cases" />
                <Bar dataKey="efficiency" fill="#82ca9d" name="Efficiency %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Tabs defaultValue="bottlenecks" className="w-full">
        <TabsList>
          <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bottlenecks">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Process Bottlenecks
              </CardTitle>
              <CardDescription>Identified delays and constraints in your processes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Process Step</th>
                      <th className="text-right p-2">Impact</th>
                      <th className="text-right p-2">Avg Delay</th>
                      <th className="text-right p-2">Affected Cases</th>
                      <th className="text-right p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bottleneckData.map((bottleneck, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{bottleneck.process}</td>
                        <td className="p-2 text-right">
                          <Badge variant={
                            bottleneck.impact === "High" ? "destructive" :
                            bottleneck.impact === "Medium" ? "outline" : "secondary"
                          }>
                            {bottleneck.impact}
                          </Badge>
                        </td>
                        <td className="p-2 text-right">{bottleneck.delay}</td>
                        <td className="p-2 text-right">{bottleneck.cases}</td>
                        <td className="p-2 text-right">
                          <Button variant="outline" size="sm">
                            Optimize
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="optimization">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Optimization Opportunities
              </CardTitle>
              <CardDescription>AI-powered recommendations for process improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Automate Credit Approval</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Implement automated credit scoring to reduce manual review time by 70%
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600">Potential savings: $45K/year</span>
                    <span className="text-blue-600">Time reduction: 1.8 days</span>
                    <Button variant="outline" size="sm">Implement</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Parallel Processing</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Run document verification and quality checks in parallel
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600">Potential savings: $28K/year</span>
                    <span className="text-blue-600">Time reduction: 1.2 days</span>
                    <Button variant="outline" size="sm">Implement</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Smart Routing</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Route high-priority cases automatically based on customer tier
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600">Potential savings: $32K/year</span>
                    <span className="text-blue-600">SLA improvement: +8%</span>
                    <Button variant="outline" size="sm">Implement</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription>Advanced analytics and predictive insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      Performance Prediction
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Process efficiency likely to improve 5% next month based on current optimization efforts
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      Risk Alert
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Increased case volume detected - recommend scaling approval team by 2 people
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      Resource Optimization
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Sarah Chen handles 23% more cases efficiently - consider her best practices for training
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-purple-500" />
                      Cost Impact
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Reducing manual approvals could save $156K annually while improving customer satisfaction
                    </p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-blue-50">
                  <h4 className="font-medium mb-2">Weekly Insight</h4>
                  <p className="text-sm">
                    Your process performance has improved 12% over the last quarter. The main drivers are 
                    automated document processing (40% contribution) and streamlined approval workflows (35% contribution). 
                    Consider expanding automation to similar processes for additional gains.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
