
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Calendar,
  ChevronDown,
  Clock,
  Download,
  FileText,
  Filter,
  Play,
  Plus,
  Search,
  Settings,
  Share2,
  Upload,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function ProcessIntelligence() {
  return (
    <MainLayout pageTitle="Process Intelligence">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Order to Cash Analysis</CardTitle>
                <CardDescription>
                  Performance insights based on event logs from Jan 2023 - Oct 2023
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button size="sm" className="gap-1">
                  <Upload className="h-4 w-4" />
                  Upload Logs
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="overview" className="px-6">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="process-discovery">Process Discovery</TabsTrigger>
                <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
                <TabsTrigger value="conformance">Conformance</TabsTrigger>
                <TabsTrigger value="variants">Variants</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <MetricCard
                    title="Total Cases"
                    value="2,458"
                    icon={<FileText className="h-5 w-5" />}
                    change={{ value: 12, isPositive: true }}
                  />
                  <MetricCard
                    title="Average Duration"
                    value="5.3 days"
                    icon={<Clock className="h-5 w-5" />}
                    change={{ value: 8, isPositive: false }}
                  />
                  <MetricCard
                    title="Automation Rate"
                    value="72%"
                    icon={<Play className="h-5 w-5" />}
                    change={{ value: 5, isPositive: true }}
                  />
                  <MetricCard
                    title="Process Variants"
                    value="16"
                    icon={<ArrowRight className="h-5 w-5" />}
                    change={{ value: 2, isPositive: false }}
                  />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h3 className="font-medium text-lg mb-3">Process Timeline</h3>
                    <div className="bg-muted/20 border rounded-md h-[300px] flex items-center justify-center">
                      <div className="text-muted-foreground flex flex-col items-center">
                        <BarChart3 className="h-10 w-10 mb-2 opacity-70" />
                        <p>[Process Timeline Visualization]</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-lg">Top Bottlenecks</h3>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <BottleneckItem
                        step="Credit Verification"
                        impact="High"
                        avgDuration="48 hours"
                        occurrence="35%"
                      />
                      <BottleneckItem
                        step="Invoice Approval"
                        impact="Medium"
                        avgDuration="24 hours"
                        occurrence="28%"
                      />
                      <BottleneckItem
                        step="Shipping Confirmation"
                        impact="Medium"
                        avgDuration="12 hours"
                        occurrence="15%"
                      />
                      <BottleneckItem
                        step="Order Validation"
                        impact="Low"
                        avgDuration="6 hours"
                        occurrence="10%"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-lg mb-3">Activity Frequency</h3>
                    <div className="bg-muted/20 border rounded-md h-[250px] flex items-center justify-center">
                      <div className="text-muted-foreground flex flex-col items-center">
                        <BarChart3 className="h-10 w-10 mb-2 opacity-70" />
                        <p>[Activity Frequency Chart]</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-3">Conformance Check</h3>
                    <div className="bg-muted/20 border rounded-md h-[250px] flex items-center justify-center">
                      <div className="text-muted-foreground flex flex-col items-center">
                        <BarChart3 className="h-10 w-10 mb-2 opacity-70" />
                        <p>[Conformance Heatmap]</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="process-discovery" className="mt-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-lg">Discovered Process Model</h3>
                    <p className="text-sm text-muted-foreground">Automatically generated from 2,458 process instances</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" className="gap-1">
                          <Download className="h-4 w-4" />
                          Export
                          <ChevronDown className="h-3 w-3 opacity-70" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          Export as BPMN
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Export as SVG
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Export as PNG
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="bg-white border rounded-md h-[600px] flex items-center justify-center">
                  <div className="text-muted-foreground flex flex-col items-center">
                    <p>[Discovered Process Model Visualization]</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">23</div>
                      <p className="text-muted-foreground text-sm">Unique activities discovered</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Paths</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">42</div>
                      <p className="text-muted-foreground text-sm">Process paths identified</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Accuracy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">94%</div>
                      <p className="text-muted-foreground text-sm">Model represents actual behavior</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="bottlenecks" className="mt-0">
                <div className="mb-6">
                  <h3 className="font-medium text-lg">Process Bottleneck Analysis</h3>
                  <p className="text-sm text-muted-foreground">Identifying performance issues and throughput constraints</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-white border rounded-md h-[500px] flex items-center justify-center">
                      <div className="text-muted-foreground flex flex-col items-center">
                        <p>[Process Bottleneck Heat Map]</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Card className="border-status-danger/30">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Critical Bottlenecks</CardTitle>
                          <Badge variant="destructive">High Impact</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <BottleneckDetailItem
                          name="Credit Verification"
                          waitTime="48h average"
                          impact="Delays entire fulfillment" 
                          root="Manual approval required for orders >$10k"
                        />
                        <BottleneckDetailItem
                          name="Invoice Approval"
                          waitTime="24h average"
                          impact="Delays payment collection"
                          root="Multi-level approval for non-standard terms"
                        />
                      </CardContent>
                    </Card>
                    
                    <Card className="border-status-warning/30">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Moderate Bottlenecks</CardTitle>
                          <Badge className="bg-status-warning/10 text-status-warning">Medium Impact</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <BottleneckDetailItem
                          name="Shipping Confirmation"
                          waitTime="12h average"
                          impact="Delays delivery notification"
                          root="Manual tracking updates from 3rd party shippers"
                        />
                      </CardContent>
                    </Card>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" className="gap-1">
                        <Plus className="h-4 w-4" />
                        Add Custom Analysis
                      </Button>
                      <Button size="sm">
                        View Full Report
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="conformance" className="mt-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-lg">Conformance Checking</h3>
                    <p className="text-sm text-muted-foreground">How well actual processes follow the defined model</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
                      <span className="text-sm font-medium">Compare with:</span>
                      <select className="bg-transparent border-none text-sm focus:outline-none">
                        <option>Order to Cash v2.3 (Latest)</option>
                        <option>Order to Cash v2.2</option>
                        <option>Order to Cash v2.1</option>
                      </select>
                    </div>
                    <Button size="sm" className="gap-1">
                      <Calendar className="h-4 w-4" />
                      Set Date Range
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Conformance Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">78%</div>
                      <p className="text-muted-foreground text-sm">Of cases follow the defined process</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Skipped Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12%</div>
                      <p className="text-muted-foreground text-sm">Required steps are being skipped</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Rework</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">15%</div>
                      <p className="text-muted-foreground text-sm">Activities are repeated unnecessarily</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-white border rounded-md h-[400px] flex items-center justify-center mb-6">
                  <div className="text-muted-foreground flex flex-col items-center">
                    <p>[Conformance Visualization Map]</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Top Deviations</h3>
                  <div className="border rounded-md divide-y">
                    <DeviationItem
                      type="Skipped Activity"
                      description="Credit check is bypassed for 18% of orders"
                      impact="Medium"
                      frequency="342 instances"
                      recommendation="Make credit check mandatory through system controls"
                    />
                    <DeviationItem
                      type="Wrong Sequence"
                      description="Shipping initiated before payment confirmation"
                      impact="High"
                      frequency="124 instances"
                      recommendation="Add an automated payment verification step"
                    />
                    <DeviationItem
                      type="Rework"
                      description="Invoice creation is repeated multiple times"
                      impact="Medium"
                      frequency="287 instances"
                      recommendation="Improve data validation in the order form"
                    />
                    <DeviationItem
                      type="Timeout"
                      description="Approval step exceeds SLA of 24 hours"
                      impact="High"
                      frequency="198 instances"
                      recommendation="Implement automated escalation after 12 hours"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="variants" className="mt-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-lg">Process Variants</h3>
                    <p className="text-sm text-muted-foreground">Analysis of different ways the process is executed</p>
                  </div>
                  <div className="w-64 relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search variants..."
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-muted/20 border rounded-md h-[250px] flex items-center justify-center">
                    <div className="text-muted-foreground flex flex-col items-center">
                      <BarChart3 className="h-10 w-10 mb-2 opacity-70" />
                      <p>[Variant Distribution Pie Chart]</p>
                    </div>
                  </div>
                  <div className="bg-muted/20 border rounded-md h-[250px] flex items-center justify-center">
                    <div className="text-muted-foreground flex flex-col items-center">
                      <BarChart3 className="h-10 w-10 mb-2 opacity-70" />
                      <p>[Performance by Variant]</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">Variant Details</h3>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                  <div className="border rounded-md divide-y">
                    <VariantItem
                      variant="Variant 1 (Standard Flow)"
                      cases="1,245"
                      percentage={51}
                      avgDuration="4.2 days"
                      status="Happy Path"
                    />
                    <VariantItem
                      variant="Variant 2 (Credit Check Bypass)"
                      cases="342"
                      percentage={14}
                      avgDuration="3.8 days"
                      status="Non-Compliant"
                    />
                    <VariantItem
                      variant="Variant 3 (International Orders)"
                      cases="287"
                      percentage={12}
                      avgDuration="6.5 days"
                      status="Compliant"
                    />
                    <VariantItem
                      variant="Variant 4 (Custom Products)"
                      cases="198"
                      percentage={8}
                      avgDuration="7.3 days"
                      status="Compliant"
                    />
                    <VariantItem
                      variant="Other Variants (12)"
                      cases="386"
                      percentage={15}
                      avgDuration="5.8 days"
                      status="Mixed"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

function MetricCard({ title, value, icon, change }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="mt-1 flex items-baseline gap-2">
              <h3 className="text-2xl font-semibold">{value}</h3>
              {change && (
                <span className={cn(
                  "text-xs font-medium flex items-center",
                  change.isPositive ? "text-status-success" : "text-status-danger"
                )}>
                  {change.isPositive ? "+" : "-"}{change.value}%
                </span>
              )}
            </div>
          </div>
          <div className="bg-muted/40 p-2 rounded-md">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

interface BottleneckItemProps {
  step: string;
  impact: "High" | "Medium" | "Low";
  avgDuration: string;
  occurrence: string;
}

function BottleneckItem({ step, impact, avgDuration, occurrence }: BottleneckItemProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "text-status-danger";
      case "Medium": return "text-status-warning";
      case "Low": return "text-status-info";
      default: return "";
    }
  };
  
  return (
    <div className="border rounded-md p-3 hover:border-primary hover:shadow-sm">
      <div className="flex items-center justify-between">
        <div className="font-medium">{step}</div>
        <div className={cn("text-sm font-medium", getImpactColor(impact))}>
          {impact} Impact
        </div>
      </div>
      <div className="mt-1.5 flex items-center justify-between text-sm text-muted-foreground">
        <div>Avg. wait: {avgDuration}</div>
        <div>Occurs in {occurrence} of cases</div>
      </div>
    </div>
  );
}

interface BottleneckDetailItemProps {
  name: string;
  waitTime: string;
  impact: string;
  root: string;
}

function BottleneckDetailItem({ name, waitTime, impact, root }: BottleneckDetailItemProps) {
  return (
    <div className="space-y-1.5">
      <div className="font-medium">{name}</div>
      <div className="flex items-center gap-1 text-sm">
        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
        <span>{waitTime}</span>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <AlertCircle className="h-3.5 w-3.5 text-status-danger" />
        <span>{impact}</span>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-muted-foreground">{root}</span>
      </div>
    </div>
  );
}

interface DeviationItemProps {
  type: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  frequency: string;
  recommendation: string;
}

function DeviationItem({ type, description, impact, frequency, recommendation }: DeviationItemProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "text-status-danger";
      case "Medium": return "text-status-warning";
      case "Low": return "text-status-info";
      default: return "";
    }
  };
  
  return (
    <div className="p-4 hover:bg-muted/20">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-medium">{type}</div>
          <p className="text-sm mt-1">{description}</p>
        </div>
        <Badge className={cn(
          impact === "High" ? "bg-status-danger/10 text-status-danger" :
          impact === "Medium" ? "bg-status-warning/10 text-status-warning" :
          "bg-status-info/10 text-status-info"
        )}>
          {impact} Impact
        </Badge>
      </div>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-muted-foreground">Frequency</div>
          <div>{frequency}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Recommendation</div>
          <div>{recommendation}</div>
        </div>
      </div>
    </div>
  );
}

interface VariantItemProps {
  variant: string;
  cases: string;
  percentage: number;
  avgDuration: string;
  status: "Happy Path" | "Compliant" | "Non-Compliant" | "Mixed";
}

function VariantItem({ variant, cases, percentage, avgDuration, status }: VariantItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Happy Path": return "bg-status-success/10 text-status-success";
      case "Compliant": return "bg-enterprise-blue-100 text-enterprise-blue-800";
      case "Non-Compliant": return "bg-status-danger/10 text-status-danger";
      case "Mixed": return "bg-status-warning/10 text-status-warning";
      default: return "";
    }
  };
  
  return (
    <div className="p-4 hover:bg-muted/20">
      <div className="flex items-center justify-between">
        <div className="font-medium">{variant}</div>
        <Badge className={getStatusColor(status)}>
          {status}
        </Badge>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-muted-foreground">Cases</div>
          <div className="font-medium">{cases}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Percentage</div>
          <div className="font-medium">{percentage}%</div>
        </div>
        <div>
          <div className="text-muted-foreground">Avg. Duration</div>
          <div className="font-medium">{avgDuration}</div>
        </div>
      </div>
    </div>
  );
}
