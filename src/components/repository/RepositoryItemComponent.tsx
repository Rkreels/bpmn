
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
} from "lucide-react";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";

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
        break;
      case "download":
        onDownload(item);
        speakText(`Downloading ${item.name}`);
        break;
      default:
        break;
    }
  };
  
  const getVoiceDescription = () => {
    let description = `${item.name}. `;
    
    if (item.type === "folder") {
      description += "Folder. ";
    } else {
      description += `${item.type.toUpperCase()} file. `;
      if (item.version) description += `Version ${item.version}. `;
      if (item.status) description += `Status: ${item.status}. `;
    }
    
    description += `Last modified ${item.lastModified} by ${item.owner}.`;
    return description;
  };
  
  if (viewMode === "grid") {
    return (
      <div 
        className="border rounded-md p-4 hover:border-primary hover:shadow-sm cursor-pointer"
        onClick={() => handleAction("view")}
        onMouseEnter={() => speakText(getVoiceDescription())}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onMouseEnter={() => speakText("Open options menu")}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleAction("view")}
                onMouseEnter={() => speakText("View this item")}>
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("edit")}
                onMouseEnter={() => speakText("Edit this item")}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("rename")}
                onMouseEnter={() => speakText("Rename this item")}>
                Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleAction("share")}
                onMouseEnter={() => speakText("Share this item with others")}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("download")}
                onMouseEnter={() => speakText("Download this item to your device")}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
      className="flex items-center justify-between border-b py-3 px-3 hover:bg-muted/50 cursor-pointer"
      onClick={() => handleAction("view")}
      onMouseEnter={() => speakText(getVoiceDescription())}
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onMouseEnter={() => speakText("Open options menu")}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleAction("view")}
              onMouseEnter={() => speakText("View this item")}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("edit")}
              onMouseEnter={() => speakText("Edit this item")}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("rename")}
              onMouseEnter={() => speakText("Rename this item")}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleAction("share")}
              onMouseEnter={() => speakText("Share this item with others")}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("download")}
              onMouseEnter={() => speakText("Download this item to your device")}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
