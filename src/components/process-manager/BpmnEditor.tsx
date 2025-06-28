
import React from "react";
import { useBpmnEditorState } from "./editor/hooks/useBpmnEditorState";
import { useBpmnEditorActions } from "./editor/hooks/useBpmnEditorActions";
import { BpmnEditorTabs } from "./editor/BpmnEditorTabs";
import { ElementPropertiesDialog } from "./editor/dialogs/ElementPropertiesDialog";
import { ImportDialog } from "./editor/dialogs/ImportDialog";
import { TemplateSelector } from "./editor/dialogs/TemplateSelector";
import { ProcessValidationPanel } from "./editor/panels/ProcessValidationPanel";
import { ElementProperties } from "./editor/types";

interface BpmnEditorProps {
  activeTool?: string;
}

export const BpmnEditor: React.FC<BpmnEditorProps> = ({ activeTool = "select" }) => {
  // Get all state from the custom hook
  const state = useBpmnEditorState({ activeTool });
  
  // Get all actions from the custom hook
  const actions = useBpmnEditorActions({
    elements: state.elements,
    connections: state.connections,
    selectedElement: state.selectedElement,
    selectedTool: state.selectedTool,
    connectingElement: state.connectingElement,
    zoomLevel: state.zoomLevel,
    snapToGrid: state.snapToGrid,
    elementProperties: state.elementProperties,
    currentElementPosition: state.currentElementPosition,
    dragStartPos: state.dragStartPos,
    isDragging: state.isDragging,
    isVoiceEnabled: state.isVoiceEnabled,
    
    // Setters
    setElements: state.setElements,
    setConnections: state.setConnections,
    setSelectedElement: state.setSelectedElement,
    setSelectedTool: state.setSelectedTool,
    setConnectingElement: state.setConnectingElement,
    setMousePosition: state.setMousePosition,
    setIsDragging: state.setIsDragging,
    setDragStartPos: state.setDragStartPos,
    setCurrentElementPosition: state.setCurrentElementPosition,
    setZoomLevel: state.setZoomLevel,
    setShowGrid: state.setShowGrid,
    setShowValidation: state.setShowValidation,
    setSnapToGrid: state.setSnapToGrid,
    setXmlSource: state.setXmlSource,
    setElementProperties: state.setElementProperties,
    setIsEditDialogOpen: state.setIsEditDialogOpen,
    setIsImportDialogOpen: state.setIsImportDialogOpen,
    setImportSource: state.setImportSource,
    
    // Functions
    saveToHistory: state.saveToHistory,
    toast: state.toast,
    speakText: state.speakText
  });

  // Create a wrapper function to adapt the signature for onAddElement
  const handleAddElement = (elementType: string) => {
    // Use default coordinates for the center of the canvas when adding from palette
    actions.handleAddElement(elementType, 300, 200);
  };

  return (
    <>
      <BpmnEditorTabs
        activeTab={state.activeTab}
        setActiveTab={state.setActiveTab}
        zoomLevel={state.zoomLevel}
        showGrid={state.showGrid}
        showValidation={state.showValidation}
        xmlSource={state.xmlSource}
        elements={state.elements}
        connections={state.connections}
        selectedElement={state.selectedElement}
        selectedTool={state.selectedTool}
        connectingElement={state.connectingElement}
        mousePosition={state.mousePosition}
        historyIndex={state.historyIndex}
        history={state.history}
        snapToGrid={state.snapToGrid}
        
        // Enhanced handlers
        onZoomIn={actions.handleZoomIn}
        onZoomOut={actions.handleZoomOut}
        onToggleGrid={actions.handleToggleGrid}
        onToggleValidation={actions.handleToggleValidation}
        onSaveModel={actions.handleSaveModel}
        onExportXml={actions.handleExportXml}
        onExportJson={actions.handleExportJson}
        onXmlChange={actions.handleXmlChange}
        onCanvasClick={actions.handleCanvasClick}
        onElementSelect={actions.handleSelectElement}
        onElementDragStart={actions.handleElementDragStart}
        onElementDragMove={actions.handleElementDragMove}
        onElementDragEnd={actions.handleElementDragEnd}
        onMouseMove={actions.handleMouseMove}
        onSelectTool={actions.handleSelectTool}
        onEditElement={actions.handleEditElement}
        onDuplicateElement={actions.handleDuplicateElement}
        onDeleteElement={actions.handleElementDelete}
        onAddElement={handleAddElement}
        onUndo={state.undo}
        onRedo={state.redo}
        onToggleSnapToGrid={actions.handleToggleSnapToGrid}
        onImportClick={actions.handleImportClick}
        onLoadTemplate={state.loadTemplate}
        onElementUpdate={actions.handleElementUpdate}
        onConnectionCreate={actions.handleConnectionCreate}
      />
      
      {/* Element Properties Dialog */}
      <ElementPropertiesDialog
        open={state.isEditDialogOpen}
        onOpenChange={state.setIsEditDialogOpen}
        elementProperties={state.elementProperties}
        setElementProperties={state.setElementProperties}
        onUpdateProperties={(props: ElementProperties) => actions.handleUpdateElementProperties(props)}
      />
      
      {/* Import Dialog */}
      <ImportDialog
        open={state.isImportDialogOpen}
        onOpenChange={state.setIsImportDialogOpen}
        importSource={state.importSource}
        setImportSource={state.setImportSource}
        onImportConfirm={actions.handleImportConfirm}
      />

      {/* Template Selector Dialog */}
      <TemplateSelector
        onLoadTemplate={state.loadTemplate}
      />

      {/* Process Validation Panel */}
      {state.showValidation && (
        <ProcessValidationPanel
          elements={state.elements}
          connections={state.connections}
          onClose={() => state.setShowValidation(false)}
        />
      )}
    </>
  );
};
