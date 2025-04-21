
import { MainLayout } from "@/components/layout/main-layout";
import { CardMetric } from "@/components/ui/card-metric";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertCircle, Archive, BarChart3, ChevronRight, Clock, GitMerge, Heart, Layers, MessageSquare, Plus, Search, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardState } from "@/hooks/useDashboardState";
import { useNotifications } from "@/hooks/useNotifications";

export default function Dashboard() {
  const { metrics, handleCreateProcess, handleSearchRepository, handleInviteTeam } = useDashboardState();
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
              <CardTitle className="text-base flex items-center justify-between">
                <span>Recent Notifications</span>
                <Button variant="link" className="text-xs p-0 h-auto" onClick={clearAll}>Clear All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.map((notification) => (
                  <NotificationItem 
                    key={notification.id}
                    icon={
                      notification.type === 'message' ? <MessageSquare className="h-4 w-4 text-enterprise-blue-600" /> :
                      notification.type === 'update' ? <GitMerge className="h-4 w-4 text-enterprise-blue-600" /> :
                      <AlertCircle className="h-4 w-4 text-enterprise-blue-600" />
                    }
                    title={notification.title}
                    time={notification.time}
                    onClick={() => markAsRead(notification.id)}
                  />
                ))}
              </div>
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
              <Button variant="outline" size="sm">Export</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <InitiativeRow 
                  title="Customer Journey Optimization" 
                  owner="Lisa Johnson"
                  progress={75} 
                  status="On Track" 
                />
                <InitiativeRow 
                  title="Procure to Pay Automation" 
                  owner="Michael Chen"
                  progress={45} 
                  status="At Risk" 
                  statusColor="text-status-warning"
                />
                <InitiativeRow 
                  title="Employee Onboarding Redesign" 
                  owner="Sarah Miller"
                  progress={90} 
                  status="Completed" 
                  statusColor="text-status-success"
                />
                <InitiativeRow 
                  title="Vendor Management Process" 
                  owner="Robert Taylor"
                  progress={10} 
                  status="Just Started" 
                />
                <InitiativeRow 
                  title="Financial Closing Optimization" 
                  owner="Jennifer Adams"
                  progress={60} 
                  status="On Track" 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>Recent process changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  icon={<Archive className="h-4 w-4 text-enterprise-blue-600" />}
                  title="Process published"
                  description="Customer Onboarding v2.1"
                  user="Lisa Johnson"
                  time="Today, 10:45 AM"
                />
                <ActivityItem
                  icon={<GitMerge className="h-4 w-4 text-enterprise-blue-600" />}
                  title="Process updated"
                  description="Sales Quote to Order"
                  user="Michael Chen"
                  time="Yesterday, 4:23 PM"
                />
                <ActivityItem
                  icon={<MessageSquare className="h-4 w-4 text-enterprise-blue-600" />}
                  title="New comment"
                  description="Invoice Approval Process"
                  user="Sarah Miller"
                  time="Yesterday, 2:15 PM"
                />
                <ActivityItem
                  icon={<BarChart3 className="h-4 w-4 text-enterprise-blue-600" />}
                  title="Analytics report"
                  description="Monthly Process Performance"
                  user="System"
                  time="Oct 10, 9:00 AM"
                />
                <ActivityItem
                  icon={<Layers className="h-4 w-4 text-enterprise-blue-600" />}
                  title="New journey map"
                  description="Customer Support Experience"
                  user="Robert Taylor"
                  time="Oct 9, 3:12 PM"
                />
              </div>
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
              <Tabs defaultValue="performance" className="w-full">
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
    </MainLayout>
  );
}

interface NotificationItemProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  onClick: () => void;
}

function NotificationItem({ icon, title, time, onClick }: NotificationItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-muted/50 cursor-pointer" onClick={onClick}>
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
    </div>
  );
}

interface InitiativeRowProps {
  title: string;
  owner: string;
  progress: number;
  status: string;
  statusColor?: string;
}

function InitiativeRow({ title, owner, progress, status, statusColor = "text-foreground" }: InitiativeRowProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="font-medium">{title}</div>
          <div className="text-sm text-muted-foreground">Owner: {owner}</div>
        </div>
        <span className={cn("text-sm font-medium", statusColor)}>
          {status}
        </span>
      </div>
      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
        <div 
          className="bg-primary h-full rounded-full" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  user: string;
  time: string;
}

function ActivityItem({ icon, title, description, user, time }: ActivityItemProps) {
  return (
    <div className="flex gap-3">
      <div className="bg-muted rounded-full p-2 h-fit">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm">{description}</p>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-medium">{user}</span>
          <span className="text-muted-foreground">{time}</span>
        </div>
      </div>
    </div>
  );
}

function PerformanceChart() {
  return (
    <div className="bg-muted rounded-lg p-4">
      <h3 className="text-sm font-medium mb-4">Process Performance Trend</h3>
      <div className="h-64 flex items-center justify-center">
        [Performance Chart Placeholder]
      </div>
    </div>
  );
}

function PerformanceMetrics() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard title="Avg. Completion Time" value="3.2 days" trend="+5%" />
      <MetricCard title="Success Rate" value="94%" trend="+2%" />
      <MetricCard title="User Satisfaction" value="4.5/5" trend="+0.3" />
    </div>
  );
}

function ComplianceChart() {
  return (
    <div className="bg-muted rounded-lg p-4">
      <h3 className="text-sm font-medium mb-4">Compliance Overview</h3>
      <div className="h-64 flex items-center justify-center">
        [Compliance Chart Placeholder]
      </div>
    </div>
  );
}

function ComplianceMetrics() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard title="Compliance Rate" value="96%" trend="+1%" />
      <MetricCard title="Risk Score" value="Low" trend="Stable" />
      <MetricCard title="Audit Status" value="Passed" trend="↑" />
    </div>
  );
}

function BottleneckChart() {
  return (
    <div className="bg-muted rounded-lg p-4">
      <h3 className="text-sm font-medium mb-4">Process Bottlenecks</h3>
      <div className="h-64 flex items-center justify-center">
        [Bottleneck Chart Placeholder]
      </div>
    </div>
  );
}

function BottleneckMetrics() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard title="Critical Points" value="3" trend="-2" />
      <MetricCard title="Avg. Delay" value="4.5h" trend="-1h" />
      <MetricCard title="Impact Score" value="Medium" trend="↓" />
    </div>
  );
}

function MetricCard({ title, value, trend }: { title: string; value: string; trend: string }) {
  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <h4 className="text-sm text-muted-foreground">{title}</h4>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-semibold">{value}</span>
        <span className="text-sm text-muted-foreground">{trend}</span>
      </div>
    </div>
  );
}
