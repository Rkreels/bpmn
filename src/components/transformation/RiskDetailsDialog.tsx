
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Clock, DollarSign, Users, TrendingDown } from "lucide-react";

interface RiskDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  risk: any;
}

export const RiskDetailsDialog: React.FC<RiskDetailsDialogProps> = ({ 
  open, 
  onOpenChange, 
  risk 
}) => {
  if (!risk) return null;

  const mitigationActions = [
    { action: "Increase team size", status: "In Progress", progress: 60, owner: "John Smith" },
    { action: "Implement backup system", status: "Planned", progress: 0, owner: "Sarah Wilson" },
    { action: "Stakeholder alignment meeting", status: "Completed", progress: 100, owner: "Mike Johnson" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Risk Details: {risk.title}
          </DialogTitle>
          <DialogDescription>Comprehensive risk analysis and mitigation plan</DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
            <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Risk Category</h4>
                  <Badge variant="outline">{risk.category}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Severity</h4>
                  <Badge variant={risk.severity === "High" ? "destructive" : risk.severity === "Medium" ? "secondary" : "outline"}>
                    {risk.severity}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Probability</h4>
                  <div className="flex items-center gap-2">
                    <Progress value={risk.probability} className="flex-1" />
                    <span className="text-sm">{risk.probability}%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Affected Initiatives</h4>
                  <div className="space-y-1">
                    <div className="text-sm">Customer Experience Transformation</div>
                    <div className="text-sm">Process Automation Suite</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Risk Owner</h4>
                  <div className="text-sm">{risk.owner}</div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Last Updated</h4>
                  <div className="text-sm">{risk.lastUpdated}</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">
                {risk.description || "This risk involves potential delays in project delivery due to resource constraints and changing requirements. Early identification and proactive management are crucial for successful mitigation."}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="impact" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Clock className="h-8 w-8 text-blue-500" />
                  <div>
                    <h4 className="font-semibold">Timeline Impact</h4>
                    <p className="text-sm text-muted-foreground">Potential 2-3 week delay</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-500" />
                  <div>
                    <h4 className="font-semibold">Budget Impact</h4>
                    <p className="text-sm text-muted-foreground">Additional $50K - $75K</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Users className="h-8 w-8 text-purple-500" />
                  <div>
                    <h4 className="font-semibold">Resource Impact</h4>
                    <p className="text-sm text-muted-foreground">Need 3 additional team members</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <TrendingDown className="h-8 w-8 text-red-500" />
                  <div>
                    <h4 className="font-semibold">Quality Impact</h4>
                    <p className="text-sm text-muted-foreground">Potential scope reduction</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mitigation" className="space-y-4">
            <h4 className="font-semibold">Mitigation Actions</h4>
            <div className="space-y-3">
              {mitigationActions.map((action, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{action.action}</h5>
                    <Badge variant={
                      action.status === "Completed" ? "default" :
                      action.status === "In Progress" ? "secondary" : "outline"
                    }>
                      {action.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Progress value={action.progress} className="h-2" />
                    </div>
                    <span className="text-sm text-muted-foreground">{action.progress}%</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Owner: {action.owner}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-4">
            <h4 className="font-semibold">Risk Timeline</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 border-l-4 border-red-500 bg-red-50">
                <div className="text-sm font-medium">Day 1</div>
                <div className="text-sm">Risk identified during stakeholder review</div>
              </div>
              <div className="flex items-center gap-4 p-3 border-l-4 border-yellow-500 bg-yellow-50">
                <div className="text-sm font-medium">Day 3</div>
                <div className="text-sm">Initial mitigation plan developed</div>
              </div>
              <div className="flex items-center gap-4 p-3 border-l-4 border-blue-500 bg-blue-50">
                <div className="text-sm font-medium">Day 7</div>
                <div className="text-sm">Mitigation actions initiated</div>
              </div>
              <div className="flex items-center gap-4 p-3 border-l-4 border-green-500 bg-green-50">
                <div className="text-sm font-medium">Day 14</div>
                <div className="text-sm">Progress review scheduled</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button>Update Risk</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
