
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  BarChart,
  Filter,
  Upload,
  Download,
  Play,
  Pause,
  Calendar,
  Clock,
  Activity,
  Search,
  FileUp,
  Settings,
  RefreshCw,
  ArrowRight,
  ArrowDown,
  Sliders,
  ChevronDown,
  ChevronUp,
  Laptop,
  Users,
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart as RechartsBarChart,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Sample data for charts
const processData = [
  { name: "Order Processing", cases: 183, variants: 12, avgDuration: "3.2 days" },
  { name: "Invoice Handling", cases: 142, variants: 8, avgDuration: "1.5 days" },
  { name: "Customer Onboarding", cases: 87, variants: 15, avgDuration: "5.7 days" },
  { name: "Service Request", cases: 231, variants: 23, avgDuration: "2.1 days" },
  { name: "Supplier Management", cases: 64, variants: 7, avgDuration: "4.3 days" },
];

const activityHeatmapData = [
  { day: "Mon", hour8: 15, hour10: 32, hour12: 45, hour14: 39, hour16: 28 },
  { day: "Tue", hour8: 18, hour10: 29, hour12: 49, hour14: 35, hour16: 22 },
  { day: "Wed", hour8: 21, hour10: 38, hour12: 47, hour14: 39, hour16: 27 },
  { day: "Thu", hour8: 19, hour10: 37, hour12: 52, hour14: 43, hour16: 29 },
  { day: "Fri", hour8: 17, hour10: 26, hour12: 42, hour14: 28, hour16: 21 },
];

const caseVarianceData = [
  { name: "Variant 1", value: 45, color: "#8884d8" },
  { name: "Variant 2", value: 25, color: "#83a6ed" },
  { name: "Variant 3", value: 15, color: "#8dd1e1" },
  { name: "Variant 4", value: 10, color: "#82ca9d" },
  { name: "Other Variants", value: 5, color: "#ffc658" },
];

const bottlenecksData = [
  { name: "Credit Check", time: 24, expected: 8 },
  { name: "Manager Approval", time: 36, expected: 16 },
  { name: "Document Verification", time: 18, expected: 16 },
  { name: "Customer Feedback", time: 12, expected: 8 },
  { name: "Order Processing", time: 6, expected: 8 },
];

export default function ProcessMining() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("discovery");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);

  const handleUploadEventLog = () => {
    toast({
      title: "Upload Event Log",
      description: "File upload dialog would appear here in a production environment.",
    });
  };

  const toggleAnalysis = () => {
    setIsAnalysisRunning(!isAnalysisRunning);
    toast({
      title: isAnalysisRunning ? "Analysis Paused" : "Analysis Running",
      description: isAnalysisRunning 
        ? "Process mining analysis has been paused." 
        : "Process mining analysis is now running.",
    });
  };

  const handleExportResults = () => {
    toast({
      title: "Export Results",
      description: "Mining results are being prepared for export.",
    });
  };

  const handleFilterToggle = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <MainLayout pageTitle="Process Mining">
      <div className="space-y-6">
        {/* Process Mining Controls */}
        <Card className="border shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Process Mining</CardTitle>
              <CardDescription>
                Discover, monitor, and improve processes with data
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              <Button size="sm" variant="outline" onClick={handleUploadEventLog}>
                <FileUp className="mr-2 h-4 w-4" /> Upload Log
              </Button>
              <Button 
                size="sm" 
                variant={isAnalysisRunning ? "destructive" : "default"}
                onClick={toggleAnalysis}
              >
                {isAnalysisRunning ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" /> Run Analysis
                  </>
                )}
              </Button>
              <Button size="sm" variant="outline" onClick={handleExportResults}>
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs and Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="discovery">Process Discovery</TabsTrigger>
              <TabsTrigger value="conformance">Conformance Checking</TabsTrigger>
              <TabsTrigger value="enhancement">Process Enhancement</TabsTrigger>
            </TabsList>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleFilterToggle}
              className="flex items-center"
            >
              <Filter className="mr-2 h-4 w-4" /> 
              Filters 
              {isFiltersOpen ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              )}
            </Button>
          </div>

          {isFiltersOpen && (
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Time Period</label>
                  <Select defaultValue="30days">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="90days">Last 90 Days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Process</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select process" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Processes</SelectItem>
                      <SelectItem value="orders">Order Processing</SelectItem>
                      <SelectItem value="invoices">Invoice Handling</SelectItem>
                      <SelectItem value="onboarding">Customer Onboarding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Case Variant</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select variant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Variants</SelectItem>
                      <SelectItem value="variant1">Variant 1</SelectItem>
                      <SelectItem value="variant2">Variant 2</SelectItem>
                      <SelectItem value="variant3">Variant 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">Reset</Button>
                <Button size="sm">Apply Filters</Button>
              </div>
            </Card>
          )}

          <TabsContent value="discovery" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Process List */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Processes</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search processes..."
                      className="pl-8"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {processData.map((process, index) => (
                      <div 
                        key={index} 
                        className="border rounded-md p-3 hover:bg-muted/30 cursor-pointer"
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium">{process.name}</h4>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          <span>{process.cases} cases</span>
                          <span className="mx-1.5">•</span>
                          <span>{process.variants} variants</span>
                          <span className="mx-1.5">•</span>
                          <span>{process.avgDuration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Main View */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">Process Map</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" /> Export
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" /> Settings
                        </Button>
                      </div>
                    </div>
                    <Select defaultValue="performance">
                      <SelectTrigger>
                        <SelectValue placeholder="Select view" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="performance">Performance View</SelectItem>
                        <SelectItem value="frequency">Frequency View</SelectItem>
                        <SelectItem value="resource">Resource View</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="bg-muted/30 rounded-md border m-6 h-[400px] flex items-center justify-center">
                      <div className="text-center p-6">
                        <BarChart className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                        <h3 className="mt-3 text-lg font-medium">Process Map Visualization</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-4">
                          This area would display an interactive process map based on event logs
                        </p>
                        <Button>Generate Process Map</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {/* Statistics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium">Average Case Duration</div>
                            <div className="font-medium">3.2 days</div>
                          </div>
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-primary rounded-full" style={{ width: "65%" }}></div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-xs text-muted-foreground">Target: 2 days</div>
                            <div className="text-xs font-medium text-destructive">+1.2 days</div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium">Rework Percentage</div>
                            <div className="font-medium">18%</div>
                          </div>
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-amber-500 rounded-full" style={{ width: "18%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium">Automation Rate</div>
                            <div className="font-medium">42%</div>
                          </div>
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-green-500 rounded-full" style={{ width: "42%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium">SLA Compliance</div>
                            <div className="font-medium">76%</div>
                          </div>
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-blue-500 rounded-full" style={{ width: "76%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Case Variants */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Case Variants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={caseVarianceData}
                              cx="50%"
                              cy="50%"
                              outerRadius={60}
                              dataKey="value"
                              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {caseVarianceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Legend layout="vertical" align="right" verticalAlign="middle" />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Bottlenecks */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Process Bottlenecks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={bottlenecksData}
                        layout="vertical"
                        margin={{
                          top: 5,
                          right: 30,
                          left: 80,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="time" name="Actual Time (hours)" fill="#8884d8" />
                        <Bar dataKey="expected" name="Expected Time (hours)" fill="#82ca9d" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Heatmap */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activity Frequency Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left p-2">Day</th>
                          <th className="text-center p-2">8-10 AM</th>
                          <th className="text-center p-2">10-12 PM</th>
                          <th className="text-center p-2">12-2 PM</th>
                          <th className="text-center p-2">2-4 PM</th>
                          <th className="text-center p-2">4-6 PM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activityHeatmapData.map((day, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                            <td className="p-2 font-medium">{day.day}</td>
                            <td className="p-2">
                              <div 
                                className="h-8 rounded-md" 
                                style={{ 
                                  backgroundColor: `rgba(136, 132, 216, ${day.hour8 / 50})`,
                                  width: `${Math.max(day.hour8, 10)}%`,
                                  minWidth: "20px"
                                }}
                              ></div>
                            </td>
                            <td className="p-2">
                              <div 
                                className="h-8 rounded-md" 
                                style={{ 
                                  backgroundColor: `rgba(136, 132, 216, ${day.hour10 / 50})`,
                                  width: `${Math.max(day.hour10, 10)}%`,
                                  minWidth: "20px"
                                }}
                              ></div>
                            </td>
                            <td className="p-2">
                              <div 
                                className="h-8 rounded-md" 
                                style={{ 
                                  backgroundColor: `rgba(136, 132, 216, ${day.hour12 / 50})`,
                                  width: `${Math.max(day.hour12, 10)}%`,
                                  minWidth: "20px"
                                }}
                              ></div>
                            </td>
                            <td className="p-2">
                              <div 
                                className="h-8 rounded-md" 
                                style={{ 
                                  backgroundColor: `rgba(136, 132, 216, ${day.hour14 / 50})`,
                                  width: `${Math.max(day.hour14, 10)}%`,
                                  minWidth: "20px"
                                }}
                              ></div>
                            </td>
                            <td className="p-2">
                              <div 
                                className="h-8 rounded-md" 
                                style={{ 
                                  backgroundColor: `rgba(136, 132, 216, ${day.hour16 / 50})`,
                                  width: `${Math.max(day.hour16, 10)}%`,
                                  minWidth: "20px"
                                }}
                              ></div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conformance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conformance Checking</CardTitle>
                <CardDescription>
                  Compare actual process behavior against reference models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Reference Process Model</label>
                      <Select defaultValue="orderStandard">
                        <SelectTrigger>
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="orderStandard">Order Processing (Standard)</SelectItem>
                          <SelectItem value="orderOptimized">Order Processing (Optimized)</SelectItem>
                          <SelectItem value="invoiceHandling">Invoice Handling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Log</label>
                      <Select defaultValue="orderLog2023">
                        <SelectTrigger>
                          <SelectValue placeholder="Select event log" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="orderLog2023">Order Log 2023</SelectItem>
                          <SelectItem value="orderLog2022">Order Log 2022</SelectItem>
                          <SelectItem value="invoiceLog2023">Invoice Log 2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button className="w-full">Run Conformance Check</Button>
                    
                    <div className="border rounded-lg p-4 bg-muted/30 space-y-3">
                      <h4 className="font-medium">Conformance Metrics</h4>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Fitness</span>
                          <span className="font-medium text-blue-600">0.78</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full mt-1">
                          <div className="h-2 bg-blue-600 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Precision</span>
                          <span className="font-medium text-green-600">0.82</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full mt-1">
                          <div className="h-2 bg-green-600 rounded-full" style={{ width: "82%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Simplicity</span>
                          <span className="font-medium text-amber-600">0.65</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full mt-1">
                          <div className="h-2 bg-amber-600 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Generalization</span>
                          <span className="font-medium text-purple-600">0.71</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full mt-1">
                          <div className="h-2 bg-purple-600 rounded-full" style={{ width: "71%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="bg-muted/30 border rounded-lg h-[400px] flex items-center justify-center">
                      <div className="text-center p-6">
                        <Activity className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                        <h3 className="mt-3 text-lg font-medium">Conformance Visualization</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          This area would show a visualization of conformance checking results, 
                          highlighting deviations between the reference model and actual process execution.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <h4 className="font-medium">Detected Deviations</h4>
                      
                      <div className="space-y-2">
                        <div className="border rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                Skip Activity
                              </span>
                              <h4 className="font-medium mt-1">Quality Check Skipped</h4>
                            </div>
                            <span className="text-sm text-muted-foreground">42 cases (23%)</span>
                          </div>
                          <p className="text-sm mt-1 text-muted-foreground">
                            The mandatory quality check activity was skipped in 42 process instances
                          </p>
                        </div>
                        
                        <div className="border rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                                Wrong Sequence
                              </span>
                              <h4 className="font-medium mt-1">Incorrect Approval Sequence</h4>
                            </div>
                            <span className="text-sm text-muted-foreground">18 cases (10%)</span>
                          </div>
                          <p className="text-sm mt-1 text-muted-foreground">
                            Manager approval was performed before system validation in 18 process instances
                          </p>
                        </div>
                        
                        <div className="border rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                Extra Activity
                              </span>
                              <h4 className="font-medium mt-1">Unnecessary Rework</h4>
                            </div>
                            <span className="text-sm text-muted-foreground">27 cases (15%)</span>
                          </div>
                          <p className="text-sm mt-1 text-muted-foreground">
                            Additional verification steps were performed in 27 process instances
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enhancement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Process Enhancement</CardTitle>
                <CardDescription>
                  Identify opportunities for process improvement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium flex items-center">
                          <Sliders className="h-5 w-5 mr-2" />
                          Optimization Opportunities
                        </h3>
                        
                        <div className="space-y-4 mt-4">
                          <div className="border-l-4 border-blue-600 pl-4">
                            <h4 className="font-medium">Parallel Processing</h4>
                            <p className="text-sm text-muted-foreground mt-1 mb-2">
                              Data validation and credit check can be performed in parallel instead of sequentially
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Estimated time savings: 1.5 days per case</span>
                            </div>
                          </div>
                          
                          <div className="border-l-4 border-green-600 pl-4">
                            <h4 className="font-medium">Automation Candidate</h4>
                            <p className="text-sm text-muted-foreground mt-1 mb-2">
                              Document verification can be automated using OCR and machine learning
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Laptop className="h-4 w-4 mr-1" />
                              <span>Estimated cost savings: $45,000 annually</span>
                            </div>
                          </div>
                          
                          <div className="border-l-4 border-amber-600 pl-4">
                            <h4 className="font-medium">Approver Optimization</h4>
                            <p className="text-sm text-muted-foreground mt-1 mb-2">
                              Implement delegation rules for approvals to reduce waiting time
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Users className="h-4 w-4 mr-1" />
                              <span>Estimated time savings: 0.8 days per case</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium flex items-center">
                          <ArrowDown className="h-5 w-5 mr-2" />
                          Simulation Results
                        </h3>
                        
                        <div className="mt-4">
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h4 className="font-medium mb-3">Process Performance Comparison</h4>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm">
                                  <span>Current Process</span>
                                  <span className="font-medium">3.2 days</span>
                                </div>
                                <div className="h-3 bg-muted rounded-full mt-1">
                                  <div className="h-3 bg-blue-600 rounded-full" style={{ width: "100%" }}></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-sm">
                                  <span>Enhanced Process</span>
                                  <span className="font-medium">1.7 days</span>
                                </div>
                                <div className="h-3 bg-muted rounded-full mt-1">
                                  <div className="h-3 bg-green-600 rounded-full" style={{ width: "53%" }}></div>
                                </div>
                              </div>
                              
                              <div className="flex items-center pt-2 border-t text-sm">
                                <ArrowDown className="h-4 w-4 mr-1 text-green-600" />
                                <span className="font-medium text-green-600">47% reduction in cycle time</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="border rounded-lg p-4 h-full space-y-4">
                      <h3 className="font-medium">Implementation Plan</h3>
                      
                      <div className="border-b pb-2">
                        <h4 className="text-sm font-medium">Phase 1: Quick Wins</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-start text-sm">
                            <div className="h-5 w-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs mr-2 mt-0.5">1</div>
                            <span>Implement approval delegation rules</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <div className="h-5 w-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs mr-2 mt-0.5">2</div>
                            <span>Configure parallel processing for independent tasks</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="border-b pb-2">
                        <h4 className="text-sm font-medium">Phase 2: Automation</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-start text-sm">
                            <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-2 mt-0.5">3</div>
                            <span>Implement OCR for document processing</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs mr-2 mt-0.5">4</div>
                            <span>Create automated validation workflows</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium">Phase 3: Integration</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-start text-sm">
                            <div className="h-5 w-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs mr-2 mt-0.5">5</div>
                            <span>Integrate with CRM system for customer data</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <div className="h-5 w-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs mr-2 mt-0.5">6</div>
                            <span>Implement real-time monitoring dashboard</span>
                          </li>
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div className="text-center pt-2">
                        <Button className="w-full">
                          Generate Implementation Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
