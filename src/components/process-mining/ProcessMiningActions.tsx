
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { Plus, Upload, Download, Play, RefreshCw, Database, Users, Calendar } from "lucide-react";

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
  const { toast } = useToast();
  const { speakText } = useVoice();
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    department: "",
    owner: "",
    startDate: "",
    endDate: "",
    objectives: "",
    expectedOutcomes: "",
    stakeholders: "",
    dataSource: "",
    processScope: ""
  });

  const handleNewProject = async () => {
    if (!projectData.name.trim() || !projectData.department || !projectData.owner) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Department, Owner).",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onNewProject();
      
      toast({
        title: "Project Created",
        description: `Process mining project "${projectData.name}" has been created successfully.`
      });
      
      speakText(`New process mining project ${projectData.name} has been created successfully`);
      setProjectData({
        name: "",
        description: "",
        department: "",
        owner: "",
        startDate: "",
        endDate: "",
        objectives: "",
        expectedOutcomes: "",
        stakeholders: "",
        dataSource: "",
        processScope: ""
      });
      setIsProjectDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    toast({
      title: "Uploading File",
      description: `Uploading ${selectedFile.name}...`
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onUploadData(selectedFile);
      
      toast({
        title: "Upload Complete",
        description: `${selectedFile.name} has been uploaded successfully.`
      });
      
      speakText(`Event log file ${selectedFile.name} has been uploaded and is ready for analysis`);
      setSelectedFile(null);
      setIsUploadDialogOpen(false);
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportResults = async () => {
    setIsLoading(true);
    toast({
      title: "Exporting Results",
      description: "Preparing analysis results for download..."
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onExportResults();
      
      // Simulate export download
      const exportData = {
        timestamp: new Date().toISOString(),
        processesAnalyzed: 23,
        eventLogsProcessed: "1.2M",
        bottlenecksIdentified: 7,
        optimizationPotential: "34%"
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `process-mining-results-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Complete",
        description: "Analysis results have been downloaded successfully."
      });
      
      speakText("Process mining results have been exported and downloaded to your device");
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export results. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline"
            className="hover-scale text-xs md:text-sm"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Process Mining Project</DialogTitle>
            <DialogDescription>
              Set up a comprehensive process mining project to analyze your business processes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  value={projectData.name}
                  onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Customer Onboarding Analysis"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={projectData.department} onValueChange={(value) => setProjectData(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={projectData.description}
                onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the purpose and goals of this analysis..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="owner">Project Owner *</Label>
                <Input
                  id="owner"
                  value={projectData.owner}
                  onChange={(e) => setProjectData(prev => ({ ...prev, owner: e.target.value }))}
                  placeholder="e.g., John Smith"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stakeholders">Key Stakeholders</Label>
                <Input
                  id="stakeholders"
                  value={projectData.stakeholders}
                  onChange={(e) => setProjectData(prev => ({ ...prev, stakeholders: e.target.value }))}
                  placeholder="e.g., Sarah Chen, Mike Rodriguez"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={projectData.startDate}
                  onChange={(e) => setProjectData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">Expected End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={projectData.endDate}
                  onChange={(e) => setProjectData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="objectives">Project Objectives</Label>
              <Textarea
                id="objectives"
                value={projectData.objectives}
                onChange={(e) => setProjectData(prev => ({ ...prev, objectives: e.target.value }))}
                placeholder="What do you want to achieve with this analysis?"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="expectedOutcomes">Expected Outcomes</Label>
              <Textarea
                id="expectedOutcomes"
                value={projectData.expectedOutcomes}
                onChange={(e) => setProjectData(prev => ({ ...prev, expectedOutcomes: e.target.value }))}
                placeholder="What results do you expect from this project?"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dataSource">Primary Data Source</Label>
                <Select value={projectData.dataSource} onValueChange={(value) => setProjectData(prev => ({ ...prev, dataSource: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="erp">ERP System</SelectItem>
                    <SelectItem value="crm">CRM System</SelectItem>
                    <SelectItem value="workflow">Workflow Management</SelectItem>
                    <SelectItem value="database">Database Export</SelectItem>
                    <SelectItem value="csv">CSV Files</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="processScope">Process Scope</Label>
                <Select value={projectData.processScope} onValueChange={(value) => setProjectData(prev => ({ ...prev, processScope: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="end-to-end">End-to-End Process</SelectItem>
                    <SelectItem value="department">Department Level</SelectItem>
                    <SelectItem value="function">Specific Function</SelectItem>
                    <SelectItem value="cross-functional">Cross-Functional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProjectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleNewProject} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline"
            className="hover-scale text-xs md:text-sm"
            size="sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Data
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Event Log</DialogTitle>
            <DialogDescription>
              Upload your process event data for analysis. Supported formats: CSV, XES, JSON.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="file">Select File</Label>
              <Input
                id="file"
                type="file"
                accept=".csv,.xes,.json"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFileUpload} disabled={isLoading || !selectedFile}>
              {isLoading ? "Uploading..." : "Upload File"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button 
        variant="outline"
        onClick={handleExportResults}
        disabled={isLoading}
        className="hover-scale text-xs md:text-sm"
        size="sm"
      >
        <Download className="h-4 w-4 mr-2" />
        {isLoading ? "Exporting..." : "Export"}
      </Button>

      <Button 
        onClick={onStartAnalysis}
        disabled={isAnalysisRunning || isLoading}
        className="hover-scale text-xs md:text-sm"
        size="sm"
      >
        {isAnalysisRunning ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
        {isAnalysisRunning ? "Analyzing..." : "Start Analysis"}
      </Button>
    </div>
  );
};
