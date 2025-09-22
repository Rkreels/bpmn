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
import { 
  Archive, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Star, 
  Eye, 
  Heart,
  Share2,
  Edit,
  Trash2,
  FolderPlus,
  FileText,
  Image,
  Database,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LocalStorageService, Repository } from '@/services/localStorageService';

export const FunctionalRepositoryManagement: React.FC = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Repository[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<Repository | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'document' as Repository['type'],
    description: '',
    category: '',
    tags: [] as string[],
    visibility: 'public' as Repository['visibility'],
    metadata: {},
    content: {}
  });

  const [newTag, setNewTag] = useState('');

  // Load items on component mount
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    const loadedItems = LocalStorageService.getAll<Repository>('repository');
    setItems(loadedItems);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const getItemsByTab = () => {
    switch (activeTab) {
      case 'processes': return filteredItems.filter(item => item.type === 'process');
      case 'templates': return filteredItems.filter(item => item.type === 'template');
      case 'documents': return filteredItems.filter(item => item.type === 'document');
      case 'models': return filteredItems.filter(item => item.type === 'model');
      default: return filteredItems;
    }
  };

  const handleCreateItem = () => {
    try {
      const currentUser = 'current.user@company.com'; // In real app, get from auth context
      const newItem = LocalStorageService.create<Repository>('repository', {
        ...formData,
        owner: currentUser,
        downloadCount: 0,
        rating: 0,
        reviews: [],
        version: '1.0'
      });
      setItems(prev => [...prev, newItem]);
      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: "Item Created",
        description: `${newItem.name} has been successfully created.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create item. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateItem = () => {
    if (!selectedItem) return;
    
    try {
      const updatedItem = LocalStorageService.update<Repository>('repository', selectedItem.id, formData);
      if (updatedItem) {
        setItems(prev => prev.map(i => i.id === selectedItem.id ? updatedItem : i));
        setIsEditDialogOpen(false);
        setSelectedItem(null);
        resetForm();
        toast({
          title: "Item Updated",
          description: `${updatedItem.name} has been successfully updated.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteItem = (itemId: string) => {
    try {
      const success = LocalStorageService.delete('repository', itemId);
      if (success) {
        setItems(prev => prev.filter(i => i.id !== itemId));
        toast({
          title: "Item Deleted",
          description: "Item has been successfully deleted.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDownload = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    try {
      // Update download count
      LocalStorageService.update<Repository>('repository', itemId, { 
        downloadCount: item.downloadCount + 1 
      });
      setItems(prev => prev.map(i => i.id === itemId ? { ...i, downloadCount: i.downloadCount + 1 } : i));
      
      // Simulate download
      const dataStr = JSON.stringify(item.content, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${item.name.replace(/\s+/g, '_')}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: `Downloading ${item.name}...`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download item.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'document',
      description: '',
      category: '',
      tags: [],
      visibility: 'public',
      metadata: {},
      content: {}
    });
    setNewTag('');
  };

  const openEditDialog = (item: Repository) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      type: item.type,
      description: item.description,
      category: item.category,
      tags: [...item.tags],
      visibility: item.visibility,
      metadata: { ...item.metadata },
      content: { ...item.content }
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'process': return <Settings className="w-5 h-5" />;
      case 'template': return <FileText className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      case 'model': return <Database className="w-5 h-5" />;
      default: return <Archive className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'process': return 'bg-blue-100 text-blue-800';
      case 'template': return 'bg-green-100 text-green-800';
      case 'document': return 'bg-orange-100 text-orange-800';
      case 'model': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'team': return 'bg-blue-100 text-blue-800';
      case 'private': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportRepository = () => {
    try {
      const dataStr = JSON.stringify(items, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `repository_export_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Complete",
        description: "Repository data has been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export repository data.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Repository</h2>
          <p className="text-muted-foreground">Manage process assets, templates, and documentation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportRepository}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({items.length})</TabsTrigger>
          <TabsTrigger value="processes">Processes ({items.filter(i => i.type === 'process').length})</TabsTrigger>
          <TabsTrigger value="templates">Templates ({items.filter(i => i.type === 'template').length})</TabsTrigger>
          <TabsTrigger value="documents">Documents ({items.filter(i => i.type === 'document').length})</TabsTrigger>
          <TabsTrigger value="models">Models ({items.filter(i => i.type === 'model').length})</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 py-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search repository..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="process">Process</SelectItem>
              <SelectItem value="template">Template</SelectItem>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="model">Model</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Documentation">Documentation</SelectItem>
              <SelectItem value="Templates">Templates</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <RepositoryGrid 
            items={getItemsByTab()} 
            viewMode={viewMode}
            onEdit={openEditDialog}
            onDelete={handleDeleteItem}
            onDownload={handleDownload}
            getTypeIcon={getTypeIcon}
            getTypeColor={getTypeColor}
            getVisibilityColor={getVisibilityColor}
          />
        </TabsContent>

        <TabsContent value="processes">
          <RepositoryGrid 
            items={getItemsByTab()} 
            viewMode={viewMode}
            onEdit={openEditDialog}
            onDelete={handleDeleteItem}
            onDownload={handleDownload}
            getTypeIcon={getTypeIcon}
            getTypeColor={getTypeColor}
            getVisibilityColor={getVisibilityColor}
          />
        </TabsContent>

        <TabsContent value="templates">
          <RepositoryGrid 
            items={getItemsByTab()} 
            viewMode={viewMode}
            onEdit={openEditDialog}
            onDelete={handleDeleteItem}
            onDownload={handleDownload}
            getTypeIcon={getTypeIcon}
            getTypeColor={getTypeColor}
            getVisibilityColor={getVisibilityColor}
          />
        </TabsContent>

        <TabsContent value="documents">
          <RepositoryGrid 
            items={getItemsByTab()} 
            viewMode={viewMode}
            onEdit={openEditDialog}
            onDelete={handleDeleteItem}
            onDownload={handleDownload}
            getTypeIcon={getTypeIcon}
            getTypeColor={getTypeColor}
            getVisibilityColor={getVisibilityColor}
          />
        </TabsContent>

        <TabsContent value="models">
          <RepositoryGrid 
            items={getItemsByTab()} 
            viewMode={viewMode}
            onEdit={openEditDialog}
            onDelete={handleDeleteItem}
            onDownload={handleDownload}
            getTypeIcon={getTypeIcon}
            getTypeColor={getTypeColor}
            getVisibilityColor={getVisibilityColor}
          />
        </TabsContent>
      </Tabs>

      {/* Create Item Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <RepositoryForm
            formData={formData}
            setFormData={setFormData}
            newTag={newTag}
            setNewTag={setNewTag}
            onAddTag={addTag}
            onRemoveTag={removeTag}
            onSubmit={handleCreateItem}
            onCancel={() => {
              setIsCreateDialogOpen(false);
              resetForm();
            }}
            submitLabel="Create Item"
          />
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <RepositoryForm
            formData={formData}
            setFormData={setFormData}
            newTag={newTag}
            setNewTag={setNewTag}
            onAddTag={addTag}
            onRemoveTag={removeTag}
            onSubmit={handleUpdateItem}
            onCancel={() => {
              setIsEditDialogOpen(false);
              setSelectedItem(null);
              resetForm();
            }}
            submitLabel="Update Item"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper Components
const RepositoryGrid: React.FC<{
  items: Repository[];
  viewMode: 'grid' | 'list';
  onEdit: (item: Repository) => void;
  onDelete: (itemId: string) => void;
  onDownload: (itemId: string) => void;
  getTypeIcon: (type: string) => React.ReactNode;
  getTypeColor: (type: string) => string;
  getVisibilityColor: (visibility: string) => string;
}> = ({ items, viewMode, onEdit, onDelete, onDownload, getTypeIcon, getTypeColor, getVisibilityColor }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Archive className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No items found</p>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(item.type)}
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <div className="flex gap-1 mt-1">
                      <Badge variant="secondary" className={getTypeColor(item.type)}>
                        {item.type}
                      </Badge>
                      <Badge variant="outline" className={getVisibilityColor(item.visibility)}>
                        {item.visibility}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {item.description}
              </p>
              
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-1">Category: {item.category}</p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Download className="w-3 h-3" />
                    <span>{item.downloadCount}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>{item.rating.toFixed(1)}</span>
                  </div>
                </div>
                <span>v{item.version}</span>
              </div>

              <div className="flex justify-between">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onDownload(item.id)}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this item?')) {
                        onDelete(item.id);
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
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getTypeIcon(item.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <Badge variant="secondary" className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                    <Badge variant="outline" className={getVisibilityColor(item.visibility)}>
                      {item.visibility}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Category: {item.category}</span>
                    <span>Downloads: {item.downloadCount}</span>
                    <span>Rating: {item.rating.toFixed(1)}</span>
                    <span>Version: {item.version}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => onDownload(item.id)}>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this item?')) {
                      onDelete(item.id);
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

const RepositoryForm: React.FC<{
  formData: any;
  setFormData: (data: any) => void;
  newTag: string;
  setNewTag: (tag: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel: string;
}> = ({ formData, setFormData, newTag, setNewTag, onAddTag, onRemoveTag, onSubmit, onCancel, submitLabel }) => {
  return (
    <ScrollArea className="max-h-[70vh]">
      <div className="space-y-6 pr-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter item name"
            />
          </div>
          <div>
            <Label>Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="process">Process</SelectItem>
                <SelectItem value="template">Template</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="model">Model</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter description"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Category</Label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              placeholder="Enter category"
            />
          </div>
          <div>
            <Label>Visibility</Label>
            <Select value={formData.visibility} onValueChange={(value) => setFormData(prev => ({ ...prev, visibility: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
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