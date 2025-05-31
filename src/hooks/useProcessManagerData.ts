
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export interface ProcessTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "active" | "draft" | "archived";
  createdDate: string;
  lastModified: string;
  author: string;
  version: string;
  elements: number;
  usage: number;
}

export interface ProcessProject {
  id: string;
  name: string;
  description: string;
  owner: string;
  status: "active" | "completed" | "on-hold";
  progress: number;
  dueDate: string;
  createdDate: string;
  team: string[];
  priority: "low" | "medium" | "high";
}

export interface ProcessMetric {
  id: string;
  name: string;
  value: string;
  trend: string;
  change: number;
  target: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export const useProcessManagerData = () => {
  const { toast } = useToast();
  
  const [templates, setTemplates] = useState<ProcessTemplate[]>([
    {
      id: "tmpl-001",
      name: "Order Processing Template",
      description: "Standard order processing flow with approvals",
      category: "Sales",
      status: "active",
      createdDate: "2024-01-15",
      lastModified: "2024-05-20",
      author: "John Smith",
      version: "2.1",
      elements: 15,
      usage: 45
    },
    {
      id: "tmpl-002",
      name: "Invoice Approval Process",
      description: "Multi-level invoice approval workflow",
      category: "Finance",
      status: "active",
      createdDate: "2024-02-10",
      lastModified: "2024-05-18",
      author: "Sarah Johnson",
      version: "1.8",
      elements: 12,
      usage: 32
    },
    {
      id: "tmpl-003",
      name: "Customer Onboarding",
      description: "Complete customer registration and verification process",
      category: "Customer Service",
      status: "draft",
      createdDate: "2024-05-01",
      lastModified: "2024-05-30",
      author: "Mike Davis",
      version: "1.0",
      elements: 18,
      usage: 8
    }
  ]);

  const [projects, setProjects] = useState<ProcessProject[]>([
    {
      id: "proj-001",
      name: "E-commerce Optimization",
      description: "Streamlining online order fulfillment process",
      owner: "Alice Brown",
      status: "active",
      progress: 75,
      dueDate: "2024-07-15",
      createdDate: "2024-04-01",
      team: ["Alice Brown", "Bob Wilson", "Carol Davis"],
      priority: "high"
    },
    {
      id: "proj-002",
      name: "HR Digital Transformation",
      description: "Digitizing manual HR processes",
      owner: "David Lee",
      status: "active",
      progress: 40,
      dueDate: "2024-08-30",
      createdDate: "2024-03-15",
      team: ["David Lee", "Emma Wilson"],
      priority: "medium"
    }
  ]);

  const [metrics, setMetrics] = useState<ProcessMetric[]>([
    {
      id: "metric-001",
      name: "Process Efficiency",
      value: "87%",
      trend: "up",
      change: 5.2,
      target: "90%"
    },
    {
      id: "metric-002",
      name: "Automation Rate",
      value: "65%",
      trend: "up",
      change: 8.1,
      target: "75%"
    },
    {
      id: "metric-003",
      name: "Compliance Score",
      value: "94%",
      trend: "stable",
      change: 0.5,
      target: "95%"
    },
    {
      id: "metric-004",
      name: "Cycle Time Reduction",
      value: "23%",
      trend: "up",
      change: 12.3,
      target: "30%"
    }
  ]);

  const createTemplate = useCallback((templateData: Partial<ProcessTemplate>) => {
    const newTemplate: ProcessTemplate = {
      id: `tmpl-${Date.now()}`,
      name: templateData.name || "New Template",
      description: templateData.description || "",
      category: templateData.category || "General",
      status: "draft",
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      author: "Current User",
      version: "1.0",
      elements: 0,
      usage: 0
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    toast({
      title: "Template Created",
      description: `${newTemplate.name} has been created successfully.`
    });
    
    return newTemplate;
  }, [toast]);

  const updateTemplate = useCallback((id: string, updates: Partial<ProcessTemplate>) => {
    setTemplates(prev => prev.map(template => 
      template.id === id 
        ? { ...template, ...updates, lastModified: new Date().toISOString().split('T')[0] }
        : template
    ));
    
    toast({
      title: "Template Updated",
      description: "Template has been updated successfully."
    });
  }, [toast]);

  const deleteTemplate = useCallback((id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
    toast({
      title: "Template Deleted",
      description: "Template has been removed from the repository."
    });
  }, [toast]);

  const createProject = useCallback((projectData: Partial<ProcessProject>) => {
    const newProject: ProcessProject = {
      id: `proj-${Date.now()}`,
      name: projectData.name || "New Project",
      description: projectData.description || "",
      owner: projectData.owner || "Current User",
      status: "active",
      progress: 0,
      dueDate: projectData.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdDate: new Date().toISOString().split('T')[0],
      team: projectData.team || ["Current User"],
      priority: projectData.priority || "medium"
    };
    
    setProjects(prev => [...prev, newProject]);
    toast({
      title: "Project Created",
      description: `${newProject.name} has been created successfully.`
    });
    
    return newProject;
  }, [toast]);

  const updateProject = useCallback((id: string, updates: Partial<ProcessProject>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
    
    toast({
      title: "Project Updated",
      description: "Project has been updated successfully."
    });
  }, [toast]);

  const validateProcess = useCallback((processData: any): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Basic validation rules
    if (!processData.name || processData.name.trim().length === 0) {
      errors.push("Process name is required");
    }

    if (!processData.elements || processData.elements.length === 0) {
      errors.push("Process must contain at least one element");
    }

    if (processData.elements) {
      const startEvents = processData.elements.filter((el: any) => el.type === "start-event");
      const endEvents = processData.elements.filter((el: any) => el.type === "end-event");
      
      if (startEvents.length === 0) {
        warnings.push("Process should have at least one start event");
      }
      
      if (endEvents.length === 0) {
        warnings.push("Process should have at least one end event");
      }
      
      if (startEvents.length > 1) {
        suggestions.push("Consider using a single start event for clarity");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions
    };
  }, []);

  const simulateProcess = useCallback(async (processId: string, simulationParams: any = {}) => {
    // Simulate process execution
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = {
          executionTime: Math.random() * 10 + 5, // 5-15 seconds
          throughput: Math.floor(Math.random() * 100) + 50, // 50-150 cases/hour
          bottlenecks: [
            { activity: "Approval Process", waitTime: 2.3, frequency: 0.8 },
            { activity: "Document Review", waitTime: 1.7, frequency: 0.6 }
          ],
          resourceUtilization: Math.random() * 30 + 70, // 70-100%
          costs: {
            total: Math.random() * 1000 + 500,
            perCase: Math.random() * 50 + 25
          }
        };
        
        resolve(results);
        toast({
          title: "Simulation Complete",
          description: "Process simulation has finished successfully."
        });
      }, 3000);
    });
  }, [toast]);

  const exportProcess = useCallback((processId: string, format: "bpmn" | "json" | "pdf" = "bpmn") => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `process-${processId}-${timestamp}.${format}`;
    
    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Process exported as ${filename}`
      });
    }, 1000);
    
    return filename;
  }, [toast]);

  return {
    // Data
    templates,
    projects,
    metrics,
    
    // Template operations
    createTemplate,
    updateTemplate,
    deleteTemplate,
    
    // Project operations
    createProject,
    updateProject,
    
    // Process operations
    validateProcess,
    simulateProcess,
    exportProcess
  };
};
