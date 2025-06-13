import { useState } from "react";
import { useDiscussions } from "./collaboration/useDiscussions";
import { useTeamData, TeamMember, Activity } from "./collaboration/useTeamData";

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
  const discussionData = useDiscussions();
  const teamData = useTeamData();

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

  const createProcessReview = (reviewData: Partial<ProcessReview>) => {
    console.log("Creating process review:", reviewData);
  };

  const createScheduleEvent = (eventData: Partial<ScheduleEvent>) => {
    console.log("Creating schedule event:", eventData);
  };

  return {
    ...discussionData,
    ...teamData,
    processReviews,
    scheduleEvents,
    createProcessReview,
    createScheduleEvent
  };
};

// Re-export types for backward compatibility
export type { Discussion, Reply } from "./collaboration/useDiscussions";
export type { TeamMember, Activity } from "./collaboration/useTeamData";
export type { Discussion as DiscussionType } from "./collaboration/useDiscussions";
