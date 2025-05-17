
import React from "react";
import { cn } from "@/lib/utils";
import { RepositoryItemType } from "@/types/repository";
import { useVoice } from "@/contexts/VoiceContext";
import { ItemIcon } from "./ItemIcon";
import { ItemStatus } from "./ItemStatus";
import { ItemActions } from "./ItemActions";
import { getItemEducationalDescription } from "./ItemEducation";

interface GridViewProps {
  item: RepositoryItemType;
  onClick: (item: RepositoryItemType) => void;
  onEdit: (item: RepositoryItemType) => void;
  onRename: (item: RepositoryItemType) => void;
  onShare: (item: RepositoryItemType) => void;
  onDownload: (item: RepositoryItemType) => void;
}

export function GridView({
  item,
  onClick,
  onEdit,
  onRename,
  onShare,
  onDownload
}: GridViewProps) {
  const { speakText } = useVoice();

  return (
    <div 
      className="border rounded-md p-4 hover:border-primary hover:shadow-sm transition-all duration-200 cursor-pointer group"
      onClick={(e) => {
        // Prevent click on the item if clicking on a button
        if ((e.target as Element).closest('button')) return;
        onClick(item);
      }}
      onMouseEnter={() => speakText(getItemEducationalDescription(item))}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-muted/40 rounded-md">
            <ItemIcon type={item.type} />
          </div>
          <div className="overflow-hidden">
            <p className="font-medium truncate">{item.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {item.type !== "folder" ? `${item.type.toUpperCase()}${item.version ? ` • v${item.version}` : ""}` : "Folder"}
            </p>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <ItemActions
            item={item}
            onView={onClick}
            onEdit={onEdit}
            onRename={onRename}
            onShare={onShare}
            onDownload={onDownload}
          />
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          By {item.owner}
        </p>
        <ItemStatus status={item.status} />
      </div>
      
      <div className="mt-1 text-xs text-muted-foreground">
        Updated {item.lastModified}
      </div>
    </div>
  );
}
