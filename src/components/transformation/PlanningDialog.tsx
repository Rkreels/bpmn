
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface PlanningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PlanningDialog: React.FC<PlanningDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [planData, setPlanData] = useState({
    name: "",
    description: "",
    duration: "",
    priority: "",
    budget: "",
    resources: "",
    objectives: ""
  });

  const handleSave = () => {
    toast({
      title: "Plan Created",
      description: `Transformation plan "${planData.name}" has been created successfully.`
    });
    onOpenChange(false);
    setPlanData({
      name: "",
      description: "",
      duration: "",
      priority: "",
      budget: "",
      resources: "",
      objectives: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Transformation Plan</DialogTitle>
          <DialogDescription>Define a new transformation planning initiative</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="planName">Plan Name</Label>
            <Input
              id="planName"
              value={planData.name}
              onChange={(e) => setPlanData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter plan name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={planData.description}
              onChange={(e) => setPlanData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the transformation plan"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select value={planData.priority} onValueChange={(value) => setPlanData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (months)</Label>
              <Input
                id="duration"
                value={planData.duration}
                onChange={(e) => setPlanData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="6"
                type="number"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                value={planData.budget}
                onChange={(e) => setPlanData(prev => ({ ...prev, budget: e.target.value }))}
                placeholder="$500,000"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resources">Required Resources</Label>
              <Input
                id="resources"
                value={planData.resources}
                onChange={(e) => setPlanData(prev => ({ ...prev, resources: e.target.value }))}
                placeholder="10 people"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="objectives">Key Objectives</Label>
            <Textarea
              id="objectives"
              value={planData.objectives}
              onChange={(e) => setPlanData(prev => ({ ...prev, objectives: e.target.value }))}
              placeholder="List key objectives and success criteria"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Create Plan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
