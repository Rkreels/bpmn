
import React from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export const SimulationView: React.FC = () => {
  return (
    <div className="border rounded-md bg-white p-6 flex-1">
      <h3 className="text-lg font-medium mb-4">Process Simulation</h3>
      
      <div className="mb-6">
        <p className="text-muted-foreground mb-4">Configure simulation parameters and run scenarios to analyze process performance.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Resource Configuration</h4>
            <p className="text-sm text-muted-foreground">Set the number of resources available for each activity.</p>
            <Button variant="outline" size="sm" className="mt-4">
              <Settings className="h-4 w-4 mr-2" />
              Configure Resources
            </Button>
          </div>
          
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Time Parameters</h4>
            <p className="text-sm text-muted-foreground">Set processing times, delays, and waiting times.</p>
            <Button variant="outline" size="sm" className="mt-4">
              <Settings className="h-4 w-4 mr-2" />
              Configure Times
            </Button>
          </div>
          
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Costs & Metrics</h4>
            <p className="text-sm text-muted-foreground">Define costs and KPIs to track during simulation.</p>
            <Button variant="outline" size="sm" className="mt-4">
              <Settings className="h-4 w-4 mr-2" />
              Configure Metrics
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <Button size="lg">
          Run Simulation
        </Button>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <h4 className="font-medium mb-4">Simulation Results</h4>
        <div className="flex items-center justify-center border rounded-md p-8 bg-muted/50">
          <p className="text-muted-foreground">Run a simulation to see results and analytics</p>
        </div>
      </div>
    </div>
  );
};
