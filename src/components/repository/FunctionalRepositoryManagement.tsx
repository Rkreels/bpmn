import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Archive, Plus, Search, Download, Star, Eye, Share2, Edit, Trash2, FileText, Database, Settings, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIndustry } from '@/contexts/IndustryContext';
import { getIndustryData, DemoRepository } from '@/data/industryDemoData';

export const FunctionalRepositoryManagement: React.FC = () => {
  const { toast } = useToast();
  const { currentIndustry } = useIndustry();
  const industryData = getIndustryData(currentIndustry);
  const [items, setItems] = useState<DemoRepository[]>(industryData.repository);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<DemoRepository | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [formData, setFormData] = useState({
    name: '', type: 'document' as DemoRepository['type'], description: '', category: '', tags: [] as string[],
    visibility: 'public' as DemoRepository['visibility'], version: '1.0', owner: 'Current User',
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => { setItems(getIndustryData(currentIndustry).repository); }, [currentIndustry]);

  const categories = [...new Set(items.map(i => i.category))];

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
      case 'processes': return filteredItems.filter(i => i.type === 'process');
      case 'templates': return filteredItems.filter(i => i.type === 'template');
      case 'documents': return filteredItems.filter(i => i.type === 'document');
      case 'models': return filteredItems.filter(i => i.type === 'model');
      default: return filteredItems;
    }
  };

  const handleCreateItem = () => {
    if (!formData.name.trim()) { toast({ title: 'Required', description: 'Name is required', variant: 'destructive' }); return; }
    const newItem: DemoRepository = { id: `repo-${Date.now()}`, ...formData, downloadCount: 0, rating: 0 };
    setItems(prev => [...prev, newItem]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast({ title: 'Item Created', description: `${newItem.name} has been created.` });
  };

  const handleUpdateItem = () => {
    if (!selectedItem) return;
    setItems(prev => prev.map(i => i.id === selectedItem.id ? { ...i, ...formData } : i));
    setIsEditDialogOpen(false);
    setSelectedItem(null);
    resetForm();
    toast({ title: 'Item Updated', description: 'Item updated successfully.' });
  };

  const handleDeleteItem = (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const item = items.find(i => i.id === itemId);
    setItems(prev => prev.filter(i => i.id !== itemId));
    toast({ title: 'Item Deleted', description: `${item?.name || 'Item'} deleted.` });
  };

  const handleDownload = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, downloadCount: i.downloadCount + 1 } : i));
    const blob = new Blob([JSON.stringify(item, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `${item.name.replace(/\s+/g, '_')}.json`; link.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Download Started', description: `Downloading ${item.name}` });
  };

  const handleDuplicate = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    const dup: DemoRepository = { ...item, id: `repo-${Date.now()}`, name: `${item.name} (Copy)`, downloadCount: 0 };
    setItems(prev => [...prev, dup]);
    toast({ title: 'Item Duplicated', description: `${dup.name} created.` });
  };

  const handleViewItem = (item: DemoRepository) => {
    setSelectedItem(item);
    setIsViewDialogOpen(true);
  };

  const handleShareItem = (item: DemoRepository) => {
    navigator.clipboard.writeText(`${item.name} - ${item.description}`);
    toast({ title: 'Link Copied', description: `Share link for "${item.name}" copied to clipboard.` });
  };

  const resetForm = () => {
    setFormData({ name: '', type: 'document', description: '', category: '', tags: [], visibility: 'public', version: '1.0', owner: 'Current User' });
    setNewTag('');
  };

  const openEditDialog = (item: DemoRepository) => {
    setSelectedItem(item);
    setFormData({ name: item.name, type: item.type, description: item.description, category: item.category, tags: [...item.tags], visibility: item.visibility, version: item.version, owner: item.owner });
    setIsEditDialogOpen(true);
  };

  const addTag = () => { if (newTag.trim() && !formData.tags.includes(newTag.trim())) { setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] })); setNewTag(''); } };
  const removeTag = (t: string) => setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== t) }));

  const exportRepository = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `repository_export_${new Date().toISOString().split('T')[0]}.json`; link.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Export Complete', description: 'Repository exported successfully.' });
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

  const getTypeColor = (type: string) => ({ process: 'bg-blue-100 text-blue-800', template: 'bg-green-100 text-green-800', document: 'bg-orange-100 text-orange-800', model: 'bg-purple-100 text-purple-800' }[type] || 'bg-gray-100 text-gray-800');
  const getVisibilityColor = (v: string) => ({ public: 'bg-green-100 text-green-800', team: 'bg-blue-100 text-blue-800', private: 'bg-red-100 text-red-800' }[v] || 'bg-gray-100 text-gray-800');

  const displayedItems = getItemsByTab();

  const RepositoryForm = ({ onSubmit, label }: { onSubmit: () => void; label: string }) => (
    <ScrollArea className="max-h-[70vh]">
      <div className="space-y-4 pr-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Name *</Label><Input value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Item name" /></div>
          <div><Label>Type</Label><Select value={formData.type} onValueChange={v => setFormData(p => ({ ...p, type: v as any }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="process">Process</SelectItem><SelectItem value="template">Template</SelectItem><SelectItem value="document">Document</SelectItem><SelectItem value="model">Model</SelectItem></SelectContent></Select></div>
        </div>
        <div><Label>Description</Label><Textarea value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} rows={2} /></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><Label>Category</Label><Input value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} placeholder="Category" /></div>
          <div><Label>Visibility</Label><Select value={formData.visibility} onValueChange={v => setFormData(p => ({ ...p, visibility: v as any }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="public">Public</SelectItem><SelectItem value="team">Team</SelectItem><SelectItem value="private">Private</SelectItem></SelectContent></Select></div>
          <div><Label>Version</Label><Input value={formData.version} onChange={e => setFormData(p => ({ ...p, version: e.target.value }))} /></div>
        </div>
        <div><Label>Owner</Label><Input value={formData.owner} onChange={e => setFormData(p => ({ ...p, owner: e.target.value }))} /></div>
        <div>
          <Label>Tags</Label>
          <div className="flex gap-2 mt-1"><Input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Add tag" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} /><Button type="button" onClick={addTag} size="sm">Add</Button></div>
          <div className="flex flex-wrap gap-1 mt-2">{formData.tags.map((tag, i) => <Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>{tag} ×</Badge>)}</div>
        </div>
        <div className="flex justify-end gap-2"><Button variant="outline" onClick={() => { setIsCreateDialogOpen(false); setIsEditDialogOpen(false); }}>Cancel</Button><Button onClick={onSubmit}>{label}</Button></div>
      </div>
    </ScrollArea>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h2 className="text-2xl font-bold text-foreground">Repository</h2><p className="text-muted-foreground">Manage process assets, templates, and documentation</p></div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={exportRepository}><Download className="w-4 h-4 mr-2" />Export</Button>
          <Button onClick={() => { resetForm(); setIsCreateDialogOpen(true); }}><Plus className="w-4 h-4 mr-2" />Add Item</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({items.length})</TabsTrigger>
          <TabsTrigger value="processes">Processes ({items.filter(i => i.type === 'process').length})</TabsTrigger>
          <TabsTrigger value="templates">Templates ({items.filter(i => i.type === 'template').length})</TabsTrigger>
          <TabsTrigger value="documents">Documents ({items.filter(i => i.type === 'document').length})</TabsTrigger>
          <TabsTrigger value="models">Models ({items.filter(i => i.type === 'model').length})</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
          <div className="relative flex-1 w-full"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" /><Input placeholder="Search repository..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" /></div>
          <Select value={filterType} onValueChange={setFilterType}><SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Type" /></SelectTrigger><SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="process">Process</SelectItem><SelectItem value="template">Template</SelectItem><SelectItem value="document">Document</SelectItem><SelectItem value="model">Model</SelectItem></SelectContent></Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}><SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Category" /></SelectTrigger><SelectContent><SelectItem value="all">All Categories</SelectItem>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
          <div className="flex border rounded-lg"><Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}>Grid</Button><Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')}>List</Button></div>
        </div>

        {['all', 'processes', 'templates', 'documents', 'models'].map(tab => (
          <TabsContent key={tab} value={tab}>
            {displayedItems.length === 0 ? (
              <div className="text-center py-12"><Archive className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No items found</p></div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedItems.map(item => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(item.type)}
                          <div>
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <div className="flex gap-1 mt-1"><Badge variant="secondary" className={getTypeColor(item.type)}>{item.type}</Badge><Badge variant="outline" className={getVisibilityColor(item.visibility)}>{item.visibility}</Badge></div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground mb-1">Category: {item.category} • Owner: {item.owner}</p>
                        <div className="flex flex-wrap gap-1">{item.tags.slice(0, 3).map((t, i) => <Badge key={i} variant="outline" className="text-xs">{t}</Badge>)}{item.tags.length > 3 && <Badge variant="outline" className="text-xs">+{item.tags.length - 3}</Badge>}</div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1"><Download className="w-3 h-3" /><span>{item.downloadCount}</span></div>
                          <div className="flex items-center space-x-1"><Star className="w-3 h-3" /><span>{item.rating.toFixed(1)}</span></div>
                        </div>
                        <span>v{item.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleDownload(item.id)} title="Download"><Download className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleViewItem(item)} title="View"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleShareItem(item)} title="Share"><Share2 className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDuplicate(item.id)} title="Duplicate"><Copy className="w-4 h-4" /></Button>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(item)} title="Edit"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(item.id)} title="Delete"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {displayedItems.map(item => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center space-x-4 flex-1 min-w-0">
                          {getTypeIcon(item.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap"><h3 className="font-semibold truncate">{item.name}</h3><Badge variant="secondary" className={getTypeColor(item.type)}>{item.type}</Badge><Badge variant="outline" className={getVisibilityColor(item.visibility)}>{item.visibility}</Badge></div>
                            <p className="text-sm text-muted-foreground mt-1 truncate">{item.description}</p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground"><span>Cat: {item.category}</span><span>DL: {item.downloadCount}</span><span>★ {item.rating.toFixed(1)}</span><span>v{item.version}</span></div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleDownload(item.id)}><Download className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleViewItem(item)}><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(item)}><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(item.id)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* View Item Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{selectedItem?.name}</DialogTitle></DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap"><Badge className={getTypeColor(selectedItem.type)}>{selectedItem.type}</Badge><Badge variant="outline" className={getVisibilityColor(selectedItem.visibility)}>{selectedItem.visibility}</Badge><Badge variant="outline">v{selectedItem.version}</Badge></div>
              <p className="text-muted-foreground">{selectedItem.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Category:</span> {selectedItem.category}</div>
                <div><span className="font-medium">Owner:</span> {selectedItem.owner}</div>
                <div><span className="font-medium">Downloads:</span> {selectedItem.downloadCount}</div>
                <div><span className="font-medium">Rating:</span> {selectedItem.rating.toFixed(1)} / 5</div>
              </div>
              <div><span className="font-medium text-sm">Tags:</span><div className="flex flex-wrap gap-1 mt-1">{selectedItem.tags.map((t, i) => <Badge key={i} variant="outline">{t}</Badge>)}</div></div>
              <div className="flex gap-2"><Button onClick={() => handleDownload(selectedItem.id)}><Download className="w-4 h-4 mr-2" />Download</Button><Button variant="outline" onClick={() => { setIsViewDialogOpen(false); openEditDialog(selectedItem); }}><Edit className="w-4 h-4 mr-2" />Edit</Button><Button variant="outline" onClick={() => handleShareItem(selectedItem)}><Share2 className="w-4 h-4 mr-2" />Share</Button></div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}><DialogContent className="max-w-2xl"><DialogHeader><DialogTitle>Add New Item</DialogTitle></DialogHeader><RepositoryForm onSubmit={handleCreateItem} label="Create Item" /></DialogContent></Dialog>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}><DialogContent className="max-w-2xl"><DialogHeader><DialogTitle>Edit Item</DialogTitle></DialogHeader><RepositoryForm onSubmit={handleUpdateItem} label="Update Item" /></DialogContent></Dialog>
    </div>
  );
};
