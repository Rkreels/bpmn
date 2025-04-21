
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BpmnEditor } from "./BpmnEditor";
import { Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProcessContent: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Order to Cash Process (Draft)</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
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
