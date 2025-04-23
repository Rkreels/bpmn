
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { EditorToolbar } from "@/components/process-manager/EditorToolbar";
import { EditorTabView } from "@/components/process-manager/EditorTabView";
import { ProcessContent } from "@/components/process-manager/ProcessContent";

export default function ProcessManager() {
  const [activeTab, setActiveTab] = useState("editor");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();
  
  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      handleAutoSave();
    }, 120000); // Auto-save every 2 minutes
    
    return () => clearInterval(autoSaveInterval);
  }, []);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const handleAutoSave = () => {
    setLastSaved(new Date());
    toast({
      title: "Process Auto-saved",
      description: `Your process model was automatically saved at ${new Date().toLocaleTimeString()}.`,
      variant: "default"
    });
  };

  return (
    <MainLayout pageTitle="Process Manager">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <EditorTabView activeTab={activeTab} onTabChange={handleTabChange} />
          <div className="flex items-center gap-4">
            {lastSaved && (
              <span className="text-xs text-muted-foreground">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
            <EditorToolbar />
          </div>
        </div>

        <TabsContent value="editor" className="mt-0">
          <ProcessContent />
        </TabsContent>
        
        <TabsContent value="properties" className="mt-0">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Process Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Basic Information</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium">Process ID</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md mt-1" 
                      defaultValue="PROC-2023-001" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Process Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md mt-1" 
                      defaultValue="Order to Cash Process" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Process Owner</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md mt-1" 
                      defaultValue="John Doe" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Process Classification</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium">Process Category</label>
                    <select className="w-full px-3 py-2 border rounded-md mt-1">
                      <option>Core Process</option>
                      <option>Support Process</option>
                      <option>Management Process</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Business Domain</label>
                    <select className="w-full px-3 py-2 border rounded-md mt-1">
                      <option>Sales</option>
                      <option>Finance</option>
                      <option>Operations</option>
                      <option>Human Resources</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Risk Level</label>
                    <select className="w-full px-3 py-2 border rounded-md mt-1">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="repository" className="mt-0">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Process Repository</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">Browse and manage process templates in the repository.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-4 hover:bg-muted/20 cursor-pointer">
                  <h4 className="font-medium">Order Processing Template</h4>
                  <p className="text-xs text-muted-foreground mt-1">Standard order processing flow with approvals</p>
                </div>
                <div className="border rounded-md p-4 hover:bg-muted/20 cursor-pointer">
                  <h4 className="font-medium">Invoice Approval Template</h4>
                  <p className="text-xs text-muted-foreground mt-1">Multi-level invoice approval process</p>
                </div>
                <div className="border rounded-md p-4 hover:bg-muted/20 cursor-pointer">
                  <h4 className="font-medium">Customer Onboarding Template</h4>
                  <p className="text-xs text-muted-foreground mt-1">Customer registration and verification process</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Recently Used Templates</h4>
                <div className="border rounded-md divide-y">
                  <div className="p-3 flex justify-between items-center">
                    <div>
                      <h5 className="font-medium">Procurement Process</h5>
                      <p className="text-xs text-muted-foreground">Last used: Yesterday</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline">Use</button>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div>
                      <h5 className="font-medium">HR Onboarding</h5>
                      <p className="text-xs text-muted-foreground">Last used: 3 days ago</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline">Use</button>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div>
                      <h5 className="font-medium">Claims Processing</h5>
                      <p className="text-xs text-muted-foreground">Last used: 1 week ago</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline">Use</button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
