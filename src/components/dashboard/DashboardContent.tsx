import React, { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { MetricsCards } from "./MetricsCards";
import { FunctionalQuickActions } from "./FunctionalQuickActions";
import { RecentProjects } from "./RecentProjects";
import { ProcessHealthCharts } from "./ProcessHealthCharts";
import { NotificationList, Notification } from "./NotificationList";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { useIndustry } from "@/contexts/IndustryContext";
import { getIndustryData } from "@/data/industryDemoData";
import { useNavigate } from "react-router-dom";
import { Workflow, Route, Users, Database, BarChart3, Search, Target, FileText } from "lucide-react";

export const DashboardContent: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();
  const { speakText, isVoiceEnabled } = useVoice();
  const navigate = useNavigate();
  const { currentIndustry, industryConfig } = useIndustry();
  const industryData = getIndustryData(currentIndustry);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", title: "Process Optimization Complete", message: "Process has been optimized with 23% improvement.", type: "success", timestamp: new Date().toISOString(), read: false },
    { id: "2", title: "System Maintenance Scheduled", message: "Planned maintenance tonight 2AM-4AM EST.", type: "warning", timestamp: new Date(Date.now() - 3600000).toISOString(), read: false },
    { id: "3", title: "New Template Available", message: "New process template is available in the repository.", type: "info", timestamp: new Date(Date.now() - 7200000).toISOString(), read: true },
  ]);

  const handleRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
    toast({ title: "Dashboard Refreshed", description: "All data has been updated." });
  };

  const metrics = industryData.metrics.map((m, i) => ({
    label: m.label,
    value: m.value,
    change: m.change,
    trend: m.trend,
    icon: [Workflow, Users, Database, BarChart3][i] || BarChart3,
    link: ["/process-manager", "/collaboration-hub", "/repository", "/process-intelligence"][i] || "/dashboard",
    color: ["text-blue-500", "text-green-500", "text-purple-500", "text-orange-500"][i] || "text-blue-500",
  }));

  const quickActions = [
    { title: "Create Process", description: "Design a new business process", icon: Workflow, link: "/process-manager", color: "bg-blue-500" },
    { title: "Map Journey", description: "Create customer journey map", icon: Route, link: "/journey-modeler", color: "bg-green-500" },
    { title: "Team Collaboration", description: "Work with your team", icon: Users, link: "/collaboration-hub", color: "bg-purple-500" },
    { title: "Browse Repository", description: "Access process assets", icon: Database, link: "/repository", color: "bg-orange-500" },
    { title: "View Analytics", description: "Process intelligence insights", icon: BarChart3, link: "/process-intelligence", color: "bg-indigo-500" },
    { title: "Process Mining", description: "Discover process patterns", icon: Search, link: "/process-mining", color: "bg-teal-500" },
    { title: "Transformation", description: "Digital transformation hub", icon: Target, link: "/transformation-cockpit", color: "bg-red-500" },
    { title: "Generate Reports", description: "Create detailed reports", icon: FileText, link: "/reports", color: "bg-gray-500" },
  ];

  const handleMetricClick = (link: string, label: string) => { navigate(link); };
  const handleProjectClick = (project: any) => { navigate("/process-manager"); };
  const handleNotificationClick = (notification: Notification) => {
    setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n));
  };
  const handleClearAllNotifications = () => { setNotifications([]); };

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardHeader onRefresh={handleRefresh} refreshing={refreshing} />
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <span>{industryConfig.icon}</span>
        <span>{industryConfig.name} — {industryConfig.description}</span>
      </div>
      <MetricsCards metrics={metrics} onMetricClick={handleMetricClick} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><FunctionalQuickActions /></div>
        <div><NotificationList notifications={notifications} onClickNotification={handleNotificationClick} onClearAll={handleClearAllNotifications} /></div>
      </div>
      <RecentProjects projects={industryData.projects} onProjectClick={handleProjectClick} />
      <ProcessHealthCharts />
    </div>
  );
};
