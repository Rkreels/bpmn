
import React from "react";
import { Button } from "@/components/ui/button";
import { Move, Link, Edit, Trash2, Copy } from "lucide-react";

interface ElementToolsProps {
  selectedTool: string;
  selectedElement: string | null;
  onSelectTool: (tool: string) => void;
  onEditElement: () => void;
  onDuplicateElement: () => void;
  onDeleteElement: () => void;
}

export const ElementTools: React.FC<ElementToolsProps> = ({
  selectedTool,
  selectedElement,
  onSelectTool,
  onEditElement,
  onDuplicateElement,
  onDeleteElement,
}) => {
  return (
    <div className="p-2 border-b bg-muted/20">
      <div className="flex gap-2">
        <Button 
          variant={selectedTool === "select" ? "secondary" : "outline"} 
          size="sm"
          onClick={() => onSelectTool("select")}
        >
          Select
        </Button>
        <Button 
          variant={selectedTool === "move" ? "secondary" : "outline"} 
          size="sm"
          onClick={() => onSelectTool("move")}
        >
          <Move className="h-4 w-4 mr-1" />
          Move
        </Button>
        <Button 
          variant={selectedTool === "sequence-flow" ? "secondary" : "outline"} 
          size="sm"
          onClick={() => onSelectTool("sequence-flow")}
        >
          <Link className="h-4 w-4 mr-1" />
          Connect
        </Button>
        
        {selectedElement && (
          <div className="ml-auto flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onEditElement}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onDuplicateElement}
            >
              <Copy className="h-4 w-4 mr-1" />
              Duplicate
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onDeleteElement}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
