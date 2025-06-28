
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
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragElement, setDragElement] = useState<string | null>(null);

  const snapToGridPos = useCallback((pos: number) => {
    if (!snapToGrid) return pos;
    const gridSize = 20;
    return Math.round(pos / gridSize) * gridSize;
  }, [snapToGrid]);

  const getElementStyle = (elementType: string) => {
    const baseStyle = {
      border: '2px solid #374151',
      backgroundColor: '#ffffff',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: '500',
      textAlign: 'center' as const,
      cursor: selectedTool === 'select' ? 'move' : 'pointer',
      userSelect: 'none' as const,
      transition: 'all 0.2s ease'
    };

    switch (elementType) {
      case 'start-event':
        return {
          ...baseStyle,
          borderRadius: '50%',
          backgroundColor: '#dcfce7',
          borderColor: '#16a34a'
        };
      case 'end-event':
        return {
          ...baseStyle,
          borderRadius: '50%',
          backgroundColor: '#fef2f2',
          borderColor: '#dc2626',
          borderWidth: '3px'
        };
      case 'task':
      case 'user-task':
        return {
          ...baseStyle,
          backgroundColor: '#f0f9ff',
          borderColor: '#0ea5e9'
        };
      case 'service-task':
        return {
          ...baseStyle,
          backgroundColor: '#fef3c7',
          borderColor: '#f59e0b'
        };
      case 'exclusive-gateway':
      case 'parallel-gateway':
        return {
          ...baseStyle,
          transform: 'rotate(45deg)',
          backgroundColor: '#f3e8ff',
          borderColor: '#8b5cf6'
        };
      default:
        return baseStyle;
    }
  };

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
          stroke="#374151"
          strokeWidth="2"
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
    const elementStyle = getElementStyle(element.type);

    return (
      <div
        key={element.id}
        className={`bpmn-element ${isSelected ? 'selected' : ''} ${isConnecting ? 'connecting' : ''}`}
        style={{
          position: 'absolute',
          left: element.x,
          top: element.y,
          width: element.width || 100,
          height: element.height || 50,
          ...elementStyle,
          ...(isSelected && {
            boxShadow: '0 0 0 2px #3b82f6',
            borderColor: '#3b82f6'
          }),
          ...(isConnecting && {
            boxShadow: '0 0 0 2px #8b5cf6',
            borderColor: '#8b5cf6'
          })
        }}
        onMouseDown={(e) => handleElementMouseDown(e, element)}
      >
        <div style={{ 
          transform: element.type.includes('gateway') ? 'rotate(-45deg)' : 'none',
          padding: '4px'
        }}>
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
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: selectedTool === 'select' ? 'default' : 'crosshair',
        transform: `scale(${zoomLevel / 100})`,
        transformOrigin: '0 0',
        backgroundImage: showGrid ? 
          'radial-gradient(circle, #e5e7eb 1px, transparent 1px)' : 'none',
        backgroundSize: showGrid ? '20px 20px' : 'auto'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={onCanvasClick}
    >
      {/* SVG for connections */}
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
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
      <div style={{ position: 'relative', zIndex: 2 }}>
        {elements.map(renderElement)}
      </div>
    </div>
  );
};
