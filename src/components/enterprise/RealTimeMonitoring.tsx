import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  DollarSign,
  Users,
  RefreshCw
} from 'lucide-react';
import { enterpriseDataService, ProcessMetrics, KPI } from '@/services/enterpriseDataService';
import { useToast } from '@/hooks/use-toast';

export const RealTimeMonitoring: React.FC = () => {
  const [metrics, setMetrics] = useState<ProcessMetrics[]>([]);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const { toast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const [metricsData, kpisData] = await Promise.all([
        enterpriseDataService.getProcessMetrics(),
        enterpriseDataService.getKPIs()
      ]);
      setMetrics(metricsData);
      setKpis(kpisData);
      setLastRefresh(new Date());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load monitoring data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Set up real-time refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, target: number, isInverse = false) => {
    const ratio = value / target;
    if (isInverse) {
      return ratio <= 0.8 ? 'text-status-success' : ratio <= 1.2 ? 'text-status-warning' : 'text-status-danger';
    }
    return ratio >= 0.9 ? 'text-status-success' : ratio >= 0.7 ? 'text-status-warning' : 'text-status-danger';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-status-success" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-status-danger" />;
      default: return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (loading && metrics.length === 0) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-20 bg-muted rounded-t-lg" />
            <CardContent className="h-24 bg-muted/50" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Real-Time Process Monitoring</h2>
          <p className="text-muted-foreground">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <Button 
          onClick={loadData} 
          disabled={loading}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Critical Alerts */}
      <div className="space-y-2">
        {metrics.some(m => m.slaCompliance < 95) && (
          <Alert className="border-status-warning bg-status-warning/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              SLA compliance below threshold detected in {metrics.filter(m => m.slaCompliance < 95).length} process(es)
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
              {getTrendIcon(kpi.trend)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <span className={getStatusColor(kpi.value, kpi.target, kpi.category === 'cost')}>
                  {kpi.value.toFixed(1)}{kpi.unit}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>Target: {kpi.target}{kpi.unit}</span>
                <Badge variant={kpi.changePercent > 0 ? 'default' : 'secondary'}>
                  {kpi.changePercent > 0 ? '+' : ''}{kpi.changePercent.toFixed(1)}%
                </Badge>
              </div>
              <Progress 
                value={(kpi.value / kpi.target) * 100} 
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Process Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        {metrics.map((metric) => (
          <Card key={metric.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Process {metric.processId}
                <Badge variant={metric.slaCompliance >= 95 ? 'default' : 'destructive'}>
                  {metric.slaCompliance >= 95 ? 'Healthy' : 'At Risk'}
                </Badge>
              </CardTitle>
              <CardDescription>
                Real-time performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    Execution Time
                  </div>
                  <div className="text-lg font-semibold">{metric.executionTime.toFixed(1)}s</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                    Completion Rate
                  </div>
                  <div className="text-lg font-semibold text-status-success">
                    {metric.completionRate.toFixed(1)}%
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <AlertTriangle className="h-4 w-4 mr-1 text-muted-foreground" />
                    Error Rate
                  </div>
                  <div className={`text-lg font-semibold ${metric.errorRate < 5 ? 'text-status-success' : 'text-status-danger'}`}>
                    {metric.errorRate.toFixed(1)}%
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                    Cost per Execution
                  </div>
                  <div className="text-lg font-semibold">${metric.costPerExecution.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Resource Utilization</span>
                  <span>{metric.resourceUtilization.toFixed(1)}%</span>
                </div>
                <Progress value={metric.resourceUtilization} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>SLA Compliance</span>
                  <span className={metric.slaCompliance >= 95 ? 'text-status-success' : 'text-status-warning'}>
                    {metric.slaCompliance.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={metric.slaCompliance} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};