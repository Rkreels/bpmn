
import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

interface ElementButtonProps {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  voiceGuidance: string;
  onClick: () => void;
  onHover: () => void;
  variant?: "outline" | "ghost";
  size?: "sm" | "default";
  className?: string;
}

export const ElementButton: React.FC<ElementButtonProps> = ({
  id,
  name,
  icon: Icon,
  description,
  onClick,
  onHover,
  variant = "outline",
  size = "sm",
  className = "justify-start"
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={variant}
            size={size}
            className={className}
            id={`element-${id}`}
            onClick={onClick}
            onMouseEnter={onHover}
          >
            <Icon className="h-4 w-4 mr-2" />
            {name}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">{description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
