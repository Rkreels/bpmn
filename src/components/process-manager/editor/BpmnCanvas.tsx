
import React from "react";

interface BpmnElement {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
}

interface BpmnConnection {
  id: string;
  sourceId: string;
  targetId: string;
  type: string;
}

interface BpmnCanvasProps {
  elements: BpmnElement[];
  connections: BpmnConnection[];
  selectedElement: string | null;
  selectedTool: string;
  zoomLevel: number;
  showGrid: boolean;
  connectingElement?: string | null;
  mousePosition?: { x: number; y: number };
  onElementSelect: (elementId: string) => void;
  onElementDragStart: (e: React.MouseEvent, elementId: string) => void;
  onElementDragMove: (e: React.MouseEvent) => void;
  onElementDragEnd: () => void;
}

export const BpmnCanvas: React.FC<BpmnCanvasProps> = ({
  elements,
  connections,
  selectedElement,
  selectedTool,
  zoomLevel,
  showGrid,
  connectingElement = null,
  mousePosition = { x: 0, y: 0 },
  onElementSelect,
  onElementDragStart,
  onElementDragMove,
  onElementDragEnd,
}) => {

  // Helper to get element center position
  const getElementCenter = (element: BpmnElement) => {
    if (!element || !element.position) {
      return { x: 0, y: 0 }; // Safe fallback when element or position is undefined
    }
    
    const elementType = element.type;
    let centerX = element.position.x;
    let centerY = element.position.y;
    
    if (elementType === 'task') {
      centerX += 60; // half of typical task width
      centerY += 40; // half of typical task height
    } else if (elementType === 'gateway') {
      centerX += 30; // half of typical gateway width
      centerY += 30; // half of typical gateway height
    } else {
      // start/end events and others
      centerX += 20; // half of typical event diameter
      centerY += 20; // half of typical event diameter
    }
    
    return { x: centerX, y: centerY };
  };

  // Helper functions to render elements based on their type
  const renderElement = (element: BpmnElement) => {
    if (!element || !element.position) {
      console.error("Invalid element or missing position:", element);
      return null; // Don't render if element or position is invalid
    }

    const isSelected = selectedElement === element.id;
    const isCursorStyle = selectedTool === "connector" ? "crosshair" : 
                          (selectedTool === "select" || selectedTool === "move" || selectedTool === "hand") ? "move" : "default";
    
    const commonClasses = `absolute cursor-${isCursorStyle} ${isSelected ? "ring-2 ring-primary shadow-lg" : ""}`;
    
    switch(element.type) {
      case "task":
        return (
          <div 
            key={element.id}
            className={`${commonClasses} bg-white border rounded-md p-2 w-32 h-20 flex items-center justify-center text-center`}
            style={{ left: element.position.x, top: element.position.y }}
            onClick={(e) => {
              e.stopPropagation();
              onElementSelect(element.id);
            }}
            onMouseDown={(e) => onElementDragStart(e, element.id)}
            onMouseMove={onElementDragMove}
            onMouseUp={onElementDragEnd}
            onMouseLeave={onElementDragEnd}
          >
            <span className="text-sm font-medium truncate max-w-[90%] break-words">{element.name}</span>
          </div>
        );
        
      case "gateway":
        return (
          <div 
            key={element.id}
            className={`${commonClasses}`}
            style={{ 
              left: element.position.x, 
              top: element.position.y,
              width: "60px",
              height: "60px"
            }}
            onClick={(e) => {
              e.stopPropagation();
              onElementSelect(element.id);
            }}
            onMouseDown={(e) => onElementDragStart(e, element.id)}
            onMouseMove={onElementDragMove}
            onMouseUp={onElementDragEnd}
            onMouseLeave={onElementDragEnd}
          >
            <div className="w-full h-full bg-white border transform rotate-45 flex items-center justify-center">
              <span className="transform -rotate-45 text-center text-xs max-w-[70%] truncate">{element.name}</span>
            </div>
          </div>
        );
        
      case "start-event":
        return (
          <div 
            key={element.id}
            className={`${commonClasses} bg-white border rounded-full w-12 h-12 flex items-center justify-center`}
            style={{ left: element.position.x, top: element.position.y }}
            onClick={(e) => {
              e.stopPropagation();
              onElementSelect(element.id);
            }}
            onMouseDown={(e) => onElementDragStart(e, element.id)}
            onMouseMove={onElementDragMove}
            onMouseUp={onElementDragEnd}
            onMouseLeave={onElementDragEnd}
          >
            <div className="text-xs truncate max-w-[80%] text-center">{element.name}</div>
          </div>
        );
        
      case "end-event":
        return (
          <div 
            key={element.id}
            className={`${commonClasses} bg-white border-2 border-black rounded-full w-12 h-12 flex items-center justify-center`}
            style={{ left: element.position.x, top: element.position.y }}
            onClick={(e) => {
              e.stopPropagation();
              onElementSelect(element.id);
            }}
            onMouseDown={(e) => onElementDragStart(e, element.id)}
            onMouseMove={onElementDragMove}
            onMouseUp={onElementDragEnd}
            onMouseLeave={onElementDragEnd}
          >
            <div className="text-xs truncate max-w-[80%] text-center">{element.name}</div>
          </div>
        );
        
      case "subprocess":
        return (
          <div 
            key={element.id}
            className={`${commonClasses} bg-white border-2 rounded-md p-2 w-40 h-32 flex items-center justify-center`}
            style={{ left: element.position.x, top: element.position.y }}
            onClick={(e) => {
              e.stopPropagation();
              onElementSelect(element.id);
            }}
            onMouseDown={(e) => onElementDragStart(e, element.id)}
            onMouseMove={onElementDragMove}
            onMouseUp={onElementDragEnd}
            onMouseLeave={onElementDragEnd}
          >
            <div className="text-sm font-medium truncate max-w-[90%] text-center">{element.name}</div>
          </div>
        );
      
      case "dataobject":
        return (
          <div 
            key={element.id}
            className={`${commonClasses} bg-white border rounded-md p-2 w-16 h-20 flex flex-col items-center justify-center`}
            style={{ left: element.position.x, top: element.position.y }}
            onClick={(e) => {
              e.stopPropagation();
              onElementSelect(element.id);
            }}
            onMouseDown={(e) => onElementDragStart(e, element.id)}
            onMouseMove={onElementDragMove}
            onMouseUp={onElementDragEnd}
            onMouseLeave={onElementDragEnd}
          >
            <div className="w-full h-full relative flex items-center justify-center">
              <div className="absolute top-0 right-0 w-4 h-4 bg-white border-t border-r transform rotate-90"></div>
              <span className="text-xs truncate max-w-[90%] text-center mt-2">{element.name}</span>
            </div>
          </div>
        );
        
      case "pool":
        return (
          <div 
            key={element.id}
            className={`${commonClasses} bg-white border rounded-sm p-2 w-64 h-24 flex items-center`}
            style={{ left: element.position.x, top: element.position.y }}
            onClick={(e) => {
              e.stopPropagation();
              onElementSelect(element.id);
            }}
            onMouseDown={(e) => onElementDragStart(e, element.id)}
            onMouseMove={onElementDragMove}
            onMouseUp={onElementDragEnd}
            onMouseLeave={onElementDragEnd}
          >
            <div className="w-8 h-full border-r flex items-center justify-center -ml-2 -mt-2 -mb-2">
              <span className="transform -rotate-90 text-xs whitespace-nowrap">{element.name}</span>
            </div>
          </div>
        );
        
      default:
        return (
          <div 
            key={element.id}
            className={`${commonClasses} bg-white border rounded-md p-2 w-24 h-16 flex items-center justify-center`}
            style={{ left: element.position.x, top: element.position.y }}
            onClick={(e) => {
              e.stopPropagation();
              onElementSelect(element.id);
            }}
            onMouseDown={(e) => onElementDragStart(e, element.id)}
            onMouseMove={onElementDragMove}
            onMouseUp={onElementDragEnd}
            onMouseLeave={onElementDragEnd}
          >
            <span className="text-xs truncate max-w-[90%] text-center">{element.name}</span>
          </div>
        );
    }
  };

  // Render connections between elements
  const renderConnections = () => {
    return connections.map(conn => {
      const source = elements.find(el => el.id === conn.sourceId);
      const target = elements.find(el => el.id === conn.targetId);
      
      if (source && target) {
        const sourceCenter = getElementCenter(source);
        const targetCenter = getElementCenter(target);
        
        return (
          <svg 
            key={conn.id} 
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          >
            <line
              x1={sourceCenter.x}
              y1={sourceCenter.y}
              x2={targetCenter.x}
              y2={targetCenter.y}
              stroke="black"
              strokeWidth={conn.type === "message-flow" ? 1 : 2}
              strokeDasharray={conn.type === "message-flow" ? "5,5" : ""}
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" />
              </marker>
            </defs>
          </svg>
        );
      }
      return null;
    });
  };

  // Render temporary connection when creating a new connection
  const renderTemporaryConnection = () => {
    if (connectingElement) {
      const source = elements.find(el => el.id === connectingElement);
      
      if (source) {
        const sourceCenter = getElementCenter(source);
        
        return (
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <line
              x1={sourceCenter.x}
              y1={sourceCenter.y}
              x2={mousePosition.x}
              y2={mousePosition.y}
              stroke="black"
              strokeWidth={2}
              strokeDasharray="5,5"
              markerEnd="url(#temp-arrowhead)"
            />
            <defs>
              <marker
                id="temp-arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="black" />
              </marker>
            </defs>
          </svg>
        );
      }
    }
    return null;
  };

  return (
    <div 
      className={`flex-1 overflow-auto relative ${showGrid ? 'bg-grid' : 'bg-slate-50'}`}
      style={{ height: 'calc(100% - 50px)' }}
    >
      <div
        className="h-full w-full relative"
        style={{ 
          transform: `scale(${zoomLevel/100})`,
          transformOrigin: 'top left',
          transition: 'transform 0.2s ease-out',
          minWidth: '2000px',
          minHeight: '1000px'
        }}
      >
        {/* Render connections */}
        {renderConnections()}
        
        {/* Render temporary connection when creating a new one */}
        {renderTemporaryConnection()}
        
        {/* Render elements */}
        {elements.map(element => renderElement(element))}
      </div>
    </div>
  );
};
