
import { MainLayout } from "@/components/layout/main-layout";
import { CardMetric } from "@/components/ui/card-metric";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertCircle, Clock, GitMerge, Plus, Search, Users } from "lucide-react";
import { useDashboardState } from "@/hooks/useDashboardState";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationList } from "@/components/dashboard/NotificationList";
import { InitiativesList } from "@/components/dashboard/InitiativesList";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { 
  PerformanceChart, 
  ComplianceChart, 
  BottleneckChart,
  PerformanceMetrics,
  ComplianceMetrics,
  BottleneckMetrics
} from "@/components/dashboard/ProcessHealthCharts";
import { TeamInviteModal } from "@/components/dashboard/TeamInviteModal";

export default function Dashboard() {
  const { 
    metrics, 
    handleCreateProcess, 
    handleSearchRepository, 
    handleInviteTeam,
    showTeamInviteModal,
    closeTeamInviteModal,
    activeTab,
    setActiveTab,
    refreshData
  } = useDashboardState();
  const { notifications, markAsRead, clearAll } = useNotifications();

  return (
    <MainLayout pageTitle="Dashboard">
      <div className="grid gap-6">
        {/* Welcome and quick actions section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2 border-enterprise-blue-200">
            <CardHeader className="pb-2">
              <CardTitle>Welcome back, John!</CardTitle>
              <CardDescription>
                Here's what's happening with your transformation initiatives today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="flex items-center gap-2"
                  onClick={handleCreateProcess}
                >
                  <Plus className="h-4 w-4" />
                  New Process Model
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleSearchRepository}
                >
                  <Search className="h-4 w-4" />
                  Search Repository
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleInviteTeam}
                >
                  <Users className="h-4 w-4" />
                  Invite Team Member
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                <NotificationList 
                  notifications={notifications}
                  onClickNotification={markAsRead}
                  onClearAll={clearAll}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Notification items are now handled by the NotificationList component */}
            </CardContent>
          </Card>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardMetric
            title="Total Processes"
            value={metrics.totalProcesses.toString()}
            icon={<GitMerge className="h-5 w-5" />}
            trend={{ value: 12, isUpward: true, isPositive: true }}
          />
          <CardMetric
            title="Process Compliance"
            value={`${metrics.compliance}%`}
            icon={<Activity className="h-5 w-5" />}
            trend={{ value: 3, isUpward: true, isPositive: true }}
          />
          <CardMetric
            title="Avg. Processing Time"
            value={`${metrics.processingTime} days`}
            icon={<Clock className="h-5 w-5" />}
            trend={{ value: 8, isUpward: false, isPositive: true }}
            variant="success"
          />
          <CardMetric
            title="Process Deviations"
            value={metrics.deviations.toString()}
            icon={<AlertCircle className="h-5 w-5" />}
            trend={{ value: 15, isUpward: true, isPositive: false }}
            variant="danger"
          />
        </div>

        {/* Process overview and activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Transformation Initiatives</CardTitle>
                <CardDescription>Progress across key initiatives</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={refreshData}>Refresh</Button>
            </CardHeader>
            <CardContent>
              <InitiativesList />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>Recent process changes</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityFeed />
            </CardContent>
          </Card>
        </div>

        {/* Process health and insights */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Process Health</CardTitle>
              <CardDescription>Analysis of current process performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
                </TabsList>
                <TabsContent value="performance">
                  <div className="space-y-4">
                    <PerformanceChart />
                    <PerformanceMetrics />
                  </div>
                </TabsContent>
                <TabsContent value="compliance">
                  <div className="space-y-4">
                    <ComplianceChart />
                    <ComplianceMetrics />
                  </div>
                </TabsContent>
                <TabsContent value="bottlenecks">
                  <div className="space-y-4">
                    <BottleneckChart />
                    <BottleneckMetrics />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <TeamInviteModal 
        open={showTeamInviteModal} 
        onClose={closeTeamInviteModal} 
      />
    </MainLayout>
  );
}
