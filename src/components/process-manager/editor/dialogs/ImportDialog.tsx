
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  importSource: string;
  setImportSource: (source: string) => void;
  onImportConfirm: () => void;
}

export const ImportDialog: React.FC<ImportDialogProps> = ({
  open,
  onOpenChange,
  importSource,
  setImportSource,
  onImportConfirm
}) => {
  const handleImport = () => {
    onImportConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import Process</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="import-source">BPMN XML or JSON</Label>
            <Textarea
              id="import-source"
              value={importSource}
              onChange={(e) => setImportSource(e.target.value)}
              placeholder="Paste your BPMN XML or JSON here..."
              rows={10}
              className="font-mono text-sm"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={!importSource.trim()}>
              Import
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
