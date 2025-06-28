
import React, { useState } from "react";
import { useVoice } from "@/contexts/VoiceContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Palette } from "lucide-react";
import { ElementButton } from "./palette/ElementButton";
import { PaletteHeader } from "./palette/PaletteHeader";
import { elementCategories, connectorTypes } from "./palette/ElementTypes";

interface BpmnElementPaletteProps {
  onAddElement: (elementType: string) => void;
}

export const BpmnElementPalette: React.FC<BpmnElementPaletteProps> = ({ onAddElement }) => {
  const { isVoiceEnabled, speakText } = useVoice();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "Events": true,
    "Tasks": true,
    "Gateways": false,
    "Containers": false,
    "Data": false,
    "Participants": false
  });

  const handleElementClick = (element: any) => {
    onAddElement(element.id);
    if (isVoiceEnabled) {
      speakText(`Selected ${element.name}. ${element.voiceGuidance}`);
    }
  };

  const handleElementHover = (element: any) => {
    if (isVoiceEnabled) {
      speakText(element.description);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (isVoiceEnabled) {
      speakText(isCollapsed ? "Element palette expanded" : "Element palette collapsed");
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  if (isCollapsed) {
    return (
      <div className="absolute left-2 top-20 bg-white border rounded shadow-md p-2 z-10 transition-all duration-300 w-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className="w-full h-8 p-0"
        >
          <Palette className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(
      "absolute left-2 top-20 bg-white border rounded shadow-md z-10 transition-all duration-300 max-h-[calc(100vh-120px)] overflow-y-auto",
      "w-64"
    )}>
      <PaletteHeader isCollapsed={isCollapsed} onToggle={toggleCollapse} />
      
      <div className="p-3 space-y-3">
        {/* Element Categories */}
        {Object.entries(elementCategories).map(([category, elements]) => (
          <Collapsible
            key={category}
            open={expandedCategories[category]}
            onOpenChange={() => toggleCategory(category)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between h-8 px-2 text-sm font-medium"
              >
                <span>{category}</span>
                {expandedCategories[category] ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-1">
              <div className="grid grid-cols-2 gap-1">
                {elements.map(element => (
                  <ElementButton
                    key={element.id}
                    {...element}
                    onClick={() => handleElementClick(element)}
                    onHover={() => handleElementHover(element)}
                    className="h-8 text-xs justify-start px-2"
                  />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
        
        {/* Connectors */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between h-8 px-2 text-sm font-medium"
            >
              <span>Connectors</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            {connectorTypes.map(connector => (
              <ElementButton
                key={connector.id}
                {...connector}
                onClick={() => handleElementClick(connector)}
                onHover={() => handleElementHover(connector)}
                className="h-8 text-xs justify-start px-2 w-full"
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
