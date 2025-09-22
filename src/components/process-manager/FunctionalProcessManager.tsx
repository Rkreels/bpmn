import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Play, 
  Pause,
  Edit,
  Trash2,
  Copy,
  Share2,
  Users,
  Clock,
  Activity,
  BarChart3,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LocalStorageService, ProcessModel } from '@/services/localStorageService';

export const FunctionalProcessManager: React.FC = () => {
  const { toast } = useToast();
  const [processes, setProcesses] = useState<ProcessModel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedProcess, setSelectedProcess] = useState<ProcessModel | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Form state
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    category: string;
    status: ProcessModel['status'];
    version: string;
    owner: string;
    collaborators: string[];
    properties: {
      estimatedDuration: string;
      complexity: string;
      automation: string;
    };
    tags: string[];
  }>({
    name: '',
    description: '',
    category: '',
    status: 'draft',
    version: '1.0',
    owner: '',
    collaborators: [],
    properties: {
      estimatedDuration: '',
      complexity: 'low',
      automation: 'none'
    },
    tags: []
  });

  const [newTag, setNewTag] = useState('');
  const [newCollaborator, setNewCollaborator] = useState('');

  // Load processes on component mount
  useEffect(() => {
    loadProcesses();
  }, []);

  const loadProcesses = () => {
    const loadedProcesses = LocalStorageService.getAll<ProcessModel>('processes');
    setProcesses(loadedProcesses);
  };

  const filteredProcesses = processes.filter(process => {
    const matchesSearch = process.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         process.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         process.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || process.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || process.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getProcessesByTab = () => {
    switch (activeTab) {
      case 'draft': return filteredProcesses.filter(p => p.status === 'draft');
      case 'review': return filteredProcesses.filter(p => p.status === 'review');
      case 'approved': return filteredProcesses.filter(p => p.status === 'approved');
      case 'published': return filteredProcesses.filter(p => p.status === 'published');
      default: return filteredProcesses;
    }
  };

  const handleCreateProcess = () => {
    try {
      const currentUser = 'current.user@company.com'; // In real app, get from auth context
      const newProcess = LocalStorageService.create<ProcessModel>('processes', {
        ...formData,
        owner: currentUser,
        elements: [],
        connections: []
      });
      setProcesses(prev => [...prev, newProcess]);
      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: "Process Created",
        description: `${newProcess.name} has been successfully created.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create process. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateProcess = () => {
    if (!selectedProcess) return;
    
    try {
      const updatedProcess = LocalStorageService.update<ProcessModel>('processes', selectedProcess.id, {
        ...formData,
        properties: {
          estimatedDuration: formData.properties.estimatedDuration,
          complexity: formData.properties.complexity,
          automation: formData.properties.automation
        }
      });
      if (updatedProcess) {
        setProcesses(prev => prev.map(p => p.id === selectedProcess.id ? updatedProcess : p));
        setIsEditDialogOpen(false);
        setSelectedProcess(null);
        resetForm();
        toast({
          title: "Process Updated",
          description: `${updatedProcess.name} has been successfully updated.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update process. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProcess = (processId: string) => {
    try {
      const success = LocalStorageService.delete('processes', processId);
      if (success) {
        setProcesses(prev => prev.filter(p => p.id !== processId));
        toast({
          title: "Process Deleted",
          description: "Process has been successfully deleted.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete process. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDuplicateProcess = (processId: string) => {
    const originalProcess = processes.find(p => p.id === processId);
    if (!originalProcess) return;

    try {
      const duplicatedProcess = LocalStorageService.create<ProcessModel>('processes', {
        ...originalProcess,
        name: `${originalProcess.name} (Copy)`,
        status: 'draft',
        version: '1.0'
      });
      setProcesses(prev => [...prev, duplicatedProcess]);
      toast({
        title: "Process Duplicated",
        description: `${duplicatedProcess.name} has been created.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate process.",
        variant: "destructive"
      });
    }
  };

  const handleStatusChange = (processId: string, newStatus: ProcessModel['status']) => {
    try {
      const updatedProcess = LocalStorageService.update<ProcessModel>('processes', processId, { status: newStatus });
      if (updatedProcess) {
        setProcesses(prev => prev.map(p => p.id === processId ? updatedProcess : p));
        toast({
          title: "Status Updated",
          description: `Process status changed to ${newStatus}.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update process status.",
        variant: "destructive"
      });
    }
  };

  const handleExportProcess = (processId: string) => {
    const process = processes.find(p => p.id === processId);
    if (!process) return;

    try {
      const dataStr = JSON.stringify(process, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${process.name.replace(/\s+/g, '_')}_v${process.version}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Complete",
        description: `${process.name} has been exported.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export process.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      status: 'draft',
      version: '1.0',
      owner: '',
      collaborators: [],
      properties: {
        estimatedDuration: '',
        complexity: 'low',
        automation: 'none'
      },
      tags: []
    });
    setNewTag('');
    setNewCollaborator('');
  };

  const openEditDialog = (process: ProcessModel) => {
    setSelectedProcess(process);
    setFormData({
      name: process.name,
      description: process.description,
      category: process.category,
      status: process.status,
      version: process.version,
      owner: process.owner,
      collaborators: [...process.collaborators],
      properties: {
        estimatedDuration: process.properties.estimatedDuration || '',
        complexity: process.properties.complexity || 'low',
        automation: process.properties.automation || 'none'
      },
      tags: [...process.tags]
    });
    setIsEditDialogOpen(true);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addCollaborator = () => {
    if (newCollaborator.trim() && !formData.collaborators.includes(newCollaborator.trim())) {
      setFormData(prev => ({
        ...prev,
        collaborators: [...prev.collaborators, newCollaborator.trim()]
      }));
      setNewCollaborator('');
    }
  };

  const removeCollaborator = (collaboratorToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      collaborators: prev.collaborators.filter(collab => collab !== collaboratorToRemove)
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Process Manager</h2>
          <p className="text-muted-foreground">Design, model, and manage business processes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Process
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({processes.length})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({processes.filter(p => p.status === 'draft').length})</TabsTrigger>
          <TabsTrigger value="review">Review ({processes.filter(p => p.status === 'review').length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({processes.filter(p => p.status === 'approved').length})</TabsTrigger>
          <TabsTrigger value="published">Published ({processes.filter(p => p.status === 'published').length})</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 py-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search processes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Customer Management">Customer Management</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="all">
          <ProcessGrid 
            processes={getProcessesByTab()} 
            onEdit={openEditDialog}
            onDelete={handleDeleteProcess}
            onDuplicate={handleDuplicateProcess}
            onStatusChange={handleStatusChange}
            onExport={handleExportProcess}
            getStatusColor={getStatusColor}
            getComplexityColor={getComplexityColor}
          />
        </TabsContent>

        <TabsContent value="draft">
          <ProcessGrid 
            processes={getProcessesByTab()} 
            onEdit={openEditDialog}
            onDelete={handleDeleteProcess}
            onDuplicate={handleDuplicateProcess}
            onStatusChange={handleStatusChange}
            onExport={handleExportProcess}
            getStatusColor={getStatusColor}
            getComplexityColor={getComplexityColor}
          />
        </TabsContent>

        <TabsContent value="review">
          <ProcessGrid 
            processes={getProcessesByTab()} 
            onEdit={openEditDialog}
            onDelete={handleDeleteProcess}
            onDuplicate={handleDuplicateProcess}
            onStatusChange={handleStatusChange}
            onExport={handleExportProcess}
            getStatusColor={getStatusColor}
            getComplexityColor={getComplexityColor}
          />
        </TabsContent>

        <TabsContent value="approved">
          <ProcessGrid 
            processes={getProcessesByTab()} 
            onEdit={openEditDialog}
            onDelete={handleDeleteProcess}
            onDuplicate={handleDuplicateProcess}
            onStatusChange={handleStatusChange}
            onExport={handleExportProcess}
            getStatusColor={getStatusColor}
            getComplexityColor={getComplexityColor}
          />
        </TabsContent>

        <TabsContent value="published">
          <ProcessGrid 
            processes={getProcessesByTab()} 
            onEdit={openEditDialog}
            onDelete={handleDeleteProcess}
            onDuplicate={handleDuplicateProcess}
            onStatusChange={handleStatusChange}
            onExport={handleExportProcess}
            getStatusColor={getStatusColor}
            getComplexityColor={getComplexityColor}
          />
        </TabsContent>
      </Tabs>

      {/* Create Process Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Process</DialogTitle>
          </DialogHeader>
          <ProcessForm
            formData={formData}
            setFormData={setFormData}
            newTag={newTag}
            setNewTag={setNewTag}
            newCollaborator={newCollaborator}
            setNewCollaborator={setNewCollaborator}
            onAddTag={addTag}
            onRemoveTag={removeTag}
            onAddCollaborator={addCollaborator}
            onRemoveCollaborator={removeCollaborator}
            onSubmit={handleCreateProcess}
            onCancel={() => {
              setIsCreateDialogOpen(false);
              resetForm();
            }}
            submitLabel="Create Process"
          />
        </DialogContent>
      </Dialog>

      {/* Edit Process Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Process</DialogTitle>
          </DialogHeader>
          <ProcessForm
            formData={formData}
            setFormData={setFormData}
            newTag={newTag}
            setNewTag={setNewTag}
            newCollaborator={newCollaborator}
            setNewCollaborator={setNewCollaborator}
            onAddTag={addTag}
            onRemoveTag={removeTag}
            onAddCollaborator={addCollaborator}
            onRemoveCollaborator={removeCollaborator}
            onSubmit={handleUpdateProcess}
            onCancel={() => {
              setIsEditDialogOpen(false);
              setSelectedProcess(null);
              resetForm();
            }}
            submitLabel="Update Process"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper Components
const ProcessGrid: React.FC<{
  processes: ProcessModel[];
  onEdit: (process: ProcessModel) => void;
  onDelete: (processId: string) => void;
  onDuplicate: (processId: string) => void;
  onStatusChange: (processId: string, status: ProcessModel['status']) => void;
  onExport: (processId: string) => void;
  getStatusColor: (status: string) => string;
  getComplexityColor: (complexity: string) => string;
}> = ({ processes, onEdit, onDelete, onDuplicate, onStatusChange, onExport, getStatusColor, getComplexityColor }) => {
  if (processes.length === 0) {
    return (
      <div className="text-center py-12">
        <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No processes found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {processes.map((process) => (
        <Card key={process.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{process.name}</CardTitle>
                <div className="flex gap-1 mt-1">
                  <Badge variant="secondary" className={getStatusColor(process.status)}>
                    {process.status}
                  </Badge>
                  <Badge variant="outline" className={getComplexityColor(process.properties.complexity)}>
                    {process.properties.complexity}
                  </Badge>
                </div>
              </div>
              <Select value={process.status} onValueChange={(value) => onStatusChange(process.id, value as ProcessModel['status'])}>
                <SelectTrigger className="w-24 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {process.description}
            </p>
            
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1">Category: {process.category}</p>
              <p className="text-xs text-muted-foreground mb-1">Version: {process.version}</p>
              <div className="flex flex-wrap gap-1">
                {process.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {process.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{process.tags.length - 3}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{process.collaborators.length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{process.properties.estimatedDuration || 'N/A'}</span>
                </div>
              </div>
              <span>Owner: {process.owner.split('@')[0]}</span>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-1">
                <Button variant="ghost" size="sm">
                  <Play className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDuplicate(process.id)}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => onExport(process.id)}>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEdit(process)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this process?')) {
                      onDelete(process.id);
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ProcessForm: React.FC<{
  formData: any;
  setFormData: (data: any) => void;
  newTag: string;
  setNewTag: (tag: string) => void;
  newCollaborator: string;
  setNewCollaborator: (collaborator: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onAddCollaborator: () => void;
  onRemoveCollaborator: (collaborator: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel: string;
}> = ({ 
  formData, 
  setFormData, 
  newTag, 
  setNewTag, 
  newCollaborator, 
  setNewCollaborator,
  onAddTag, 
  onRemoveTag, 
  onAddCollaborator,
  onRemoveCollaborator,
  onSubmit, 
  onCancel, 
  submitLabel 
}) => {
  return (
    <ScrollArea className="max-h-[70vh]">
      <div className="space-y-6 pr-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Process Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter process name"
            />
          </div>
          <div>
            <Label>Category</Label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              placeholder="Enter category"
            />
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter process description"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Version</Label>
            <Input
              value={formData.version}
              onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
              placeholder="1.0"
            />
          </div>
          <div>
            <Label>Complexity</Label>
            <Select 
              value={formData.properties.complexity} 
              onValueChange={(value) => setFormData(prev => ({ 
                ...prev, 
                properties: { ...prev.properties, complexity: value }
              }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Estimated Duration</Label>
            <Input
              value={formData.properties.estimatedDuration}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                properties: { ...prev.properties, estimatedDuration: e.target.value }
              }))}
              placeholder="e.g., 2-4 hours"
            />
          </div>
          <div>
            <Label>Automation Level</Label>
            <Select 
              value={formData.properties.automation} 
              onValueChange={(value) => setFormData(prev => ({ 
                ...prev, 
                properties: { ...prev.properties, automation: value }
              }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="full">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Collaborators</Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={newCollaborator}
              onChange={(e) => setNewCollaborator(e.target.value)}
              placeholder="Add collaborator email"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddCollaborator())}
            />
            <Button type="button" onClick={onAddCollaborator} size="sm">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {formData.collaborators.map((collaborator, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => onRemoveCollaborator(collaborator)}>
                {collaborator} ×
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Tags</Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add tag"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddTag())}
            />
            <Button type="button" onClick={onAddTag} size="sm">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {formData.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => onRemoveTag(tag)}>
                {tag} ×
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};