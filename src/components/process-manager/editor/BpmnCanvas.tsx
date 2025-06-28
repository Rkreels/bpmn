import React from 'react';
import { BpmnCanvasEngine } from './canvas/BpmnCanvasEngine';

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

export const BpmnCanvas: React.FC<BpmnCanvasProps> = (props) => {
  return <BpmnCanvasEngine {...props} />;
};
