
export interface ElementProperties {
  id: string;
  name: string;
  type: string;
  documentation: string;
  assignee: string;
  dueDate: string;
  implementation: string;
}

export interface BpmnElement {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  properties?: Record<string, any>;
}

export interface BpmnConnection {
  id: string;
  source: string;
  target: string;
  type: string;
  waypoints?: Array<{ x: number; y: number }>;
}

export interface ProcessValidation {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  id: string;
  elementId: string;
  message: string;
  severity: "error" | "warning";
}

export interface ValidationWarning {
  id: string;
  elementId: string;
  message: string;
  type: string;
}
