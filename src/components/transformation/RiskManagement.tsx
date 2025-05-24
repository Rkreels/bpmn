
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useVoice } from "@/contexts/VoiceContext";
import { AlertTriangle, Shield, TrendingDown, Eye } from "lucide-react";

export const RiskManagement: React.FC = () => {
  const { speakText } = useVoice();

  const risks = [
    {
      id: "R001",
      title: "Resource Availability Constraint",
      category: "Resource",
      probability: "High",
      impact: "Medium",
      status: "Active",
      owner: "Project Manager",
      mitigation: "Cross-training team members"
    },
    {
      id: "R002", 
      title: "Technology Integration Complexity",
      category: "Technical",
      probability: "Medium",
      impact: "High",
      status: "Monitoring",
      owner: "Tech Lead",
      mitigation: "Proof of concept development"
    },
    {
      id: "R003",
      title: "Stakeholder Resistance to Change",
      category: "Change",
      probability: "Medium",
      impact: "Medium",
      status: "Mitigated",
      owner: "Change Manager",
      mitigation: "Enhanced communication plan"
    }
  ];

  const getRiskLevel = (probability: string, impact: string) => {
    if ((probability === "High" && impact === "High") || 
        (probability === "High" && impact === "Medium" && Math.random() > 0.5)) {
      return { level: "Critical", color: "destructive" };
    } else if (probability === "Medium" && impact === "High") {
      return { level: "High", color: "destructive" };
    } else if (probability === "Medium" || impact === "Medium") {
      return { level: "Medium", color: "secondary" };
    }
    return { level: "Low", color: "outline" };
  };

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Risk Management dashboard. Identify, assess, and mitigate risks across your transformation portfolio.")}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Critical Risks</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Risks</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Mitigated</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Eye className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Monitoring</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Risks</CardTitle>
          <CardDescription>Current risks requiring attention across transformation initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {risks.map((risk) => {
              const riskLevel = getRiskLevel(risk.probability, risk.impact);
              return (
                <div key={risk.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm text-muted-foreground">{risk.id}</span>
                        <h4 className="font-medium">{risk.title}</h4>
                        <Badge variant={riskLevel.color as any}>{riskLevel.level}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Category:</span>
                          <p className="font-medium">{risk.category}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Probability:</span>
                          <p className="font-medium">{risk.probability}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Impact:</span>
                          <p className="font-medium">{risk.impact}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Owner:</span>
                          <p className="font-medium">{risk.owner}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <span className="text-sm text-muted-foreground">Mitigation: </span>
                        <span className="text-sm">{risk.mitigation}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Badge variant="outline">{risk.status}</Badge>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
