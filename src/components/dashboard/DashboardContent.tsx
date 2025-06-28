
import React, { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { MetricsCards } from "./MetricsCards";
import { QuickActions } from "./QuickActions";
import { RecentProjects } from "./RecentProjects";
import { ProcessHealthCharts } from "./ProcessHealthCharts";
import { NotificationList, Notification } from "./NotificationList";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  Workflow, 
  Route, 
  Users, 
  Database,
  BarChart3,
  Search,
  Target,
  FileText 
} from "lucide-react";

export const DashboardContent: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Process Optimization Complete",
      message: "Customer onboarding process has been optimized with 23% improvement in efficiency.",
      type: "success",
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: "2", 
      title: "System Maintenance Scheduled",
      message: "Planned maintenance window scheduled for tonight 2AM-4AM EST.",
      type: "warning",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false
    },
    {
      id: "3",
      title: "New Process Template Available", 
      message: "Invoice processing template v2.1 is now available in the repository.",
      type: "info",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true
    }
  ]);
  
  const { toast } = useToast();
  const { speakText, isVoiceEnabled } = useVoice();

  const handleRefresh = async () => {
    setRefreshing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setRefreshing(false);
    toast({
      title: "Dashboard Refreshed",
      description: "All data has been updated successfully."
    });
    
    if (isVoiceEnabled) {
      speakText("Dashboard refreshed successfully. All metrics and data are now up to date.");
    }
  };

  const quickActions = [
    {
      title: "Create Process",
      description: "Design a new business process",
      icon: Workflow,
      link: "/process-manager",
      color: "bg-blue-500"
    },
    {
      title: "Map Journey",
      description: "Create customer journey map", 
      icon: Route,
      link: "/journey-modeler",
      color: "bg-green-500"
    },
    {
      title: "Team Collaboration",
      description: "Work with your team",
      icon: Users,
      link: "/collaboration-hub", 
      color: "bg-purple-500"
    },
    {
      title: "Browse Repository",
      description: "Access process assets",
      icon: Database,
      link: "/repository",
      color: "bg-orange-500"
    },
    {
      title: "View Analytics",
      description: "Process intelligence insights",
      icon: BarChart3,
      link: "/process-intelligence",
      color: "bg-indigo-500"
    },
    {
      title: "Process Mining",
      description: "Discover process patterns",
      icon: Search,
      link: "/process-mining",
      color: "bg-teal-500"
    },
    {
      title: "Transformation",
      description: "Digital transformation hub",
      icon: Target,
      link: "/transformation-cockpit",
      color: "bg-red-500"
    },
    {
      title: "Generate Reports",
      description: "Create detailed reports",
      icon: FileText,
      link: "/reports",
      color: "bg-gray-500"
    }
  ];

  const handleActionClick = (action: any) => {
    toast({
      title: "Opening " + action.title,
      description: action.description
    });
    
    if (isVoiceEnabled) {
      speakText(`Opening ${action.title}. ${action.description}`);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    
    toast({
      title: "Notification",
      description: notification.message
    });
    
    if (isVoiceEnabled) {
      speakText(`Notification: ${notification.title}. ${notification.message}`);
    }
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been cleared."
    });
    
    if (isVoiceEnabled) {
      speakText("All notifications cleared.");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardHeader onRefresh={handleRefresh} refreshing={refreshing} />
      
      <MetricsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuickActions 
            actions={quickActions} 
            onActionClick={handleActionClick}
          />
        </div>
        <div>
          <NotificationList 
            notifications={notifications}
            onClickNotification={handleNotificationClick}
            onClearAll={handleClearAllNotifications}
          />
        </div>
      </div>
      
      <RecentProjects />
      
      <ProcessHealthCharts />
    </div>
  );
};
