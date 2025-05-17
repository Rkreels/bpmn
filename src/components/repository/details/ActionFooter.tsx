
import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Share2, Download } from "lucide-react";
import { useVoice } from "@/contexts/VoiceContext";

interface ActionFooterProps {
  onClose: () => void;
  onEdit: () => void;
  onShare: () => void;
  onDownload: () => void;
}

export function ActionFooter({ onClose, onEdit, onShare, onDownload }: ActionFooterProps) {
  const { speakText } = useVoice();
  
  return (
    <DialogFooter className="gap-2 sm:gap-0 mt-6">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onEdit}
          onMouseEnter={() => speakText("Edit this item. Regular updates ensure your process documentation stays current and reflects actual business operations.")}
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onShare}
          onMouseEnter={() => speakText("Share this item with team members. Collaboration is key to successful process management and continuous improvement.")}
        >
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onDownload}
          onMouseEnter={() => speakText("Download this item for offline access or distribution. This is useful for sharing with stakeholders who don't have direct access to the repository.")}
        >
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClose}
        onMouseEnter={() => speakText("Close this view and return to the repository. Remember to save any changes before closing.")}
      >
        Close
      </Button>
    </DialogFooter>
  );
}
