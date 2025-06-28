
import { useState, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { complexProcessTemplates, generateBpmnXml, ProcessTemplate } from "@/data/processTemplates";
import { ElementProperties } from "../types";

interface BpmnEditorStateOptions {
  activeTool: string;
}

export const useBpmnEditorState = ({ activeTool }: BpmnEditorStateOptions) => {
  // Load the first complex template as default
  const defaultTemplate = complexProcessTemplates[0];
  
  const [elements, setElements] = useState(defaultTemplate.elements);
  const [connections, setConnections] = useState(defaultTemplate.connections);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState(activeTool);
  const [connectingElement, setConnectingElement] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("editor");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [showValidation, setShowValidation] = useState(false);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [xmlSource, setXmlSource] = useState(generateBpmnXml(defaultTemplate));
  const [elementProperties, setElementProperties] = useState<ElementProperties>({
    id: "",
    name: "",
    type: "",
    documentation: "",
    assignee: "",
    dueDate: "",
    implementation: ""
  });
  
  // Dialog states
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importSource, setImportSource] = useState("");
  
  // Drag and drop states
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [currentElementPosition, setCurrentElementPosition] = useState({ x: 0, y: 0 });
  
  // History management
  const [history, setHistory] = useState([{ elements: defaultTemplate.elements, connections: defaultTemplate.connections }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const { toast } = useToast();
  const { speakText, isVoiceEnabled } = useVoice();
  
  const saveToHistory = useCallback(() => {
    const newState = { elements, connections };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [elements, connections, history, historyIndex]);

  // Load template function
  const loadTemplate = useCallback((templateId: string) => {
    const template = complexProcessTemplates.find(t => t.id === templateId);
    if (template) {
      setElements(template.elements);
      setConnections(template.connections);
      setXmlSource(generateBpmnXml(template));
      saveToHistory();
      
      toast({
        title: "Template Loaded",
        description: `Loaded ${template.name} with ${template.elements.length} elements`
      });
      
      if (isVoiceEnabled) {
        speakText(`Loaded ${template.name} template with ${template.elements.length} elements and ${template.connections.length} connections`);
      }
    }
  }, [saveToHistory, toast, speakText, isVoiceEnabled]);

  // Update XML when elements or connections change
  const updateXmlFromModel = useCallback(() => {
    const currentTemplate: ProcessTemplate = {
      id: "current-process",
      name: "Current Process",
      description: "Current working process",
      category: "Working",
      elements,
      connections,
      properties: {
        processId: "current-process",
        version: "1.0",
        author: "User",
        created: new Date().toISOString(),
        modified: new Date().toISOString()
      }
    };
    
    const newXml = generateBpmnXml(currentTemplate);
    setXmlSource(newXml);
  }, [elements, connections]);

  return {
    // State
    elements,
    connections,
    selectedElement,
    selectedTool,
    connectingElement,
    mousePosition,
    activeTab,
    zoomLevel,
    showGrid,
    showValidation,
    snapToGrid,
    xmlSource,
    elementProperties,
    isEditDialogOpen,
    isImportDialogOpen,
    importSource,
    isDragging,
    dragStartPos,
    currentElementPosition,
    history,
    historyIndex,
    isVoiceEnabled,
    
    // Setters
    setElements,
    setConnections,
    setSelectedElement,
    setSelectedTool,
    setConnectingElement,
    setMousePosition,
    setActiveTab,
    setZoomLevel,
    setShowGrid,
    setShowValidation,
    setSnapToGrid,
    setXmlSource,
    setElementProperties,
    setIsEditDialogOpen,
    setIsImportDialogOpen,
    setImportSource,
    setIsDragging,
    setDragStartPos,
    setCurrentElementPosition,
    
    // Functions
    saveToHistory,
    loadTemplate,
    updateXmlFromModel,
    toast,
    speakText,
    
    // Available templates
    availableTemplates: complexProcessTemplates
  };
};
