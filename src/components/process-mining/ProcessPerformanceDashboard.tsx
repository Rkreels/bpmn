import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResourceUtilization } from "./ResourceUtilization";
import { 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  DollarSign,
  Target,
  AlertCircle,
  CheckCircle,
  Download
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart, ScatterChart, Scatter } from "recharts";

export const ProcessPerformanceDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");
  const [selectedProcess, setSelectedProcess] = useState("all");

  const performanceMetrics = [
    { 
      name: "Average Duration", 
      value: "2.3 days", 
      trend: "down", 
      change: "-15%", 
      target: "2.0 days",
      status: "onTrack",
      icon: Clock 
    },
    { 
      name: "Throughput", 
      value: "1,250", 
      trend: "up", 
      change: "+8%", 
      target: "1,300",
      status: "onTrack",
      icon: Activity 
    },
    { 
      name: "Cost per Case", 
      value: "$125", 
      trend: "down", 
      change: "-12%", 
      target: "$110",
      status: "atRisk",
      icon: DollarSign 
    },
    { 
      name: "SLA Compliance", 
      value: "94.5%", 
      trend: "up", 
      change: "+3%", 
      target: "95%",
      status: "onTrack",
      icon: Target 
    }
  ];

  const durationTrendData = [
    { date: "Jan", avgDuration: 3.2, p50: 2.1, p90: 5.8, p95: 7.2 },
    { date: "Feb", avgDuration: 2.9, p50: 1.9, p90: 5.2, p95: 6.8 },
    { date: "Mar", avgDuration: 2.7, p50: 1.8, p90: 4.9, p95: 6.5 },
    { date: "Apr", avgDuration: 2.5, p50: 1.7, p90: 4.6, p95: 6.1 },
    { date: "May", avgDuration: 2.3, p50: 1.6, p90: 4.2, p95: 5.8 },
    { date: "Jun", avgDuration: 2.1, p50: 1.5, p90: 3.9, p95: 5.4 }
  ];

  const throughputData = [
    { date: "Week 1", started: 340, completed: 325, inProgress: 15 },
    { date: "Week 2", started: 380, completed: 350, inProgress: 45 },
    { date: "Week 3", started: 290, completed: 315, inProgress: 20 },
    { date: "Week 4", started: 420, completed: 385, inProgress: 80 }
  ];

  const activityPerformance = [
    { activity: "Create Order", avgDuration: 1.2, frequency: 1250, efficiency: 92 },
    { activity: "Approve Request", avgDuration: 4.5, frequency: 1180, efficiency: 76 },
    { activity: "Process Payment", avgDuration: 0.8, frequency: 1050, efficiency: 95 },
    { activity: "Quality Check", avgDuration: 2.1, frequency: 890, efficiency: 83 },
    { activity: "Ship Product", avgDuration: 1.5, frequency: 1020, efficiency: 88 }
  ];

  const slaPerformance = [
    { process: "Order Processing", sla: "24h", compliance: 96.5, violations: 12, avgDuration: "18h" },
    { process: "Invoice Handling", sla: "48h", compliance: 89.2, violations: 34, avgDuration: "52h" },
    { process: "Customer Support", sla: "4h", compliance: 98.1, violations: 5, avgDuration: "2.5h" },
    { process: "Refund Processing", sla: "72h", compliance: 92.8, violations: 18, avgDuration: "68h" }
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Time Range</label>
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Process</label>
                <Select value={selectedProcess} onValueChange={setSelectedProcess}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Processes</SelectItem>
                    <SelectItem value="order">Order Processing</SelectItem>
                    <SelectItem value="invoice">Invoice Handling</SelectItem>
                    <SelectItem value="support">Customer Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant={metric.status === "onTrack" ? "default" : "destructive"}>
                    {metric.status === "onTrack" ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                    {metric.status === "onTrack" ? "On Track" : "At Risk"}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{metric.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{metric.value}</span>
                    <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                      {metric.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Target: {metric.target}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Duration Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Duration Trends</CardTitle>
            <CardDescription>Process duration distribution over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={durationTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="p95" stackId="1" stroke="#fee2e2" fill="#fee2e2" />
                <Area type="monotone" dataKey="p90" stackId="1" stroke="#fecaca" fill="#fecaca" />
                <Area type="monotone" dataKey="p50" stackId="1" stroke="#fca5a5" fill="#fca5a5" />
                <Line type="monotone" dataKey="avgDuration" stroke="#dc2626" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Throughput Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Throughput Analysis</CardTitle>
            <CardDescription>Process volume and completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="started" fill="#3b82f6" name="Started" />
                <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                <Bar dataKey="inProgress" fill="#f59e0b" name="In Progress" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Performance Tables */}
      <Tabs defaultValue="activities" className="w-full">
        <TabsList>
          <TabsTrigger value="activities">Activity Performance</TabsTrigger>
          <TabsTrigger value="sla">SLA Compliance</TabsTrigger>
          <TabsTrigger value="resources">Resource Utilization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Activity Performance Breakdown</CardTitle>
              <CardDescription>Detailed performance metrics for each process activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Activity</th>
                      <th className="text-right p-2">Avg Duration</th>
                      <th className="text-right p-2">Frequency</th>
                      <th className="text-right p-2">Efficiency</th>
                      <th className="text-right p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityPerformance.map((activity, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{activity.activity}</td>
                        <td className="p-2 text-right">{activity.avgDuration}h</td>
                        <td className="p-2 text-right">{activity.frequency.toLocaleString()}</td>
                        <td className="p-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span>{activity.efficiency}%</span>
                            <div className="w-12 h-2 bg-muted rounded-full">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${activity.efficiency}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-2 text-right">
                          <Badge variant={activity.efficiency > 85 ? "default" : activity.efficiency > 70 ? "secondary" : "destructive"}>
                            {activity.efficiency > 85 ? "Good" : activity.efficiency > 70 ? "Fair" : "Poor"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sla">
          <Card>
            <CardHeader>
              <CardTitle>SLA Compliance Monitoring</CardTitle>
              <CardDescription>Track service level agreement compliance across processes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Process</th>
                      <th className="text-right p-2">SLA Target</th>
                      <th className="text-right p-2">Compliance</th>
                      <th className="text-right p-2">Violations</th>
                      <th className="text-right p-2">Avg Duration</th>
                      <th className="text-right p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slaPerformance.map((sla, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{sla.process}</td>
                        <td className="p-2 text-right">{sla.sla}</td>
                        <td className="p-2 text-right">{sla.compliance}%</td>
                        <td className="p-2 text-right">{sla.violations}</td>
                        <td className="p-2 text-right">{sla.avgDuration}</td>
                        <td className="p-2 text-right">
                          <Badge variant={sla.compliance > 95 ? "default" : sla.compliance > 90 ? "secondary" : "destructive"}>
                            {sla.compliance > 95 ? "Excellent" : sla.compliance > 90 ? "Good" : "Needs Attention"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <ResourceUtilization />
        </TabsContent>
      </Tabs>
    </div>
  );
};
