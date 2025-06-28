
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BpmnCanvas } from './BpmnCanvas';
import { BpmnElementPalette } from '../BpmnElementPalette';
import { EditorToolbar } from './EditorToolbar';
import { XmlSourceView } from './XmlSourceView';
import { SimulationView } from './SimulationView';
import { ZoomIn, ZoomOut, Grid, Play, Save, Download } from 'lucide-react';

interface BpmnEditorTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
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
  
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleGrid: () => void;
  onToggleValidation: () => void;
  onSaveModel: () => void;
  onExportXml: () => void;
  onExportJson: () => void;
  onXmlChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCanvasClick: (e: React.MouseEvent) => void;
  onElementSelect: (id: string | null) => void;
  onElementDragStart: (e: React.MouseEvent, elementId: string) => void;
  onElementDragMove: (e: React.MouseEvent) => void;
  onElementDragEnd: () => void;
  onElementUpdate: (elementId: string, updates: any) => void;
  onConnectionCreate: (sourceId: string, targetId: string) => void;
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

export const BpmnEditorTabs: React.FC<BpmnEditorTabsProps> = (props) => {
  return (
    <div className="w-full h-full">
      <Tabs value={props.activeTab} onValueChange={props.setActiveTab} className="w-full h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <TabsList>
            <TabsTrigger value="editor">Visual Editor</TabsTrigger>
            <TabsTrigger value="xml">XML Source</TabsTrigger>
            <TabsTrigger value="simulation">Simulation</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={props.onZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{props.zoomLevel}%</span>
            <Button variant="outline" size="sm" onClick={props.onZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button 
              variant={props.showGrid ? "default" : "outline"} 
              size="sm" 
              onClick={props.onToggleGrid}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={props.onSaveModel}>
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={props.onExportXml}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="editor" className="relative h-full">
          <div className="flex h-full">
            <BpmnElementPalette onAddElement={props.onAddElement} />
            <div className="flex-1 relative">
              <EditorToolbar
                selectedTool={props.selectedTool}
                onSelectTool={props.onSelectTool}
                onUndo={props.onUndo}
                onRedo={props.onRedo}
                canUndo={props.historyIndex > 0}
                canRedo={props.historyIndex < props.history.length - 1}
                onEditElement={props.onEditElement}
                onDuplicateElement={props.onDuplicateElement}
                onDeleteElement={props.onDeleteElement}
                hasSelectedElement={!!props.selectedElement}
              />
              <BpmnCanvas
                elements={props.elements}
                connections={props.connections}
                selectedElement={props.selectedElement}
                selectedTool={props.selectedTool}
                zoomLevel={props.zoomLevel}
                showGrid={props.showGrid}
                snapToGrid={props.snapToGrid}
                connectingElement={props.connectingElement}
                mousePosition={props.mousePosition}
                onElementSelect={props.onElementSelect}
                onElementDragStart={props.onElementDragStart}
                onElementDragMove={props.onElementDragMove}
                onElementDragEnd={props.onElementDragEnd}
                onElementUpdate={props.onElementUpdate}
                onConnectionCreate={props.onConnectionCreate}
                onCanvasClick={props.onCanvasClick}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="xml" className="h-full">
          <XmlSourceView 
            xmlSource={props.xmlSource}
            onXmlChange={props.onXmlChange}
          />
        </TabsContent>

        <TabsContent value="simulation" className="h-full">
          <SimulationView 
            elements={props.elements}
            connections={props.connections}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
