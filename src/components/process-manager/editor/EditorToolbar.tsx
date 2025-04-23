
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Save,
  FileText,
  ZoomIn,
  ZoomOut,
  Check,
  Grid,
  Download,
  Upload,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={onZoomOut} className="h-8 w-8 p-0">
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
            <Button variant="outline" size="sm" onClick={onZoomIn} className="h-8 w-8 p-0">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom In</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={showGrid ? "secondary" : "outline"} 
              size="sm" 
              onClick={onToggleGrid} 
              className="h-8 w-8 p-0"
            >
              <Grid className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{showGrid ? "Hide Grid" : "Show Grid"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={showValidation ? "secondary" : "outline"} 
              size="sm" 
              onClick={onToggleValidation} 
              className="h-8 w-8 p-0"
            >
              <Check className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{showValidation ? "Hide Validation" : "Show Validation"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="border-l h-6 mx-2"></div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={onSaveModel} className="flex items-center">
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save Model</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Export Model</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onExportXml}>
            <FileText className="h-4 w-4 mr-2" />
            Export as BPMN XML
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExportJson}>
            <FileText className="h-4 w-4 mr-2" />
            Export as JSON
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center">
              <Upload className="h-4 w-4 mr-1" />
              Import
            </Button>
          </TooltipTrigger>
          <TooltipContent>Import Model</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
