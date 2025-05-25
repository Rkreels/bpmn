
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
  status: "online" | "away" | "offline";
  avatar?: string;
  joinedAt: string;
  permissions: string[];
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  authorInitials: string;
  createdAt: string;
  updatedAt: string;
  replies: Reply[];
  likes: string[]; // Array of user IDs who liked
  tags: string[];
  isPinned: boolean;
  isResolved: boolean;
  processId?: string;
  processName?: string;
  views: number;
}

export interface Reply {
  id: string;
  content: string;
  author: string;
  authorId: string;
  authorInitials: string;
  createdAt: string;
  likes: string[];
  parentId?: string; // For nested replies
}

export interface Activity {
  id: string;
  type: "discussion" | "approval" | "comment" | "member" | "process" | "review";
  title: string;
  description: string;
  user: string;
  userId: string;
  time: string;
  status: "active" | "approved" | "pending" | "completed";
  relatedId?: string;
}

export interface ProcessReview {
  id: string;
  processName: string;
  processId: string;
  reviewType: "quality" | "compliance" | "performance" | "security";
  status: "scheduled" | "in-progress" | "completed" | "overdue";
  scheduledDate: string;
  completedDate?: string;
  reviewer: string;
  reviewerId: string;
  findings: string[];
  recommendations: string[];
  priority: "low" | "medium" | "high" | "critical";
}

export interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  type: "meeting" | "review" | "training" | "workshop";
  startTime: string;
  endTime: string;
  attendees: string[];
  location: string;
  isVirtual: boolean;
  meetingLink?: string;
  organizer: string;
  organizerId: string;
}

export interface CollaborationSettings {
  notifications: {
    discussions: boolean;
    approvals: boolean;
    mentions: boolean;
    reviews: boolean;
  };
  privacy: {
    showOnlineStatus: boolean;
    allowDirectMessages: boolean;
  };
  preferences: {
    defaultView: "discussions" | "approvals" | "reviews" | "schedule";
    itemsPerPage: number;
    autoRefresh: boolean;
  };
}

export const useCollaborationData = () => {
  const { toast } = useToast();
  const currentUserId = "user-001"; // Mock current user

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "user-001",
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      role: "Business Analyst",
      initials: "SC",
      status: "online",
      joinedAt: "2024-01-15",
      permissions: ["read", "write", "approve", "admin"]
    },
    {
      id: "user-002",
      name: "Mike Rodriguez",
      email: "mike.rodriguez@company.com",
      role: "Process Owner",
      initials: "MR",
      status: "online",
      joinedAt: "2024-01-10",
      permissions: ["read", "write", "approve"]
    },
    {
      id: "user-003",
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
      role: "Compliance Manager",
      initials: "LW",
      status: "away",
      joinedAt: "2024-01-12",
      permissions: ["read", "write"]
    },
    {
      id: "user-004",
      name: "David Park",
      email: "david.park@company.com",
      role: "IT Manager",
      initials: "DP",
      status: "offline",
      joinedAt: "2024-01-18",
      permissions: ["read", "write"]
    },
    {
      id: "user-005",
      name: "John Smith",
      email: "john.smith@company.com",
      role: "Department Head",
      initials: "JS",
      status: "online",
      joinedAt: "2024-01-08",
      permissions: ["read", "write", "approve", "admin"]
    }
  ]);

  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: "disc-001",
      title: "Approval process bottleneck in Purchase Order flow",
      content: "We're seeing significant delays in the PO approval step. Multiple stakeholders have reported that requests are sitting in the approval queue for 3-5 days on average. This is impacting our vendor relationships and cash flow management.",
      author: "Sarah Chen",
      authorId: "user-001",
      authorInitials: "SC",
      createdAt: "2024-01-22T10:30:00Z",
      updatedAt: "2024-01-22T14:45:00Z",
      replies: [
        {
          id: "reply-001",
          content: "I've noticed this too. The main issue seems to be that approvers aren't getting timely notifications.",
          author: "Mike Rodriguez",
          authorId: "user-002",
          authorInitials: "MR",
          createdAt: "2024-01-22T11:15:00Z",
          likes: ["user-001", "user-003"]
        },
        {
          id: "reply-002",
          content: "We should implement automated escalation after 24 hours. I can help design the workflow.",
          author: "Lisa Wang",
          authorId: "user-003",
          authorInitials: "LW",
          createdAt: "2024-01-22T12:30:00Z",
          likes: ["user-001", "user-002", "user-005"]
        }
      ],
      likes: ["user-002", "user-003", "user-004", "user-005"],
      tags: ["bottleneck", "approval", "purchase-order", "urgent"],
      isPinned: true,
      isResolved: false,
      processId: "po-001",
      processName: "Purchase Order Process",
      views: 45
    }
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "act-001",
      type: "discussion",
      title: "New discussion started on Purchase Order bottlenecks",
      description: "Discussion about approval delays in PO workflow",
      user: "Sarah Chen",
      userId: "user-001",
      time: "2 hours ago",
      status: "active",
      relatedId: "disc-001"
    },
    {
      id: "act-002",
      type: "approval",
      title: "Employee Onboarding process approved",
      description: "Final approval completed for new onboarding workflow",
      user: "Mike Rodriguez",
      userId: "user-002",
      time: "4 hours ago",
      status: "approved",
      relatedId: "app-001"
    }
  ]);

  const [processReviews, setProcessReviews] = useState<ProcessReview[]>([
    {
      id: "review-001",
      processName: "Invoice Processing",
      processId: "invoice-001",
      reviewType: "compliance",
      status: "scheduled",
      scheduledDate: "2024-01-25T09:00:00Z",
      reviewer: "Lisa Wang",
      reviewerId: "user-003",
      findings: [],
      recommendations: [],
      priority: "high"
    }
  ]);

  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([
    {
      id: "event-001",
      title: "Process Review Meeting",
      description: "Monthly review of key business processes",
      type: "review",
      startTime: "2024-01-25T14:00:00Z",
      endTime: "2024-01-25T15:30:00Z",
      attendees: ["user-001", "user-002", "user-003"],
      location: "Conference Room A",
      isVirtual: false,
      organizer: "John Smith",
      organizerId: "user-005"
    }
  ]);

  const [settings, setSettings] = useState<CollaborationSettings>({
    notifications: {
      discussions: true,
      approvals: true,
      mentions: true,
      reviews: true
    },
    privacy: {
      showOnlineStatus: true,
      allowDirectMessages: true
    },
    preferences: {
      defaultView: "discussions",
      itemsPerPage: 10,
      autoRefresh: true
    }
  });

  // Team Management
  const inviteTeamMember = useCallback((email: string, role: string) => {
    const newMember: TeamMember = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role,
      initials: email.substring(0, 2).toUpperCase(),
      status: "offline",
      joinedAt: new Date().toISOString(),
      permissions: role === "admin" ? ["read", "write", "approve", "admin"] : ["read", "write"]
    };

    setTeamMembers(prev => [...prev, newMember]);
    
    const activity: Activity = {
      id: `act-${Date.now()}`,
      type: "member",
      title: `${newMember.name} invited to team`,
      description: `New team member invited with ${role} role`,
      user: "System",
      userId: "system",
      time: "Just now",
      status: "active"
    };
    
    setActivities(prev => [activity, ...prev]);

    toast({
      title: "Team member invited",
      description: `Invitation sent to ${email}`,
    });

    return newMember;
  }, [toast]);

  // Discussion Management
  const createDiscussion = useCallback((data: {
    title: string;
    content: string;
    tags: string[];
    processId?: string;
    processName?: string;
  }) => {
    const currentUser = teamMembers.find(m => m.id === currentUserId);
    if (!currentUser) return null;

    const newDiscussion: Discussion = {
      id: `disc-${Date.now()}`,
      title: data.title,
      content: data.content,
      author: currentUser.name,
      authorId: currentUser.id,
      authorInitials: currentUser.initials,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      replies: [],
      likes: [],
      tags: data.tags,
      isPinned: false,
      isResolved: false,
      processId: data.processId,
      processName: data.processName,
      views: 1
    };

    setDiscussions(prev => [newDiscussion, ...prev]);

    const activity: Activity = {
      id: `act-${Date.now()}`,
      type: "discussion",
      title: `New discussion: ${data.title}`,
      description: data.content.substring(0, 100) + "...",
      user: currentUser.name,
      userId: currentUser.id,
      time: "Just now",
      status: "active",
      relatedId: newDiscussion.id
    };

    setActivities(prev => [activity, ...prev]);

    toast({
      title: "Discussion created",
      description: data.title,
    });

    return newDiscussion;
  }, [currentUserId, teamMembers, toast]);

  const addReply = useCallback((discussionId: string, content: string, parentId?: string) => {
    const currentUser = teamMembers.find(m => m.id === currentUserId);
    if (!currentUser) return null;

    const newReply: Reply = {
      id: `reply-${Date.now()}`,
      content,
      author: currentUser.name,
      authorId: currentUser.id,
      authorInitials: currentUser.initials,
      createdAt: new Date().toISOString(),
      likes: [],
      parentId
    };

    setDiscussions(prev => prev.map(discussion => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          replies: [...discussion.replies, newReply],
          updatedAt: new Date().toISOString()
        };
      }
      return discussion;
    }));

    const activity: Activity = {
      id: `act-${Date.now()}`,
      type: "comment",
      title: "New reply added",
      description: content.substring(0, 100) + "...",
      user: currentUser.name,
      userId: currentUser.id,
      time: "Just now",
      status: "active",
      relatedId: discussionId
    };

    setActivities(prev => [activity, ...prev]);

    return newReply;
  }, [currentUserId, teamMembers]);

  const toggleLike = useCallback((discussionId: string, replyId?: string) => {
    setDiscussions(prev => prev.map(discussion => {
      if (discussion.id === discussionId) {
        if (replyId) {
          // Like a reply
          const updatedReplies = discussion.replies.map(reply => {
            if (reply.id === replyId) {
              const likes = reply.likes.includes(currentUserId)
                ? reply.likes.filter(id => id !== currentUserId)
                : [...reply.likes, currentUserId];
              return { ...reply, likes };
            }
            return reply;
          });
          return { ...discussion, replies: updatedReplies };
        } else {
          // Like the discussion
          const likes = discussion.likes.includes(currentUserId)
            ? discussion.likes.filter(id => id !== currentUserId)
            : [...discussion.likes, currentUserId];
          return { ...discussion, likes };
        }
      }
      return discussion;
    }));
  }, [currentUserId]);

  const togglePin = useCallback((discussionId: string) => {
    setDiscussions(prev => prev.map(discussion => {
      if (discussion.id === discussionId) {
        return { ...discussion, isPinned: !discussion.isPinned };
      }
      return discussion;
    }));
  }, []);

  const resolveDiscussion = useCallback((discussionId: string) => {
    setDiscussions(prev => prev.map(discussion => {
      if (discussion.id === discussionId) {
        return { ...discussion, isResolved: !discussion.isResolved };
      }
      return discussion;
    }));
  }, []);

  // Process Reviews Management
  const createProcessReview = useCallback((data: {
    processName: string;
    processId: string;
    reviewType: ProcessReview["reviewType"];
    scheduledDate: string;
    reviewerId: string;
    priority: ProcessReview["priority"];
  }) => {
    const reviewer = teamMembers.find(m => m.id === data.reviewerId);
    if (!reviewer) return null;

    const newReview: ProcessReview = {
      id: `review-${Date.now()}`,
      processName: data.processName,
      processId: data.processId,
      reviewType: data.reviewType,
      status: "scheduled",
      scheduledDate: data.scheduledDate,
      reviewer: reviewer.name,
      reviewerId: data.reviewerId,
      findings: [],
      recommendations: [],
      priority: data.priority
    };

    setProcessReviews(prev => [newReview, ...prev]);

    const activity: Activity = {
      id: `act-${Date.now()}`,
      type: "review",
      title: `Process review scheduled: ${data.processName}`,
      description: `${data.reviewType} review assigned to ${reviewer.name}`,
      user: "System",
      userId: "system",
      time: "Just now",
      status: "pending",
      relatedId: newReview.id
    };

    setActivities(prev => [activity, ...prev]);

    return newReview;
  }, [teamMembers]);

  // Schedule Management
  const createScheduleEvent = useCallback((data: {
    title: string;
    description: string;
    type: ScheduleEvent["type"];
    startTime: string;
    endTime: string;
    attendees: string[];
    location: string;
    isVirtual: boolean;
    meetingLink?: string;
  }) => {
    const currentUser = teamMembers.find(m => m.id === currentUserId);
    if (!currentUser) return null;

    const newEvent: ScheduleEvent = {
      id: `event-${Date.now()}`,
      title: data.title,
      description: data.description,
      type: data.type,
      startTime: data.startTime,
      endTime: data.endTime,
      attendees: data.attendees,
      location: data.location,
      isVirtual: data.isVirtual,
      meetingLink: data.meetingLink,
      organizer: currentUser.name,
      organizerId: currentUser.id
    };

    setScheduleEvents(prev => [newEvent, ...prev]);

    const activity: Activity = {
      id: `act-${Date.now()}`,
      type: "process",
      title: `Event scheduled: ${data.title}`,
      description: data.description,
      user: currentUser.name,
      userId: currentUser.id,
      time: "Just now",
      status: "active",
      relatedId: newEvent.id
    };

    setActivities(prev => [activity, ...prev]);

    return newEvent;
  }, [currentUserId, teamMembers]);

  const updateSettings = useCallback((newSettings: Partial<CollaborationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    toast({
      title: "Settings updated",
      description: "Your collaboration preferences have been saved",
    });
  }, [toast]);

  return {
    // Data
    teamMembers,
    discussions,
    activities,
    processReviews,
    scheduleEvents,
    settings,
    currentUserId,

    // Team Management
    inviteTeamMember,

    // Discussion Management
    createDiscussion,
    addReply,
    toggleLike,
    togglePin,
    resolveDiscussion,

    // Process Reviews
    createProcessReview,

    // Schedule Management
    createScheduleEvent,

    // Settings
    updateSettings
  };
};
