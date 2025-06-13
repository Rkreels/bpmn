
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { PerformanceChart } from "./ProcessHealthCharts";
import { ActivityFeed } from "./ActivityFeed";
import { InitiativesList } from "./InitiativesList";
import { NotificationList } from "./NotificationList";
import { useNotifications } from "@/hooks/useNotifications";
import { DashboardHeader } from "./DashboardHeader";
import { MetricsCards } from "./MetricsCards";
import { QuickActions } from "./QuickActions";
import { RecentProjects } from "./RecentProjects";
import { 
  BarChart3, 
  Users, 
  FileText, 
  TrendingUp, 
  Plus
} from "lucide-react";

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

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
    speakText("Notification opened");
  };

  return (
    <div className="space-y-6">
      <DashboardHeader onRefresh={handleRefresh} refreshing={refreshing} />

      <MetricsCards metrics={metrics} onMetricClick={handleMetricClick} />

      <QuickActions actions={quickActions} onActionClick={handleQuickAction} />

      <RecentProjects projects={recentProjects} onProjectClick={handleProjectClick} />

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
