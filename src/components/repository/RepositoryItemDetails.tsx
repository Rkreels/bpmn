
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Clock, 
  User, 
  Tag, 
  GitMerge, 
  Users, 
  Download,
  Share2,
  Edit
} from "lucide-react";
import { useVoice } from "@/contexts/VoiceContext";

interface RepositoryItemDetailsProps {
  open: boolean;
  item: any;
  onClose: () => void;
  onEdit: () => void;
  onShare: () => void;
  onDownload: () => void;
}

export function RepositoryItemDetails({
  open,
  item,
  onClose,
  onEdit,
  onShare,
  onDownload,
}: RepositoryItemDetailsProps) {
  const { speakText } = useVoice();

  const getIcon = () => {
    switch (item.type) {
      case "bpmn":
        return <GitMerge className="h-6 w-6 text-enterprise-blue-600" />;
      case "journey":
        return <Users className="h-6 w-6 text-enterprise-blue-600" />;
      case "dmn":
        return <FileText className="h-6 w-6 text-status-warning" />;
      default:
        return <FileText className="h-6 w-6 text-enterprise-gray-600" />;
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center space-y-0 gap-3">
          <div className="p-2 bg-muted/40 rounded-md">{getIcon()}</div>
          <div className="flex-1">
            <DialogTitle className="text-xl">{item.name}</DialogTitle>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">
                {item.type !== "folder" && item.type.toUpperCase()}
              </span>
              {item.version && (
                <span className="text-xs bg-muted px-1.5 py-0.5 rounded">v{item.version}</span>
              )}
              {item.status && <Badge>{item.status}</Badge>}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="mb-4">
            <TabsTrigger value="details" onMouseEnter={() => speakText("View item details")}>Details</TabsTrigger>
            <TabsTrigger value="history" onMouseEnter={() => speakText("View version history")}>History</TabsTrigger>
            <TabsTrigger value="permissions" onMouseEnter={() => speakText("View access permissions")}>Permissions</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Owner
                </div>
                <div className="text-sm">{item.owner}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Last Modified
                </div>
                <div className="text-sm">{item.lastModified}</div>
              </div>
              {item.type !== "folder" && (
                <>
                  <div className="space-y-1">
                    <div className="text-sm font-medium flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      Type
                    </div>
                    <div className="text-sm">{item.type.toUpperCase()}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      Status
                    </div>
                    <div className="text-sm">{item.status || "N/A"}</div>
                  </div>
                </>
              )}
            </div>
            
            {item.type !== "folder" && (
              <div className="mt-6 p-4 border rounded-md">
                <p className="text-sm">Preview not available in this view.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            <p className="text-sm text-muted-foreground">Version history not available for this item.</p>
          </TabsContent>
          
          <TabsContent value="permissions">
            <p className="text-sm text-muted-foreground">This item is shared with project members only.</p>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2 sm:gap-0 mt-6">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onEdit} 
              onMouseEnter={() => speakText("Edit this item")}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={onShare}
              onMouseEnter={() => speakText("Share this item with others")}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={onDownload}
              onMouseEnter={() => speakText("Download this item")}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}
            onMouseEnter={() => speakText("Close this dialog")}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
