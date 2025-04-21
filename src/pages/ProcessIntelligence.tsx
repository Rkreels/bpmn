
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { CardMetric } from "@/components/ui/card-metric";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  BarChart,
  Clock,
  Download,
  FileUp,
  Filter,
  LineChart,
  PieChart,
  Plus,
  RefreshCw,
  Settings,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProcessIntelligence() {
  return (
    <MainLayout pageTitle="Process Intelligence">
      <Tabs defaultValue="mining" className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <TabsList>
            <TabsTrigger value="mining">Process Mining</TabsTrigger>
            <TabsTrigger value="analysis">Bottleneck Analysis</TabsTrigger>
            <TabsTrigger value="conformance">Conformance Checking</TabsTrigger>
            <TabsTrigger value="root-cause">Root Cause Analysis</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-1">
              <FileUp className="h-4 w-4" />
              Upload Event Log
            </Button>
          </div>
        </div>
        
        <TabsContent value="mining" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardMetric
              title="Events Analyzed"
              value="154,872"
              variant="primary"
            />
            <CardMetric
              title="Process Variants"
              value="23"
              trend={{ value: 4, isUpward: true, isPositive: false }}
            />
            <CardMetric
              title="Avg. Case Duration"
              value="3.2 days"
              trend={{ value: 12, isUpward: false, isPositive: true }}
              variant="success"
            />
            <CardMetric
              title="Automation Rate"
              value="68%"
              trend={{ value: 7, isUpward: true, isPositive: true }}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Discovered Process Map</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[400px] border rounded-md p-4 flex items-center justify-center bg-muted/50">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <Zap className="h-12 w-12 mb-2 opacity-70" />
                      <p className="text-center">
                        Process Map Visualization<br />
                        <span className="text-sm opacity-70">(Automatically generated from event logs)</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Process Variants</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {processVariants.map((variant, index) => (
                        <div key={index} className="px-4 py-3 hover:bg-muted/50 cursor-pointer flex items-center justify-between">
                          <div>
                            <div className="font-medium">Variant {variant.id}</div>
                            <div className="text-sm text-muted-foreground">{variant.cases} cases</div>
                          </div>
                          <div className="text-sm font-medium">
                            {variant.percentage}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Activity Frequency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {activityFrequency.map((activity, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>{activity.name}</span>
                            <span>{activity.count.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${activity.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardMetric
              title="Average Wait Time"
              value="8.3 hours"
              trend={{ value: 15, isUpward: true, isPositive: false }}
              variant="warning"
            />
            <CardMetric
              title="Process Efficiency"
              value="72%"
              trend={{ value: 3, isUpward: true, isPositive: true }}
            />
            <CardMetric
              title="SLA Violations"
              value="18%"
              trend={{ value: 5, isUpward: false, isPositive: true }}
              variant="success"
            />
            <CardMetric
              title="Resource Utilization"
              value="84%"
              trend={{ value: 7, isUpward: true, isPositive: true }}
              variant="primary"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Process Bottlenecks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[300px] border rounded-md p-4 flex items-center justify-center bg-muted/50">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mb-2 opacity-70" />
                      <p className="text-center">
                        Bottleneck Visualization<br />
                        <span className="text-sm opacity-70">(Highlighting congestion points in the process)</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Wait Time Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[200px] bg-muted/50 rounded-md flex items-center justify-center">
                    <BarChart className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                  
                  <div className="mt-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left pb-2 font-medium">Process Step</th>
                          <th className="text-right pb-2 font-medium">Avg. Wait Time</th>
                          <th className="text-right pb-2 font-medium">Avg. Processing Time</th>
                          <th className="text-right pb-2 font-medium">Total Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2">Order Validation</td>
                          <td className="text-right py-2">1.2 hours</td>
                          <td className="text-right py-2">0.5 hours</td>
                          <td className="text-right py-2">1.7 hours</td>
                        </tr>
                        <tr>
                          <td className="py-2">Credit Check</td>
                          <td className="text-right py-2 text-red-600 font-medium">4.8 hours</td>
                          <td className="text-right py-2">1.2 hours</td>
                          <td className="text-right py-2">6.0 hours</td>
                        </tr>
                        <tr>
                          <td className="py-2">Inventory Check</td>
                          <td className="text-right py-2">0.3 hours</td>
                          <td className="text-right py-2">0.8 hours</td>
                          <td className="text-right py-2">1.1 hours</td>
                        </tr>
                        <tr>
                          <td className="py-2">Order Approval</td>
                          <td className="text-right py-2 text-amber-600 font-medium">2.5 hours</td>
                          <td className="text-right py-2">0.7 hours</td>
                          <td className="text-right py-2">3.2 hours</td>
                        </tr>
                        <tr>
                          <td className="py-2">Shipping Arrangement</td>
                          <td className="text-right py-2">1.5 hours</td>
                          <td className="text-right py-2">2.0 hours</td>
                          <td className="text-right py-2">3.5 hours</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Resource Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[180px] bg-muted/50 rounded-md flex items-center justify-center mb-4">
                    <PieChart className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                  
                  <div className="space-y-3">
                    {resourceUtilization.map((resource, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm">
                          <span>{resource.name}</span>
                          <span>{resource.utilization}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              resource.utilization > 85 ? 'bg-red-500' :
                              resource.utilization > 70 ? 'bg-amber-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${resource.utilization}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Bottleneck Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Processing Cost</div>
                        <Badge className="bg-red-100 text-red-800">High Impact</Badge>
                      </div>
                      <div className="text-sm">
                        Estimated cost: <span className="font-medium">$58,000 / month</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Customer Experience</div>
                        <Badge className="bg-amber-100 text-amber-800">Medium Impact</Badge>
                      </div>
                      <div className="text-sm">
                        NPS reduction: <span className="font-medium">~8 points</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm font-medium">Employee Satisfaction</div>
                        <Badge className="bg-amber-100 text-amber-800">Medium Impact</Badge>
                      </div>
                      <div className="text-sm">
                        Affected teams: <span className="font-medium">3</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <Button className="w-full gap-1">
                      <Plus className="h-4 w-4" />
                      Create Improvement Initiative
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="conformance" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardMetric
              title="Conformance Rate"
              value="87.3%"
              trend={{ value: 4, isUpward: true, isPositive: true }}
              variant="primary"
            />
            <CardMetric
              title="Deviations"
              value="432"
              trend={{ value: 8, isUpward: false, isPositive: true }}
              variant="success"
            />
            <CardMetric
              title="Rework Cases"
              value="56"
              trend={{ value: 12, isUpward: false, isPositive: true }}
            />
            <CardMetric
              title="Compliance Score"
              value="92%"
              trend={{ value: 3, isUpward: true, isPositive: true }}
              variant="success"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Conformance Checking</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="w-full min-h-[500px] border rounded-md p-6 bg-muted/50">
                    <div className="flex flex-col items-center text-muted-foreground mb-4">
                      <p className="text-center text-sm">
                        Showing conformance analysis between actual process execution and reference model
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-4 text-center">
                        <div className="font-medium">Reference Process Model</div>
                        <div className="h-[200px] flex items-center justify-center">
                          [BPMN Reference Model]
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4 text-center">
                        <div className="font-medium">Actual Process Execution</div>
                        <div className="h-[200px] flex items-center justify-center">
                          [Actual Process Map]
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 border rounded-md p-4">
                      <div className="font-medium mb-2">Deviation Highlights</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="h-3 w-3 rounded-full bg-red-500"></span>
                          <span>Skipped mandatory step (143 cases)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                          <span>Activities in wrong order (87 cases)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                          <span>Additional steps executed (202 cases)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Top Deviations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {conformanceDeviations.map((deviation, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex items-center justify-between">
                          <Badge className={
                            deviation.severity === 'High' ? 'bg-red-100 text-red-800' :
                            deviation.severity === 'Medium' ? 'bg-amber-100 text-amber-800' :
                            'bg-blue-100 text-blue-800'
                          }>
                            {deviation.severity}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{deviation.cases} cases</span>
                        </div>
                        <p className="text-sm mt-2">{deviation.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Compliance Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="font-medium">SOX Compliance</div>
                      <Badge className="bg-green-100 text-green-800">Passed</Badge>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="font-medium">GDPR Requirements</div>
                      <Badge className="bg-green-100 text-green-800">Passed</Badge>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="font-medium">ISO 9001</div>
                      <Badge className="bg-amber-100 text-amber-800">Partial</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Internal Controls</div>
                      <Badge className="bg-red-100 text-red-800">Failed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="root-cause" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Root Cause Analysis</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="space-y-3">
                    <Label>Root Cause Analysis For</Label>
                    <div className="flex items-center gap-2">
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option>Long Process Duration</option>
                        <option>Compliance Violations</option>
                        <option>Order Cancellations</option>
                        <option>Rework Cases</option>
                        <option>Customer Complaints</option>
                      </select>
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Analysis Focus
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Analyzing root causes for cases with excessive process duration (> 5 days)
                    </p>
                    <div className="mt-3 text-sm">
                      <div>Cases analyzed: <span className="font-medium">432</span></div>
                      <div>Average duration: <span className="font-medium">7.3 days</span></div>
                      <div>Target duration: <span className="font-medium">3.0 days</span></div>
                    </div>
                  </div>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Data Attributes</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="max-h-[300px] overflow-y-auto">
                        <div className="divide-y">
                          {dataAttributes.map((attribute, index) => (
                            <div key={index} className="px-4 py-2 flex items-center hover:bg-muted/50">
                              <Input 
                                type="checkbox" 
                                id={`attr-${index}`} 
                                className="h-4 w-4 mr-2"
                                defaultChecked={attribute.selected}
                              />
                              <Label htmlFor={`attr-${index}`} className="cursor-pointer flex-1">
                                {attribute.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-4">
                  <div className="space-y-6">
                    <div className="border rounded-md p-5 bg-muted/50">
                      <h3 className="text-lg font-medium mb-4">Cause and Effect Analysis</h3>
                      
                      <div className="w-full h-[300px] flex items-center justify-center mb-4 border bg-white rounded-md">
                        [Fishbone Diagram / Cause and Effect Visualization]
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Primary Factors</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Missing information (27%)</li>
                            <li>Resource constraints (24%)</li>
                            <li>Approval delays (18%)</li>
                            <li>System performance (14%)</li>
                            <li>External dependencies (11%)</li>
                            <li>Other factors (6%)</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-2">Correlation Strength</h4>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Missing information</span>
                                <span>High</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="h-2 rounded-full bg-red-500" style={{ width: '85%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Resource constraints</span>
                                <span>High</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="h-2 rounded-full bg-red-500" style={{ width: '80%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span>Approval delays</span>
                                <span>Medium</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="h-2 rounded-full bg-amber-500" style={{ width: '65%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Decision Tree Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="w-full h-[180px] flex items-center justify-center bg-muted/50 rounded-md">
                            [Decision Tree Visualization]
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Decision tree showing which combinations of factors most strongly predict process delays
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Cluster Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="w-full h-[180px] flex items-center justify-center bg-muted/50 rounded-md">
                            [Cluster Analysis Visualization]
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Grouping similar cases to identify common patterns and characteristics
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {recommendations.map((recommendation, index) => (
                            <div key={index} className="border rounded-md p-3">
                              <div className="flex items-center justify-between">
                                <Badge className={
                                  recommendation.impact === 'High' ? 'bg-green-100 text-green-800' :
                                  recommendation.impact === 'Medium' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }>
                                  {recommendation.impact} Impact
                                </Badge>
                                <Badge variant="outline">
                                  {recommendation.effort} Effort
                                </Badge>
                              </div>
                              <p className="font-medium mt-2">{recommendation.title}</p>
                              <p className="text-sm mt-1 text-muted-foreground">{recommendation.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}

const processVariants = [
  { id: 1, cases: 2451, percentage: 42 },
  { id: 2, cases: 1218, percentage: 21 },
  { id: 3, cases: 872, percentage: 15 },
  { id: 4, cases: 647, percentage: 11 },
  { id: 5, cases: 358, percentage: 6 },
  { id: "Other", cases: 287, percentage: 5 },
];

const activityFrequency = [
  { name: "Create Order", count: 5832, percentage: 100 },
  { name: "Verify Customer", count: 5832, percentage: 100 },
  { name: "Process Payment", count: 5712, percentage: 98 },
  { name: "Check Inventory", count: 5245, percentage: 90 },
  { name: "Ship Order", count: 5128, percentage: 88 },
  { name: "Send Confirmation", count: 4950, percentage: 85 },
];

const resourceUtilization = [
  { name: "Credit Team", utilization: 92 },
  { name: "Order Processing", utilization: 87 },
  { name: "Verification Team", utilization: 76 },
  { name: "Fulfillment Team", utilization: 68 },
  { name: "Customer Support", utilization: 54 },
];

const conformanceDeviations = [
  {
    severity: "High",
    cases: 143,
    description: "Credit check skipped for orders > $10,000"
  },
  {
    severity: "High",
    cases: 87,
    description: "Shipping arranged before payment confirmation"
  },
  {
    severity: "Medium",
    cases: 112,
    description: "Required documentation missing in approval step"
  },
  {
    severity: "Medium",
    cases: 90,
    description: "Manual price override without manager approval"
  },
  {
    severity: "Low",
    cases: 202,
    description: "Additional verification steps performed unnecessarily"
  }
];

const dataAttributes = [
  { name: "Order Value", selected: true },
  { name: "Customer Type", selected: true },
  { name: "Order Region", selected: true },
  { name: "Product Category", selected: true },
  { name: "Payment Method", selected: false },
  { name: "Sales Channel", selected: true },
  { name: "Time of Day", selected: false },
  { name: "Day of Week", selected: false },
  { name: "Processing Team", selected: true },
  { name: "System Version", selected: false },
  { name: "Customer Age", selected: false },
  { name: "Shipping Method", selected: true },
  { name: "Discount Applied", selected: false },
  { name: "Order Complexity", selected: true },
];

const recommendations = [
  {
    title: "Implement automated information validation",
    description: "Add input validation to reduce missing information by 80% and prevent delays",
    impact: "High",
    effort: "Medium"
  },
  {
    title: "Optimize resource allocation during peak hours",
    description: "Redistribute staff assignments based on order volume patterns",
    impact: "High",
    effort: "Low"
  },
  {
    title: "Streamline approval workflow",
    description: "Reduce approval steps for low-risk orders and implement parallel approvals",
    impact: "Medium",
    effort: "Medium"
  },
  {
    title: "System performance optimization",
    description: "Upgrade database infrastructure to reduce processing latency",
    impact: "Medium",
    effort: "High"
  }
];
