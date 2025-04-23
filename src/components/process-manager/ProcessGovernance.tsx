
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Check, FileSearch, Save, Shield, ShieldAlert, ShieldCheck, 
  ShieldX, User 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

interface ComplianceRequirement {
  id: string;
  name: string;
  category: "regulatory" | "security" | "operational" | "industry";
  met: boolean;
  standard?: string;
  impact: "high" | "medium" | "low";
  description: string;
}

interface ApprovalStage {
  id: string;
  name: string;
  role: string;
  approver?: string;
  status: "pending" | "approved" | "rejected" | "not-started";
  comments?: string;
  date?: string;
}

const complianceRequirements: ComplianceRequirement[] = [
  {
    id: "sox-1",
    name: "Segregation of Duties",
    category: "regulatory",
    met: true,
    standard: "SOX",
    impact: "high",
    description: "Ensure proper segregation of duties in financial transactions"
  },
  {
    id: "gdpr-1",
    name: "Data Processing Agreement",
    category: "regulatory",
    met: false,
    standard: "GDPR",
    impact: "high",
    description: "Ensure proper data processing agreements with all vendors"
  },
  {
    id: "sec-1",
    name: "Access Control",
    category: "security",
    met: true,
    impact: "medium",
    description: "Implement appropriate access controls for sensitive operations"
  },
  {
    id: "iso-1",
    name: "Documentation Requirements",
    category: "industry",
    met: false,
    standard: "ISO 9001",
    impact: "medium",
    description: "Maintain comprehensive documentation of process execution"
  },
  {
    id: "op-1",
    name: "Performance Measurement",
    category: "operational",
    met: true,
    impact: "low",
    description: "Establish KPIs to measure process performance"
  }
];

const approvalStages: ApprovalStage[] = [
  {
    id: "review",
    name: "Process Review",
    role: "Process Analyst",
    approver: "Jane Smith",
    status: "approved",
    comments: "All process steps are correctly documented",
    date: "2023-04-22"
  },
  {
    id: "technical",
    name: "Technical Review",
    role: "System Architect",
    approver: "Mike Johnson",
    status: "approved",
    comments: "Integration points are defined correctly",
    date: "2023-04-23"
  },
  {
    id: "compliance",
    name: "Compliance Check",
    role: "Compliance Officer",
    status: "pending"
  },
  {
    id: "final",
    name: "Final Approval",
    role: "Process Owner",
    status: "not-started"
  }
];

export const ProcessGovernance: React.FC = () => {
  const { toast } = useToast();

  const handleSaveCompliance = () => {
    toast({
      title: "Compliance Settings Saved",
      description: "Compliance requirements have been updated."
    });
  };

  const handleApprove = (stageId: string) => {
    toast({
      title: "Stage Approved",
      description: "Approval has been recorded and workflow progressed."
    });
  };

  const handleReject = (stageId: string) => {
    toast({
      title: "Stage Rejected",
      description: "Rejection has been recorded. Process needs revision."
    });
  };

  // Calculate compliance score
  const metRequirements = complianceRequirements.filter(r => r.met).length;
  const totalRequirements = complianceRequirements.length;
  const complianceScore = Math.round((metRequirements / totalRequirements) * 100);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">Process Governance</h3>
          <p className="text-sm text-muted-foreground">
            Manage compliance requirements and approval workflows
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <FileSearch className="h-4 w-4" />
            Audit Log
          </Button>
          <Button size="sm" className="gap-1" onClick={handleSaveCompliance}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <h4 className="text-md font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Compliance Requirements
          </h4>
          
          <div className="space-y-4">
            {complianceRequirements.map((requirement) => (
              <div 
                key={requirement.id} 
                className="flex items-start gap-3 p-3 rounded-md border hover:bg-muted/50"
              >
                <div className="pt-0.5">
                  <Checkbox checked={requirement.met} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{requirement.name}</span>
                    {requirement.standard && (
                      <Badge variant="outline" className="text-xs">
                        {requirement.standard}
                      </Badge>
                    )}
                    <Badge
                      className={
                        requirement.impact === "high" ? "bg-red-100 text-red-800" :
                        requirement.impact === "medium" ? "bg-amber-100 text-amber-800" :
                        "bg-blue-100 text-blue-800"
                      }
                    >
                      {requirement.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{requirement.description}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className={
                        requirement.category === "regulatory" ? "border-blue-500 text-blue-700" :
                        requirement.category === "security" ? "border-red-500 text-red-700" :
                        requirement.category === "industry" ? "border-purple-500 text-purple-700" :
                        "border-green-500 text-green-700"
                      }
                    >
                      {requirement.category}
                    </Badge>
                    {requirement.met ? (
                      <span className="text-xs flex items-center text-green-700">
                        <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                        Requirement met
                      </span>
                    ) : (
                      <span className="text-xs flex items-center text-red-700">
                        <ShieldX className="h-3.5 w-3.5 mr-1" />
                        Requirement not met
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-4">
            <h4 className="text-md font-medium">Compliance Score</h4>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Compliance</span>
                <span className="font-medium">{complianceScore}%</span>
              </div>
              <Progress value={complianceScore} className="h-2" />
              
              <div className="flex justify-between mt-4 text-sm">
                <div className="flex items-center">
                  <ShieldCheck className="h-4 w-4 text-green-600 mr-1" />
                  <span>{metRequirements} Met</span>
                </div>
                <div className="flex items-center">
                  <ShieldAlert className="h-4 w-4 text-amber-600 mr-1" />
                  <span>{totalRequirements - metRequirements} Not Met</span>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                Generate Compliance Report
              </Button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 space-y-4">
            <h4 className="text-md font-medium">Approval Workflow</h4>
            
            <div className="space-y-3">
              {approvalStages.map((stage, index) => (
                <div key={stage.id} className="relative pl-6 pb-4">
                  {/* Connector line */}
                  {index < approvalStages.length - 1 && (
                    <div className="absolute left-3 top-6 h-full w-0.5 bg-gray-200"></div>
                  )}
                  
                  {/* Status indicator */}
                  <div className="absolute left-0 top-1">
                    {stage.status === "approved" && (
                      <div className="h-6 w-6 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                    )}
                    {stage.status === "rejected" && (
                      <div className="h-6 w-6 rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center">
                        <ShieldX className="h-3 w-3 text-red-600" />
                      </div>
                    )}
                    {stage.status === "pending" && (
                      <div className="h-6 w-6 rounded-full bg-amber-100 border-2 border-amber-500 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      </div>
                    )}
                    {stage.status === "not-started" && (
                      <div className="h-6 w-6 rounded-full bg-gray-100 border-2 border-gray-300"></div>
                    )}
                  </div>
                  
                  <div className="border rounded-md p-2">
                    <div className="font-medium text-sm">{stage.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Required role: {stage.role}
                    </div>
                    
                    {stage.approver && (
                      <div className="flex items-center gap-1 text-xs mt-1">
                        <User className="h-3 w-3" />
                        {stage.approver}
                        {stage.date && (
                          <>
                            <span className="mx-1">•</span>
                            <Calendar className="h-3 w-3" />
                            {stage.date}
                          </>
                        )}
                      </div>
                    )}
                    
                    {stage.comments && (
                      <div className="text-xs mt-1 italic">
                        "{stage.comments}"
                      </div>
                    )}
                    
                    {stage.status === "pending" && (
                      <div className="flex gap-2 mt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 text-xs" 
                          onClick={() => handleApprove(stage.id)}
                        >
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 text-xs" 
                          onClick={() => handleReject(stage.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
