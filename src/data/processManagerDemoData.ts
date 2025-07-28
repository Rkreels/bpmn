export const demoProcesses = [
  {
    id: "demo-process-1",
    name: "Customer Onboarding Process",
    category: "HR",
    status: "active",
    version: "2.1",
    lastModified: new Date().toISOString(),
    elements: [
      {
        id: "start-1",
        type: "start-event",
        name: "Customer Registration",
        x: 100,
        y: 100,
        width: 40,
        height: 40,
        position: { x: 100, y: 100 },
        properties: { color: "#10b981" }
      },
      {
        id: "task-1",
        type: "user-task",
        name: "Verify Customer Identity",
        x: 200,
        y: 80,
        width: 120,
        height: 80,
        position: { x: 200, y: 80 },
        properties: { assignee: "Identity Team", priority: "high" }
      },
      {
        id: "gateway-1",
        type: "exclusive-gateway",
        name: "Identity Verified?",
        x: 370,
        y: 90,
        width: 60,
        height: 60,
        position: { x: 370, y: 90 },
        properties: { condition: "identity_verified == true" }
      },
      {
        id: "task-2",
        type: "service-task",
        name: "Create Account",
        x: 480,
        y: 80,
        width: 120,
        height: 80,
        position: { x: 480, y: 80 },
        properties: { service: "AccountService", automated: true }
      },
      {
        id: "task-3",
        type: "user-task",
        name: "Request Additional Documents",
        x: 320,
        y: 200,
        width: 120,
        height: 80,
        position: { x: 320, y: 200 },
        properties: { assignee: "Compliance Team" }
      },
      {
        id: "end-1",
        type: "end-event",
        name: "Customer Onboarded",
        x: 650,
        y: 100,
        width: 40,
        height: 40,
        position: { x: 650, y: 100 },
        properties: { color: "#ef4444" }
      }
    ],
    connections: [
      {
        id: "flow-1",
        source: "start-1",
        target: "task-1",
        sourceId: "start-1",
        targetId: "task-1",
        type: "sequence-flow",
        name: ""
      },
      {
        id: "flow-2",
        source: "task-1",
        target: "gateway-1",
        sourceId: "task-1",
        targetId: "gateway-1",
        type: "sequence-flow",
        name: ""
      },
      {
        id: "flow-3",
        source: "gateway-1",
        target: "task-2",
        sourceId: "gateway-1",
        targetId: "task-2",
        type: "sequence-flow",
        name: "Yes"
      },
      {
        id: "flow-4",
        source: "gateway-1",
        target: "task-3",
        sourceId: "gateway-1",
        targetId: "task-3",
        type: "sequence-flow",
        name: "No"
      },
      {
        id: "flow-5",
        source: "task-2",
        target: "end-1",
        sourceId: "task-2",
        targetId: "end-1",
        type: "sequence-flow",
        name: ""
      },
      {
        id: "flow-6",
        source: "task-3",
        target: "task-1",
        sourceId: "task-3",
        targetId: "task-1",
        type: "sequence-flow",
        name: "Retry"
      }
    ]
  },
  {
    id: "demo-process-2",
    name: "Invoice Processing Workflow",
    category: "Finance",
    status: "active",
    version: "1.5",
    lastModified: new Date().toISOString(),
    elements: [
      {
        id: "start-2",
        type: "start-event",
        name: "Invoice Received",
        x: 50,
        y: 100,
        width: 40,
        height: 40,
        position: { x: 50, y: 100 },
        properties: { trigger: "message" }
      },
      {
        id: "task-4",
        type: "user-task",
        name: "Review Invoice",
        x: 150,
        y: 80,
        width: 120,
        height: 80,
        position: { x: 150, y: 80 },
        properties: { assignee: "Finance Team" }
      },
      {
        id: "task-5",
        type: "service-task",
        name: "Process Payment",
        x: 320,
        y: 80,
        width: 120,
        height: 80,
        position: { x: 320, y: 80 },
        properties: { service: "PaymentService" }
      },
      {
        id: "end-2",
        type: "end-event",
        name: "Payment Completed",
        x: 500,
        y: 100,
        width: 40,
        height: 40,
        position: { x: 500, y: 100 },
        properties: { color: "#10b981" }
      }
    ],
    connections: [
      {
        id: "flow-7",
        source: "start-2",
        target: "task-4",
        sourceId: "start-2",
        targetId: "task-4",
        type: "sequence-flow",
        name: ""
      },
      {
        id: "flow-8",
        source: "task-4",
        target: "task-5",
        sourceId: "task-4",
        targetId: "task-5",
        type: "sequence-flow",
        name: ""
      },
      {
        id: "flow-9",
        source: "task-5",
        target: "end-2",
        sourceId: "task-5",
        targetId: "end-2",
        type: "sequence-flow",
        name: ""
      }
    ]
  },
  {
    id: "demo-process-3",
    name: "Employee Leave Request",
    category: "HR",
    status: "active",
    version: "3.0",
    lastModified: new Date().toISOString(),
    elements: [
      {
        id: "start-3",
        type: "start-event",
        name: "Leave Request Submitted",
        x: 80,
        y: 120,
        width: 40,
        height: 40,
        position: { x: 80, y: 120 },
        properties: { form: "leave_request_form" }
      },
      {
        id: "task-6",
        type: "user-task",
        name: "Manager Review",
        x: 180,
        y: 100,
        width: 120,
        height: 80,
        position: { x: 180, y: 100 },
        properties: { assignee: "Manager" }
      },
      {
        id: "gateway-2",
        type: "exclusive-gateway",
        name: "Approved?",
        x: 350,
        y: 110,
        width: 60,
        height: 60,
        position: { x: 350, y: 110 },
        properties: {}
      },
      {
        id: "task-7",
        type: "service-task",
        name: "Update HR System",
        x: 460,
        y: 100,
        width: 120,
        height: 80,
        position: { x: 460, y: 100 },
        properties: { service: "HRSystem" }
      },
      {
        id: "task-8",
        type: "user-task",
        name: "Notify Employee",
        x: 300,
        y: 220,
        width: 120,
        height: 80,
        position: { x: 300, y: 220 },
        properties: { assignee: "HR Team" }
      },
      {
        id: "end-3",
        type: "end-event",
        name: "Request Processed",
        x: 620,
        y: 120,
        width: 40,
        height: 40,
        position: { x: 620, y: 120 },
        properties: {}
      }
    ],
    connections: [
      {
        id: "flow-10",
        source: "start-3",
        target: "task-6",
        sourceId: "start-3",
        targetId: "task-6",
        type: "sequence-flow",
        name: ""
      },
      {
        id: "flow-11",
        source: "task-6",
        target: "gateway-2",
        sourceId: "task-6",
        targetId: "gateway-2",
        type: "sequence-flow",
        name: ""
      },
      {
        id: "flow-12",
        source: "gateway-2",
        target: "task-7",
        sourceId: "gateway-2",
        targetId: "task-7",
        type: "sequence-flow",
        name: "Approved"
      },
      {
        id: "flow-13",
        source: "gateway-2",
        target: "task-8",
        sourceId: "gateway-2",
        targetId: "task-8",
        type: "sequence-flow",
        name: "Rejected"
      },
      {
        id: "flow-14",
        source: "task-7",
        target: "end-3",
        sourceId: "task-7",
        targetId: "end-3",
        type: "sequence-flow",
        name: ""
      },
      {
        id: "flow-15",
        source: "task-8",
        target: "end-3",
        sourceId: "task-8",
        targetId: "end-3",
        type: "sequence-flow",
        name: ""
      }
    ]
  }
];