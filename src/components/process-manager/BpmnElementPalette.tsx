
import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Square, Diamond, Circle, Layers, Database, Layout, ArrowRight } from "lucide-react";

interface BpmnElementPaletteProps {
  onAddElement: (elementType: string) => void;
}

export const BpmnElementPalette: React.FC<BpmnElementPaletteProps> = ({ onAddElement }) => {
  const elementTypes = [
    { id: "task", name: "Task", icon: Square, description: "Add a task or activity" },
    { id: "gateway", name: "Gateway", icon: Diamond, description: "Add a decision gateway" },
    { id: "start-event", name: "Start", icon: Circle, description: "Add a start event" },
    { id: "end-event", name: "End", icon: Circle, description: "Add an end event" },
    { id: "subprocess", name: "Subprocess", icon: Layers, description: "Add a subprocess container" },
    { id: "dataobject", name: "Data Object", icon: Database, description: "Add a data object" },
    { id: "pool", name: "Pool/Lane", icon: Layout, description: "Add a pool or lane" }
  ];

  return (
    <div className="absolute left-4 top-20 bg-white border rounded shadow-md p-3 z-10 w-56">
      <h4 className="text-sm font-medium mb-2 px-2">Elements</h4>
      <div className="grid grid-cols-2 gap-2">
        {elementTypes.map(element => (
          <TooltipProvider key={element.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start"
                  onClick={() => onAddElement(element.id)}
                >
                  <element.icon className="h-4 w-4 mr-2" />
                  {element.name}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{element.description}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      
      <h4 className="text-sm font-medium mt-4 mb-2 px-2">Connectors</h4>
      <div className="grid grid-cols-1 gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="justify-start"
                onClick={() => onAddElement("sequence-flow")}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Sequence Flow
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Connect elements with sequence flow</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="justify-start"
                onClick={() => onAddElement("message-flow")}
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-90" />
                Message Flow
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Connect elements with message flow</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
