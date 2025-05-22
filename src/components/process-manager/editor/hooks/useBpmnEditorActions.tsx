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
  setMousePosition: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>;
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
  const handleAddElement = useCallback((type: string, x: number, y: number) => {
    const id = uuidv4();
    const newElement = {
      id,
      type,
      x: snapToGrid ? Math.round(x / 20) * 20 : x,
      y: snapToGrid ? Math.round(y / 20) * 20 : y,
      width: type === 'task' ? 120 : type === 'gateway' ? 50 : 40,
      height: type === 'task' ? 80 : type === 'gateway' ? 50 : 40,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
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

  const handleSelectElement = useCallback((id: string | null) => {
    setSelectedElement(id);
    
    if (id) {
      const element = elements.find(el => el.id === id);
      if (element) {
        setElementProperties({
          id: element.id,
          type: element.type,
          name: element.name || '',
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
        description: '',
        color: '#ffffff',
      });
    }
  }, [elements, setSelectedElement, setElementProperties, isVoiceEnabled, speakText]);

  const handleStartConnecting = useCallback((id: string) => {
    setConnectingElement(id);
    setSelectedTool('connector');
    
    if (isVoiceEnabled) {
      speakText('Starting connection. Select target element to connect.');
    }
  }, [setConnectingElement, setSelectedTool, isVoiceEnabled, speakText]);

  const handleCompleteConnection = useCallback((targetId: string) => {
    if (connectingElement && connectingElement !== targetId) {
      const id = uuidv4();
      const newConnection = {
        id,
        source: connectingElement,
        target: targetId,
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

  const handleStartDrag = useCallback((id: string, x: number, y: number) => {
    setSelectedElement(id);
    setIsDragging(true);
    setDragStartPos({ x, y });
    
    const element = elements.find(el => el.id === id);
    if (element) {
      setCurrentElementPosition({ x: element.x, y: element.y });
    }
  }, [elements, setSelectedElement, setIsDragging, setDragStartPos, setCurrentElementPosition]);

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
          ? { ...el, x: snappedX, y: snappedY } 
          : el
      ));
    }
  }, [isDragging, dragStartPos, currentElementPosition, selectedElement, snapToGrid, setElements]);

  const handleEndDrag = useCallback(() => {
    if (isDragging && selectedElement) {
      setIsDragging(false);
      setDragStartPos(null);
      setCurrentElementPosition(null);
      saveToHistory(elements, connections);
    }
  }, [isDragging, selectedElement, elements, connections, saveToHistory, setIsDragging, setDragStartPos, setCurrentElementPosition]);

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

  const handleUpdateElementProperties = useCallback((props: ElementProperties) => {
    if (props.id) {
      setElements(prev => prev.map(el => 
        el.id === props.id 
          ? { 
              ...el, 
              name: props.name,
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

  const handleEditElement = useCallback(() => {
    if (selectedElement) {
      const element = elements.find(el => el.id === selectedElement);
      if (element) {
        setElementProperties({
          id: element.id,
          type: element.type,
          name: element.name || '',
          description: element.description || '',
          color: element.color || '#ffffff',
        });
        setIsEditDialogOpen(true);
      }
    }
  }, [selectedElement, elements, setElementProperties, setIsEditDialogOpen]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
    
    if (isVoiceEnabled) {
      speakText('Zoomed in');
    }
  }, [setZoomLevel, isVoiceEnabled, speakText]);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
    
    if (isVoiceEnabled) {
      speakText('Zoomed out');
    }
  }, [setZoomLevel, isVoiceEnabled, speakText]);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(1);
    
    if (isVoiceEnabled) {
      speakText('Zoom reset');
    }
  }, [setZoomLevel, isVoiceEnabled, speakText]);

  const handleToggleGrid = useCallback(() => {
    setShowGrid(prev => !prev);
    
    if (isVoiceEnabled) {
      speakText('Grid toggled');
    }
  }, [setShowGrid, isVoiceEnabled, speakText]);

  const handleToggleValidation = useCallback(() => {
    setShowValidation(prev => !prev);
    
    if (isVoiceEnabled) {
      speakText('Validation toggled');
    }
  }, [setShowValidation, isVoiceEnabled, speakText]);

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

  const handleImportXml = useCallback((xml: string) => {
    try {
      // This is a simplified example - in a real app, you'd parse actual BPMN XML
      // For now, we'll just set some dummy data
      const newElements = [
        { id: 'start1', type: 'event', x: 100, y: 150, width: 40, height: 40, name: 'Start Event' },
        { id: 'task1', type: 'task', x: 200, y: 130, width: 120, height: 80, name: 'User Task' },
        { id: 'gateway1', type: 'gateway', x: 380, y: 150, width: 50, height: 50, name: 'Gateway' },
        { id: 'end1', type: 'event', x: 500, y: 150, width: 40, height: 40, name: 'End Event' },
      ];
      
      const newConnections = [
        { id: 'conn1', source: 'start1', target: 'task1', type: 'sequence' },
        { id: 'conn2', source: 'task1', target: 'gateway1', type: 'sequence' },
        { id: 'conn3', source: 'gateway1', target: 'end1', type: 'sequence' },
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

  const handleOpenImportDialog = useCallback(() => {
    setIsImportDialogOpen(true);
    setImportSource('');
  }, [setIsImportDialogOpen, setImportSource]);

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
    handleImportXml,
    handleOpenImportDialog,
    handleClearDiagram,
  };
};
