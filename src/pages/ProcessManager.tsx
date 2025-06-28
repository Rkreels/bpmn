
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { BpmnEditor } from "@/components/process-manager/BpmnEditor";

export default function ProcessManager() {
  return (
    <MainLayout pageTitle="Process Manager" fullHeight={true}>
      <div className="h-full w-full">
        <BpmnEditor />
      </div>
    </MainLayout>
  );
}
