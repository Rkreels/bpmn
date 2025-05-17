
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { RepositoryItemType } from "@/types/repository";

// Sample repository data
const initialRepositoryItems: RepositoryItemType[] = [
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

export function useRepository() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"name" | "modified" | "type">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedItem, setSelectedItem] = useState<RepositoryItemType | null>(null);
  const [repositoryItems, setRepositoryItems] = useState<RepositoryItemType[]>(initialRepositoryItems);
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
        
        // Add the uploaded file to the repository
        const fileType = file.name.endsWith('.bpmn') ? 'bpmn' : 
                        file.name.endsWith('.dmn') ? 'dmn' : 'document';
        
        const newItem: RepositoryItemType = {
          name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
          type: fileType,
          owner: "Current User",
          lastModified: "Just now",
          ...(fileType !== 'document' ? { version: "1.0", status: "Draft" } : {})
        };
        
        setRepositoryItems(prev => [newItem, ...prev]);
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
    
    if (dialogState.type) {
      const type = typeMap[dialogState.type];
      const newItem: RepositoryItemType = {
        name,
        type,
        owner: "Current User",
        lastModified: "Just now",
        ...(type !== 'folder' ? { version: "1.0", status: "Draft" } : {}),
      };
      
      setRepositoryItems(prev => [newItem, ...prev]);
      
      toast({
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Created`,
        description: `"${name}" has been created successfully.`,
      });
      
      speakText(`${type} ${name} has been created successfully.`);
    }
    
    closeDialog();
  };

  const handleSort = () => {
    // Toggle sort direction if clicking the same field
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    speakText(`Sorting repository items by ${sortOrder} in ${newDirection}ending order`);
    
    // Perform actual sorting
    const sortedItems = [...repositoryItems].sort((a, b) => {
      let comparison = 0;
      
      if (sortOrder === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortOrder === "modified") {
        comparison = a.lastModified.localeCompare(b.lastModified);
      } else if (sortOrder === "type") {
        comparison = a.type.localeCompare(b.type);
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
    
    setRepositoryItems(sortedItems);
    
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
    speakText(`Viewing details for ${item.name}, created by ${item.owner} and last modified ${item.lastModified}.`);
  };
  
  const handleEditItem = (item: RepositoryItemType) => {
    toast({
      title: "Editing Item",
      description: `Opening editor for "${item.name}"...`,
    });
    speakText(`Opening editor for ${item.name}. The editor provides tools to update and improve your process documentation to reflect the current state of your business processes.`);
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
    speakText(`A shareable link for ${item.name} has been copied to your clipboard. Sharing process documentation ensures all stakeholders have access to the latest process information, promoting alignment across the organization.`);
  };
  
  const handleDownloadItem = (item: RepositoryItemType) => {
    toast({
      title: "Download Started",
      description: `Downloading "${item.name}"...`,
    });
    speakText(`Downloading ${item.name}. Downloaded process artifacts can be used offline or imported into other systems, ensuring process knowledge is available when and where it's needed.`);
    
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
    
    // Update the item name in the repository
    const updatedItems = repositoryItems.map(item => 
      item === selectedItem ? { ...item, name: newName } : item
    );
    setRepositoryItems(updatedItems);
    
    toast({
      title: "Item Renamed",
      description: `"${selectedItem.name}" has been renamed to "${newName}".`,
    });
    
    speakText(`${selectedItem.name} has been renamed to ${newName}. Clear naming conventions improve searchability and understanding of your process repository.`);
    closeDialog();
  };
  
  const handleSettingsAction = () => {
    toast({
      title: "Settings Updated",
      description: "Repository settings have been updated.",
    });
    speakText("Repository settings have been updated. Proper configuration ensures secure and efficient process management.");
    closeDialog();
  };

  // Filter items based on search term
  const filteredItems = repositoryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    viewMode,
    setViewMode,
    searchTerm,
    filteredItems,
    selectedItem,
    setSelectedItem,
    dialogState,
    fileInputRef,
    handleSearch,
    handleUpload,
    handleFileChange,
    handleNewItem,
    handleCreateItem,
    handleSort,
    handleSettingsClick,
    handleViewItem,
    handleEditItem,
    handleRenameItem,
    handleShareItem,
    handleDownloadItem,
    handleRenameAction,
    handleSettingsAction,
    openDialog,
    closeDialog
  };
}
