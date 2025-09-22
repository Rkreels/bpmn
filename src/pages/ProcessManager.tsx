
import React from "react";
import { FunctionalProcessManager } from "@/components/process-manager/FunctionalProcessManager";
import { ReactFlowProvider } from '@xyflow/react';

export default function ProcessManager() {
  return (
    <ReactFlowProvider>
      <FunctionalProcessManager />
    </ReactFlowProvider>
  );
}
