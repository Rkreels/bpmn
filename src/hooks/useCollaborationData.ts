import { useDataManager } from './useDataManager';
import { CollaborationProject } from '@/types/modules';

const initialCollaborationData: CollaborationProject[] = [
  {
    id: 'collab_1',
    name: 'Process Optimization Initiative',
    description: 'Cross-functional team collaboration for process improvement',
    type: 'process-review',
    participants: ['Sarah Johnson', 'Mike Wilson', 'Anna Davis', 'John Smith'],
    discussions: [
      {
        id: 'disc_1',
        title: 'Bottleneck Analysis Discussion',
        author: 'Sarah Johnson',
        content: 'We need to analyze the current bottlenecks in our customer onboarding process.',
        timestamp: '2024-01-15T09:00:00Z',
        replies: [],
        resolved: false
      }
    ],
    approvals: [
      {
        id: 'app_1',
        title: 'Process Model Review',
        requestedBy: 'Sarah Johnson',
        assignedTo: 'Mike Wilson',
        status: 'pending',
        deadline: '2024-01-20T17:00:00Z',
        comments: 'Please review the updated process model for accuracy.'
      }
    ],
    tasks: [
      {
        id: 'task_1',
        title: 'Update process documentation',
        assignedTo: 'Anna Davis',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-01-18T17:00:00Z'
      }
    ],
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-15T11:30:00Z',
    createdBy: 'Sarah Johnson',
    status: 'active'
  }
];

const validateCollaboration = (item: Partial<CollaborationProject>): string | null => {
  if (!item.name?.trim()) return 'Project name is required';
  if (!item.type) return 'Project type is required';
  return null;
};

export const useCollaborationData = () => {
  const baseHook = useDataManager<CollaborationProject>({
    storageKey: 'collaboration_projects',
    initialData: initialCollaborationData,
    validator: validateCollaboration
  });

  // Add collaboration-specific functionality
  const discussions = baseHook.items.flatMap(project => project.discussions);
  const teamMembers = ['Sarah Johnson', 'Mike Wilson', 'Anna Davis', 'John Smith'];
  const activities = baseHook.items.map(project => ({ id: project.id, type: 'project', message: `${project.name} updated` }));

  return {
    ...baseHook,
    discussions,
    teamMembers,
    activities,
    processReviews: baseHook.items.filter(p => p.type === 'process-review'),
    scheduleEvents: [],
    createDiscussion: (title: string, content: string) => baseHook.create({ name: title, description: content, type: 'process-review', participants: [], discussions: [], approvals: [], tasks: [], createdBy: 'Current User', status: 'active' }),
    createProcessReview: (name: string) => baseHook.create({ name, description: 'Process review', type: 'process-review', participants: [], discussions: [], approvals: [], tasks: [], createdBy: 'Current User', status: 'active' }),
    createScheduleEvent: () => {},
    inviteTeamMember: () => {},
    currentUserId: 'current-user',
    addReply: () => {},
    toggleLike: () => {},
    togglePin: () => {},
    resolveDiscussion: () => {}
  };
};

export interface Activity {
  id: string;
  type: string;
  message: string;
}