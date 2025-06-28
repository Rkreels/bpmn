
export interface ProcessElement {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  properties?: Record<string, any>;
}

export interface ProcessConnection {
  id: string;
  source: string;
  target: string;
  type: string;
  label?: string;
}

export interface ProcessTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  elements: ProcessElement[];
  connections: ProcessConnection[];
  properties: {
    processId: string;
    version: string;
    author: string;
    created: string;
    modified: string;
  };
}

export const complexProcessTemplates: ProcessTemplate[] = [
  {
    id: "customer-onboarding",
    name: "Customer Onboarding Process",
    description: "Complete customer onboarding workflow with KYC, verification, and account setup",
    category: "Customer Management",
    elements: [
      {
        id: "start-001",
        type: "start-event",
        name: "Customer Application Received",
        x: 100,
        y: 200,
        properties: {
          documentation: "Customer submits application through web portal or branch",
          triggerType: "message"
        }
      },
      {
        id: "task-001",
        type: "user-task",
        name: "Initial Document Review",
        x: 250,
        y: 200,
        properties: {
          assignee: "customer-service",
          dueDate: "PT2H",
          documentation: "Review submitted documents for completeness"
        }
      },
      {
        id: "gateway-001",
        type: "exclusive-gateway",
        name: "Documents Complete?",
        x: 400,
        y: 200,
        properties: {
          documentation: "Check if all required documents are provided"
        }
      },
      {
        id: "task-002",
        type: "user-task",
        name: "Request Missing Documents",
        x: 400,
        y: 350,
        properties: {
          assignee: "customer-service",
          documentation: "Contact customer for missing documents"
        }
      },
      {
        id: "task-003",
        type: "service-task",
        name: "KYC Verification",
        x: 550,
        y: 200,
        properties: {
          implementation: "kyc-service",
          documentation: "Automated KYC check using external service"
        }
      },
      {
        id: "gateway-002",
        type: "exclusive-gateway",
        name: "KYC Passed?",
        x: 700,
        y: 200,
        properties: {
          documentation: "Evaluate KYC verification results"
        }
      },
      {
        id: "task-004",
        type: "user-task",
        name: "Manual Review",
        x: 700,
        y: 350,
        properties: {
          assignee: "compliance-officer",
          documentation: "Manual review for failed KYC cases"
        }
      },
      {
        id: "task-005",
        type: "service-task",
        name: "Create Customer Account",
        x: 850,
        y: 200,
        properties: {
          implementation: "account-service",
          documentation: "Create customer account in core banking system"
        }
      },
      {
        id: "task-006",
        type: "send-task",
        name: "Send Welcome Email",
        x: 1000,
        y: 200,
        properties: {
          messageRef: "welcome-email-template",
          documentation: "Send welcome email with account details"
        }
      },
      {
        id: "end-001",
        type: "end-event",
        name: "Customer Onboarded",
        x: 1150,
        y: 200,
        properties: {
          documentation: "Customer successfully onboarded"
        }
      },
      {
        id: "end-002",
        type: "end-event",
        name: "Application Rejected",
        x: 700,
        y: 450,
        properties: {
          documentation: "Customer application rejected"
        }
      }
    ],
    connections: [
      { id: "flow-001", source: "start-001", target: "task-001", type: "sequence-flow" },
      { id: "flow-002", source: "task-001", target: "gateway-001", type: "sequence-flow" },
      { id: "flow-003", source: "gateway-001", target: "task-002", type: "sequence-flow", label: "Incomplete" },
      { id: "flow-004", source: "gateway-001", target: "task-003", type: "sequence-flow", label: "Complete" },
      { id: "flow-005", source: "task-002", target: "task-001", type: "sequence-flow" },
      { id: "flow-006", source: "task-003", target: "gateway-002", type: "sequence-flow" },
      { id: "flow-007", source: "gateway-002", target: "task-004", type: "sequence-flow", label: "Failed" },
      { id: "flow-008", source: "gateway-002", target: "task-005", type: "sequence-flow", label: "Passed" },
      { id: "flow-009", source: "task-004", target: "end-002", type: "sequence-flow", label: "Reject" },
      { id: "flow-010", source: "task-004", target: "task-005", type: "sequence-flow", label: "Approve" },
      { id: "flow-011", source: "task-005", target: "task-006", type: "sequence-flow" },
      { id: "flow-012", source: "task-006", target: "end-001", type: "sequence-flow" }
    ],
    properties: {
      processId: "customer-onboarding-v2",
      version: "2.1",
      author: "Sarah Johnson",
      created: "2024-01-10T10:00:00Z",
      modified: "2024-01-15T14:30:00Z"
    }
  },
  {
    id: "order-fulfillment",
    name: "Order Fulfillment Process",
    description: "Complete order processing from receipt to delivery with inventory and payment handling",
    category: "Operations",
    elements: [
      {
        id: "start-101",
        type: "start-event",
        name: "Order Received",
        x: 100,
        y: 250,
        properties: {
          documentation: "Customer places order through e-commerce platform",
          triggerType: "message"
        }
      },
      {
        id: "task-101",
        type: "service-task",
        name: "Validate Order",
        x: 250,
        y: 250,
        properties: {
          implementation: "order-validation-service",
          documentation: "Validate order details, pricing, and customer information"
        }
      },
      {
        id: "task-102",
        type: "service-task",
        name: "Check Inventory",
        x: 400,
        y: 250,
        properties: {
          implementation: "inventory-service",
          documentation: "Check product availability in warehouse"
        }
      },
      {
        id: "gateway-101",
        type: "exclusive-gateway",
        name: "Stock Available?",
        x: 550,
        y: 250,
        properties: {
          documentation: "Determine if all items are in stock"
        }
      },
      {
        id: "task-103",
        type: "user-task",
        name: "Handle Backorder",
        x: 550,
        y: 400,
        properties: {
          assignee: "inventory-manager",
          documentation: "Process backorder for out-of-stock items"
        }
      },
      {
        id: "task-104",
        type: "service-task",
        name: "Process Payment",
        x: 700,
        y: 250,
        properties: {
          implementation: "payment-service",
          documentation: "Process customer payment through payment gateway"
        }
      },
      {
        id: "gateway-102",
        type: "parallel-gateway",
        name: "Split for Fulfillment",
        x: 850,
        y: 250
      },
      {
        id: "task-105",
        type: "user-task",
        name: "Pick Items",
        x: 1000,
        y: 150,
        properties: {
          assignee: "warehouse-staff",
          documentation: "Pick items from warehouse inventory"
        }
      },
      {
        id: "task-106",
        type: "user-task",
        name: "Pack Order",
        x: 1000,
        y: 250,
        properties: {
          assignee: "warehouse-staff",
          documentation: "Pack items for shipping"
        }
      },
      {
        id: "task-107",
        type: "service-task",
        name: "Generate Invoice",
        x: 1000,
        y: 350,
        properties: {
          implementation: "billing-service",
          documentation: "Generate customer invoice"
        }
      },
      {
        id: "gateway-103",
        type: "parallel-gateway",
        name: "Join for Shipping",
        x: 1150,
        y: 250
      },
      {
        id: "task-108",
        type: "service-task",
        name: "Arrange Shipping",
        x: 1300,
        y: 250,
        properties: {
          implementation: "shipping-service",
          documentation: "Arrange shipping with carrier"
        }
      },
      {
        id: "task-109",
        type: "send-task",
        name: "Send Tracking Info",
        x: 1450,
        y: 250,
        properties: {
          messageRef: "tracking-notification",
          documentation: "Send tracking information to customer"
        }
      },
      {
        id: "end-101",
        type: "end-event",
        name: "Order Shipped",
        x: 1600,
        y: 250,
        properties: {
          documentation: "Order successfully shipped to customer"
        }
      }
    ],
    connections: [
      { id: "flow-101", source: "start-101", target: "task-101", type: "sequence-flow" },
      { id: "flow-102", source: "task-101", target: "task-102", type: "sequence-flow" },
      { id: "flow-103", source: "task-102", target: "gateway-101", type: "sequence-flow" },
      { id: "flow-104", source: "gateway-101", target: "task-103", type: "sequence-flow", label: "Out of Stock" },
      { id: "flow-105", source: "gateway-101", target: "task-104", type: "sequence-flow", label: "In Stock" },
      { id: "flow-106", source: "task-103", target: "task-104", type: "sequence-flow" },
      { id: "flow-107", source: "task-104", target: "gateway-102", type: "sequence-flow" },
      { id: "flow-108", source: "gateway-102", target: "task-105", type: "sequence-flow" },
      { id: "flow-109", source: "gateway-102", target: "task-106", type: "sequence-flow" },
      { id: "flow-110", source: "gateway-102", target: "task-107", type: "sequence-flow" },
      { id: "flow-111", source: "task-105", target: "gateway-103", type: "sequence-flow" },
      { id: "flow-112", source: "task-106", target: "gateway-103", type: "sequence-flow" },
      { id: "flow-113", source: "task-107", target: "gateway-103", type: "sequence-flow" },
      { id: "flow-114", source: "gateway-103", target: "task-108", type: "sequence-flow" },
      { id: "flow-115", source: "task-108", target: "task-109", type: "sequence-flow" },
      { id: "flow-116", source: "task-109", target: "end-101", type: "sequence-flow" }
    ],
    properties: {
      processId: "order-fulfillment-v3",
      version: "3.0",
      author: "Mike Chen",
      created: "2024-01-05T09:00:00Z",
      modified: "2024-01-14T16:20:00Z"
    }
  }
];

export const generateBpmnXml = (template: ProcessTemplate): string => {
  const elementsXml = template.elements.map(element => {
    const props = element.properties ? Object.entries(element.properties)
      .map(([key, value]) => `${key}="${value}"`).join(' ') : '';
    
    return `    <bpmn:${element.type} id="${element.id}" name="${element.name}" ${props}>
      <bpmn:documentation>${element.properties?.documentation || ''}</bpmn:documentation>
    </bpmn:${element.type}>`;
  }).join('\n');

  const connectionsXml = template.connections.map(conn => {
    const label = conn.label ? `name="${conn.label}"` : '';
    return `    <bpmn:${conn.type} id="${conn.id}" sourceRef="${conn.source}" targetRef="${conn.target}" ${label} />`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  id="Definitions_1" 
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="${template.properties.processId}" isExecutable="true">
${elementsXml}
${connectionsXml}
  </bpmn:process>
</bpmn:definitions>`;
};
