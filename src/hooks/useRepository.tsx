import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { RepositoryItemType } from "@/types/repository";

// Sample repository data - updated to match RepositoryItemType interface
const initialRepositoryItems: RepositoryItemType[] = [
  { 
    id: "1",
    name: "Customer Onboarding Process", 
    type: "process", 
    description: "Comprehensive customer onboarding workflow including verification and setup steps",
    owner: "Sarah Chen", 
    lastModified: "2024-01-20",
    category: "Customer Management",
    tags: ["onboarding", "customer", "workflow"],
    version: "2.1",
    status: "active",
    size: "2.3 MB"
  },
  { 
    id: "2",
    name: "Invoice Processing Model", 
    type: "model", 
    description: "Automated invoice processing model with validation and approval workflows",
    owner: "Mike Rodriguez", 
    lastModified: "2024-01-18",
    category: "Finance",
    tags: ["finance", "automation", "approval"],
    version: "3.1",
    status: "active",
    size: "1.8 MB"
  },
  { 
    id: "3",
    name: "Employee Onboarding Template", 
    type: "template", 
    description: "Standard template for new employee onboarding processes",
    owner: "Lisa Wang", 
    lastModified: "2024-01-15",
    category: "HR",
    tags: ["hr", "template", "onboarding"],
    version: "1.0",
    status: "draft",
    size: "0.8 MB"
  },
  { 
    id: "4",
    name: "Order to Cash Framework", 
    type: "framework", 
    description: "Complete order-to-cash process framework with best practices",
    owner: "John Doe", 
    lastModified: "2024-01-22",
    category: "Sales",
    tags: ["sales", "framework", "order-management"],
    version: "2.3",
    status: "active",
    size: "3.2 MB"
  },
  { 
    id: "5",
    name: "Procurement Process", 
    type: "process", 
    description: "End-to-end procurement process including vendor management",
    owner: "Michael Chen", 
    lastModified: "2024-01-10",
    category: "Procurement",
    tags: ["procurement", "vendor", "approval"],
    version: "1.5",
    status: "archived",
    size: "2.1 MB"
  },
  { 
    id: "6",
    name: "Risk Assessment Document", 
    type: "document", 
    description: "Comprehensive risk assessment documentation and guidelines",
    owner: "Jennifer Adams", 
    lastModified: "2024-01-12",
    category: "Compliance",
    tags: ["risk", "compliance", "documentation"],
    version: "1.0",
    status: "active",
    size: "1.2 MB"
  }
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
        const fileType = file.name.endsWith('.bpmn') ? 'process' : 
                        file.name.endsWith('.dmn') ? 'model' : 'document';
        
        const newItem: RepositoryItemType = {
          id: Date.now().toString(),
          name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
          type: fileType,
          description: `Uploaded ${fileType} file`,
          owner: "Current User",
          lastModified: new Date().toISOString().split('T')[0],
          category: "Uploads",
          tags: ["uploaded", fileType],
          version: "1.0", 
          status: "draft",
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
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
      "new-bpmn": "process",
      "new-journey": "process",
      "new-dmn": "model",
      "new-folder": "template",
    } as const;
    
    if (dialogState.type) {
      const type = typeMap[dialogState.type] as RepositoryItemType['type'];
      const newItem: RepositoryItemType = {
        id: Date.now().toString(),
        name,
        type,
        description: `New ${type} created`,
        owner: "Current User",
        lastModified: new Date().toISOString().split('T')[0],
        category: "New Items",
        tags: ["new", type],
        version: "1.0", 
        status: "draft",
        size: "0.1 MB"
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
