
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DatabaseBackup,
  FileKey,
  Link,
  Settings,
  ShieldCheck,
  Unlink,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface IntegrationSystem {
  id: string;
  name: string;
  type: "sap" | "database" | "api" | "workflow" | "other";
  status: "connected" | "disconnected" | "pending";
  lastSync?: string;
}

const integrations: IntegrationSystem[] = [
  {
    id: "sap-s4",
    name: "SAP S/4HANA",
    type: "sap",
    status: "connected",
    lastSync: "Today at 09:15 AM"
  },
  {
    id: "workflow-engine",
    name: "Process Workflow Engine",
    type: "workflow",
    status: "connected",
    lastSync: "Yesterday at 3:22 PM"
  },
  {
    id: "oracle-db",
    name: "Oracle Database",
    type: "database",
    status: "disconnected"
  },
  {
    id: "rest-api",
    name: "External REST API",
    type: "api",
    status: "pending"
  }
];

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
          <Card key={integration.id} className={integration.status === "disconnected" ? "opacity-70" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-base">{integration.name}</CardTitle>
                  <CardDescription>Integration Type: {integration.type.toUpperCase()}</CardDescription>
                </div>
                <Switch 
                  checked={activeIntegrations.includes(integration.id)}
                  onCheckedChange={(checked) => handleToggleIntegration(integration.id, checked)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={integration.status === "connected" ? "outline" : 
                              integration.status === "pending" ? "secondary" : "destructive"}
                      className={
                        integration.status === "connected" ? "bg-green-50 text-green-700" : 
                        integration.status === "pending" ? "bg-amber-50 text-amber-700" : 
                        "bg-red-50"
                      }
                    >
                      {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                    </Badge>
                    {integration.lastSync && (
                      <span className="text-xs text-muted-foreground">
                        Last sync: {integration.lastSync}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      disabled={integration.status !== "connected"}
                      onClick={() => handleSync(integration.id)}
                    >
                      <DatabaseBackup className="h-4 w-4 mr-1" />
                      Sync
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleConfigure(integration.id)}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Configure
                    </Button>
                  </div>
                </div>
                
                {integration.status === "connected" && (
                  <div className="bg-muted/50 p-2 rounded text-sm">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-green-600" />
                      <span>Secure connection established</span>
                    </div>
                  </div>
                )}
                
                {integration.status === "pending" && (
                  <div className="bg-muted/50 p-2 rounded text-sm">
                    <div className="flex items-center gap-2">
                      <FileKey className="h-4 w-4 text-amber-600" />
                      <span>Authentication pending. Configure credentials.</span>
                    </div>
                  </div>
                )}
                
                {integration.status === "disconnected" && (
                  <div className="bg-muted/50 p-2 rounded text-sm">
                    <div className="flex items-center gap-2">
                      <Unlink className="h-4 w-4 text-red-600" />
                      <span>Connection failed. Check settings and try again.</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
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
