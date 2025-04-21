
import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  CopyPlus,
  Download,
  Folder,
  Grid2X2,
  List,
  Plus,
  Save,
  Search,
  Share2,
  Undo2,
  Upload,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { BpmnEditor } from "@/components/process-manager/BpmnEditor";
import { ProcessModelItem } from "@/components/process-manager/ProcessModelItem";

export interface ProcessModel {
  name: string;
  type: "folder" | "bpmn" | "dmn";
  lastModified: string;
  owner: string;
  version?: string;
}

const processModels: ProcessModel[] = [
  { name: "Order Management", type: "folder", lastModified: "2 days ago", owner: "System Admin" },
  { name: "Customer Processes", type: "folder", lastModified: "1 week ago", owner: "System Admin" },
  { name: "Order to Cash", type: "bpmn", lastModified: "Yesterday", owner: "John Doe", version: "2.3" },
  { name: "Quote to Order", type: "bpmn", lastModified: "3 days ago", owner: "Lisa Johnson", version: "1.0" },
  { name: "Invoice Processing", type: "bpmn", lastModified: "1 week ago", owner: "Michael Chen", version: "3.1" },
  { name: "Shipping Rules", type: "dmn", lastModified: "2 weeks ago", owner: "Sarah Miller", version: "1.2" },
  { name: "Return Process", type: "bpmn", lastModified: "1 month ago", owner: "Robert Taylor", version: "2.0" },
  { name: "Pricing Rules", type: "dmn", lastModified: "1 month ago", owner: "Jennifer Adams", version: "2.5" },
];

export default function ProcessManager() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <MainLayout pageTitle="Process Manager">
      <Tabs defaultValue="editor" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="repository">Repository</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Undo2 className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  Create
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Plus className="h-4 w-4 mr-2" /> New Process
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CopyPlus className="h-4 w-4 mr-2" /> From Template
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Upload className="h-4 w-4 mr-2" /> Import BPMN
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="editor" className="mt-0">
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
        </TabsContent>
        
        <TabsContent value="properties" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <BpmnEditor />
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Element Properties</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">ID</label>
                        <Input value="Task_0m7k8x9" readOnly className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input value="Review Order" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Type</label>
                        <Input value="User Task" className="mt-1" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-md font-medium mb-4">Documentation</h3>
                    <textarea
                      className="w-full min-h-[120px] border rounded-md p-3"
                      placeholder="Add documentation here..."
                    />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-md font-medium mb-4">Attachments</h3>
                    <Button variant="outline" className="w-full gap-2">
                      <Plus className="h-4 w-4" />
                      Add Attachment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="repository" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search processes..."
                    className="pl-8"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Folder className="h-4 w-4" />
                    New Folder
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                    {viewMode === "grid" ? (
                      <List className="h-4 w-4" />
                    ) : (
                      <Grid2X2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-muted-foreground">
                  Path: / Main Repository / Sales Processes
                </div>
              </div>
              
              <div className={cn(
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
                  : "flex flex-col gap-2"
              )}>
                {processModels.map((model, index) => (
                  <ProcessModelItem 
                    key={index} 
                    model={model} 
                    viewMode={viewMode} 
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
