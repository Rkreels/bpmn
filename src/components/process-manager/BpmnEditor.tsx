
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  FileJson,
  FileCode,
  Download,
  Upload,
  Settings,
  Save,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Check,
  Code,
  Move,
  Link,
  Edit,
  Trash2,
  Copy
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { BpmnElementPalette } from "./BpmnElementPalette";

// Sample XML for demonstration
const sampleBpmnXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="Order received">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_1" name="Process Order">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Activity_1" />
    <bpmn:endEvent id="EndEvent_1" name="Order fulfilled">
      <bpmn:incoming>Flow_2</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Activity_1" targetRef="EndEvent_1" />
  </bpmn:process>
</bpmn:definitions>`;

export const BpmnEditor: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("editor");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [showValidation, setShowValidation] = useState(false);
  const [xmlSource, setXmlSource] = useState(sampleBpmnXml);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>("select");
  const [elements, setElements] = useState([
    { id: "StartEvent_1", type: "start-event", name: "Order received", position: { x: 150, y: 150 } },
    { id: "Activity_1", type: "task", name: "Process Order", position: { x: 300, y: 150 } },
    { id: "EndEvent_1", type: "end-event", name: "Order fulfilled", position: { x: 450, y: 150 } },
  ]);
  const [connections, setConnections] = useState([
    { id: "Flow_1", sourceId: "StartEvent_1", targetId: "Activity_1", type: "sequence-flow" },
    { id: "Flow_2", sourceId: "Activity_1", targetId: "EndEvent_1", type: "sequence-flow" },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [currentElementPosition, setCurrentElementPosition] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 30));
  };

  const handleToggleGrid = () => {
    setShowGrid((prev) => !prev);
  };

  const handleToggleValidation = () => {
    setShowValidation((prev) => !prev);
  };

  const handleSaveModel = () => {
    toast({
      title: "Model Saved",
      description: "Your BPMN model has been saved successfully."
    });
  };

  const handleExportXml = () => {
    const blob = new Blob([xmlSource], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "process-model.bpmn";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "BPMN XML Exported",
      description: "The BPMN XML file has been downloaded."
    });
  };

  const handleExportJson = () => {
    // Simple conversion to JSON for demonstration
    const processJson = {
      id: "Process_1",
      name: "Order Processing",
      elements: elements,
      connections: connections
    };

    const blob = new Blob([JSON.stringify(processJson, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "process-model.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "JSON Exported",
      description: "The process model JSON has been downloaded."
    });
  };

  const handleXmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setXmlSource(e.target.value);
  };

  const handleElementSelect = (elementId: string) => {
    if (selectedTool === "select") {
      setSelectedElement(elementId === selectedElement ? null : elementId);
    }
  };

  const handleAddElement = (elementType: string) => {
    // Only handle element types, not connectors
    if (!elementType.includes("flow")) {
      const newId = `${elementType}_${Date.now()}`;
      const newElement = {
        id: newId,
        type: elementType,
        name: `New ${elementType.charAt(0).toUpperCase() + elementType.slice(1)}`,
        position: { x: 200, y: 200 } // Default position
      };
      
      setElements([...elements, newElement]);
      setSelectedElement(newId);
      
      toast({
        title: "Element Added",
        description: `New ${elementType} element has been added to the diagram.`
      });
    } else {
      setSelectedTool(elementType);
      toast({
        title: "Connector Tool Selected",
        description: "Select source and target elements to create a connection."
      });
    }
  };

  const handleElementDelete = () => {
    if (selectedElement) {
      setElements(elements.filter(el => el.id !== selectedElement));
      // Also remove any connections involving this element
      setConnections(connections.filter(
        conn => conn.sourceId !== selectedElement && conn.targetId !== selectedElement
      ));
      
      setSelectedElement(null);
      toast({
        title: "Element Deleted",
        description: "The selected element has been removed."
      });
    }
  };

  const handleElementDragStart = (e: React.MouseEvent, elementId: string) => {
    if (selectedTool === "select" || selectedTool === "move") {
      e.preventDefault();
      const element = elements.find(el => el.id === elementId);
      if (element) {
        setSelectedElement(elementId);
        setIsDragging(true);
        setDragStartPos({ x: e.clientX, y: e.clientY });
        setCurrentElementPosition(element.position);
      }
    }
  };

  const handleElementDragMove = (e: React.MouseEvent) => {
    if (isDragging && selectedElement) {
      const dx = e.clientX - dragStartPos.x;
      const dy = e.clientY - dragStartPos.y;
      
      setElements(elements.map(el => {
        if (el.id === selectedElement) {
          return {
            ...el,
            position: {
              x: currentElementPosition.x + dx,
              y: currentElementPosition.y + dy
            }
          };
        }
        return el;
      }));
    }
  };

  const handleElementDragEnd = () => {
    setIsDragging(false);
  };

  const handleDuplicateElement = () => {
    if (selectedElement) {
      const elementToDuplicate = elements.find(el => el.id === selectedElement);
      if (elementToDuplicate) {
        const newId = `${elementToDuplicate.type}_${Date.now()}`;
        const newElement = {
          ...elementToDuplicate,
          id: newId,
          position: {
            x: elementToDuplicate.position.x + 30,
            y: elementToDuplicate.position.y + 30
          }
        };
        
        setElements([...elements, newElement]);
        setSelectedElement(newId);
        
        toast({
          title: "Element Duplicated",
          description: "The selected element has been duplicated."
        });
      }
    }
  };

  // Helper functions to render elements based on their type
  const renderElement = (element: any) => {
    const isSelected = selectedElement === element.id;
    const commonClasses = `absolute cursor-${selectedTool === "select" || selectedTool === "move" ? "move" : "pointer"} ${isSelected ? "ring-2 ring-primary shadow-lg" : ""}`;
    
    switch(element.type) {
      case "task":
        return (
          <div 
            className={`${commonClasses} bg-white border rounded-md p-2 w-32 h-20 flex items-center justify-center text-center`}
            style={{ left: element.position.x, top: element.position.y }}
            onClick={() => handleElementSelect(element.id)}
            onMouseDown={(e) => handleElementDragStart(e, element.id)}
            onMouseMove={handleElementDragMove}
            onMouseUp={handleElementDragEnd}
            onMouseLeave={handleElementDragEnd}
          >
            {element.name}
          </div>
        );
        
      case "gateway":
        return (
          <div 
            className={`${commonClasses}`}
            style={{ 
              left: element.position.x, 
              top: element.position.y,
              width: "60px",
              height: "60px"
            }}
            onClick={() => handleElementSelect(element.id)}
            onMouseDown={(e) => handleElementDragStart(e, element.id)}
            onMouseMove={handleElementDragMove}
            onMouseUp={handleElementDragEnd}
            onMouseLeave={handleElementDragEnd}
          >
            <div className="w-full h-full bg-white border transform rotate-45 flex items-center justify-center">
              <span className="transform -rotate-45 text-center">{element.name}</span>
            </div>
          </div>
        );
        
      case "start-event":
        return (
          <div 
            className={`${commonClasses} bg-white border rounded-full w-12 h-12 flex items-center justify-center`}
            style={{ left: element.position.x, top: element.position.y }}
            onClick={() => handleElementSelect(element.id)}
            onMouseDown={(e) => handleElementDragStart(e, element.id)}
            onMouseMove={handleElementDragMove}
            onMouseUp={handleElementDragEnd}
            onMouseLeave={handleElementDragEnd}
          >
            <div className="text-xs">{element.name}</div>
          </div>
        );
        
      case "end-event":
        return (
          <div 
            className={`${commonClasses} bg-white border-2 border-black rounded-full w-12 h-12 flex items-center justify-center`}
            style={{ left: element.position.x, top: element.position.y }}
            onClick={() => handleElementSelect(element.id)}
            onMouseDown={(e) => handleElementDragStart(e, element.id)}
            onMouseMove={handleElementDragMove}
            onMouseUp={handleElementDragEnd}
            onMouseLeave={handleElementDragEnd}
          >
            <div className="text-xs">{element.name}</div>
          </div>
        );
        
      default:
        return (
          <div 
            className={`${commonClasses} bg-white border rounded-md p-2 w-24 h-16 flex items-center justify-center`}
            style={{ left: element.position.x, top: element.position.y }}
            onClick={() => handleElementSelect(element.id)}
            onMouseDown={(e) => handleElementDragStart(e, element.id)}
            onMouseMove={handleElementDragMove}
            onMouseUp={handleElementDragEnd}
            onMouseLeave={handleElementDragEnd}
          >
            {element.name}
          </div>
        );
    }
  };

  // Render connections between elements
  const renderConnections = () => {
    return connections.map(conn => {
      const source = elements.find(el => el.id === conn.sourceId);
      const target = elements.find(el => el.id === conn.targetId);
      
      if (source && target) {
        const sourceX = source.position.x + 50; // Approximate center
        const sourceY = source.position.y + 30;
        const targetX = target.position.x + 50;
        const targetY = target.position.y + 30;
        
        return (
          <svg 
            key={conn.id} 
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          >
            <line
              x1={sourceX}
              y1={sourceY}
              x2={targetX}
              y2={targetY}
              stroke="black"
              strokeWidth={conn.type === "message-flow" ? 1 : 2}
              strokeDasharray={conn.type === "message-flow" ? "5,5" : ""}
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" />
              </marker>
            </defs>
          </svg>
        );
      }
      return null;
    });
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full min-h-[600px]">
      <div className="bg-white border rounded-md flex flex-col h-full">
        <div className="border-b p-2 flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="xml">XML</TabsTrigger>
            <TabsTrigger value="simulation">Simulation</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom Out</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="text-xs font-medium w-12 text-center">{zoomLevel}%</span>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom In</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleToggleGrid}>
                    <Code className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{showGrid ? "Hide Grid" : "Show Grid"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleToggleValidation}>
                    <Check className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{showValidation ? "Hide Validation" : "Show Validation"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleSaveModel}>
                    <Save className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Save Model</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center border-l ml-1 pl-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleExportXml}>
                      <FileCode className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Export XML</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleExportJson}>
                      <FileJson className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Export JSON</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <TabsContent value="editor" className="flex-1 h-full m-0 p-0">
            <div className="relative h-full border-b flex flex-col">
              <div className="p-2 border-b bg-muted/20">
                <div className="flex gap-2">
                  <Button 
                    variant={selectedTool === "select" ? "secondary" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedTool("select")}
                  >
                    Select
                  </Button>
                  <Button 
                    variant={selectedTool === "move" ? "secondary" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedTool("move")}
                  >
                    <Move className="h-4 w-4 mr-1" />
                    Move
                  </Button>
                  <Button 
                    variant={selectedTool === "sequence-flow" ? "secondary" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedTool("sequence-flow")}
                  >
                    <Link className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                  
                  {selectedElement && (
                    <div className="ml-auto flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          const element = elements.find(el => el.id === selectedElement);
                          if (element) {
                            toast({
                              title: "Edit Element",
                              description: `Editing ${element.name}`
                            });
                          }
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleDuplicateElement}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Duplicate
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleElementDelete}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <BpmnElementPalette onAddElement={handleAddElement} />
              
              <div 
                className={`flex-1 overflow-auto relative ${showGrid ? 'bg-grid' : 'bg-slate-50'}`}
                style={{ height: 'calc(100% - 50px)' }}
              >
                <div
                  className="h-full w-full relative"
                  style={{ 
                    transform: `scale(${zoomLevel/100})`,
                    transformOrigin: 'top left',
                    transition: 'transform 0.2s ease-out',
                    minWidth: '2000px',
                    minHeight: '1000px'
                  }}
                >
                  {/* Render connections */}
                  {renderConnections()}
                  
                  {/* Render elements */}
                  {elements.map(element => renderElement(element))}
                </div>
              </div>
              
              <div className="border-t p-3 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground">Process ID: Process_1</span>
                  </div>
                  <div>
                    {selectedElement && (
                      <span className="text-xs font-medium mr-4">
                        Selected: {elements.find(el => el.id === selectedElement)?.name || selectedElement}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">Last saved: {new Date().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="flex-1 flex items-center justify-center p-4 h-full m-0">
            <div className="w-full h-full flex flex-col items-center justify-center border rounded-md bg-slate-50 p-6">
              <div className="w-full max-w-3xl">
                <h3 className="text-lg font-medium mb-4">Process Preview</h3>
                <div className="border rounded-md bg-white p-8 flex items-center justify-center">
                  <div className="text-muted-foreground flex flex-col items-center">
                    <p>[BPMN Preview - Shows a read-only rendered version of the BPMN diagram]</p>
                    <div className="mt-4 flex items-center gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center text-xs mb-2">S</div>
                        <span className="text-xs">Start</span>
                      </div>
                      <div className="w-12 h-0.5 bg-black"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-12 rounded-md border border-black flex items-center justify-center text-xs mb-2">Process</div>
                        <span className="text-xs">Activity</span>
                      </div>
                      <div className="w-12 h-0.5 bg-black"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center text-xs mb-2">E</div>
                        <span className="text-xs">End</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="xml" className="flex-1 h-full m-0 p-4">
            <div className="h-full flex flex-col">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">BPMN XML Source</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              <div className="flex-1 border rounded-md overflow-hidden">
                <textarea
                  className="font-mono text-sm w-full h-full p-4 focus:outline-none resize-none"
                  value={xmlSource}
                  onChange={handleXmlChange}
                  spellCheck="false"
                ></textarea>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="simulation" className="flex-1 flex flex-col p-4 h-full m-0">
            <div className="border rounded-md bg-white p-6 flex-1">
              <h3 className="text-lg font-medium mb-4">Process Simulation</h3>
              
              <div className="mb-6">
                <p className="text-muted-foreground mb-4">Configure simulation parameters and run scenarios to analyze process performance.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Resource Configuration</h4>
                    <p className="text-sm text-muted-foreground">Set the number of resources available for each activity.</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Resources
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Time Parameters</h4>
                    <p className="text-sm text-muted-foreground">Set processing times, delays, and waiting times.</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Times
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Costs & Metrics</h4>
                    <p className="text-sm text-muted-foreground">Define costs and KPIs to track during simulation.</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Metrics
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button size="lg">
                  Run Simulation
                </Button>
              </div>
              
              <div className="mt-8 border-t pt-6">
                <h4 className="font-medium mb-4">Simulation Results</h4>
                <div className="flex items-center justify-center border rounded-md p-8 bg-muted/50">
                  <p className="text-muted-foreground">Run a simulation to see results and analytics</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};
