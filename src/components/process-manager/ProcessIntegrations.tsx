
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { integrations } from "./integration/integrationData";
import { IntegrationCard } from "./integration/IntegrationCard";

export const ProcessIntegrations: React.FC = () => {
  const { toast } = useToast();
  const [activeIntegrations, setActiveIntegrations] = useState<string[]>(
    integrations.filter(i => i.status === "connected").map(i => i.id)
  );

  const handleToggleIntegration = (id: string, isActive: boolean) => {
    if (isActive) {
      setActiveIntegrations(prev => [...prev, id]);
      toast({
        title: "Integration Enabled",
        description: "The integration has been successfully enabled."
      });
    } else {
      setActiveIntegrations(prev => prev.filter(item => item !== id));
      toast({
        title: "Integration Disabled",
        description: "The integration has been disabled."
      });
    }
  };

  const handleSync = (id: string) => {
    toast({
      title: "Synchronization Started",
      description: "Integration synchronization is in progress."
    });
  };

  const handleConfigure = (id: string) => {
    toast({
      title: "Configure Integration",
      description: "Opening integration configuration settings."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Process Integrations</h3>
          <p className="text-sm text-muted-foreground">
            Connect your process model with external systems and applications
          </p>
        </div>
        <Button size="sm" className="gap-1">
          <Link className="h-4 w-4" />
          Add Integration
        </Button>
      </div>
      
      <Separator className="my-4" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <IntegrationCard 
            key={integration.id}
            integration={integration}
            isActive={activeIntegrations.includes(integration.id)}
            onToggle={handleToggleIntegration}
            onSync={handleSync}
            onConfigure={handleConfigure}
          />
        ))}
      </div>
      
      <Card className="bg-muted/30">
        <CardContent className="p-4 flex items-center justify-center">
          <Button variant="outline" className="gap-1">
            <Plus className="h-4 w-4" />
            Connect New System
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
