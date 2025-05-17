
import React from "react";
import { RepositoryItemType } from "@/types/repository";
import { useVoice } from "@/contexts/VoiceContext";
import { ItemIcon } from "./ItemIcon";
import { ItemStatus } from "./ItemStatus";
import { ItemActions } from "./ItemActions";
import { getItemEducationalDescription } from "./ItemEducation";

interface ListViewProps {
  item: RepositoryItemType;
  onClick: (item: RepositoryItemType) => void;
  onEdit: (item: RepositoryItemType) => void;
  onRename: (item: RepositoryItemType) => void;
  onShare: (item: RepositoryItemType) => void;
  onDownload: (item: RepositoryItemType) => void;
}

export function ListView({
  item,
  onClick,
  onEdit,
  onRename,
  onShare,
  onDownload
}: ListViewProps) {
  const { speakText } = useVoice();

  return (
    <div 
      className="flex items-center justify-between border-b py-3 px-3 hover:bg-muted/50 transition-colors duration-200 cursor-pointer group"
      onClick={(e) => {
        // Prevent click on the item if clicking on a button
        if ((e.target as Element).closest('button')) return;
        onClick(item);
      }}
      onMouseEnter={() => speakText(getItemEducationalDescription(item))}
    >
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-muted/40 rounded-md">
          <ItemIcon type={item.type} />
        </div>
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">
            {item.type !== "folder" ? `${item.type.toUpperCase()}${item.version ? ` • v${item.version}` : ""}` : "Folder"} • Updated {item.lastModified}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <ItemStatus status={item.status} />
        <p className="text-sm">{item.owner}</p>
        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
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
    </div>
  );
}
