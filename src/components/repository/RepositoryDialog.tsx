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

  const getVoiceGuidance = () => {
    if (title.includes("BPMN Process")) {
      return "BPMN Process modeling is essential for visualizing and standardizing business workflows. It helps teams understand, analyze, and improve business processes using standardized notation.";
    } else if (title.includes("Journey Map")) {
      return "Customer Journey Maps help visualize the experience of your customers across different touchpoints. This helps identify pain points and opportunities for improvement in your customer experience.";
    } else if (title.includes("Decision Model")) {
      return "Decision Models help document and automate business rules and decision-making processes. This ensures consistent decision-making across your organization.";
    } else if (title.includes("New Folder")) {
      return "Folders help organize your process artifacts in a structured way. Good organization is crucial for maintaining a clear and efficient process repository.";
    } else if (title.includes("Settings")) {
      return "Repository settings allow you to manage access permissions, versioning rules, and integration configurations. Proper configuration ensures secure and efficient process management.";
    }
    return description;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-[425px]"
        onMouseEnter={() => speakText(`${title}. ${getVoiceGuidance()}`)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {showInput && (
          <div className="py-4">
            <label 
              htmlFor="input" 
              className="text-sm font-medium block mb-2"
              onMouseEnter={() => speakText(`Enter the ${inputLabel?.toLowerCase() || "name"}. A clear and descriptive name helps team members understand the purpose of this ${title.toLowerCase()}.`)}
            >
              {inputLabel || "Name"}
            </label>
            <Input
              id="input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={inputPlaceholder || "Enter a name..."}
              className="w-full"
              onMouseEnter={() => speakText(`Type a descriptive name for your ${title.toLowerCase()} here.`)}
            />
          </div>
        )}
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose}
            onMouseEnter={() => speakText("Cancel the current operation and return to the repository view.")}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAction}
            onMouseEnter={() => speakText(`Click to ${actionLabel.toLowerCase()}. This will ${showInput ? `create a new ${title.toLowerCase()} with the specified name` : "save the changes"}.`)}
          >
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
