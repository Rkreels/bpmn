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
import { Plus, Search, Download, Upload, Play, Edit, Trash2, Copy, Share2, Users, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIndustry } from '@/contexts/IndustryContext';
import { getIndustryData, DemoProcess } from '@/data/industryDemoData';
import { useNavigate } from 'react-router-dom';

export const FunctionalProcessManager: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentIndustry } = useIndustry();
  const industryData = getIndustryData(currentIndustry);
  
  const [processes, setProcesses] = useState<DemoProcess[]>(industryData.processes);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedProcess, setSelectedProcess] = useState<DemoProcess | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    setProcesses(getIndustryData(currentIndustry).processes);
  }, [currentIndustry]);

  const [formData, setFormData] = useState({
    name: '', description: '', category: '', status: 'draft' as DemoProcess['status'],
    version: '1.0', owner: '', collaborators: [] as string[],
    properties: { estimatedDuration: '', complexity: 'low', automation: 'none', riskLevel: 'low', complianceReq: '', department: '' },
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');
  const [newCollaborator, setNewCollaborator] = useState('');

  const categories = [...new Set(processes.map(p => p.category))];

  const filteredProcesses = processes.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
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
    const newProcess: DemoProcess = {
      id: `proc-${Date.now()}`, ...formData,
      owner: formData.owner || 'Current User',
    };
    setProcesses(prev => [...prev, newProcess]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast({ title: "Process Created", description: `${newProcess.name} has been created.` });
  };

  const handleUpdateProcess = () => {
    if (!selectedProcess) return;
    setProcesses(prev => prev.map(p => p.id === selectedProcess.id ? { ...p, ...formData } : p));
    setIsEditDialogOpen(false);
    setSelectedProcess(null);
    resetForm();
    toast({ title: "Process Updated", description: "Process updated successfully." });
  };

  const handleDeleteProcess = (id: string) => {
    if (!confirm('Are you sure you want to delete this process?')) return;
    setProcesses(prev => prev.filter(p => p.id !== id));
    toast({ title: "Process Deleted", description: "Process has been deleted." });
  };

  const handleDuplicateProcess = (id: string) => {
    const orig = processes.find(p => p.id === id);
    if (!orig) return;
    const dup: DemoProcess = { ...orig, id: `proc-${Date.now()}`, name: `${orig.name} (Copy)`, status: 'draft', version: '1.0' };
    setProcesses(prev => [...prev, dup]);
    toast({ title: "Process Duplicated", description: `${dup.name} created.` });
  };

  const handleStatusChange = (id: string, newStatus: DemoProcess['status']) => {
    setProcesses(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    toast({ title: "Status Updated", description: `Process status changed to ${newStatus}.` });
  };

  const handleExportProcess = (id: string) => {
    const process = processes.find(p => p.id === id);
    if (!process) return;
    const blob = new Blob([JSON.stringify(process, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${process.name.replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: "Export Complete", description: `${process.name} exported.` });
  };

  const handleOpenInEditor = (id: string) => {
    navigate('/process-manager', { state: { processId: id } });
    toast({ title: "Opening Editor", description: "Loading process in BPMN editor..." });
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', category: '', status: 'draft', version: '1.0', owner: '', collaborators: [], properties: { estimatedDuration: '', complexity: 'low', automation: 'none', riskLevel: 'low', complianceReq: '', department: '' }, tags: [] });
    setNewTag('');
    setNewCollaborator('');
  };

  const openEditDialog = (process: DemoProcess) => {
    setSelectedProcess(process);
    setFormData({ name: process.name, description: process.description, category: process.category, status: process.status, version: process.version, owner: process.owner, collaborators: [...process.collaborators], properties: { ...process.properties, riskLevel: process.properties.riskLevel || 'low', complianceReq: process.properties.complianceReq || '', department: process.properties.department || '' }, tags: [...process.tags] });
    setIsEditDialogOpen(true);
  };

  const addTag = () => { if (newTag.trim() && !formData.tags.includes(newTag.trim())) { setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] })); setNewTag(''); } };
  const removeTag = (t: string) => setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== t) }));
  const addCollaborator = () => { if (newCollaborator.trim() && !formData.collaborators.includes(newCollaborator.trim())) { setFormData(prev => ({ ...prev, collaborators: [...prev.collaborators, newCollaborator.trim()] })); setNewCollaborator(''); } };
  const removeCollaborator = (c: string) => setFormData(prev => ({ ...prev, collaborators: prev.collaborators.filter(col => col !== c) }));

  const getStatusColor = (s: string) => ({ draft: 'bg-muted text-muted-foreground', review: 'bg-yellow-100 text-yellow-800', approved: 'bg-blue-100 text-blue-800', published: 'bg-green-100 text-green-800', archived: 'bg-red-100 text-red-800' }[s] || 'bg-muted text-muted-foreground');
  const getComplexityColor = (c: string) => ({ low: 'bg-green-100 text-green-800', medium: 'bg-yellow-100 text-yellow-800', high: 'bg-red-100 text-red-800' }[c] || 'bg-muted text-muted-foreground');

  const displayedProcesses = getProcessesByTab();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Process Manager</h2>
          <p className="text-muted-foreground">Design, model, and manage business processes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Upload className="w-4 h-4 mr-2" />Import</Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}><Plus className="w-4 h-4 mr-2" />New Process</Button>
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

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search processes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {['all','draft','review','approved','published'].map(tab => (
          <TabsContent key={tab} value={tab}>
            {displayedProcesses.length === 0 ? (
              <div className="text-center py-12"><p className="text-muted-foreground">No processes found</p></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProcesses.map(process => (
                  <Card key={process.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">{process.name}</CardTitle>
                          <div className="flex gap-1 mt-1 flex-wrap">
                            <Badge variant="secondary" className={getStatusColor(process.status)}>{process.status}</Badge>
                            <Badge variant="outline" className={getComplexityColor(process.properties.complexity)}>{process.properties.complexity}</Badge>
                            {process.properties.riskLevel && <Badge variant="outline" className="text-xs">Risk: {process.properties.riskLevel}</Badge>}
                          </div>
                        </div>
                        <Select value={process.status} onValueChange={(v) => handleStatusChange(process.id, v as DemoProcess['status'])}>
                          <SelectTrigger className="w-24 h-8"><SelectValue /></SelectTrigger>
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
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{process.description}</p>
                      <div className="mb-3 space-y-1">
                        <p className="text-xs text-muted-foreground">Category: {process.category} • v{process.version}</p>
                        {process.properties.department && <p className="text-xs text-muted-foreground">Dept: {process.properties.department}</p>}
                        {process.properties.complianceReq && <p className="text-xs text-muted-foreground">Compliance: {process.properties.complianceReq}</p>}
                        <div className="flex flex-wrap gap-1">
                          {process.tags.slice(0, 3).map((tag, i) => <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>)}
                          {process.tags.length > 3 && <Badge variant="outline" className="text-xs">+{process.tags.length - 3}</Badge>}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1"><Users className="w-3 h-3" /><span>{process.collaborators.length}</span></div>
                          <div className="flex items-center space-x-1"><Clock className="w-3 h-3" /><span>{process.properties.estimatedDuration || 'N/A'}</span></div>
                        </div>
                        <span className="truncate ml-2">Owner: {process.owner.split('@')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleOpenInEditor(process.id)} title="Open in Editor"><Play className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDuplicateProcess(process.id)} title="Duplicate"><Copy className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleExportProcess(process.id)} title="Share"><Share2 className="w-4 h-4" /></Button>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleExportProcess(process.id)} title="Export"><Download className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(process)} title="Edit"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteProcess(process.id)} title="Delete"><Trash2 className="w-4 h-4" /></Button>
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

      {/* Create/Edit Dialog */}
      {[{ open: isCreateDialogOpen, setOpen: setIsCreateDialogOpen, title: 'Create New Process', onSubmit: handleCreateProcess, label: 'Create Process' },
        { open: isEditDialogOpen, setOpen: setIsEditDialogOpen, title: 'Edit Process', onSubmit: handleUpdateProcess, label: 'Update Process' }
      ].map((dlg, idx) => (
        <Dialog key={idx} open={dlg.open} onOpenChange={dlg.setOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh]">
            <DialogHeader><DialogTitle>{dlg.title}</DialogTitle></DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-4 pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label>Process Name *</Label><Input value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} placeholder="Enter process name" /></div>
                  <div><Label>Category *</Label><Input value={formData.category} onChange={e => setFormData(p => ({...p, category: e.target.value}))} placeholder="Enter category" /></div>
                </div>
                <div><Label>Description</Label><Textarea value={formData.description} onChange={e => setFormData(p => ({...p, description: e.target.value}))} rows={2} /></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><Label>Status</Label><Select value={formData.status} onValueChange={v => setFormData(p => ({...p, status: v as any}))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="review">Review</SelectItem><SelectItem value="approved">Approved</SelectItem><SelectItem value="published">Published</SelectItem></SelectContent></Select></div>
                  <div><Label>Version</Label><Input value={formData.version} onChange={e => setFormData(p => ({...p, version: e.target.value}))} /></div>
                  <div><Label>Complexity</Label><Select value={formData.properties.complexity} onValueChange={v => setFormData(p => ({...p, properties: {...p.properties, complexity: v}}))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent></Select></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label>Duration</Label><Input value={formData.properties.estimatedDuration} onChange={e => setFormData(p => ({...p, properties: {...p.properties, estimatedDuration: e.target.value}}))} placeholder="e.g., 2-4 hours" /></div>
                  <div><Label>Automation Level</Label><Select value={formData.properties.automation} onValueChange={v => setFormData(p => ({...p, properties: {...p.properties, automation: v}}))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">None</SelectItem><SelectItem value="partial">Partial</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="full">Full</SelectItem></SelectContent></Select></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><Label>Risk Level</Label><Select value={formData.properties.riskLevel || 'low'} onValueChange={v => setFormData(p => ({...p, properties: {...p.properties, riskLevel: v}}))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent></Select></div>
                  <div><Label>Compliance</Label><Input value={formData.properties.complianceReq || ''} onChange={e => setFormData(p => ({...p, properties: {...p.properties, complianceReq: e.target.value}}))} placeholder="e.g., ISO 9001" /></div>
                  <div><Label>Department</Label><Input value={formData.properties.department || ''} onChange={e => setFormData(p => ({...p, properties: {...p.properties, department: e.target.value}}))} placeholder="Department" /></div>
                </div>
                <div><Label>Owner</Label><Input value={formData.owner} onChange={e => setFormData(p => ({...p, owner: e.target.value}))} placeholder="Process owner" /></div>
                <div><Label>Collaborators</Label><div className="flex gap-2 mt-1"><Input value={newCollaborator} onChange={e => setNewCollaborator(e.target.value)} placeholder="Add collaborator" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCollaborator())} /><Button type="button" onClick={addCollaborator} size="sm">Add</Button></div><div className="flex flex-wrap gap-1 mt-2">{formData.collaborators.map((c,i) => <Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => removeCollaborator(c)}>{c} ×</Badge>)}</div></div>
                <div><Label>Tags</Label><div className="flex gap-2 mt-1"><Input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Add tag" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} /><Button type="button" onClick={addTag} size="sm">Add</Button></div><div className="flex flex-wrap gap-1 mt-2">{formData.tags.map((t,i) => <Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => removeTag(t)}>{t} ×</Badge>)}</div></div>
                <div className="flex justify-end gap-2 pt-2"><Button variant="outline" onClick={() => { dlg.setOpen(false); resetForm(); }}>Cancel</Button><Button onClick={dlg.onSubmit}>{dlg.label}</Button></div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};
