
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject: (project: any) => void;
}

export const NewProjectDialog: React.FC<NewProjectDialogProps> = ({ 
  open, 
  onOpenChange, 
  onCreateProject 
}) => {
  const { toast } = useToast();
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    processType: "",
    dataSource: "",
    analysisGoals: [],
    timeline: "",
    stakeholders: "",
    expectedOutcomes: "",
    budgetRange: "",
    complianceRequirements: false,
    automationPotential: false
  });

  const analysisGoalOptions = [
    "Process Discovery",
    "Performance Analysis", 
    "Bottleneck Identification",
    "Conformance Checking",
    "Automation Opportunities",
    "Compliance Monitoring"
  ];

  const handleGoalChange = (goal: string, checked: boolean) => {
    setProjectData(prev => ({
      ...prev,
      analysisGoals: checked 
        ? [...prev.analysisGoals, goal]
        : prev.analysisGoals.filter(g => g !== goal)
    }));
  };

  const handleCreate = () => {
    const newProject = {
      id: `proj-${Date.now()}`,
      ...projectData,
      status: "Active",
      createdDate: new Date().toISOString(),
      progress: 0
    };

    onCreateProject(newProject);
    toast({
      title: "Project Created",
      description: `${projectData.name} has been created successfully.`
    });
    onOpenChange(false);
    
    // Reset form
    setProjectData({
      name: "",
      description: "",
      processType: "",
      dataSource: "",
      analysisGoals: [],
      timeline: "",
      stakeholders: "",
      expectedOutcomes: "",
      budgetRange: "",
      complianceRequirements: false,
      automationPotential: false
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Process Mining Project</DialogTitle>
          <DialogDescription>
            Set up a comprehensive process mining analysis project with detailed configuration
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="font-semibold">Basic Information</h4>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={projectData.name}
                  onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter project name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={projectData.description}
                  onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the project objectives and scope"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Process Type</Label>
                  <Select value={projectData.processType} onValueChange={(value) => setProjectData(prev => ({ ...prev, processType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select process type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order-to-cash">Order to Cash</SelectItem>
                      <SelectItem value="purchase-to-pay">Purchase to Pay</SelectItem>
                      <SelectItem value="issue-to-resolution">Issue to Resolution</SelectItem>
                      <SelectItem value="hire-to-retire">Hire to Retire</SelectItem>
                      <SelectItem value="custom">Custom Process</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Data Source</Label>
                  <Select value={projectData.dataSource} onValueChange={(value) => setProjectData(prev => ({ ...prev, dataSource: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sap">SAP System</SelectItem>
                      <SelectItem value="salesforce">Salesforce</SelectItem>
                      <SelectItem value="oracle">Oracle ERP</SelectItem>
                      <SelectItem value="csv-upload">CSV Upload</SelectItem>
                      <SelectItem value="database">Direct Database</SelectItem>
                      <SelectItem value="api">API Integration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Goals */}
          <div className="space-y-4">
            <h4 className="font-semibold">Analysis Goals</h4>
            <div className="grid grid-cols-2 gap-4">
              {analysisGoalOptions.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={projectData.analysisGoals.includes(goal)}
                    onCheckedChange={(checked) => handleGoalChange(goal, checked as boolean)}
                  />
                  <Label htmlFor={goal} className="text-sm">{goal}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h4 className="font-semibold">Project Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="timeline">Expected Timeline</Label>
                <Select value={projectData.timeline} onValueChange={(value) => setProjectData(prev => ({ ...prev, timeline: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-weeks">2 weeks</SelectItem>
                    <SelectItem value="1-month">1 month</SelectItem>
                    <SelectItem value="3-months">3 months</SelectItem>
                    <SelectItem value="6-months">6 months</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select value={projectData.budgetRange} onValueChange={(value) => setProjectData(prev => ({ ...prev, budgetRange: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-10k">Under $10K</SelectItem>
                    <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                    <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                    <SelectItem value="over-100k">Over $100K</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stakeholders">Key Stakeholders</Label>
              <Input
                id="stakeholders"
                value={projectData.stakeholders}
                onChange={(e) => setProjectData(prev => ({ ...prev, stakeholders: e.target.value }))}
                placeholder="List key stakeholders and their roles"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="outcomes">Expected Outcomes</Label>
              <Textarea
                id="outcomes"
                value={projectData.expectedOutcomes}
                onChange={(e) => setProjectData(prev => ({ ...prev, expectedOutcomes: e.target.value }))}
                placeholder="Describe expected outcomes and success metrics"
              />
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-4">
            <h4 className="font-semibold">Additional Requirements</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="compliance"
                  checked={projectData.complianceRequirements}
                  onCheckedChange={(checked) => setProjectData(prev => ({ ...prev, complianceRequirements: checked as boolean }))}
                />
                <Label htmlFor="compliance">Compliance requirements (SOX, GDPR, etc.)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="automation"
                  checked={projectData.automationPotential}
                  onCheckedChange={(checked) => setProjectData(prev => ({ ...prev, automationPotential: checked as boolean }))}
                />
                <Label htmlFor="automation">Focus on automation potential</Label>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleCreate} disabled={!projectData.name || !projectData.processType}>
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
