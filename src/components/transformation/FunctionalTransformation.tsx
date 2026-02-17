import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useIndustry } from '@/contexts/IndustryContext';
import { getIndustryData, DemoInitiative } from '@/data/industryDemoData';
import { Target, Users, Calendar, TrendingUp, Download, Edit, Trash2, Plus } from 'lucide-react';

export const FunctionalTransformation: React.FC = () => {
  const { currentIndustry } = useIndustry();
  const industryData = getIndustryData(currentIndustry);
  const [initiatives, setInitiatives] = useState<DemoInitiative[]>(industryData.initiatives);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedInit, setSelectedInit] = useState<DemoInitiative | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', owner: '', budget: 0, endDate: '', status: 'planning' as DemoInitiative['status'] });
  const { toast } = useToast();

  useEffect(() => { setInitiatives(getIndustryData(currentIndustry).initiatives); }, [currentIndustry]);

  const handleCreate = () => {
    if (!formData.name || !formData.description) { toast({ title: "Required", description: "Name and description are required", variant: "destructive" }); return; }
    const init: DemoInitiative = { id: Date.now().toString(), ...formData, progress: 0, startDate: new Date().toISOString().split('T')[0], roi: Math.floor(Math.random() * 200) + 100 };
    setInitiatives(prev => [...prev, init]);
    setIsCreateOpen(false);
    setFormData({ name: '', description: '', owner: '', budget: 0, endDate: '', status: 'planning' });
    toast({ title: "Initiative Created", description: `${init.name} added to portfolio` });
  };

  const handleEdit = () => {
    if (!selectedInit) return;
    setInitiatives(prev => prev.map(i => i.id === selectedInit.id ? { ...i, ...formData } : i));
    setIsEditOpen(false);
    setSelectedInit(null);
    toast({ title: "Initiative Updated", description: "Initiative updated successfully" });
  };

  const handleDelete = (id: string) => {
    const init = initiatives.find(i => i.id === id);
    setInitiatives(prev => prev.filter(i => i.id !== id));
    toast({ title: "Initiative Deleted", description: `${init?.name} removed` });
  };

  const handleUpdateProgress = (id: string, delta: number) => {
    setInitiatives(prev => prev.map(i => i.id === id ? { ...i, progress: Math.min(Math.max(i.progress + delta, 0), 100) } : i));
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ initiatives, summary: { total: initiatives.length, totalBudget: initiatives.reduce((s, i) => s + i.budget, 0) } }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `transformation-report-${Date.now()}.json`; a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Report Generated", description: "Report downloaded" });
  };

  const openEdit = (init: DemoInitiative) => {
    setSelectedInit(init);
    setFormData({ name: init.name, description: init.description, owner: init.owner, budget: init.budget, endDate: init.endDate, status: init.status });
    setIsEditOpen(true);
  };

  const getStatusColor = (s: string) => ({ completed: 'bg-green-500', active: 'bg-blue-500', planning: 'bg-yellow-500', 'on-hold': 'bg-red-500' }[s] || 'bg-muted-foreground');

  const InitiativeForm = ({ onSubmit, label }: { onSubmit: () => void; label: string }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><Label>Name *</Label><Input value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} /></div>
        <div><Label>Owner</Label><Input value={formData.owner} onChange={e => setFormData(p => ({...p, owner: e.target.value}))} /></div>
      </div>
      <div><Label>Description *</Label><Textarea value={formData.description} onChange={e => setFormData(p => ({...p, description: e.target.value}))} /></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div><Label>Budget ($)</Label><Input type="number" value={formData.budget} onChange={e => setFormData(p => ({...p, budget: +e.target.value}))} /></div>
        <div><Label>End Date</Label><Input type="date" value={formData.endDate} onChange={e => setFormData(p => ({...p, endDate: e.target.value}))} /></div>
        <div><Label>Status</Label><Select value={formData.status} onValueChange={v => setFormData(p => ({...p, status: v as any}))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="planning">Planning</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="completed">Completed</SelectItem><SelectItem value="on-hold">On Hold</SelectItem></SelectContent></Select></div>
      </div>
      <div className="flex justify-end gap-2"><Button variant="outline" onClick={() => { setIsCreateOpen(false); setIsEditOpen(false); }}>Cancel</Button><Button onClick={onSubmit}>{label}</Button></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{initiatives.length}</div><div className="text-sm text-muted-foreground">Total Initiatives</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{initiatives.filter(i => i.status === 'completed').length}</div><div className="text-sm text-muted-foreground">Completed</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">${(initiatives.reduce((s, i) => s + i.budget, 0) / 1000000).toFixed(1)}M</div><div className="text-sm text-muted-foreground">Total Budget</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{(initiatives.reduce((s, i) => s + i.progress, 0) / (initiatives.length || 1)).toFixed(0)}%</div><div className="text-sm text-muted-foreground">Avg Progress</div></CardContent></Card>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => { setFormData({ name: '', description: '', owner: '', budget: 0, endDate: '', status: 'planning' }); setIsCreateOpen(true); }}><Plus className="h-4 w-4 mr-2" />New Initiative</Button>
        <Button variant="outline" onClick={handleExport}><Download className="h-4 w-4 mr-2" />Generate Report</Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {initiatives.map(init => (
          <Card key={init.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div><CardTitle className="text-lg">{init.name}</CardTitle><p className="text-sm text-muted-foreground mt-1">{init.description}</p></div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(init.status)}>{init.status}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(init)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(init.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1"><div className="flex justify-between mb-2"><span className="text-sm font-medium">Progress</span><span className="text-sm text-muted-foreground">{init.progress}%</span></div><Progress value={init.progress} /></div>
                  <Button size="sm" variant="outline" onClick={() => handleUpdateProgress(init.id, 10)}>+10%</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><span>{init.owner}</span></div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><span>{new Date(init.endDate).toLocaleDateString()}</span></div>
                  <div className="flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground" /><span>${(init.budget / 1000).toFixed(0)}K</span></div>
                  <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-muted-foreground" /><span>ROI: {init.roi}%</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}><DialogContent className="max-w-2xl"><DialogHeader><DialogTitle>Create Initiative</DialogTitle></DialogHeader><InitiativeForm onSubmit={handleCreate} label="Create" /></DialogContent></Dialog>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}><DialogContent className="max-w-2xl"><DialogHeader><DialogTitle>Edit Initiative</DialogTitle></DialogHeader><InitiativeForm onSubmit={handleEdit} label="Update" /></DialogContent></Dialog>
    </div>
  );
};
