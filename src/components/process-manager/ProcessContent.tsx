
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BpmnEditor } from "./BpmnEditor";
import { Share2, Download, Save, Upload, FileJson, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ProcessContent: React.FC = () => {
  const { toast } = useToast();

  const handleSaveProcess = () => {
    toast({
      title: "Process Saved",
      description: "Order to Cash process has been saved successfully.",
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
      description: `Order to Cash process has been exported as ${format}.`,
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Order to Cash Process (Draft)</h2>
            <p className="text-sm text-muted-foreground">Last edited: Today at 10:45 AM • Version 1.3</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={handleSaveProcess}>
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={handleShareProcess}>
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => handleExportProcess('BPMN')}>
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
        
        <BpmnEditor />
      </CardContent>
    </Card>
  );
};
