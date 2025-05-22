
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Clock,
  Database,
  Download,
  FileUp,
  Filter,
  RefreshCw,
  Search,
  Settings,
  Upload,
  Sigma,
  LineChart,
  Network,
  Activity,
  Workflow
} from "lucide-react";

export default function ProcessMining() {
  const [activeTab, setActiveTab] = useState("discovery");
  const [selectedLog, setSelectedLog] = useState<string | null>(null);

  const eventLogs = [
    { id: "log1", name: "Order Processing Log", cases: 1287, events: 8721, timestamp: "2023-09-15" },
    { id: "log2", name: "Customer Service Log", cases: 943, events: 5432, timestamp: "2023-10-02" },
    { id: "log3", name: "Production Process Log", cases: 425, events: 3198, timestamp: "2023-10-10" }
  ];

  const handleLogSelect = (logId: string) => {
    setSelectedLog(logId);
  };

  return (
    <MainLayout pageTitle="Process Mining">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Process Logs</CardTitle>
              <CardDescription>Event logs for process mining</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search logs..." className="pl-8" />
                </div>

                <Button className="w-full" size="sm">
                  <FileUp className="h-4 w-4 mr-2" /> Upload New Log
                </Button>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Available Event Logs</h3>
                  {eventLogs.map(log => (
                    <div
                      key={log.id}
                      onClick={() => handleLogSelect(log.id)}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedLog === log.id ? "bg-muted border-primary/50" : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{log.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Database className="h-3 w-3 mr-1" />
                            <span>{log.cases} cases, {log.events} events</span>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Data Sources</h3>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Database className="h-4 w-4 mr-2" /> Connect Database
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" /> Import from SAP
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs */}
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Process Mining</CardTitle>
                  <CardDescription>Discover, analyze and enhance your processes</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" /> Settings
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="discovery">
                    <Activity className="h-4 w-4 mr-2" /> Discovery
                  </TabsTrigger>
                  <TabsTrigger value="conformance">
                    <Sigma className="h-4 w-4 mr-2" /> Conformance
                  </TabsTrigger>
                  <TabsTrigger value="enhancement">
                    <LineChart className="h-4 w-4 mr-2" /> Enhancement
                  </TabsTrigger>
                  <TabsTrigger value="social">
                    <Network className="h-4 w-4 mr-2" /> Social
                  </TabsTrigger>
                  <TabsTrigger value="simulation">
                    <Workflow className="h-4 w-4 mr-2" /> Simulation
                  </TabsTrigger>
                </TabsList>

                {/* Discovery */}
                <TabsContent value="discovery">
                  <MiningTabContent
                    title="Process Discovery"
                    description="Automatically discover process models from event logs"
                    actionLabel="Discover Process Model"
                    icon={<Activity className="h-16 w-16 text-muted-foreground/60" />}
                  />
                </TabsContent>

                {/* Conformance */}
                <TabsContent value="conformance">
                  <MiningTabContent
                    title="Conformance Checking"
                    description="Compare process execution against reference models to identify deviations"
                    actionLabel="Check Conformance"
                    icon={<Sigma className="h-16 w-16 text-muted-foreground/60" />}
                  />
                </TabsContent>

                {/* Enhancement */}
                <TabsContent value="enhancement">
                  <MiningTabContent
                    title="Process Enhancement"
                    description="Extend and improve process models with performance metrics and bottleneck analysis"
                    actionLabel="Enhance Process Model"
                    icon={<LineChart className="h-16 w-16 text-muted-foreground/60" />}
                  />
                </TabsContent>

                {/* Social */}
                <TabsContent value="social">
                  <MiningTabContent
                    title="Social Network Analysis"
                    description="Analyze interactions and handovers between people and departments"
                    actionLabel="Generate Social Network"
                    icon={<Network className="h-16 w-16 text-muted-foreground/60" />}
                  />
                </TabsContent>

                {/* Simulation */}
                <TabsContent value="simulation">
                  <MiningTabContent
                    title="Process Simulation"
                    description="Simulate process execution to identify bottlenecks and optimize resources"
                    actionLabel="Start Simulation"
                    icon={<Workflow className="h-16 w-16 text-muted-foreground/60" />}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Mining Settings - Only shown if a log is selected */}
          {selectedLog && (
            <Card>
              <CardHeader>
                <CardTitle>Mining Configuration</CardTitle>
                <CardDescription>
                  Configure process mining settings for {eventLogs.find(log => log.id === selectedLog)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Mining Algorithm</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Alpha Miner</option>
                        <option>Inductive Miner</option>
                        <option>Heuristics Miner</option>
                        <option>Fuzzy Miner</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Case ID Field</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>case_id</option>
                        <option>order_id</option>
                        <option>request_id</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Activity Field</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>activity</option>
                        <option>event_name</option>
                        <option>action</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Timestamp Field</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>timestamp</option>
                        <option>event_time</option>
                        <option>created_at</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Resource Field</label>
                      <select className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>resource</option>
                        <option>user_id</option>
                        <option>employee_id</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="filter_events" className="rounded" />
                        <label htmlFor="filter_events" className="text-sm">Filter infrequent events</label>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <input type="checkbox" id="merge_events" className="rounded" />
                        <label htmlFor="merge_events" className="text-sm">Merge similar activities</label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Process KPIs and Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key process performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!selectedLog && (
                    <div className="text-center py-8 text-muted-foreground">
                      <BarChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Select an event log to view performance metrics</p>
                    </div>
                  )}
                  {selectedLog && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <MetricCard 
                          label="Avg. Throughput Time" 
                          value="3.2 days" 
                          trend="-8%" 
                          trendDirection="down" 
                        />
                        <MetricCard 
                          label="Process Variants" 
                          value="42" 
                          trend="+5" 
                          trendDirection="up" 
                        />
                        <MetricCard 
                          label="Bottlenecks" 
                          value="3" 
                          trend="0" 
                          trendDirection="neutral" 
                        />
                        <MetricCard 
                          label="Rework Rate" 
                          value="12%" 
                          trend="-3%" 
                          trendDirection="down" 
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between">
                        <span className="text-sm">Process Fitness Score</span>
                        <span className="text-sm font-medium">87%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <Download className="h-4 w-4 mr-2" /> Export Metrics
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Variant Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Variant Analysis</CardTitle>
                <CardDescription>Most common process execution paths</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!selectedLog && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Workflow className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Select an event log to view variant analysis</p>
                    </div>
                  )}
                  {selectedLog && (
                    <div className="space-y-3">
                      <VariantItem
                        number={1}
                        percentage={42}
                        caseCount={538}
                        activities={5}
                        avgDuration="2.3 days"
                      />
                      <VariantItem
                        number={2}
                        percentage={29}
                        caseCount={371}
                        activities={6}
                        avgDuration="3.1 days"
                      />
                      <VariantItem
                        number={3}
                        percentage={14}
                        caseCount={179}
                        activities={7}
                        avgDuration="4.5 days"
                      />
                      <VariantItem
                        number={4}
                        percentage={8}
                        caseCount={102}
                        activities={4}
                        avgDuration="1.8 days"
                      />
                      
                      <div className="text-center text-sm mt-2">
                        <Button variant="link" size="sm">
                          View all 12 variants
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Process Timeline and Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Process Timeline</CardTitle>
              <CardDescription>
                Analyze process execution over time to identify trends and seasonality
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!selectedLog && (
                <div className="text-center py-12 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Select an event log to view process timeline</p>
                </div>
              )}
              {selectedLog && (
                <div className="h-[300px] flex items-center justify-center border rounded-lg bg-muted/20">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Timeline visualization would appear here showing process metrics over time
                    </p>
                    <Button className="mt-4">Generate Timeline</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

interface MiningTabContentProps {
  title: string;
  description: string;
  actionLabel: string;
  icon: React.ReactNode;
}

const MiningTabContent: React.FC<MiningTabContentProps> = ({ title, description, actionLabel, icon }) => (
  <div className="h-[300px] bg-muted/50 rounded-lg border flex items-center justify-center">
    <div className="flex flex-col items-center gap-3 text-center p-6">
      {icon}
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-lg">{description}</p>
      </div>
      <Button className="mt-2">{actionLabel}</Button>
    </div>
  </div>
);

interface MetricCardProps {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend, trendDirection }) => {
  const getTrendColor = () => {
    if (trendDirection === "up") return "text-status-danger";
    if (trendDirection === "down") return "text-status-success";
    return "text-muted-foreground";
  };

  return (
    <div className="bg-muted/20 p-3 rounded-lg">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="flex items-baseline mt-1">
        <span className="text-xl font-semibold">{value}</span>
        <span className={`ml-2 text-xs ${getTrendColor()}`}>
          {trend}
        </span>
      </div>
    </div>
  );
};

interface VariantItemProps {
  number: number;
  percentage: number;
  caseCount: number;
  activities: number;
  avgDuration: string;
}

const VariantItem: React.FC<VariantItemProps> = ({ 
  number, 
  percentage, 
  caseCount, 
  activities, 
  avgDuration 
}) => (
  <div className="border rounded-md p-2">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="bg-muted w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
          {number}
        </div>
        <span className="font-medium">Variant {number}</span>
      </div>
      <span className="font-semibold">{percentage}%</span>
    </div>
    <div className="mt-1 w-full bg-muted rounded-full h-1.5">
      <div 
        className="bg-blue-500 h-1.5 rounded-full" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
      <span>{caseCount} cases</span>
      <span>{activities} activities</span>
      <span>{avgDuration}</span>
    </div>
  </div>
);
