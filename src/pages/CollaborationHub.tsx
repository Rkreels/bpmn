
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProcessDiscussions } from "@/components/collaboration/ProcessDiscussions";
import { WorkflowApprovals } from "@/components/collaboration/WorkflowApprovals";
import { 
  Users, 
  MessageSquare, 
  CheckCircle, 
  Calendar,
  Bell,
  TrendingUp,
  Clock,
  Target,
  UserPlus,
  Settings
} from "lucide-react";

export default function CollaborationHub() {
  const [activeTab, setActiveTab] = useState("discussions");

  const collaborationMetrics = [
    { label: "Active Discussions", value: "12", change: "+3", trend: "up" },
    { label: "Pending Approvals", value: "5", change: "-2", trend: "down" },
    { label: "Team Members", value: "24", change: "+1", trend: "up" },
    { label: "This Week's Reviews", value: "18", change: "+6", trend: "up" }
  ];

  const recentActivities = [
    {
      id: "1",
      type: "discussion",
      title: "New discussion started on Purchase Order bottlenecks",
      user: "Sarah Chen",
      time: "2 hours ago",
      status: "active"
    },
    {
      id: "2",
      type: "approval",
      title: "Employee Onboarding process approved",
      user: "Mike Rodriguez",
      time: "4 hours ago",
      status: "approved"
    },
    {
      id: "3",
      type: "comment",
      title: "New comment on Invoice Processing automation",
      user: "Lisa Wang",
      time: "6 hours ago",
      status: "active"
    },
    {
      id: "4",
      type: "approval",
      title: "Compliance update requires your review",
      user: "System",
      time: "1 day ago",
      status: "pending"
    }
  ];

  const teamMembers = [
    { name: "Sarah Chen", role: "Business Analyst", initials: "SC", status: "online" },
    { name: "Mike Rodriguez", role: "Process Owner", initials: "MR", status: "online" },
    { name: "Lisa Wang", role: "Compliance Manager", initials: "LW", status: "away" },
    { name: "David Park", role: "IT Manager", initials: "DP", status: "offline" },
    { name: "John Smith", role: "Department Head", initials: "JS", status: "online" }
  ];

  return (
    <MainLayout pageTitle="Collaboration Hub">
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Collaboration Hub</h1>
            <p className="text-muted-foreground">Collaborate on process improvements and reviews</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Team
            </Button>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {collaborationMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                    {metric.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1 rotate-180" />}
                    {metric.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="discussions" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Discussions
                </TabsTrigger>
                <TabsTrigger value="approvals" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Approvals
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="discussions" className="mt-6">
                <ProcessDiscussions />
              </TabsContent>
              
              <TabsContent value="approvals" className="mt-6">
                <WorkflowApprovals />
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Process Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">Process Reviews</h3>
                      <p className="text-muted-foreground">
                        Scheduled process reviews and quality assessments will appear here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Collaboration Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">Collaboration Schedule</h3>
                      <p className="text-muted-foreground">
                        Scheduled meetings, reviews, and collaboration sessions will appear here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                        {member.initials}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        member.status === "online" ? "bg-green-400" :
                        member.status === "away" ? "bg-yellow-400" : "bg-gray-400"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <UserPlus className="h-3 w-3 mr-2" />
                  Add Member
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{activity.title}</div>
                        <div className="text-xs text-muted-foreground">
                          by {activity.user} • {activity.time}
                        </div>
                      </div>
                      <Badge 
                        variant={activity.status === "approved" ? "default" : activity.status === "pending" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
