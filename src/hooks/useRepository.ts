
import { useState, useEffect } from "react";
import { RepositoryItemType } from "@/types/repository";
import { useToast } from "@/hooks/use-toast";

export const useRepository = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [items, setItems] = useState<RepositoryItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<RepositoryItemType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  // Mock data for repository items
  useEffect(() => {
    const mockItems: RepositoryItemType[] = [
      {
        id: "1",
        name: "Customer Onboarding Process",
        type: "process",
        description: "End-to-end customer onboarding workflow",
        owner: "Sarah Chen",
        lastModified: "2024-01-15T10:30:00Z",
        category: "operations",
        tags: ["onboarding", "customer", "workflow"],
        version: "2.1",
        status: "active",
        size: "2.3 MB"
      },
      {
        id: "2",
        name: "Invoice Processing Model",
        type: "model",
        description: "Automated invoice processing and approval model",
        owner: "Mike Rodriguez",
        lastModified: "2024-01-14T15:45:00Z",
        category: "finance",
        tags: ["invoice", "automation", "approval"],
        version: "1.5",
        status: "active",
        size: "1.8 MB"
      },
      {
        id: "3",
        name: "Employee Onboarding Template",
        type: "template",
        description: "Standard template for employee onboarding processes",
        owner: "Lisa Wang",
        lastModified: "2024-01-13T09:20:00Z",
        category: "hr",
        tags: ["employee", "onboarding", "template"],
        version: "3.0",
        status: "active",
        size: "0.9 MB"
      },
      {
        id: "4",
        name: "Risk Assessment Framework",
        type: "framework",
        description: "Comprehensive risk assessment and mitigation framework",
        owner: "David Park",
        lastModified: "2024-01-12T14:10:00Z",
        category: "compliance",
        tags: ["risk", "assessment", "compliance"],
        version: "1.2",
        status: "draft",
        size: "3.1 MB"
      }
    ];
    
    setItems(mockItems);
    setFilteredItems(mockItems);
  }, []);

  // Filter items based on search and category
  useEffect(() => {
    let filtered = items;
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setFilteredItems(filtered);
  }, [items, searchTerm, selectedCategory]);

  const handleViewItem = (item: RepositoryItemType) => {
    toast({
      title: "Viewing Item",
      description: `Opening ${item.name}`,
    });
  };

  const handleEditItem = (item: RepositoryItemType) => {
    toast({
      title: "Editing Item",
      description: `Editing ${item.name}`,
    });
  };

  const handleRenameItem = (item: RepositoryItemType) => {
    const newName = prompt("Enter new name:", item.name);
    if (newName && newName !== item.name) {
      setItems(prev => prev.map(i => 
        i.id === item.id ? { ...i, name: newName } : i
      ));
      toast({
        title: "Item Renamed",
        description: `Renamed to ${newName}`,
      });
    }
  };

  const handleShareItem = (item: RepositoryItemType) => {
    navigator.clipboard.writeText(`Sharing: ${item.name}`);
    toast({
      title: "Item Shared",
      description: `Share link copied to clipboard`,
    });
  };

  const handleDownloadItem = (item: RepositoryItemType) => {
    toast({
      title: "Downloading",
      description: `Downloading ${item.name}`,
    });
  };

  const createItem = (newItem: Omit<RepositoryItemType, "id" | "lastModified">) => {
    const item: RepositoryItemType = {
      ...newItem,
      id: Date.now().toString(),
      lastModified: new Date().toISOString()
    };
    setItems(prev => [...prev, item]);
    toast({
      title: "Item Created",
      description: `Created ${item.name}`,
    });
  };

  const updateItem = (id: string, updates: Partial<RepositoryItemType>) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, ...updates, lastModified: new Date().toISOString() } : item
    ));
    toast({
      title: "Item Updated",
      description: "Item has been updated successfully",
    });
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item Deleted",
      description: "Item has been deleted successfully",
    });
  };

  return {
    items,
    filteredItems,
    viewMode,
    setViewMode,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    handleViewItem,
    handleEditItem,
    handleRenameItem,
    handleShareItem,
    handleDownloadItem,
    createItem,
    updateItem,
    deleteItem
  };
};
