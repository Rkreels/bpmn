
import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { ProcessTemplate } from "@/hooks/process-manager/useProcessTemplates";
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
    status: "draft"
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
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      status: 'draft' as const,
      elements: 0,
      usage: 0
    };

    onCreateTemplate(templateToCreate);
    setNewTemplate({
      name: "",
      description: "",
      category: "General",
      status: "draft"
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
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
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
