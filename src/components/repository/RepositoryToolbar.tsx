
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Grid2X2, List, Search, SortAsc } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVoice } from "@/contexts/VoiceContext";

interface RepositoryToolbarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  onSort: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function RepositoryToolbar({ 
  searchTerm, 
  onSearch, 
  onSort, 
  viewMode,
  onViewModeChange
}: RepositoryToolbarProps) {
  const { speakText } = useVoice();
  
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search repository..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => speakText("Search Repository - Use this field to quickly find process artifacts by name. Efficient searching helps teams locate the exact process documentation they need without having to navigate through multiple folders.")}
          onMouseEnter={() => speakText("Enter keywords to search for specific processes, folders, or documentation in your repository. A good search strategy can save time when managing large process repositories.")}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          onClick={onSort}
          onMouseEnter={() => speakText("Sort repository items - This button allows you to change the sorting order of items in your repository. Proper sorting helps you find artifacts more easily when browsing through large collections of process documentation.")}
        >
          <SortAsc className="h-4 w-4" />
          Sort
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onViewModeChange("grid")}
          className={cn(
            "h-8 w-8",
            viewMode === "grid" ? "bg-muted" : ""
          )}
          onMouseEnter={() => speakText("Grid view - Shows process artifacts as cards in a grid layout. Grid view is excellent for visual recognition of process artifacts and provides a more visual overview of your repository contents.")}
        >
          <Grid2X2 className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onViewModeChange("list")}
          className={cn(
            "h-8 w-8",
            viewMode === "list" ? "bg-muted" : ""
          )}
          onMouseEnter={() => speakText("List view - Shows process artifacts in a detailed list format. List view is better for seeing more metadata about each process artifact and is often preferred when you need to see more details at once.")}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
