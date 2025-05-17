
import React from "react";
import { User, Clock, Tag, FileText } from "lucide-react";

interface DetailsTabProps {
  item: {
    owner: string;
    lastModified: string;
    type: string;
    status?: string;
  };
}

export function DetailsTab({ item }: DetailsTabProps) {
  return (
    <div className="space-y-4">
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
    </div>
  );
}
