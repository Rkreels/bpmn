
import React, { useState } from "react";
import { useVoice } from "@/contexts/VoiceContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ElementButton } from "./palette/ElementButton";
import { PaletteHeader } from "./palette/PaletteHeader";
import { CollapsedPalette } from "./palette/CollapsedPalette";
import { elementTypes, connectorTypes } from "./palette/ElementTypes";

interface BpmnElementPaletteProps {
  onAddElement: (elementType: string) => void;
}

export const BpmnElementPalette: React.FC<BpmnElementPaletteProps> = ({ onAddElement }) => {
  const { isVoiceEnabled, speakText } = useVoice();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  return (
    <div className={cn(
      "absolute left-0 top-20 bg-white border rounded shadow-md p-3 z-10 transition-all duration-300",
      isCollapsed ? "w-12" : "w-56 sm:w-64"
    )}>
      <PaletteHeader isCollapsed={isCollapsed} onToggle={toggleCollapse} />
      
      {!isCollapsed ? (
        <>
          <div className="grid grid-cols-2 gap-2">
            {elementTypes.map(element => (
              <ElementButton
                key={element.id}
                {...element}
                onClick={() => handleElementClick(element)}
                onHover={() => handleElementHover(element)}
              />
            ))}
          </div>
          
          <h4 className="text-sm font-medium mt-4 mb-2 px-2">Connectors</h4>
          <div className="grid grid-cols-1 gap-2">
            {connectorTypes.map(connector => (
              <ElementButton
                key={connector.id}
                {...connector}
                onClick={() => handleElementClick(connector)}
                onHover={() => handleElementHover(connector)}
                className="justify-start"
              />
            ))}
          </div>
        </>
      ) : (
        <CollapsedPalette onElementClick={handleElementClick} />
      )}
    </div>
  );
};
