import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NotificationCenter } from "@/components/collaboration/NotificationCenter";
import { TeamInviteDialog } from "@/components/collaboration/TeamInviteDialog";
import { EnhancedProcessDiscussions } from "@/components/collaboration/EnhancedProcessDiscussions";
import { EnhancedWorkflowApprovals } from "@/components/collaboration/EnhancedWorkflowApprovals";
import { useCollaborationData } from "@/hooks/useCollaborationData";
import { useVoice } from "@/contexts/VoiceContext";
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
  Settings,
  Activity,
  BarChart3,
  FileText,
  Video,
  MapPin,
  Plus
} from "lucide-react";
import { CollaborationVoiceGuide } from "@/components/collaboration/CollaborationVoiceGuide";

export default function CollaborationHub() {
  const { 
    teamMembers, 
    discussions, 
    activities, 
    processReviews, 
    scheduleEvents,
    createProcessReview,
    createScheduleEvent 
  } = useCollaborationData();
  const { speakText } = useVoice();
  
  const [activeTab, setActiveTab] = useState("discussions");
  const [showNotifications, setShowNotifications] = useState(false);

  // Calculate dynamic metrics
  const collaborationMetrics = [
    { 
      label: "Active Discussions", 
      value: discussions.filter(d => !d.isResolved).length.toString(), 
      change: "+3", 
      trend: "up" 
    },
    { 
      label: "Pending Approvals", 
      value: "5", // This would come from approval data
      change: "-2", 
      trend: "down" 
    },
    { 
      label: "Team Members", 
      value: teamMembers.length.toString(), 
      change: "+1", 
      trend: "up" 
    },
    { 
      label: "This Week's Reviews", 
      value: processReviews.filter(r => r.status === "completed").length.toString(), 
      change: "+6", 
      trend: "up" 
    }
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const tabNames = {
      discussions: "Discussions",
      approvals: "Approvals", 
      reviews: "Process Reviews",
      schedule: "Collaboration Schedule"
    };
    speakText(`Switched to ${tabNames[value as keyof typeof tabNames]} tab`);
  };

  const ProcessReviewsContent = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Process Reviews</CardTitle>
          <Button 
            size="sm"
            onClick={() => {
              // This would open a create review dialog
              speakText("Opening create process review form");
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Review
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {processReviews.length > 0 ? (
          <div className="space-y-4">
            {processReviews.map((review) => (
              <div key={review.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    review.status === "completed" ? "bg-green-500" :
                    review.status === "in-progress" ? "bg-blue-500" :
                    review.status === "overdue" ? "bg-red-500" : "bg-yellow-500"
                  }`} />
                  <div>
                    <div className="font-medium">{review.processName}</div>
                    <div className="text-sm text-muted-foreground">
                      {review.reviewType} review • {review.reviewer}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={review.priority === "high" ? "destructive" : "secondary"}>
                    {review.priority}
                  </Badge>
                  <Badge variant="outline">
                    {review.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No Process Reviews</h3>
            <p className="text-muted-foreground mb-4">
              Schedule quality assessments and compliance reviews for your processes.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule First Review
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const CollaborationScheduleContent = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Collaboration Schedule</CardTitle>
          <Button 
            size="sm"
            onClick={() => {
              speakText("Opening event creation form");
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Event
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {scheduleEvents.length > 0 ? (
          <div className="space-y-4">
            {scheduleEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {event.type === "meeting" && <Users className="h-5 w-5 text-blue-500" />}
                    {event.type === "review" && <FileText className="h-5 w-5 text-green-500" />}
                    {event.type === "training" && <Target className="h-5 w-5 text-purple-500" />}
                    {event.type === "workshop" && <Activity className="h-5 w-5 text-orange-500" />}
                  </div>
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.startTime).toLocaleDateString()} • {event.organizer}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {event.isVirtual ? "Virtual" : event.location} • {event.attendees.length} attendees
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {event.isVirtual && <Video className="h-4 w-4 text-blue-500" />}
                  {!event.isVirtual && <MapPin className="h-4 w-4 text-gray-500" />}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No Scheduled Events</h3>
            <p className="text-muted-foreground mb-4">
              Schedule meetings, reviews, and collaboration sessions with your team.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule First Event
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <MainLayout pageTitle="Collaboration Hub">
      <CollaborationVoiceGuide />
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Collaboration Hub</h1>
            <p className="text-muted-foreground">Foster team alignment on process improvements and strategic initiatives</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline"
              onClick={() => {
                setShowNotifications(!showNotifications);
                speakText(showNotifications ? "Hiding notifications" : "Showing notifications");
              }}
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <TeamInviteDialog 
              trigger={
                <Button variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Team
                </Button>
              } 
            />
            <Button onClick={() => speakText("Opening collaboration settings")}>
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
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
                <EnhancedProcessDiscussions />
              </TabsContent>
              
              <TabsContent value="approvals" className="mt-6">
                <EnhancedWorkflowApprovals />
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <ProcessReviewsContent />
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-6">
                <CollaborationScheduleContent />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications Panel */}
            {showNotifications && (
              <NotificationCenter />
            )}
            
            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                  <Badge variant="secondary" className="text-xs">
                    {teamMembers.filter(m => m.status === "online").length} online
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMembers.slice(0, 5).map((member, index) => (
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
                <TeamInviteDialog 
                  trigger={
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <UserPlus className="h-3 w-3 mr-2" />
                      Add Member
                    </Button>
                  }
                />
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
                {activities.slice(0, 5).map((activity) => (
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => speakText("Showing all activity history")}
                >
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
