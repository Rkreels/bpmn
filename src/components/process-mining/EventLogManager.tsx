
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  Search, 
  Filter, 
  RefreshCw, 
  Download,
  FileText,
  Database,
  Eye,
  Trash2,
  Calendar,
  BarChart3
} from "lucide-react";

export const EventLogManager: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [eventLogs, setEventLogs] = useState([
    {
      id: "log-001",
      name: "Order Processing Q1 2024",
      source: "SAP System",
      size: "2.3 GB",
      events: "1,245,678",
      cases: "45,289",
      uploadDate: "2024-03-15",
      status: "Active",
      format: "CSV"
    },
    {
      id: "log-002", 
      name: "Customer Support Tickets",
      source: "ServiceNow",
      size: "856 MB",
      events: "567,234",
      cases: "23,145",
      uploadDate: "2024-03-10",
      status: "Processing",
      format: "XES"
    },
    {
      id: "log-003",
      name: "Invoice Processing 2024",
      source: "Oracle ERP",
      size: "1.8 GB",
      events: "892,456",
      cases: "34,567",
      uploadDate: "2024-02-28",
      status: "Active",
      format: "CSV"
    }
  ]);

  const handleSearch = () => {
    const filtered = eventLogs.filter(log => 
      log.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    toast({
      title: "Search Complete",
      description: `Found ${filtered.length} matching event logs`
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Applied",
      description: "Event logs filtered by selected criteria"
    });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data Refreshed",
        description: "Event log repository has been updated"
      });
    }, 2000);
  };

  const handleImportLog = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xes,.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const newLog = {
          id: `log-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ""),
          source: "Manual Upload",
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          events: "Processing...",
          cases: "Processing...",
          uploadDate: new Date().toISOString().split('T')[0],
          status: "Processing",
          format: file.name.split('.').pop()?.toUpperCase() || "Unknown"
        };
        
        setEventLogs(prev => [...prev, newLog]);
        toast({
          title: "Import Started",
          description: `${file.name} is being processed`
        });
      }
    };
    input.click();
  };

  const handleViewLog = (log: any) => {
    toast({
      title: "Opening Event Log",
      description: `Loading detailed view for ${log.name}`
    });
  };

  const handleDownloadLog = (log: any) => {
    toast({
      title: "Download Started", 
      description: `Downloading ${log.name} in ${log.format} format`
    });
  };

  const handleDeleteLog = (logId: string) => {
    setEventLogs(prev => prev.filter(log => log.id !== logId));
    toast({
      title: "Log Deleted",
      description: "Event log has been removed from repository"
    });
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search event logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button variant="outline" onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" onClick={handleFilter}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button onClick={handleImportLog}>
                <Upload className="h-4 w-4 mr-2" />
                Import Log
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Log Repository */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Event Log Repository
          </CardTitle>
          <CardDescription>
            Manage and analyze your process event logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold">{log.name}</h3>
                      <Badge variant={
                        log.status === "Active" ? "default" :
                        log.status === "Processing" ? "secondary" : "outline"
                      }>
                        {log.status}
                      </Badge>
                      <Badge variant="outline">{log.format}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-muted-foreground">
                      <div>
                        <div className="font-medium">Source</div>
                        <div>{log.source}</div>
                      </div>
                      <div>
                        <div className="font-medium">Size</div>
                        <div>{log.size}</div>
                      </div>
                      <div>
                        <div className="font-medium">Events</div>
                        <div>{log.events}</div>
                      </div>
                      <div>
                        <div className="font-medium">Cases</div>
                        <div>{log.cases}</div>
                      </div>
                      <div>
                        <div className="font-medium">Upload Date</div>
                        <div>{log.uploadDate}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleViewLog(log)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadLog(log)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analyze
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteLog(log.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-blue-500" />
              <h3 className="font-medium text-sm">Total Event Logs</h3>
            </div>
            <div className="text-2xl font-bold">{eventLogs.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-green-500" />
              <h3 className="font-medium text-sm">Total Events</h3>
            </div>
            <div className="text-2xl font-bold">2.7M</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-purple-500" />
              <h3 className="font-medium text-sm">Active Cases</h3>
            </div>
            <div className="text-2xl font-bold">103K</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              <h3 className="font-medium text-sm">Data Sources</h3>
            </div>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
