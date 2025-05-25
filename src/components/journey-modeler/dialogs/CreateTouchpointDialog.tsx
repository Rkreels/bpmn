
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useJourneyData, TouchPoint } from "@/hooks/useJourneyData";
import { useVoice } from "@/contexts/VoiceContext";
import { Plus } from "lucide-react";

interface CreateTouchpointDialogProps {
  journeyId: string;
  stageId: string;
  trigger?: React.ReactNode;
  onTouchpointCreated?: () => void;
}

export const CreateTouchpointDialog: React.FC<CreateTouchpointDialogProps> = ({ 
  journeyId,
  stageId,
  trigger, 
  onTouchpointCreated 
}) => {
  const { updateJourney, journeys } = useJourneyData();
  const { speakText } = useVoice();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    channel: "",
    type: "digital" as const,
    emotion: "neutral" as const,
    duration: "",
    painPoints: "",
    opportunities: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.channel) {
      speakText("Please fill in the touchpoint name and channel to continue.");
      return;
    }

    const journey = journeys.find(j => j.id === journeyId);
    if (!journey) return;

    const newTouchpoint: TouchPoint = {
      id: `touchpoint-${Date.now()}`,
      name: formData.name,
      channel: formData.channel,
      type: formData.type,
      emotion: formData.emotion,
      duration: formData.duration || "5 min",
      painPoints: formData.painPoints ? formData.painPoints.split(",").map(p => p.trim()) : [],
      opportunities: formData.opportunities ? formData.opportunities.split(",").map(o => o.trim()) : [],
      satisfaction: 3,
      effort: 3,
      interactions: 0,
      conversionRate: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedStages = journey.stages.map(stage => 
      stage.id === stageId 
        ? { ...stage, touchpoints: [...stage.touchpoints, newTouchpoint] }
        : stage
    );

    updateJourney(journeyId, { stages: updatedStages });

    setFormData({
      name: "",
      channel: "",
      type: "digital",
      emotion: "neutral",
      duration: "",
      painPoints: "",
      opportunities: ""
    });
    
    setOpen(false);
    onTouchpointCreated?.();
    
    speakText(`New touchpoint ${formData.name} has been added to the journey stage. This ${formData.type} touchpoint via ${formData.channel} will help track customer interactions and identify optimization opportunities.`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Plus className="h-3 w-3 mr-2" />
            Add Touchpoint
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Touchpoint</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Touchpoint Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Website Homepage"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="channel">Channel *</Label>
              <Input
                id="channel"
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                placeholder="e.g., Website, Email"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: "digital" | "physical" | "human") => 
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="digital">Digital</SelectItem>
                  <SelectItem value="physical">Physical</SelectItem>
                  <SelectItem value="human">Human</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emotion">Emotion</Label>
              <Select 
                value={formData.emotion} 
                onValueChange={(value: TouchPoint["emotion"]) => 
                  setFormData({ ...formData, emotion: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very-negative">Very Negative</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="very-positive">Very Positive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., 5 min, 30 min"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="painPoints">Pain Points (comma separated)</Label>
            <Textarea
              id="painPoints"
              value={formData.painPoints}
              onChange={(e) => setFormData({ ...formData, painPoints: e.target.value })}
              placeholder="e.g., Slow loading, Complex navigation"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="opportunities">Opportunities (comma separated)</Label>
            <Textarea
              id="opportunities"
              value={formData.opportunities}
              onChange={(e) => setFormData({ ...formData, opportunities: e.target.value })}
              placeholder="e.g., Improve page speed, A/B test CTAs"
              rows={2}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Touchpoint</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
