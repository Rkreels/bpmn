
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { BpmnEditor } from "@/components/process-manager/BpmnEditor";
import { useAuth } from "@/contexts/AuthContext";

export default function ProcessManager() {
  const { hasPermission } = useAuth();

  if (!hasPermission('write') && !hasPermission('model')) {
    return (
      <MainLayout pageTitle="Process Manager">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
            <p className="text-gray-600">
              You don't have permission to access the Process Manager.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout pageTitle="Process Manager" fullHeight={true}>
      <div className="h-full w-full">
        <BpmnEditor />
      </div>
    </MainLayout>
  );
}
