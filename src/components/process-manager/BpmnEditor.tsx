
import React, { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { EditorToolbar } from "./editor/EditorToolbar";
import { ElementTools } from "./editor/ElementTools";
import { BpmnCanvas } from "./editor/BpmnCanvas";
import { XmlSourceView } from "./editor/XmlSourceView";
import { SimulationView } from "./editor/SimulationView";
import { BpmnElementPalette } from "./BpmnElementPalette";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVoice } from "@/contexts/VoiceContext";

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

interface BpmnEditorProps {
  activeTool?: string;
}

interface ElementPropertiesType {
  id: string;
  name: string;
  type: string;
  description?: string;
  assignee?: string;
  duration?: string;
  priority?: string;
  documentation?: string;
  implementation?: string;
}

export const BpmnEditor: React.FC<BpmnEditorProps> = ({ activeTool = "select" }) => {
  const { toast } = useToast();
  const { isVoiceEnabled, speakText } = useVoice();
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
  const [connectingElement, setConnectingElement] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  
  // New States for enhanced functionality
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [elementProperties, setElementProperties] = useState<ElementPropertiesType | null>(null);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importSource, setImportSource] = useState("");
  const [history, setHistory] = useState<{
    elements: typeof elements;
    connections: typeof connections;
  }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Initialize history with current state
  useEffect(() => {
    setHistory([{ elements, connections }]);
    setHistoryIndex(0);
  }, []);

  // Sync with the parent component's tool selection
  useEffect(() => {
    if (activeTool) {
      setSelectedTool(activeTool);
    }
  }, [activeTool]);

  const saveToHistory = useCallback(() => {
    // Remove any "future" states if we're not at the end of the history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ elements: [...elements], connections: [...connections] });
    
    if (newHistory.length > 20) { // Limit history to 20 steps
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [elements, connections, history, historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousState = history[newIndex];
      
      setElements(previousState.elements);
      setConnections(previousState.connections);
      setHistoryIndex(newIndex);
      
      toast({
        title: "Undo",
        description: "Previous action has been undone.",
      });
    }
  }, [history, historyIndex, toast]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextState = history[newIndex];
      
      setElements(nextState.elements);
      setConnections(nextState.connections);
      setHistoryIndex(newIndex);
      
      toast({
        title: "Redo",
        description: "Action has been redone.",
      });
    }
  }, [history, historyIndex, toast]);

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
    toast({
      title: showValidation ? "Validation Hidden" : "Validation Shown",
      description: showValidation 
        ? "Process validation indicators are now hidden." 
        : "Process validation indicators are now visible.",
    });
  };

  const handleSaveModel = () => {
    // Simulate saving the model
    toast({
      title: "Model Saved",
      description: "Your BPMN model has been saved successfully."
    });
    
    if (isVoiceEnabled) {
      speakText("Model saved successfully");
    }
  };

  const handleExportXml = () => {
    // Create an XML file from the model
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
    
    if (isVoiceEnabled) {
      speakText("BPMN XML file exported successfully");
    }
  };

  const handleExportJson = () => {
    // Export as JSON for demonstration
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
    
    if (isVoiceEnabled) {
      speakText("Process model exported as JSON successfully");
    }
  };

  const handleImportClick = () => {
    setIsImportDialogOpen(true);
  };

  const handleImportConfirm = () => {
    try {
      // Basic validation that it's XML
      if (importSource.trim().startsWith('<?xml')) {
        setXmlSource(importSource);
        setIsImportDialogOpen(false);
        
        // For a real implementation, we would parse the XML and update the model
        // This is a simplified version for demonstration
        toast({
          title: "Import Successful",
          description: "BPMN XML has been imported successfully."
        });
        
        if (isVoiceEnabled) {
          speakText("BPMN XML imported successfully");
        }
      } else {
        toast({
          title: "Invalid XML",
          description: "The provided content doesn't appear to be valid BPMN XML.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Failed to import BPMN XML. Please check the format.",
        variant: "destructive"
      });
    }
  };

  const handleXmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setXmlSource(e.target.value);
    
    // In a real implementation, we would parse the XML and update the model
    // This is simplified for demonstration
  };

  const handleElementSelect = (elementId: string) => {
    if (selectedTool === "select") {
      setSelectedElement(elementId === selectedElement ? null : elementId);
      
      if (elementId !== selectedElement) {
        const element = elements.find(el => el.id === elementId);
        if (element) {
          setElementProperties({
            id: element.id,
            name: element.name,
            type: element.type,
            description: "",
            assignee: "",
            duration: "",
            priority: "medium",
            documentation: "",
            implementation: "",
          });
          
          if (isVoiceEnabled) {
            speakText(`Selected ${element.type} element: ${element.name}`);
          }
        }
      }
    } else if (selectedTool === "connector" && connectingElement === null) {
      // Start connecting
      setConnectingElement(elementId);
      
      if (isVoiceEnabled) {
        speakText("Connection started. Select a target element to complete the connection.");
      }
      
      toast({
        title: "Connection Started",
        description: "Select a target element to complete the connection.",
      });
    } else if (selectedTool === "connector" && connectingElement !== null && connectingElement !== elementId) {
      // Finish connecting
      const newConnectionId = `Flow_${Date.now()}`;
      const newConnection = {
        id: newConnectionId,
        sourceId: connectingElement,
        targetId: elementId,
        type: "sequence-flow"
      };
      
      const updatedConnections = [...connections, newConnection];
      setConnections(updatedConnections);
      setConnectingElement(null);
      
      // Save to history
      saveToHistory();
      
      if (isVoiceEnabled) {
        speakText("Connection created successfully");
      }
      
      toast({
        title: "Connection Created",
        description: "A new connection has been created between the elements."
      });
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
      
      const updatedElements = [...elements, newElement];
      setElements(updatedElements);
      setSelectedElement(newId);
      
      // Save to history
      saveToHistory();
      
      if (isVoiceEnabled) {
        speakText(`Added new ${elementType} element`);
      }
      
      toast({
        title: "Element Added",
        description: `New ${elementType} element has been added to the diagram.`
      });
    } else {
      setSelectedTool(elementType);
      
      if (isVoiceEnabled) {
        speakText("Connector tool selected. Select source and target elements to create a connection.");
      }
      
      toast({
        title: "Connector Tool Selected",
        description: "Select source and target elements to create a connection."
      });
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedTool !== "select" && selectedTool !== "connector" && selectedTool !== "hand") {
      // Calculate position relative to canvas
      const canvasRect = e.currentTarget.getBoundingClientRect();
      let xPos = (e.clientX - canvasRect.left) / (zoomLevel / 100);
      let yPos = (e.clientY - canvasRect.top) / (zoomLevel / 100);
      
      // Apply snap to grid if enabled
      if (snapToGrid) {
        xPos = Math.round(xPos / 20) * 20;
        yPos = Math.round(yPos / 20) * 20;
      }
      
      const newId = `${selectedTool}_${Date.now()}`;
      let name = `New ${selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)}`;
      
      if (selectedTool === "task") name = "New Task";
      if (selectedTool === "gateway") name = "New Gateway";
      if (selectedTool === "start-event" || selectedTool === "event") name = "New Event";
      if (selectedTool === "end-event") name = "End Event";
      if (selectedTool === "subprocess") name = "New Subprocess";
      if (selectedTool === "dataobject") name = "New Data Object";
      if (selectedTool === "pool") name = "New Pool";
      
      const newElement = {
        id: newId,
        type: selectedTool === "event" ? "start-event" : selectedTool,
        name,
        position: { x: xPos, y: yPos }
      };
      
      const updatedElements = [...elements, newElement];
      setElements(updatedElements);
      setSelectedElement(newId);
      
      // Save to history
      saveToHistory();
      
      if (isVoiceEnabled) {
        speakText(`Added new ${selectedTool} element`);
      }
      
      toast({
        title: "Element Added",
        description: `New ${selectedTool} element has been added to the diagram.`
      });
    } else if (connectingElement !== null && selectedTool === "connector") {
      // Cancel connecting if clicking on canvas
      setConnectingElement(null);
      
      if (isVoiceEnabled) {
        speakText("Connection canceled");
      }
      
      toast({
        title: "Connection Canceled",
        description: "Connection creation has been canceled."
      });
    } else if (selectedTool === "select") {
      // Deselect when clicking on canvas
      setSelectedElement(null);
      setElementProperties(null);
    }
  };

  const handleElementDelete = () => {
    if (selectedElement) {
      const updatedElements = elements.filter(el => el.id !== selectedElement);
      
      // Also remove any connections involving this element
      const updatedConnections = connections.filter(
        conn => conn.sourceId !== selectedElement && conn.targetId !== selectedElement
      );
      
      setElements(updatedElements);
      setConnections(updatedConnections);
      setSelectedElement(null);
      setElementProperties(null);
      
      // Save to history
      saveToHistory();
      
      if (isVoiceEnabled) {
        speakText("Element deleted successfully");
      }
      
      toast({
        title: "Element Deleted",
        description: "The selected element has been removed."
      });
    }
  };

  const handleElementDragStart = (e: React.MouseEvent, elementId: string) => {
    if (selectedTool === "select" || selectedTool === "move" || selectedTool === "hand") {
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
      let dx = (e.clientX - dragStartPos.x) / (zoomLevel / 100);
      let dy = (e.clientY - dragStartPos.y) / (zoomLevel / 100);
      
      // Calculate new position
      let newX = currentElementPosition.x + dx;
      let newY = currentElementPosition.y + dy;
      
      // Apply snap to grid if enabled
      if (snapToGrid) {
        newX = Math.round(newX / 20) * 20;
        newY = Math.round(newY / 20) * 20;
      }
      
      const updatedElements = elements.map(el => {
        if (el.id === selectedElement) {
          return {
            ...el,
            position: {
              x: newX,
              y: newY
            }
          };
        }
        return el;
      });
      
      setElements(updatedElements);
    }
  };

  const handleElementDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      
      // Save to history
      saveToHistory();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Track mouse position for drawing temporary connections
    const canvasRect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - canvasRect.left) / (zoomLevel / 100),
      y: (e.clientY - canvasRect.top) / (zoomLevel / 100)
    });
  };

  const handleSelectTool = (tool: string) => {
    setSelectedTool(tool);
    if (tool !== "connector") {
      setConnectingElement(null);
    }
    
    if (isVoiceEnabled) {
      speakText(`${tool} tool selected`);
    }
    
    toast({
      title: "Tool Selected",
      description: `${tool.charAt(0).toUpperCase() + tool.slice(1)} tool is now active.`,
      variant: "default"
    });
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
        
        const updatedElements = [...elements, newElement];
        setElements(updatedElements);
        setSelectedElement(newId);
        
        // Save to history
        saveToHistory();
        
        if (isVoiceEnabled) {
          speakText("Element duplicated successfully");
        }
        
        toast({
          title: "Element Duplicated",
          description: "The selected element has been duplicated."
        });
      }
    }
  };

  const handleEditElement = () => {
    if (selectedElement) {
      const element = elements.find(el => el.id === selectedElement);
      if (element) {
        setIsEditDialogOpen(true);
      }
    }
  };
  
  const handleUpdateElementProperties = () => {
    if (selectedElement && elementProperties) {
      const updatedElements = elements.map(el => {
        if (el.id === selectedElement) {
          return {
            ...el,
            name: elementProperties.name
          };
        }
        return el;
      });
      
      setElements(updatedElements);
      setIsEditDialogOpen(false);
      
      // Save to history
      saveToHistory();
      
      if (isVoiceEnabled) {
        speakText("Element properties updated successfully");
      }
      
      toast({
        title: "Element Updated",
        description: "The element properties have been updated successfully."
      });
    }
  };
  
  const handleToggleSnapToGrid = () => {
    setSnapToGrid(prev => !prev);
    
    toast({
      title: snapToGrid ? "Snap to Grid Disabled" : "Snap to Grid Enabled",
      description: snapToGrid 
        ? "Elements will move freely on the canvas." 
        : "Elements will snap to the grid when moved or created.",
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
          
          <EditorToolbar 
            zoomLevel={zoomLevel}
            showGrid={showGrid}
            showValidation={showValidation}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onToggleGrid={handleToggleGrid}
            onToggleValidation={handleToggleValidation}
            onSaveModel={handleSaveModel}
            onExportXml={handleExportXml}
            onExportJson={handleExportJson}
          />
        </div>
        
        <div className="flex-1">
          <TabsContent value="editor" className="flex-1 h-full m-0 p-0">
            <div className="relative h-full border-b flex flex-col">
              <ElementTools
                selectedTool={selectedTool}
                selectedElement={selectedElement}
                onSelectTool={handleSelectTool}
                onEditElement={handleEditElement}
                onDuplicateElement={handleDuplicateElement}
                onDeleteElement={handleElementDelete}
              />
              
              <BpmnElementPalette onAddElement={handleAddElement} />
              
              <div 
                className={`flex-1 overflow-auto relative ${showGrid ? 'bg-grid' : 'bg-slate-50'}`}
                style={{ height: 'calc(100% - 50px)' }}
                onClick={handleCanvasClick}
                onMouseMove={handleMouseMove}
              >
                <BpmnCanvas 
                  elements={elements}
                  connections={connections}
                  selectedElement={selectedElement}
                  selectedTool={selectedTool}
                  zoomLevel={zoomLevel}
                  showGrid={showGrid}
                  connectingElement={connectingElement}
                  mousePosition={mousePosition}
                  onElementSelect={handleElementSelect}
                  onElementDragStart={handleElementDragStart}
                  onElementDragMove={handleElementDragMove}
                  onElementDragEnd={handleElementDragEnd}
                />
              </div>
              
              <div className="border-t p-3 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">Process ID: Process_1</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleUndo}
                        disabled={historyIndex <= 0}
                        className="h-7 px-2"
                      >
                        Undo
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRedo}
                        disabled={historyIndex >= history.length - 1}
                        className="h-7 px-2"
                      >
                        Redo
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleToggleSnapToGrid}
                        className={`h-7 px-2 ${snapToGrid ? 'bg-muted' : ''}`}
                      >
                        {snapToGrid ? "Grid Snap: On" : "Grid Snap: Off"}
                      </Button>
                    </div>
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
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="mr-2">Full Screen</Button>
                  <Button>Run Simulation</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="xml" className="flex-1 h-full m-0 p-4">
            <XmlSourceView 
              xmlSource={xmlSource}
              onXmlChange={handleXmlChange}
            />
            
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={handleImportClick}>Import XML</Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExportXml}>Export XML</Button>
                <Button onClick={handleSaveModel}>Apply Changes</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="simulation" className="flex-1 flex flex-col p-4 h-full m-0">
            <SimulationView />
          </TabsContent>
        </div>
      </div>
      
      {/* Element Properties Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Element Properties</DialogTitle>
          </DialogHeader>
          {elementProperties && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="element-name">Name</Label>
                <Input
                  id="element-name"
                  value={elementProperties.name}
                  onChange={(e) => setElementProperties({
                    ...elementProperties,
                    name: e.target.value
                  })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="element-type">Type</Label>
                  <Input
                    id="element-type"
                    value={elementProperties.type
                      .split('-')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                    disabled
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="element-id">ID</Label>
                  <Input
                    id="element-id"
                    value={elementProperties.id}
                    disabled
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="element-description">Description</Label>
                <Input
                  id="element-description"
                  value={elementProperties.description}
                  onChange={(e) => setElementProperties({
                    ...elementProperties,
                    description: e.target.value
                  })}
                />
              </div>
              
              {(elementProperties.type === 'task' || elementProperties.type === 'subprocess') && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="element-assignee">Assignee</Label>
                    <Input
                      id="element-assignee"
                      value={elementProperties.assignee}
                      onChange={(e) => setElementProperties({
                        ...elementProperties,
                        assignee: e.target.value
                      })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="element-duration">Duration</Label>
                      <Input
                        id="element-duration"
                        value={elementProperties.duration}
                        onChange={(e) => setElementProperties({
                          ...elementProperties,
                          duration: e.target.value
                        })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="element-priority">Priority</Label>
                      <Select
                        value={elementProperties.priority}
                        onValueChange={(value) => setElementProperties({
                          ...elementProperties,
                          priority: value
                        })}
                      >
                        <SelectTrigger id="element-priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {elementProperties.type === 'task' && (
                    <div className="grid gap-2">
                      <Label htmlFor="element-implementation">Implementation</Label>
                      <Select
                        value={elementProperties.implementation || ""}
                        onValueChange={(value) => setElementProperties({
                          ...elementProperties,
                          implementation: value
                        })}
                      >
                        <SelectTrigger id="element-implementation">
                          <SelectValue placeholder="Select implementation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unspecified">Unspecified</SelectItem>
                          <SelectItem value="webservice">Web Service</SelectItem>
                          <SelectItem value="script">Script</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}
              
              <div className="grid gap-2">
                <Label htmlFor="element-documentation">Documentation</Label>
                <textarea
                  id="element-documentation"
                  className="min-h-[100px] rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm"
                  value={elementProperties.documentation}
                  onChange={(e) => setElementProperties({
                    ...elementProperties,
                    documentation: e.target.value
                  })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateElementProperties}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Import BPMN XML</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <textarea
              className="min-h-[300px] rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm font-mono"
              value={importSource}
              onChange={(e) => setImportSource(e.target.value)}
              placeholder="Paste BPMN XML here..."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleImportConfirm}>Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
};
