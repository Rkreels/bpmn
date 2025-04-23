
export interface IntegrationSystem {
  id: string;
  name: string;
  type: "sap" | "database" | "api" | "workflow" | "other";
  status: "connected" | "disconnected" | "pending";
  lastSync?: string;
}

export const integrations: IntegrationSystem[] = [
  {
    id: "sap-s4",
    name: "SAP S/4HANA",
    type: "sap",
    status: "connected",
    lastSync: "Today at 09:15 AM"
  },
  {
    id: "workflow-engine",
    name: "Process Workflow Engine",
    type: "workflow",
    status: "connected",
    lastSync: "Yesterday at 3:22 PM"
  },
  {
    id: "oracle-db",
    name: "Oracle Database",
    type: "database",
    status: "disconnected"
  },
  {
    id: "rest-api",
    name: "External REST API",
    type: "api",
    status: "pending"
  }
];
