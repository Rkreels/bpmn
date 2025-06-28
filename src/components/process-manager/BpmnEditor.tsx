
import React from "react";
import { useBpmnEditorState } from "./editor/hooks/useBpmnEditorState";
import { useBpmnEditorActions } from "./editor/hooks/useBpmnEditorActions";
import { BpmnEditorTabs } from "./editor/BpmnEditorTabs";
import { ElementPropertiesDialog } from "./editor/dialogs/ElementPropertiesDialog";
import { ImportDialog } from "./editor/dialogs/ImportDialog";
import { TemplateSelector } from "./editor/dialogs/TemplateSelector";
import { ProcessValidationPanel } from "./editor/panels/ProcessValidationPanel";
import { ElementProperties } from "./editor/types";
import { useAuth } from "@/contexts/AuthContext";

interface BpmnEditorProps {
  activeTool?: string;
}

export const BpmnEditor: React.FC<BpmnEditorProps> = ({ activeTool = "select" }) => {
  const { hasPermission, hasRole } = useAuth();
  const state = useBpmnEditorState({ activeTool });
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
    
    saveToHistory: state.saveToHistory,
    toast: state.toast,
    speakText: state.speakText
  });

  const handleAddElement = (elementType: string) => {
    if (hasPermission('write') || hasPermission('model')) {
      actions.handleAddElement(elementType, 300, 200);
    }
  };

  // Role-based feature restrictions
  const canEdit = hasPermission('write') || hasPermission('model');
  const canExport = hasPermission('read') || hasRole('admin');
  const canImport = hasPermission('write') || hasRole('admin');

  return (
    <div className="h-full w-full flex flex-col">
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
        canEdit={canEdit}
        canExport={canExport}
        canImport={canImport}
        
        onZoomIn={actions.handleZoomIn}
        onZoomOut={actions.handleZoomOut}
        onToggleGrid={actions.handleToggleGrid}
        onToggleValidation={actions.handleToggleValidation}
        onSaveModel={canEdit ? actions.handleSaveModel : () => {}}
        onExportXml={canExport ? actions.handleExportXml : () => {}}
        onExportJson={canExport ? actions.handleExportJson : () => {}}
        onXmlChange={canEdit ? actions.handleXmlChange : () => {}}
        onCanvasClick={actions.handleCanvasClick}
        onElementSelect={actions.handleSelectElement}
        onElementDragStart={canEdit ? actions.handleElementDragStart : () => {}}
        onElementDragMove={canEdit ? actions.handleElementDragMove : () => {}}
        onElementDragEnd={canEdit ? actions.handleElementDragEnd : () => {}}
        onMouseMove={actions.handleMouseMove}
        onSelectTool={actions.handleSelectTool}
        onEditElement={canEdit ? actions.handleEditElement : () => {}}
        onDuplicateElement={canEdit ? actions.handleDuplicateElement : () => {}}
        onDeleteElement={canEdit ? actions.handleElementDelete : () => {}}
        onAddElement={handleAddElement}
        onUndo={canEdit ? state.undo : () => {}}
        onRedo={canEdit ? state.redo : () => {}}
        onToggleSnapToGrid={actions.handleToggleSnapToGrid}
        onImportClick={canImport ? actions.handleImportClick : () => {}}
        onLoadTemplate={canEdit ? state.loadTemplate : () => {}}
        onElementUpdate={canEdit ? actions.handleElementUpdate : () => {}}
        onConnectionCreate={canEdit ? actions.handleConnectionCreate : () => {}}
      />
      
      {canEdit && (
        <ElementPropertiesDialog
          open={state.isEditDialogOpen}
          onOpenChange={state.setIsEditDialogOpen}
          elementProperties={state.elementProperties}
          setElementProperties={state.setElementProperties}
          onUpdateProperties={(props: ElementProperties) => actions.handleUpdateElementProperties(props)}
        />
      )}
      
      {canImport && (
        <ImportDialog
          open={state.isImportDialogOpen}
          onOpenChange={state.setIsImportDialogOpen}
          importSource={state.importSource}
          setImportSource={state.setImportSource}
          onImportConfirm={actions.handleImportConfirm}
        />
      )}

      <TemplateSelector
        onLoadTemplate={canEdit ? state.loadTemplate : () => {}}
      />

      {state.showValidation && (
        <ProcessValidationPanel
          elements={state.elements}
          connections={state.connections}
          onClose={() => state.setShowValidation(false)}
        />
      )}
    </div>
  );
};
