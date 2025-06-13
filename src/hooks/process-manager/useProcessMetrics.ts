
import { useState } from "react";

export interface ProcessMetric {
  id: string;
  name: string;
  value: string;
  trend: string;
  change: number;
  target: string;
}

export const useProcessMetrics = () => {
  const [metrics] = useState<ProcessMetric[]>([
    {
      id: "metric-001",
      name: "Process Efficiency",
      value: "87%",
      trend: "up",
      change: 5.2,
      target: "90%"
    },
    {
      id: "metric-002",
      name: "Automation Rate",
      value: "65%",
      trend: "up",
      change: 8.1,
      target: "75%"
    },
    {
      id: "metric-003",
      name: "Compliance Score",
      value: "94%",
      trend: "stable",
      change: 0.5,
      target: "95%"
    },
    {
      id: "metric-004",
      name: "Cycle Time Reduction",
      value: "23%",
      trend: "up",
      change: 12.3,
      target: "30%"
    }
  ]);

  return { metrics };
};
