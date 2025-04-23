
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Save,
  FileText,
  ZoomIn,
  ZoomOut,
  Check,
  Settings,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditorToolbarProps {
  zoomLevel: number;
  showGrid: boolean;
  showValidation: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleGrid: () => void;
  onToggleValidation: () => void;
  onSaveModel: () => void;
  onExportXml: () => void;
  onExportJson: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  zoomLevel,
  showGrid,
  showValidation,
  onZoomIn,
  onZoomOut,
  onToggleGrid,
  onToggleValidation,
  onSaveModel,
  onExportXml,
  onExportJson,
}) => {
  return (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom Out</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <span className="text-xs font-medium w-12 text-center">{zoomLevel}%</span>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom In</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onToggleGrid}>
              <Settings className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{showGrid ? "Hide Grid" : "Show Grid"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onToggleValidation}>
              <Check className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{showValidation ? "Hide Validation" : "Show Validation"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onSaveModel}>
              <Save className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save Model</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center border-l ml-1 pl-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onExportXml}>
                <FileText className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export XML</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onExportJson}>
                <FileText className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export JSON</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
