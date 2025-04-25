
import { useState, useRef } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRight,
  Download,
  FileText,
  Folder,
  GitMerge,
  Grid2X2,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share2,
  SortAsc,
  Upload,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RepositoryItemType } from "@/types/repository";
import { RepositoryItemComponent } from "@/components/repository/RepositoryItemComponent";
import { RepositoryDialog } from "@/components/repository/RepositoryDialog";
import { RepositoryItemDetails } from "@/components/repository/RepositoryItemDetails";

// Sample repository data
const repositoryItems: RepositoryItemType[] = [
  { name: "Customer Processes", type: "folder", owner: "John Doe", lastModified: "Yesterday" },
  { name: "Finance", type: "folder", owner: "System Admin", lastModified: "1 week ago" },
  { name: "HR Processes", type: "folder", owner: "Sarah Miller", lastModified: "2 days ago" },
  { name: "Order to Cash", type: "bpmn", owner: "John Doe", lastModified: "Today", version: "2.3", status: "Published" },
  { name: "Customer Onboarding", type: "journey", owner: "Lisa Johnson", lastModified: "Yesterday", version: "1.0", status: "In Review" },
  { name: "Procurement", type: "bpmn", owner: "Michael Chen", lastModified: "3 days ago", version: "3.1", status: "Draft" },
  { name: "Shipping Rules", type: "dmn", owner: "Robert Taylor", lastModified: "Last week", version: "1.2", status: "Approved" },
  { name: "Return Process", type: "bpmn", owner: "Jennifer Adams", lastModified: "2 weeks ago", version: "2.0", status: "Published" },
  { name: "Process Documentation", type: "document", owner: "Sarah Miller", lastModified: "1 month ago" },
];

export default function Repository() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"name" | "modified" | "type">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedItem, setSelectedItem] = useState<RepositoryItemType | null>(null);
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    type: "new-bpmn" | "new-journey" | "new-dmn" | "new-folder" | "upload" | "rename" | "settings" | null;
  }>({
    open: false,
    type: null,
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { speakText } = useVoice();
  
  // Dialog control
  const openDialog = (type: typeof dialogState.type) => {
    setDialogState({ open: true, type });
  };
  
  const closeDialog = () => {
    setDialogState({ open: false, type: null });
  };
  
  // Item actions
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    speakText(`Searching for ${value}`);
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Upload Started",
        description: `Uploading ${file.name}...`,
      });
      speakText(`Uploading file ${file.name}`);
      
      // Simulate successful upload
      setTimeout(() => {
        toast({
          title: "File Upload Complete",
          description: `${file.name} has been uploaded successfully.`,
        });
        speakText(`File ${file.name} has been uploaded successfully.`);
      }, 1500);
    }
  };

  const handleNewItem = (type: string) => {
    switch (type) {
      case "BPMN Process":
        openDialog("new-bpmn");
        break;
      case "Journey Map":
        openDialog("new-journey");
        break;
      case "Decision Model":
        openDialog("new-dmn");
        break;
      case "Folder":
        openDialog("new-folder");
        break;
      default:
        break;
    }
  };

  const handleCreateItem = (name: string) => {
    if (!name) return;
    
    const typeMap = {
      "new-bpmn": "bpmn",
      "new-journey": "journey",
      "new-dmn": "dmn",
      "new-folder": "folder",
    } as const;
    
    const type = dialogState.type ? typeMap[dialogState.type] : "folder";
    const newItem: RepositoryItemType = {
      name,
      type,
      owner: "Current User",
      lastModified: "Just now",
      ...(type !== "folder" ? { version: "1.0", status: "Draft" } : {}),
    };
    
    // In a real app, you would update the state with the new item
    // For demo purposes, we'll just show a toast
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Created`,
      description: `"${name}" has been created successfully.`,
    });
    
    speakText(`${type} ${name} has been created successfully.`);
    closeDialog();
  };

  const handleSort = () => {
    // Toggle sort direction if clicking the same field
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    speakText(`Sorting repository items by ${sortOrder} in ${newDirection}ending order`);
    
    // In a real implementation, you would update the sorting logic
    toast({
      title: "Sorting Updated",
      description: `Items sorted by ${sortOrder} in ${newDirection}ending order.`,
    });
  };

  const handleSettingsClick = () => {
    openDialog("settings");
  };
  
  const handleViewItem = (item: RepositoryItemType) => {
    setSelectedItem(item);
    speakText(`Viewing ${item.name}`);
  };
  
  const handleEditItem = (item: RepositoryItemType) => {
    toast({
      title: "Editing Item",
      description: `Opening editor for "${item.name}"...`,
    });
    speakText(`Opening editor for ${item.name}`);
  };
  
  const handleRenameItem = (item: RepositoryItemType) => {
    setSelectedItem(item);
    openDialog("rename");
  };
  
  const handleShareItem = (item: RepositoryItemType) => {
    toast({
      title: "Share Link Generated",
      description: `A link to share "${item.name}" has been copied to clipboard.`,
    });
    speakText(`A shareable link for ${item.name} has been copied to your clipboard.`);
  };
  
  const handleDownloadItem = (item: RepositoryItemType) => {
    toast({
      title: "Download Started",
      description: `Downloading "${item.name}"...`,
    });
    speakText(`Downloading ${item.name}`);
    
    // Simulate download completion
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `"${item.name}" has been downloaded.`,
      });
    }, 1500);
  };
  
  const handleRenameAction = (newName: string) => {
    if (!selectedItem || !newName) return;
    
    toast({
      title: "Item Renamed",
      description: `"${selectedItem.name}" has been renamed to "${newName}".`,
    });
    
    speakText(`${selectedItem.name} has been renamed to ${newName}.`);
    closeDialog();
  };
  
  const handleSettingsAction = () => {
    toast({
      title: "Settings Updated",
      description: "Repository settings have been updated.",
    });
    speakText("Repository settings have been updated");
    closeDialog();
  };

  // Filter and sort items
  const filteredItems = repositoryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout pageTitle="Repository">
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle 
              onMouseEnter={() => speakText("Process Repository - Access centralized process documentation")}
            >
              Process Repository
            </CardTitle>
            <Breadcrumb className="mt-1">
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="#" 
                  onClick={() => speakText("Navigating to Main Repository")}
                  onMouseEnter={() => speakText("Navigate to the main repository view")}
                >
                  Main Repository
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="#" 
                  onClick={() => speakText("Order Management section")}
                  onMouseEnter={() => speakText("Navigate to the Order Management section")}
                >
                  Order Management
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onMouseEnter={() => speakText("Create new item menu")}
                >
                  <Plus className="h-4 w-4" />
                  New
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => handleNewItem("BPMN Process")}
                  onMouseEnter={() => speakText("Create new BPMN process")}
                >
                  <GitMerge className="h-4 w-4 mr-2" />
                  <span>BPMN Process</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => handleNewItem("Journey Map")}
                  onMouseEnter={() => speakText("Create new journey map")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  <span>Journey Map</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => handleNewItem("Decision Model")}
                  onMouseEnter={() => speakText("Create new decision model")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Decision Model</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => handleNewItem("Folder")}
                  onMouseEnter={() => speakText("Create new folder")}
                >
                  <Folder className="h-4 w-4 mr-2" />
                  <span>New Folder</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={handleUpload}
                  onMouseEnter={() => speakText("Import file")}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  <span>Import File</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleUpload}
              onMouseEnter={() => speakText("Upload files")}
            >
              <Upload className="h-4 w-4" />
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleSettingsClick}
              onMouseEnter={() => speakText("Repository settings")}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search repository..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => speakText("Enter search terms to find repository items")}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={handleSort}
                onMouseEnter={() => speakText("Sort repository items")}
              >
                <SortAsc className="h-4 w-4" />
                Sort
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setViewMode("grid")}
                className={cn(
                  "h-8 w-8",
                  viewMode === "grid" ? "bg-muted" : ""
                )}
                onMouseEnter={() => speakText("Switch to grid view")}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setViewMode("list")}
                className={cn(
                  "h-8 w-8",
                  viewMode === "list" ? "bg-muted" : ""
                )}
                onMouseEnter={() => speakText("Switch to list view")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className={cn(
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
              : "flex flex-col gap-1"
          )}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <RepositoryItemComponent
                  key={index}
                  item={item}
                  viewMode={viewMode}
                  onClick={handleViewItem}
                  onEdit={handleEditItem}
                  onRename={handleRenameItem}
                  onShare={handleShareItem}
                  onDownload={handleDownloadItem}
                />
              ))
            ) : (
              <div className="col-span-full py-8 text-center">
                <p className="text-muted-foreground">No items found matching your search.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Dialogs */}
      <RepositoryDialog
        open={dialogState.open && dialogState.type === "new-bpmn"}
        title="Create New BPMN Process"
        description="Create a new business process model and notation diagram."
        actionLabel="Create"
        showInput={true}
        inputLabel="Process Name"
        inputPlaceholder="Enter process name..."
        onClose={closeDialog}
        onAction={handleCreateItem}
      />
      
      <RepositoryDialog
        open={dialogState.open && dialogState.type === "new-journey"}
        title="Create New Journey Map"
        description="Create a new customer journey map."
        actionLabel="Create"
        showInput={true}
        inputLabel="Journey Name"
        inputPlaceholder="Enter journey name..."
        onClose={closeDialog}
        onAction={handleCreateItem}
      />
      
      <RepositoryDialog
        open={dialogState.open && dialogState.type === "new-dmn"}
        title="Create New Decision Model"
        description="Create a new decision model and notation diagram."
        actionLabel="Create"
        showInput={true}
        inputLabel="Decision Model Name"
        inputPlaceholder="Enter decision model name..."
        onClose={closeDialog}
        onAction={handleCreateItem}
      />
      
      <RepositoryDialog
        open={dialogState.open && dialogState.type === "new-folder"}
        title="Create New Folder"
        description="Create a new folder to organize your process artifacts."
        actionLabel="Create"
        showInput={true}
        inputLabel="Folder Name"
        inputPlaceholder="Enter folder name..."
        onClose={closeDialog}
        onAction={handleCreateItem}
      />
      
      <RepositoryDialog
        open={dialogState.open && dialogState.type === "rename"}
        title="Rename Item"
        description={`Rename ${selectedItem?.name || "item"}.`}
        actionLabel="Rename"
        showInput={true}
        inputLabel="New Name"
        inputPlaceholder="Enter new name..."
        onClose={closeDialog}
        onAction={handleRenameAction}
      />
      
      <RepositoryDialog
        open={dialogState.open && dialogState.type === "settings"}
        title="Repository Settings"
        description="Configure repository settings and permissions."
        actionLabel="Save"
        onClose={closeDialog}
        onAction={handleSettingsAction}
      />
      
      {selectedItem && (
        <RepositoryItemDetails
          open={!!selectedItem}
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onEdit={() => handleEditItem(selectedItem)}
          onShare={() => handleShareItem(selectedItem)}
          onDownload={() => handleDownloadItem(selectedItem)}
        />
      )}
    </MainLayout>
  );
}
