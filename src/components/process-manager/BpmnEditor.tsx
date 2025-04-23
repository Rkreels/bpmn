
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
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [activeTab, setActiveTab] = useState("editor");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [showValidation, setShowValidation] = useState(false);
  const [xmlSource, setXmlSource] = useState(sampleBpmnXml);

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
    // In a real implementation, this would save the model to the backend
    console.log("Saving BPMN model...");
    // Simulate successful save
    const timestamp = new Date().toLocaleTimeString();
    console.log(`Model saved at ${timestamp}`);
  };

  const handleExportXml = () => {
    // In a real implementation, this would trigger a file download
    console.log("Exporting BPMN XML...");
    const blob = new Blob([xmlSource], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "process-model.bpmn";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    // In a real implementation, this would convert BPMN XML to JSON and trigger download
    console.log("Exporting BPMN as JSON...");
    // Simple mock JSON conversion
    const mockJson = JSON.stringify(
      {
        id: "Process_1",
        name: "Order Processing",
        nodes: [
          { id: "StartEvent_1", type: "startEvent", name: "Order received" },
          { id: "Activity_1", type: "task", name: "Process Order" },
          { id: "EndEvent_1", type: "endEvent", name: "Order fulfilled" },
        ],
        edges: [
          { id: "Flow_1", source: "StartEvent_1", target: "Activity_1" },
          { id: "Flow_2", source: "Activity_1", target: "EndEvent_1" },
        ],
      },
      null,
      2
    );

    const blob = new Blob([mockJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "process-model.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleXmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setXmlSource(e.target.value);
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
              <div className="absolute left-4 top-4 bg-white border rounded shadow-sm p-2 z-10">
                <h4 className="text-sm font-medium mb-2">Elements</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <div className="w-5 h-5 mr-2 rounded-full border border-black flex items-center justify-center text-[10px]">S</div>
                    Start
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <div className="w-5 h-5 mr-2 rounded-md border border-black"></div>
                    Task
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <div className="w-5 h-5 mr-2 diamond border border-black"></div>
                    Gateway
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <div className="w-5 h-5 mr-2 rounded-full border border-black flex items-center justify-center text-[10px]">E</div>
                    End
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center p-4 h-full bg-slate-50">
                <div 
                  className={`bg-white border ${showGrid ? 'bg-grid' : ''}`} 
                  style={{ 
                    width: '100%', 
                    height: '80%', 
                    transform: `scale(${zoomLevel/100})`,
                    transformOrigin: 'center',
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    [BPMN Editor Canvas - In a production app, this would integrate with an actual BPMN.js library]
                  </div>
                </div>
              </div>
              
              <div className="border-t p-3 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground">Process ID: Process_1</span>
                  </div>
                  <div>
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

