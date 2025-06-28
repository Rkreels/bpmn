
import React, { useState, useEffect } from 'react';
import { BpmnElement, BpmnConnection } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Square, RotateCcw, Clock, TrendingUp } from 'lucide-react';

interface SimulationStep {
  elementId: string;
  timestamp: number;
  duration: number;
  status: 'pending' | 'active' | 'completed';
}

interface ProcessSimulatorProps {
  elements: BpmnElement[];
  connections: BpmnConnection[];
  onElementHighlight: (elementId: string | null) => void;
}

export const ProcessSimulator: React.FC<ProcessSimulatorProps> = ({
  elements,
  connections,
  onElementHighlight
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationSteps, setSimulationSteps] = useState<SimulationStep[]>([]);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState({
    totalDuration: 0,
    averageStepTime: 0,
    bottlenecks: [] as string[],
    efficiency: 0
  });

  useEffect(() => {
    if (isRunning && !isPaused && currentStep < simulationSteps.length) {
      const timer = setTimeout(() => {
        const step = simulationSteps[currentStep];
        
        // Highlight current element
        onElementHighlight(step.elementId);
        
        // Update step status
        setSimulationSteps(prev => prev.map((s, i) => 
          i === currentStep ? { ...s, status: 'completed' } : s
        ));
        
        setCurrentStep(prev => prev + 1);
        setProgress(((currentStep + 1) / simulationSteps.length) * 100);
        
      }, simulationSteps[currentStep]?.duration || 1000);

      return () => clearTimeout(timer);
    }
  }, [isRunning, isPaused, currentStep, simulationSteps, onElementHighlight]);

  const generateSimulationSteps = (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const visited = new Set<string>();
    
    // Find start events
    const startEvents = elements.filter(el => el.type === 'start-event');
    if (startEvents.length === 0) return [];

    // Simple breadth-first traversal for simulation
    const queue = [startEvents[0].id];
    let timestamp = 0;

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      if (visited.has(currentId)) continue;
      
      visited.add(currentId);
      const element = elements.find(el => el.id === currentId);
      if (!element) continue;

      // Calculate duration based on element type
      let duration = 1000; // Default 1 second
      switch (element.type) {
        case 'start-event':
        case 'end-event':
          duration = 500;
          break;
        case 'user-task':
          duration = 3000; // User tasks take longer
          break;
        case 'service-task':
          duration = 1500;
          break;
        case 'exclusive-gateway':
        case 'parallel-gateway':
          duration = 300;
          break;
      }

      steps.push({
        elementId: currentId,
        timestamp,
        duration,
        status: 'pending'
      });

      timestamp += duration;

      // Add connected elements to queue
      const outgoingConnections = connections.filter(conn => conn.source === currentId);
      outgoingConnections.forEach(conn => {
        if (!visited.has(conn.target)) {
          queue.push(conn.target);
        }
      });
    }

    return steps;
  };

  const startSimulation = () => {
    const steps = generateSimulationSteps();
    setSimulationSteps(steps);
    setCurrentStep(0);
    setProgress(0);
    setIsRunning(true);
    setIsPaused(false);
    
    // Calculate metrics
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    const averageStepTime = totalDuration / steps.length;
    const userTasks = steps.filter(step => {
      const element = elements.find(el => el.id === step.elementId);
      return element?.type === 'user-task';
    });
    
    setMetrics({
      totalDuration,
      averageStepTime,
      bottlenecks: userTasks.map(step => step.elementId),
      efficiency: Math.round((steps.length / (totalDuration / 1000)) * 100)
    });
  };

  const pauseSimulation = () => {
    setIsPaused(!isPaused);
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentStep(0);
    setProgress(0);
    onElementHighlight(null);
  };

  const resetSimulation = () => {
    stopSimulation();
    setSimulationSteps([]);
    setMetrics({
      totalDuration: 0,
      averageStepTime: 0,
      bottlenecks: [],
      efficiency: 0
    });
  };

  const formatDuration = (ms: number) => {
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Process Simulation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Button 
              onClick={startSimulation} 
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Start Simulation
            </Button>
            
            {isRunning && (
              <>
                <Button 
                  variant="outline" 
                  onClick={pauseSimulation}
                  className="flex items-center gap-2"
                >
                  <Pause className="h-4 w-4" />
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={stopSimulation}
                  className="flex items-center gap-2"
                >
                  <Square className="h-4 w-4" />
                  Stop
                </Button>
              </>
            )}
            
            <Button 
              variant="ghost" 
              onClick={resetSimulation}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress: {currentStep} / {simulationSteps.length}</span>
                <span>{progress.toFixed(1)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {metrics.totalDuration > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Simulation Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatDuration(metrics.totalDuration)}
                </div>
                <div className="text-xs text-muted-foreground">Total Duration</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatDuration(metrics.averageStepTime)}
                </div>
                <div className="text-xs text-muted-foreground">Avg Step Time</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {metrics.bottlenecks.length}
                </div>
                <div className="text-xs text-muted-foreground">Bottlenecks</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {metrics.efficiency}%
                </div>
                <div className="text-xs text-muted-foreground">Efficiency</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {simulationSteps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Simulation Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {simulationSteps.map((step, index) => {
                const element = elements.find(el => el.id === step.elementId);
                const isActive = index === currentStep - 1 && isRunning;
                const isCompleted = step.status === 'completed';
                
                return (
                  <div 
                    key={step.elementId} 
                    className={`flex items-center justify-between p-2 rounded border ${
                      isActive ? 'border-blue-500 bg-blue-50' : 
                      isCompleted ? 'border-green-500 bg-green-50' : 
                      'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        isActive ? 'default' : 
                        isCompleted ? 'outline' : 
                        'secondary'
                      }>
                        {index + 1}
                      </Badge>
                      <span className="font-medium">{element?.name || step.elementId}</span>
                      <Badge variant="outline">{element?.type}</Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDuration(step.duration)}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
