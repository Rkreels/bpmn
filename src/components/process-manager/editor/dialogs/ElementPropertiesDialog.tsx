
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ElementProperties } from '../types';

interface ElementPropertiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  elementProperties: ElementProperties;
  setElementProperties: (props: ElementProperties) => void;
  onUpdateProperties: (props: ElementProperties) => void;
}

export const ElementPropertiesDialog: React.FC<ElementPropertiesDialogProps> = ({
  open,
  onOpenChange,
  elementProperties,
  setElementProperties,
  onUpdateProperties
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProperties(elementProperties);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Element Properties</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={elementProperties.name}
              onChange={(e) => setElementProperties({...elementProperties, name: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={elementProperties.description}
              onChange={(e) => setElementProperties({...elementProperties, description: e.target.value})}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="assignee">Assignee</Label>
            <Input
              id="assignee"
              value={elementProperties.assignee}
              onChange={(e) => setElementProperties({...elementProperties, assignee: e.target.value})}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
