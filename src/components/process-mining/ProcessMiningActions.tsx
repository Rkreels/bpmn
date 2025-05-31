
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Play, Download, Loader2 } from "lucide-react";
import { NewProjectDialog } from "./NewProjectDialog";

interface ProcessMiningActionsProps {
  onNewProject: () => void;
  onUploadData: (file: File) => void;
  onStartAnalysis: () => void;
  onExportResults: () => void;
  isAnalysisRunning: boolean;
}

export const ProcessMiningActions: React.FC<ProcessMiningActionsProps> = ({
  onNewProject,
  onUploadData,
  onStartAnalysis,
  onExportResults,
  isAnalysisRunning
}) => {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  const handleNewProject = () => {
    setIsNewProjectOpen(true);
    onNewProject();
  };

  const handleCreateProject = (project: any) => {
    console.log("New project created:", project);
    setIsNewProjectOpen(false);
  };

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xes,.json';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        Array.from(files).forEach(file => {
          onUploadData(file);
        });
      }
    };
    input.click();
  };

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <Button onClick={handleNewProject}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
        <Button variant="outline" onClick={handleUploadClick}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Data
        </Button>
        <Button 
          variant="outline" 
          onClick={onStartAnalysis}
          disabled={isAnalysisRunning}
        >
          {isAnalysisRunning ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Play className="h-4 w-4 mr-2" />
          )}
          {isAnalysisRunning ? "Analyzing..." : "Start Analysis"}
        </Button>
        <Button variant="outline" onClick={onExportResults}>
          <Download className="h-4 w-4 mr-2" />
          Export Results
        </Button>
      </div>

      <NewProjectDialog 
        open={isNewProjectOpen} 
        onOpenChange={setIsNewProjectOpen}
        onCreateProject={handleCreateProject}
      />
    </>
  );
};
