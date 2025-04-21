
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { EditorToolbar } from "@/components/process-manager/EditorToolbar";
import { EditorTabView } from "@/components/process-manager/EditorTabView";
import { ProcessContent } from "@/components/process-manager/ProcessContent";

export default function ProcessManager() {
  const [activeTab, setActiveTab] = useState("editor");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <MainLayout pageTitle="Process Manager">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <EditorTabView activeTab={activeTab} onTabChange={handleTabChange} />
          <EditorToolbar />
        </div>

        <TabsContent value="editor" className="mt-0">
          <ProcessContent />
        </TabsContent>
        
        <TabsContent value="properties" className="mt-0">
          <div className="bg-white border rounded-md p-6">
            <h3 className="text-lg font-medium mb-4">Process Properties</h3>
            <p className="text-muted-foreground">Configure process properties and parameters</p>
          </div>
        </TabsContent>
        
        <TabsContent value="repository" className="mt-0">
          <div className="bg-white border rounded-md p-6">
            <h3 className="text-lg font-medium mb-4">Process Repository</h3>
            <p className="text-muted-foreground">Browse and manage process templates</p>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
