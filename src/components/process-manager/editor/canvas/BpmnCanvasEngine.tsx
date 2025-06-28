
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
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);

  const snapToGridPos = useCallback((pos: number) => {
    if (!snapToGrid) return pos;
    const gridSize = 20;
    return Math.round(pos / gridSize) * gridSize;
  }, [snapToGrid]);

  const getElementBounds = (element: BpmnElement) => ({
    left: element.x,
    top: element.y,
    right: element.x + element.width,
    bottom: element.y + element.height,
    centerX: element.x + element.width / 2,
    centerY: element.y + element.height / 2
  });

  const findConnectionPoints = (source: BpmnElement, target: BpmnElement) => {
    const sourceBounds = getElementBounds(source);
    const targetBounds = getElementBounds(target);

    // Calculate optimal connection points
    const dx = targetBounds.centerX - sourceBounds.centerX;
    const dy = targetBounds.centerY - sourceBounds.centerY;

    let sourcePoint, targetPoint;

    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal connection
      if (dx > 0) {
        sourcePoint = { x: sourceBounds.right, y: sourceBounds.centerY };
        targetPoint = { x: targetBounds.left, y: targetBounds.centerY };
      } else {
        sourcePoint = { x: sourceBounds.left, y: sourceBounds.centerY };
        targetPoint = { x: targetBounds.right, y: targetBounds.centerY };
      }
    } else {
      // Vertical connection
      if (dy > 0) {
        sourcePoint = { x: sourceBounds.centerX, y: sourceBounds.bottom };
        targetPoint = { x: targetBounds.centerX, y: targetBounds.top };
      } else {
        sourcePoint = { x: sourceBounds.centerX, y: sourceBounds.top };
        targetPoint = { x: targetBounds.centerX, y: targetBounds.bottom };
      }
    }

    return { sourcePoint, targetPoint };
  };

  const renderConnection = (connection: BpmnConnection) => {
    const sourceElement = elements.find(el => el.id === connection.source);
    const targetElement = elements.find(el => el.id === connection.target);

    if (!sourceElement || !targetElement) return null;

    const { sourcePoint, targetPoint } = findConnectionPoints(sourceElement, targetElement);
    
    // Create smooth curved path
    const midX = (sourcePoint.x + targetPoint.x) / 2;
    const pathData = `M ${sourcePoint.x} ${sourcePoint.y} Q ${midX} ${sourcePoint.y} ${midX} ${(sourcePoint.y + targetPoint.y) / 2} Q ${midX} ${targetPoint.y} ${targetPoint.x} ${targetPoint.y}`;

    return (
      <g key={connection.id} className="connection-group">
        <path
          d={pathData}
          stroke="#374151"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead)"
          className="connection-path"
        />
        <text
          x={midX}
          y={(sourcePoint.y + targetPoint.y) / 2 - 10}
          textAnchor="middle"
          fontSize="12"
          fill="#6b7280"
          className="connection-label"
        >
          {connection.name || ''}
        </text>
      </g>
    );
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
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const canvasRect = canvasRef.current!.getBoundingClientRect();
      
      setDragOffset({
        x: e.clientX - canvasRect.left - element.x,
        y: e.clientY - canvasRect.top - element.y
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (zoomLevel / 100);
    const y = (e.clientY - rect.top) / (zoomLevel / 100);

    if (isDragging && selectedElement) {
      const newX = snapToGridPos(x - dragOffset.x);
      const newY = snapToGridPos(y - dragOffset.y);
      
      onElementUpdate(selectedElement, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  };

  const renderElement = (element: BpmnElement) => {
    const isSelected = selectedElement === element.id;
    const isConnecting = connectingElement === element.id;

    return (
      <div
        key={element.id}
        className={`bpmn-element ${element.type} ${isSelected ? 'selected' : ''} ${isConnecting ? 'connecting' : ''}`}
        style={{
          position: 'absolute',
          left: element.x,
          top: element.y,
          width: element.width,
          height: element.height,
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: 'top left'
        }}
        onMouseDown={(e) => handleElementMouseDown(e, element)}
      >
        <div className="element-content">
          <span className="element-text">{element.name}</span>
        </div>
        
        {isSelected && (
          <>
            {/* Resize handles */}
            <div className="resize-handle nw" />
            <div className="resize-handle ne" />
            <div className="resize-handle sw" />
            <div className="resize-handle se" />
            <div className="resize-handle n" />
            <div className="resize-handle s" />
            <div className="resize-handle w" />
            <div className="resize-handle e" />
          </>
        )}
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
        overflow: 'auto',
        cursor: selectedTool === 'select' ? 'default' : 'crosshair'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={onCanvasClick}
    >
      {/* SVG for connections */}
      <svg
        ref={svgRef}
        className="connections-layer"
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
            x1={elements.find(el => el.id === connectingElement)?.x! + elements.find(el => el.id === connectingElement)?.width! / 2}
            y1={elements.find(el => el.id === connectingElement)?.y! + elements.find(el => el.id === connectingElement)?.height! / 2}
            x2={mousePosition.x}
            y2={mousePosition.y}
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        )}
      </svg>

      {/* Elements layer */}
      <div className="elements-layer" style={{ position: 'relative', zIndex: 2 }}>
        {elements.map(renderElement)}
      </div>
    </div>
  );
};
