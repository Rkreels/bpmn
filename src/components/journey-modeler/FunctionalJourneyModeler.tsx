import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useIndustry } from "@/contexts/IndustryContext";
import { getIndustryData, DemoJourney } from "@/data/industryDemoData";
import { Plus, Star, Edit, Trash2 } from "lucide-react";

export function FunctionalJourneyModeler() {
  const { currentIndustry } = useIndustry();
  const industryData = getIndustryData(currentIndustry);
  const [journeys, setJourneys] = useState<DemoJourney[]>(industryData.journeys);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState<DemoJourney | null>(null);
  const [formData, setFormData] = useState({ name: '', persona: '', stages: 3, touchpoints: 5, satisfaction: 4.0 });
  const { toast } = useToast();

  useEffect(() => { setJourneys(getIndustryData(currentIndustry).journeys); }, [currentIndustry]);

  const handleCreateJourney = () => {
    const newJ: DemoJourney = { id: `j${Date.now()}`, name: formData.name || `New Journey ${journeys.length + 1}`, persona: formData.persona || 'New Persona', stages: formData.stages, touchpoints: formData.touchpoints, satisfaction: formData.satisfaction, status: 'draft', lastModified: new Date().toISOString().split('T')[0] };
    setJourneys([...journeys, newJ]);
    setIsCreateOpen(false);
    setFormData({ name: '', persona: '', stages: 3, touchpoints: 5, satisfaction: 4.0 });
    toast({ title: "Journey Created", description: `Created: ${newJ.name}` });
  };

  const handleEditJourney = () => {
    if (!selectedJourney) return;
    setJourneys(prev => prev.map(j => j.id === selectedJourney.id ? { ...j, name: formData.name || j.name, persona: formData.persona || j.persona, stages: formData.stages, touchpoints: formData.touchpoints, satisfaction: formData.satisfaction, lastModified: new Date().toISOString().split('T')[0] } : j));
    setIsEditOpen(false);
    setSelectedJourney(null);
    toast({ title: "Journey Updated", description: "Journey updated successfully" });
  };

  const openEdit = (j: DemoJourney) => {
    setSelectedJourney(j);
    setFormData({ name: j.name, persona: j.persona, stages: j.stages, touchpoints: j.touchpoints, satisfaction: j.satisfaction });
    setIsEditOpen(true);
  };

  const handleDeleteJourney = (id: string) => {
    const j = journeys.find(j => j.id === id);
    setJourneys(journeys.filter(j => j.id !== id));
    toast({ title: "Journey Deleted", description: `Deleted: ${j?.name}` });
  };

  const avgSatisfaction = journeys.length > 0 ? (journeys.reduce((s, j) => s + j.satisfaction, 0) / journeys.length).toFixed(1) : '0';

  const JourneyForm = ({ onSubmit, label }: { onSubmit: () => void; label: string }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Journey Name *</Label><Input value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} placeholder="Journey name" /></div>
        <div><Label>Persona *</Label><Input value={formData.persona} onChange={e => setFormData(p => ({...p, persona: e.target.value}))} placeholder="Target persona" /></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div><Label>Stages</Label><Input type="number" value={formData.stages} onChange={e => setFormData(p => ({...p, stages: +e.target.value}))} /></div>
        <div><Label>Touchpoints</Label><Input type="number" value={formData.touchpoints} onChange={e => setFormData(p => ({...p, touchpoints: +e.target.value}))} /></div>
        <div><Label>Satisfaction (1-5)</Label><Input type="number" step="0.1" min="1" max="5" value={formData.satisfaction} onChange={e => setFormData(p => ({...p, satisfaction: +e.target.value}))} /></div>
      </div>
      <div className="flex justify-end gap-2"><Button variant="outline" onClick={() => { setIsCreateOpen(false); setIsEditOpen(false); }}>Cancel</Button><Button onClick={onSubmit}>{label}</Button></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl sm:text-3xl font-bold">Journey Modeler</h1><p className="text-muted-foreground">Design and optimize customer journey experiences</p></div>
        <Button onClick={() => { setFormData({ name: '', persona: '', stages: 3, touchpoints: 5, satisfaction: 4.0 }); setIsCreateOpen(true); }}><Plus className="h-4 w-4 mr-2" />New Journey</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Journeys</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{journeys.length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Active</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{journeys.filter(j => j.status === 'active').length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Touchpoints</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{journeys.reduce((s, j) => s + j.touchpoints, 0)}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Avg Satisfaction</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{avgSatisfaction}</div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {journeys.map(journey => (
          <Card key={journey.id} className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{journey.name}</CardTitle>
                <Badge variant={journey.status === 'active' ? 'default' : journey.status === 'draft' ? 'secondary' : 'destructive'}>{journey.status}</Badge>
              </div>
              <CardDescription>Persona: {journey.persona}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><div className="font-medium text-muted-foreground">Stages</div><div className="text-lg font-semibold">{journey.stages}</div></div>
                <div><div className="font-medium text-muted-foreground">Touchpoints</div><div className="text-lg font-semibold">{journey.touchpoints}</div></div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground text-sm">Satisfaction</div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-semibold">{journey.satisfaction}</div>
                  <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(journey.satisfaction) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} />)}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">Last modified: {journey.lastModified}</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openEdit(journey)}><Edit className="h-3 w-3 mr-1" />Edit</Button>
                <Button size="sm" variant="outline" onClick={() => handleDeleteJourney(journey.id)}><Trash2 className="h-3 w-3 mr-1" />Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}><DialogContent><DialogHeader><DialogTitle>Create New Journey</DialogTitle></DialogHeader><JourneyForm onSubmit={handleCreateJourney} label="Create Journey" /></DialogContent></Dialog>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}><DialogContent><DialogHeader><DialogTitle>Edit Journey</DialogTitle></DialogHeader><JourneyForm onSubmit={handleEditJourney} label="Update Journey" /></DialogContent></Dialog>
    </div>
  );
}
