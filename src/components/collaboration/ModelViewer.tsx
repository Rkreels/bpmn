
import React, { useState } from "react";
import { GitMerge, ZoomIn, ZoomOut, Save, Download, Share2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ModelViewer: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const { toast } = useToast();

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  const handleSave = () => {
    toast({
      title: "Model Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Model Exported",
      description: "The model has been exported successfully.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "A link to share this model has been copied to clipboard.",
    });
  };

  return (
    <div className="border-t border-b h-[300px]">
      <Tabs defaultValue="view" className="w-full h-full">
        <div className="flex flex-col h-full">
          <div className="border-b px-4 py-2 flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="view">View</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 mr-2">
                <Button variant="ghost" size="icon" onClick={handleZoomOut} className="h-7 w-7">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-xs font-medium w-10 text-center">{zoomLevel}%</span>
                <Button variant="ghost" size="icon" onClick={handleZoomIn} className="h-7 w-7">
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="ghost" size="sm" onClick={handleSave} className="h-7">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="ghost" size="sm" onClick={handleExport} className="h-7">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare} className="h-7">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="flex-1 bg-muted/50">
            <TabsContent value="view" className="flex-1 flex items-center justify-center h-full m-0 p-0">
              <div 
                className="text-muted-foreground flex flex-col items-center"
                style={{ 
                  transform: `scale(${zoomLevel/100})`,
                  transition: "transform 0.2s ease-out" 
                }}
              >
                <GitMerge className="h-10 w-10 mb-2 opacity-70" />
                <p>[Process Model Viewer]</p>
                <p className="text-xs mt-2">Click Edit to make changes to this model</p>
              </div>
            </TabsContent>
            
            <TabsContent value="edit" className="flex-1 flex items-center justify-center h-full m-0 p-0">
              <div className="text-muted-foreground flex flex-col items-center w-full h-full">
                <div className="border-b w-full p-2 bg-white">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Task</Button>
                    <Button variant="outline" size="sm">Gateway</Button>
                    <Button variant="outline" size="sm">Event</Button>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
                <div className="flex items-center justify-center flex-1 w-full">
                  <GitMerge className="h-10 w-10 mb-2 opacity-70" />
                  <p className="ml-2">[Process Model Editor]</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="comments" className="flex-1 flex items-center justify-center h-full m-0 p-0 overflow-auto">
              <div className="text-muted-foreground flex flex-col items-center p-4 w-full">
                <GitMerge className="h-10 w-10 mb-2 opacity-70" />
                <p>[Process Model Comments]</p>
                <div className="w-full max-w-lg mt-4 border rounded-md p-4 bg-white text-left">
                  <p className="text-sm font-medium">No comments yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Be the first to add a comment to this model</p>
                  <div className="mt-4">
                    <Button size="sm">Add Comment</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
