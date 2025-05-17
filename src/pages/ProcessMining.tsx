
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, Upload, Download, Filter, Play, Settings, HelpCircle } from "lucide-react";
import { useVoice } from "@/contexts/VoiceContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Sample data for demonstration
const processData = [
  { name: 'Receive Order', frequency: 1243, avgDuration: 2.5, conformance: 98 },
  { name: 'Verify Payment', frequency: 1243, avgDuration: 8.2, conformance: 92 },
  { name: 'Process Order', frequency: 1220, avgDuration: 12.1, conformance: 96 },
  { name: 'Ship Items', frequency: 1198, avgDuration: 24.3, conformance: 95 },
  { name: 'Send Invoice', frequency: 1197, avgDuration: 1.8, conformance: 99 },
  { name: 'Receive Confirmation', frequency: 1180, avgDuration: 72.5, conformance: 88 },
];

const variantData = [
  { name: 'Happy Path', value: 78 },
  { name: 'Payment Issue', value: 12 },
  { name: 'Address Error', value: 6 },
  { name: 'Other', value: 4 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ProcessMining() {
  const { speakText } = useVoice();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleImportClick = () => {
    speakText(
      "Importing process mining data. Process mining uses event logs from your IT systems to reconstruct and analyze your actual business processes. Import data from your enterprise systems to begin analyzing process execution, discovering bottlenecks, and identifying optimization opportunities."
    );
  };

  const handleAnalysisClick = () => {
    speakText(
      "Starting process analysis. The analysis will discover actual process flows, identify deviations from expected processes, calculate cycle times, and detect bottlenecks. Process mining analysis helps you understand how your processes really work, not just how they're designed to work."
    );
  };

  return (
    <MainLayout pageTitle="Process Mining">
      <div 
        className="mb-6"
        onMouseEnter={() => speakText(
          "Process Mining is a powerful technique that uses data from your IT systems to reconstruct and analyze your business processes. Unlike traditional process modeling that focuses on how processes should work, process mining reveals how they actually work in practice. This data-driven approach helps identify bottlenecks, compliance issues, and optimization opportunities based on real execution data."
        )}
      >
        <h1 className="text-2xl font-semibold">Process Mining</h1>
        <p className="text-muted-foreground mt-1">
          Discover, analyze, and optimize your business processes using data-driven insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      className="w-full justify-start" 
                      onClick={handleImportClick}
                      onMouseEnter={() => speakText(
                        "Import data from your enterprise systems. Process mining requires event logs that contain information about process activities, including timestamps and case IDs. Common data sources include ERP systems, CRM systems, and workflow management tools."
                      )}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Import Data
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Import event logs from your systems
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={handleAnalysisClick}
                      onMouseEnter={() => speakText(
                        "Start analyzing your process data. The analysis will automatically discover the actual process flow, identify conformance issues, and calculate performance metrics like cycle times and bottlenecks. Analysis settings can be configured to focus on specific aspects of your process."
                      )}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start Analysis
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Discover and analyze process patterns
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onMouseEnter={() => speakText(
                        "Export your analysis results for reporting or further analysis in other tools. Exported data can include process maps, conformance metrics, and performance indicators. This is useful for creating executive reports or sharing findings with stakeholders."
                      )}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export Results
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Export analysis for reporting
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Separator className="my-2" />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label 
                    htmlFor="time-range"
                    onMouseEnter={() => speakText(
                      "Select the time period for analysis. Analyzing different time periods can reveal how your processes have evolved or whether process changes have had the desired effect. This helps in measuring the impact of process improvement initiatives."
                    )}
                  >
                    Time Period
                  </Label>
                  <Select defaultValue="last-30">
                    <SelectTrigger id="time-range">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-7">Last 7 days</SelectItem>
                      <SelectItem value="last-30">Last 30 days</SelectItem>
                      <SelectItem value="last-90">Last 90 days</SelectItem>
                      <SelectItem value="last-year">Last year</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label 
                    htmlFor="process-filter"
                    onMouseEnter={() => speakText(
                      "Filter by process type to focus your analysis on specific business areas. Different processes may have different optimization opportunities and challenges. Focusing on one process area at a time often yields more actionable insights."
                    )}
                  >
                    Process Type
                  </Label>
                  <Select defaultValue="order-to-cash">
                    <SelectTrigger id="process-filter">
                      <SelectValue placeholder="Select process" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order-to-cash">Order to Cash</SelectItem>
                      <SelectItem value="procure-to-pay">Procure to Pay</SelectItem>
                      <SelectItem value="hire-to-retire">Hire to Retire</SelectItem>
                      <SelectItem value="record-to-report">Record to Report</SelectItem>
                      <SelectItem value="custom">Custom Process</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  onMouseEnter={() => speakText(
                    "Advanced filters allow you to refine your analysis by specific attributes like case properties, user roles, or outcome types. This helps you focus on particular segments of your process execution to identify patterns specific to certain scenarios."
                  )}
                >
                  <Filter className="mr-2 h-3.5 w-3.5" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger 
                  value="dashboard"
                  onMouseEnter={() => speakText(
                    "The Dashboard provides a high-level overview of your process performance metrics and key insights. Use this view to quickly identify areas that need attention or to track the impact of process improvements over time."
                  )}
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="process-discovery"
                  onMouseEnter={() => speakText(
                    "Process Discovery automatically reconstructs your actual process flows from event data, showing all variants and paths taken. This reveals how your processes actually work in practice, which often differs from the designed process."
                  )}
                >
                  Process Discovery
                </TabsTrigger>
                <TabsTrigger 
                  value="conformance"
                  onMouseEnter={() => speakText(
                    "Conformance Checking compares your actual process execution against the designed or expected process model. This identifies deviations and compliance issues, helping you understand where and why processes don't follow the intended path."
                  )}
                >
                  Conformance
                </TabsTrigger>
                <TabsTrigger 
                  value="performance"
                  onMouseEnter={() => speakText(
                    "Performance Analysis measures process and activity durations, identifies bottlenecks, and calculates waiting times. This data-driven approach helps you pinpoint exactly where processes slow down and quantify the impact."
                  )}
                >
                  Performance
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <TabsContent value="dashboard" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Process Variants</CardTitle>
                    <CardDescription>Distribution of process execution paths</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={variantData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {variantData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <RechartsTooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Process Conformance</CardTitle>
                    <CardDescription>Compliance with expected process flow</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={processData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                        <YAxis />
                        <RechartsTooltip />
                        <Bar dataKey="conformance" fill="#8884d8" name="Conformance %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Activity Duration Analysis</CardTitle>
                    <CardDescription>Average time spent per process step (hours)</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={processData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="avgDuration" fill="#82ca9d" name="Avg. Duration (hours)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="process-discovery">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center h-[500px] border-2 border-dashed rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-medium">Process Map Visualization</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Import data and run an analysis to view your process flow
                      </p>
                      <div className="mt-6">
                        <Button>Start Discovery</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="conformance">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">Select a reference model and run conformance analysis to see results</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">Run performance analysis to view bottlenecks and optimization opportunities</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
