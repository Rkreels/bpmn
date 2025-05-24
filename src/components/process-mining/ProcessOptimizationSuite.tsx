
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  BarChart3
} from "lucide-react";

export const ProcessOptimizationSuite: React.FC = () => {
  const [selectedOptimization, setSelectedOptimization] = useState("automation");

  const optimizationOpportunities = [
    {
      id: 1,
      title: "Automate Invoice Processing",
      description: "Implement RPA for invoice data extraction and validation",
      impact: {
        timeReduction: "65%",
        costSaving: "$125K/year",
        errorReduction: "90%"
      },
      effort: "Medium",
      roi: "320%",
      category: "automation"
    },
    {
      id: 2,
      title: "Parallel Approval Workflow",
      description: "Enable parallel approvals for orders under $5K",
      impact: {
        timeReduction: "40%",
        costSaving: "$85K/year",
        errorReduction: "15%"
      },
      effort: "Low",
      roi: "450%",
      category: "workflow"
    },
    {
      id: 3,
      title: "Predictive Resource Allocation",
      description: "Use AI to predict and allocate resources based on demand",
      impact: {
        timeReduction: "25%",
        costSaving: "$200K/year",
        errorReduction: "35%"
      },
      effort: "High",
      roi: "280%",
      category: "ai"
    },
    {
      id: 4,
      title: "Eliminate Redundant Steps",
      description: "Remove duplicate quality checks in low-risk scenarios",
      impact: {
        timeReduction: "30%",
        costSaving: "$60K/year",
        errorReduction: "5%"
      },
      effort: "Low",
      roi: "600%",
      category: "simplification"
    }
  ];

  const simulationResults = {
    current: {
      avgDuration: "3.2 days",
      throughput: "1,250 cases/month",
      cost: "$150 per case",
      satisfaction: "78%"
    },
    optimized: {
      avgDuration: "1.8 days",
      throughput: "2,100 cases/month",
      cost: "$95 per case",
      satisfaction: "89%"
    },
    improvement: {
      duration: "44%",
      throughput: "68%",
      cost: "37%",
      satisfaction: "14%"
    }
  };

  const implementationRoadmap = [
    {
      phase: "Phase 1: Quick Wins",
      duration: "2-4 weeks",
      initiatives: ["Parallel Approval Workflow", "Eliminate Redundant Steps"],
      impact: "25% improvement",
      status: "ready"
    },
    {
      phase: "Phase 2: Automation",
      duration: "6-8 weeks",
      initiatives: ["Automate Invoice Processing", "Digital Document Management"],
      impact: "45% improvement",
      status: "planned"
    },
    {
      phase: "Phase 3: Intelligence",
      duration: "12-16 weeks",
      initiatives: ["Predictive Resource Allocation", "AI-Powered Decision Support"],
      impact: "65% improvement",
      status: "future"
    }
  ];

  const bottleneckAnalysis = [
    {
      activity: "Manual Approval Process",
      currentTime: "4.2 hours",
      waitTime: "3.8 hours",
      optimization: "Implement automated pre-screening",
      expectedReduction: "75%"
    },
    {
      activity: "Document Verification",
      currentTime: "2.1 hours",
      waitTime: "1.5 hours",
      optimization: "OCR and AI validation",
      expectedReduction: "80%"
    },
    {
      activity: "Quality Review",
      currentTime: "1.8 hours",
      waitTime: "0.9 hours",
      optimization: "Risk-based sampling",
      expectedReduction: "50%"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Optimization Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Process Optimization Impact
            </CardTitle>
            <CardDescription>
              Projected improvements from implementing optimization recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Duration</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">-{simulationResults.improvement.duration}</div>
                <div className="text-xs text-muted-foreground">
                  {simulationResults.current.avgDuration} → {simulationResults.optimized.avgDuration}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Throughput</span>
                </div>
                <div className="text-2xl font-bold text-green-600">+{simulationResults.improvement.throughput}</div>
                <div className="text-xs text-muted-foreground">
                  {simulationResults.current.throughput} → {simulationResults.optimized.throughput}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Cost</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">-{simulationResults.improvement.cost}</div>
                <div className="text-xs text-muted-foreground">
                  {simulationResults.current.cost} → {simulationResults.optimized.cost}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">Satisfaction</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">+{simulationResults.improvement.satisfaction}</div>
                <div className="text-xs text-muted-foreground">
                  {simulationResults.current.satisfaction} → {simulationResults.optimized.satisfaction}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Optimization Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">8.7</div>
              <p className="text-sm text-muted-foreground mb-4">out of 10</p>
              <Progress value={87} className="mb-4" />
              <p className="text-xs text-muted-foreground">
                Based on impact potential and implementation feasibility
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Tabs defaultValue="opportunities" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Opportunities</CardTitle>
              <CardDescription>
                AI-identified opportunities ranked by impact and feasibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizationOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{opportunity.title}</h3>
                          <Badge variant="outline">{opportunity.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{opportunity.roi} ROI</div>
                        <Badge variant={opportunity.effort === "Low" ? "default" : opportunity.effort === "Medium" ? "secondary" : "destructive"}>
                          {opportunity.effort} Effort
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="text-lg font-bold text-blue-600">{opportunity.impact.timeReduction}</div>
                        <div className="text-xs text-blue-700">Time Reduction</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="text-lg font-bold text-green-600">{opportunity.impact.costSaving}</div>
                        <div className="text-xs text-green-700">Annual Savings</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="text-lg font-bold text-purple-600">{opportunity.impact.errorReduction}</div>
                        <div className="text-xs text-purple-700">Error Reduction</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end mt-4 gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm">Start Implementation</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulation">
          <Card>
            <CardHeader>
              <CardTitle>Process Simulation</CardTitle>
              <CardDescription>
                What-if analysis showing the impact of proposed optimizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Current State
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Avg Duration</span>
                        <span className="font-medium">{simulationResults.current.avgDuration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Throughput</span>
                        <span className="font-medium">{simulationResults.current.throughput}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Cost per Case</span>
                        <span className="font-medium">{simulationResults.current.cost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Satisfaction</span>
                        <span className="font-medium">{simulationResults.current.satisfaction}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                    <h3 className="font-medium mb-4 flex items-center gap-2 text-green-900">
                      <Target className="h-4 w-4" />
                      Optimized State
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700">Avg Duration</span>
                        <span className="font-medium text-green-900">{simulationResults.optimized.avgDuration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700">Throughput</span>
                        <span className="font-medium text-green-900">{simulationResults.optimized.throughput}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700">Cost per Case</span>
                        <span className="font-medium text-green-900">{simulationResults.optimized.cost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700">Satisfaction</span>
                        <span className="font-medium text-green-900">{simulationResults.optimized.satisfaction}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button className="gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Run Advanced Simulation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Roadmap</CardTitle>
              <CardDescription>
                Phased approach to implementing optimization recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {implementationRoadmap.map((phase, index) => (
                  <div key={index} className="relative">
                    {index < implementationRoadmap.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-20 bg-border" />
                    )}
                    
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        phase.status === "ready" ? "bg-green-100 text-green-600" :
                        phase.status === "planned" ? "bg-blue-100 text-blue-600" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {phase.status === "ready" ? <CheckCircle className="h-5 w-5" /> :
                         phase.status === "planned" ? <ArrowRight className="h-5 w-5" /> :
                         <Clock className="h-5 w-5" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{phase.phase}</h3>
                          <Badge variant={phase.status === "ready" ? "default" : phase.status === "planned" ? "secondary" : "outline"}>
                            {phase.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Duration: </span>
                            <span className="font-medium">{phase.duration}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Expected Impact: </span>
                            <span className="font-medium">{phase.impact}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Initiatives: </span>
                            <span className="font-medium">{phase.initiatives.length}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="text-sm text-muted-foreground mb-1">Key Initiatives:</div>
                          <div className="flex flex-wrap gap-1">
                            {phase.initiatives.map((initiative, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {initiative}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bottlenecks">
          <Card>
            <CardHeader>
              <CardTitle>Bottleneck Analysis</CardTitle>
              <CardDescription>
                Identify and optimize the most constraining activities in your process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bottleneckAnalysis.map((bottleneck, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{bottleneck.activity}</h3>
                      <Badge variant="destructive">Bottleneck</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-2 bg-red-50 rounded">
                        <div className="text-sm font-medium text-red-600">{bottleneck.currentTime}</div>
                        <div className="text-xs text-red-700">Current Time</div>
                      </div>
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <div className="text-sm font-medium text-yellow-600">{bottleneck.waitTime}</div>
                        <div className="text-xs text-yellow-700">Wait Time</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="text-sm font-medium text-green-600">{bottleneck.expectedReduction}</div>
                        <div className="text-xs text-green-700">Reduction</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="text-sm font-medium text-blue-600">High</div>
                        <div className="text-xs text-blue-700">Priority</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Lightbulb className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Optimization Strategy</span>
                      </div>
                      <p className="text-sm text-blue-700">{bottleneck.optimization}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
