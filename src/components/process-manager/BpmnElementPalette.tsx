import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Square, Diamond, Circle, Layers, Database, Layout, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useVoice } from "@/contexts/VoiceContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface BpmnElementPaletteProps {
  onAddElement: (elementType: string) => void;
}

export const BpmnElementPalette: React.FC<BpmnElementPaletteProps> = ({ onAddElement }) => {
  const { isVoiceEnabled, speakText } = useVoice();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const elementTypes = [
    { 
      id: "task", 
      name: "Task", 
      icon: Square, 
      description: "Add a task or activity",
      voiceGuidance: "Task represents an activity performed in a process. Use it for steps that require action."
    },
    { 
      id: "gateway", 
      name: "Gateway", 
      icon: Diamond, 
      description: "Add a decision gateway",
      voiceGuidance: "Gateway represents a decision point where the process flow diverges based on conditions."
    },
    { 
      id: "start-event", 
      name: "Start", 
      icon: Circle, 
      description: "Add a start event",
      voiceGuidance: "Start event indicates where a process begins. Every process model should have at least one start event."
    },
    { 
      id: "end-event", 
      name: "End", 
      icon: Circle, 
      description: "Add an end event",
      voiceGuidance: "End event indicates where a process path ends. A process can have multiple end events."
    },
    { 
      id: "subprocess", 
      name: "Subprocess", 
      icon: Layers, 
      description: "Add a subprocess container",
      voiceGuidance: "Subprocess allows you to encapsulate a portion of your process that can be collapsed or expanded."
    },
    { 
      id: "dataobject", 
      name: "Data Object", 
      icon: Database, 
      description: "Add a data object",
      voiceGuidance: "Data object represents information flowing through the process, such as documents or data records."
    },
    { 
      id: "pool", 
      name: "Pool/Lane", 
      icon: Layout, 
      description: "Add a pool or lane",
      voiceGuidance: "Pools and lanes represent participants or organizational units responsible for activities in the process."
    }
  ];

  const connectorTypes = [
    {
      id: "sequence-flow",
      name: "Sequence Flow",
      icon: ArrowRight,
      description: "Connect elements with sequence flow",
      voiceGuidance: "Sequence flow shows the order in which activities are performed in a process."
    },
    {
      id: "message-flow",
      name: "Message Flow",
      icon: ArrowRight,
      iconClass: "rotate-90",
      description: "Connect elements with message flow",
      voiceGuidance: "Message flow represents communication between different participants in a process, typically across pool boundaries."
    }
  ];

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
      <div className="flex items-center justify-between mb-2">
        {!isCollapsed && <h4 className="text-sm font-medium px-2">Elements</h4>}
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-auto"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? "Expand palette" : "Collapse palette"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      {!isCollapsed && (
        <>
          <div className="grid grid-cols-2 gap-2">
            {elementTypes.map(element => (
              <TooltipProvider key={element.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="justify-start"
                      id={`element-${element.id}`}
                      onClick={() => handleElementClick(element)}
                      onMouseEnter={() => handleElementHover(element)}
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
            {connectorTypes.map(connector => (
              <TooltipProvider key={connector.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="justify-start"
                      id={`element-${connector.id}`}
                      onClick={() => handleElementClick(connector)}
                      onMouseEnter={() => handleElementHover(connector)}
                    >
                      <connector.icon className={`h-4 w-4 mr-2 ${connector.iconClass || ''}`} />
                      {connector.name}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{connector.description}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </>
      )}
      
      {isCollapsed && (
        <div className="flex flex-col gap-2 items-center">
          {elementTypes.slice(0, 4).map(element => (
            <TooltipProvider key={element.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="p-1.5 h-auto w-auto"
                    onClick={() => handleElementClick(element)}
                  >
                    <element.icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{element.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      )}
    </div>
  );
}
