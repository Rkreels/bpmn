
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BpmnEditor } from "./BpmnEditor";
import { 
  Share2, Download, Save, Upload, FileJson, FileCode, 
  History, Users, Database, FileSearch, Settings,
  Shield, Link
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProcessVersionHistory } from "./ProcessVersionHistory";
import { ProcessCollaborators } from "./ProcessCollaborators";
import { ProcessAttributes } from "./ProcessAttributes";
import { ProcessIntegrations } from "./ProcessIntegrations";
import { ProcessGovernance } from "./ProcessGovernance";

export const ProcessContent: React.FC = () => {
  const { toast } = useToast();
  const [activeProcessTab, setActiveProcessTab] = useState("editor");
  const [processName, setProcessName] = useState("Order to Cash Process");
  const [processStatus, setProcessStatus] = useState("Draft");

  const handleSaveProcess = () => {
    toast({
      title: "Process Saved",
      description: `${processName} has been saved successfully.`,
    });
  };

  const handleShareProcess = () => {
    toast({
      title: "Share Link Generated",
      description: "Process sharing link has been copied to clipboard.",
    });
  };

  const handleExportProcess = (format: string) => {
    toast({
      title: "Process Exported",
      description: `${processName} has been exported as ${format}.`,
    });
  };

  const handleImportProcess = () => {
    toast({
      title: "Import Process",
      description: "Select a file to import a process model.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">{processName} ({processStatus})</h2>
            <p className="text-sm text-muted-foreground">Last edited: Today at 10:45 AM • Version 1.3</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={handleImportProcess}>
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={handleSaveProcess}>
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={handleShareProcess}>
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => handleExportProcess('BPMN')}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="bg-muted/50 p-3 rounded-md mb-4 overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-3">
            <span className="font-medium text-sm">Tools:</span>
            <Button variant="ghost" size="sm">Select</Button>
            <Button variant="ghost" size="sm">Hand</Button>
            <Button variant="ghost" size="sm">Task</Button>
            <Button variant="ghost" size="sm">Gateway</Button>
            <Button variant="ghost" size="sm">Event</Button>
            <Button variant="ghost" size="sm">Subprocess</Button>
            <Button variant="ghost" size="sm">Data Object</Button>
            <Button variant="ghost" size="sm">Pool/Lane</Button>
            <Button variant="ghost" size="sm">Connector</Button>
          </div>
        </div>
        
        <Tabs value={activeProcessTab} onValueChange={setActiveProcessTab} className="mt-4">
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" /> 
              Version History
            </TabsTrigger>
            <TabsTrigger value="collaborators">
              <Users className="h-4 w-4 mr-2" /> 
              Collaborators
            </TabsTrigger>
            <TabsTrigger value="attributes">
              <Database className="h-4 w-4 mr-2" /> 
              Attributes
            </TabsTrigger>
            <TabsTrigger value="integrations">
              <Link className="h-4 w-4 mr-2" /> 
              Integrations
            </TabsTrigger>
            <TabsTrigger value="governance">
              <Shield className="h-4 w-4 mr-2" /> 
              Governance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor">
            <BpmnEditor />
          </TabsContent>
          
          <TabsContent value="history">
            <ProcessVersionHistory />
          </TabsContent>
          
          <TabsContent value="collaborators">
            <ProcessCollaborators />
          </TabsContent>
          
          <TabsContent value="attributes">
            <ProcessAttributes />
          </TabsContent>
          
          <TabsContent value="integrations">
            <ProcessIntegrations />
          </TabsContent>
          
          <TabsContent value="governance">
            <ProcessGovernance />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
