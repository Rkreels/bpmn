
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertTriangle, 
  Eye, 
  TrendingUp,
  Shield,
  Clock,
  DollarSign
} from "lucide-react";

export const RiskManagement: React.FC = () => {
  const { speakText } = useVoice();
  const { toast } = useToast();
  const [selectedRisk, setSelectedRisk] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const risks = [
    {
      id: "risk-001",
      title: "Budget Overrun Risk",
      severity: "High",
      impact: "High",
      probability: "Medium",
      category: "Financial",
      description: "Project costs exceeding allocated budget by 20%",
      mitigation: "Implement strict budget monitoring and approval processes",
      owner: "Sarah Chen",
      status: "Open",
      dueDate: "2024-02-15"
    },
    {
      id: "risk-002",
      title: "Resource Availability",
      severity: "Medium",
      impact: "Medium",
      probability: "High",
      category: "Resource",
      description: "Key technical resources may not be available during critical phases",
      mitigation: "Cross-train team members and establish backup resource pool",
      owner: "Mike Rodriguez",
      status: "Mitigating",
      dueDate: "2024-01-30"
    },
    {
      id: "risk-003",
      title: "Technology Integration",
      severity: "High",
      impact: "High",
      probability: "Low",
      category: "Technical",
      description: "Legacy systems may not integrate properly with new platforms",
      mitigation: "Conduct thorough integration testing and develop fallback plans",
      owner: "Lisa Wang",
      status: "Open",
      dueDate: "2024-03-01"
    }
  ];

  const handleViewDetails = (risk: any) => {
    setSelectedRisk(risk);
    setIsViewOpen(true);
    speakText(`Viewing details for ${risk.title}`);
    toast({
      title: "Risk Details",
      description: `Opening detailed view for ${risk.title}`
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-red-100 text-red-800";
      case "Mitigating": return "bg-yellow-100 text-yellow-800";
      case "Closed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Risk Management. Identify, assess, and mitigate risks across your transformation portfolio. Monitor risk levels and ensure proactive risk management.")}
    >
      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <h3 className="font-medium text-sm">High Risk</h3>
            </div>
            <div className="text-2xl font-bold">2</div>
            <div className="text-xs text-muted-foreground">Requires immediate attention</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <h3 className="font-medium text-sm">Medium Risk</h3>
            </div>
            <div className="text-2xl font-bold">1</div>
            <div className="text-xs text-muted-foreground">Monitor closely</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-green-500" />
              <h3 className="font-medium text-sm">Low Risk</h3>
            </div>
            <div className="text-2xl font-bold">0</div>
            <div className="text-xs text-muted-foreground">Under control</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <h3 className="font-medium text-sm">Risk Score</h3>
            </div>
            <div className="text-2xl font-bold">7.2</div>
            <div className="text-xs text-muted-foreground">Out of 10</div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Register */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Register
          </CardTitle>
          <CardDescription>Active risks and their mitigation strategies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Risk</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-center p-3">Severity</th>
                  <th className="text-center p-3">Status</th>
                  <th className="text-left p-3">Owner</th>
                  <th className="text-center p-3">Due Date</th>
                  <th className="text-center p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((risk) => (
                  <tr key={risk.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{risk.title}</div>
                        <div className="text-sm text-muted-foreground">{risk.description}</div>
                      </div>
                    </td>
                    <td className="p-3">{risk.category}</td>
                    <td className="p-3 text-center">
                      <Badge className={getSeverityColor(risk.severity)}>
                        {risk.severity}
                      </Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Badge className={getStatusColor(risk.status)}>
                        {risk.status}
                      </Badge>
                    </td>
                    <td className="p-3">{risk.owner}</td>
                    <td className="p-3 text-center">{new Date(risk.dueDate).toLocaleDateString()}</td>
                    <td className="p-3 text-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(risk)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Risk Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Risk Details</DialogTitle>
            <DialogDescription>Comprehensive risk information and mitigation strategy</DialogDescription>
          </DialogHeader>
          {selectedRisk && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <h3 className="font-semibold text-lg">{selectedRisk.title}</h3>
                <p className="text-muted-foreground">{selectedRisk.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <p>{selectedRisk.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Owner</label>
                  <p>{selectedRisk.owner}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Severity</label>
                  <Badge className={getSeverityColor(selectedRisk.severity)}>
                    {selectedRisk.severity}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium">Impact</label>
                  <Badge className={getSeverityColor(selectedRisk.impact)}>
                    {selectedRisk.impact}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium">Probability</label>
                  <Badge className={getSeverityColor(selectedRisk.probability)}>
                    {selectedRisk.probability}
                  </Badge>
                </div>
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Mitigation Strategy</label>
                <p className="bg-muted p-3 rounded-md">{selectedRisk.mitigation}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Badge className={getStatusColor(selectedRisk.status)}>
                    {selectedRisk.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium">Due Date</label>
                  <p>{new Date(selectedRisk.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
            <Button onClick={() => {
              toast({
                title: "Risk Updated",
                description: "Risk mitigation actions have been updated."
              });
              setIsViewOpen(false);
            }}>
              Update Risk
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
