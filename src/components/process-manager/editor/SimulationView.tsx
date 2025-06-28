
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';

interface SimulationViewProps {
  elements: any[];
  connections: any[];
}

export const SimulationView: React.FC<SimulationViewProps> = ({
  elements,
  connections
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentElement, setCurrentElement] = useState<string | null>(null);

  const handleStart = () => {
    setIsRunning(true);
    setProgress(0);
    
    // Simulate process execution
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setProgress(0);
    setCurrentElement(null);
  };

  const handleReset = () => {
    handleStop();
  };

  return (
    <div className="h-full p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Process Simulation</h3>
          <p className="text-sm text-muted-foreground">
            Simulate process execution and analyze performance
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={handleStart}
            disabled={isRunning}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="h-4 w-4 mr-2" />
            Start
          </Button>
          <Button
            onClick={handlePause}
            disabled={!isRunning}
            variant="outline"
          >
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
          <Button
            onClick={handleStop}
            variant="outline"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Execution Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              {progress}% Complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Process Elements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{elements.length}</p>
            <p className="text-sm text-muted-foreground">Total Elements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{connections.length}</p>
            <p className="text-sm text-muted-foreground">Total Connections</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Performance Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">2.5s</p>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">95%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">24</p>
                  <p className="text-sm text-muted-foreground">Cases/Hour</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">0.5s</p>
                  <p className="text-sm text-muted-foreground">Wait Time</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
