
import { useState, useCallback } from "react";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "online" | "offline" | "away";
  avatar?: string;
  lastActive: string;
}

export const useCollaborationData = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@company.com",
      role: "Admin",
      status: "online",
      lastActive: "Now"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@company.com",
      role: "Editor",
      status: "away",
      lastActive: "5 minutes ago"
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@company.com",
      role: "Viewer",
      status: "offline",
      lastActive: "2 hours ago"
    }
  ]);

  const inviteTeamMember = useCallback((email: string, role: string) => {
    const newMember: TeamMember = {
      id: `member_${Date.now()}`,
      name: email.split('@')[0],
      email,
      role,
      status: "offline",
      lastActive: "Never"
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

  return {
    teamMembers,
    inviteTeamMember,
    updateMemberStatus,
    removeMember
  };
};
