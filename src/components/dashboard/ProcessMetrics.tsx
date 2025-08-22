import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Users,
  FileText,
  BarChart3
} from 'lucide-react';

const ProcessMetrics: React.FC = () => {
  const metrics = [
    {
      title: "Active Processes",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Completion Rate",
      value: "89%",
      change: "+5%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Avg. Cycle Time",
      value: "4.2h",
      change: "-8%",
      trend: "down",
      icon: Clock,
      color: "text-orange-600"
    },
    {
      title: "Active Users",
      value: "156",
      change: "+23%",
      trend: "up",
      icon: Users,
      color: "text-purple-600"
    }
  ];

  const processHealth = [
    { name: "Order Processing", status: "healthy", completion: 95 },
    { name: "Customer Onboarding", status: "warning", completion: 78 },
    { name: "Invoice Management", status: "healthy", completion: 92 },
    { name: "Support Ticket Resolution", status: "critical", completion: 65 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendIcon className={`h-3 w-3 mr-1 ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`} />
                      <span className={`text-xs ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <Icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Process Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Process Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {processHealth.map((process, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium">{process.name}</span>
                  <Badge 
                    variant="secondary" 
                    className={getStatusColor(process.status)}
                  >
                    {process.status}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  {process.completion}%
                </span>
              </div>
              <Progress 
                value={process.completion} 
                className="h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <button className="p-3 text-left rounded-lg border hover:bg-accent transition-colors">
              <FileText className="h-5 w-5 mb-2 text-blue-600" />
              <p className="font-medium text-sm">New Process</p>
            </button>
            <button className="p-3 text-left rounded-lg border hover:bg-accent transition-colors">
              <BarChart3 className="h-5 w-5 mb-2 text-green-600" />
              <p className="font-medium text-sm">View Analytics</p>
            </button>
            <button className="p-3 text-left rounded-lg border hover:bg-accent transition-colors">
              <Users className="h-5 w-5 mb-2 text-purple-600" />
              <p className="font-medium text-sm">Manage Users</p>
            </button>
            <button className="p-3 text-left rounded-lg border hover:bg-accent transition-colors">
              <AlertTriangle className="h-5 w-5 mb-2 text-orange-600" />
              <p className="font-medium text-sm">View Alerts</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessMetrics;