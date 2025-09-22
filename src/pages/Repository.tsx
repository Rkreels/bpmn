
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { FunctionalRepositoryManagement } from "@/components/repository/FunctionalRepositoryManagement";

export default function Repository() {
  return (
    <MainLayout pageTitle="Repository">
      <FunctionalRepositoryManagement />
    </MainLayout>
  );
}
