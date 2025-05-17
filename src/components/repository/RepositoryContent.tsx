
import React from "react";
import { cn } from "@/lib/utils";
import { RepositoryItemType } from "@/types/repository";
import { RepositoryItemComponent } from "@/components/repository/RepositoryItemComponent";
import { useVoice } from "@/contexts/VoiceContext";

interface RepositoryContentProps {
  items: RepositoryItemType[];
  viewMode: "grid" | "list";
  onViewItem: (item: RepositoryItemType) => void;
  onEditItem: (item: RepositoryItemType) => void;
  onRenameItem: (item: RepositoryItemType) => void;
  onShareItem: (item: RepositoryItemType) => void;
  onDownloadItem: (item: RepositoryItemType) => void;
}

export function RepositoryContent({
  items,
  viewMode,
  onViewItem,
  onEditItem,
  onRenameItem,
  onShareItem,
  onDownloadItem
}: RepositoryContentProps) {
  const { speakText } = useVoice();
  
  return (
    <div 
      className={cn(
        "transition-all duration-300",
        viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
          : "flex flex-col gap-1"
      )}
      onMouseEnter={() => speakText("Repository content area. This displays all your process artifacts in your selected view mode. Organize and manage your process documentation efficiently to support process governance and knowledge sharing.")}
    >
      {items.length > 0 ? (
        items.map((item, index) => (
          <RepositoryItemComponent
            key={index}
            item={item}
            viewMode={viewMode}
            onClick={onViewItem}
            onEdit={onEditItem}
            onRename={onRenameItem}
            onShare={onShareItem}
            onDownload={onDownloadItem}
          />
        ))
      ) : (
        <div className="col-span-full py-8 text-center">
          <p className="text-muted-foreground">No items found matching your search.</p>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your search criteria or create new process artifacts.</p>
        </div>
      )}
    </div>
  );
}
