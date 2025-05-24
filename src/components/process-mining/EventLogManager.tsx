
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Download, 
  FileText, 
  Search, 
  Filter, 
  Database,
  CheckCircle,
  AlertCircle,
  Clock,
  BarChart3,
  Settings,
  Trash2,
  Eye
} from "lucide-react";

export const EventLogManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const eventLogs = [
    {
      id: 1,
      name: "Order Processing Log",
      source: "ERP System",
      format: "XES",
      size: "125 MB",
      cases: 15420,
      events: 245680,
      dateRange: "2024-01-01 to 2024-06-30",
      status: "processed",
      quality: 96,
      lastAnalyzed: "2024-01-25"
    },
    {
      id: 2,
      name: "Invoice Handling",
      source: "Finance System",
      format: "CSV",
      size: "89 MB",
      cases: 12340,
      events: 185670,
      dateRange: "2024-01-01 to 2024-06-30",
      status: "processing",
      quality: 89,
      lastAnalyzed: "2024-01-24"
    },
    {
      id: 3,
      name: "Customer Support Tickets",
      source: "CRM System",
      format: "JSON",
      size: "67 MB",
      cases: 8950,
      events: 125430,
      dateRange: "2024-01-01 to 2024-06-30",
      status: "error",
      quality: 74,
      lastAnalyzed: "2024-01-20"
    },
    {
      id: 4,
      name: "Supply Chain Events",
      source: "SCM System",
      format: "XES",
      size: "234 MB",
      cases: 23450,
      events: 456780,
      dateRange: "2024-01-01 to 2024-06-30",
      status: "processed",
      quality: 92,
      lastAnalyzed: "2024-01-23"
    }
  ];

  const dataQualityMetrics = {
    completeness: 94,
    consistency: 87,
    accuracy: 91,
    timeliness: 96,
    overall: 92
  };

  const processingStats = {
    totalLogs: 24,
    totalCases: 245680,
    totalEvents: 2450000,
    storageUsed: "2.3 GB",
    lastUpdate: "2 hours ago"
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "processing":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processed":
        return "default";
      case "processing":
        return "secondary";
      case "error":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Logs</p>
                <p className="text-2xl font-bold">{processingStats.totalLogs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Cases</p>
                <p className="text-2xl font-bold">{processingStats.totalCases.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{(processingStats.totalEvents / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Database className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">{processingStats.storageUsed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="logs" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logs">Event Logs</TabsTrigger>
          <TabsTrigger value="upload">Upload & Import</TabsTrigger>
          <TabsTrigger value="quality">Data Quality</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Event Log Management</CardTitle>
                  <CardDescription>
                    Manage and analyze your process event logs
                  </CardDescription>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getStatusIcon(log.status)}
                        </div>
                        <div>
                          <h3 className="font-medium">{log.name}</h3>
                          <p className="text-sm text-muted-foreground">{log.source} • {log.format} • {log.size}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(log.status)}>
                          {log.status}
                        </Badge>
                        <Badge variant="outline">
                          Quality: {log.quality}%
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-2 bg-muted/20 rounded">
                        <div className="text-sm font-medium">{log.cases.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Cases</div>
                      </div>
                      <div className="text-center p-2 bg-muted/20 rounded">
                        <div className="text-sm font-medium">{log.events.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Events</div>
                      </div>
                      <div className="text-center p-2 bg-muted/20 rounded">
                        <div className="text-sm font-medium">{log.dateRange.split(" to ")[0]}</div>
                        <div className="text-xs text-muted-foreground">Start Date</div>
                      </div>
                      <div className="text-center p-2 bg-muted/20 rounded">
                        <div className="text-sm font-medium">{log.lastAnalyzed}</div>
                        <div className="text-xs text-muted-foreground">Last Analyzed</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Date Range: {log.dateRange}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload & Import Event Logs</CardTitle>
              <CardDescription>
                Import event logs from various sources and formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-8">
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Event Log Files</h3>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop files here, or click to browse
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <p>Supported formats: XES, CSV, JSON, XLSX</p>
                      <p>Maximum file size: 500MB</p>
                    </div>
                    <Button>
                      Select Files
                    </Button>
                  </div>
                </div>

                {/* Import Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Database className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                      <h3 className="font-medium mb-2">Database Import</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect to databases and import event data directly
                      </p>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <FileText className="h-8 w-8 text-green-600 mx-auto mb-3" />
                      <h3 className="font-medium mb-2">API Integration</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Set up real-time event streaming from APIs
                      </p>
                      <Button variant="outline" size="sm">
                        Setup
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Settings className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                      <h3 className="font-medium mb-2">System Connectors</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Pre-built connectors for popular systems
                      </p>
                      <Button variant="outline" size="sm">
                        Browse
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality">
          <Card>
            <CardHeader>
              <CardTitle>Data Quality Assessment</CardTitle>
              <CardDescription>
                Monitor and improve the quality of your event log data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Overall Quality Score */}
                <div className="text-center p-6 bg-muted/20 rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {dataQualityMetrics.overall}%
                  </div>
                  <p className="text-muted-foreground">Overall Data Quality Score</p>
                  <Progress value={dataQualityMetrics.overall} className="mt-4 max-w-md mx-auto" />
                </div>

                {/* Quality Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold mb-1">{dataQualityMetrics.completeness}%</div>
                    <p className="text-sm text-muted-foreground mb-2">Completeness</p>
                    <Progress value={dataQualityMetrics.completeness} />
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold mb-1">{dataQualityMetrics.consistency}%</div>
                    <p className="text-sm text-muted-foreground mb-2">Consistency</p>
                    <Progress value={dataQualityMetrics.consistency} />
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold mb-1">{dataQualityMetrics.accuracy}%</div>
                    <p className="text-sm text-muted-foreground mb-2">Accuracy</p>
                    <Progress value={dataQualityMetrics.accuracy} />
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold mb-1">{dataQualityMetrics.timeliness}%</div>
                    <p className="text-sm text-muted-foreground mb-2">Timeliness</p>
                    <Progress value={dataQualityMetrics.timeliness} />
                  </div>
                </div>

                {/* Quality Issues */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Identified Issues</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <div>
                          <p className="font-medium">Missing Timestamps</p>
                          <p className="text-sm text-muted-foreground">234 events lack proper timestamp information</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Fix</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <div>
                          <p className="font-medium">Inconsistent Activity Names</p>
                          <p className="text-sm text-muted-foreground">67 activities have naming inconsistencies</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Review</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="font-medium">Data Validation Passed</p>
                          <p className="text-sm text-muted-foreground">All required fields are present</p>
                        </div>
                      </div>
                      <Badge variant="default">Passed</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Event Log Settings</CardTitle>
              <CardDescription>
                Configure processing and storage settings for event logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Processing Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Auto-processing</label>
                      <p className="text-sm text-muted-foreground">
                        Automatically process uploaded event logs
                      </p>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Data Retention</label>
                      <p className="text-sm text-muted-foreground">
                        How long to keep processed event logs
                      </p>
                      <Button variant="outline" size="sm">Set Policy</Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quality Thresholds</label>
                      <p className="text-sm text-muted-foreground">
                        Minimum quality requirements for processing
                      </p>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Export Formats</label>
                      <p className="text-sm text-muted-foreground">
                        Default formats for data export
                      </p>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
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
