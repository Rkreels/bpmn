
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useProcessMiningData } from "@/hooks/useProcessMiningData";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import {
  Upload,
  FileText,
  Trash2,
  Download,
  Play,
  Database,
  Calendar,
  BarChart3
} from "lucide-react";

export const EventLogManager: React.FC = () => {
  const { eventLogs, uploadEventLog, deleteEventLog, runAnalysis, exportData } = useProcessMiningData();
  const { toast } = useToast();
  const { speakText } = useVoice();
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `${file.name} exceeds 50MB limit`,
          variant: "destructive"
        });
        return;
      }

      const validFormats = ['.csv', '.xes', '.json'];
      const isValidFormat = validFormats.some(format => file.name.toLowerCase().endsWith(format));
      
      if (!isValidFormat) {
        toast({
          title: "Invalid Format",
          description: `${file.name} must be CSV, XES, or JSON format`,
          variant: "destructive"
        });
        return;
      }

      // Simulate upload progress
      const logId = uploadEventLog(file);
      setUploadProgress(prev => ({ ...prev, [logId]: 0 }));

      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[logId] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            return prev;
          }
          return { ...prev, [logId]: currentProgress + 10 };
        });
      }, 200);

      toast({
        title: "Upload Started",
        description: `Uploading ${file.name}...`
      });
      
      speakText(`Uploading event log ${file.name}. This will be processed for analysis once upload completes.`);
    });

    // Reset input
    event.target.value = '';
  };

  const handleDeleteLog = (logId: string, logName: string) => {
    deleteEventLog(logId);
    toast({
      title: "Event Log Deleted",
      description: `${logName} has been removed`
    });
  };

  const handleAnalyzeLog = (logId: string, logName: string) => {
    runAnalysis(logId);
    toast({
      title: "Analysis Started",
      description: `Processing ${logName} for insights...`
    });
    speakText(`Starting analysis of ${logName}. This will discover process variants and identify performance bottlenecks.`);
  };

  const handleExportLog = (logId: string, logName: string) => {
    const filename = exportData("csv", `eventlog-${logName}`);
    toast({
      title: "Export Complete",
      description: `Event log exported as ${filename}`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-green-100 text-green-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Event Logs</CardTitle>
          <CardDescription>
            Upload your process event data in CSV, XES, or JSON format (max 50MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center gap-4">
              <div className="rounded-full border border-dashed p-6">
                <Upload className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Upload Event Logs</h3>
                <p className="text-sm text-muted-foreground">
                  Click to browse or drag and drop your event log files
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported formats: CSV, XES, JSON • Max size: 50MB
                </p>
              </div>
              <input
                type="file"
                multiple
                accept=".csv,.xes,.json"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Select Files
                  </span>
                </Button>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Logs List */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Event Logs</CardTitle>
          <CardDescription>Manage and analyze your process event data</CardDescription>
        </CardHeader>
        <CardContent>
          {eventLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Database className="h-12 w-12 mx-auto mb-4" />
              <p>No event logs uploaded yet</p>
              <p className="text-sm">Upload your first event log to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {eventLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4 hover:bg-muted/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium">{log.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {log.uploadDate}
                          </span>
                          <span>{log.fileSize}</span>
                          <span>{log.format.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                    </div>
                  </div>

                  {uploadProgress[log.id] !== undefined && uploadProgress[log.id] < 100 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Uploading...</span>
                        <span>{uploadProgress[log.id]}%</span>
                      </div>
                      <Progress value={uploadProgress[log.id]} />
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Cases:</span>
                      <span className="ml-2 font-medium">{log.cases.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Activities:</span>
                      <span className="ml-2 font-medium">{log.activities}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Variants:</span>
                      <span className="ml-2 font-medium">{log.variants}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      disabled={log.status !== "ready"}
                      onClick={() => handleAnalyzeLog(log.id, log.name)}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Analyze
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleExportLog(log.id, log.name)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                    >
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Visualize
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteLog(log.id, log.name)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
