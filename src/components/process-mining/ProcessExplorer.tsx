
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVoice } from "@/contexts/VoiceContext";
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

export const ProcessExplorer: React.FC = () => {
  const { speakText } = useVoice();
  const [selectedProcess, setSelectedProcess] = useState("order-to-cash");
  const [selectedView, setSelectedView] = useState("flowchart");

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
                    <SelectItem value="conformance">Conformance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
                {/* Process Flow Diagram */}
                <div className="w-full h-full p-4">
                  <div className="flex flex-col gap-4 h-full justify-center">
                    {/* Start Node */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                        S
                      </div>
                      <div className="flex-1 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded"></div>
                    </div>
                    
                    {/* Process Steps */}
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
                    
                    {/* End Node */}
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
    </div>
  );
};
