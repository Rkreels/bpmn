
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack,
  Save,
  Clock,
  Users,
  Wallet,
  BarChart,
  Download,
  RefreshCw
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SimulationView: React.FC = () => {
  const { toast } = useToast();
  const { isVoiceEnabled, speakText } = useVoice();
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [simulationTime, setSimulationTime] = useState(0);
  const [showMetrics, setShowMetrics] = useState(true);
  const [resources, setResources] = useState({
    operators: 5,
    supervisors: 2,
    managers: 1
  });
  const [parameters, setParameters] = useState({
    processingTime: 5,
    arrivalRate: 10,
    queueCapacity: 20
  });
  
  const handleStartSimulation = () => {
    setIsSimulationRunning(true);
    
    toast({
      title: "Simulation Started",
      description: "Process simulation is now running."
    });
    
    if (isVoiceEnabled) {
      speakText("Process simulation started");
    }
    
    // In a real implementation, this would start the simulation engine
    // For demo purposes, we'll just increment the time counter
    const simulationInterval = setInterval(() => {
      setSimulationTime(prev => {
        const newTime = prev + simulationSpeed;
        return newTime >= 100 ? 100 : newTime;
      });
    }, 1000);
    
    // Stop the simulation when it reaches 100%
    setTimeout(() => {
      clearInterval(simulationInterval);
      setIsSimulationRunning(false);
      
      toast({
        title: "Simulation Complete",
        description: "Process simulation has completed."
      });
      
      if (isVoiceEnabled) {
        speakText("Process simulation completed");
      }
    }, (100 - simulationTime) * 1000 / simulationSpeed);
  };
  
  const handlePauseSimulation = () => {
    setIsSimulationRunning(false);
    
    toast({
      title: "Simulation Paused",
      description: "Process simulation has been paused."
    });
    
    if (isVoiceEnabled) {
      speakText("Simulation paused");
    }
  };
  
  const handleResetSimulation = () => {
    setSimulationTime(0);
    setIsSimulationRunning(false);
    
    toast({
      title: "Simulation Reset",
      description: "Process simulation has been reset."
    });
    
    if (isVoiceEnabled) {
      speakText("Simulation reset");
    }
  };
  
  const handleSpeedChange = (values: number[]) => {
    const newSpeed = values[0];
    setSimulationSpeed(newSpeed);
    
    toast({
      title: "Simulation Speed",
      description: `Simulation speed set to ${newSpeed}x.`
    });
  };
  
  const handleExportResults = () => {
    toast({
      title: "Results Exported",
      description: "Simulation results have been exported to CSV."
    });
    
    if (isVoiceEnabled) {
      speakText("Simulation results exported successfully");
    }
    
    // In a real implementation, this would generate a CSV or Excel file
  };
  
  const handleResourceChange = (
    key: keyof typeof resources,
    value: number
  ) => {
    setResources(prev => ({ ...prev, [key]: value }));
  };
  
  const handleParameterChange = (
    key: keyof typeof parameters,
    value: number
  ) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="border rounded-md bg-white p-6 flex-1 overflow-auto">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Process Simulation</h3>
            <p className="text-muted-foreground mb-4">Configure parameters and run a simulation to analyze process performance and bottlenecks.</p>
            
            <div className="flex items-center gap-4 mb-6">
              {!isSimulationRunning ? (
                <Button 
                  onClick={handleStartSimulation} 
                  className="gap-1"
                  disabled={simulationTime >= 100}
                >
                  <Play className="h-4 w-4" />
                  Start Simulation
                </Button>
              ) : (
                <Button 
                  onClick={handlePauseSimulation} 
                  variant="outline"
                  className="gap-1"
                >
                  <Pause className="h-4 w-4" />
                  Pause
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={handleResetSimulation}
                className="gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>
              <div className="flex items-center gap-2 ml-4">
                <Label className="text-sm">Speed:</Label>
                <div className="w-40">
                  <Slider
                    defaultValue={[1]}
                    min={0.5}
                    max={5}
                    step={0.5}
                    value={[simulationSpeed]}
                    onValueChange={handleSpeedChange}
                  />
                </div>
                <span className="text-sm font-medium">{simulationSpeed}x</span>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Label className="text-sm">Show Metrics</Label>
                <Switch
                  checked={showMetrics}
                  onCheckedChange={setShowMetrics}
                />
              </div>
            </div>
            
            {/* Simulation Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Simulation Progress</span>
                <span className="text-sm font-medium">{simulationTime}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full bg-primary transition-all"
                  style={{ width: `${simulationTime}%` }}
                ></div>
              </div>
            </div>
            
            {/* Simulation Canvas */}
            <div className="border rounded-md bg-slate-50 p-4 h-[300px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Simulation visualization will appear here when running</p>
                <p className="text-xs text-muted-foreground mt-2">Shows process execution with token flow animation</p>
              </div>
            </div>
          </div>
          
          {/* Results Section */}
          {simulationTime > 0 && showMetrics && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Simulation Results</h3>
                <Button variant="outline" size="sm" onClick={handleExportResults}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Processing Times
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Avg. Cycle Time:</span>
                        <span className="font-medium">15.2 min</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Avg. Wait Time:</span>
                        <span className="font-medium">8.7 min</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Avg. Processing Time:</span>
                        <span className="font-medium">6.5 min</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Resource Utilization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Operators:</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Supervisors:</span>
                        <span className="font-medium">62%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Managers:</span>
                        <span className="font-medium">45%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <BarChart className="h-4 w-4 mr-2" />
                      Process Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Completed:</span>
                        <span className="font-medium">{Math.floor(simulationTime * 1.2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Average Throughput:</span>
                        <span className="font-medium">{(simulationTime * 0.12).toFixed(1)} per min</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Bottlenecks:</span>
                        <span className="font-medium">2 identified</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {simulationTime >= 100 && (
                <Card className="mt-4 border-2 border-green-200">
                  <CardHeader className="py-4 bg-green-50">
                    <CardTitle className="text-sm font-medium flex items-center text-green-700">
                      <BarChart className="h-4 w-4 mr-2" />
                      Optimization Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs font-bold text-amber-800">1</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Increase resources for "Process Order" task</p>
                          <p className="text-xs text-muted-foreground">This task shows high queue times and resource utilization above 85%.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs font-bold text-amber-800">2</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Optimize gateway decisions in "Approval" flow</p>
                          <p className="text-xs text-muted-foreground">Consider automating decisions to reduce wait times and improve throughput.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
        
        {/* Parameters Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Simulation Parameters</CardTitle>
              <CardDescription>Configure resources and process settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Resource Configuration */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Resource Configuration
                </h4>
                <div className="space-y-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="operators" className="text-xs flex justify-between">
                      <span>Operators</span>
                      <span className="text-muted-foreground">{resources.operators}</span>
                    </Label>
                    <Input
                      type="number"
                      id="operators"
                      min={1}
                      max={20}
                      value={resources.operators}
                      onChange={(e) => handleResourceChange('operators', parseInt(e.target.value))}
                      className="h-8"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="supervisors" className="text-xs flex justify-between">
                      <span>Supervisors</span>
                      <span className="text-muted-foreground">{resources.supervisors}</span>
                    </Label>
                    <Input
                      type="number"
                      id="supervisors"
                      min={0}
                      max={10}
                      value={resources.supervisors}
                      onChange={(e) => handleResourceChange('supervisors', parseInt(e.target.value))}
                      className="h-8"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="managers" className="text-xs flex justify-between">
                      <span>Managers</span>
                      <span className="text-muted-foreground">{resources.managers}</span>
                    </Label>
                    <Input
                      type="number"
                      id="managers"
                      min={0}
                      max={5}
                      value={resources.managers}
                      onChange={(e) => handleResourceChange('managers', parseInt(e.target.value))}
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Process Parameters
                </h4>
                <div className="space-y-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="processingTime" className="text-xs flex justify-between">
                      <span>Avg. Processing Time (min)</span>
                      <span className="text-muted-foreground">{parameters.processingTime}</span>
                    </Label>
                    <Input
                      type="number"
                      id="processingTime"
                      min={1}
                      max={60}
                      value={parameters.processingTime}
                      onChange={(e) => handleParameterChange('processingTime', parseInt(e.target.value))}
                      className="h-8"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="arrivalRate" className="text-xs flex justify-between">
                      <span>Arrival Rate (per hour)</span>
                      <span className="text-muted-foreground">{parameters.arrivalRate}</span>
                    </Label>
                    <Input
                      type="number"
                      id="arrivalRate"
                      min={1}
                      max={100}
                      value={parameters.arrivalRate}
                      onChange={(e) => handleParameterChange('arrivalRate', parseInt(e.target.value))}
                      className="h-8"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="queueCapacity" className="text-xs flex justify-between">
                      <span>Queue Capacity</span>
                      <span className="text-muted-foreground">{parameters.queueCapacity}</span>
                    </Label>
                    <Input
                      type="number"
                      id="queueCapacity"
                      min={5}
                      max={100}
                      value={parameters.queueCapacity}
                      onChange={(e) => handleParameterChange('queueCapacity', parseInt(e.target.value))}
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <Wallet className="h-4 w-4 mr-2" />
                  Cost Parameters
                </h4>
                <div className="space-y-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="costModel" className="text-xs">Cost Model</Label>
                    <Select defaultValue="resource-based">
                      <SelectTrigger id="costModel" className="h-8">
                        <SelectValue placeholder="Select cost model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="resource-based">Resource Based</SelectItem>
                        <SelectItem value="activity-based">Activity Based</SelectItem>
                        <SelectItem value="time-based">Time Based</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="currency" className="text-xs">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger id="currency" className="h-8">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Parameters Saved",
                    description: "Simulation parameters have been saved."
                  });
                  
                  if (isVoiceEnabled) {
                    speakText("Simulation parameters saved");
                  }
                }}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Parameters
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
