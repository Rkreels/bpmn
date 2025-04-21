
import React from "react";
import { GitMerge } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ModelViewer: React.FC = () => {
  return (
    <div className="border-t border-b h-[300px]">
      <Tabs defaultValue="view" className="w-full h-full">
        <div className="flex flex-col h-full">
          <div className="border-b px-4 py-2">
            <TabsList>
              <TabsTrigger value="view">View</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 bg-muted/50">
            <TabsContent value="view" className="flex-1 flex items-center justify-center h-full">
              <div className="text-muted-foreground flex flex-col items-center">
                <GitMerge className="h-10 w-10 mb-2 opacity-70" />
                <p>[Process Model Viewer]</p>
              </div>
            </TabsContent>
            
            <TabsContent value="edit" className="flex-1 flex items-center justify-center h-full">
              <div className="text-muted-foreground flex flex-col items-center">
                <GitMerge className="h-10 w-10 mb-2 opacity-70" />
                <p>[Process Model Editor]</p>
              </div>
            </TabsContent>
            
            <TabsContent value="comments" className="flex-1 flex items-center justify-center h-full">
              <div className="text-muted-foreground flex flex-col items-center">
                <GitMerge className="h-10 w-10 mb-2 opacity-70" />
                <p>[Process Model Comments]</p>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
