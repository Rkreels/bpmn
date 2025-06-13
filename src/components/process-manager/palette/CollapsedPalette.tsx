
import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { elementTypes } from "./ElementTypes";

interface CollapsedPaletteProps {
  onElementClick: (element: any) => void;
}

export const CollapsedPalette: React.FC<CollapsedPaletteProps> = ({ onElementClick }) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      {elementTypes.slice(0, 4).map(element => (
        <TooltipProvider key={element.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="p-1.5 h-auto w-auto"
                onClick={() => onElementClick(element)}
              >
                <element.icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{element.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};
