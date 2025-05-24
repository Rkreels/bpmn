
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  Zap, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Target,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Play,
  BarChart
} from "lucide-react";

export const ProcessOptimizationSuite: React.FC = () => {
  const { speakText } = useVoice();
  const [selectedOptimization, setSelectedOptimization] = useState("automation");

  const optimizationOpportunities = [
    {
      id: "auto-approval",
      title: "Automated Credit Approval",
      description: "Implement ML-based credit scoring for orders under $10K",
      impact: "High",
      effort: "Medium",
      timeReduction: "2.3 days",
      costSaving: "$45K/year",
      implementationTime: "6 weeks",
      roi: "340%",
      status: "ready"
    },
    {
      id: "parallel-processing",
      title: "Parallel Document Processing",
      description: "Run document verification and compliance checks simultaneously",
      impact: "Medium",
      effort: "Low",
      timeReduction: "1.2 days",
      costSaving: "$28K/year",
      implementationTime: "3 weeks",
      roi: "280%",
      status: "ready"
    },
    {
      id: "smart-routing",
      title: "Intelligent Case Routing",
      description: "Route cases to specialists based on complexity and workload",
      impact: "Medium",
      effort: "Medium",
      timeReduction: "0.8 days",
      costSaving: "$32K/year",
      implementationTime: "4 weeks",
      roi: "210%",
      status: "planning"
    },
    {
      id: "predictive-maintenance",
      title: "Predictive Resource Planning",
      description: "Forecast workload and adjust resources proactively",
      impact: "High",
      effort: "High",
      timeReduction: "1.5 days",
      costSaving: "$67K/year",
      implementationTime: "12 weeks",
      roi: "190%",
      status: "research"
    }
  ];

  const simulationResults = [
    { scenario: "Current State", throughput: 245, avgTime: 4.7, cost: 125, quality: 87 },
    { scenario: "With Automation", throughput: 340, avgTime: 2.8, cost: 89, quality: 92 },
    { scenario: "With Parallel Processing", throughput: 285, avgTime: 3.2, cost: 108, quality: 89 },
    { scenario: "Combined Optimizations", throughput: 420, avgTime: 2.1, cost: 76, quality: 95 }
  ];

  const implementationPlan = [
    { phase: "Phase 1", title: "Quick Wins", duration: "4 weeks", items: ["Parallel Processing", "Smart Routing"] },
    { phase: "Phase 2", title: "Automation", duration: "8 weeks", items: ["Automated Approval", "Document Processing"] },
    { phase: "Phase 3", title: "Advanced Analytics", duration: "12 weeks", items: ["Predictive Planning", "AI Insights"] }
  ];

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("Process Optimization Suite. Discover improvement opportunities, simulate changes, and implement optimizations. Use AI-powered recommendations to enhance efficiency, reduce costs, and improve quality.")}
    >
      {/* Optimization Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <h3 className="font-medium text-sm">Potential Savings</h3>
            </div>
            <div className="text-2xl font-bold">$172K</div>
            <div className="text-xs text-muted-foreground">annually</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <h3 className="font-medium text-sm">Time Reduction</h3>
            </div>
            <div className="text-2xl font-bold">5.8 days</div>
            <div className="text-xs text-muted-foreground">avg per case</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <h3 className="font-medium text-sm">Efficiency Gain</h3>
            </div>
            <div className="text-2xl font-bold">+42%</div>
            <div className="text-xs text-muted-foreground">throughput improvement</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-purple-500" />
              <h3 className="font-medium text-sm">Quality Score</h3>
            </div>
            <div className="text-2xl font-bold">95%</div>
            <div className="text-xs text-muted-foreground">projected quality</div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Tabs */}
      <Tabs value={selectedOptimization} onValueChange={setSelectedOptimization} className="w-full">
        <TabsList>
          <TabsTrigger value="automation">Opportunities</TabsTrigger>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>
        
        <TabsContent value="automation">
          <div className="space-y-4">
            {optimizationOpportunities.map((opportunity) => (
              <Card key={opportunity.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                        <Badge variant={
                          opportunity.impact === "High" ? "default" :
                          opportunity.impact === "Medium" ? "secondary" : "outline"
                        }>
                          {opportunity.impact} Impact
                        </Badge>
                        <Badge variant="outline">
                          {opportunity.effort} Effort
                        </Badge>
                        <Badge variant={
                          opportunity.status === "ready" ? "default" :
                          opportunity.status === "planning" ? "secondary" : "outline"
                        }>
                          {opportunity.status}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{opportunity.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Time Reduction</div>
                          <div className="font-semibold text-green-600">{opportunity.timeReduction}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Cost Saving</div>
                          <div className="font-semibold text-green-600">{opportunity.costSaving}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Implementation</div>
                          <div className="font-semibold">{opportunity.implementationTime}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">ROI</div>
                          <div className="font-semibold text-blue-600">{opportunity.roi}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <BarChart className="h-4 w-4 mr-2" />
                        Simulate
                      </Button>
                      <Button size="sm" disabled={opportunity.status !== "ready"}>
                        <Play className="h-4 w-4 mr-2" />
                        Implement
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="simulation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Process Simulation Results
              </CardTitle>
              <CardDescription>Compare different optimization scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Scenario</th>
                      <th className="text-right p-3">Throughput/Month</th>
                      <th className="text-right p-3">Avg Processing Time</th>
                      <th className="text-right p-3">Cost per Case</th>
                      <th className="text-right p-3">Quality Score</th>
                      <th className="text-right p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simulationResults.map((result, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{result.scenario}</td>
                        <td className="p-3 text-right">{result.throughput}</td>
                        <td className="p-3 text-right">{result.avgTime} days</td>
                        <td className="p-3 text-right">${result.cost}</td>
                        <td className="p-3 text-right">{result.quality}%</td>
                        <td className="p-3 text-right">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Simulation Insights</h4>
                <ul className="text-sm space-y-1">
                  <li>• Combined optimizations show 71% improvement in throughput</li>
                  <li>• Quality score increases by 9% with automated processes</li>
                  <li>• Cost per case reduces by 39% with full implementation</li>
                  <li>• ROI break-even expected in 8.3 months</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="implementation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Implementation Roadmap
              </CardTitle>
              <CardDescription>Phased approach to process optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {implementationPlan.map((phase, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{phase.phase}: {phase.title}</h3>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {phase.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-2 p-2 border rounded-md">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {index < implementationPlan.length - 1 && (
                      <div className="absolute left-4 top-8 w-0.5 h-6 bg-border"></div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Total timeline: 24 weeks • Expected ROI: 280%
                </div>
                <Button>
                  <Play className="h-4 w-4 mr-2" />
                  Start Implementation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Optimization Monitoring
              </CardTitle>
              <CardDescription>Track the impact of implemented optimizations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Active Optimizations</h4>
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-sm text-muted-foreground">Currently running</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Realized Savings</h4>
                    <div className="text-2xl font-bold text-green-600">$73K</div>
                    <div className="text-sm text-muted-foreground">This quarter</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Performance Gain</h4>
                    <div className="text-2xl font-bold text-blue-600">+24%</div>
                    <div className="text-sm text-muted-foreground">vs baseline</div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4">Recent Optimization Results</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium">Parallel Document Processing</div>
                        <div className="text-sm text-muted-foreground">Implemented 2 weeks ago</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">+18% efficiency</div>
                        <div className="text-sm text-muted-foreground">$12K saved</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium">Smart Case Routing</div>
                        <div className="text-sm text-muted-foreground">Implemented 1 month ago</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-600">+15% throughput</div>
                        <div className="text-sm text-muted-foreground">$8K saved</div>
                      </div>
                    </div>
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
