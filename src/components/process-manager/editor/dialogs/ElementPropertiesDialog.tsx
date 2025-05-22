
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ElementPropertiesType } from "../hooks/useBpmnEditorState";

interface ElementPropertiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  elementProperties: ElementPropertiesType | null;
  setElementProperties: React.Dispatch<React.SetStateAction<ElementPropertiesType | null>>;
  onUpdateProperties: () => void;
}

export const ElementPropertiesDialog: React.FC<ElementPropertiesDialogProps> = ({
  open,
  onOpenChange,
  elementProperties,
  setElementProperties,
  onUpdateProperties
}) => {
  if (!elementProperties) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Element Properties</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="element-name">Name</Label>
            <Input
              id="element-name"
              value={elementProperties.name}
              onChange={(e) => setElementProperties({
                ...elementProperties,
                name: e.target.value
              })}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="element-type">Type</Label>
              <Input
                id="element-type"
                value={elementProperties.type
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="element-id">ID</Label>
              <Input
                id="element-id"
                value={elementProperties.id}
                disabled
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="element-description">Description</Label>
            <Input
              id="element-description"
              value={elementProperties.description || ""}
              onChange={(e) => setElementProperties({
                ...elementProperties,
                description: e.target.value
              })}
            />
          </div>
          
          {(elementProperties.type === 'task' || elementProperties.type === 'subprocess') && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="element-assignee">Assignee</Label>
                <Input
                  id="element-assignee"
                  value={elementProperties.assignee || ""}
                  onChange={(e) => setElementProperties({
                    ...elementProperties,
                    assignee: e.target.value
                  })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="element-duration">Duration</Label>
                  <Input
                    id="element-duration"
                    value={elementProperties.duration || ""}
                    onChange={(e) => setElementProperties({
                      ...elementProperties,
                      duration: e.target.value
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="element-priority">Priority</Label>
                  <Select
                    value={elementProperties.priority || "medium"}
                    onValueChange={(value) => setElementProperties({
                      ...elementProperties,
                      priority: value
                    })}
                  >
                    <SelectTrigger id="element-priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {elementProperties.type === 'task' && (
                <div className="grid gap-2">
                  <Label htmlFor="element-implementation">Implementation</Label>
                  <Select
                    value={elementProperties.implementation || ""}
                    onValueChange={(value) => setElementProperties({
                      ...elementProperties,
                      implementation: value
                    })}
                  >
                    <SelectTrigger id="element-implementation">
                      <SelectValue placeholder="Select implementation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unspecified">Unspecified</SelectItem>
                      <SelectItem value="webservice">Web Service</SelectItem>
                      <SelectItem value="script">Script</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </>
          )}
          
          <div className="grid gap-2">
            <Label htmlFor="element-documentation">Documentation</Label>
            <textarea
              id="element-documentation"
              className="min-h-[100px] rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm"
              value={elementProperties.documentation || ""}
              onChange={(e) => setElementProperties({
                ...elementProperties,
                documentation: e.target.value
              })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onUpdateProperties}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
