
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Upload, 
  Download, 
  FileText,
  BarChart3,
  TrendingDown,
  TrendingUp
} from "lucide-react";

export const ProcessConformanceChecker: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState("order-process");

  const conformanceOverview = {
    overallScore: 87.3,
    totalDeviations: 342,
    criticalViolations: 23,
    warnings: 156,
    conformantCases: 14567,
    totalCases: 16732
  };

  const conformanceRules = [
    {
      id: 1,
      name: "Sequential Activity Order",
      description: "Activities must follow the defined sequence",
      compliance: 94.2,
      violations: 85,
      severity: "medium",
      status: "active"
    },
    {
      id: 2,
      name: "Mandatory Approval",
      description: "All orders above $10K require approval",
      compliance: 78.5,
      violations: 234,
      severity: "high",
      status: "active"
    },
    {
      id: 3,
      name: "Time Constraints",
      description: "Process must complete within SLA",
      compliance: 92.1,
      violations: 142,
      severity: "medium",
      status: "active"
    },
    {
      id: 4,
      name: "Data Completeness",
      description: "Required fields must be filled",
      compliance: 89.7,
      violations: 98,
      severity: "low",
      status: "active"
    }
  ];

  const violationDetails = [
    {
      type: "Skipped Activity",
      description: "Quality check was skipped in rush orders",
      frequency: 145,
      impact: "High",
      cases: ["Case-001", "Case-045", "Case-123"],
      recommendation: "Implement mandatory quality gates"
    },
    {
      type: "Wrong Order",
      description: "Approval happened after shipping",
      frequency: 67,
      impact: "Critical",
      cases: ["Case-234", "Case-456"],
      recommendation: "Add sequence validation rules"
    },
    {
      type: "Missing Data",
      description: "Customer information incomplete",
      frequency: 89,
      impact: "Medium",
      cases: ["Case-789", "Case-012"],
      recommendation: "Improve form validation"
    },
    {
      type: "SLA Violation",
      description: "Process exceeded time limits",
      frequency: 41,
      impact: "Medium",
      cases: ["Case-345", "Case-678"],
      recommendation: "Optimize resource allocation"
    }
  ];

  const modelComparison = [
    { model: "Reference Model v1.0", conformance: 87.3, deviations: 342, lastUpdated: "2024-01-15" },
    { model: "Reference Model v2.0", conformance: 91.2, deviations: 234, lastUpdated: "2024-01-20" },
    { model: "Best Practice Model", conformance: 85.7, deviations: 456, lastUpdated: "2024-01-10" }
  ];

  return (
    <div className="space-y-6">
      {/* Controls and Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Conformance Overview
            </CardTitle>
            <CardDescription>
              Real-time analysis of process conformance against reference models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {conformanceOverview.overallScore}%
                </div>
                <p className="text-sm text-muted-foreground">Overall Conformance</p>
                <Progress value={conformanceOverview.overallScore} className="mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-destructive mb-1">
                  {conformanceOverview.totalDeviations}
                </div>
                <p className="text-sm text-muted-foreground">Total Deviations</p>
                <Badge variant="destructive" className="mt-2">
                  {conformanceOverview.criticalViolations} Critical
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {conformanceOverview.conformantCases.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Conformant Cases</p>
                <p className="text-xs text-muted-foreground mt-1">
                  of {conformanceOverview.totalCases.toLocaleString()} total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Reference Model
            </Button>
            <Button className="w-full" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Run Conformance Check
            </Button>
            <Button className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Tabs defaultValue="rules" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rules">Compliance Rules</TabsTrigger>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="models">Model Comparison</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Rules Analysis</CardTitle>
              <CardDescription>
                Monitor adherence to defined business rules and constraints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conformanceRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{rule.name}</h3>
                        <Badge variant={rule.severity === "high" ? "destructive" : rule.severity === "medium" ? "secondary" : "outline"}>
                          {rule.severity} priority
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{rule.compliance}%</span>
                        <div className="w-20">
                          <Progress value={rule.compliance} />
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {rule.violations} violations detected
                      </span>
                      <Badge variant={rule.compliance > 90 ? "default" : rule.compliance > 80 ? "secondary" : "destructive"}>
                        {rule.compliance > 90 ? "Good" : rule.compliance > 80 ? "Needs Attention" : "Critical"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="violations">
          <Card>
            <CardHeader>
              <CardTitle>Violation Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown of conformance violations and their impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {violationDetails.map((violation, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{violation.type}</h3>
                          <Badge variant={violation.impact === "Critical" ? "destructive" : violation.impact === "High" ? "secondary" : "outline"}>
                            {violation.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{violation.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{violation.frequency}</div>
                        <div className="text-xs text-muted-foreground">occurrences</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">Affected Cases: </span>
                        <span className="text-sm text-muted-foreground">
                          {violation.cases.join(", ")}
                        </span>
                      </div>
                      <div className="p-3 bg-blue-50 rounded border border-blue-200">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">Recommendation</span>
                        </div>
                        <p className="text-sm text-blue-700">{violation.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>Reference Model Comparison</CardTitle>
              <CardDescription>
                Compare conformance across different reference models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelComparison.map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{model.model}</h3>
                      <p className="text-sm text-muted-foreground">
                        Last updated: {model.lastUpdated}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold">{model.conformance}%</div>
                        <div className="text-xs text-muted-foreground">Conformance</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold">{model.deviations}</div>
                        <div className="text-xs text-muted-foreground">Deviations</div>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        Select
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Recommendations</CardTitle>
              <CardDescription>
                Intelligent suggestions to improve process conformance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-900">High Impact Improvement</span>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    Implement automated approval workflow for orders above $10K to reduce approval bypass violations by 85%
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-600">Expected Impact: +12% conformance</Badge>
                    <Badge variant="outline">Implementation: 2 weeks</Badge>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Process Optimization</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    Add validation checkpoints at key process transitions to catch data completeness issues early
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-600">Expected Impact: +8% conformance</Badge>
                    <Badge variant="outline">Implementation: 1 week</Badge>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-900">Training Recommendation</span>
                  </div>
                  <p className="text-sm text-yellow-700 mb-3">
                    Conduct training sessions for teams with high violation rates to improve process adherence
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-600">Expected Impact: +5% conformance</Badge>
                    <Badge variant="outline">Implementation: 3 weeks</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
