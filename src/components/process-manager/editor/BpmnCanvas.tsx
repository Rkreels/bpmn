
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
  onElementSelect,
  onElementDragStart,
  onElementDragMove,
  onElementDragEnd,
}) => {

  // Helper functions to render elements based on their type
  const renderElement = (element: BpmnElement) => {
    const isSelected = selectedElement === element.id;
    const commonClasses = `absolute cursor-${selectedTool === "select" || selectedTool === "move" ? "move" : "pointer"} ${isSelected ? "ring-2 ring-primary shadow-lg" : ""}`;
    
    switch(element.type) {
      case "task":
        return (
          <div 
            key={element.id}
            className={`${commonClasses} bg-white border rounded-md p-2 w-32 h-20 flex items-center justify-center text-center`}
            style={{ left: element.position.x, top: element.position.y }}
            onClick={() => onElementSelect(element.id)}
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
            onClick={() => onElementSelect(element.id)}
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
            onClick={() => onElementSelect(element.id)}
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
            onClick={() => onElementSelect(element.id)}
            onMouseDown={(e) => onElementDragStart(e, element.id)}
            onMouseMove={onElementDragMove}
            onMouseUp={onElementDragEnd}
            onMouseLeave={onElementDragEnd}
          >
            <div className="text-xs truncate max-w-[80%] text-center">{element.name}</div>
          </div>
        );
        
      default:
        return (
          <div 
            key={element.id}
            className={`${commonClasses} bg-white border rounded-md p-2 w-24 h-16 flex items-center justify-center`}
            style={{ left: element.position.x, top: element.position.y }}
            onClick={() => onElementSelect(element.id)}
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
        const sourceX = source.position.x + 50; // Approximate center
        const sourceY = source.position.y + 30;
        const targetX = target.position.x + 50;
        const targetY = target.position.y + 30;
        
        return (
          <svg 
            key={conn.id} 
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          >
            <line
              x1={sourceX}
              y1={sourceY}
              x2={targetX}
              y2={targetY}
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
        
        {/* Render elements */}
        {elements.map(element => renderElement(element))}
      </div>
    </div>
  );
};
