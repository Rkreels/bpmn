
import { useState, useCallback } from "react";

export interface ProcessCase {
  id: string;
  caseId: string;
  processName: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  status: "running" | "completed" | "failed";
  activities: ProcessActivity[];
  variant: string;
}

export interface ProcessActivity {
  id: string;
  name: string;
  timestamp: string;
  resource: string;
  duration: number;
  cost: number;
}

export interface EventLog {
  id: string;
  name: string;
  uploadDate: string;
  fileSize: string;
  cases: number;
  activities: number;
  variants: number;
  status: "processing" | "ready" | "error";
  format: "csv" | "xes" | "json";
}

export interface ProcessVariant {
  id: string;
  path: string[];
  frequency: number;
  avgDuration: number;
  cases: string[];
}

export interface Bottleneck {
  id: string;
  activityName: string;
  avgWaitTime: number;
  frequency: number;
  severity: "low" | "medium" | "high";
  recommendations: string[];
}

export const useProcessMiningData = () => {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([
    {
      id: "log1",
      name: "Order Processing Log",
      uploadDate: "2024-01-15",
      fileSize: "2.3 MB",
      cases: 1254,
      activities: 8,
      variants: 12,
      status: "ready",
      format: "csv"
    },
    {
      id: "log2", 
      name: "Invoice Handling Log",
      uploadDate: "2024-01-10",
      fileSize: "1.8 MB",
      cases: 876,
      activities: 6,
      variants: 8,
      status: "ready",
      format: "xes"
    }
  ]);

  const [processCases, setProcessCases] = useState<ProcessCase[]>([
    {
      id: "case1",
      caseId: "ORD-001",
      processName: "Order Processing",
      startTime: "2024-01-15T09:00:00Z",
      endTime: "2024-01-17T15:30:00Z",
      duration: 54.5,
      status: "completed",
      variant: "Standard Path",
      activities: [
        {
          id: "act1",
          name: "Create Order",
          timestamp: "2024-01-15T09:00:00Z",
          resource: "Sarah Johnson",
          duration: 0.5,
          cost: 15
        },
        {
          id: "act2",
          name: "Approve Order",
          timestamp: "2024-01-15T14:00:00Z",
          resource: "Mike Chen",
          duration: 2.0,
          cost: 60
        }
      ]
    }
  ]);

  const [variants, setVariants] = useState<ProcessVariant[]>([
    {
      id: "var1",
      path: ["Create Order", "Approve Order", "Process Payment", "Ship Order"],
      frequency: 45,
      avgDuration: 48.2,
      cases: ["ORD-001", "ORD-003", "ORD-007"]
    },
    {
      id: "var2",
      path: ["Create Order", "Review Order", "Approve Order", "Process Payment", "Ship Order"],
      frequency: 35,
      avgDuration: 72.1,
      cases: ["ORD-002", "ORD-005"]
    }
  ]);

  const [bottlenecks, setBottlenecks] = useState<Bottleneck[]>([
    {
      id: "btn1",
      activityName: "Credit Approval",
      avgWaitTime: 18.5,
      frequency: 89,
      severity: "high",
      recommendations: ["Automate basic credit checks", "Add more approval resources"]
    },
    {
      id: "btn2",
      activityName: "Quality Control",
      avgWaitTime: 8.2,
      frequency: 156,
      severity: "medium",
      recommendations: ["Implement quality gates earlier", "Train more QC staff"]
    }
  ]);

  const uploadEventLog = useCallback((file: File) => {
    const newLog: EventLog = {
      id: `log_${Date.now()}`,
      name: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      cases: Math.floor(Math.random() * 2000) + 500,
      activities: Math.floor(Math.random() * 15) + 5,
      variants: Math.floor(Math.random() * 20) + 5,
      status: "processing",
      format: file.name.endsWith('.csv') ? 'csv' : file.name.endsWith('.xes') ? 'xes' : 'json'
    };
    
    setEventLogs(prev => [...prev, newLog]);
    
    // Simulate processing
    setTimeout(() => {
      setEventLogs(prev => prev.map(log => 
        log.id === newLog.id ? { ...log, status: "ready" } : log
      ));
    }, 3000);
    
    return newLog.id;
  }, []);

  const deleteEventLog = useCallback((logId: string) => {
    setEventLogs(prev => prev.filter(log => log.id !== logId));
  }, []);

  const runAnalysis = useCallback((logId: string) => {
    console.log(`Running analysis for log: ${logId}`);
    // Generate new insights
    const newBottleneck: Bottleneck = {
      id: `btn_${Date.now()}`,
      activityName: "Data Validation",
      avgWaitTime: Math.random() * 20,
      frequency: Math.floor(Math.random() * 100),
      severity: Math.random() > 0.5 ? "medium" : "low",
      recommendations: ["Implement automated validation", "Reduce manual checks"]
    };
    setBottlenecks(prev => [...prev, newBottleneck]);
  }, []);

  const exportData = useCallback((format: "csv" | "pdf" | "json", dataType: string) => {
    console.log(`Exporting ${dataType} as ${format}`);
    // Implementation for actual export would go here
    return `${dataType}_export_${Date.now()}.${format}`;
  }, []);

  return {
    eventLogs,
    processCases,
    variants,
    bottlenecks,
    uploadEventLog,
    deleteEventLog,
    runAnalysis,
    exportData
  };
};
