import { Node, Edge } from '@xyflow/react';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const validateBpmnProcess = (nodes: Node[], edges: Edge[]): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for start events
  const startEvents = nodes.filter(node => node.type === 'startEvent');
  if (startEvents.length === 0) {
    errors.push('Process must have at least one start event');
  } else if (startEvents.length > 1) {
    warnings.push('Process has multiple start events');
  }

  // Check for end events
  const endEvents = nodes.filter(node => node.type === 'endEvent');
  if (endEvents.length === 0) {
    errors.push('Process must have at least one end event');
  }

  // Check for orphaned nodes (nodes without connections)
  const connectedNodeIds = new Set();
  edges.forEach(edge => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  const orphanedNodes = nodes.filter(node => 
    !connectedNodeIds.has(node.id) && 
    node.type !== 'startEvent' && 
    nodes.length > 1
  );

  if (orphanedNodes.length > 0) {
    warnings.push(`${orphanedNodes.length} orphaned node(s) found`);
  }

  // Check for invalid connections
  edges.forEach(edge => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (!sourceNode) {
      errors.push(`Edge ${edge.id} has invalid source`);
    }
    if (!targetNode) {
      errors.push(`Edge ${edge.id} has invalid target`);
    }

    // Start events shouldn't have incoming connections
    if (targetNode?.type === 'startEvent') {
      errors.push('Start events cannot have incoming connections');
    }

    // End events shouldn't have outgoing connections
    if (sourceNode?.type === 'endEvent') {
      errors.push('End events cannot have outgoing connections');
    }
  });

  // Check for nodes without labels
  const unlabeledNodes = nodes.filter(node => 
    !node.data?.label || (typeof node.data.label === 'string' && node.data.label.trim() === '')
  );
  if (unlabeledNodes.length > 0) {
    warnings.push(`${unlabeledNodes.length} node(s) without labels`);
  }

  // Check for unreachable end events
  const reachableNodes = new Set<string>();
  const visited = new Set<string>();
  
  const dfs = (nodeId: string) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    reachableNodes.add(nodeId);
    
    const outgoingEdges = edges.filter(e => e.source === nodeId);
    outgoingEdges.forEach(edge => dfs(edge.target));
  };

  startEvents.forEach(startEvent => dfs(startEvent.id));
  
  const unreachableEndEvents = endEvents.filter(endEvent => 
    !reachableNodes.has(endEvent.id)
  );
  
  if (unreachableEndEvents.length > 0) {
    warnings.push(`${unreachableEndEvents.length} unreachable end event(s)`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};