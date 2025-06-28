
export interface ProcessTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  elements: any[];
  connections: any[];
  properties: {
    complexity: string;
    estimatedTime: string;
    industry: string;
  };
}

export const complexProcessTemplates: ProcessTemplate[] = [
  {
    id: 'order-to-cash',
    name: 'Order to Cash Process',
    category: 'Sales',
    description: 'Complete order processing workflow',
    elements: [
      { id: 'start_1', type: 'start-event', name: 'Order Received', x: 100, y: 100, width: 36, height: 36 },
      { id: 'task_1', type: 'task', name: 'Validate Order', x: 200, y: 80, width: 100, height: 80 },
      { id: 'gateway_1', type: 'exclusive-gateway', name: 'Order Valid?', x: 350, y: 95, width: 50, height: 50 },
      { id: 'task_2', type: 'task', name: 'Process Payment', x: 450, y: 80, width: 100, height: 80 },
      { id: 'end_1', type: 'end-event', name: 'Order Complete', x: 600, y: 100, width: 36, height: 36 }
    ],
    connections: [
      { id: 'flow_1', source: 'start_1', target: 'task_1', type: 'sequence-flow' },
      { id: 'flow_2', source: 'task_1', target: 'gateway_1', type: 'sequence-flow' },
      { id: 'flow_3', source: 'gateway_1', target: 'task_2', type: 'sequence-flow' },
      { id: 'flow_4', source: 'task_2', target: 'end_1', type: 'sequence-flow' }
    ],
    properties: {
      complexity: 'medium',
      estimatedTime: '30 minutes',
      industry: 'retail'
    }
  },
  {
    id: 'customer-onboarding',
    name: 'Customer Onboarding',
    category: 'Customer Service',
    description: 'New customer registration and setup',
    elements: [
      { id: 'start_2', type: 'start-event', name: 'Application Received', x: 100, y: 100, width: 36, height: 36 },
      { id: 'task_3', type: 'user-task', name: 'Verify Identity', x: 200, y: 80, width: 100, height: 80 },
      { id: 'task_4', type: 'service-task', name: 'Create Account', x: 350, y: 80, width: 100, height: 80 },
      { id: 'end_2', type: 'end-event', name: 'Account Active', x: 500, y: 100, width: 36, height: 36 }
    ],
    connections: [
      { id: 'flow_5', source: 'start_2', target: 'task_3', type: 'sequence-flow' },
      { id: 'flow_6', source: 'task_3', target: 'task_4', type: 'sequence-flow' },
      { id: 'flow_7', source: 'task_4', target: 'end_2', type: 'sequence-flow' }
    ],
    properties: {
      complexity: 'low',
      estimatedTime: '15 minutes',
      industry: 'general'
    }
  }
];

export const generateBpmnXml = (template: ProcessTemplate): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    ${template.elements.map(el => `<bpmn:${el.type.replace('-', '')} id="${el.id}" name="${el.name}" />`).join('\n    ')}
    ${template.connections.map(conn => `<bpmn:sequenceFlow id="${conn.id}" sourceRef="${conn.source}" targetRef="${conn.target}" />`).join('\n    ')}
  </bpmn:process>
</bpmn:definitions>`;
};
