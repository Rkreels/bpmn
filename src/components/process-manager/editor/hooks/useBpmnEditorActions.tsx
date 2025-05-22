
import { useCallback } from "react";
import { 
  BpmnElement, 
  BpmnConnection, 
  ElementPosition,
  ElementProperties
} from "../types";
import { MousePosition } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { UseToastReturn } from "@/components/ui/use-toast";

interface UseBpmnEditorActionsProps {
  // State
  elements: BpmnElement[];
  connections: BpmnConnection[];
  selectedElement: string | null;
  selectedTool: string;
  connectingElement: string | null;
  zoomLevel: number;
  snapToGrid: boolean;
  elementProperties: ElementProperties;
  currentElementPosition: ElementPosition | null;
  dragStartPos: MousePosition | null;
  isDragging: boolean;
  isVoiceEnabled: boolean;
  
  // Setters
  setElements: React.Dispatch<React.SetStateAction<BpmnElement[]>>;
  setConnections: React.Dispatch<React.SetStateAction<BpmnConnection[]>>;
  setSelectedElement: React.Dispatch<React.SetStateAction<string | null>>;
  setConnectingElement: React.Dispatch<React.SetStateAction<string | null>>;
  setMousePosition: React.Dispatch<React.SetStateAction<MousePosition>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  setDragStartPos: React.Dispatch<React.SetStateAction<MousePosition | null>>;
  setCurrentElementPosition: React.Dispatch<React.SetStateAction<ElementPosition | null>>;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  setShowGrid: React.Dispatch<React.SetStateAction<boolean>>;
  setShowValidation: React.Dispatch<React.SetStateAction<boolean>>;
  setSnapToGrid: React.Dispatch<React.SetStateAction<boolean>>;
  setXmlSource: React.Dispatch<React.SetStateAction<string>>;
  setElementProperties: React.Dispatch<React.SetStateAction<ElementProperties>>;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsImportDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImportSource: React.Dispatch<React.SetStateAction<string>>;
  
  // Functions
  saveToHistory: (elements: BpmnElement[], connections: BpmnConnection[]) => void;
  toast: UseToastReturn["toast"];
  speakText: (text: string) => void;
}

export const useBpmnEditorActions = ({
  // State
  elements,
  connections,
  selectedElement,
  selectedTool,
  connectingElement,
  zoomLevel,
  snapToGrid,
  elementProperties,
  currentElementPosition,
  dragStartPos,
  isDragging,
  isVoiceEnabled,
  
  // Setters
  setElements,
  setConnections,
  setSelectedElement,
  setConnectingElement,
  setMousePosition,
  setIsDragging,
  setDragStartPos,
  setCurrentElementPosition,
  setZoomLevel,
  setShowGrid,
  setShowValidation,
  setSnapToGrid,
  setXmlSource,
  setElementProperties,
  setIsEditDialogOpen,
  setIsImportDialogOpen,
  setImportSource,
  
  // Functions
  saveToHistory,
  toast,
  speakText
}: UseBpmnEditorActionsProps) => {
  
  // Toolbar actions
  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2.0));
  }, [setZoomLevel]);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  }, [setZoomLevel]);

  const handleToggleGrid = useCallback(() => {
    setShowGrid(prev => {
      const newShowGrid = !prev;
      toast({
        title: newShowGrid ? "Grid Shown" : "Grid Hidden",
        description: newShowGrid 
          ? "The grid is now visible on the canvas." 
          : "The grid is now hidden on the canvas.",
      });
      return newShowGrid;
    });
  }, [setShowGrid, toast]);

  const handleToggleValidation = useCallback(() => {
    setShowValidation(prev => {
      const newShowValidation = !prev;
      toast({
        title: newShowValidation ? "Validation Shown" : "Validation Hidden",
        description: newShowValidation 
          ? "Process validation indicators are now visible." 
          : "Process validation indicators are now hidden.",
      });
      return newShowValidation;
    });
  }, [setShowValidation, toast]);

  const handleSaveModel = useCallback(() => {
    // Simulate saving the model
    toast({
      title: "Model Saved",
      description: "Your BPMN model has been saved successfully.",
    });
    
    if (isVoiceEnabled) {
      speakText("BPMN model saved successfully");
    }
  }, [toast, isVoiceEnabled, speakText]);

  const handleExportXml = useCallback(() => {
    // In a real app, we would generate XML from the model
    const generatedXml = '<?xml version="1.0" encoding="UTF-8"?>\n<bpmn:definitions>\n  <!-- BPMN model would be here -->\n</bpmn:definitions>';
    
    // Create an XML file from the model
    const blob = new Blob([generatedXml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "process_model.bpmn";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "XML Exported",
      description: "Your BPMN model has been exported as XML.",
    });
    
    if (isVoiceEnabled) {
      speakText("BPMN XML file exported successfully");
    }
  }, [toast, isVoiceEnabled, speakText]);

  const handleExportJson = useCallback(() => {
    // Export as JSON for demonstration
    const modelData = {
      elements,
      connections,
      metadata: {
        version: "1.0",
        created: new Date().toISOString(),
        name: "Process Model"
      }
    };
    
    const blob = new Blob([JSON.stringify(modelData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "process_model.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "JSON Exported",
      description: "Your BPMN model has been exported as JSON.",
    });
  }, [elements, connections, toast]);

  const handleImportClick = useCallback(() => {
    setIsImportDialogOpen(true);
  }, [setIsImportDialogOpen]);

  const handleImportConfirm = useCallback((importSource: string) => {
    try {
      // Basic validation that it's XML
      if (importSource.trim().startsWith('<?xml')) {
        setXmlSource(importSource);
        setIsImportDialogOpen(false);
        
        // For a real implementation, we would parse the XML and update the model
        toast({
          title: "Model Imported",
          description: "The BPMN XML has been imported successfully.",
        });
        
        if (isVoiceEnabled) {
          speakText("BPMN model imported successfully");
        }
      } else {
        toast({
          title: "Invalid XML",
          description: "The imported file does not appear to be valid BPMN XML.",
          variant: "destructive"
        });
        
        if (isVoiceEnabled) {
          speakText("Error: Invalid XML format");
        }
      }
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "There was an error importing the BPMN model.",
        variant: "destructive"
      });
    }
  }, [setXmlSource, setIsImportDialogOpen, toast, isVoiceEnabled, speakText]);

  const handleXmlChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setXmlSource(e.target.value);
  }, [setXmlSource]);

  // Canvas interaction actions
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // If we're in connection mode and have a selected element
    if (selectedTool === "connector" && connectingElement) {
      // Normally this would create a connection to another element
      // For simplicity, we'll just clear the connecting state
      setConnectingElement(null);
      return;
    }
    
    // If we have a selected tool other than selection tool
    if (selectedTool !== "select" && selectedTool !== "hand") {
      // Get canvas-relative coordinates
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoomLevel;
      const y = (e.clientY - rect.top) / zoomLevel;
      
      // Create a new element based on the selected tool
      const newElement: BpmnElement = {
        id: uuidv4(),
        type: selectedTool,
        name: `New ${selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)}`,
        x: snapToGrid ? Math.round(x / 20) * 20 : x,
        y: snapToGrid ? Math.round(y / 20) * 20 : y,
        width: selectedTool === "task" ? 120 : 80,
        height: selectedTool === "task" ? 80 : selectedTool === "gateway" ? 80 : 60,
        properties: {}
      };
      
      // Add the element to our elements array
      setElements(prev => [...prev, newElement]);
      saveToHistory([...elements, newElement], connections);
      
      // Select the new element
      setSelectedElement(newElement.id);
      
      // Reset the tool to select after placing an element
      setSelectedTool("select");
      
      toast({
        title: `${selectedTool.charAt(0).toUpperCase() + selectedTool.slice(1)} Added`,
        description: `A new ${selectedTool} has been added to the canvas.`,
      });
      
      return;
    }
    
    // If we click on the canvas with the select tool, deselect any selected element
    setSelectedElement(null);
  }, [
    selectedTool, 
    connectingElement, 
    zoomLevel, 
    snapToGrid, 
    setElements, 
    setSelectedElement, 
    setConnectingElement, 
    elements, 
    connections, 
    saveToHistory, 
    setSelectedTool, 
    toast
  ]);

  const handleElementSelect = useCallback((elementId: string) => {
    setSelectedElement(prev => (prev === elementId ? null : elementId));
  }, [setSelectedElement]);

  const handleElementDragStart = useCallback((e: React.MouseEvent, elementId: string) => {
    // Prevent default to avoid text selection during drag
    e.preventDefault();
    
    // Find the element
    const element = elements.find(el => el.id === elementId);
    if (!element) return;
    
    // Set up the drag
    setIsDragging(true);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setCurrentElementPosition({ x: element.x, y: element.y });
    setSelectedElement(elementId);
  }, [elements, setIsDragging, setDragStartPos, setCurrentElementPosition, setSelectedElement]);

  const handleElementDragMove = useCallback((e: React.MouseEvent) => {
    // If we're not dragging or don't have start position, do nothing
    if (!isDragging || !dragStartPos || !currentElementPosition || !selectedElement) return;
    
    // Calculate the delta
    const dx = (e.clientX - dragStartPos.x) / zoomLevel;
    const dy = (e.clientY - dragStartPos.y) / zoomLevel;
    
    // Update the element position
    setElements(prev => prev.map(element => {
      if (element.id === selectedElement) {
        const newX = currentElementPosition.x + dx;
        const newY = currentElementPosition.y + dy;
        
        return {
          ...element,
          x: snapToGrid ? Math.round(newX / 20) * 20 : newX,
          y: snapToGrid ? Math.round(newY / 20) * 20 : newY
        };
      }
      return element;
    }));
  }, [
    isDragging, 
    dragStartPos, 
    currentElementPosition, 
    selectedElement, 
    zoomLevel, 
    snapToGrid, 
    setElements
  ]);

  const handleElementDragEnd = useCallback(() => {
    if (isDragging) {
      // Save the state to history for undo/redo
      saveToHistory(elements, connections);
      
      // Reset dragging state
      setIsDragging(false);
      setDragStartPos(null);
      setCurrentElementPosition(null);
    }
  }, [isDragging, elements, connections, saveToHistory, setIsDragging, setDragStartPos, setCurrentElementPosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoomLevel;
    const y = (e.clientY - rect.top) / zoomLevel;
    
    setMousePosition({ x, y });
  }, [zoomLevel, setMousePosition]);

  const handleSelectTool = useCallback((tool: string) => {
    setSelectedTool(tool);
    if (tool !== "connector") {
      setConnectingElement(null);
    }
    
    toast({
      title: `${tool.charAt(0).toUpperCase() + tool.slice(1)} Tool Selected`,
      description: `You can now ${tool === "select" ? "select and edit" : tool === "hand" ? "pan the canvas" : `add ${tool} elements`}.`
    });
  }, [setSelectedTool, setConnectingElement, toast]);

  const handleEditElement = useCallback(() => {
    if (!selectedElement) return;
    
    const element = elements.find(el => el.id === selectedElement);
    if (element) {
      setElementProperties({
        id: element.id,
        name: element.name,
        type: element.type,
        description: element.properties?.description || "",
        color: element.properties?.color || "#ffffff",
        custom: element.properties?.custom || {}
      });
      
      setIsEditDialogOpen(true);
    }
  }, [selectedElement, elements, setElementProperties, setIsEditDialogOpen]);

  const handleDuplicateElement = useCallback(() => {
    if (!selectedElement) return;
    
    const element = elements.find(el => el.id === selectedElement);
    if (element) {
      const newElement = {
        ...element,
        id: uuidv4(),
        name: `${element.name} (copy)`,
        x: element.x + 20,
        y: element.y + 20
      };
      
      setElements(prev => [...prev, newElement]);
      setSelectedElement(newElement.id);
      saveToHistory([...elements, newElement], connections);
      
      toast({
        title: "Element Duplicated",
        description: "A copy of the selected element has been created."
      });
    }
  }, [selectedElement, elements, connections, setElements, setSelectedElement, saveToHistory, toast]);

  const handleElementDelete = useCallback(() => {
    if (!selectedElement) return;
    
    setElements(prev => prev.filter(el => el.id !== selectedElement));
    setConnections(prev => prev.filter(
      conn => conn.source !== selectedElement && conn.target !== selectedElement
    ));
    
    saveToHistory(
      elements.filter(el => el.id !== selectedElement),
      connections.filter(conn => conn.source !== selectedElement && conn.target !== selectedElement)
    );
    
    setSelectedElement(null);
    
    toast({
      title: "Element Deleted",
      description: "The selected element has been removed from the canvas."
    });
  }, [selectedElement, elements, connections, setElements, setConnections, setSelectedElement, saveToHistory, toast]);

  const handleAddElement = useCallback((elementType: string) => {
    // Similar to handleCanvasClick but without coordinates
    // Instead, we'll place the element at the center of the visible canvas
    const newElement: BpmnElement = {
      id: uuidv4(),
      type: elementType,
      name: `New ${elementType.charAt(0).toUpperCase() + elementType.slice(1)}`,
      x: 200,  // These are arbitrary coordinates
      y: 200,  // In a real app, we'd calculate center of viewport
      width: elementType === "task" ? 120 : 80,
      height: elementType === "task" ? 80 : elementType === "gateway" ? 80 : 60,
      properties: {}
    };
    
    setElements(prev => [...prev, newElement]);
    saveToHistory([...elements, newElement], connections);
    setSelectedElement(newElement.id);
    
    toast({
      title: `${elementType.charAt(0).toUpperCase() + elementType.slice(1)} Added`,
      description: `A new ${elementType} has been added to the canvas.`,
    });
  }, [elements, connections, setElements, setSelectedElement, saveToHistory, toast]);

  const handleUndo = useCallback(() => {
    // Undo functionality would be implemented here
    toast({
      title: "Undo",
      description: "The last action has been undone.",
    });
  }, [toast]);

  const handleRedo = useCallback(() => {
    // Redo functionality would be implemented here
    toast({
      title: "Redo",
      description: "The action has been redone.",
    });
  }, [toast]);

  const handleToggleSnapToGrid = useCallback(() => {
    setSnapToGrid(prev => !prev);
    
    toast({
      title: snapToGrid ? "Snap to Grid Disabled" : "Snap to Grid Enabled",
      description: snapToGrid ? "Elements will move freely on the canvas." : "Elements will snap to the grid when moved or created.",
    });
  }, [setSnapToGrid, snapToGrid, toast]);

  const handleUpdateElementProperties = useCallback((updatedProps: ElementProperties) => {
    if (!selectedElement) return;
    
    setElements(prev => prev.map(element => {
      if (element.id === selectedElement) {
        return {
          ...element,
          name: updatedProps.name,
          properties: {
            ...element.properties,
            description: updatedProps.description,
            color: updatedProps.color,
            custom: updatedProps.custom
          }
        };
      }
      return element;
    }));
    
    setIsEditDialogOpen(false);
    saveToHistory(
      elements.map(element => {
        if (element.id === selectedElement) {
          return {
            ...element,
            name: updatedProps.name,
            properties: {
              ...element.properties,
              description: updatedProps.description,
              color: updatedProps.color,
              custom: updatedProps.custom
            }
          };
        }
        return element;
      }),
      connections
    );
    
    toast({
      title: "Element Updated",
      description: "The element properties have been updated successfully."
    });
  }, [selectedElement, elements, connections, setElements, setIsEditDialogOpen, saveToHistory, toast]);

  return {
    handleZoomIn,
    handleZoomOut,
    handleToggleGrid,
    handleToggleValidation,
    handleSaveModel,
    handleExportXml,
    handleExportJson,
    handleXmlChange,
    handleCanvasClick,
    handleElementSelect,
    handleElementDragStart,
    handleElementDragMove,
    handleElementDragEnd,
    handleMouseMove,
    handleSelectTool,
    handleEditElement,
    handleDuplicateElement,
    handleElementDelete,
    handleAddElement,
    handleUndo,
    handleRedo,
    handleToggleSnapToGrid,
    handleImportClick,
    handleImportConfirm,
    handleUpdateElementProperties
  };
};
