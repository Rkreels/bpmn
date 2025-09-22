import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Play, Pause, RotateCcw, BarChart3, TrendingUp, Clock, Users, AlertTriangle, Target, Settings } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface SimulationConfig {
  instances: number;
  duration: number; // in hours
  arrivalRate: number; // instances per hour
  resources: {
    [key: string]: {
      capacity: number;
      cost: number; // cost per hour
      efficiency: number; // 0-1
    };
  };
  scenarios: {
    name: string;
    probability: number;
    impact: {
      duration: number; // multiplier
      cost: number; // multiplier
      quality: number; // 0-1
    };
  }[];
}

interface SimulationResult {
  totalTime: number;
  totalCost: number;
  throughput: number;
  utilization: { [resource: string]: number };
  bottlenecks: string[];
  kpis: {
    avgCycleTime: number;
    avgWaitTime: number;
    avgProcessingTime: number;
    completionRate: number;
    qualityScore: number;
  };
  timeline: Array<{
    time: number;
    active: number;
    completed: number;
    waiting: number;
  }>;
  resourceMetrics: Array<{
    resource: string;
    utilization: number;
    cost: number;
    efficiency: number;
    bottleneckRisk: number;
  }>;
}

export const AdvancedBpmnSimulation: React.FC = () => {
  const { toast } = useToast();
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('config');
  const [results, setResults] = useState<SimulationResult | null>(null);
  
  const [config, setConfig] = useState<SimulationConfig>({
    instances: 1000,
    duration: 24,
    arrivalRate: 10,
    resources: {
      'Customer Service': { capacity: 5, cost: 50, efficiency: 0.85 },
      'Back Office': { capacity: 3, cost: 40, efficiency: 0.90 },
      'IT Systems': { capacity: 10, cost: 20, efficiency: 0.95 },
      'Management': { capacity: 2, cost: 100, efficiency: 0.80 }
    },
    scenarios: [
      { name: 'Normal Flow', probability: 0.7, impact: { duration: 1.0, cost: 1.0, quality: 0.95 } },
      { name: 'Exception Handling', probability: 0.2, impact: { duration: 1.5, cost: 1.3, quality: 0.85 } },
      { name: 'Escalation Required', probability: 0.1, impact: { duration: 2.0, cost: 1.8, quality: 0.90 } }
    ]
  });

  // Mock simulation data
  const timelineData = [
    { time: 0, active: 0, completed: 0, waiting: 0 },
    { time: 4, active: 25, completed: 15, waiting: 5 },
    { time: 8, active: 40, completed: 35, waiting: 12 },
    { time: 12, active: 35, completed: 65, waiting: 8 },
    { time: 16, active: 30, completed: 95, waiting: 6 },
    { time: 20, active: 20, completed: 120, waiting: 3 },
    { time: 24, active: 10, completed: 150, waiting: 1 }
  ];

  const resourceData = [
    { resource: 'Customer Service', utilization: 85, cost: 4250, efficiency: 85, bottleneckRisk: 90 },
    { resource: 'Back Office', utilization: 72, cost: 2880, efficiency: 90, bottleneckRisk: 60 },
    { resource: 'IT Systems', utilization: 45, cost: 2160, efficiency: 95, bottleneckRisk: 20 },
    { resource: 'Management', utilization: 60, cost: 2400, efficiency: 80, bottleneckRisk: 40 }
  ];

  const costBreakdown = [
    { name: 'Customer Service', value: 4250, color: '#3b82f6' },
    { name: 'Back Office', value: 2880, color: '#ef4444' },
    { name: 'IT Systems', value: 2160, color: '#10b981' },
    { name: 'Management', value: 2400, color: '#f59e0b' }
  ];

  const runSimulation = async () => {
    setIsSimulating(true);
    setSimulationProgress(0);
    setActiveTab('results');

    // Simulate progress
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          
          // Generate mock results
          setResults({
            totalTime: 24,
            totalCost: 11690,
            throughput: 6.25,
            utilization: { 'Customer Service': 85, 'Back Office': 72, 'IT Systems': 45, 'Management': 60 },
            bottlenecks: ['Customer Service'],
            kpis: {
              avgCycleTime: 3.8,
              avgWaitTime: 1.2,
              avgProcessingTime: 2.6,
              completionRate: 94.5,
              qualityScore: 92.3
            },
            timeline: timelineData,
            resourceMetrics: resourceData
          });

          toast({
            title: "Simulation Complete",
            description: "Process simulation has finished successfully. Review the results below.",
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const updateResourceConfig = (resource: string, field: string, value: number) => {
    setConfig(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        [resource]: {
          ...prev.resources[resource],
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Process Simulation</h2>
          <p className="text-muted-foreground">Advanced Monte Carlo simulation with resource optimization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled={isSimulating}>
            <Settings className="w-4 h-4 mr-2" />
            Import Config
          </Button>
          <Button onClick={runSimulation} disabled={isSimulating}>
            {isSimulating ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Simulating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Simulation
              </>
            )}
          </Button>
        </div>
      </div>

      {isSimulating && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Simulation Progress</span>
                <span className="text-sm text-muted-foreground">{simulationProgress}%</span>
              </div>
              <Progress value={simulationProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Running Monte Carlo simulation with {config.instances} instances...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="results" disabled={!results}>Results</TabsTrigger>
          <TabsTrigger value="optimization" disabled={!results}>Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Simulation Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Number of Instances</Label>
                  <Input 
                    type="number" 
                    value={config.instances}
                    onChange={(e) => setConfig(prev => ({ ...prev, instances: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label>Duration (hours)</Label>
                  <Input 
                    type="number" 
                    value={config.duration}
                    onChange={(e) => setConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label>Arrival Rate (per hour)</Label>
                  <Input 
                    type="number" 
                    value={config.arrivalRate}
                    onChange={(e) => setConfig(prev => ({ ...prev, arrivalRate: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resource Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(config.resources).map(([resource, settings]) => (
                  <div key={resource} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">{resource}</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Capacity</Label>
                        <Input 
                          type="number" 
                          value={settings.capacity}
                          onChange={(e) => updateResourceConfig(resource, 'capacity', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Cost per Hour ($)</Label>
                        <Input 
                          type="number" 
                          value={settings.cost}
                          onChange={(e) => updateResourceConfig(resource, 'cost', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Efficiency (%)</Label>
                        <div className="space-y-2">
                          <Slider
                            value={[settings.efficiency * 100]}
                            onValueChange={([value]) => updateResourceConfig(resource, 'efficiency', value / 100)}
                            max={100}
                            min={0}
                            step={5}
                          />
                          <span className="text-sm text-muted-foreground">{Math.round(settings.efficiency * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Process Scenarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {config.scenarios.map((scenario, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{scenario.name}</h4>
                      <Badge variant="outline">{Math.round(scenario.probability * 100)}% probability</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Duration Impact</Label>
                        <p className="text-sm text-muted-foreground">{scenario.impact.duration}x multiplier</p>
                      </div>
                      <div>
                        <Label>Cost Impact</Label>
                        <p className="text-sm text-muted-foreground">{scenario.impact.cost}x multiplier</p>
                      </div>
                      <div>
                        <Label>Quality Score</Label>
                        <p className="text-sm text-muted-foreground">{Math.round(scenario.impact.quality * 100)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {results && (
            <>
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Clock className="w-8 h-8 text-blue-500 mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Cycle Time</p>
                        <p className="text-2xl font-bold">{results.kpis.avgCycleTime}h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Users className="w-8 h-8 text-green-500 mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Throughput</p>
                        <p className="text-2xl font-bold">{results.throughput}/h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <TrendingUp className="w-8 h-8 text-orange-500 mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Cost</p>
                        <p className="text-2xl font-bold">${results.totalCost.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Target className="w-8 h-8 text-purple-500 mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Quality Score</p>
                        <p className="text-2xl font-bold">{results.kpis.qualityScore}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Instance Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={timelineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="active" stroke="#3b82f6" name="Active" />
                        <Line type="monotone" dataKey="completed" stroke="#10b981" name="Completed" />
                        <Line type="monotone" dataKey="waiting" stroke="#f59e0b" name="Waiting" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={costBreakdown}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {costBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={resourceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="resource" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="utilization" fill="#3b82f6" name="Utilization %" />
                      <Bar dataKey="bottleneckRisk" fill="#ef4444" name="Bottleneck Risk %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {results.bottlenecks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      Identified Bottlenecks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {results.bottlenecks.map((bottleneck, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                          <span className="font-semibold text-red-800">{bottleneck}</span>
                          <Badge variant="destructive">High Impact</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          {results && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-blue-800">Increase Customer Service Capacity</h4>
                      <p className="text-sm text-muted-foreground">
                        Adding 2 more customer service representatives could reduce cycle time by 25% and eliminate the main bottleneck.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">Cost Impact: +$2,400</Badge>
                        <Badge variant="outline">Time Reduction: -25%</Badge>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-green-800">Automate IT System Tasks</h4>
                      <p className="text-sm text-muted-foreground">
                        Implementing automation for routine IT tasks could improve efficiency and reduce processing time.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">Cost Impact: -$500</Badge>
                        <Badge variant="outline">Efficiency: +15%</Badge>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold text-orange-800">Optimize Resource Scheduling</h4>
                      <p className="text-sm text-muted-foreground">
                        Implementing dynamic resource allocation could improve overall utilization by 12%.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">Cost Impact: Neutral</Badge>
                        <Badge variant="outline">Utilization: +12%</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What-If Scenarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Current State</h4>
                      <div className="space-y-1 text-sm">
                        <p>Cycle Time: {results.kpis.avgCycleTime}h</p>
                        <p>Cost: ${results.totalCost.toLocaleString()}</p>
                        <p>Quality: {results.kpis.qualityScore}%</p>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 bg-blue-50">
                      <h4 className="font-semibold mb-2">Optimized</h4>
                      <div className="space-y-1 text-sm">
                        <p>Cycle Time: 2.9h <span className="text-green-600">(-24%)</span></p>
                        <p>Cost: $13,590 <span className="text-red-600">(+16%)</span></p>
                        <p>Quality: 96% <span className="text-green-600">(+4%)</span></p>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 bg-green-50">
                      <h4 className="font-semibold mb-2">Automated</h4>
                      <div className="space-y-1 text-sm">
                        <p>Cycle Time: 3.2h <span className="text-green-600">(-16%)</span></p>
                        <p>Cost: $9,890 <span className="text-green-600">(-15%)</span></p>
                        <p>Quality: 98% <span className="text-green-600">(+6%)</span></p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};