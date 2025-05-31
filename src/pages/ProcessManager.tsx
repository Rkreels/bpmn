import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { useProcessManagerData } from "@/hooks/useProcessManagerData";
import { EditorToolbar } from "@/components/process-manager/EditorToolbar";
import { EditorTabView } from "@/components/process-manager/EditorTabView";
import { ProcessContent } from "@/components/process-manager/ProcessContent";
import { ProcessManagerVoiceGuide } from "@/components/process-manager/ProcessManagerVoiceGuide";
import { VoiceTrainerToggle } from "@/components/voice/VoiceTrainerToggle";
import { 
  Save, 
  Download, 
  Share2, 
  Play, 
  FileText,
  Users,
  Activity,
  Clock,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  TrendingUp
} from "lucide-react";

export default function ProcessManager() {
  const [activeTab, setActiveTab] = useState("editor");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(true);
  const [processName, setProcessName] = useState("Order to Cash Process");
  const [processOwner, setProcessOwner] = useState("John Doe");
  const [isSimulating, setIsSimulating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  
  const { toast } = useToast();
  const { speakText } = useVoice();
  const { 
    templates, 
    projects, 
    metrics, 
    createTemplate, 
    updateTemplate, 
    deleteTemplate,
    createProject,
    updateProject,
    validateProcess,
    simulateProcess,
    exportProcess
  } = useProcessManagerData();
  
  // Dynamic process metrics based on actual data
  const processMetrics = [
    { 
      label: "Active Templates", 
      value: templates.filter(t => t.status === "active").length.toString(), 
      icon: Activity, 
      color: "text-blue-600",
      trend: "+12%"
    },
    { 
      label: "Running Projects", 
      value: projects.filter(p => p.status === "active").length.toString(), 
      icon: Clock, 
      color: "text-green-600",
      trend: "+8%"
    },
    { 
      label: "Completion Rate", 
      value: `${Math.round(projects.filter(p => p.status === "completed").length / projects.length * 100)}%`, 
      icon: CheckCircle, 
      color: "text-emerald-600",
      trend: "+5%"
    },
    { 
      label: "Team Collaboration", 
      value: projects.reduce((acc, p) => acc + p.team.length, 0).toString(), 
      icon: Users, 
      color: "text-purple-600",
      trend: "+15%"
    }
  ];

  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || template.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ["all", ...Array.from(new Set(templates.map(t => t.category)))];

  useEffect(() => {
    if (!isAutoSaveEnabled) return;
    
    const autoSaveInterval = setInterval(() => {
      handleAutoSave();
    }, 120000);
    
    return () => clearInterval(autoSaveInterval);
  }, [isAutoSaveEnabled]);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const tabNames = {
      editor: "Process Editor - Design and model your business processes",
      properties: "Process Properties - Configure metadata and business rules",
      repository: "Process Repository - Manage templates and reusable components"
    };
    speakText(`Switched to ${tabNames[tab as keyof typeof tabNames]}`);
  };
  
  const handleAutoSave = () => {
    if (!isAutoSaveEnabled) return;
    
    setLastSaved(new Date());
    toast({
      title: "Process Auto-saved",
      description: `Your process model was automatically saved at ${new Date().toLocaleTimeString()}.`,
      variant: "default"
    });
  };

  const handleManualSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastSaved(new Date());
      setIsLoading(false);
      toast({
        title: "Process Saved",
        description: "Your process model has been saved successfully.",
      });
      speakText("Process model saved successfully");
    }, 500);
  };

  const handleSimulation = async () => {
    setIsSimulating(true);
    toast({
      title: "Starting Simulation",
      description: "Process simulation is starting..."
    });
    speakText("Starting process simulation to analyze performance and identify bottlenecks");
    
    try {
      const results = await simulateProcess("current-process");
      setIsSimulating(false);
      toast({
        title: "Simulation Complete",
        description: `Simulation completed. Execution time: ${(results as any).executionTime.toFixed(1)}s, Throughput: ${(results as any).throughput} cases/hour`
      });
      speakText(`Simulation complete. Average execution time is ${(results as any).executionTime.toFixed(1)} seconds with ${(results as any).throughput} cases per hour throughput.`);
    } catch (error) {
      setIsSimulating(false);
      toast({
        title: "Simulation Error",
        description: "An error occurred during simulation"
      });
    }
  };

  const handleExport = () => {
    setIsLoading(true);
    const filename = exportProcess("current-process", "bpmn");
    speakText(`Exporting process model as ${filename}`);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Export Complete",
        description: `Process model exported as ${filename}`
      });
    }, 2000);
  };

  const handleValidateProcess = () => {
    const mockProcessData = {
      name: processName,
      elements: [
        { type: "start-event", name: "Start" },
        { type: "task", name: "Process Order" },
        { type: "end-event", name: "End" }
      ]
    };
    
    const validation = validateProcess(mockProcessData);
    
    if (validation.isValid) {
      toast({
        title: "Validation Successful",
        description: "Process model is valid and ready for deployment."
      });
      speakText("Process validation successful. Your model follows BPMN standards and best practices.");
    } else {
      toast({
        title: "Validation Issues Found",
        description: `Found ${validation.errors.length} errors and ${validation.warnings.length} warnings.`
      });
      speakText(`Validation found ${validation.errors.length} errors and ${validation.warnings.length} warnings that need attention.`);
    }
  };

  const handleUseTemplate = (template: any) => {
    toast({
      title: "Using Template",
      description: `Loading ${template.name} template...`
    });
    speakText(`Loading ${template.name} template. This includes ${template.elements} pre-configured elements.`);
  };

  const handleCreateTemplate = () => {
    const newTemplate = createTemplate({
      name: "New Process Template",
      description: "Custom process template",
      category: "General"
    });
    speakText(`Created new template: ${newTemplate.name}. You can now customize it in the editor.`);
  };

  const handleCreateProject = () => {
    const newProject = createProject({
      name: "New Process Project",
      description: "Process improvement initiative",
      priority: "medium"
    });
    speakText(`Created new project: ${newProject.name}. Added to active projects list.`);
  };

  return (
    <MainLayout pageTitle="Process Manager">
      <ProcessManagerVoiceGuide />
      
      <div className="w-full min-h-screen space-y-6 animate-fade-in p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">Process Manager</h1>
            <p className="text-muted-foreground text-sm md:text-base">Design and optimize business processes with BPMN</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="outline" 
              onClick={handleValidateProcess} 
              className="hover-scale text-xs md:text-sm"
              size="sm"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Validate
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExport} 
              className="hover-scale text-xs md:text-sm"
              size="sm"
              disabled={isLoading}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSimulation}
              disabled={isSimulating}
              className="hover-scale text-xs md:text-sm"
              size="sm"
            >
              <Play className="h-4 w-4 mr-2" />
              {isSimulating ? "Simulating..." : "Simulate"}
            </Button>
            <Button 
              onClick={handleManualSave} 
              className="hover-scale text-xs md:text-sm"
              size="sm"
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        {/* Dynamic Process Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {processMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow hover-scale cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`h-5 w-5 ${metric.color} flex-shrink-0`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm text-muted-foreground truncate">{metric.label}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-lg md:text-xl font-bold">{metric.value}</p>
                        <Badge variant="outline" className="text-xs">
                          {metric.trend}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="w-full overflow-x-auto">
              <EditorTabView activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              {lastSaved && (
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              )}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="autosave"
                  checked={isAutoSaveEnabled}
                  onChange={(e) => setIsAutoSaveEnabled(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="autosave" className="text-xs text-muted-foreground whitespace-nowrap">
                  Auto-save
                </label>
              </div>
              <EditorToolbar />
            </div>
          </div>

          <TabsContent value="editor" className="mt-6 w-full">
            <ProcessContent />
          </TabsContent>
          
          <TabsContent value="properties" className="mt-6 w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Process Properties</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Basic Information</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Process ID</label>
                        <Input 
                          type="text" 
                          className="mt-1" 
                          defaultValue="PROC-2023-001" 
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Process Name</label>
                        <Input 
                          type="text" 
                          className="mt-1" 
                          value={processName}
                          onChange={(e) => setProcessName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Process Owner</label>
                        <Input 
                          type="text" 
                          className="mt-1" 
                          value={processOwner}
                          onChange={(e) => setProcessOwner(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea 
                          className="mt-1" 
                          placeholder="Describe this process..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Process Classification</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Process Category</label>
                        <select className="w-full px-3 py-2 border rounded-md mt-1">
                          <option>Core Process</option>
                          <option>Support Process</option>
                          <option>Management Process</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Business Domain</label>
                        <select className="w-full px-3 py-2 border rounded-md mt-1">
                          <option>Sales</option>
                          <option>Finance</option>
                          <option>Operations</option>
                          <option>Human Resources</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Risk Level</label>
                        <select className="w-full px-3 py-2 border rounded-md mt-1">
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                          <option>Critical</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Status</label>
                        <div className="mt-2">
                          <Badge variant="outline">Active</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Button 
                    onClick={handleManualSave} 
                    className="hover-scale"
                    disabled={isLoading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Properties"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="repository" className="mt-6 w-full">
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Process Repository</CardTitle>
                <div className="flex gap-2">
                  <Button onClick={handleCreateProject} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                  <Button onClick={handleCreateTemplate} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <select 
                    className="px-3 py-2 border rounded-md"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dynamic Templates Grid */}
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Browse and manage {filteredTemplates.length} process templates in the repository.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTemplates.map((template) => (
                      <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer hover-scale">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-sm">{template.name}</h4>
                            <Badge 
                              variant={template.status === "active" ? "default" : template.status === "draft" ? "secondary" : "outline"}
                              className="text-xs"
                            >
                              {template.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                          <div className="text-xs text-muted-foreground mb-3">
                            <div>Category: {template.category}</div>
                            <div>Elements: {template.elements} • Usage: {template.usage}</div>
                            <div>Version: {template.version} • By: {template.author}</div>
                          </div>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs flex-1"
                              onClick={() => handleUseTemplate(template)}
                            >
                              Use
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs flex-1"
                              onClick={() => toast({ title: "Preview", description: `Previewing ${template.name}` })}
                            >
                              Preview
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Active Projects */}
                  <div className="mt-8">
                    <h4 className="font-medium mb-3">Active Projects ({projects.filter(p => p.status === "active").length})</h4>
                    <div className="border rounded-md divide-y">
                      {projects.filter(p => p.status === "active").map((project) => (
                        <div key={project.id} className="p-3 flex justify-between items-center hover:bg-muted/50">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium text-sm">{project.name}</h5>
                              <Badge 
                                variant={project.priority === "high" ? "destructive" : project.priority === "medium" ? "secondary" : "outline"}
                                className="text-xs"
                              >
                                {project.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{project.description}</p>
                            <div className="text-xs text-muted-foreground">
                              Owner: {project.owner} • Team: {project.team.length} members • Progress: {project.progress}%
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="hover-scale ml-4 flex-shrink-0"
                            onClick={() => toast({ title: "Opening Project", description: `Loading ${project.name}` })}
                          >
                            Open
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <VoiceTrainerToggle />
    </MainLayout>
  );
}
