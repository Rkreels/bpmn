
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  Database, 
  Upload, 
  Download, 
  FileText, 
  Filter,
  Search,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Activity
} from "lucide-react";

export const EventLogManager: React.FC = () => {
  const { speakText } = useVoice();
  const [selectedLog, setSelectedLog] = useState("order-processing");

  const eventLogs = [
    {
      id: "order-processing",
      name: "Order Processing Events",
      source: "ERP System",
      events: 125640,
      cases: 8934,
      timeframe: "Last 6 months",
      status: "active",
      lastUpdate: "2024-01-15T10:30:00Z",
      size: "2.3 GB"
    },
    {
      id: "customer-support",
      name: "Customer Support Tickets",
      source: "ServiceNow",
      events: 89234,
      cases: 12456,
      timeframe: "Last 3 months",
      status: "active",
      lastUpdate: "2024-01-14T15:45:00Z",
      size: "1.8 GB"
    },
    {
      id: "invoice-processing",
      name: "Invoice Processing Log",
      source: "Finance System",
      events: 67890,
      cases: 5678,
      timeframe: "Last 12 months",
      status: "importing",
      lastUpdate: "2024-01-13T09:20:00Z",
      size: "1.2 GB"
    },
    {
      id: "hr-onboarding",
      name: "HR Onboarding Process",
      source: "Workday",
      events: 23456,
      cases: 890,
      timeframe: "Last 6 months",
      status: "error",
      lastUpdate: "2024-01-12T14:10:00Z",
      size: "456 MB"
    }
  ];

  const dataQualityMetrics = [
    { metric: "Data Completeness", value: 94, status: "good" },
    { metric: "Timestamp Accuracy", value: 98, status: "excellent" },
    { metric: "Activity Coverage", value: 89, status: "good" },
    { metric: "Case Completeness", value: 87, status: "warning" }
  ];

  const recentEvents = [
    { timestamp: "2024-01-15 14:23:45", case: "ORD-123456", activity: "Order Received", resource: "System", duration: "0.1s" },
    { timestamp: "2024-01-15 14:23:47", case: "ORD-123456", activity: "Credit Check Started", resource: "John Doe", duration: "2.3s" },
    { timestamp: "2024-01-15 14:26:12", case: "ORD-123456", activity: "Credit Check Completed", resource: "System", duration: "145s" },
    { timestamp: "2024-01-15 14:26:15", case: "ORD-123457", activity: "Order Received", resource: "System", duration: "0.1s" },
    { timestamp: "2024-01-15 14:26:45", case: "ORD-123456", activity: "Inventory Check", resource: "System", duration: "30s" }
  ];

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Event Log Manager. Import, manage, and analyze event logs from your business systems. Monitor data quality, configure connections, and ensure clean data for accurate process mining analysis.")}
    >
      {/* Log Management Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">Event Log Management</h2>
              <Badge variant="outline">
                {eventLogs.length} data sources
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Import Log
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Quality Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {dataQualityMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">{metric.metric}</h3>
                <Badge variant={
                  metric.status === "excellent" ? "default" :
                  metric.status === "good" ? "secondary" :
                  metric.status === "warning" ? "outline" : "destructive"
                }>
                  {metric.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold">{metric.value}%</div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${
                    metric.status === "excellent" ? "bg-green-500" :
                    metric.status === "good" ? "bg-blue-500" :
                    metric.status === "warning" ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Event Logs Table */}
      <Tabs defaultValue="logs" className="w-full">
        <TabsList>
          <TabsTrigger value="logs">Event Logs</TabsTrigger>
          <TabsTrigger value="connections">Data Connections</TabsTrigger>
          <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
        </TabsList>
        
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Event Log Repository
              </CardTitle>
              <CardDescription>Manage your imported event logs and data sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Log Name</th>
                      <th className="text-left p-3">Source</th>
                      <th className="text-right p-3">Events</th>
                      <th className="text-right p-3">Cases</th>
                      <th className="text-right p-3">Timeframe</th>
                      <th className="text-right p-3">Status</th>
                      <th className="text-right p-3">Size</th>
                      <th className="text-right p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventLogs.map((log) => (
                      <tr key={log.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{log.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Updated {new Date(log.lastUpdate).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">{log.source}</td>
                        <td className="p-3 text-right">{log.events.toLocaleString()}</td>
                        <td className="p-3 text-right">{log.cases.toLocaleString()}</td>
                        <td className="p-3 text-right">{log.timeframe}</td>
                        <td className="p-3 text-right">
                          <Badge variant={
                            log.status === "active" ? "default" :
                            log.status === "importing" ? "secondary" : "destructive"
                          }>
                            {log.status === "active" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {log.status === "importing" && <Clock className="h-3 w-3 mr-1" />}
                            {log.status === "error" && <AlertCircle className="h-3 w-3 mr-1" />}
                            {log.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-right">{log.size}</td>
                        <td className="p-3 text-right">
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="connections">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Data Source Connections
              </CardTitle>
              <CardDescription>Configure and manage connections to your business systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">SAP ERP</h4>
                    <Badge variant="default">Connected</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Real-time connection to SAP for order and finance processes
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Last sync: 2 minutes ago
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">ServiceNow</h4>
                    <Badge variant="default">Connected</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Customer support tickets and incident management
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Last sync: 15 minutes ago
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Workday</h4>
                    <Badge variant="secondary">Disconnected</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    HR processes and employee onboarding
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Configure connection
                  </div>
                </div>
                
                <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 cursor-pointer flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="font-medium">Add Connection</div>
                    <div className="text-sm text-muted-foreground">Connect new data source</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Live Event Monitoring
              </CardTitle>
              <CardDescription>Real-time stream of incoming events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live stream active</span>
                  <Badge variant="outline">142 events/min</Badge>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Pause Stream
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Timestamp</th>
                      <th className="text-left p-2">Case ID</th>
                      <th className="text-left p-2">Activity</th>
                      <th className="text-left p-2">Resource</th>
                      <th className="text-right p-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEvents.map((event, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50 font-mono text-xs">
                        <td className="p-2">{event.timestamp}</td>
                        <td className="p-2">{event.case}</td>
                        <td className="p-2">{event.activity}</td>
                        <td className="p-2">{event.resource}</td>
                        <td className="p-2 text-right">{event.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="font-semibold">1,247</div>
                    <div className="text-muted-foreground">Events today</div>
                  </div>
                  <div>
                    <div className="font-semibold">156</div>
                    <div className="text-muted-foreground">Active cases</div>
                  </div>
                  <div>
                    <div className="font-semibold">98.7%</div>
                    <div className="text-muted-foreground">Data quality</div>
                  </div>
                  <div>
                    <div className="font-semibold">2.3s</div>
                    <div className="text-muted-foreground">Avg latency</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
