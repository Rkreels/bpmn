import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EditorToolbar } from "./EditorToolbar";
import { ElementTools } from "./ElementTools";
import { BpmnCanvas } from "./BpmnCanvas";
import { XmlSourceView } from "./XmlSourceView";
import { BpmnElementPalette } from "../BpmnElementPalette";
import { ProcessTemplateSelector } from "../ProcessTemplateSelector";
import { ProcessValidator } from "./validation/ProcessValidator";
import { ProcessSimulator } from "./simulation/ProcessSimulator";
import { BpmnExporter } from "./export/BpmnExporter";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, Share2, Layout } from "lucide-react";

interface BpmnEditorTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  zoomLevel: number;
  showGrid: boolean;
  showValidation: boolean;
  xmlSource: string;
  elements: any[];
  connections: any[];
  selectedElement: string | null;
  selectedTool: string;
  connectingElement: string | null;
  mousePosition: { x: number; y: number };
  historyIndex: number;
  history: any[];
  snapToGrid: boolean;

  // Handlers
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleGrid: () => void;
  onToggleValidation: () => void;
  onSaveModel: () => void;
  onExportXml: () => void;
  onExportJson: () => void;
  onXmlChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCanvasClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onElementSelect: (elementId: string | null) => void;
  onElementDragStart: (e: React.MouseEvent, elementId: string) => void;
  onElementDragMove: (e: React.MouseEvent) => void;
  onElementDragEnd: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onSelectTool: (tool: string) => void;
  onEditElement: () => void;
  onDuplicateElement: () => void;
  onDeleteElement: () => void;
  onAddElement: (elementType: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onToggleSnapToGrid: () => void;
  onImportClick: () => void;
  onLoadTemplate: (templateId: string) => void;
  onElementUpdate: (elementId: string, updates: any) => void;
  onConnectionCreate: (sourceId: string, targetId: string) => void;
}

export const BpmnEditorTabs: React.FC<BpmnEditorTabsProps> = ({
  activeTab,
  setActiveTab,
  zoomLevel,
  showGrid,
  showValidation,
  xmlSource,
  elements,
  connections,
  selectedElement,
  selectedTool,
  connectingElement,
  mousePosition,
  historyIndex,
  history,
  snapToGrid,
  
  // Handlers
  onZoomIn,
  onZoomOut,
  onToggleGrid,
  onToggleValidation,
  onSaveModel,
  onExportXml,
  onExportJson,
  onXmlChange,
  onCanvasClick,
  onElementSelect,
  onElementDragStart,
  onElementDragMove,
  onElementDragEnd,
  onMouseMove,
  onSelectTool,
  onEditElement,
  onDuplicateElement,
  onDeleteElement,
  onAddElement,
  onUndo,
  onRedo,
  onToggleSnapToGrid,
  onImportClick,
  onLoadTemplate,
  onElementUpdate,
  onConnectionCreate
}) => {
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);
  const { toast } = useToast();

  const handleExportBpmn = () => {
    try {
      const xml = BpmnExporter.exportToBpmn20Xml(elements, connections, 'Business Process');
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `process-${Date.now()}.bpmn`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "BPMN Export Complete",
        description: "Process exported as BPMN 2.0 XML file"
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not export process model",
        variant: "destructive"
      });
    }
  };

  const handleExportJson = () => {
    try {
      const json = BpmnExporter.exportToJson(elements, connections);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `process-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "JSON Export Complete",
        description: "Process exported as JSON file"
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not export process model",
        variant: "destructive"
      });
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full min-h-[600px]">
      <div className="bg-white border rounded-md flex flex-col h-full">
        <div className="border-b p-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="xml">XML</TabsTrigger>
              <TabsTrigger value="simulation">Simulation</TabsTrigger>
              <TabsTrigger value="validation">Validation</TabsTrigger>
            </TabsList>
            
            <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Templates
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Select Process Template</DialogTitle>
                </DialogHeader>
                <ProcessTemplateSelector
                  onLoadTemplate={(templateId) => {
                    onLoadTemplate(templateId);
                    setIsTemplateDialogOpen(false);
                  }}
                  onPreviewTemplate={(templateId) => {
                    console.log("Preview template:", templateId);
                  }}
                />
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm" onClick={handleExportBpmn}>
              <Download className="h-4 w-4 mr-2" />
              Export BPMN
            </Button>

            <Button variant="outline" size="sm" onClick={handleExportJson}>
              <Share2 className="h-4 w-4 mr-2" />
              Export JSON
            </Button>
          </div>
          
          <EditorToolbar 
            zoomLevel={zoomLevel}
            showGrid={showGrid}
            showValidation={showValidation}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            onToggleGrid={onToggleGrid}
            onToggleValidation={onToggleValidation}
            onSaveModel={onSaveModel}
            onExportXml={onExportXml}
            onExportJson={handleExportJson}
          />
        </div>
        
        <div className="flex-1">
          <TabsContent value="editor" className="flex-1 h-full m-0 p-0">
            <div className="relative h-full border-b flex flex-col">
              <ElementTools
                selectedTool={selectedTool}
                selectedElement={selectedElement}
                onSelectTool={onSelectTool}
                onEditElement={onEditElement}
                onDuplicateElement={onDuplicateElement}
                onDeleteElement={onDeleteElement}
              />
              
              <BpmnElementPalette onAddElement={onAddElement} />
              
              <div 
                className={`flex-1 overflow-auto relative ${showGrid ? 'bg-grid-pattern' : 'bg-slate-50'}`}
                style={{ height: 'calc(100% - 50px)' }}
                onClick={onCanvasClick}
                onMouseMove={onMouseMove}
              >
                <BpmnCanvas 
                  elements={elements}
                  connections={connections}
                  selectedElement={highlightedElement || selectedElement}
                  selectedTool={selectedTool}
                  zoomLevel={zoomLevel}
                  showGrid={showGrid}
                  snapToGrid={snapToGrid}
                  connectingElement={connectingElement}
                  mousePosition={mousePosition}
                  onElementSelect={onElementSelect}
                  onElementDragStart={onElementDragStart}
                  onElementDragMove={onElementDragMove}
                  onElementDragEnd={onElementDragEnd}
                  onElementUpdate={onElementUpdate}
                  onConnectionCreate={onConnectionCreate}
                  onCanvasClick={onCanvasClick}
                />
              </div>
              
              <div className="border-t p-3 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">Elements: {elements.length} | Connections: {connections.length}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onUndo}
                        disabled={historyIndex <= 0}
                        className="h-7 px-2"
                      >
                        Undo
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onRedo}
                        disabled={historyIndex >= history.length - 1}
                        className="h-7 px-2"
                      >
                        Redo
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onToggleSnapToGrid}
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
                    <span className="text-xs text-muted-foreground">Auto-saved</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="flex-1 flex items-center justify-center p-4 h-full m-0">
            <div className="w-full h-full flex flex-col items-center justify-center border rounded-md bg-slate-50 p-6">
              <div className="w-full max-w-4xl">
                <h3 className="text-lg font-medium mb-4">Process Preview</h3>
                <div className="border rounded-md bg-white p-8 flex items-center justify-center min-h-[400px]">
                  {elements.length > 0 ? (
                    <div className="w-full">
                      <div className="text-center mb-6">
                        <h4 className="text-md font-medium mb-2">Process Flow Diagram</h4>
                        <p className="text-sm text-muted-foreground">
                          {elements.length} elements • {connections.length} connections
                        </p>
                      </div>
                      
                      <div className="relative w-full h-64 border rounded bg-gray-50 overflow-hidden">
                        <BpmnCanvas
                          elements={elements.map(el => ({ ...el, x: el.x * 0.3, y: el.y * 0.3 }))}
                          connections={connections}
                          selectedElement={null}
                          selectedTool="select"
                          zoomLevel={30}
                          showGrid={false}
                          connectingElement={null}
                          mousePosition={{ x: 0, y: 0 }}
                          onElementSelect={() => {}}
                          onElementDragStart={() => {}}
                          onElementDragMove={() => {}}
                          onElementDragEnd={() => {}}
                          onElementUpdate={() => {}}
                          onConnectionCreate={() => {}}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Layout className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>No elements to preview</p>
                      <p className="text-sm">Add elements to see the process flow</p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline">Full Screen</Button>
                  <Button>Run Simulation</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="xml" className="flex-1 h-full m-0 p-4">
            <XmlSourceView 
              xmlSource={BpmnExporter.exportToBpmn20Xml(elements, connections)}
              onXmlChange={onXmlChange}
            />
            
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={onImportClick}>Import XML</Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExportBpmn}>Export BPMN</Button>
                <Button onClick={onSaveModel}>Apply Changes</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="simulation" className="flex-1 h-full m-0 p-4">
            <ProcessSimulator 
              elements={elements}
              connections={connections}
              onElementHighlight={setHighlightedElement}
            />
          </TabsContent>

          <TabsContent value="validation" className="flex-1 h-full m-0 p-4">
            <ProcessValidator 
              elements={elements}
              connections={connections}
              onElementHighlight={setHighlightedElement}
            />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};
