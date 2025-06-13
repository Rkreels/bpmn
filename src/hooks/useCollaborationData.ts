
import { useState, useEffect } from "react";

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  authorInitials: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  likes: string[];
  views: number;
  replies: Reply[];
  isPinned: boolean;
  isResolved: boolean;
  processId?: string;
  processName?: string;
}

export interface Reply {
  id: string;
  content: string;
  author: string;
  authorInitials: string;
  createdAt: string;
  likes: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  status: "online" | "away" | "offline";
  lastActive: string;
}

export interface Activity {
  id: string;
  title: string;
  user: string;
  time: string;
  status: "approved" | "pending" | "rejected";
  type: string;
}

export interface ProcessReview {
  id: string;
  processName: string;
  reviewType: string;
  reviewer: string;
  status: "completed" | "in-progress" | "overdue" | "scheduled";
  priority: "high" | "medium" | "low";
  dueDate: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  type: "meeting" | "review" | "training" | "workshop";
  startTime: string;
  endTime: string;
  organizer: string;
  attendees: string[];
  isVirtual: boolean;
  location?: string;
}

export const useCollaborationData = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: "1",
      title: "Streamline Purchase Order Approval Process",
      content: "Currently, our PO approval process takes too long with multiple handoffs. Can we reduce the approval steps?",
      author: "Sarah Chen",
      authorInitials: "SC",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      tags: ["approval", "efficiency", "procurement"],
      likes: ["user1", "user2"],
      views: 23,
      replies: [
        {
          id: "r1",
          content: "I agree! We could combine steps 2 and 3 into a single approval.",
          author: "Mike Johnson",
          authorInitials: "MJ",
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          likes: ["user1"]
        }
      ],
      isPinned: true,
      isResolved: false,
      processId: "po-001",
      processName: "Purchase Order Process"
    },
    {
      id: "2",
      title: "Digital Transformation Initiative Feedback",
      content: "How can we better manage the change management aspects of our digital transformation?",
      author: "Alex Rodriguez",
      authorInitials: "AR",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      tags: ["digital transformation", "change management"],
      likes: ["user3"],
      views: 15,
      replies: [],
      isPinned: false,
      isResolved: false
    }
  ]);

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      initials: "JD",
      role: "Process Manager",
      status: "online",
      lastActive: "Now"
    },
    {
      id: "2",
      name: "Jane Smith",
      initials: "JS",
      role: "Business Analyst",
      status: "away",
      lastActive: "5 min ago"
    },
    {
      id: "3",
      name: "Mike Johnson",
      initials: "MJ",
      role: "Operations Lead",
      status: "online",
      lastActive: "Now"
    },
    {
      id: "4",
      name: "Sarah Chen",
      initials: "SC",
      role: "Project Manager",
      status: "offline",
      lastActive: "2 hours ago"
    }
  ]);

  const [activities] = useState<Activity[]>([
    {
      id: "1",
      title: "Process workflow approved",
      user: "John Doe",
      time: "2 minutes ago",
      status: "approved",
      type: "approval"
    },
    {
      id: "2",
      title: "New discussion started",
      user: "Sarah Chen",
      time: "15 minutes ago",
      status: "pending",
      type: "discussion"
    },
    {
      id: "3",
      title: "Process review completed",
      user: "Mike Johnson",
      time: "1 hour ago",
      status: "approved",
      type: "review"
    }
  ]);

  const [processReviews] = useState<ProcessReview[]>([
    {
      id: "1",
      processName: "Customer Onboarding",
      reviewType: "Quality Assessment",
      reviewer: "Jane Smith",
      status: "completed",
      priority: "high",
      dueDate: "2024-01-20"
    },
    {
      id: "2",
      processName: "Invoice Processing",
      reviewType: "Compliance Review",
      reviewer: "John Doe",
      status: "in-progress",
      priority: "medium",
      dueDate: "2024-01-25"
    }
  ]);

  const [scheduleEvents] = useState<ScheduleEvent[]>([
    {
      id: "1",
      title: "Process Optimization Workshop",
      type: "workshop",
      startTime: "2024-01-22T10:00:00Z",
      endTime: "2024-01-22T12:00:00Z",
      organizer: "Sarah Chen",
      attendees: ["john.doe", "jane.smith", "mike.johnson"],
      isVirtual: true
    },
    {
      id: "2",
      title: "Monthly Process Review",
      type: "review",
      startTime: "2024-01-25T14:00:00Z",
      endTime: "2024-01-25T15:30:00Z",
      organizer: "John Doe",
      attendees: ["sarah.chen", "jane.smith"],
      isVirtual: false,
      location: "Conference Room A"
    }
  ]);

  const currentUserId = "user1";

  const createDiscussion = (discussionData: {
    title: string;
    content: string;
    tags: string[];
    processId?: string;
    processName?: string;
  }) => {
    const newDiscussion: Discussion = {
      id: Date.now().toString(),
      title: discussionData.title,
      content: discussionData.content,
      author: "Current User",
      authorInitials: "CU",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: discussionData.tags,
      likes: [],
      views: 1,
      replies: [],
      isPinned: false,
      isResolved: false,
      processId: discussionData.processId,
      processName: discussionData.processName
    };

    setDiscussions(prev => [newDiscussion, ...prev]);
    return newDiscussion.id;
  };

  const addReply = (discussionId: string, content: string) => {
    const newReply: Reply = {
      id: Date.now().toString(),
      content,
      author: "Current User",
      authorInitials: "CU",
      createdAt: new Date().toISOString(),
      likes: []
    };

    setDiscussions(prev => prev.map(discussion => 
      discussion.id === discussionId 
        ? {
            ...discussion,
            replies: [...discussion.replies, newReply],
            updatedAt: new Date().toISOString()
          }
        : discussion
    ));
  };

  const toggleLike = (discussionId: string, replyId?: string) => {
    setDiscussions(prev => prev.map(discussion => {
      if (discussion.id === discussionId) {
        if (replyId) {
          // Like a reply
          return {
            ...discussion,
            replies: discussion.replies.map(reply =>
              reply.id === replyId
                ? {
                    ...reply,
                    likes: reply.likes.includes(currentUserId)
                      ? reply.likes.filter(id => id !== currentUserId)
                      : [...reply.likes, currentUserId]
                  }
                : reply
            )
          };
        } else {
          // Like the discussion
          return {
            ...discussion,
            likes: discussion.likes.includes(currentUserId)
              ? discussion.likes.filter(id => id !== currentUserId)
              : [...discussion.likes, currentUserId]
          };
        }
      }
      return discussion;
    }));
  };

  const togglePin = (discussionId: string) => {
    setDiscussions(prev => prev.map(discussion =>
      discussion.id === discussionId
        ? { ...discussion, isPinned: !discussion.isPinned }
        : discussion
    ));
  };

  const resolveDiscussion = (discussionId: string) => {
    setDiscussions(prev => prev.map(discussion =>
      discussion.id === discussionId
        ? { ...discussion, isResolved: !discussion.isResolved }
        : discussion
    ));
  };

  const inviteTeamMember = (email: string, role: string) => {
    console.log(`Inviting ${email} as ${role}`);
    // In a real app, this would make an API call
  };

  const createProcessReview = (reviewData: Partial<ProcessReview>) => {
    console.log("Creating process review:", reviewData);
    // In a real app, this would make an API call
  };

  const createScheduleEvent = (eventData: Partial<ScheduleEvent>) => {
    console.log("Creating schedule event:", eventData);
    // In a real app, this would make an API call
  };

  return {
    discussions,
    teamMembers,
    activities,
    processReviews,
    scheduleEvents,
    currentUserId,
    createDiscussion,
    addReply,
    toggleLike,
    togglePin,
    resolveDiscussion,
    inviteTeamMember,
    createProcessReview,
    createScheduleEvent
  };
};
