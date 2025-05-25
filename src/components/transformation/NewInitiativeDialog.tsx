
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface NewInitiativeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateInitiative: (initiative: any) => void;
}

export const NewInitiativeDialog: React.FC<NewInitiativeDialogProps> = ({ 
  open, 
  onOpenChange, 
  onCreateInitiative 
}) => {
  const { toast } = useToast();
  const [initiativeData, setInitiativeData] = useState({
    name: "",
    description: "",
    category: "",
    priority: "",
    budget: "",
    owner: "",
    dueDate: "",
    objectives: ""
  });

  const handleCreate = () => {
    const newInitiative = {
      id: `init-${Date.now()}`,
      name: initiativeData.name,
      status: "planning",
      priority: initiativeData.priority,
      budget: initiativeData.budget,
      spent: "$0",
      progress: 0,
      owner: initiativeData.owner,
      dueDate: initiativeData.dueDate,
      category: initiativeData.category,
      description: initiativeData.description,
      objectives: initiativeData.objectives
    };

    onCreateInitiative(newInitiative);
    toast({
      title: "Initiative Created",
      description: `${initiativeData.name} has been created successfully.`
    });
    onOpenChange(false);
    setInitiativeData({
      name: "",
      description: "",
      category: "",
      priority: "",
      budget: "",
      owner: "",
      dueDate: "",
      objectives: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Initiative</DialogTitle>
          <DialogDescription>Add a new transformation initiative to your portfolio</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="initName">Initiative Name</Label>
            <Input
              id="initName"
              value={initiativeData.name}
              onChange={(e) => setInitiativeData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter initiative name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={initiativeData.description}
              onChange={(e) => setInitiativeData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the initiative"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select value={initiativeData.category} onValueChange={(value) => setInitiativeData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer-experience">Customer Experience</SelectItem>
                  <SelectItem value="automation">Automation</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="digital-transformation">Digital Transformation</SelectItem>
                  <SelectItem value="process-optimization">Process Optimization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select value={initiativeData.priority} onValueChange={(value) => setInitiativeData(prev => ({ ...prev, priority: value }))}>
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
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                value={initiativeData.budget}
                onChange={(e) => setInitiativeData(prev => ({ ...prev, budget: e.target.value }))}
                placeholder="$100,000"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="owner">Owner</Label>
              <Input
                id="owner"
                value={initiativeData.owner}
                onChange={(e) => setInitiativeData(prev => ({ ...prev, owner: e.target.value }))}
                placeholder="Initiative owner"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={initiativeData.dueDate}
                onChange={(e) => setInitiativeData(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="objectives">Key Objectives</Label>
            <Textarea
              id="objectives"
              value={initiativeData.objectives}
              onChange={(e) => setInitiativeData(prev => ({ ...prev, objectives: e.target.value }))}
              placeholder="Define key objectives and success criteria"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleCreate} disabled={!initiativeData.name || !initiativeData.category}>
            Create Initiative
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
