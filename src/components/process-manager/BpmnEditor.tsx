
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { EditorToolbar } from "./editor/EditorToolbar";
import { ElementTools } from "./editor/ElementTools";
import { BpmnCanvas } from "./editor/BpmnCanvas";
import { XmlSourceView } from "./editor/XmlSourceView";
import { SimulationView } from "./editor/SimulationView";
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

  const handleEditElement = () => {
    const element = elements.find(el => el.id === selectedElement);
    if (element) {
      toast({
        title: "Edit Element",
        description: `Editing ${element.name}`
      });
    }
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
                onSelectTool={setSelectedTool}
                onEditElement={handleEditElement}
                onDuplicateElement={handleDuplicateElement}
                onDeleteElement={handleElementDelete}
              />
              
              <BpmnElementPalette onAddElement={handleAddElement} />
              
              <BpmnCanvas 
                elements={elements}
                connections={connections}
                selectedElement={selectedElement}
                selectedTool={selectedTool}
                zoomLevel={zoomLevel}
                showGrid={showGrid}
                onElementSelect={handleElementSelect}
                onElementDragStart={handleElementDragStart}
                onElementDragMove={handleElementDragMove}
                onElementDragEnd={handleElementDragEnd}
              />
              
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
            <XmlSourceView 
              xmlSource={xmlSource}
              onXmlChange={handleXmlChange}
            />
          </TabsContent>
          
          <TabsContent value="simulation" className="flex-1 flex flex-col p-4 h-full m-0">
            <SimulationView />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};
