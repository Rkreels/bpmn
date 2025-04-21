
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { EditorToolbar } from "@/components/process-manager/EditorToolbar";
import { EditorTabView } from "@/components/process-manager/EditorTabView";
import { ProcessContent } from "@/components/process-manager/ProcessContent";

export default function ProcessManager() {
  return (
    <MainLayout pageTitle="Process Manager">
      <Tabs defaultValue="editor" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <EditorTabView />
          <EditorToolbar />
        </div>

        <TabsContent value="editor" className="mt-0">
          <ProcessContent />
        </TabsContent>
        
        <TabsContent value="properties" className="mt-0">
          <ProcessContent />
        </TabsContent>
        
        <TabsContent value="repository" className="mt-0">
          <ProcessContent />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
