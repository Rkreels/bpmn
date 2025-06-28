
import React, { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface BpmnCanvasProps {
  elements: any[];
  connections: any[];
  selectedElement: string | null;
  selectedTool: string;
  zoomLevel: number;
  showGrid: boolean;
  connectingElement: string | null;
  mousePosition: { x: number; y: number };
  onElementSelect: (elementId: string | null) => void;
  onElementDragStart: (e: React.MouseEvent, elementId: string) => void;
  onElementDragMove: (e: React.MouseEvent) => void;
  onElementDragEnd: () => void;
  onElementUpdate: (elementId: string, updates: any) => void;
  onConnectionCreate: (sourceId: string, targetId: string) => void;
}

export const BpmnCanvas: React.FC<BpmnCanvasProps> = ({
  elements,
  connections,
  selectedElement,
  selectedTool,
  zoomLevel,
  showGrid,
  connectingElement,
  mousePosition,
  onElementSelect,
  onElementDragStart,
  onElementDragMove,
  onElementDragEnd,
  onElementUpdate,
  onConnectionCreate
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const scale = zoomLevel / 100;

  // Handle element click
  const handleElementClick = useCallback((e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    
    if (selectedTool === "connector" && connectingElement) {
      if (connectingElement !== elementId) {
        onConnectionCreate(connectingElement, elementId);
      }
      return;
    }
    
    if (selectedTool === "connector" && !connectingElement) {
      onElementSelect(elementId);
      return;
    }
    
    onElementSelect(elementId);
  }, [selectedTool, connectingElement, onElementSelect, onConnectionCreate]);

  // Handle element double-click for text editing
  const handleElementDoubleClick = useCallback((e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    const element = elements.find(el => el.id === elementId);
    if (element) {
      setEditingElement(elementId);
      setEditingText(element.name || '');
    }
  }, [elements]);

  // Handle text edit completion
  const handleTextEditComplete = useCallback(() => {
    if (editingElement) {
      onElementUpdate(editingElement, { name: editingText });
      setEditingElement(null);
      setEditingText("");
    }
  }, [editingElement, editingText, onElementUpdate]);

  // Handle mouse down on element for dragging
  const handleMouseDown = useCallback((e: React.MouseEvent, elementId: string) => {
    if (selectedTool !== "select") return;
    
    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - rect.left - element.x * scale;
    const offsetY = e.clientY - rect.top - element.y * scale;
    
    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
    onElementSelect(elementId);
    onElementDragStart(e, elementId);
  }, [selectedTool, elements, scale, onElementSelect, onElementDragStart]);

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedElement || selectedTool !== "select") return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newX = Math.max(0, (e.clientX - rect.left - dragOffset.x) / scale);
    const newY = Math.max(0, (e.clientY - rect.top - dragOffset.y) / scale);

    onElementUpdate(selectedElement, { x: newX, y: newY });
    onElementDragMove(e);
  }, [isDragging, selectedElement, selectedTool, dragOffset, scale, onElementUpdate, onElementDragMove]);

  // Handle mouse up to end dragging
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onElementDragEnd();
    }
  }, [isDragging, onElementDragEnd]);

  // Add event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMouseMove(e as any);
      }
    };

    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Render element based on type
  const renderElement = (element: any) => {
    const isSelected = selectedElement === element.id;
    const isConnecting = connectingElement === element.id;
    const isEditing = editingElement === element.id;
    
    const baseClasses = cn(
      "absolute border-2 cursor-pointer transition-all duration-200 select-none",
      isSelected && "border-blue-500 shadow-lg",
      isConnecting && "border-green-500 bg-green-50",
      !isSelected && !isConnecting && "border-gray-300 hover:border-gray-400"
    );

    const style = {
      left: element.x * scale,
      top: element.y * scale,
      width: (element.width || 120) * scale,
      height: (element.height || 80) * scale,
      transform: `scale(1)`,
    };

    const renderContent = () => {
      if (isEditing) {
        return (
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onBlur={handleTextEditComplete}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTextEditComplete();
              if (e.key === 'Escape') {
                setEditingElement(null);
                setEditingText("");
              }
            }}
            className="w-full h-full text-center text-xs bg-transparent border-none outline-none"
            autoFocus
          />
        );
      }
      
      return (
        <span className="text-xs font-medium text-center break-words px-1">
          {element.name || `New ${element.type}`}
        </span>
      );
    };

    switch (element.type) {
      case 'start-event':
        return (
          <div
            key={element.id}
            className={cn(baseClasses, "rounded-full bg-green-100 flex items-center justify-center")}
            style={style}
            onClick={(e) => handleElementClick(e, element.id)}
            onDoubleClick={(e) => handleElementDoubleClick(e, element.id)}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          >
            {renderContent()}
          </div>
        );
      
      case 'end-event':
        return (
          <div
            key={element.id}
            className={cn(baseClasses, "rounded-full bg-red-100 flex items-center justify-center border-4")}
            style={style}
            onClick={(e) => handleElementClick(e, element.id)}
            onDoubleClick={(e) => handleElementDoubleClick(e, element.id)}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          >
            {renderContent()}
          </div>
        );
      
      case 'intermediate-event':
        return (
          <div
            key={element.id}
            className={cn(baseClasses, "rounded-full bg-yellow-100 flex items-center justify-center border-double border-4")}
            style={style}
            onClick={(e) => handleElementClick(e, element.id)}
            onDoubleClick={(e) => handleElementDoubleClick(e, element.id)}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          >
            {renderContent()}
          </div>
        );
      
      case 'task':
      case 'user-task':
      case 'service-task':
      case 'manual-task':
        return (
          <div
            key={element.id}
            className={cn(baseClasses, "rounded-md bg-blue-100 flex items-center justify-center p-2")}
            style={style}
            onClick={(e) => handleElementClick(e, element.id)}
            onDoubleClick={(e) => handleElementDoubleClick(e, element.id)}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          >
            {renderContent()}
            {element.type === 'user-task' && (
              <div className="absolute top-1 left-1 w-3 h-3 bg-blue-500 rounded-full"></div>
            )}
            {element.type === 'service-task' && (
              <div className="absolute top-1 left-1 w-3 h-3 bg-purple-500 rounded-sm"></div>
            )}
          </div>
        );
      
      case 'gateway':
      case 'exclusive-gateway':
      case 'parallel-gateway':
      case 'inclusive-gateway':
        return (
          <div
            key={element.id}
            className={cn(baseClasses, "bg-yellow-100 flex items-center justify-center transform rotate-45")}
            style={{
              ...style,
              width: (element.width || 50) * scale,
              height: (element.height || 50) * scale,
            }}
            onClick={(e) => handleElementClick(e, element.id)}
            onDoubleClick={(e) => handleElementDoubleClick(e, element.id)}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          >
            <div className="transform -rotate-45 text-xs font-bold">
              {element.type === 'exclusive-gateway' ? 'X' : 
               element.type === 'parallel-gateway' ? '+' : 
               element.type === 'inclusive-gateway' ? 'O' : '?'}
            </div>
          </div>
        );
      
      case 'subprocess':
        return (
          <div
            key={element.id}
            className={cn(baseClasses, "rounded-md bg-gray-100 flex items-center justify-center p-2 border-dashed")}
            style={style}
            onClick={(e) => handleElementClick(e, element.id)}
            onDoubleClick={(e) => handleElementDoubleClick(e, element.id)}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          >
            {renderContent()}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        );
      
      default:
        return (
          <div
            key={element.id}
            className={cn(baseClasses, "rounded-md bg-gray-100 flex items-center justify-center p-2")}
            style={style}
            onClick={(e) => handleElementClick(e, element.id)}
            onDoubleClick={(e) => handleElementDoubleClick(e, element.id)}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          >
            {renderContent()}
          </div>
        );
    }
  };

  // Render connection line
  const renderConnection = (connection: any) => {
    const sourceElement = elements.find(el => el.id === connection.source);
    const targetElement = elements.find(el => el.id === connection.target);
    
    if (!sourceElement || !targetElement) return null;

    const sourceX = (sourceElement.x + (sourceElement.width || 120) / 2) * scale;
    const sourceY = (sourceElement.y + (sourceElement.height || 80) / 2) * scale;
    const targetX = (targetElement.x + (targetElement.width || 120) / 2) * scale;
    const targetY = (targetElement.y + (targetElement.height || 80) / 2) * scale;

    return (
      <svg
        key={connection.id}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <marker
            id={`arrowhead-${connection.id}`}
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#374151"
            />
          </marker>
        </defs>
        <line
          x1={sourceX}
          y1={sourceY}
          x2={targetX}
          y2={targetY}
          stroke="#374151"
          strokeWidth="2"
          markerEnd={`url(#arrowhead-${connection.id})`}
        />
      </svg>
    );
  };

  return (
    <div
      ref={canvasRef}
      className={cn(
        "relative w-full h-full overflow-hidden",
        showGrid && "bg-grid-pattern"
      )}
      style={{
        backgroundSize: `${20 * scale}px ${20 * scale}px`,
        cursor: selectedTool === "hand" ? "grab" : selectedTool === "connector" ? "crosshair" : "default"
      }}
      onClick={() => onElementSelect(null)}
    >
      {/* Render connections */}
      {connections.map(renderConnection)}
      
      {/* Render elements */}
      {elements.map(renderElement)}
      
      {/* Connection preview line */}
      {connectingElement && (
        <svg className="absolute top-0 left-0 pointer-events-none w-full h-full">
          <line
            x1={(elements.find(el => el.id === connectingElement)?.x || 0) * scale + 60}
            y1={(elements.find(el => el.id === connectingElement)?.y || 0) * scale + 40}
            x2={mousePosition.x}
            y2={mousePosition.y}
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
      )}
    </div>
  );
};
