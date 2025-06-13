
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

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

export const useProcessProjects = () => {
  const { toast } = useToast();

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

  return {
    projects,
    createProject,
    updateProject
  };
};
