
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { EditorToolbar } from "@/components/process-manager/EditorToolbar";
import { EditorTabView } from "@/components/process-manager/EditorTabView";
import { ProcessContent } from "@/components/process-manager/ProcessContent";
import { 
  Save, 
  Download, 
  Share2, 
  Play, 
  FileText,
  Settings,
  Users,
  Activity,
  Clock,
  CheckCircle
} from "lucide-react";

export default function ProcessManager() {
  const [activeTab, setActiveTab] = useState("editor");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(true);
  const [processName, setProcessName] = useState("Order to Cash Process");
  const [processOwner, setProcessOwner] = useState("John Doe");
  const [isSimulating, setIsSimulating] = useState(false);
  const { toast } = useToast();
  const { speakText } = useVoice();
  
  // Sample process metrics
  const processMetrics = [
    { label: "Process Steps", value: "12", icon: Activity, color: "text-blue-600" },
    { label: "Avg. Duration", value: "4.2 days", icon: Clock, color: "text-green-600" },
    { label: "Completion Rate", value: "94%", icon: CheckCircle, color: "text-emerald-600" },
    { label: "Active Instances", value: "156", icon: Users, color: "text-purple-600" }
  ];

  // Auto-save functionality
  useEffect(() => {
    if (!isAutoSaveEnabled) return;
    
    const autoSaveInterval = setInterval(() => {
      handleAutoSave();
    }, 120000); // Auto-save every 2 minutes
    
    return () => clearInterval(autoSaveInterval);
  }, [isAutoSaveEnabled]);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const tabNames = {
      editor: "Process Editor",
      properties: "Process Properties",
      repository: "Process Repository"
    };
    speakText(`Switched to ${tabNames[tab as keyof typeof tabNames]}`);
  };
  
  const handleAutoSave = () => {
    if (!isAutoSaveEnabled) return;
    
    setLastSaved(new Date());
    toast({
      title: "Process Auto-saved",
      description: `Your process model was automatically saved at ${new Date().toLocaleTimeString()}.`,
      variant: "default"
    });
  };

  const handleManualSave = () => {
    setLastSaved(new Date());
    toast({
      title: "Process Saved",
      description: "Your process model has been saved successfully.",
    });
    speakText("Process model saved successfully");
  };

  const handleSimulation = () => {
    setIsSimulating(true);
    toast({
      title: "Starting Simulation",
      description: "Process simulation is starting..."
    });
    speakText("Starting process simulation to analyze performance and identify bottlenecks");
    
    setTimeout(() => {
      setIsSimulating(false);
      toast({
        title: "Simulation Complete",
        description: "Process simulation completed successfully"
      });
    }, 3000);
  };

  const handleExport = () => {
    toast({
      title: "Exporting Process",
      description: "Process model is being exported..."
    });
    speakText("Exporting process model in BPMN format");
  };

  return (
    <MainLayout pageTitle="Process Manager">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Process Manager</h1>
            <p className="text-muted-foreground">Design and optimize business processes</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={handleExport} className="hover-scale">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="hover-scale">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSimulation}
              disabled={isSimulating}
              className="hover-scale"
            >
              <Play className="h-4 w-4 mr-2" />
              {isSimulating ? "Simulating..." : "Simulate"}
            </Button>
            <Button onClick={handleManualSave} className="hover-scale">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Process Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow hover-scale">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`h-5 w-5 ${metric.color}`} />
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-xl font-bold">{metric.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <EditorTabView activeTab={activeTab} onTabChange={handleTabChange} />
            <div className="flex items-center gap-4">
              {lastSaved && (
                <span className="text-xs text-muted-foreground">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              )}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="autosave"
                  checked={isAutoSaveEnabled}
                  onChange={(e) => setIsAutoSaveEnabled(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="autosave" className="text-xs text-muted-foreground">
                  Auto-save
                </label>
              </div>
              <EditorToolbar />
            </div>
          </div>

          <TabsContent value="editor" className="mt-0">
            <ProcessContent />
          </TabsContent>
          
          <TabsContent value="properties" className="mt-0">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Process Properties</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Basic Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Process ID</label>
                      <Input 
                        type="text" 
                        className="mt-1" 
                        defaultValue="PROC-2023-001" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Process Name</label>
                      <Input 
                        type="text" 
                        className="mt-1" 
                        value={processName}
                        onChange={(e) => setProcessName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Process Owner</label>
                      <Input 
                        type="text" 
                        className="mt-1" 
                        value={processOwner}
                        onChange={(e) => setProcessOwner(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea 
                        className="mt-1" 
                        placeholder="Describe this process..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Process Classification</h4>
                  <div className="space-y-3">
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
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <div className="mt-2">
                        <Badge variant="outline">Active</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <Button onClick={handleManualSave} className="hover-scale">
                  <Save className="h-4 w-4 mr-2" />
                  Save Properties
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="repository" className="mt-0">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Process Repository</h3>
              <div className="space-y-4">
                <p className="text-muted-foreground">Browse and manage process templates in the repository.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Order Processing Template", desc: "Standard order processing flow with approvals", status: "active" },
                    { name: "Invoice Approval Template", desc: "Multi-level invoice approval process", status: "draft" },
                    { name: "Customer Onboarding Template", desc: "Customer registration and verification process", status: "active" },
                    { name: "HR Recruitment Process", desc: "End-to-end recruitment workflow", status: "active" },
                    { name: "Expense Approval Process", desc: "Employee expense approval workflow", status: "review" },
                    { name: "Project Initiation Template", desc: "Standard project startup process", status: "active" }
                  ].map((template, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer hover-scale">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{template.name}</h4>
                          <Badge 
                            variant={template.status === "active" ? "default" : template.status === "draft" ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {template.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{template.desc}</p>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="text-xs">
                            Use
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            Preview
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Recently Used Templates</h4>
                  <div className="border rounded-md divide-y">
                    {[
                      { name: "Procurement Process", lastUsed: "Yesterday", category: "Operations" },
                      { name: "HR Onboarding", lastUsed: "3 days ago", category: "Human Resources" },
                      { name: "Claims Processing", lastUsed: "1 week ago", category: "Insurance" }
                    ].map((template, index) => (
                      <div key={index} className="p-3 flex justify-between items-center hover:bg-muted/50">
                        <div>
                          <h5 className="font-medium">{template.name}</h5>
                          <p className="text-xs text-muted-foreground">
                            {template.category} • Last used: {template.lastUsed}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" className="hover-scale">
                          Use
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
