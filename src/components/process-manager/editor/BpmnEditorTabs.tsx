import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EditorToolbar } from "./EditorToolbar";
import { ElementTools } from "./ElementTools";
import { BpmnCanvas } from "./BpmnCanvas";
import { XmlSourceView } from "./XmlSourceView";
import { SimulationView } from "./SimulationView";
import { BpmnElementPalette } from "../BpmnElementPalette";
import { ProcessTemplateSelector } from "../ProcessTemplateSelector";
import { FileText, Layout } from "lucide-react";

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
  onElementSelect: (elementId: string) => void;
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
  onLoadTemplate
}) => {
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

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
            onExportJson={onExportJson}
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
                className={`flex-1 overflow-auto relative ${showGrid ? 'bg-grid' : 'bg-slate-50'}`}
                style={{ height: 'calc(100% - 50px)' }}
                onClick={onCanvasClick}
                onMouseMove={onMouseMove}
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
                  onElementSelect={onElementSelect}
                  onElementDragStart={onElementDragStart}
                  onElementDragMove={onElementDragMove}
                  onElementDragEnd={onElementDragEnd}
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
                    <span className="text-xs text-muted-foreground">Last saved: {new Date().toLocaleString()}</span>
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
                      
                      <div className="flex items-center justify-center gap-8 flex-wrap">
                        {elements.slice(0, 5).map((element, index) => (
                          <div key={element.id} className="flex flex-col items-center">
                            <div className="w-16 h-12 rounded-md border-2 border-blue-500 flex items-center justify-center text-xs mb-2 bg-blue-50">
                              {element.type.includes('start') ? 'START' : 
                               element.type.includes('end') ? 'END' : 
                               element.type.includes('gateway') ? 'GATE' : 'TASK'}
                            </div>
                            <span className="text-xs text-center max-w-20 truncate">{element.name}</span>
                            {index < elements.length - 1 && index < 4 && (
                              <div className="w-8 h-0.5 bg-blue-500 mt-2"></div>
                            )}
                          </div>
                        ))}
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
              xmlSource={xmlSource}
              onXmlChange={onXmlChange}
            />
            
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={onImportClick}>Import XML</Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onExportXml}>Export XML</Button>
                <Button onClick={onSaveModel}>Apply Changes</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="simulation" className="flex-1 flex flex-col p-4 h-full m-0">
            <SimulationView />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};
