
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";

interface RepositoryDialogProps {
  open: boolean;
  title: string;
  description: string;
  actionLabel: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  showInput?: boolean;
  onClose: () => void;
  onAction: (value?: string) => void;
}

export function RepositoryDialog({
  open,
  title,
  description,
  actionLabel,
  inputLabel,
  inputPlaceholder,
  showInput = false,
  onClose,
  onAction,
}: RepositoryDialogProps) {
  const [value, setValue] = React.useState("");
  const { toast } = useToast();
  const { speakText } = useVoice();

  const handleAction = () => {
    if (showInput && !value.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a value to continue.",
      });
      speakText("Please enter a value to continue.");
      return;
    }
    
    onAction(showInput ? value : undefined);
    setValue("");
  };

  const handleClose = () => {
    setValue("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-[425px]"
        onMouseEnter={() => speakText(`${title} dialog. ${description}`)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {showInput && (
          <div className="py-4">
            <label htmlFor="input" className="text-sm font-medium block mb-2">
              {inputLabel || "Name"}
            </label>
            <Input
              id="input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={inputPlaceholder || "Enter a name..."}
              className="w-full"
              onMouseEnter={() => speakText(`Enter ${inputLabel?.toLowerCase() || "name"} here.`)}
            />
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} onMouseEnter={() => speakText("Cancel and close this dialog.")}>
            Cancel
          </Button>
          <Button onClick={handleAction} onMouseEnter={() => speakText(`Click to ${actionLabel.toLowerCase()}.`)}>
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
