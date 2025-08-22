import { Node, Edge } from '@xyflow/react';

export interface BpmnExporter {
  exportToBpmn: (nodes: Node[], edges: Edge[], processName?: string) => string;
  exportToSvg: (nodes: Node[], edges: Edge[]) => string;
  exportToJson: (nodes: Node[], edges: Edge[], processName?: string) => string;
}

export const createBpmnExporter = (): BpmnExporter => {
  const exportToBpmn = (nodes: Node[], edges: Edge[], processName = 'Untitled Process'): string => {
    const processId = processName.replace(/\s+/g, '_').toLowerCase();
    
    let bpmnXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" 
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" 
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI" 
  id="Definitions_1" 
  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn2:process id="${processId}" name="${processName}" isExecutable="false">
`;

    // Export nodes
    nodes.forEach(node => {
      const nodeType = node.type || 'task';
      const nodeId = node.id;
      const nodeName = node.data?.label || node.id;
      
      switch (nodeType) {
        case 'startEvent':
          bpmnXml += `    <bpmn2:startEvent id="${nodeId}" name="${nodeName}" />\n`;
          break;
        case 'endEvent':
          bpmnXml += `    <bpmn2:endEvent id="${nodeId}" name="${nodeName}" />\n`;
          break;
        case 'task':
          bpmnXml += `    <bpmn2:task id="${nodeId}" name="${nodeName}" />\n`;
          break;
        case 'userTask':
          bpmnXml += `    <bpmn2:userTask id="${nodeId}" name="${nodeName}" />\n`;
          break;
        case 'serviceTask':
          bpmnXml += `    <bpmn2:serviceTask id="${nodeId}" name="${nodeName}" />\n`;
          break;
        case 'gateway':
          bpmnXml += `    <bpmn2:exclusiveGateway id="${nodeId}" name="${nodeName}" />\n`;
          break;
        case 'parallelGateway':
          bpmnXml += `    <bpmn2:parallelGateway id="${nodeId}" name="${nodeName}" />\n`;
          break;
        default:
          bpmnXml += `    <bpmn2:task id="${nodeId}" name="${nodeName}" />\n`;
      }
    });

    // Export edges (sequence flows)
    edges.forEach(edge => {
      bpmnXml += `    <bpmn2:sequenceFlow id="${edge.id}" sourceRef="${edge.source}" targetRef="${edge.target}"`;
      if (edge.label) {
        bpmnXml += ` name="${edge.label}"`;
      }
      bpmnXml += ` />\n`;
    });

    bpmnXml += `  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${processId}">
`;

    // Export visual information
    nodes.forEach(node => {
      const bounds = {
        x: node.position.x,
        y: node.position.y,
        width: node.width || (node.type === 'startEvent' || node.type === 'endEvent' ? 36 : 100),
        height: node.height || (node.type === 'startEvent' || node.type === 'endEvent' ? 36 : 80)
      };

      bpmnXml += `      <bpmndi:BPMNShape id="BPMNShape_${node.id}" bpmnElement="${node.id}">
        <dc:Bounds x="${bounds.x}" y="${bounds.y}" width="${bounds.width}" height="${bounds.height}" />
      </bpmndi:BPMNShape>
`;
    });

    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      
      if (sourceNode && targetNode) {
        bpmnXml += `      <bpmndi:BPMNEdge id="BPMNEdge_${edge.id}" bpmnElement="${edge.id}">
        <di:waypoint x="${sourceNode.position.x + 50}" y="${sourceNode.position.y + 40}" />
        <di:waypoint x="${targetNode.position.x + 50}" y="${targetNode.position.y + 40}" />
      </bpmndi:BPMNEdge>
`;
      }
    });

    bpmnXml += `    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`;

    return bpmnXml;
  };

  const exportToSvg = (nodes: Node[], edges: Edge[]): string => {
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <style>
    .start-event { fill: #dcfce7; stroke: #16a34a; stroke-width: 2; }
    .end-event { fill: #fef2f2; stroke: #dc2626; stroke-width: 3; }
    .task { fill: #f0f9ff; stroke: #0ea5e9; stroke-width: 2; }
    .gateway { fill: #f3e8ff; stroke: #8b5cf6; stroke-width: 2; }
    .text { font-family: Arial; font-size: 12px; fill: #374151; }
  </style>
`;

    // Draw nodes
    nodes.forEach(node => {
      const x = node.position.x;
      const y = node.position.y;
      const label = node.data?.label || node.id;

      switch (node.type) {
        case 'startEvent':
          svgContent += `  <circle cx="${x + 18}" cy="${y + 18}" r="18" class="start-event" />
  <text x="${x + 18}" y="${y + 40}" text-anchor="middle" class="text">${label}</text>
`;
          break;
        case 'endEvent':
          svgContent += `  <circle cx="${x + 18}" cy="${y + 18}" r="18" class="end-event" />
  <text x="${x + 18}" y="${y + 40}" text-anchor="middle" class="text">${label}</text>
`;
          break;
        case 'task':
          svgContent += `  <rect x="${x}" y="${y}" width="100" height="80" rx="10" class="task" />
  <text x="${x + 50}" y="${y + 45}" text-anchor="middle" class="text">${label}</text>
`;
          break;
        case 'gateway':
          svgContent += `  <polygon points="${x + 25},${y} ${x + 50},${y + 25} ${x + 25},${y + 50} ${x},${y + 25}" class="gateway" />
  <text x="${x + 25}" y="${y + 65}" text-anchor="middle" class="text">${label}</text>
`;
          break;
      }
    });

    // Draw edges
    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      
      if (sourceNode && targetNode) {
        const x1 = sourceNode.position.x + 50;
        const y1 = sourceNode.position.y + 40;
        const x2 = targetNode.position.x + 50;
        const y2 = targetNode.position.y + 40;
        
        svgContent += `  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#374151" stroke-width="2" marker-end="url(#arrowhead)" />
`;
      }
    });

    svgContent += `  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
    </marker>
  </defs>
</svg>`;

    return svgContent;
  };

  const exportToJson = (nodes: Node[], edges: Edge[], processName = 'Untitled Process'): string => {
    const processData = {
      name: processName,
      version: '1.0',
      created: new Date().toISOString(),
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type,
        label: edge.label
      }))
    };

    return JSON.stringify(processData, null, 2);
  };

  return {
    exportToBpmn,
    exportToSvg,
    exportToJson
  };
};