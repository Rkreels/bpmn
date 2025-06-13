
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCollaborationData } from "@/hooks/useCollaborationData";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { ProcessDiscussions } from "@/components/collaboration/ProcessDiscussions";
import { WorkflowApprovals } from "@/components/collaboration/WorkflowApprovals";
import { NotificationCenter } from "@/components/collaboration/NotificationCenter";
import { CollaborationVoiceGuide } from "@/components/collaboration/CollaborationVoiceGuide";
import { 
  MessageCircle, 
  CheckCircle, 
  Users, 
  Calendar,
  FileText,
  Plus,
  Activity,
  Clock,
  AlertCircle
} from "lucide-react";

export default function CollaborationHub() {
  const { 
    discussions, 
    teamMembers, 
    currentUserId, 
    activities, 
    processReviews, 
    scheduleEvents,
    createDiscussion,
    createProcessReview,
    createScheduleEvent
  } = useCollaborationData();
  
  const { speakText } = useVoice();
  const { toast } = useToast();

  const stats = [
    { 
      label: "Active Discussions", 
      value: discussions.length, 
      icon: MessageCircle,
      color: "text-blue-600"
    },
    { 
      label: "Team Members", 
      value: teamMembers.length, 
      icon: Users,
      color: "text-green-600"
    },
    { 
      label: "Pending Reviews", 
      value: processReviews.filter(r => r.status === "pending").length, 
      icon: FileText,
      color: "text-orange-600"
    },
    { 
      label: "Scheduled Events", 
      value: scheduleEvents.length, 
      icon: Calendar,
      color: "text-purple-600"
    }
  ];

  const handleCreateDiscussion = () => {
    const newDiscussion = createDiscussion({
      title: "New Process Discussion",
      content: "Let's discuss this process improvement",
      tags: ["process", "improvement"]
    });
    
    toast({
      title: "Discussion Created",
      description: "New discussion thread has been started"
    });
    
    speakText("New discussion created successfully. Team members can now participate in the conversation.");
  };

  const handleCreateReview = () => {
    const review = createProcessReview({
      processId: "process-1",
      processName: "Sample Process",
      reviewerIds: [currentUserId],
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      description: "Please review this process for accuracy and completeness"
    });
    
    toast({
      title: "Review Created",
      description: "Process review request has been sent to team members"
    });
    
    speakText("Process review created. Team members will receive notifications to review the process.");
  };

  const handleScheduleEvent = () => {
    const event = createScheduleEvent({
      title: "Process Review Meeting",
      description: "Weekly process review and planning session",
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
      attendeeIds: teamMembers.slice(0, 3).map(m => m.id)
    });
    
    toast({
      title: "Event Scheduled",
      description: "Meeting has been scheduled and invitations sent"
    });
    
    speakText("Event scheduled successfully. Calendar invitations have been sent to all attendees.");
  };

  return (
    <MainLayout pageTitle="Collaboration Hub">
      <CollaborationVoiceGuide />
      
      <div className="space-y-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Collaboration Hub</h1>
            <p className="text-muted-foreground">Work together on process modeling and improvement</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCreateDiscussion} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Discussion
            </Button>
            <Button onClick={handleCreateReview} variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Create Review
            </Button>
            <Button onClick={handleScheduleEvent} variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Event
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest collaboration activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    {activity.type === 'discussion' && <MessageCircle className="h-4 w-4" />}
                    {activity.type === 'review' && <FileText className="h-4 w-4" />}
                    {activity.type === 'event' && <Calendar className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">by {activity.userName}</p>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discussions" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Discussions
            </TabsTrigger>
            <TabsTrigger value="approvals" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Approvals
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="discussions" className="mt-6">
            <ProcessDiscussions />
          </TabsContent>
          
          <TabsContent value="approvals" className="mt-6">
            <WorkflowApprovals />
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <NotificationCenter />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
