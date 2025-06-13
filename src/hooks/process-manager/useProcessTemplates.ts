
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

export const useProcessTemplates = () => {
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

  return {
    templates,
    createTemplate,
    updateTemplate,
    deleteTemplate
  };
};
