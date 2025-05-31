
import { useState, useCallback } from "react";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "online" | "offline" | "away";
  avatar?: string;
  lastActive: string;
  initials: string;
}

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
  replies: Reply[];
  isPinned: boolean;
  isResolved: boolean;
  views: number;
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

export interface Activity {
  id: string;
  title: string;
  user: string;
  time: string;
  status: "approved" | "pending" | "rejected";
}

export interface ProcessReview {
  id: string;
  processName: string;
  reviewType: string;
  reviewer: string;
  status: "completed" | "in-progress" | "pending" | "overdue";
  priority: "high" | "medium" | "low";
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
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@company.com",
      role: "Admin",
      status: "online",
      lastActive: "Now",
      initials: "JD"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@company.com",
      role: "Editor",
      status: "away",
      lastActive: "5 minutes ago",
      initials: "JS"
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@company.com",
      role: "Viewer",
      status: "offline",
      lastActive: "2 hours ago",
      initials: "MJ"
    }
  ]);

  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: "1",
      title: "Process Optimization Opportunities",
      content: "I've identified several areas where we can improve our current workflow efficiency.",
      author: "John Doe",
      authorInitials: "JD",
      createdAt: "2024-01-20T10:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
      tags: ["optimization", "workflow"],
      likes: ["2", "3"],
      replies: [
        {
          id: "r1",
          content: "Great insights! I particularly agree with the automation suggestions.",
          author: "Jane Smith",
          authorInitials: "JS",
          createdAt: "2024-01-20T11:00:00Z",
          likes: ["1"]
        }
      ],
      isPinned: true,
      isResolved: false,
      views: 45,
      processId: "proc1",
      processName: "Order Processing"
    }
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      title: "Updated Purchase Order Process",
      user: "John Doe",
      time: "2 hours ago",
      status: "approved"
    },
    {
      id: "2",
      title: "Commented on Invoice Processing discussion",
      user: "Jane Smith",
      time: "1 day ago",
      status: "pending"
    }
  ]);

  const [processReviews, setProcessReviews] = useState<ProcessReview[]>([
    {
      id: "1",
      processName: "Purchase Order Workflow",
      reviewType: "Quality Assessment",
      reviewer: "John Doe",
      status: "completed",
      priority: "high"
    },
    {
      id: "2",
      processName: "Invoice Processing",
      reviewType: "Compliance Review",
      reviewer: "Jane Smith",
      status: "in-progress",
      priority: "medium"
    }
  ]);

  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([
    {
      id: "1",
      title: "Weekly Process Review",
      type: "meeting",
      startTime: "2024-01-25T14:00:00Z",
      endTime: "2024-01-25T15:00:00Z",
      organizer: "John Doe",
      attendees: ["jane@company.com", "mike@company.com"],
      isVirtual: true
    }
  ]);

  const currentUserId = "1";

  const inviteTeamMember = useCallback((email: string, role: string) => {
    const newMember: TeamMember = {
      id: `member_${Date.now()}`,
      name: email.split('@')[0],
      email,
      role,
      status: "offline",
      lastActive: "Never",
      initials: email.substring(0, 2).toUpperCase()
    };
    setTeamMembers(prev => [...prev, newMember]);
  }, []);

  const updateMemberStatus = useCallback((id: string, status: TeamMember["status"]) => {
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === id 
          ? { ...member, status, lastActive: status === "online" ? "Now" : member.lastActive }
          : member
      )
    );
  }, []);

  const removeMember = useCallback((id: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
  }, []);

  const createDiscussion = useCallback((discussionData: Omit<Discussion, "id" | "author" | "authorInitials" | "createdAt" | "updatedAt" | "likes" | "replies" | "isPinned" | "isResolved" | "views">) => {
    const newDiscussion: Discussion = {
      ...discussionData,
      id: `discussion_${Date.now()}`,
      author: "Current User",
      authorInitials: "CU",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: [],
      replies: [],
      isPinned: false,
      isResolved: false,
      views: 1
    };
    setDiscussions(prev => [newDiscussion, ...prev]);
  }, []);

  const addReply = useCallback((discussionId: string, content: string) => {
    const newReply: Reply = {
      id: `reply_${Date.now()}`,
      content,
      author: "Current User",
      authorInitials: "CU",
      createdAt: new Date().toISOString(),
      likes: []
    };
    setDiscussions(prev => 
      prev.map(discussion => 
        discussion.id === discussionId 
          ? { ...discussion, replies: [...discussion.replies, newReply], updatedAt: new Date().toISOString() }
          : discussion
      )
    );
  }, []);

  const toggleLike = useCallback((discussionId: string, replyId?: string) => {
    setDiscussions(prev => 
      prev.map(discussion => {
        if (discussion.id === discussionId) {
          if (replyId) {
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
            return {
              ...discussion,
              likes: discussion.likes.includes(currentUserId)
                ? discussion.likes.filter(id => id !== currentUserId)
                : [...discussion.likes, currentUserId]
            };
          }
        }
        return discussion;
      })
    );
  }, [currentUserId]);

  const togglePin = useCallback((discussionId: string) => {
    setDiscussions(prev => 
      prev.map(discussion => 
        discussion.id === discussionId 
          ? { ...discussion, isPinned: !discussion.isPinned }
          : discussion
      )
    );
  }, []);

  const resolveDiscussion = useCallback((discussionId: string) => {
    setDiscussions(prev => 
      prev.map(discussion => 
        discussion.id === discussionId 
          ? { ...discussion, isResolved: !discussion.isResolved }
          : discussion
      )
    );
  }, []);

  const createProcessReview = useCallback((reviewData: Omit<ProcessReview, "id">) => {
    const newReview: ProcessReview = {
      ...reviewData,
      id: `review_${Date.now()}`
    };
    setProcessReviews(prev => [...prev, newReview]);
  }, []);

  const createScheduleEvent = useCallback((eventData: Omit<ScheduleEvent, "id">) => {
    const newEvent: ScheduleEvent = {
      ...eventData,
      id: `event_${Date.now()}`
    };
    setScheduleEvents(prev => [...prev, newEvent]);
  }, []);

  return {
    teamMembers,
    discussions,
    activities,
    processReviews,
    scheduleEvents,
    currentUserId,
    inviteTeamMember,
    updateMemberStatus,
    removeMember,
    createDiscussion,
    addReply,
    toggleLike,
    togglePin,
    resolveDiscussion,
    createProcessReview,
    createScheduleEvent
  };
};
