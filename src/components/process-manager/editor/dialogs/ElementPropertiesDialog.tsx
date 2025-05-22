
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ElementProperties } from "../types";

interface ElementPropertiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  elementProperties: ElementProperties;
  setElementProperties: React.Dispatch<React.SetStateAction<ElementProperties>>;
  onUpdateProperties: (props: ElementProperties) => void;
}

export const ElementPropertiesDialog: React.FC<ElementPropertiesDialogProps> = ({
  open,
  onOpenChange,
  elementProperties,
  setElementProperties,
  onUpdateProperties
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setElementProperties(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProperties(elementProperties);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Element Properties</DialogTitle>
            <DialogDescription>
              Update the properties for this {elementProperties.type} element.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={elementProperties.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={elementProperties.description || ""}
                onChange={handleChange}
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="color"
                  name="color"
                  type="color"
                  value={elementProperties.color || "#ffffff"}
                  onChange={handleChange}
                  className="w-16 h-8 p-1"
                />
                <span className="text-sm text-muted-foreground">
                  {elementProperties.color || "#ffffff"}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update Properties</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
