
export interface ProcessElement {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
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
    complexity: 'simple' | 'medium' | 'complex';
    industry: string;
    tags: string[];
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
        width: 40,
        height: 40,
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
        y: 180,
        width: 120,
        height: 80,
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
        width: 50,
        height: 50,
        properties: {
          documentation: "Check if all required documents are provided"
        }
      },
      {
        id: "task-002",
        type: "user-task",
        name: "Request Missing Documents",
        x: 400,
        y: 320,
        width: 120,
        height: 80,
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
        y: 180,
        width: 120,
        height: 80,
        properties: {
          implementation: "kyc-service",
          documentation: "Automated KYC check using external service"
        }
      },
      {
        id: "end-001",
        type: "end-event",
        name: "Customer Onboarded",
        x: 700,
        y: 200,
        width: 40,
        height: 40,
        properties: {
          documentation: "Customer successfully onboarded"
        }
      }
    ],
    connections: [
      { id: "flow-001", source: "start-001", target: "task-001", type: "sequence-flow" },
      { id: "flow-002", source: "task-001", target: "gateway-001", type: "sequence-flow" },
      { id: "flow-003", source: "gateway-001", target: "task-002", type: "sequence-flow", label: "Incomplete" },
      { id: "flow-004", source: "gateway-001", target: "task-003", type: "sequence-flow", label: "Complete" },
      { id: "flow-005", source: "task-002", target: "task-001", type: "sequence-flow" },
      { id: "flow-006", source: "task-003", target: "end-001", type: "sequence-flow" }
    ],
    properties: {
      processId: "customer-onboarding-v2",
      version: "2.1",
      author: "Sarah Johnson",
      created: "2024-01-10T10:00:00Z",
      modified: "2024-01-15T14:30:00Z",
      complexity: "medium",
      industry: "Financial Services",
      tags: ["onboarding", "kyc", "customer-service"]
    }
  },
  {
    id: "order-fulfillment",
    name: "E-commerce Order Fulfillment",
    description: "Complete order processing from receipt to delivery with inventory and payment handling",
    category: "Operations",
    elements: [
      {
        id: "start-101",
        type: "start-event",
        name: "Order Received",
        x: 100,
        y: 250,
        width: 40,
        height: 40,
        properties: {
          documentation: "Customer places order through e-commerce platform",
          triggerType: "message"
        }
      },
      {
        id: "task-101",
        type: "service-task",
        name: "Validate Order",
        x: 200,
        y: 230,
        width: 120,
        height: 80,
        properties: {
          implementation: "order-validation-service",
          documentation: "Validate order details, pricing, and customer information"
        }
      },
      {
        id: "task-102",
        type: "service-task",
        name: "Check Inventory",
        x: 350,
        y: 230,
        width: 120,
        height: 80,
        properties: {
          implementation: "inventory-service",
          documentation: "Check product availability in warehouse"
        }
      },
      {
        id: "gateway-101",
        type: "exclusive-gateway",
        name: "Stock Available?",
        x: 500,
        y: 250,
        width: 50,
        height: 50,
        properties: {
          documentation: "Determine if all items are in stock"
        }
      },
      {
        id: "task-103",
        type: "service-task",
        name: "Process Payment",
        x: 600,
        y: 230,
        width: 120,
        height: 80,
        properties: {
          implementation: "payment-service",
          documentation: "Process customer payment through payment gateway"
        }
      },
      {
        id: "end-101",
        type: "end-event",
        name: "Order Shipped",
        x: 750,
        y: 250,
        width: 40,
        height: 40,
        properties: {
          documentation: "Order successfully shipped to customer"
        }
      }
    ],
    connections: [
      { id: "flow-101", source: "start-101", target: "task-101", type: "sequence-flow" },
      { id: "flow-102", source: "task-101", target: "task-102", type: "sequence-flow" },
      { id: "flow-103", source: "task-102", target: "gateway-101", type: "sequence-flow" },
      { id: "flow-104", source: "gateway-101", target: "task-103", type: "sequence-flow", label: "In Stock" },
      { id: "flow-105", source: "task-103", target: "end-101", type: "sequence-flow" }
    ],
    properties: {
      processId: "order-fulfillment-v3",
      version: "3.0",
      author: "Mike Chen",
      created: "2024-01-05T09:00:00Z",
      modified: "2024-01-14T16:20:00Z",
      complexity: "medium",
      industry: "E-commerce",
      tags: ["orders", "fulfillment", "inventory", "payment"]
    }
  },
  {
    id: "employee-onboarding",
    name: "Employee Onboarding Process",
    description: "Comprehensive employee onboarding from hiring to first day setup",
    category: "Human Resources",
    elements: [
      {
        id: "start-201",
        type: "start-event",
        name: "Employee Hired",
        x: 100,
        y: 200,
        width: 40,
        height: 40,
        properties: {
          documentation: "New employee contract signed and hiring process completed"
        }
      },
      {
        id: "task-201",
        type: "user-task",
        name: "Create Employee Profile",
        x: 200,
        y: 180,
        width: 120,
        height: 80,
        properties: {
          assignee: "hr-specialist",
          documentation: "Create employee profile in HRIS system"
        }
      },
      {
        id: "task-202",
        type: "user-task",
        name: "Prepare Workspace",
        x: 350,
        y: 180,
        width: 120,
        height: 80,
        properties: {
          assignee: "facilities-team",
          documentation: "Set up desk, equipment, and access cards"
        }
      },
      {
        id: "task-203",
        type: "service-task",
        name: "Setup IT Accounts",
        x: 500,
        y: 180,
        width: 120,
        height: 80,
        properties: {
          implementation: "it-provisioning-service",
          documentation: "Create IT accounts and assign necessary permissions"
        }
      },
      {
        id: "task-204",
        type: "user-task",
        name: "Orientation Session",
        x: 650,
        y: 180,
        width: 120,
        height: 80,
        properties: {
          assignee: "hr-manager",
          documentation: "Conduct orientation and introduction to company culture"
        }
      },
      {
        id: "end-201",
        type: "end-event",
        name: "Employee Ready",
        x: 800,
        y: 200,
        width: 40,
        height: 40,
        properties: {
          documentation: "Employee successfully onboarded and ready to start"
        }
      }
    ],
    connections: [
      { id: "flow-201", source: "start-201", target: "task-201", type: "sequence-flow" },
      { id: "flow-202", source: "task-201", target: "task-202", type: "sequence-flow" },
      { id: "flow-203", source: "task-202", target: "task-203", type: "sequence-flow" },
      { id: "flow-204", source: "task-203", target: "task-204", type: "sequence-flow" },
      { id: "flow-205", source: "task-204", target: "end-201", type: "sequence-flow" }
    ],
    properties: {
      processId: "employee-onboarding-v1",
      version: "1.0",
      author: "Lisa Wang",
      created: "2024-01-12T11:00:00Z",
      modified: "2024-01-12T11:00:00Z",
      complexity: "simple",
      industry: "General",
      tags: ["hr", "onboarding", "employees"]
    }
  },
  {
    id: "incident-management",
    name: "IT Incident Management",
    description: "Enterprise IT incident handling process with escalation and resolution tracking",
    category: "IT Operations",
    elements: [
      {
        id: "start-301",
        type: "start-event",
        name: "Incident Reported",
        x: 100,
        y: 200,
        width: 40,
        height: 40,
        properties: {
          documentation: "IT incident reported by user or monitoring system"
        }
      },
      {
        id: "task-301",
        type: "user-task",
        name: "Log Incident",
        x: 200,
        y: 180,
        width: 120,
        height: 80,
        properties: {
          assignee: "service-desk",
          documentation: "Log incident details in ITSM system"
        }
      },
      {
        id: "task-302",
        type: "user-task",
        name: "Categorize & Prioritize",
        x: 350,
        y: 180,
        width: 120,
        height: 80,
        properties: {
          assignee: "service-desk",
          documentation: "Categorize incident type and set priority level"
        }
      },
      {
        id: "gateway-301",
        type: "exclusive-gateway",
        name: "Critical Incident?",
        x: 500,
        y: 200,
        width: 50,
        height: 50,
        properties: {
          documentation: "Check if incident is critical priority"
        }
      },
      {
        id: "task-303",
        type: "user-task",
        name: "Escalate to Manager",
        x: 500,
        y: 320,
        width: 120,
        height: 80,
        properties: {
          assignee: "it-manager",
          documentation: "Escalate critical incident to IT manager"
        }
      },
      {
        id: "task-304",
        type: "user-task",
        name: "Assign to Technician",
        x: 600,
        y: 180,
        width: 120,
        height: 80,
        properties: {
          assignee: "service-desk",
          documentation: "Assign incident to appropriate technician"
        }
      },
      {
        id: "task-305",
        type: "user-task",
        name: "Resolve Incident",
        x: 750,
        y: 180,
        width: 120,
        height: 80,
        properties: {
          assignee: "technician",
          documentation: "Investigate and resolve the incident"
        }
      },
      {
        id: "end-301",
        type: "end-event",
        name: "Incident Closed",
        x: 900,
        y: 200,
        width: 40,
        height: 40,
        properties: {
          documentation: "Incident resolved and closed"
        }
      }
    ],
    connections: [
      { id: "flow-301", source: "start-301", target: "task-301", type: "sequence-flow" },
      { id: "flow-302", source: "task-301", target: "task-302", type: "sequence-flow" },
      { id: "flow-303", source: "task-302", target: "gateway-301", type: "sequence-flow" },
      { id: "flow-304", source: "gateway-301", target: "task-303", type: "sequence-flow", label: "Critical" },
      { id: "flow-305", source: "gateway-301", target: "task-304", type: "sequence-flow", label: "Normal" },
      { id: "flow-306", source: "task-303", target: "task-304", type: "sequence-flow" },
      { id: "flow-307", source: "task-304", target: "task-305", type: "sequence-flow" },
      { id: "flow-308", source: "task-305", target: "end-301", type: "sequence-flow" }
    ],
    properties: {
      processId: "incident-management-v2",
      version: "2.0",
      author: "David Kumar",
      created: "2024-01-08T14:00:00Z",
      modified: "2024-01-16T10:15:00Z",
      complexity: "medium",
      industry: "IT Services",
      tags: ["incident", "it-operations", "service-desk"]
    }
  },
  {
    id: "procurement-process",
    name: "Enterprise Procurement Process",
    description: "Complete procurement workflow with approvals, vendor management, and purchase orders",
    category: "Finance & Procurement",
    elements: [
      {
        id: "start-401",
        type: "start-event",
        name: "Purchase Request",
        x: 100,
        y: 200,
        width: 40,
        height: 40,
        properties: {
          documentation: "Employee submits purchase request"
        }
      },
      {
        id: "task-401",
        type: "user-task",
        name: "Review Request",
        x: 200,
        y: 180,
        width: 120,
        height: 80,
        properties: {
          assignee: "procurement-officer",
          documentation: "Review purchase request for compliance and necessity"
        }
      },
      {
        id: "gateway-401",
        type: "exclusive-gateway",
        name: "Amount > $5000?",
        x: 350,
        y: 200,
        width: 50,
        height: 50,
        properties: {
          documentation: "Check if purchase amount requires manager approval"
        }
      },
      {
        id: "task-402",
        type: "user-task",
        name: "Manager Approval",
        x: 350,
        y: 320,
        width: 120,
        height: 80,
        properties: {
          assignee: "department-manager",
          documentation: "Department manager approves high-value purchase"
        }
      },
      {
        id: "task-403",
        type: "user-task",
        name: "Vendor Selection",
        x: 500,
        y: 180,
        width: 120,
        height: 80,
        properties: {
          assignee: "procurement-officer",
          documentation: "Select vendor and negotiate terms"
        }
      },
      {
        id: "task-404",
        type: "service-task",
        name: "Generate PO",
        x: 650,
        y: 180,
        width: 120,
        height: 80,
        properties: {
          implementation: "erp-system",
          documentation: "Generate purchase order in ERP system"
        }
      },
      {
        id: "end-401",
        type: "end-event",
        name: "PO Sent",
        x: 800,
        y: 200,
        width: 40,
        height: 40,
        properties: {
          documentation: "Purchase order sent to vendor"
        }
      }
    ],
    connections: [
      { id: "flow-401", source: "start-401", target: "task-401", type: "sequence-flow" },
      { id: "flow-402", source: "task-401", target: "gateway-401", type: "sequence-flow" },
      { id: "flow-403", source: "gateway-401", target: "task-402", type: "sequence-flow", label: "> $5000" },
      { id: "flow-404", source: "gateway-401", target: "task-403", type: "sequence-flow", label: "≤ $5000" },
      { id: "flow-405", source: "task-402", target: "task-403", type: "sequence-flow" },
      { id: "flow-406", source: "task-403", target: "task-404", type: "sequence-flow" },
      { id: "flow-407", source: "task-404", target: "end-401", type: "sequence-flow" }
    ],
    properties: {
      processId: "procurement-process-v1",
      version: "1.5",
      author: "Jennifer Smith",
      created: "2024-01-07T13:30:00Z",
      modified: "2024-01-13T09:45:00Z",
      complexity: "medium",
      industry: "General",
      tags: ["procurement", "finance", "approvals", "vendor-management"]
    }
  },
  {
    id: "loan-approval",
    name: "Bank Loan Approval Process",
    description: "Comprehensive bank loan approval workflow with credit checks and risk assessment",
    category: "Financial Services",
    elements: [
      {
        id: "start-501",
        type: "start-event",
        name: "Loan Application",
        x: 100,
        y: 200,
        width: 40,
        height: 40,
        properties: {
          documentation: "Customer submits loan application"
        }
      },
      {
        id: "task-501",
        type: "user-task",
        name: "Document Verification",
        x: 200,
        y: 180,
        width: 120,
        height: 80,
        properties: {
          assignee: "loan-officer",
          documentation: "Verify customer documents and application completeness"
        }
      },
      {
        id: "task-502",
        type: "service-task",
        name: "Credit Score Check",
        x: 350,
        y: 180,
        width: 120,
        height: 80,
        properties: {
          implementation: "credit-bureau-service",
          documentation: "Check customer credit score and history"
        }
      },
      {
        id: "gateway-501",
        type: "exclusive-gateway",
        name: "Credit Score OK?",
        x: 500,
        y: 200,
        width: 50,
        height: 50,
        properties: {
          documentation: "Evaluate credit score against loan criteria"
        }
      },
      {
        id: "task-503",
        type: "user-task",
        name: "Risk Assessment",
        x: 600,
        y: 180,
        width: 120,
        height: 80,
        properties: {
          assignee: "risk-analyst",
          documentation: "Conduct comprehensive risk assessment"
        }
      },
      {
        id: "gateway-502",
        type: "exclusive-gateway",
        name: "Risk Acceptable?",
        x: 750,
        y: 200,
        width: 50,
        height: 50,
        properties: {
          documentation: "Determine if risk level is acceptable"
        }
      },
      {
        id: "end-501",
        type: "end-event",
        name: "Loan Approved",
        x: 850,
        y: 150,
        width: 40,
        height: 40,
        properties: {
          documentation: "Loan application approved"
        }
      },
      {
        id: "end-502",
        type: "end-event",
        name: "Loan Rejected",
        x: 850,
        y: 250,
        width: 40,
        height: 40,
        properties: {
          documentation: "Loan application rejected"
        }
      }
    ],
    connections: [
      { id: "flow-501", source: "start-501", target: "task-501", type: "sequence-flow" },
      { id: "flow-502", source: "task-501", target: "task-502", type: "sequence-flow" },
      { id: "flow-503", source: "task-502", target: "gateway-501", type: "sequence-flow" },
      { id: "flow-504", source: "gateway-501", target: "task-503", type: "sequence-flow", label: "Good" },
      { id: "flow-505", source: "gateway-501", target: "end-502", type: "sequence-flow", label: "Poor" },
      { id: "flow-506", source: "task-503", target: "gateway-502", type: "sequence-flow" },
      { id: "flow-507", source: "gateway-502", target: "end-501", type: "sequence-flow", label: "Accept" },
      { id: "flow-508", source: "gateway-502", target: "end-502", type: "sequence-flow", label: "Reject" }
    ],
    properties: {
      processId: "loan-approval-v2",
      version: "2.3",
      author: "Robert Johnson",
      created: "2024-01-03T08:00:00Z",
      modified: "2024-01-17T15:30:00Z",
      complexity: "complex",
      industry: "Banking",
      tags: ["loans", "credit-check", "risk-assessment", "banking"]
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

// Template categories for filtering
export const templateCategories = [
  "All Categories",
  "Customer Management", 
  "Operations",
  "Human Resources",
  "IT Operations", 
  "Finance & Procurement",
  "Financial Services"
];

// Industry filters
export const industryFilters = [
  "All Industries",
  "Financial Services",
  "E-commerce", 
  "IT Services",
  "Banking",
  "General"
];

// Complexity levels
export const complexityLevels = [
  "All Levels",
  "simple",
  "medium", 
  "complex"
];
