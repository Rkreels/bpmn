
import React from "react";
import { RepositoryItemType } from "@/types/repository";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Share2,
  Download,
  Folder,
  GitMerge,
  Users,
  FileText,
  Pencil,
  Eye,
} from "lucide-react";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RepositoryItemProps {
  item: RepositoryItemType;
  viewMode: "grid" | "list";
  onClick: (item: RepositoryItemType) => void;
  onEdit: (item: RepositoryItemType) => void;
  onRename: (item: RepositoryItemType) => void;
  onShare: (item: RepositoryItemType) => void;
  onDownload: (item: RepositoryItemType) => void;
}

export function RepositoryItemComponent({
  item,
  viewMode,
  onClick,
  onEdit,
  onRename,
  onShare,
  onDownload,
}: RepositoryItemProps) {
  const { speakText } = useVoice();
  const { toast } = useToast();

  const getIcon = () => {
    switch (item.type) {
      case "folder":
        return <Folder className="h-5 w-5 text-enterprise-blue-600" />;
      case "bpmn":
        return <GitMerge className="h-5 w-5 text-enterprise-blue-600" />;
      case "journey":
        return <Users className="h-5 w-5 text-enterprise-blue-600" />;
      case "dmn":
        return <FileText className="h-5 w-5 text-status-warning" />;
      case "document":
        return <FileText className="h-5 w-5 text-enterprise-gray-600" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  const getStatusBadge = () => {
    if (!item.status) return null;
    
    const statusColors = {
      "Draft": "bg-muted text-muted-foreground",
      "In Review": "bg-enterprise-blue-100 text-enterprise-blue-800",
      "Approved": "bg-status-success/10 text-status-success",
      "Published": "bg-status-success/10 text-status-success",
    };
    
    return (
      <Badge className={statusColors[item.status as keyof typeof statusColors]}>
        {item.status}
      </Badge>
    );
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "view":
        onClick(item);
        speakText(`Viewing ${item.name}`);
        break;
      case "edit":
        onEdit(item);
        speakText(`Editing ${item.name}`);
        break;
      case "rename":
        onRename(item);
        speakText(`Renaming ${item.name}`);
        break;
      case "share":
        onShare(item);
        speakText(`Sharing ${item.name}`);
        toast({
          title: "Sharing initiated",
          description: `Preparing to share ${item.name}`,
        });
        break;
      case "download":
        onDownload(item);
        speakText(`Downloading ${item.name}`);
        toast({
          title: "Download started",
          description: `${item.name} will be downloaded shortly`,
        });
        break;
      default:
        break;
    }
  };
  
  const getEducationalDescription = () => {
    const baseDesc = `${item.name}. This is a ${item.type.toUpperCase()} ${item.type === 'folder' ? 'for organizing process artifacts' : 'file'}. `;
    let typeDesc = '';
    
    switch (item.type) {
      case 'bpmn':
        typeDesc = "BPMN processes help visualize and standardize business workflows using industry-standard notation. These diagrams are essential for process optimization and automation initiatives.";
        break;
      case 'journey':
        typeDesc = "Journey maps document customer experiences across touchpoints, helping identify improvement opportunities. They reveal customer pain points and moments of delight throughout their interaction with your organization.";
        break;
      case 'dmn':
        typeDesc = "Decision models document business rules and decision logic for consistent organizational decision-making. They enable you to standardize complex decisions and automate rule-based processes.";
        break;
      case 'folder':
        typeDesc = "Folders help maintain an organized repository structure for efficient process management. Good organization is essential for process governance and knowledge sharing.";
        break;
      default:
        typeDesc = "Process documentation ensures knowledge sharing and standardization across the organization. Well-documented processes reduce training time and ensure consistent execution.";
    }
    
    return `${baseDesc}${typeDesc} Created by ${item.owner}, last modified ${item.lastModified}${item.status ? `. Current status: ${item.status}` : ''}.`;
  };

  const getActionButtons = () => {
    return (
      <div className="flex space-x-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleAction("view")}
                onMouseEnter={() => speakText("View this item in detail. Viewing allows you to examine the process artifact without making changes.")}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleAction("edit")}
                onMouseEnter={() => speakText("Edit this item. Regular updates ensure your process documentation stays current and reflects actual business operations.")}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onMouseEnter={() => speakText("Open options menu for additional actions like sharing, downloading, or renaming this item.")}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>More options</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleAction("rename")}
              onMouseEnter={() => speakText("Rename this item. Maintaining clear and descriptive names helps with process organization and searchability.")}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleAction("share")}
              onMouseEnter={() => speakText("Share this item with others. Collaboration is key to successful process management and continuous improvement.")}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("download")}
              onMouseEnter={() => speakText("Download this item to your device. This is useful for offline access or sharing with stakeholders who don't have direct system access.")}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };
  
  if (viewMode === "grid") {
    return (
      <div 
        className="border rounded-md p-4 hover:border-primary hover:shadow-sm transition-all duration-200 cursor-pointer group"
        onClick={(e) => {
          // Prevent click on the item if clicking on a button
          if ((e.target as Element).closest('button')) return;
          handleAction("view");
        }}
        onMouseEnter={() => speakText(getEducationalDescription())}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-muted/40 rounded-md">
              {getIcon()}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {item.type !== "folder" ? `${item.type.toUpperCase()}${item.version ? ` • v${item.version}` : ""}` : "Folder"}
              </p>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            {getActionButtons()}
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            By {item.owner}
          </p>
          {getStatusBadge()}
        </div>
        
        <div className="mt-1 text-xs text-muted-foreground">
          Updated {item.lastModified}
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="flex items-center justify-between border-b py-3 px-3 hover:bg-muted/50 transition-colors duration-200 cursor-pointer group"
      onClick={(e) => {
        // Prevent click on the item if clicking on a button
        if ((e.target as Element).closest('button')) return;
        handleAction("view");
      }}
      onMouseEnter={() => speakText(getEducationalDescription())}
    >
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-muted/40 rounded-md">
          {getIcon()}
        </div>
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">
            {item.type !== "folder" ? `${item.type.toUpperCase()}${item.version ? ` • v${item.version}` : ""}` : "Folder"} • Updated {item.lastModified}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {getStatusBadge()}
        <p className="text-sm">{item.owner}</p>
        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          {getActionButtons()}
        </div>
      </div>
    </div>
  );
}
