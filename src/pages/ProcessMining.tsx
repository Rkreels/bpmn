
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { ProcessMiningDashboard } from "@/components/process-mining/ProcessMiningDashboard";

export default function ProcessMining() {
  return (
    <MainLayout pageTitle="Process Mining">
      <ProcessMiningDashboard />
    </MainLayout>
  );
}
