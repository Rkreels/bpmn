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
  
  // Get default dimensions for element type
  const getElementDimensions = (type: string) => {
    switch (type) {
      case 'start-event':
      case 'end-event':
      case 'intermediate-event':
      case 'message-start':
      case 'timer-start':
        return { width: 40, height: 40 };
      case 'exclusive-gateway':
      case 'parallel-gateway':
      case 'inclusive-gateway':
      case 'event-gateway':
        return { width: 50, height: 50 };
      case 'task':
      case 'user-task':
      case 'service-task':
      case 'manual-task':
      case 'script-task':
      case 'send-task':
      case 'receive-task':
      case 'business-rule-task':
        return { width: 120, height: 80 };
      case 'subprocess':
      case 'call-activity':
      case 'event-subprocess':
        return { width: 160, height: 100 };
      case 'data-object':
      case 'data-store':
        return { width: 60, height: 80 };
      case 'pool':
        return { width: 600, height: 200 };
      case 'lane':
        return { width: 600, height: 100 };
      default:
        return { width: 120, height: 80 };
    }
  };

  // Add a new element to the diagram
  const handleAddElement = useCallback((type: string, x: number = 250, y: number = 250) => {
    const id = uuidv4();
    const dimensions = getElementDimensions(type);
    
    const newElement = {
      id,
      type,
      x: snapToGrid ? Math.round(x / 20) * 20 : x,
      y: snapToGrid ? Math.round(y / 20) * 20 : y,
      width: dimensions.width,
      height: dimensions.height,
      name: `New ${type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
      position: {
        x: snapToGrid ? Math.round(x / 20) * 20 : x,
        y: snapToGrid ? Math.round(y / 20) * 20 : y
      },
      // Add default properties for different element types
      properties: {
        documentation: '',
        assignee: type.includes('user') ? 'User' : '',
        dueDate: '',
        implementation: type.includes('service') ? 'Service' : '',
        color: '#ffffff'
      }
    };
    
    const newElements = [...elements, newElement];
    setElements(newElements);
    setSelectedElement(id);
    saveToHistory(newElements, connections);
    
    if (isVoiceEnabled) {
      speakText(`Added new ${type.replace('-', ' ')} element`);
    }
    
    toast({
      title: "Element Added",
      description: `New ${type.replace('-', ' ')} has been added to the diagram.`,
    });
    
    return id;
  }, [elements, connections, snapToGrid, saveToHistory, setElements, setSelectedElement, toast, isVoiceEnabled, speakText]);

  // Update element properties
  const handleElementUpdate = useCallback((elementId: string, updates: any) => {
    const newElements = elements.map(el => 
      el.id === elementId 
        ? { 
            ...el, 
            ...updates,
            position: updates.x !== undefined || updates.y !== undefined 
              ? { x: updates.x ?? el.x, y: updates.y ?? el.y }
              : el.position
          } 
        : el
    );
    
    setElements(newElements);
    
    // Don't save to history for position updates (too frequent)
    if (!updates.x && !updates.y) {
      saveToHistory(newElements, connections);
    }
  }, [elements, connections, setElements, saveToHistory]);

  // Create connection between elements
  const handleConnectionCreate = useCallback((sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;
    
    // Check if connection already exists
    const existingConnection = connections.find(
      conn => (conn.source === sourceId && conn.target === targetId) ||
              (conn.source === targetId && conn.target === sourceId)
    );
    
    if (existingConnection) {
      toast({
        title: "Connection Exists",
        description: "A connection between these elements already exists.",
        variant: "destructive"
      });
      return;
    }
    
    const id = uuidv4();
    const newConnection = {
      id,
      source: sourceId,
      target: targetId,
      sourceId: sourceId,
      targetId: targetId,
      type: 'sequence-flow',
    };
    
    const newConnections = [...connections, newConnection];
    setConnections(newConnections);
    setConnectingElement(null);
    setSelectedTool('select');
    saveToHistory(elements, newConnections);
    
    if (isVoiceEnabled) {
      speakText('Connection created successfully');
    }
    
    toast({
      title: "Connection Created",
      description: "A new connection has been added between elements.",
    });
  }, [connections, elements, saveToHistory, setConnections, setConnectingElement, setSelectedTool, toast, isVoiceEnabled, speakText]);

  // Select an element in the diagram
  const handleSelectElement = useCallback((id: string | null) => {
    setSelectedElement(id);
    
    if (selectedTool === "connector" && id) {
      if (connectingElement && connectingElement !== id) {
        handleConnectionCreate(connectingElement, id);
        return;
      } else if (!connectingElement) {
        setConnectingElement(id);
        if (isVoiceEnabled) {
          speakText('Starting connection. Select target element to connect.');
        }
        return;
      }
    }
    
    if (id) {
      const element = elements.find(el => el.id === id);
      if (element) {
        setElementProperties({
          id: element.id,
          type: element.type,
          name: element.name || '',
          documentation: element.properties?.documentation || '',
          assignee: element.properties?.assignee || '',
          dueDate: element.properties?.dueDate || '',
          implementation: element.properties?.implementation || '',
          description: element.properties?.description || '',
          color: element.properties?.color || '#ffffff',
        });
        
        if (isVoiceEnabled) {
          speakText(`Selected ${element.type.replace('-', ' ')} element: ${element.name || 'unnamed'}`);
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
  }, [elements, selectedTool, connectingElement, setSelectedElement, setElementProperties, setConnectingElement, handleConnectionCreate, isVoiceEnabled, speakText]);

  // Handle element dragging start
  const handleElementDragStart = useCallback((e: React.MouseEvent, elementId: string) => {
    if (selectedTool !== 'select') return;
    
    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    setSelectedElement(elementId);
    setIsDragging(true);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setCurrentElementPosition({ x: element.x, y: element.y });
  }, [selectedTool, elements, setSelectedElement, setIsDragging, setDragStartPos, setCurrentElementPosition]);

  // Handle element dragging
  const handleElementDragMove = useCallback((e: React.MouseEvent) => {
    // This will be handled by the canvas component
  }, []);

  // Handle element dragging end
  const handleElementDragEnd = useCallback(() => {
    if (isDragging && selectedElement) {
      setIsDragging(false);
      setDragStartPos(null);
      setCurrentElementPosition(null);
      // Save to history after drag is complete
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
      const newElements = elements.map(el => 
        el.id === props.id 
          ? { 
              ...el, 
              name: props.name,
              properties: {
                ...el.properties,
                documentation: props.documentation,
                assignee: props.assignee,
                dueDate: props.dueDate,
                implementation: props.implementation,
                description: props.description,
                color: props.color
              }
            } 
          : el
      );
      
      setElements(newElements);
      setIsEditDialogOpen(false);
      saveToHistory(newElements, connections);
      
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
          documentation: element.properties?.documentation || '',
          assignee: element.properties?.assignee || '',
          dueDate: element.properties?.dueDate || '',
          implementation: element.properties?.implementation || '',
          description: element.properties?.description || '',
          color: element.properties?.color || '#ffffff',
        });
        setIsEditDialogOpen(true);
      }
    }
  }, [selectedElement, elements, setElementProperties, setIsEditDialogOpen]);

  // Duplicate element
  const handleDuplicateElement = useCallback(() => {
    if (selectedElement) {
      const elementToDuplicate = elements.find(el => el.id === selectedElement);
      if (elementToDuplicate) {
        const id = uuidv4();
        const newElement = {
          ...elementToDuplicate,
          id,
          x: elementToDuplicate.x + 50,
          y: elementToDuplicate.y + 50,
          name: `Copy of ${elementToDuplicate.name}`,
          position: {
            x: elementToDuplicate.x + 50,
            y: elementToDuplicate.y + 50
          }
        };
        
        const newElements = [...elements, newElement];
        setElements(newElements);
        setSelectedElement(id);
        saveToHistory(newElements, connections);
        
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
    // Generate proper BPMN XML
    const processElements = elements.map(el => {
      switch (el.type) {
        case 'start-event':
          return `    <bpmn:startEvent id="${el.id}" name="${el.name || ''}">
      <bpmn:outgoing>${connections.filter(c => c.source === el.id).map(c => c.id).join('</bpmn:outgoing>\n      <bpmn:outgoing>')}</bpmn:outgoing>
    </bpmn:startEvent>`;
        case 'end-event':
          return `    <bpmn:endEvent id="${el.id}" name="${el.name || ''}">
      <bpmn:incoming>${connections.filter(c => c.target === el.id).map(c => c.id).join('</bpmn:incoming>\n      <bpmn:incoming>')}</bpmn:incoming>
    </bpmn:endEvent>`;
        case 'task':
        case 'user-task':
        case 'service-task':
          return `    <bpmn:${el.type.replace('-', '')} id="${el.id}" name="${el.name || ''}">
      <bpmn:incoming>${connections.filter(c => c.target === el.id).map(c => c.id).join('</bpmn:incoming>\n      <bpmn:incoming>')}</bpmn:incoming>
      <bpmn:outgoing>${connections.filter(c => c.source === el.id).map(c => c.id).join('</bpmn:outgoing>\n      <bpmn:outgoing>')}</bpmn:outgoing>
    </bpmn:${el.type.replace('-', '')}>`;
        default:
          return `    <bpmn:task id="${el.id}" name="${el.name || ''}" />`;
      }
    }).join('\n');

    const sequenceFlows = connections.map(conn => 
      `    <bpmn:sequenceFlow id="${conn.id}" sourceRef="${conn.source}" targetRef="${conn.target}" />`
    ).join('\n');
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
${processElements}
${sequenceFlows}
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
${elements.map(el => `      <bpmndi:BPMNShape id="${el.id}_di" bpmnElement="${el.id}">
        <dc:Bounds x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}" />
      </bpmndi:BPMNShape>`).join('\n')}
${connections.map(conn => `      <bpmndi:BPMNEdge id="${conn.id}_di" bpmnElement="${conn.id}">
        <di:waypoint x="${elements.find(el => el.id === conn.source)?.x + 60}" y="${elements.find(el => el.id === conn.source)?.y + 40}" />
        <di:waypoint x="${elements.find(el => el.id === conn.target)?.x + 60}" y="${elements.find(el => el.id === conn.target)?.y + 40}" />
      </bpmndi:BPMNEdge>`).join('\n')}
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
    
    setXmlSource(xml);
    
    // Download the file
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'process.bpmn';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    if (isVoiceEnabled) {
      speakText('BPMN XML exported successfully');
    }
    
    toast({
      title: "XML Exported",
      description: "BPMN XML has been generated and downloaded successfully.",
    });
  }, [elements, connections, setXmlSource, toast, isVoiceEnabled, speakText]);

  // Export JSON
  const handleExportJson = useCallback(() => {
    const data = {
      elements,
      connections,
      metadata: {
        exportedAt: new Date().toISOString(),
        version: "2.0",
        elementCount: elements.length,
        connectionCount: connections.length
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
      speakText('Process data exported as JSON');
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

  // Open import dialog
  const handleImportClick = useCallback(() => {
    setIsImportDialogOpen(true);
    setImportSource('');
    
    if (isVoiceEnabled) {
      speakText('Import dialog opened');
    }
  }, [setIsImportDialogOpen, setImportSource, isVoiceEnabled, speakText]);

  // Import XML/JSON
  const handleImportConfirm = useCallback((source: string) => {
    try {
      // Try to parse as JSON first
      const data = JSON.parse(source);
      if (data.elements && data.connections) {
        setElements(data.elements);
        setConnections(data.connections);
        setSelectedElement(null);
        saveToHistory(data.elements, data.connections);
        setIsImportDialogOpen(false);
        
        toast({
          title: "Import Successful",
          description: `Imported ${data.elements.length} elements and ${data.connections.length} connections.`,
        });
        
        if (isVoiceEnabled) {
          speakText('Process imported successfully from JSON');
        }
        return;
      }
    } catch (error) {
      // If JSON parsing fails, try XML parsing (simplified)
      console.log('Not JSON, attempting XML parsing...');
    }
    
    // For now, just show an error for unsupported formats
    toast({
      title: "Import Failed",
      description: "Please import a valid JSON file exported from this editor.",
      variant: "destructive"
    });
  }, [setElements, setConnections, setSelectedElement, saveToHistory, setIsImportDialogOpen, toast, isVoiceEnabled, speakText]);

  // Handle canvas click
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedTool === 'select') {
      setSelectedElement(null);
      setConnectingElement(null);
    } else if (selectedTool !== 'connector' && selectedTool !== 'select' && selectedTool !== 'hand') {
      // Add new element when using an element tool
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      handleAddElement(selectedTool, x, y);
      setSelectedTool('select'); // Return to select tool after adding element
    }
  }, [selectedTool, selectedElement, setSelectedElement, setConnectingElement, handleAddElement, setSelectedTool]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, [setMousePosition]);

  // Handle tool selection
  const handleSelectTool = useCallback((tool: string) => {
    setSelectedTool(tool);
    
    if (tool === 'select') {
      setConnectingElement(null);
    }
    
    if (isVoiceEnabled) {
      speakText(`Selected ${tool.replace('-', ' ')} tool`);
    }
  }, [setSelectedTool, setConnectingElement, isVoiceEnabled, speakText]);

  // Save model
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

  // Element delete alias for consistency
  const handleElementDelete = handleDeleteElement;

  return {
    handleAddElement,
    handleElementUpdate,
    handleConnectionCreate,
    handleSelectElement,
    handleElementDragStart,
    handleElementDragMove,
    handleElementDragEnd,
    handleDeleteElement,
    handleUpdateElementProperties,
    handleEditElement,
    handleDuplicateElement,
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
    handleCanvasClick,
    handleMouseMove,
    handleSelectTool,
    handleElementDelete,
    handleSaveModel
  };
};
