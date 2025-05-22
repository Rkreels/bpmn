
import React from "react";
import { Button } from "../ui/button";
import { Headphones, Volume2, VolumeX } from "lucide-react";
import { useVoiceTrainer } from "@/contexts/VoiceTrainerContext";
import { useVoice } from "@/contexts/VoiceContext";

export const VoiceTrainerToggle: React.FC = () => {
  const { isTrainerEnabled, toggleTrainer } = useVoiceTrainer();
  const { isVoiceEnabled, toggleVoice } = useVoice();
  
  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2">
      <div className={cn(
        "bg-white border rounded-lg shadow-lg p-2 transition-opacity", 
        isVoiceEnabled ? "opacity-100" : "opacity-70 hover:opacity-100"
      )}>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleVoice}
          className="flex items-center gap-2"
          title={isVoiceEnabled ? "Disable voice" : "Enable voice"}
        >
          {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          <span className="sr-only">{isVoiceEnabled ? "Disable voice" : "Enable voice"}</span>
        </Button>
      </div>
      
      <div className={cn(
        "bg-white border rounded-lg shadow-lg p-2 transition-opacity",
        isTrainerEnabled ? "opacity-100" : "opacity-70 hover:opacity-100"
      )}>
        <Button
          variant={isTrainerEnabled ? "default" : "ghost"}
          size="sm"
          onClick={toggleTrainer}
          className="flex items-center gap-2"
          title={isTrainerEnabled ? "Disable voice trainer" : "Enable voice trainer"}
        >
          <Headphones className="h-4 w-4" />
          <span className="hidden sm:inline">{isTrainerEnabled ? "Voice Guide On" : "Voice Guide"}</span>
        </Button>
      </div>
    </div>
  );
};

// Import cn utility function for conditional class names
import { cn } from "@/lib/utils";
