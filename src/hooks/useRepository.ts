
import { useState, useMemo } from "react";
import { RepositoryItemType } from "@/types/repository";
import { useToast } from "@/hooks/use-toast";

// Mock repository data
const mockRepositoryItems: RepositoryItemType[] = [
  {
    id: "1",
    name: "Customer Onboarding Process",
    type: "process",
    description: "Complete customer onboarding workflow with verification steps",
    owner: "Sarah Johnson",
    lastModified: "2024-01-15T10:30:00Z",
    category: "operations",
    tags: ["onboarding", "customer", "verification"],
    version: "2.1",
    status: "active",
    size: "2.3 MB"
  },
  {
    id: "2",
    name: "Invoice Processing Template",
    type: "template",
    description: "Automated invoice processing with approval workflow",
    owner: "Mike Chen",
    lastModified: "2024-01-14T15:45:00Z",
    category: "finance",
    tags: ["invoice", "automation", "approval"],
    version: "1.5",
    status: "active",
    size: "1.8 MB"
  },
  {
    id: "3",
    name: "HR Recruitment Framework",
    type: "framework",
    description: "End-to-end recruitment process framework",
    owner: "Lisa Wang",
    lastModified: "2024-01-13T09:15:00Z",
    category: "hr",
    tags: ["recruitment", "hiring", "framework"],
    version: "3.0",
    status: "draft",
    size: "3.1 MB"
  },
  {
    id: "4",
    name: "Compliance Audit Model",
    type: "model",
    description: "Regulatory compliance audit process model",
    owner: "David Brown",
    lastModified: "2024-01-12T14:20:00Z",
    category: "compliance",
    tags: ["audit", "compliance", "regulatory"],
    version: "1.2",
    status: "active",
    size: "2.7 MB"
  },
  {
    id: "5",
    name: "Customer Service Handbook",
    type: "document",
    description: "Complete customer service procedures and guidelines",
    owner: "Emma Davis",
    lastModified: "2024-01-11T11:00:00Z",
    category: "customer",
    tags: ["service", "procedures", "guidelines"],
    version: "4.0",
    status: "active",
    size: "5.2 MB"
  }
];

export const useRepository = () => {
  const [items] = useState<RepositoryItemType[]>(mockRepositoryItems);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  const handleViewItem = (item: RepositoryItemType) => {
    toast({
      title: "Opening Item",
      description: `Opening ${item.name} for viewing`
    });
  };

  const handleEditItem = (item: RepositoryItemType) => {
    toast({
      title: "Edit Mode",
      description: `Editing ${item.name}`
    });
  };

  const handleRenameItem = (item: RepositoryItemType) => {
    toast({
      title: "Rename Item",
      description: `Renaming ${item.name}`
    });
  };

  const handleShareItem = (item: RepositoryItemType) => {
    toast({
      title: "Share Link Generated",
      description: `Sharing link for ${item.name} copied to clipboard`
    });
  };

  const handleDownloadItem = (item: RepositoryItemType) => {
    toast({
      title: "Download Started",
      description: `Downloading ${item.name} (${item.size})`
    });
  };

  const deleteItem = (id: string) => {
    const item = items.find(i => i.id === id);
    toast({
      title: "Item Deleted",
      description: `${item?.name} has been moved to trash`
    });
  };

  return {
    items,
    viewMode,
    setViewMode,
    filteredItems,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    handleViewItem,
    handleEditItem,
    handleRenameItem,
    handleShareItem,
    handleDownloadItem,
    deleteItem
  };
};
