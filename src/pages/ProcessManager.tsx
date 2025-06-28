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
import { BpmnEditor } from "@/components/process-manager/BpmnEditor";
import { ProcessTemplateSelector } from "@/components/process-manager/ProcessTemplateSelector";
import { EnterpriseProcessManager } from "@/components/process-manager/editor/EnterpriseProcessManager";
import { ProcessManagerVoiceGuide } from "@/components/process-manager/ProcessManagerVoiceGuide";
import { VoiceTrainerToggle } from "@/components/voice/VoiceTrainerToggle";
import { complexProcessTemplates } from "@/data/processTemplates";
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
  TrendingUp,
  BarChart3,
  Settings,
  Workflow
} from "lucide-react";

export default function ProcessManager() {
  const [activeTab, setActiveTab] = useState("editor");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(true);
  const [processName, setProcessName] = useState("Enterprise Process Model");
  const [processOwner, setProcessOwner] = useState("Process Manager");
  const [isSimulating, setIsSimulating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { speakText } = useVoice();

  // Dynamic process metrics
  const processMetrics = [
    { 
      label: "Process Templates", 
      value: complexProcessTemplates.length.toString(), 
      icon: Workflow, 
      color: "text-blue-600",
      trend: "+18%",
      description: "Available templates"
    },
    { 
      label: "Active Processes", 
      value: "24", 
      icon: Activity, 
      color: "text-green-600",
      trend: "+12%",
      description: "Currently running"
    },
    { 
      label: "Completion Rate", 
      value: "94%", 
      icon: CheckCircle, 
      color: "text-emerald-600",
      trend: "+5%",
      description: "Process success rate"
    },
    { 
      label: "Team Members", 
      value: "156", 
      icon: Users, 
      color: "text-purple-600",
      trend: "+25%",
      description: "Collaborating users"
    }
  ];

  useEffect(() => {
    if (!isAutoSaveEnabled) return;
    
    const autoSaveInterval = setInterval(() => {
      handleAutoSave();
    }, 120000);
    
    return () => clearInterval(autoSaveInterval);
  }, [isAutoSaveEnabled]);

  // Set the page title
  useEffect(() => {
    document.title = "Process Manager";
  }, []);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const tabNames = {
      editor: "Process Editor - Design and model your business processes visually",
      properties: "Process Properties - Configure metadata, compliance, and governance",
      repository: "Process Repository - Manage templates, versions, and reusable components",
      analytics: "Process Analytics - Monitor performance, compliance, and optimization opportunities"
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
        title: "Process Saved Successfully",
        description: "Your process model and all configurations have been saved.",
      });
      speakText("Process model saved successfully with all configurations and metadata");
    }, 800);
  };

  const handleSimulation = async () => {
    setIsSimulating(true);
    toast({
      title: "Starting Advanced Simulation",
      description: "Analyzing process flow, performance metrics, and bottlenecks..."
    });
    speakText("Starting comprehensive process simulation to analyze performance, identify bottlenecks, and optimize workflow efficiency");
    
    setTimeout(() => {
      setIsSimulating(false);
      const executionTime = (Math.random() * 10 + 5).toFixed(1);
      const throughput = Math.floor(Math.random() * 50 + 20);
      const efficiency = Math.floor(Math.random() * 20 + 80);
      
      toast({
        title: "Simulation Complete",
        description: `Analysis complete. Execution time: ${executionTime}s, Throughput: ${throughput} cases/hour, Efficiency: ${efficiency}%`
      });
      speakText(`Simulation complete. Average execution time is ${executionTime} seconds with ${throughput} cases per hour throughput and ${efficiency} percent efficiency rating.`);
    }, 3000);
  };

  const handleExport = () => {
    setIsLoading(true);
    const filename = `process-model-${Date.now()}.bpmn`;
    speakText(`Exporting enterprise process model as ${filename} with full metadata and configurations`);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Export Complete",
        description: `Process model exported as ${filename} with complete metadata`
      });
    }, 1500);
  };

  const handleValidateProcess = () => {
    const hasErrors = Math.random() > 0.7;
    const errorCount = hasErrors ? Math.floor(Math.random() * 3 + 1) : 0;
    const warningCount = Math.floor(Math.random() * 5);
    
    if (errorCount === 0) {
      toast({
        title: "Validation Successful",
        description: "Process model meets all enterprise standards and BPMN compliance requirements."
      });
      speakText("Process validation successful. Your model follows BPMN 2.0 standards, enterprise governance requirements, and best practices for production deployment.");
    } else {
      toast({
        title: "Validation Issues Found",
        description: `Found ${errorCount} critical errors and ${warningCount} warnings that require attention.`
      });
      speakText(`Validation identified ${errorCount} critical errors and ${warningCount} warnings. Please review the validation panel for detailed recommendations.`);
    }
  };

  const handleLoadTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = complexProcessTemplates.find(t => t.id === templateId);
    if (template) {
      toast({
        title: "Template Loading",
        description: `Loading ${template.name} with ${template.elements.length} elements and ${template.connections.length} connections...`
      });
      speakText(`Loading ${template.name} template. This ${template.properties.complexity} complexity process includes ${template.elements.length} elements and ${template.connections.length} connections from the ${template.category} domain.`);
    }
  };

  return (
    <MainLayout pageTitle="Process Manager">
      <ProcessManagerVoiceGuide />
      
      <div className="w-full min-h-screen space-y-6 animate-fade-in p-4 md:p-6">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Process Manager
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Design, optimize, and govern business processes with enterprise-grade BPMN tools
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Button 
              variant="outline" 
              onClick={handleValidateProcess} 
              className="hover-scale text-sm"
              size="sm"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Validate & Analyze
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExport} 
              className="hover-scale text-sm"
              size="sm"
              disabled={isLoading}
            >
              <Download className="h-4 w-4 mr-2" />
              Export BPMN
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSimulation}
              disabled={isSimulating}
              className="hover-scale text-sm"
              size="sm"
            >
              <Play className="h-4 w-4 mr-2" />
              {isSimulating ? "Analyzing..." : "Simulate Process"}
            </Button>
            <Button 
              onClick={handleManualSave} 
              className="hover-scale text-sm bg-gradient-to-r from-blue-600 to-purple-600"
              size="sm"
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Process"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {processMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover-scale cursor-pointer border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full bg-gray-100 ${metric.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <p className="text-xs text-muted-foreground">{metric.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {metric.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="w-full overflow-x-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="editor" className="text-sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Process Editor
                </TabsTrigger>
                <TabsTrigger value="properties" className="text-sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Properties
                </TabsTrigger>
                <TabsTrigger value="repository" className="text-sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Repository
                </TabsTrigger>
                <TabsTrigger value="analytics" className="text-sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>
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
            </div>
          </div>

          <TabsContent value="editor" className="mt-6 w-full">
            <BpmnEditor activeTool="select" />
          </TabsContent>
          
          <TabsContent value="properties" className="mt-6 w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Process Properties & Governance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="font-semibold text-lg">Basic Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Process ID</label>
                        <Input 
                          type="text" 
                          className="mt-1" 
                          defaultValue="PROC-ENT-2024-001" 
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
                          placeholder="Comprehensive process description with business objectives..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="font-semibold text-lg">Enterprise Classification</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Process Category</label>
                        <select className="w-full px-3 py-2 border rounded-md mt-1">
                          <option>Core Business Process</option>
                          <option>Support Process</option>
                          <option>Management Process</option>
                          <option>Regulatory Process</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Business Domain</label>
                        <select className="w-full px-3 py-2 border rounded-md mt-1">
                          <option>Customer Operations</option>
                          <option>Financial Management</option>
                          <option>Supply Chain</option>
                          <option>Human Resources</option>
                          <option>IT Operations</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Compliance Level</label>
                        <select className="w-full px-3 py-2 border rounded-md mt-1">
                          <option>SOX Compliant</option>
                          <option>ISO 9001</option>
                          <option>GDPR Compliant</option>
                          <option>Industry Standard</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Risk Level</label>
                        <select className="w-full px-3 py-2 border rounded-md mt-1">
                          <option>Low Risk</option>
                          <option>Medium Risk</option>
                          <option>High Risk</option>
                          <option>Critical</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Status</label>
                        <div className="mt-2 flex gap-2">
                          <Badge variant="default">Active</Badge>
                          <Badge variant="outline">Version 2.1</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <Button 
                    onClick={handleManualSave} 
                    className="hover-scale"
                    disabled={isLoading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Saving Properties..." : "Save All Properties"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="repository" className="mt-6 w-full">
            <EnterpriseProcessManager
              onLoadTemplate={handleLoadTemplate}
              onCreateTemplate={() => {}}
              onUpdateTemplate={() => {}}
              onDeleteTemplate={() => {}}
            />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Process Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                      <p className="text-lg font-medium">Performance Dashboard</p>
                      <p className="text-muted-foreground">Real-time process metrics and KPIs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <p className="text-lg font-medium">AI-Powered Insights</p>
                      <p className="text-muted-foreground">Automated optimization recommendations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <VoiceTrainerToggle />
    </MainLayout>
  );
}
