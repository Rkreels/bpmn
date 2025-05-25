
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useJourneyData } from "@/hooks/useJourneyData";
import { useVoice } from "@/contexts/VoiceContext";
import { Plus } from "lucide-react";

interface CreateStageDialogProps {
  journeyId: string;
  trigger?: React.ReactNode;
  onStageCreated?: () => void;
}

export const CreateStageDialog: React.FC<CreateStageDialogProps> = ({ 
  journeyId,
  trigger, 
  onStageCreated 
}) => {
  const { addStageToJourney, journeys } = useJourneyData();
  const { speakText } = useVoice();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    order: 1
  });

  const currentJourney = journeys.find(j => j.id === journeyId);
  const nextOrder = currentJourney ? currentJourney.stages.length + 1 : 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      speakText("Please enter a stage name to continue.");
      return;
    }

    addStageToJourney(journeyId, {
      ...formData,
      order: nextOrder,
      touchpoints: []
    });

    setFormData({
      name: "",
      description: "",
      order: 1
    });
    
    setOpen(false);
    onStageCreated?.();
    
    speakText(`New stage ${formData.name} has been added to your customer journey. You can now add touchpoints to this stage to map specific customer interactions and emotions.`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Stage
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Journey Stage</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Stage Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Awareness, Consideration, Purchase"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what happens in this stage"
              rows={3}
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            This will be stage #{nextOrder} in the journey sequence.
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Stage</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
