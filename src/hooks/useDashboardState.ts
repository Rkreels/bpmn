
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface ProcessModel {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
}

export interface DashboardMetrics {
  totalProcesses: number;
  compliance: number;
  processingTime: number;
  deviations: number;
}

export const useDashboardState = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalProcesses: 184,
    compliance: 92,
    processingTime: 4.2,
    deviations: 24
  });

  const handleCreateProcess = () => {
    toast({
      title: "Creating new process model",
      description: "You'll be redirected to the process editor",
    });
    // In a real app, this would navigate to the process editor
    window.location.href = "/process-manager";
  };

  const handleSearchRepository = () => {
    toast({
      title: "Opening repository search",
      description: "Redirecting to repository",
    });
    window.location.href = "/repository";
  };

  const handleInviteTeam = () => {
    toast({
      title: "Team invitation",
      description: "Opening team invitation dialog",
    });
  };

  return {
    metrics,
    handleCreateProcess,
    handleSearchRepository,
    handleInviteTeam,
  };
};
