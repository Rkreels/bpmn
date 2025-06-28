
import { useState, useMemo } from 'react';
import { RepositoryItemType } from '@/types/repository';
import { useToast } from '@/hooks/use-toast';
import { useVoice } from '@/contexts/VoiceContext';

// Mock data for repository items
const mockRepositoryItems: RepositoryItemType[] = [
  {
    id: '1',
    name: 'Customer Onboarding Process',
    description: 'Complete workflow for new customer registration and verification',
    type: 'process',
    category: 'customer',
    version: '2.1',
    status: 'active',
    owner: 'John Smith',
    size: '245 KB',
    lastModified: '2024-01-15T10:30:00Z',
    tags: ['customer', 'onboarding', 'compliance']
  },
  {
    id: '2',
    name: 'Invoice Processing Template',
    description: 'Standardized template for automated invoice processing',
    type: 'template',
    category: 'finance',
    version: '1.5',
    status: 'active',
    owner: 'Sarah Johnson',
    size: '128 KB',
    lastModified: '2024-01-12T14:20:00Z',
    tags: ['finance', 'automation', 'invoice']
  },
  {
    id: '3',
    name: 'Risk Assessment Framework',
    description: 'Comprehensive framework for business risk evaluation',
    type: 'framework',
    category: 'compliance',
    version: '3.0',
    status: 'draft',
    owner: 'Mike Wilson',
    size: '512 KB',
    lastModified: '2024-01-10T09:15:00Z',
    tags: ['risk', 'compliance', 'assessment']
  }
];

export const useRepository = () => {
  const [items] = useState<RepositoryItemType[]>(mockRepositoryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { toast } = useToast();
  const { speakText } = useVoice();

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  const handleViewItem = (item: RepositoryItemType) => {
    toast({
      title: "Opening Item",
      description: `Opening ${item.name} for viewing`
    });
    speakText(`Opening ${item.name} for detailed view`);
  };

  const handleEditItem = (item: RepositoryItemType) => {
    toast({
      title: "Edit Mode",
      description: `Opening ${item.name} for editing`
    });
    speakText(`Opening ${item.name} for editing`);
  };

  const handleRenameItem = (item: RepositoryItemType) => {
    toast({
      title: "Rename Item",
      description: `Renaming ${item.name}`
    });
  };

  const handleShareItem = (item: RepositoryItemType) => {
    toast({
      title: "Share Item",
      description: `Sharing ${item.name} with team members`
    });
    speakText(`Sharing ${item.name} with your team`);
  };

  const handleDownloadItem = (item: RepositoryItemType) => {
    toast({
      title: "Download Started",
      description: `Downloading ${item.name} (${item.size})`
    });
    speakText(`Starting download of ${item.name}`);
  };

  const deleteItem = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      toast({
        title: "Item Deleted",
        description: `${item.name} has been deleted`
      });
      speakText(`${item.name} has been deleted from the repository`);
    }
  };

  return {
    items,
    filteredItems,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    viewMode,
    setViewMode,
    handleViewItem,
    handleEditItem,
    handleRenameItem,
    handleShareItem,
    handleDownloadItem,
    deleteItem
  };
};
