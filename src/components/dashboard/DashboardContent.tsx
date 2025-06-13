import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { PerformanceChart, ComplianceChart, BottleneckChart } from "./ProcessHealthCharts";
import { ActivityFeed } from "./ActivityFeed";
import { InitiativesList } from "./InitiativesList";
import { NotificationList } from "./NotificationList";
import { useNotifications } from "@/hooks/useNotifications";
import { 
  BarChart3, 
  Users, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Target,
  ArrowRight,
  Plus,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardContent: React.FC = () => {
  const { speakText } = useVoice();
  const { toast } = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const { notifications, markAsRead, clearAll } = useNotifications();

  const metrics = [
    { 
      label: "Active Processes", 
      value: "24", 
      change: "+12%", 
      trend: "up", 
      icon: BarChart3,
      link: "/process-manager",
      color: "text-blue-600"
    },
    { 
      label: "Team Members", 
      value: "18", 
      change: "+3", 
      trend: "up", 
      icon: Users,
      link: "/users",
      color: "text-green-600"
    },
    { 
      label: "Process Models", 
      value: "156", 
      change: "+8%", 
      trend: "up", 
      icon: FileText,
      link: "/repository",
      color: "text-purple-600"
    },
    { 
      label: "Efficiency Score", 
      value: "87%", 
      change: "+5%", 
      trend: "up", 
      icon: TrendingUp,
      link: "/process-intelligence",
      color: "text-orange-600"
    }
  ];

  const quickActions = [
    { 
      title: "Create Process", 
      description: "Start modeling a new business process",
      icon: Plus,
      link: "/process-manager",
      color: "bg-blue-500"
    },
    { 
      title: "View Analytics", 
      description: "Analyze process performance",
      icon: BarChart3,
      link: "/process-intelligence",
      color: "bg-green-500"
    },
    { 
      title: "Collaborate", 
      description: "Work with your team",
      icon: Users,
      link: "/collaboration-hub",
      color: "bg-purple-500"
    },
    { 
      title: "Generate Report", 
      description: "Create process reports",
      icon: FileText,
      link: "/reports",
      color: "bg-orange-500"
    }
  ];

  const recentProjects = [
    { 
      id: "1", 
      name: "Customer Onboarding Process", 
      status: "In Progress", 
      progress: 75, 
      team: ["John", "Sarah", "Mike"],
      lastUpdated: "2 hours ago"
    },
    { 
      id: "2", 
      name: "Invoice Processing Workflow", 
      status: "Review", 
      progress: 90, 
      team: ["Anna", "David"],
      lastUpdated: "1 day ago"
    },
    { 
      id: "3", 
      name: "Employee Feedback System", 
      status: "Completed", 
      progress: 100, 
      team: ["Lisa", "Tom", "Emma"],
      lastUpdated: "3 days ago"
    }
  ];

  const handleMetricClick = (link: string, label: string) => {
    speakText(`Navigating to ${label} dashboard`);
    toast({
      title: "Navigation",
      description: `Opening ${label} dashboard`
    });
  };

  const handleQuickAction = (action: any) => {
    speakText(`Executing ${action.title}: ${action.description}`);
    toast({
      title: action.title,
      description: action.description
    });
  };

  const handleProjectClick = (project: any) => {
    speakText(`Opening project: ${project.name}`);
    toast({
      title: "Project Details",
      description: `Opening ${project.name} details`
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    speakText("Refreshing dashboard data");
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Dashboard Refreshed",
        description: "All data has been updated successfully"
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Review": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
    speakText("Notification opened");
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your process management activities</p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing} className="w-full sm:w-auto">
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-all duration-200 cursor-pointer">
              <Link to={metric.link} onClick={() => handleMetricClick(metric.link, metric.label)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className={`h-5 w-5 ${metric.color}`} />
                        <p className="text-xs md:text-sm text-muted-foreground">{metric.label}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xl md:text-2xl font-bold">{metric.value}</p>
                        <Badge variant="outline" className="text-xs">
                          {metric.change}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
          <CardDescription>Frequently used functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link 
                  key={index} 
                  to={action.link}
                  onClick={() => handleQuickAction(action)}
                  className="block"
                >
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer hover:shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded ${action.color} text-white`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{action.title}</p>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg md:text-xl">Recent Projects</CardTitle>
              <CardDescription>Your latest process modeling projects</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/process-manager">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div 
                key={project.id} 
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{project.name}</h3>
                      <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Team: {project.team.join(", ")}</span>
                        <span>Updated: {project.lastUpdated}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Dashboard Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Process Health</CardTitle>
            <CardDescription>Performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceChart />
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <ActivityFeed />
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Recent activity updates</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationList 
                notifications={notifications}
                onClickNotification={handleNotificationClick}
                onClearAll={clearAll}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Initiatives</CardTitle>
          <CardDescription>Track progress of ongoing improvements</CardDescription>
        </CardHeader>
        <CardContent>
          <InitiativesList />
        </CardContent>
      </Card>
    </div>
  );
};
