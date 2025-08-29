import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  Clock,
  TrendingUp,
  BarChart3,
  Download,
  RefreshCw
} from 'lucide-react';
import { enterpriseDataService, ComplianceRule, AuditLog } from '@/services/enterpriseDataService';
import { useToast } from '@/hooks/use-toast';

export const ComplianceManagement: React.FC = () => {
  const [complianceRules, setComplianceRules] = useState<ComplianceRule[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadComplianceData();
  }, []);

  const loadComplianceData = async () => {
    setLoading(true);
    try {
      const [rules, logs] = await Promise.all([
        enterpriseDataService.getComplianceRules(),
        enterpriseDataService.getAuditLogs()
      ]);
      setComplianceRules(rules);
      setAuditLogs(logs);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load compliance data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-status-danger text-white';
      case 'high': return 'bg-status-warning text-white';
      case 'medium': return 'bg-status-info text-white';
      case 'low': return 'bg-status-success text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'data-privacy': return <Shield className="h-4 w-4" />;
      case 'financial': return <BarChart3 className="h-4 w-4" />;
      case 'operational': return <FileText className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const overallComplianceScore = complianceRules.length > 0 
    ? complianceRules.reduce((sum, rule) => sum + rule.complianceScore, 0) / complianceRules.length 
    : 0;

  const criticalRules = complianceRules.filter(rule => rule.severity === 'critical' && rule.complianceScore < 90);

  const exportComplianceReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      overallScore: overallComplianceScore,
      totalRules: complianceRules.length,
      criticalIssues: criticalRules.length,
      rules: complianceRules,
      recentAudits: auditLogs.slice(0, 20)
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compliance-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Report Exported",
      description: "Compliance report has been downloaded"
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-20 bg-muted rounded-t-lg" />
              <CardContent className="h-24 bg-muted/50" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Compliance Management</h2>
          <p className="text-muted-foreground">
            Monitor regulatory compliance and audit activities
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportComplianceReport} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={loadComplianceData} variant="outline" size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalRules.length > 0 && (
        <Alert className="border-status-danger bg-status-danger/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {criticalRules.length} critical compliance rule(s) below 90% compliance threshold
          </AlertDescription>
        </Alert>
      )}

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span className={overallComplianceScore >= 90 ? 'text-status-success' : 'text-status-warning'}>
                {overallComplianceScore.toFixed(1)}%
              </span>
            </div>
            <Progress value={overallComplianceScore} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceRules.filter(r => r.isActive).length}</div>
            <p className="text-xs text-muted-foreground">
              of {complianceRules.length} total rules
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-danger">{criticalRules.length}</div>
            <p className="text-xs text-muted-foreground">
              requiring immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for detailed view */}
      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rules">Compliance Rules</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <div className="grid gap-4">
            {complianceRules.map((rule) => (
              <Card key={rule.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(rule.category)}
                      <CardTitle className="text-lg">{rule.name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(rule.severity)}>
                        {rule.severity.toUpperCase()}
                      </Badge>
                      <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                        {rule.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{rule.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Regulation</div>
                      <div className="font-medium">{rule.regulation}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Category</div>
                      <div className="font-medium capitalize">{rule.category.replace('-', ' ')}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Compliance Score</span>
                      <span className={rule.complianceScore >= 90 ? 'text-status-success' : 'text-status-warning'}>
                        {rule.complianceScore.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={rule.complianceScore} className="h-2" />
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    Last checked: {rule.lastChecked.toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Audit Activities</CardTitle>
              <CardDescription>
                Detailed log of user actions and system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {auditLogs.slice(0, 20).map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{log.action}</Badge>
                        <span className="text-sm font-medium">{log.resourceType}</span>
                        <span className="text-sm text-muted-foreground">#{log.resourceId}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        by {log.userId} • {log.ipAddress}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{log.timestamp.toLocaleTimeString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {log.timestamp.toLocaleDateString()}
                      </div>
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