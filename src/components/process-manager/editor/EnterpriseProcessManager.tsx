
import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  Plus, 
  Save, 
  Copy, 
  Trash2, 
  Edit, 
  Download, 
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Building,
  Tag
} from "lucide-react";

interface ProcessTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  industry: string;
  complexity: 'simple' | 'medium' | 'complex';
  status: 'draft' | 'active' | 'archived';
  version: string;
  author: string;
  created: string;
  modified: string;
  elements: any[];
  connections: any[];
  tags: string[];
}

interface EnterpriseProcessManagerProps {
  onLoadTemplate: (templateId: string) => void;
  onCreateTemplate: (template: Partial<ProcessTemplate>) => void;
  onUpdateTemplate: (templateId: string, template: Partial<ProcessTemplate>) => void;
  onDeleteTemplate: (templateId: string) => void;
}

export const EnterpriseProcessManager: React.FC<EnterpriseProcessManagerProps> = ({
  onLoadTemplate,
  onCreateTemplate,
  onUpdateTemplate,
  onDeleteTemplate
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ProcessTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState<Partial<ProcessTemplate>>({
    name: "",
    description: "",
    category: "General",
    industry: "General",
    complexity: "medium",
    tags: []
  });

  const { toast } = useToast();
  const { speakText, isVoiceEnabled } = useVoice();

  const categories = [
    "Customer Management",
    "Operations", 
    "Human Resources",
    "IT Operations",
    "Finance & Procurement",
    "Financial Services",
    "Manufacturing",
    "Healthcare",
    "Supply Chain",
    "General"
  ];

  const industries = [
    "Financial Services",
    "Banking",
    "Healthcare",
    "Manufacturing",
    "Retail",
    "Technology",
    "Insurance",
    "Government",
    "Education",
    "General"
  ];

  const handleCreateTemplate = useCallback(() => {
    if (!newTemplate.name || !newTemplate.description) {
      toast({
        title: "Validation Error",
        description: "Name and description are required",
        variant: "destructive"
      });
      return;
    }

    const templateToCreate = {
      ...newTemplate,
      id: `custom-${Date.now()}`,
      version: "1.0",
      author: "Current User",
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      status: 'draft' as const,
      elements: [],
      connections: []
    };

    onCreateTemplate(templateToCreate);
    setNewTemplate({
      name: "",
      description: "",
      category: "General",
      industry: "General", 
      complexity: "medium",
      tags: []
    });
    setIsCreating(false);

    toast({
      title: "Template Created",
      description: `Successfully created ${templateToCreate.name}`
    });

    if (isVoiceEnabled) {
      speakText(`Created new process template ${templateToCreate.name}. You can now design your process workflow.`);
    }
  }, [newTemplate, onCreateTemplate, toast, isVoiceEnabled, speakText]);

  const handleDuplicateTemplate = useCallback((template: ProcessTemplate) => {
    const duplicated = {
      ...template,
      id: `${template.id}-copy-${Date.now()}`,
      name: `${template.name} (Copy)`,
      version: "1.0",
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      status: 'draft' as const
    };

    onCreateTemplate(duplicated);
    
    toast({
      title: "Template Duplicated",
      description: `Created copy of ${template.name}`
    });
  }, [onCreateTemplate, toast]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'draft': return <Edit className="h-4 w-4 text-yellow-500" />;
      case 'archived': return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800'; 
      case 'complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enterprise Process Manager</h2>
          <p className="text-muted-foreground">Create, manage, and deploy business process templates</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      {/* Create/Edit Template Form */}
      {(isCreating || editingTemplate) && (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? "Create New Template" : "Edit Template"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Template Name *</label>
                <Input
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter template name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select 
                  value={newTemplate.category} 
                  onValueChange={(value) => setNewTemplate(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Industry</label>
                <Select 
                  value={newTemplate.industry} 
                  onValueChange={(value) => setNewTemplate(prev => ({ ...prev, industry: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(ind => (
                      <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Complexity</label>
                <Select 
                  value={newTemplate.complexity} 
                  onValueChange={(value: 'simple' | 'medium' | 'complex') => setNewTemplate(prev => ({ ...prev, complexity: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="complex">Complex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Description *</label>
              <Textarea
                value={newTemplate.description}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the purpose and scope of this process template"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateTemplate}>
                <Save className="h-4 w-4 mr-2" />
                {isCreating ? "Create Template" : "Save Changes"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsCreating(false);
                  setEditingTemplate(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Upload className="h-6 w-6 mb-2" />
              Import BPMN
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Download className="h-6 w-6 mb-2" />
              Export All
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Copy className="h-6 w-6 mb-2" />
              Bulk Copy
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <CheckCircle className="h-6 w-6 mb-2" />
              Validate All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Process Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Active Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">847</p>
                <p className="text-sm text-muted-foreground">Process Instances</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">2.3h</p>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
