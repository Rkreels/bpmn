
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface BpmnElement {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  position: { x: number; y: number };
  properties?: any;
}

interface BpmnConnection {
  id: string;
  source: string;
  target: string;
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
  connectingElement: string | null;
  mousePosition: { x: number; y: number };
  onElementSelect: (id: string | null) => void;
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
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const getElementStyle = (element: BpmnElement) => {
    const isSelected = selectedElement === element.id;
    const isConnecting = connectingElement === element.id;
    
    let backgroundColor = '#ffffff';
    let borderColor = isSelected ? '#3b82f6' : '#d1d5db';
    let borderWidth = isSelected ? '2px' : '1px';
    
    // Element-specific styling
    switch (element.type) {
      case 'start-event':
        backgroundColor = '#10b981';
        borderColor = '#059669';
        break;
      case 'end-event':
        backgroundColor = '#ef4444';
        borderColor = '#dc2626';
        break;
      case 'task':
      case 'user-task':
        backgroundColor = '#3b82f6';
        borderColor = '#2563eb';
        break;
      case 'service-task':
        backgroundColor = '#10b981';
        borderColor = '#059669';
        break;
      case 'exclusive-gateway':
        backgroundColor = '#f59e0b';
        borderColor = '#d97706';
        break;
      case 'parallel-gateway':
        backgroundColor = '#10b981';
        borderColor = '#059669';
        break;
    }
    
    if (isConnecting) {
      borderColor = '#8b5cf6';
      borderWidth = '3px';
    }
    
    return {
      position: 'absolute' as const,
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
      backgroundColor,
      border: `${borderWidth} solid ${borderColor}`,
      borderRadius: element.type.includes('gateway') ? '50%' : 
                   element.type.includes('event') ? '50%' : '4px',
      cursor: selectedTool === 'select' ? 'grab' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontSize: '12px',
      fontWeight: '500',
      textAlign: 'center' as const,
      padding: '4px',
      boxSizing: 'border-box' as const,
      transform: `scale(${zoomLevel / 100})`,
      transformOrigin: 'top left',
      zIndex: isSelected ? 1000 : 100,
      transition: 'all 0.2s ease'
    };
  };

  const handleElementClick = (e: React.MouseEvent, element: BpmnElement) => {
    e.stopPropagation();
    
    if (selectedTool === 'connector') {
      if (connectingElement && connectingElement !== element.id) {
        onConnectionCreate(connectingElement, element.id);
      } else {
        onElementSelect(element.id);
      }
    } else {
      onElementSelect(element.id);
    }
  };

  const handleElementDoubleClick = (e: React.MouseEvent, element: BpmnElement) => {
    e.stopPropagation();
    setEditingElement(element.id);
    setEditingText(element.name);
  };

  const handleTextEdit = (elementId: string, newText: string) => {
    onElementUpdate(elementId, { name: newText });
    setEditingElement(null);
    setEditingText('');
  };

  const handleMouseDown = (e: React.MouseEvent, element: BpmnElement) => {
    if (selectedTool === 'select') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - element.x, y: e.clientY - element.y });
      onElementDragStart(e, element.id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedElement) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      onElementUpdate(selectedElement, { x: newX, y: newY, position: { x: newX, y: newY } });
    }
    onElementDragMove(e);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onElementDragEnd();
    }
  };

  const renderConnection = (connection: BpmnConnection) => {
    const sourceElement = elements.find(el => el.id === connection.source);
    const targetElement = elements.find(el => el.id === connection.target);
    
    if (!sourceElement || !targetElement) return null;
    
    const sourceX = sourceElement.x + sourceElement.width / 2;
    const sourceY = sourceElement.y + sourceElement.height / 2;
    const targetX = targetElement.x + targetElement.width / 2;
    const targetY = targetElement.y + targetElement.height / 2;
    
    const pathData = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
    
    return (
      <g key={connection.id}>
        <path
          d={pathData}
          stroke="#374151"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead)"
        />
      </g>
    );
  };

  return (
    <div 
      ref={canvasRef}
      className={`relative w-full h-full overflow-auto ${showGrid ? 'bg-grid-pattern' : 'bg-gray-50'}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ minHeight: '600px' }}
    >
      {/* SVG for connections */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 50 }}
      >
        <defs>
          <marker
            id="arrowhead"
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
        {connections.map(renderConnection)}
      </svg>

      {/* Elements */}
      {elements.map((element) => (
        <div
          key={element.id}
          style={getElementStyle(element)}
          onClick={(e) => handleElementClick(e, element)}
          onDoubleClick={(e) => handleElementDoubleClick(e, element)}
          onMouseDown={(e) => handleMouseDown(e, element)}
        >
          {editingElement === element.id ? (
            <Input
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              onBlur={() => handleTextEdit(element.id, editingText)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleTextEdit(element.id, editingText);
                } else if (e.key === 'Escape') {
                  setEditingElement(null);
                  setEditingText('');
                }
              }}
              className="w-full h-full text-xs border-none bg-transparent text-white placeholder-white/70"
              autoFocus
            />
          ) : (
            <span className="text-xs font-medium text-center break-words">
              {element.name}
            </span>
          )}
        </div>
      ))}

      {/* Connection preview line */}
      {connectingElement && selectedTool === 'connector' && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 200 }}>
          <line
            x1={elements.find(el => el.id === connectingElement)?.x! + elements.find(el => el.id === connectingElement)?.width! / 2}
            y1={elements.find(el => el.id === connectingElement)?.y! + elements.find(el => el.id === connectingElement)?.height! / 2}
            x2={mousePosition.x}
            y2={mousePosition.y}
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
      )}
    </div>
  );
};
