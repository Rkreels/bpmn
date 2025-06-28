
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Play, Pause, RotateCcw, Activity, Clock, Users, AlertTriangle } from "lucide-react";

interface SimulationResult {
  elementId: string;
  elementName: string;
  executionTime: number;
  throughput: number;
  utilizationRate: number;
  bottleneck: boolean;
}

export const SimulationView: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [currentStep, setCurrentStep] = useState("");

  // Mock simulation data
  const mockResults: SimulationResult[] = [
    {
      elementId: "task-001",
      elementName: "Initial Document Review",
      executionTime: 45,
      throughput: 12,
      utilizationRate: 85,
      bottleneck: false
    },
    {
      elementId: "task-003",
      elementName: "KYC Verification",
      executionTime: 120,
      throughput: 8,
      utilizationRate: 95,
      bottleneck: true
    },
    {
      elementId: "task-004",
      elementName: "Manual Review",
      executionTime: 180,
      throughput: 5,
      utilizationRate: 78,
      bottleneck: true
    },
    {
      elementId: "task-005",
      elementName: "Create Customer Account",
      executionTime: 30,
      throughput: 15,
      utilizationRate: 65,
      bottleneck: false
    }
  ];

  const throughputData = [
    { time: "09:00", throughput: 5 },
    { time: "10:00", throughput: 8 },
    { time: "11:00", throughput: 12 },
    { time: "12:00", throughput: 15 },
    { time: "13:00", throughput: 10 },
    { time: "14:00", throughput: 7 },
    { time: "15:00", throughput: 9 }
  ];

  const utilizationData = [
    { name: "High (>90%)", value: 15, color: "#ef4444" },
    { name: "Medium (70-90%)", value: 45, color: "#f59e0b" },
    { name: "Low (<70%)", value: 40, color: "#10b981" }
  ];

  const runSimulation = async () => {
    setIsRunning(true);
    setProgress(0);
    setSimulationResults([]);
    
    const steps = [
      "Initializing simulation...",
      "Processing start events...",
      "Analyzing task execution...",
      "Evaluating gateways...",
      "Calculating throughput...",
      "Identifying bottlenecks...",
      "Generating report..."
    ];
    
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setProgress((i + 1) / steps.length * 100);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    setSimulationResults(mockResults);
    setCurrentStep("Simulation completed");
    setIsRunning(false);
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setProgress(0);
    setCurrentStep("");
  };

  const resetSimulation = () => {
    setProgress(0);
    setSimulationResults([]);
    setCurrentStep("");
  };

  return (
    <div className="space-y-6 p-4">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Process Simulation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button 
              onClick={runSimulation} 
              disabled={isRunning}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              {isRunning ? "Running..." : "Start Simulation"}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={stopSimulation}
              disabled={!isRunning}
              className="gap-2"
            >
              <Pause className="h-4 w-4" />
              Stop
            </Button>
            
            <Button 
              variant="outline" 
              onClick={resetSimulation}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
          
          {(isRunning || progress > 0) && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{currentStep}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {simulationResults.length > 0 && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Cycle Time</p>
                    <p className="text-2xl font-bold">94 min</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Throughput</p>
                    <p className="text-2xl font-bold">10/hr</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Utilization</p>
                    <p className="text-2xl font-bold">81%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bottlenecks</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Execution Times */}
            <Card>
              <CardHeader>
                <CardTitle>Task Execution Times</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    executionTime: { label: "Execution Time (min)", color: "#3b82f6" }
                  }}
                  className="h-64"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={simulationResults}>
                      <XAxis dataKey="elementName" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="executionTime" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Throughput Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Throughput Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    throughput: { label: "Cases/Hour", color: "#10b981" }
                  }}
                  className="h-64"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={throughputData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="throughput" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Task Analysis Table */}
          <Card>
            <CardHeader>
              <CardTitle>Task Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Task</th>
                      <th className="text-right p-2">Execution Time</th>
                      <th className="text-right p-2">Throughput</th>
                      <th className="text-right p-2">Utilization</th>
                      <th className="text-center p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simulationResults.map((result) => (
                      <tr key={result.elementId} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{result.elementName}</td>
                        <td className="p-2 text-right">{result.executionTime} min</td>
                        <td className="p-2 text-right">{result.throughput}/hr</td>
                        <td className="p-2 text-right">{result.utilizationRate}%</td>
                        <td className="p-2 text-center">
                          {result.bottleneck ? (
                            <Badge variant="destructive" className="text-xs">
                              Bottleneck
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              Normal
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
