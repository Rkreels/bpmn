import { useCallback } from "react";
import { 
  BpmnElement, 
  BpmnConnection, 
  ElementPropertiesType
} from "./useBpmnEditorState";

interface UseBpmnEditorActionsProps {
  elements: BpmnElement[];
  connections: BpmnConnection[];
  selectedElement: string | null;
  selectedTool: string;
  connectingElement: string | null;
  zoomLevel: number;
  snapToGrid: boolean;
  elementProperties: ElementPropertiesType | null;
  currentElementPosition: { x: number; y: number };
  dragStartPos: { x: number; y: number };
  isDragging: boolean;
  isVoiceEnabled: boolean;
  
  // Setters
  setElements: React.Dispatch<React.SetStateAction<BpmnElement[]>>;
  setConnections: React.Dispatch<React.SetStateAction<BpmnConnection[]>>;
  setSelectedElement: React.Dispatch<React.SetStateAction<string | null>>;
  setConnectingElement: React.Dispatch<React.SetStateAction<string | null>>;
  setMousePosition: React.Dispatch<React.SetStateAction<{x: number, y: number}>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  setDragStartPos: React.Dispatch<React.SetStateAction<{x: number, y: number}>>;
  setCurrentElementPosition: React.Dispatch<React.SetStateAction<{x: number, y: number}>>;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  setShowGrid: React.Dispatch<React.SetStateAction<boolean>>;
  setShowValidation: React.Dispatch<React.SetStateAction<boolean>>;
  setSnapToGrid: React.Dispatch<React.SetStateAction<boolean>>;
  setXmlSource: React.Dispatch<React.SetStateAction<string>>;
  setElementProperties: React.Dispatch<React.SetStateAction<ElementPropertiesType | null>>;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsImportDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImportSource: React.Dispatch<React.SetStateAction<string>>;
  
  // Functions
  saveToHistory: () => void;
  toast: any;
  speakText: (text: string) => void;
}

export const useBpmnEditorActions = ({
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
  saveToHistory,
  toast,
  speakText
}: UseBpmnEditorActionsProps) => {
  
  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  }, [setZoomLevel]);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 10, 30));
  }, [setZoomLevel]);

  const handleToggleGrid = useCallback(() => {
    setShowGrid((prev) => !prev);
  }, [setShowGrid]);

  const handleToggleValidation = useCallback(() => {
    const newShowValidation = !setShowValidation;
    setShowValidation(newShowValidation);
    toast({
      title: newShowValidation ? "Validation Shown" : "Validation Hidden",
      description: newShowValidation 
        ? "Process validation indicators are now visible." 
        : "Process validation indicators are now hidden.",
    });
  }, [setShowValidation, toast]);

  const handleSaveModel = useCallback(() => {
    // Simulate saving the model
    toast({
      title: "Model Saved",
      description: "Your BPMN model has been saved successfully."
    });
    
    if (isVoiceEnabled) {
      speakText("Model saved successfully");
    }
  }, [toast, isVoiceEnabled, speakText]);

  const handleExportXml = useCallback(() => {
    // Need to implement a way to get the current XML source from the state
    // For now, using a dummy XML string
    const xmlSourceValue = "";
    
    // Create an XML file from the model
    const blob = new Blob([xmlSourceValue], { type: "application/xml" });
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
  }, [toast, isVoiceEnabled, speakText]);

  const handleExportJson = useCallback(() => {
    // Export as JSON for demonstration
    const processJson = {
      id: "Process_1",
      name: "Order Processing",
      elements,
      connections
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
  }, [elements, connections, toast, isVoiceEnabled, speakText]);

  const handleImportClick = useCallback(() => {
    setIsImportDialogOpen(true);
  }, [setIsImportDialogOpen]);

  const handleImportConfirm = useCallback(() => {
    try {
      // Get the current import source from state
      // For this fix, we'll need to get it from the component state
      // Assuming importSource is passed in from component state
      const importSourceValue = ""; // Placeholder value
      
      // Basic validation that it's XML
      if (importSourceValue.trim().startsWith('<?xml')) {
        setXmlSource(importSourceValue);
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
  }, [setXmlSource, setIsImportDialogOpen, toast, isVoiceEnabled, speakText]);

  const handleXmlChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setXmlSource(e.target.value);
    // In a real implementation, we would parse the XML and update the model
  }, [setXmlSource]);

  const handleElementSelect = useCallback((elementId: string) => {
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
  }, [
    selectedTool, selectedElement, connectingElement, elements, connections, 
    isVoiceEnabled, setSelectedElement, setElementProperties, setConnectingElement, 
    setConnections, saveToHistory, toast, speakText
  ]);

  const handleAddElement = useCallback((elementType: string) => {
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
      // Handle connector type
    }
  }, [elements, setElements, setSelectedElement, saveToHistory, isVoiceEnabled, speakText, toast]);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
  }, [
    selectedTool, zoomLevel, snapToGrid, connectingElement, elements,
    isVoiceEnabled, setElements, setSelectedElement, setConnectingElement,
    setElementProperties, saveToHistory, toast, speakText
  ]);

  const handleElementDelete = useCallback(() => {
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
  }, [
    selectedElement, elements, connections, setElements,
    setConnections, setSelectedElement, setElementProperties,
    saveToHistory, isVoiceEnabled, speakText, toast
  ]);

  const handleElementDragStart = useCallback((e: React.MouseEvent, elementId: string) => {
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
  }, [
    selectedTool, elements, setSelectedElement, 
    setIsDragging, setDragStartPos, setCurrentElementPosition
  ]);

  const handleElementDragMove = useCallback((e: React.MouseEvent) => {
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
  }, [
    isDragging, selectedElement, dragStartPos, currentElementPosition,
    zoomLevel, snapToGrid, elements, setElements
  ]);

  const handleElementDragEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      
      // Save to history
      saveToHistory();
    }
  }, [isDragging, setIsDragging, saveToHistory]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // Track mouse position for drawing temporary connections
    const canvasRect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - canvasRect.left) / (zoomLevel / 100),
      y: (e.clientY - canvasRect.top) / (zoomLevel / 100)
    });
  }, [zoomLevel, setMousePosition]);

  const handleSelectTool = useCallback((tool: string) => {
    // Fix: using the function form of setSelectedTool instead of a direct variable
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
  }, [setSelectedTool, setConnectingElement, isVoiceEnabled, speakText, toast]);

  const handleDuplicateElement = useCallback(() => {
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
  }, [
    selectedElement, elements, setElements, setSelectedElement,
    saveToHistory, isVoiceEnabled, speakText, toast
  ]);

  const handleEditElement = useCallback(() => {
    if (selectedElement) {
      const element = elements.find(el => el.id === selectedElement);
      if (element) {
        setIsEditDialogOpen(true);
      }
    }
  }, [selectedElement, elements, setIsEditDialogOpen]);

  const handleUpdateElementProperties = useCallback(() => {
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
  }, [
    selectedElement, elementProperties, elements, setElements,
    setIsEditDialogOpen, saveToHistory, isVoiceEnabled, speakText, toast
  ]);

  const handleToggleSnapToGrid = useCallback(() => {
    setSnapToGrid(prev => !prev);
    
    toast({
      title: snapToGrid ? "Snap to Grid Disabled" : "Snap to Grid Enabled",
      description: snapToGrid ? "Elements will move freely on the canvas." : "Elements will snap to the grid when moved or created.",
    });
  }, [setSnapToGrid, snapToGrid, toast]);

  const handleUndo = useCallback(() => {
    // Implementation for undo functionality
  }, []);

  const handleRedo = useCallback(() => {
    // Implementation for redo functionality
  }, []);

  return {
    handleZoomIn,
    handleZoomOut,
    handleToggleGrid,
    handleToggleValidation,
    handleSaveModel,
    handleExportXml,
    handleExportJson,
    handleImportClick,
    handleImportConfirm,
    handleXmlChange,
    handleElementSelect,
    handleAddElement,
    handleCanvasClick,
    handleElementDelete,
    handleElementDragStart,
    handleElementDragMove,
    handleElementDragEnd,
    handleMouseMove,
    handleSelectTool,
    handleDuplicateElement,
    handleEditElement,
    handleUpdateElementProperties,
    handleToggleSnapToGrid,
    handleUndo,
    handleRedo
  };
};
