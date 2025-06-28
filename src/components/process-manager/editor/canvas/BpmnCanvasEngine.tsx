
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { BpmnElement, BpmnConnection } from '../types';

interface BpmnCanvasEngineProps {
  elements: BpmnElement[];
  connections: BpmnConnection[];
  selectedElement: string | null;
  selectedTool: string;
  zoomLevel: number;
  showGrid: boolean;
  snapToGrid: boolean;
  connectingElement: string | null;
  mousePosition: { x: number; y: number };
  onElementSelect: (id: string | null) => void;
  onElementUpdate: (elementId: string, updates: any) => void;
  onConnectionCreate: (sourceId: string, targetId: string) => void;
  onCanvasClick: (e: React.MouseEvent) => void;
}

export const BpmnCanvasEngine: React.FC<BpmnCanvasEngineProps> = ({
  elements,
  connections,
  selectedElement,
  selectedTool,
  zoomLevel,
  showGrid,
  snapToGrid,
  connectingElement,
  mousePosition,
  onElementSelect,
  onElementUpdate,
  onConnectionCreate,
  onCanvasClick
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragElement, setDragElement] = useState<string | null>(null);

  const snapToGridPos = useCallback((pos: number) => {
    if (!snapToGrid) return pos;
    const gridSize = 20;
    return Math.round(pos / gridSize) * gridSize;
  }, [snapToGrid]);

  const handleElementMouseDown = (e: React.MouseEvent, element: BpmnElement) => {
    e.stopPropagation();
    
    if (selectedTool === 'connector') {
      if (connectingElement && connectingElement !== element.id) {
        onConnectionCreate(connectingElement, element.id);
      } else {
        onElementSelect(element.id);
      }
      return;
    }

    onElementSelect(element.id);
    
    if (selectedTool === 'select') {
      const rect = canvasRef.current!.getBoundingClientRect();
      const scale = zoomLevel / 100;
      
      setDragOffset({
        x: (e.clientX - rect.left) / scale - element.x,
        y: (e.clientY - rect.top) / scale - element.y
      });
      setIsDragging(true);
      setDragElement(element.id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current || !isDragging || !dragElement) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const scale = zoomLevel / 100;
    const x = (e.clientX - rect.left) / scale - dragOffset.x;
    const y = (e.clientY - rect.top) / scale - dragOffset.y;

    const newX = snapToGridPos(Math.max(0, x));
    const newY = snapToGridPos(Math.max(0, y));
    
    onElementUpdate(dragElement, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragElement(null);
  };

  const renderConnection = (connection: BpmnConnection) => {
    const sourceElement = elements.find(el => el.id === connection.source);
    const targetElement = elements.find(el => el.id === connection.target);

    if (!sourceElement || !targetElement) return null;

    const sourceX = sourceElement.x + (sourceElement.width || 100) / 2;
    const sourceY = sourceElement.y + (sourceElement.height || 50) / 2;
    const targetX = targetElement.x + (targetElement.width || 100) / 2;
    const targetY = targetElement.y + (targetElement.height || 50) / 2;

    return (
      <g key={connection.id}>
        <line
          x1={sourceX}
          y1={sourceY}
          x2={targetX}
          y2={targetY}
          className="connection-line"
          markerEnd="url(#arrowhead)"
        />
        {connection.name && (
          <text
            x={(sourceX + targetX) / 2}
            y={(sourceY + targetY) / 2 - 10}
            textAnchor="middle"
            fontSize="11"
            fill="#6b7280"
          >
            {connection.name}
          </text>
        )}
      </g>
    );
  };

  const renderElement = (element: BpmnElement) => {
    const isSelected = selectedElement === element.id;
    const isConnecting = connectingElement === element.id;

    return (
      <div
        key={element.id}
        className={`bpmn-element ${isSelected ? 'selected' : ''} ${isConnecting ? 'connecting' : ''}`}
        data-type={element.type}
        style={{
          left: element.x,
          top: element.y,
          width: element.width || 100,
          height: element.height || 50,
        }}
        onMouseDown={(e) => handleElementMouseDown(e, element)}
      >
        <div>
          {element.name}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={canvasRef}
      className={`bpmn-canvas ${showGrid ? 'with-grid' : ''}`}
      style={{
        transform: `scale(${zoomLevel / 100})`,
        transformOrigin: '0 0',
        minHeight: '500px',
        width: '100%',
        height: '100%'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={onCanvasClick}
    >
      {/* SVG for connections */}
      <svg
        className="connections-layer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
            fill="#374151"
          >
            <polygon points="0 0, 10 3.5, 0 7" />
          </marker>
        </defs>
        {connections.map(renderConnection)}
        
        {/* Connection preview */}
        {connectingElement && selectedTool === 'connector' && (
          <line
            x1={elements.find(el => el.id === connectingElement)?.x! + (elements.find(el => el.id === connectingElement)?.width! || 100) / 2}
            y1={elements.find(el => el.id === connectingElement)?.y! + (elements.find(el => el.id === connectingElement)?.height! || 50) / 2}
            x2={mousePosition.x / (zoomLevel / 100)}
            y2={mousePosition.y / (zoomLevel / 100)}
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        )}
      </svg>

      {/* Elements layer */}
      <div className="elements-layer">
        {elements.map(renderElement)}
      </div>
    </div>
  );
};
