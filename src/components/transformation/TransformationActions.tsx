
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { Plus, Download, FileText, Settings, Calendar } from "lucide-react";

interface Initiative {
  id: string;
  name: string;
  description: string;
  budget: string;
  timeline: string;
  status: string;
  progress: number;
}

interface TransformationActionsProps {
  onCreateInitiative: (initiative: Initiative) => void;
  onGenerateReport: () => void;
  onDownloadData: () => void;
}

export const TransformationActions: React.FC<TransformationActionsProps> = ({
  onCreateInitiative,
  onGenerateReport,
  onDownloadData
}) => {
  const { toast } = useToast();
  const { speakText } = useVoice();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    timeline: "",
    status: "Planning"
  });

  const handleCreateInitiative = async () => {
    if (!formData.name || !formData.budget) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const newInitiative: Initiative = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      budget: formData.budget,
      timeline: formData.timeline,
      status: formData.status,
      progress: 0
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onCreateInitiative(newInitiative);
      
      toast({
        title: "Initiative Created",
        description: `${formData.name} has been added to your transformation portfolio.`
      });
      
      speakText(`New transformation initiative ${formData.name} has been created successfully`);
      
      setFormData({ name: "", description: "", budget: "", timeline: "", status: "Planning" });
      setIsCreateOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create initiative. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    setIsLoading(true);
    toast({
      title: "Generating Report",
      description: "Creating comprehensive transformation report..."
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onGenerateReport();
      
      // Simulate file download
      const reportData = {
        timestamp: new Date().toISOString(),
        totalInitiatives: 18,
        portfolioValue: "$2.4M",
        roi: "340%"
      };
      
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transformation-report-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Report Generated",
        description: "Transformation report has been downloaded successfully."
      });
      
      speakText("Transformation report has been generated and downloaded to your device");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadData = async () => {
    setIsLoading(true);
    toast({
      title: "Downloading Data",
      description: "Preparing transformation data export..."
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onDownloadData();
      
      // Simulate CSV download
      const csvData = `Initiative,Status,Budget,Timeline,Progress
Digital Customer Onboarding,In Progress,$250K,Q2 2024,75%
Process Automation Suite,Planning,$180K,Q3 2024,25%
Data Analytics Platform,Completed,$320K,Q1 2024,100%
Mobile Experience Upgrade,At Risk,$150K,Q2 2024,40%`;
      
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transformation-data-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Data Downloaded",
        description: "Transformation data has been exported successfully."
      });
      
      speakText("Transformation data has been exported and downloaded as CSV file");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button 
        variant="outline"
        onClick={() => speakText("Opening transformation planning tools to create roadmaps and timelines.")}
        className="hover-scale text-xs md:text-sm"
        size="sm"
      >
        <Calendar className="h-4 w-4 mr-2" />
        Planning
      </Button>
      
      <Button 
        variant="outline"
        onClick={handleGenerateReport}
        disabled={isLoading}
        className="hover-scale text-xs md:text-sm"
        size="sm"
      >
        <FileText className="h-4 w-4 mr-2" />
        {isLoading ? "Generating..." : "Generate Report"}
      </Button>
      
      <Button 
        variant="outline"
        onClick={handleDownloadData}
        disabled={isLoading}
        className="hover-scale text-xs md:text-sm"
        size="sm"
      >
        <Download className="h-4 w-4 mr-2" />
        {isLoading ? "Downloading..." : "Download Data"}
      </Button>
      
      <Button 
        onClick={() => speakText("Opening transformation configuration panel")}
        className="hover-scale text-xs md:text-sm"
        size="sm"
      >
        <Settings className="h-4 w-4 mr-2" />
        Configure
      </Button>
      
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogTrigger asChild>
          <Button 
            className="hover-scale text-xs md:text-sm"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Initiative
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Initiative</DialogTitle>
            <DialogDescription>
              Add a new transformation initiative to your portfolio.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Initiative Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Digital Customer Experience"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the initiative..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="budget">Budget *</Label>
                <Input
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="e.g., $250K"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timeline">Timeline</Label>
                <Input
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                  placeholder="e.g., Q2 2024"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateInitiative} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Initiative"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
