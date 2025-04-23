
import React from "react";
import { Button } from "@/components/ui/button";

interface BpmnElementPaletteProps {
  onAddElement: (elementType: string) => void;
}

export const BpmnElementPalette: React.FC<BpmnElementPaletteProps> = ({ onAddElement }) => {
  const elementTypes = [
    { id: "task", name: "Task", icon: "□" },
    { id: "gateway", name: "Gateway", icon: "◇" },
    { id: "start-event", name: "Start", icon: "○" },
    { id: "end-event", name: "End", icon: "◉" },
    { id: "intermediate-event", name: "Intermediate", icon: "◎" }
  ];

  return (
    <div className="absolute left-4 top-4 bg-white border rounded shadow-sm p-2 z-10 w-56">
      <h4 className="text-sm font-medium mb-2">Elements</h4>
      <div className="grid grid-cols-2 gap-2">
        {elementTypes.map(element => (
          <Button 
            key={element.id}
            variant="outline" 
            size="sm" 
            className="justify-start"
            onClick={() => onAddElement(element.id)}
          >
            <div className="w-5 h-5 mr-2 flex items-center justify-center text-xs border border-black rounded-md">
              {element.icon}
            </div>
            {element.name}
          </Button>
        ))}
      </div>
      
      <h4 className="text-sm font-medium mt-4 mb-2">Connectors</h4>
      <div className="grid grid-cols-1 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="justify-start"
          onClick={() => onAddElement("sequence-flow")}
        >
          <div className="w-5 h-5 mr-2 flex items-center justify-center">→</div>
          Sequence Flow
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="justify-start"
          onClick={() => onAddElement("message-flow")}
        >
          <div className="w-5 h-5 mr-2 flex items-center justify-center">⇢</div>
          Message Flow
        </Button>
      </div>
    </div>
  );
};
