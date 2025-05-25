
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
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
  Activity,
  Eye,
  X
} from "lucide-react";

export const EventLogManager: React.FC = () => {
  const { speakText } = useVoice();
  const { toast } = useToast();
  const [selectedLog, setSelectedLog] = useState("order-processing");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isViewLogOpen, setIsViewLogOpen] = useState(false);
  const [selectedLogForView, setSelectedLogForView] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriteria, setFilterCriteria] = useState({
    status: "",
    source: "",
    timeframe: ""
  });

  const [eventLogs, setEventLogs] = useState([
    {
      id: "order-processing",
      name: "Order Processing Events",
      source: "ERP System",
      events: 125640,
      cases: 8934,
      timeframe: "Last 6 months",
      status: "active",
      lastUpdate: "2024-01-15T10:30:00Z",
      size: "2.3 GB",
      format: "CSV",
      quality: 94
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
      size: "1.8 GB",
      format: "JSON",
      quality: 87
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
      size: "1.2 GB",
      format: "XES",
      quality: 92
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
      size: "456 MB",
      format: "CSV",
      quality: 76
    }
  ]);

  const [filteredLogs, setFilteredLogs] = useState(eventLogs);

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

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredLogs(eventLogs);
      return;
    }
    
    const filtered = eventLogs.filter(log => 
      log.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredLogs(filtered);
    toast({
      title: "Search Applied",
      description: `Found ${filtered.length} matching event logs`
    });
    setIsSearchOpen(false);
  };

  const handleFilter = () => {
    let filtered = eventLogs;

    if (filterCriteria.status) {
      filtered = filtered.filter(log => log.status === filterCriteria.status);
    }
    if (filterCriteria.source) {
      filtered = filtered.filter(log => log.source.toLowerCase().includes(filterCriteria.source.toLowerCase()));
    }
    if (filterCriteria.timeframe) {
      filtered = filtered.filter(log => log.timeframe.includes(filterCriteria.timeframe));
    }

    setFilteredLogs(filtered);
    toast({
      title: "Filters Applied",
      description: `Showing ${filtered.length} of ${eventLogs.length} event logs`
    });
    setIsFilterOpen(false);
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing Data",
      description: "Updating event log information..."
    });
    
    setTimeout(() => {
      // Simulate data refresh
      setEventLogs(prev => prev.map(log => ({
        ...log,
        lastUpdate: new Date().toISOString()
      })));
      setFilteredLogs(prev => prev.map(log => ({
        ...log,
        lastUpdate: new Date().toISOString()
      })));
      
      toast({
        title: "Data Refreshed",
        description: "Event log information has been updated successfully."
      });
    }, 2000);
  };

  const handleImportLog = () => {
    setIsImportOpen(true);
    speakText("Opening event log import dialog");
  };

  const handleViewLog = (log: any) => {
    setSelectedLogForView(log);
    setIsViewLogOpen(true);
    speakText(`Viewing details for ${log.name}`);
  };

  const handleDownload = (log: any) => {
    toast({
      title: "Download Started",
      description: `Downloading ${log.name}...`
    });
    
    // Simulate file download
    setTimeout(() => {
      const data = {
        logName: log.name,
        events: log.events,
        cases: log.cases,
        exportDate: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${log.name.replace(/\s+/g, '-').toLowerCase()}-export.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Complete",
        description: `${log.name} has been downloaded successfully.`
      });
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "importing": return <Clock className="h-4 w-4 text-blue-500" />;
      case "error": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "importing": return "bg-blue-100 text-blue-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
              <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Search Event Logs</DialogTitle>
                    <DialogDescription>Search by log name or data source</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Input
                      placeholder="Enter search term..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsSearchOpen(false)}>Cancel</Button>
                    <Button onClick={handleSearch}>Search</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filter Event Logs</DialogTitle>
                    <DialogDescription>Filter logs by status, source, or timeframe</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Status</label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        value={filterCriteria.status}
                        onChange={(e) => setFilterCriteria(prev => ({ ...prev, status: e.target.value }))}
                      >
                        <option value="">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="importing">Importing</option>
                        <option value="error">Error</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Source</label>
                      <Input
                        placeholder="Filter by source..."
                        value={filterCriteria.source}
                        onChange={(e) => setFilterCriteria(prev => ({ ...prev, source: e.target.value }))}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Timeframe</label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        value={filterCriteria.timeframe}
                        onChange={(e) => setFilterCriteria(prev => ({ ...prev, timeframe: e.target.value }))}
                      >
                        <option value="">All Timeframes</option>
                        <option value="3 months">Last 3 months</option>
                        <option value="6 months">Last 6 months</option>
                        <option value="12 months">Last 12 months</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {
                      setFilterCriteria({ status: "", source: "", timeframe: "" });
                      setFilteredLogs(eventLogs);
                      setIsFilterOpen(false);
                    }}>Clear</Button>
                    <Button onClick={handleFilter}>Apply Filters</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>

              <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleImportLog}>
                    <Upload className="h-4 w-4 mr-2" />
                    Import Log
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Import Event Log</DialogTitle>
                    <DialogDescription>Upload a new event log for process mining analysis</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Log Name</label>
                      <Input placeholder="e.g., Purchase Order Process" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Data Source</label>
                      <Input placeholder="e.g., SAP ERP" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">File</label>
                      <Input type="file" accept=".csv,.xes,.json" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsImportOpen(false)}>Cancel</Button>
                    <Button onClick={() => {
                      toast({
                        title: "Import Started",
                        description: "Event log import has been initiated."
                      });
                      setIsImportOpen(false);
                    }}>Import Log</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                      <th className="text-center p-3">Status</th>
                      <th className="text-center p-3">Quality</th>
                      <th className="text-center p-3">Size</th>
                      <th className="text-center p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{log.name}</div>
                            <div className="text-sm text-muted-foreground">{log.timeframe}</div>
                          </div>
                        </td>
                        <td className="p-3">{log.source}</td>
                        <td className="p-3 text-right">{log.events.toLocaleString()}</td>
                        <td className="p-3 text-right">{log.cases.toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {getStatusIcon(log.status)}
                            <Badge className={getStatusColor(log.status)}>
                              {log.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-3 text-center">{log.quality}%</td>
                        <td className="p-3 text-center">{log.size}</td>
                        <td className="p-3 text-center">
                          <div className="flex gap-1 justify-center">
                            <Button variant="outline" size="sm" onClick={() => handleViewLog(log)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDownload(log)}>
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
              <CardTitle>Data Connections</CardTitle>
              <CardDescription>Configure and manage connections to your data sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Data Connections</h3>
                <p className="text-muted-foreground mb-4">Set up connections to automatically import event logs</p>
                <Button>Add Data Connection</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle>Live Event Monitoring</CardTitle>
              <CardDescription>Real-time view of incoming process events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-mono">{event.timestamp}</span>
                      <span className="font-medium">{event.case}</span>
                      <span>{event.activity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{event.resource}</span>
                      <Badge variant="outline">{event.duration}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Log Details Dialog */}
      <Dialog open={isViewLogOpen} onOpenChange={setIsViewLogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Event Log Details</DialogTitle>
            <DialogDescription>Comprehensive information about this event log</DialogDescription>
          </DialogHeader>
          {selectedLogForView && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Log Name</label>
                  <p className="text-lg">{selectedLogForView.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Data Source</label>
                  <p>{selectedLogForView.source}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Total Events</label>
                  <p className="text-xl font-bold">{selectedLogForView.events.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Total Cases</label>
                  <p className="text-xl font-bold">{selectedLogForView.cases.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Data Quality</label>
                  <p className="text-xl font-bold">{selectedLogForView.quality}%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">File Size</label>
                  <p>{selectedLogForView.size}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Format</label>
                  <p>{selectedLogForView.format}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Last Updated</label>
                <p>{new Date(selectedLogForView.lastUpdate).toLocaleString()}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewLogOpen(false)}>Close</Button>
            <Button onClick={() => {
              if (selectedLogForView) {
                handleDownload(selectedLogForView);
              }
            }}>Download Log</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
