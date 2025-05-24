
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  Users, 
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart as RechartsLineChart, Line, Pie } from "recharts";

export const ProcessIntelligenceAnalytics: React.FC = () => {
  const kpiData = [
    { name: "Process Efficiency", value: 87, trend: "up", change: "+12%" },
    { name: "Automation Rate", value: 64, trend: "up", change: "+8%" },
    { name: "Compliance Score", value: 92, trend: "down", change: "-3%" },
    { name: "Cost Reduction", value: 78, trend: "up", change: "+15%" }
  ];

  const processPerformanceData = [
    { month: "Jan", avgDuration: 3.2, cases: 1240, efficiency: 82 },
    { month: "Feb", avgDuration: 2.9, cases: 1350, efficiency: 85 },
    { month: "Mar", avgDuration: 2.7, cases: 1420, efficiency: 88 },
    { month: "Apr", avgDuration: 2.5, cases: 1380, efficiency: 90 },
    { month: "May", avgDuration: 2.3, cases: 1450, efficiency: 92 },
    { month: "Jun", avgDuration: 2.1, cases: 1520, efficiency: 94 }
  ];

  const bottleneckData = [
    { name: "Approval Queue", value: 35, color: "#ef4444" },
    { name: "Document Review", value: 28, color: "#f59e0b" },
    { name: "System Integration", value: 20, color: "#eab308" },
    { name: "Manual Entry", value: 17, color: "#22c55e" }
  ];

  const processIssues = [
    { type: "Critical", count: 12, description: "SLA violations detected", icon: AlertTriangle, color: "destructive" },
    { type: "Warning", count: 28, description: "Performance degradation", icon: TrendingDown, color: "warning" },
    { type: "Info", count: 45, description: "Optimization opportunities", icon: TrendingUp, color: "secondary" },
    { type: "Resolved", count: 156, description: "Issues resolved this month", icon: CheckCircle, color: "success" }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-bold">{kpi.value}%</span>
                    <Badge variant={kpi.trend === "up" ? "default" : "destructive"} className="text-xs">
                      {kpi.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {kpi.change}
                    </Badge>
                  </div>
                </div>
                <div className="w-16 h-16">
                  <Progress value={kpi.value} className="rotate-90 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Process Performance Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Process Performance Trends
            </CardTitle>
            <CardDescription>
              Track key performance indicators over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="duration" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="duration">Duration</TabsTrigger>
                <TabsTrigger value="volume">Volume</TabsTrigger>
                <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
              </TabsList>
              
              <TabsContent value="duration" className="mt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={processPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgDuration" stroke="#8884d8" strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="volume" className="mt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={processPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cases" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="efficiency" className="mt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={processPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="efficiency" stroke="#ffc658" strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Process Bottlenecks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Process Bottlenecks
            </CardTitle>
            <CardDescription>
              Identify areas causing delays in your processes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Pie
                  dataKey="value"
                  data={bottleneckData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {bottleneckData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            
            <div className="mt-4 space-y-2">
              {bottleneckData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Process Issues & Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Process Issues & Alerts
            </CardTitle>
            <CardDescription>
              Monitor and track process issues in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processIssues.map((issue, index) => {
                const Icon = issue.icon;
                return (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className={`p-2 rounded-full ${
                      issue.color === "destructive" ? "bg-red-100 text-red-600" :
                      issue.color === "warning" ? "bg-yellow-100 text-yellow-600" :
                      issue.color === "success" ? "bg-green-100 text-green-600" :
                      "bg-blue-100 text-blue-600"
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{issue.type}</span>
                        <Badge variant="outline">{issue.count}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{issue.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Process Intelligence Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>
            Intelligent recommendations for process optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Efficiency Opportunity</span>
              </div>
              <p className="text-sm text-blue-700">
                Automate approval process to reduce average duration by 35%
              </p>
              <Badge className="mt-2 bg-blue-600">High Impact</Badge>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Resource Optimization</span>
              </div>
              <p className="text-sm text-green-700">
                Redistribute workload to reduce bottlenecks in Q3
              </p>
              <Badge className="mt-2 bg-green-600">Medium Impact</Badge>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-900">Compliance Alert</span>
              </div>
              <p className="text-sm text-yellow-700">
                Review SLA thresholds for critical processes
              </p>
              <Badge className="mt-2 bg-yellow-600">Low Impact</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
