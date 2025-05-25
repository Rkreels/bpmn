import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { ProcessFilterDialog } from "./ProcessFilterDialog";
import { ProcessSimulation } from "./ProcessSimulation";
import { 
  GitBranch, 
  Activity, 
  Clock, 
  Users, 
  AlertTriangle,
  TrendingUp,
  Filter,
  Download,
  Search,
  Eye,
  Play
} from "lucide-react";

interface FilterCriteria {
  timeRange: string;
  activities: string[];
  performance: string;
  frequency: { min: number; max: number };
  duration: { min: number; max: number };
  variants: string[];
}

export const ProcessExplorer: React.FC = () => {
  const { speakText } = useVoice();
  const { toast } = useToast();
  const [selectedProcess, setSelectedProcess] = useState("order-to-cash");
  const [selectedView, setSelectedView] = useState("flowchart");
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterCriteria>({
    timeRange: "all",
    activities: [],
    performance: "all",
    frequency: { min: 0, max: 1000 },
    duration: { min: 0, max: 48 },
    variants: []
  });

  const processVariants = [
    { 
      id: "variant-1", 
      name: "Standard Path", 
      frequency: "68%", 
      avgDuration: "3.2 days",
      cases: 2456,
      performance: "good"
    },
    { 
      id: "variant-2", 
      name: "Approval Required", 
      frequency: "22%", 
      avgDuration: "5.8 days",
      cases: 795,
      performance: "moderate"
    },
    { 
      id: "variant-3", 
      name: "Exception Handling", 
      frequency: "8%", 
      avgDuration: "12.1 days",
      cases: 289,
      performance: "poor"
    },
    { 
      id: "variant-4", 
      name: "Rush Processing", 
      frequency: "2%", 
      avgDuration: "0.8 days",
      cases: 72,
      performance: "excellent"
    }
  ];

  const processSteps = [
    { id: "step-1", name: "Order Received", frequency: "100%", avgTime: "0.1h", bottleneck: false },
    { id: "step-2", name: "Credit Check", frequency: "98%", avgTime: "2.3h", bottleneck: true },
    { id: "step-3", name: "Inventory Check", frequency: "95%", avgTime: "0.5h", bottleneck: false },
    { id: "step-4", name: "Order Approval", frequency: "85%", avgTime: "4.7h", bottleneck: true },
    { id: "step-5", name: "Production Planning", frequency: "82%", avgTime: "1.2h", bottleneck: false },
    { id: "step-6", name: "Manufacturing", frequency: "80%", avgTime: "24.5h", bottleneck: false },
    { id: "step-7", name: "Quality Control", frequency: "78%", avgTime: "3.1h", bottleneck: false },
    { id: "step-8", name: "Shipping", frequency: "75%", avgTime: "2.8h", bottleneck: false },
    { id: "step-9", name: "Delivery", frequency: "72%", avgTime: "6.2h", bottleneck: false },
    { id: "step-10", name: "Invoice Sent", frequency: "70%", avgTime: "0.3h", bottleneck: false }
  ];

  const handleApplyFilters = (filters: FilterCriteria) => {
    setActiveFilters(filters);
    toast({
      title: "Filters Applied",
      description: "Process data has been filtered according to your criteria"
    });
    console.log("Applied filters:", filters);
  };

  const handleExportData = () => {
    const exportData = {
      process: selectedProcess,
      view: selectedView,
      filters: activeFilters,
      variants: processVariants,
      steps: processSteps,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `process-explorer-${selectedProcess}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data Exported",
      description: "Process exploration data has been downloaded"
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.timeRange !== "all") count++;
    if (activeFilters.performance !== "all") count++;
    if (activeFilters.activities.length > 0) count++;
    if (activeFilters.variants.length > 0) count++;
    return count;
  };

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Process Explorer. Discover and analyze your actual process flows based on event log data. Explore process variants, identify bottlenecks, and understand how work really flows through your organization.")}
    >
      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Process</label>
                <Select value={selectedProcess} onValueChange={setSelectedProcess}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="order-to-cash">Order to Cash</SelectItem>
                    <SelectItem value="purchase-to-pay">Purchase to Pay</SelectItem>
                    <SelectItem value="issue-to-resolution">Issue to Resolution</SelectItem>
                    <SelectItem value="hire-to-retire">Hire to Retire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">View</label>
                <Select value={selectedView} onValueChange={setSelectedView}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flowchart">Flowchart</SelectItem>
                    <SelectItem value="variants">Variants</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="simulation">Simulation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowFilterDialog(true)}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
                {getActiveFilterCount() > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {getActiveFilterCount() > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeFilters.timeRange !== "all" && (
                <Badge variant="outline">Time: {activeFilters.timeRange}</Badge>
              )}
              {activeFilters.performance !== "all" && (
                <Badge variant="outline">Performance: {activeFilters.performance}</Badge>
              )}
              {activeFilters.activities.map(activity => (
                <Badge key={activity} variant="secondary">{activity}</Badge>
              ))}
              {activeFilters.variants.map(variant => (
                <Badge key={variant} variant="outline">{variant}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs value={selectedView} onValueChange={setSelectedView}>
        <TabsContent value="flowchart">
          {/* Process Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Process Flow Visualization
                  </CardTitle>
                  <CardDescription>
                    Discovered process model based on {processSteps.reduce((sum, step) => sum + parseInt(step.frequency), 0)}% of cases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="w-full h-full p-4">
                      <div className="flex flex-col gap-4 h-full justify-center">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                            S
                          </div>
                          <div className="flex-1 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded"></div>
                        </div>
                        
                        <div className="grid grid-cols-5 gap-2">
                          {processSteps.slice(0, 5).map((step, index) => (
                            <div key={step.id} className="text-center">
                              <div className={`w-16 h-12 rounded border-2 flex items-center justify-center text-xs font-medium mb-1 ${
                                step.bottleneck ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'
                              }`}>
                                {step.name.split(' ')[0]}
                              </div>
                              <div className="text-xs text-muted-foreground">{step.frequency}</div>
                              {step.bottleneck && <AlertTriangle className="h-3 w-3 text-red-500 mx-auto" />}
                            </div>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-5 gap-2">
                          {processSteps.slice(5).map((step, index) => (
                            <div key={step.id} className="text-center">
                              <div className={`w-16 h-12 rounded border-2 flex items-center justify-center text-xs font-medium mb-1 ${
                                step.bottleneck ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'
                              }`}>
                                {step.name.split(' ')[0]}
                              </div>
                              <div className="text-xs text-muted-foreground">{step.frequency}</div>
                              {step.bottleneck && <AlertTriangle className="h-3 w-3 text-red-500 mx-auto" />}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-2 bg-gradient-to-r from-blue-500 to-red-500 rounded"></div>
                          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                            E
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 right-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Full View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Process Variants */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Process Variants
                  </CardTitle>
                  <CardDescription>
                    Different paths through the process
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {processVariants.map((variant) => (
                    <div key={variant.id} className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{variant.name}</h4>
                        <Badge variant={
                          variant.performance === "excellent" ? "default" :
                          variant.performance === "good" ? "secondary" :
                          variant.performance === "moderate" ? "outline" : "destructive"
                        }>
                          {variant.performance}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div>
                          <div className="font-medium">{variant.frequency}</div>
                          <div>Frequency</div>
                        </div>
                        <div>
                          <div className="font-medium">{variant.avgDuration}</div>
                          <div>Avg Duration</div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {variant.cases.toLocaleString()} cases
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Explore All Variants
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="simulation">
          <ProcessSimulation />
        </TabsContent>

        <TabsContent value="variants">
          <Card>
            <CardHeader>
              <CardTitle>Process Variants Analysis</CardTitle>
              <CardDescription>Detailed analysis of different process execution paths</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4" />
                <p>Variant analysis view will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription>Process performance metrics and bottleneck analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                <p>Performance analysis view will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Process Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <h3 className="font-medium text-sm">Total Cases</h3>
            </div>
            <div className="text-2xl font-bold">3,612</div>
            <div className="text-xs text-muted-foreground">+156 this week</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-green-500" />
              <h3 className="font-medium text-sm">Avg Duration</h3>
            </div>
            <div className="text-2xl font-bold">4.7 days</div>
            <div className="text-xs text-muted-foreground">-0.3 from last week</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <h3 className="font-medium text-sm">Process Variants</h3>
            </div>
            <div className="text-2xl font-bold">24</div>
            <div className="text-xs text-muted-foreground">12 common paths</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <h3 className="font-medium text-sm">Bottlenecks</h3>
            </div>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-muted-foreground">Critical issues found</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Dialog */}
      <ProcessFilterDialog
        open={showFilterDialog}
        onOpenChange={setShowFilterDialog}
        onApplyFilters={handleApplyFilters}
        currentFilters={activeFilters}
      />
    </div>
  );
};
