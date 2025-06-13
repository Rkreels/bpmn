
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaletteHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const PaletteHeader: React.FC<PaletteHeaderProps> = ({ isCollapsed, onToggle }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      {!isCollapsed && <h4 className="text-sm font-medium px-2">Elements</h4>}
      <Button 
        variant="ghost" 
        size="sm" 
        className="ml-auto"
        onClick={onToggle}
        aria-label={isCollapsed ? "Expand palette" : "Collapse palette"}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
  );
};
