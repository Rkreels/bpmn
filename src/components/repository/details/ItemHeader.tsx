
import React from "react";
import { DialogTitle } from "@/components/ui/dialog";
import { FileText, GitMerge, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ItemHeaderProps {
  item: {
    name: string;
    type: string;
    version?: string;
    status?: string;
  };
}

export function ItemHeader({ item }: ItemHeaderProps) {
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

  return (
    <div className="flex flex-row items-center space-y-0 gap-3">
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
    </div>
  );
}
