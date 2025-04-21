
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const BpmnEditor: React.FC = () => {
  return (
    <Tabs defaultValue="editor" className="w-full h-full min-h-[600px]">
      <div className="bg-white border rounded-md flex flex-col h-full">
        <div className="border-b p-2">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="xml">XML</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="editor" className="flex-1 flex items-center justify-center p-4">
          <p className="text-muted-foreground">[BPMN Editor Canvas - Would integrate with actual BPMN.js library]</p>
        </TabsContent>
        
        <TabsContent value="preview" className="flex-1 flex items-center justify-center p-4">
          <p className="text-muted-foreground">[BPMN Preview Mode]</p>
        </TabsContent>
        
        <TabsContent value="xml" className="flex-1 flex items-center justify-center p-4">
          <p className="text-muted-foreground">[BPMN XML Source View]</p>
        </TabsContent>
      </div>
    </Tabs>
  );
};
