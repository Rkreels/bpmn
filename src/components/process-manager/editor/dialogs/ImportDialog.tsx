
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  importSource: string;
  setImportSource: React.Dispatch<React.SetStateAction<string>>;
  onImportConfirm: () => void;
}

export const ImportDialog: React.FC<ImportDialogProps> = ({
  open,
  onOpenChange,
  importSource,
  setImportSource,
  onImportConfirm
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import BPMN XML</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <textarea
            className="min-h-[300px] rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm font-mono"
            value={importSource}
            onChange={(e) => setImportSource(e.target.value)}
            placeholder="Paste BPMN XML here..."
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onImportConfirm}>Import</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
