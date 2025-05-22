
// Define the types for BPMN elements and connections

export interface ElementPosition {
  x: number;
  y: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ElementProperties {
  id: string;
  name: string;
  type: string;
  description?: string;
  color?: string;
  custom?: Record<string, any>;
}

export interface BpmnElement {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  position: ElementPosition; // Added position property to match interface
  properties?: {
    description?: string;
    color?: string;
    custom?: Record<string, any>;
  };
}

export interface BpmnConnection {
  id: string;
  source: string;
  target: string;
  sourceId: string; // Added to match interface
  targetId: string; // Added to match interface
  type?: string;
}
