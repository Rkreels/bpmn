import { useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ElementProperties } from "../types";

// Define toast type
type ToastProps = {
  title: string;
  description: string;
  variant?: "default" | "destructive";
};

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
  setSelectedTool,
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
}: {
  // State
  elements: any[];
  connections: any[];
  selectedElement: string | null;
  selectedTool: string;
  connectingElement: string | null;
  zoomLevel: number;
  snapToGrid: boolean;
  elementProperties: ElementProperties;
  currentElementPosition: { x: number; y: number } | null;
  dragStartPos: { x: number; y: number } | null;
  isDragging: boolean;
  isVoiceEnabled: boolean;
  // Setters
  setElements: React.Dispatch<React.SetStateAction<any[]>>;
  setConnections: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedElement: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedTool: React.Dispatch<React.SetStateAction<string>>;
  setConnectingElement: React.Dispatch<React.SetStateAction<string | null>>;
  setMousePosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  setDragStartPos: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>;
  setCurrentElementPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>;
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
  saveToHistory: (elements: any[], connections: any[]) => void;
  toast: (props: ToastProps) => void;
  speakText: (text: string) => void;
}) => {
  // Add a new element to the diagram
  const handleAddElement = useCallback((type: string, x: number = 250, y: number = 250) => {
    const id = uuidv4();
    const newElement = {
      id,
      type,
      x: snapToGrid ? Math.round(x / 20) * 20 : x,
      y: snapToGrid ? Math.round(y / 20) * 20 : y,
      width: type === 'task' ? 120 : type === 'gateway' ? 50 : 40,
      height: type === 'task' ? 80 : type === 'gateway' ? 50 : 40,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      position: {
        x: snapToGrid ? Math.round(x / 20) * 20 : x,
        y: snapToGrid ? Math.round(y / 20) * 20 : y
      }
    };
    
    setElements(prev => [...prev, newElement]);
    setSelectedElement(id);
    saveToHistory([...elements, newElement], connections);
    
    if (isVoiceEnabled) {
      speakText(`Added new ${type} element`);
    }
    
    toast({
      title: "Element Added",
      description: `New ${type} has been added to the diagram.`,
    });
    
    return id;
  }, [elements, connections, snapToGrid, saveToHistory, setElements, setSelectedElement, toast, isVoiceEnabled, speakText]);

  // Select an element in the diagram
  const handleSelectElement = useCallback((id: string | null) => {
    setSelectedElement(id);
    
    if (id) {
      const element = elements.find(el => el.id === id);
      if (element) {
        setElementProperties({
          id: element.id,
          type: element.type,
          name: element.name || '',
          documentation: element.documentation || '',
          assignee: element.assignee || '',
          dueDate: element.dueDate || '',
          implementation: element.implementation || '',
          description: element.description || '',
          color: element.color || '#ffffff',
        });
        
        if (isVoiceEnabled) {
          speakText(`Selected ${element.type} element: ${element.name || 'unnamed'}`);
        }
      }
    } else {
      setElementProperties({
        id: '',
        type: '',
        name: '',
        documentation: '',
        assignee: '',
        dueDate: '',
        implementation: '',
        description: '',
        color: '#ffffff',
      });
    }
  }, [elements, setSelectedElement, setElementProperties, isVoiceEnabled, speakText]);

  // Start connecting elements
  const handleStartConnecting = useCallback((id: string) => {
    setConnectingElement(id);
    setSelectedTool('connector');
    
    if (isVoiceEnabled) {
      speakText('Starting connection. Select target element to connect.');
    }
  }, [setConnectingElement, setSelectedTool, isVoiceEnabled, speakText]);

  // Complete connection between elements
  const handleCompleteConnection = useCallback((targetId: string) => {
    if (connectingElement && connectingElement !== targetId) {
      const id = uuidv4();
      const newConnection = {
        id,
        source: connectingElement,
        target: targetId,
        sourceId: connectingElement,
        targetId: targetId,
        type: 'sequence',
      };
      
      setConnections(prev => [...prev, newConnection]);
      setConnectingElement(null);
      setSelectedTool('select');
      saveToHistory(elements, [...connections, newConnection]);
      
      if (isVoiceEnabled) {
        speakText('Connection created');
      }
      
      toast({
        title: "Connection Created",
        description: "A new connection has been added between elements.",
      });
    }
  }, [connectingElement, elements, connections, saveToHistory, setConnections, setConnectingElement, setSelectedTool, toast, isVoiceEnabled, speakText]);

  // Handle element dragging start
  const handleStartDrag = useCallback((id: string, x: number, y: number) => {
    setSelectedElement(id);
    setIsDragging(true);
    setDragStartPos({ x, y });
    
    const element = elements.find(el => el.id === id);
    if (element) {
      setCurrentElementPosition({ x: element.x, y: element.y });
    }
  }, [elements, setSelectedElement, setIsDragging, setDragStartPos, setCurrentElementPosition]);

  // Handle element dragging
  const handleDrag = useCallback((x: number, y: number) => {
    if (isDragging && dragStartPos && currentElementPosition && selectedElement) {
      const deltaX = x - dragStartPos.x;
      const deltaY = y - dragStartPos.y;
      
      const newX = currentElementPosition.x + deltaX;
      const newY = currentElementPosition.y + deltaY;
      
      const snappedX = snapToGrid ? Math.round(newX / 20) * 20 : newX;
      const snappedY = snapToGrid ? Math.round(newY / 20) * 20 : newY;
      
      setElements(prev => prev.map(el => 
        el.id === selectedElement 
          ? { 
              ...el, 
              x: snappedX, 
              y: snappedY, 
              position: { 
                x: snappedX, 
                y: snappedY 
              } 
            } 
          : el
      ));
    }
  }, [isDragging, dragStartPos, currentElementPosition, selectedElement, snapToGrid, setElements]);

  // Handle element dragging end
  const handleEndDrag = useCallback(() => {
    if (isDragging && selectedElement) {
      setIsDragging(false);
      setDragStartPos(null);
      setCurrentElementPosition(null);
      saveToHistory(elements, connections);
    }
  }, [isDragging, selectedElement, elements, connections, saveToHistory, setIsDragging, setDragStartPos, setCurrentElementPosition]);

  // Delete selected element
  const handleDeleteElement = useCallback(() => {
    if (selectedElement) {
      // Remove the element
      const newElements = elements.filter(el => el.id !== selectedElement);
      
      // Remove any connections to/from this element
      const newConnections = connections.filter(
        conn => conn.source !== selectedElement && conn.target !== selectedElement
      );
      
      setElements(newElements);
      setConnections(newConnections);
      setSelectedElement(null);
      saveToHistory(newElements, newConnections);
      
      if (isVoiceEnabled) {
        speakText('Element deleted');
      }
      
      toast({
        title: "Element Deleted",
        description: "The selected element has been removed from the diagram.",
      });
    }
  }, [selectedElement, elements, connections, saveToHistory, setElements, setConnections, setSelectedElement, toast, isVoiceEnabled, speakText]);

  // Update element properties
  const handleUpdateElementProperties = useCallback((props: ElementProperties) => {
    if (props.id) {
      setElements(prev => prev.map(el => 
        el.id === props.id 
          ? { 
              ...el, 
              name: props.name,
              documentation: props.documentation,
              assignee: props.assignee,
              dueDate: props.dueDate,
              implementation: props.implementation,
              description: props.description,
              color: props.color
            } 
          : el
      ));
      
      setIsEditDialogOpen(false);
      saveToHistory(
        elements.map(el => 
          el.id === props.id 
            ? { 
                ...el, 
                name: props.name,
                documentation: props.documentation,
                assignee: props.assignee,
                dueDate: props.dueDate,
                implementation: props.implementation,
                description: props.description,
                color: props.color
              } 
            : el
        ),
        connections
      );
      
      if (isVoiceEnabled) {
        speakText('Element properties updated');
      }
      
      toast({
        title: "Properties Updated",
        description: "Element properties have been updated successfully.",
      });
    }
  }, [elements, connections, saveToHistory, setElements, setIsEditDialogOpen, toast, isVoiceEnabled, speakText]);

  // Edit element properties
  const handleEditElement = useCallback(() => {
    if (selectedElement) {
      const element = elements.find(el => el.id === selectedElement);
      if (element) {
        setElementProperties({
          id: element.id,
          type: element.type,
          name: element.name || '',
          documentation: element.documentation || '',
          assignee: element.assignee || '',
          dueDate: element.dueDate || '',
          implementation: element.implementation || '',
          description: element.description || '',
          color: element.color || '#ffffff',
        });
        setIsEditDialogOpen(true);
      }
    }
  }, [selectedElement, elements, setElementProperties, setIsEditDialogOpen]);

  // Zoom in
  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
    
    if (isVoiceEnabled) {
      speakText('Zoomed in');
    }
  }, [setZoomLevel, isVoiceEnabled, speakText]);

  // Zoom out
  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
    
    if (isVoiceEnabled) {
      speakText('Zoomed out');
    }
  }, [setZoomLevel, isVoiceEnabled, speakText]);

  // Reset zoom
  const handleResetZoom = useCallback(() => {
    setZoomLevel(100);
    
    if (isVoiceEnabled) {
      speakText('Zoom reset');
    }
  }, [setZoomLevel, isVoiceEnabled, speakText]);

  // Toggle grid
  const handleToggleGrid = useCallback(() => {
    setShowGrid(prev => !prev);
    
    if (isVoiceEnabled) {
      speakText('Grid toggled');
    }
  }, [setShowGrid, isVoiceEnabled, speakText]);

  // Toggle validation
  const handleToggleValidation = useCallback(() => {
    setShowValidation(prev => !prev);
    
    if (isVoiceEnabled) {
      speakText('Validation toggled');
    }
  }, [setShowValidation, isVoiceEnabled, speakText]);

  // Toggle snap to grid
  const handleToggleSnapToGrid = useCallback(() => {
    setSnapToGrid(prev => !prev);
    
    if (isVoiceEnabled) {
      speakText(snapToGrid ? 'Snap to grid disabled' : 'Snap to grid enabled');
    }
    
    toast({
      title: snapToGrid ? "Snap to Grid Disabled" : "Snap to Grid Enabled",
      description: snapToGrid 
        ? "Elements can now be placed freely." 
        : "Elements will now snap to the grid.",
    });
  }, [snapToGrid, setSnapToGrid, toast, isVoiceEnabled, speakText]);

  // Export XML
  const handleExportXml = useCallback(() => {
    // This is a simplified example - in a real app, you'd generate actual BPMN XML
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL">
        <bpmn:process id="Process_1">
          ${elements.map(el => `<bpmn:${el.type} id="${el.id}" name="${el.name || ''}" />`).join('\n')}
          ${connections.map(conn => 
            `<bpmn:sequenceFlow id="${conn.id}" sourceRef="${conn.source}" targetRef="${conn.target}" />`
          ).join('\n')}
        </bpmn:process>
      </bpmn:definitions>
    `;
    
    setXmlSource(xml);
    
    if (isVoiceEnabled) {
      speakText('XML exported');
    }
    
    toast({
      title: "XML Exported",
      description: "BPMN XML has been generated successfully.",
    });
    
    // In a real app, you might trigger a download here
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'process.bpmn';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [elements, connections, setXmlSource, toast, isVoiceEnabled, speakText]);

  // Export JSON
  const handleExportJson = useCallback(() => {
    const data = {
      elements,
      connections,
      metadata: {
        exportedAt: new Date().toISOString(),
        version: "1.0"
      }
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'process.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    if (isVoiceEnabled) {
      speakText('JSON exported');
    }
    
    toast({
      title: "JSON Exported",
      description: "Process data has been exported as JSON.",
    });
  }, [elements, connections, toast, isVoiceEnabled, speakText]);

  // Handle XML changes
  const handleXmlChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setXmlSource(e.target.value);
  }, [setXmlSource]);

  // Open the import dialog
  const handleImportClick = useCallback(() => {
    setIsImportDialogOpen(true);
    setImportSource('');
    
    if (isVoiceEnabled) {
      speakText('Import dialog opened');
    }
  }, [setIsImportDialogOpen, setImportSource, isVoiceEnabled, speakText]);

  // Import XML
  const handleImportConfirm = useCallback((xml: string) => {
    try {
      // This is a simplified example - in a real app, you'd parse actual BPMN XML
      // For now, we'll just set some dummy data
      const newElements = [
        { id: 'start1', type: 'start-event', x: 100, y: 150, width: 40, height: 40, name: 'Start Event', position: { x: 100, y: 150 } },
        { id: 'task1', type: 'task', x: 200, y: 130, width: 120, height: 80, name: 'User Task', position: { x: 200, y: 130 } },
        { id: 'gateway1', type: 'gateway', x: 380, y: 150, width: 50, height: 50, name: 'Gateway', position: { x: 380, y: 150 } },
        { id: 'end1', type: 'end-event', x: 500, y: 150, width: 40, height: 40, name: 'End Event', position: { x: 500, y: 150 } },
      ];
      
      const newConnections = [
        { id: 'conn1', source: 'start1', target: 'task1', type: 'sequence', sourceId: 'start1', targetId: 'task1' },
        { id: 'conn2', source: 'task1', target: 'gateway1', type: 'sequence', sourceId: 'task1', targetId: 'gateway1' },
        { id: 'conn3', source: 'gateway1', target: 'end1', type: 'sequence', sourceId: 'gateway1', targetId: 'end1' },
      ];
      
      setElements(newElements);
      setConnections(newConnections);
      setSelectedElement(null);
      saveToHistory(newElements, newConnections);
      setIsImportDialogOpen(false);
      
      if (isVoiceEnabled) {
        speakText('Process imported successfully');
      }
      
      toast({
        title: "Import Successful",
        description: "The BPMN process has been imported successfully.",
      });
    } catch (error) {
      console.error('Error importing BPMN XML:', error);
      
      toast({
        title: "Import Failed",
        description: "There was an error importing the BPMN XML.",
        variant: "destructive",
      });
    }
  }, [setElements, setConnections, setSelectedElement, saveToHistory, setIsImportDialogOpen, toast, isVoiceEnabled, speakText]);

  // Clear the diagram
  const handleClearDiagram = useCallback(() => {
    setElements([]);
    setConnections([]);
    setSelectedElement(null);
    saveToHistory([], []);
    
    if (isVoiceEnabled) {
      speakText('Diagram cleared');
    }
    
    toast({
      title: "Diagram Cleared",
      description: "All elements have been removed from the diagram.",
    });
  }, [setElements, setConnections, setSelectedElement, saveToHistory, toast, isVoiceEnabled, speakText]);

  // Handle canvas click
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedTool === 'select') {
      // Deselect when clicking on empty canvas area
      setSelectedElement(null);
    } else if (selectedTool !== 'connector') {
      // Add new element when using an element tool
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (selectedTool === 'start-event' || selectedTool === 'end-event' || 
          selectedTool === 'task' || selectedTool === 'gateway') {
        handleAddElement(selectedTool, x, y);
      }
    }
  }, [selectedTool, setSelectedElement, handleAddElement]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    if (isDragging && selectedElement) {
      handleDrag(e.clientX, e.clientY);
    }
  }, [isDragging, selectedElement, setMousePosition, handleDrag]);

  // Handle element drag start
  const handleElementDragStart = useCallback((e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    handleStartDrag(elementId, e.clientX, e.clientY);
  }, [handleStartDrag]);

  // Handle element drag move
  const handleElementDragMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      handleDrag(e.clientX, e.clientY);
    }
  }, [isDragging, handleDrag]);

  // Handle element drag end
  const handleElementDragEnd = useCallback(() => {
    handleEndDrag();
  }, [handleEndDrag]);

  // Handle tool selection
  const handleSelectTool = useCallback((tool: string) => {
    setSelectedTool(tool);
    
    if (tool === 'select') {
      setConnectingElement(null);
    }
    
    if (isVoiceEnabled) {
      speakText(`Selected ${tool} tool`);
    }
  }, [setSelectedTool, setConnectingElement, isVoiceEnabled, speakText]);

  // Handle duplicate element
  const handleDuplicateElement = useCallback(() => {
    if (selectedElement) {
      const elementToDuplicate = elements.find(el => el.id === selectedElement);
      if (elementToDuplicate) {
        const id = uuidv4();
        const newElement = {
          ...elementToDuplicate,
          id,
          x: elementToDuplicate.x + 20,
          y: elementToDuplicate.y + 20,
          name: `Copy of ${elementToDuplicate.name}`,
          position: {
            x: elementToDuplicate.x + 20,
            y: elementToDuplicate.y + 20
          }
        };
        
        setElements([...elements, newElement]);
        setSelectedElement(id);
        saveToHistory([...elements, newElement], connections);
        
        if (isVoiceEnabled) {
          speakText('Element duplicated');
        }
        
        toast({
          title: "Element Duplicated",
          description: "A copy of the selected element has been created.",
        });
      }
    }
  }, [selectedElement, elements, connections, setElements, setSelectedElement, saveToHistory, toast, isVoiceEnabled, speakText]);

  // Element delete alias for consistency with BpmnEditorTabs component 
  const handleElementDelete = handleDeleteElement;

  // Handle save model
  const handleSaveModel = useCallback(() => {
    saveToHistory(elements, connections);
    
    toast({
      title: "Model Saved",
      description: "Your process model has been saved successfully.",
    });
    
    if (isVoiceEnabled) {
      speakText('Model saved');
    }
  }, [elements, connections, saveToHistory, toast, isVoiceEnabled, speakText]);

  // Handle undo
  const handleUndo = useCallback(() => {
    // This would be implemented with the history functionality
    toast({
      title: "Undo",
      description: "The last action has been undone.",
    });
    
    if (isVoiceEnabled) {
      speakText('Undo');
    }
  }, [toast, isVoiceEnabled, speakText]);

  // Handle redo
  const handleRedo = useCallback(() => {
    // This would be implemented with the history functionality
    toast({
      title: "Redo",
      description: "The previously undone action has been redone.",
    });
    
    if (isVoiceEnabled) {
      speakText('Redo');
    }
  }, [toast, isVoiceEnabled, speakText]);

  return {
    handleAddElement,
    handleSelectElement,
    handleStartConnecting,
    handleCompleteConnection,
    handleStartDrag,
    handleDrag,
    handleEndDrag,
    handleDeleteElement,
    handleUpdateElementProperties,
    handleEditElement,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    handleToggleGrid,
    handleToggleValidation,
    handleToggleSnapToGrid,
    handleExportXml,
    handleExportJson,
    handleXmlChange,
    handleImportClick,
    handleImportConfirm,
    handleClearDiagram,
    handleCanvasClick,
    handleMouseMove,
    handleElementDragStart,
    handleElementDragMove,
    handleElementDragEnd,
    handleSelectTool,
    handleDuplicateElement,
    handleElementDelete,
    handleSaveModel,
    handleUndo,
    handleRedo
  };
};
