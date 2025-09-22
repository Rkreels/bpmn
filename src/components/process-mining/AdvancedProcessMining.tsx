import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Database, 
  Play, 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BarChart3,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Zap,
  Target,
  Settings
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface EventLog {
  id: string;
  name: string;
  size: number; // number of events
  cases: number; // number of process instances
  activities: number; // number of unique activities
  timespan: string;
  uploadDate: string;
  status: 'processed' | 'processing' | 'error';
}

interface ProcessVariant {
  id: string;
  frequency: number;
  duration: number;
  cost: number;
  activities: string[];
  paths: string[];
  performance: {
    throughput: number;
    cycleTime: number;
    waitTime: number;
    rework: number;
  };
}

interface ConformanceResult {
  overall: number;
  byActivity: Array<{
    activity: string;
    conformance: number;
    deviations: number;
    issues: string[];
  }>;
  deviations: Array<{
    type: 'skip' | 'insert' | 'replace' | 'rework';
    activity: string;
    frequency: number;
    impact: 'low' | 'medium' | 'high' | 'critical';
  }>;
}

interface PredictiveInsight {
  id: string;
  type: 'bottleneck' | 'delay' | 'cost' | 'quality' | 'resource';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  recommendation: string;
  expectedValue: number;
}

export const AdvancedProcessMining: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('discovery');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('inductive');
  const [selectedEventLog, setSelectedEventLog] = useState<string>('');

  const [eventLogs] = useState<EventLog[]>([
    {
      id: '1',
      name: 'Order_Processing_2024.csv',
      size: 45230,
      cases: 5420,
      activities: 15,
      timespan: 'Jan 2024 - Dec 2024',
      uploadDate: '2024-01-15',
      status: 'processed'
    },
    {
      id: '2',
      name: 'Customer_Service_Q4.csv',
      size: 28950,
      cases: 3200,
      activities: 12,
      timespan: 'Oct 2024 - Dec 2024',
      uploadDate: '2024-01-10',
      status: 'processed'
    },
    {
      id: '3',
      name: 'Invoice_Processing.csv',
      size: 15680,
      cases: 1850,
      activities: 8,
      timespan: 'Nov 2024 - Dec 2024',
      uploadDate: '2024-01-12',
      status: 'processing'
    }
  ]);

  const [variants] = useState<ProcessVariant[]>([
    {
      id: '1',
      frequency: 65,
      duration: 4.2,
      cost: 450,
      activities: ['Start', 'Validate Order', 'Check Inventory', 'Process Payment', 'Ship Order', 'End'],
      paths: ['Normal Flow'],
      performance: { throughput: 8.5, cycleTime: 4.2, waitTime: 1.8, rework: 5 }
    },
    {
      id: '2',
      frequency: 20,
      duration: 6.8,
      cost: 680,
      activities: ['Start', 'Validate Order', 'Manual Review', 'Check Inventory', 'Process Payment', 'Ship Order', 'End'],
      paths: ['Manual Review Required'],
      performance: { throughput: 6.2, cycleTime: 6.8, waitTime: 3.2, rework: 12 }
    },
    {
      id: '3',
      frequency: 15,
      duration: 8.5,
      cost: 920,
      activities: ['Start', 'Validate Order', 'Check Inventory', 'Backorder', 'Process Payment', 'Ship Order', 'End'],
      paths: ['Backorder Flow'],
      performance: { throughput: 4.1, cycleTime: 8.5, waitTime: 5.1, rework: 8 }
    }
  ]);

  const [conformanceResults] = useState<ConformanceResult>({
    overall: 78.5,
    byActivity: [
      { activity: 'Validate Order', conformance: 95.2, deviations: 24, issues: ['Missing validation step in 24 cases'] },
      { activity: 'Check Inventory', conformance: 87.3, deviations: 68, issues: ['Inventory check bypassed', 'Duplicate checks'] },
      { activity: 'Process Payment', conformance: 92.1, deviations: 42, issues: ['Payment verification skipped'] },
      { activity: 'Ship Order', conformance: 65.8, deviations: 183, issues: ['Shipping without payment confirmation', 'Duplicate shipping entries'] }
    ],
    deviations: [
      { type: 'skip', activity: 'Inventory Check', frequency: 45, impact: 'high' },
      { type: 'insert', activity: 'Additional Review', frequency: 32, impact: 'medium' },
      { type: 'rework', activity: 'Payment Processing', frequency: 28, impact: 'high' },
      { type: 'replace', activity: 'Manual Validation', frequency: 15, impact: 'low' }
    ]
  });

  const [insights] = useState<PredictiveInsight[]>([
    {
      id: '1',
      type: 'bottleneck',
      title: 'Inventory Check Bottleneck Predicted',
      description: 'AI model predicts inventory check will become a major bottleneck in the next 2 weeks',
      confidence: 89,
      impact: 'high',
      probability: 0.85,
      recommendation: 'Increase inventory check capacity by 40% or implement automated checks',
      expectedValue: 15000
    },
    {
      id: '2',
      type: 'delay',
      title: 'Payment Processing Delays Expected',
      description: 'Historical patterns suggest payment processing delays will increase by 25%',
      confidence: 76,
      impact: 'medium',
      probability: 0.72,
      recommendation: 'Optimize payment gateway integration and add backup payment methods',
      expectedValue: 8500
    },
    {
      id: '3',
      type: 'cost',
      title: 'Manual Review Cost Escalation',
      description: 'Cost of manual reviews is expected to increase due to complexity growth',
      confidence: 82,
      impact: 'high',
      probability: 0.78,
      recommendation: 'Implement AI-assisted review system to reduce manual intervention',
      expectedValue: 22000
    }
  ]);

  // Mock data for charts
  const performanceData = [
    { name: 'Week 1', throughput: 120, cycleTime: 4.2, cost: 450 },
    { name: 'Week 2', throughput: 135, cycleTime: 3.8, cost: 420 },
    { name: 'Week 3', throughput: 128, cycleTime: 4.5, cost: 480 },
    { name: 'Week 4', throughput: 142, cycleTime: 3.9, cost: 440 },
    { name: 'Week 5', throughput: 115, cycleTime: 5.1, cost: 520 },
    { name: 'Week 6', throughput: 138, cycleTime: 4.0, cost: 460 }
  ];

  const bottleneckData = [
    { activity: 'Validate Order', utilization: 65, waitTime: 1.2 },
    { activity: 'Check Inventory', utilization: 89, waitTime: 3.5 },
    { activity: 'Process Payment', utilization: 72, waitTime: 2.1 },
    { activity: 'Ship Order', utilization: 58, waitTime: 0.8 }
  ];

  const variantDistribution = variants.map(v => ({
    name: `Variant ${v.id}`,
    value: v.frequency,
    duration: v.duration,
    cost: v.cost
  }));

  const runProcessDiscovery = async () => {
    if (!selectedEventLog) {
      toast({
        title: "No Event Log Selected",
        description: "Please select an event log to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          toast({
            title: "Process Discovery Complete",
            description: `Process model discovered using ${selectedAlgorithm} algorithm.`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Advanced Process Mining</h2>
          <p className="text-muted-foreground">AI-powered process discovery and analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload Event Log
          </Button>
          <Button onClick={runProcessDiscovery} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Discover Process
              </>
            )}
          </Button>
        </div>
      </div>

      {isAnalyzing && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Process Discovery Progress</span>
                <span className="text-sm text-muted-foreground">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Running {selectedAlgorithm} algorithm on {eventLogs.find(log => log.id === selectedEventLog)?.name}...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="discovery">Discovery</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="conformance">Conformance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="predictions">AI Insights</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="discovery" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Log Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedEventLog} onValueChange={setSelectedEventLog}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event log" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventLogs.map((log) => (
                      <SelectItem key={log.id} value={log.id}>
                        {log.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedEventLog && (
                  <div className="space-y-2">
                    {(() => {
                      const log = eventLogs.find(l => l.id === selectedEventLog);
                      return log ? (
                        <>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>Events: {log.size.toLocaleString()}</div>
                            <div>Cases: {log.cases.toLocaleString()}</div>
                            <div>Activities: {log.activities}</div>
                            <div>
                              <Badge variant="secondary" className={getStatusColor(log.status)}>
                                {log.status}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Timespan: {log.timespan}
                          </p>
                        </>
                      ) : null;
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Discovery Algorithm</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alpha">Alpha Algorithm</SelectItem>
                    <SelectItem value="inductive">Inductive Miner</SelectItem>
                    <SelectItem value="heuristic">Heuristic Miner</SelectItem>
                    <SelectItem value="genetic">Genetic Algorithm</SelectItem>
                    <SelectItem value="fuzzy">Fuzzy Miner</SelectItem>
                  </SelectContent>
                </Select>

                <div className="space-y-2 text-sm">
                  <p><strong>Algorithm Benefits:</strong></p>
                  {selectedAlgorithm === 'inductive' && (
                    <p className="text-muted-foreground">Handles noise well, guarantees sound models, works with incomplete logs</p>
                  )}
                  {selectedAlgorithm === 'alpha' && (
                    <p className="text-muted-foreground">Fast, simple, good for structured processes with clear control flow</p>
                  )}
                  {selectedAlgorithm === 'heuristic' && (
                    <p className="text-muted-foreground">Handles noise and incompleteness, provides frequency information</p>
                  )}
                  {selectedAlgorithm === 'genetic' && (
                    <p className="text-muted-foreground">Optimizes for fitness, handles complex processes and noise</p>
                  )}
                  {selectedAlgorithm === 'fuzzy' && (
                    <p className="text-muted-foreground">Shows process map with frequencies, handles spaghetti processes</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Noise Threshold</Label>
                    <Slider defaultValue={[20]} max={100} step={5} />
                  </div>
                  <div>
                    <Label>Activity Threshold</Label>
                    <Slider defaultValue={[5]} max={50} step={1} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Available Event Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eventLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Database className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="font-semibold">{log.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {log.size.toLocaleString()} events • {log.cases.toLocaleString()} cases • {log.activities} activities
                        </p>
                        <p className="text-xs text-muted-foreground">{log.timespan}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variants" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Process Variants Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={variantDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {variantDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#ef4444', '#10b981', '#f59e0b'][index % 4]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Variant Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={variantDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#3b82f6" name="Duration (hours)" />
                    <Bar dataKey="cost" fill="#ef4444" name="Cost ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {variants.map((variant) => (
              <Card key={variant.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">Variant {variant.id}</h3>
                        <Badge variant="outline">{variant.frequency}% frequency</Badge>
                        <Badge variant="secondary">{variant.duration}h avg duration</Badge>
                        <Badge variant="secondary">${variant.cost} avg cost</Badge>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm text-muted-foreground mb-1">Activity Sequence:</p>
                        <div className="flex flex-wrap gap-1">
                          {variant.activities.map((activity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Throughput</p>
                          <p className="font-semibold">{variant.performance.throughput}/h</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Cycle Time</p>
                          <p className="font-semibold">{variant.performance.cycleTime}h</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Wait Time</p>
                          <p className="font-semibold">{variant.performance.waitTime}h</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Rework Rate</p>
                          <p className="font-semibold">{variant.performance.rework}%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analyze
                      </Button>
                      <Button variant="outline" size="sm">
                        <Target className="w-4 h-4 mr-1" />
                        Optimize
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="conformance" className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Conformance</p>
                    <p className="text-2xl font-bold">{conformanceResults.overall}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertTriangle className="w-8 h-8 text-orange-500 mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Deviations</p>
                    <p className="text-2xl font-bold">{conformanceResults.deviations.reduce((sum, dev) => sum + dev.frequency, 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Critical Issues</p>
                    <p className="text-2xl font-bold">{conformanceResults.deviations.filter(d => d.impact === 'high' || d.impact === 'critical').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Conformance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conformanceResults.byActivity.map((activity, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{activity.activity}</span>
                        <Badge variant={activity.conformance > 90 ? 'default' : activity.conformance > 70 ? 'secondary' : 'destructive'}>
                          {activity.conformance}%
                        </Badge>
                      </div>
                      <Progress value={activity.conformance} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {activity.deviations} deviations found
                      </p>
                      {activity.issues.length > 0 && (
                        <div className="text-xs">
                          {activity.issues.map((issue, i) => (
                            <p key={i} className="text-red-600">• {issue}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deviation Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {conformanceResults.deviations.map((deviation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {deviation.type}
                          </Badge>
                          <span className="font-medium">{deviation.activity}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {deviation.frequency} occurrences
                        </p>
                      </div>
                      <Badge className={getImpactColor(deviation.impact)}>
                        {deviation.impact}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="throughput" stroke="#3b82f6" name="Throughput" />
                    <Line type="monotone" dataKey="cycleTime" stroke="#ef4444" name="Cycle Time" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization & Bottlenecks</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bottleneckData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="utilization" fill="#3b82f6" name="Utilization %" />
                    <Bar dataKey="waitTime" fill="#ef4444" name="Wait Time (hours)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Bottlenecks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bottleneckData
                  .filter(item => item.utilization > 80 || item.waitTime > 2)
                  .map((bottleneck, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-red-50">
                      <div>
                        <h4 className="font-semibold text-red-800">{bottleneck.activity}</h4>
                        <p className="text-sm text-red-600">
                          {bottleneck.utilization}% utilization, {bottleneck.waitTime}h average wait time
                        </p>
                      </div>
                      <Badge variant="destructive">Bottleneck</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="space-y-4">
            {insights.map((insight) => (
              <Card key={insight.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        <h3 className="font-semibold">{insight.title}</h3>
                        <Badge className={getImpactColor(insight.impact)}>
                          {insight.impact} impact
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Confidence</p>
                          <p className="font-semibold">{insight.confidence}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Probability</p>
                          <p className="font-semibold">{Math.round(insight.probability * 100)}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Expected Value</p>
                          <p className="font-semibold">${insight.expectedValue.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm"><strong>Recommendation:</strong> {insight.recommendation}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      <Button size="sm">
                        Act Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Process Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-800">Automate Inventory Checks</h4>
                  <p className="text-sm text-muted-foreground">
                    Implementing automated inventory checks could reduce bottlenecks by 45% and save $18,000 annually.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">ROI: 340%</Badge>
                    <Badge variant="outline">Implementation: 2 weeks</Badge>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800">Optimize Resource Allocation</h4>
                  <p className="text-sm text-muted-foreground">
                    Reallocating resources based on demand patterns could improve throughput by 25%.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">Cost: Neutral</Badge>
                    <Badge variant="outline">Impact: High</Badge>
                  </div>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-800">Implement Parallel Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Running payment and inventory checks in parallel could reduce cycle time by 30%.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">Complexity: Medium</Badge>
                    <Badge variant="outline">Time Savings: 1.5h avg</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Current State</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>Avg Cycle Time: 4.2h</p>
                  <p>Throughput: 8.5 cases/h</p>
                  <p>Cost per Case: $450</p>
                  <p>Quality Score: 78.5%</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Optimized State</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>Avg Cycle Time: 2.9h <span className="text-green-600">(-31%)</span></p>
                  <p>Throughput: 12.1 cases/h <span className="text-green-600">(+42%)</span></p>
                  <p>Cost per Case: $320 <span className="text-green-600">(-29%)</span></p>
                  <p>Quality Score: 94.2% <span className="text-green-600">(+20%)</span></p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Projected Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>Annual Cost Savings: <span className="font-bold text-green-600">$285,000</span></p>
                  <p>Time Savings: <span className="font-bold text-green-600">1,250 hours</span></p>
                  <p>Quality Improvement: <span className="font-bold text-green-600">15.7%</span></p>
                  <p>ROI: <span className="font-bold text-green-600">420%</span></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};