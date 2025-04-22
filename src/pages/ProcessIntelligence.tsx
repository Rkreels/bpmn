
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Calendar,
  Clock,
  Download,
  FileUp,
  Filter,
  Laptop,
  LineChart,
  Locate,
  Minus,
  PieChart,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Sliders,
  Timer,
  Upload
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis
} from "recharts";

// Sample data for charts
const processPerformanceData = [
  { date: "Jan", actual: 65, expected: 80 },
  { date: "Feb", actual: 59, expected: 80 },
  { date: "Mar", actual: 80, expected: 80 },
  { date: "Apr", actual: 81, expected: 80 },
  { date: "May", actual: 56, expected: 80 },
  { date: "Jun", actual: 55, expected: 80 },
  { date: "Jul", actual: 40, expected: 80 },
  { date: "Aug", actual: 70, expected: 80 },
  { date: "Sep", actual: 90, expected: 80 },
  { date: "Oct", actual: 85, expected: 80 },
  { date: "Nov", actual: 79, expected: 80 },
  { date: "Dec", actual: 94, expected: 80 }
];

const eventLogSummary = [
  { name: "Order Processing", cases: 1254, variants: 12, avgDuration: "3.2 days" },
  { name: "Invoice Handling", cases: 876, variants: 8, avgDuration: "1.5 days" },
  { name: "Customer Onboarding", cases: 542, variants: 15, avgDuration: "5.7 days" },
  { name: "Service Request", cases: 1890, variants: 23, avgDuration: "2.1 days" },
  { name: "Supplier Management", cases: 423, variants: 7, avgDuration: "4.3 days" },
];

export default function ProcessIntelligence() {
  return (
    <MainLayout pageTitle="Process Intelligence">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Process Performance Analysis</CardTitle>
                <CardDescription>
                  Process cycle time and performance metrics
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={processPerformanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      name="Actual Cycle Time"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="expected"
                      name="Expected Cycle Time"
                      stroke="#82ca9d"
                      strokeDasharray="5 5"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-wrap gap-4 justify-between">
                <ProcessMetricCard
                  title="Avg. Cycle Time"
                  value="3.2 days"
                  change="-12%"
                  changeDirection="down"
                  icon={<Clock className="h-4 w-4 text-muted-foreground" />}
                />
                <ProcessMetricCard
                  title="Process Variants"
                  value="27"
                  change="+5"
                  changeDirection="up"
                  icon={<Sliders className="h-4 w-4 text-muted-foreground" />}
                />
                <ProcessMetricCard
                  title="Automation Rate"
                  value="68%"
                  change="+7%"
                  changeDirection="up"
                  icon={<Laptop className="h-4 w-4 text-muted-foreground" />}
                />
                <ProcessMetricCard
                  title="Bottlenecks"
                  value="3"
                  change="-2"
                  changeDirection="down"
                  icon={<Timer className="h-4 w-4 text-muted-foreground" />}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Event Log Analysis</CardTitle>
              <CardDescription>
                Upload and analyze process event logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="rounded-lg border border-dashed border-primary/50 bg-muted/50 p-6 text-center">
                  <div className="mx-auto flex max-w-[180px] flex-col items-center justify-center gap-2">
                    <FileUp className="h-10 w-10 text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p>CSV, XES, or XLSX (max. 50MB)</p>
                    </div>
                    <Button size="sm">Upload Event Log</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Recent Event Logs</h3>
                  {eventLogSummary.map((log, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3 text-sm"
                    >
                      <div>
                        <p className="font-medium">{log.name}</p>
                        <div className="text-xs text-muted-foreground mt-1">
                          <span>{log.cases} cases</span>
                          <span className="mx-2">•</span>
                          <span>{log.variants} variants</span>
                          <span className="mx-2">•</span>
                          <span>{log.avgDuration}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Analyze
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Process Discovery</CardTitle>
                <CardDescription>
                  Automatically discover process models from event logs
                </CardDescription>
              </div>
              
              <Tabs defaultValue="activity">
                <TabsList>
                  <TabsTrigger value="activity">Activity View</TabsTrigger>
                  <TabsTrigger value="process">Process View</TabsTrigger>
                  <TabsTrigger value="social">Social View</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search activities..."
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Minus className="h-4 w-4" />
                  Zoom Out
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Zoom In
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>

            <Tabs defaultValue="activity">
              <TabsContent value="activity" className="m-0">
                <div className="h-[500px] bg-muted/50 rounded-lg border flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <LineChart className="h-16 w-16 text-muted-foreground/60" />
                    <div>
                      <h3 className="text-lg font-medium">Process Activities View</h3>
                      <p className="text-sm text-muted-foreground">Discover and analyze process activities and their relationships</p>
                    </div>
                    <Button className="mt-2">Generate Activity View</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="process" className="m-0">
                <div className="h-[500px] bg-muted/50 rounded-lg border flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <PieChart className="h-16 w-16 text-muted-foreground/60" />
                    <div>
                      <h3 className="text-lg font-medium">Process Flow View</h3>
                      <p className="text-sm text-muted-foreground">Visualize complete process flows based on event data</p>
                    </div>
                    <Button className="mt-2">Generate Process View</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="social" className="m-0">
                <div className="h-[500px] bg-muted/50 rounded-lg border flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <BarChart className="h-16 w-16 text-muted-foreground/60" />
                    <div>
                      <h3 className="text-lg font-medium">Social Interaction View</h3>
                      <p className="text-sm text-muted-foreground">Analyze handovers and interactions between process participants</p>
                    </div>
                    <Button className="mt-2">Generate Social View</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Root Cause Analysis</CardTitle>
            <CardDescription>
              Identify factors contributing to process bottlenecks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Issue: Long Approval Times</h3>
                  <p className="text-xs text-muted-foreground">Average delay: 3.5 days</p>
                </div>
                <Button variant="outline" size="sm">Analyze</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Contributing Factors:</h4>
                <FactorItem
                  factor="Missing Documentation"
                  impact="High"
                  frequency="62%"
                />
                <FactorItem
                  factor="Approver Unavailable"
                  impact="Medium"
                  frequency="38%"
                />
                <FactorItem
                  factor="System Delays"
                  impact="Low"
                  frequency="14%"
                />
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button size="sm">Generate Recommendations</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conformance Checking</CardTitle>
            <CardDescription>
              Compare actual process execution against reference models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <label className="text-sm font-medium">Reference Process Model</label>
                  <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>Order to Cash (Standard)</option>
                    <option>Customer Onboarding (v2)</option>
                    <option>Incident Management</option>
                  </select>
                </div>
                <Button className="mt-6" size="sm">Compare</Button>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Conformance Results</h3>
                <div className="space-y-3">
                  <ConformanceItem
                    label="Fitness"
                    value={0.85}
                    description="How well the event log can be replayed on the model"
                  />
                  <ConformanceItem
                    label="Precision"
                    value={0.72}
                    description="How well the model describes the observed behavior"
                  />
                  <ConformanceItem
                    label="Generalization"
                    value={0.91}
                    description="How well the model generalizes the observed behavior"
                  />
                </div>
              </div>
              
              <div className="rounded-lg bg-muted/50 p-3 text-center text-sm">
                <p>13 cases with conformance issues detected</p>
                <Button variant="link" size="sm" className="mt-1">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

// Helper components
function ProcessMetricCard({ title, value, change, changeDirection, icon }) {
  return (
    <div className="bg-muted/40 rounded-lg p-3 min-w-[130px]">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{title}</span>
        {icon}
      </div>
      <div className="mt-2 flex items-baseline">
        <span className="text-2xl font-semibold">{value}</span>
        <span className={`ml-2 text-xs ${
          changeDirection === "up" ? "text-status-success" : "text-status-danger"
        }`}>
          {change}
        </span>
      </div>
    </div>
  );
}

function FactorItem({ factor, impact, frequency }) {
  const impactColors = {
    High: "bg-status-danger/20 text-status-danger",
    Medium: "bg-status-warning/20 text-status-warning",
    Low: "bg-status-success/20 text-status-success",
  };
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`px-2 py-0.5 rounded text-xs ${impactColors[impact]}`}>
          {impact}
        </div>
        <span className="text-sm">{factor}</span>
      </div>
      <span className="text-sm font-medium">{frequency}</span>
    </div>
  );
}

function ConformanceItem({ label, value, description }) {
  // Calculate color based on value
  const getColor = (val) => {
    if (val >= 0.8) return "text-status-success";
    if (val >= 0.6) return "text-status-warning";
    return "text-status-danger";
  };
  
  const percentage = Math.round(value * 100);
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className={`font-medium ${getColor(value)}`}>{percentage}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted">
        <div 
          className={`h-2 rounded-full ${getColor(value)}`} 
          style={{ width: `${percentage}%`, opacity: 0.5 }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
