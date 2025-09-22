import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Users, 
  MessageSquare, 
  Bell, 
  Video, 
  Share2, 
  Edit, 
  Eye, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  UserPlus,
  Settings,
  History,
  FileText,
  Download,
  Upload
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'editor' | 'viewer' | 'reviewer';
  status: 'online' | 'offline' | 'away';
  lastSeen: string;
  permissions: {
    canEdit: boolean;
    canComment: boolean;
    canShare: boolean;
    canApprove: boolean;
  };
}

interface Comment {
  id: string;
  author: Collaborator;
  content: string;
  timestamp: string;
  elementId?: string; // BPMN element this comment is attached to
  replies: Comment[];
  resolved: boolean;
  type: 'comment' | 'suggestion' | 'issue' | 'approval';
}

interface ChangeRequest {
  id: string;
  title: string;
  description: string;
  author: Collaborator;
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  reviewers: Collaborator[];
  changes: Array<{
    elementId: string;
    field: string;
    oldValue: string;
    newValue: string;
  }>;
}

export const ProcessCollaborationHub: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('comments');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const [collaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      avatar: '/api/placeholder/32/32',
      role: 'owner',
      status: 'online',
      lastSeen: 'now',
      permissions: { canEdit: true, canComment: true, canShare: true, canApprove: true }
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@company.com',
      avatar: '/api/placeholder/32/32',
      role: 'editor',
      status: 'online',
      lastSeen: '2 min ago',
      permissions: { canEdit: true, canComment: true, canShare: false, canApprove: false }
    },
    {
      id: '3',
      name: 'Lisa Wang',
      email: 'lisa@company.com',
      avatar: '/api/placeholder/32/32',
      role: 'reviewer',
      status: 'away',
      lastSeen: '15 min ago',
      permissions: { canEdit: false, canComment: true, canShare: false, canApprove: true }
    },
    {
      id: '4',
      name: 'John Smith',
      email: 'john@company.com',
      avatar: '/api/placeholder/32/32',
      role: 'viewer',
      status: 'offline',
      lastSeen: '1 hour ago',
      permissions: { canEdit: false, canComment: true, canShare: false, canApprove: false }
    }
  ]);

  const [comments] = useState<Comment[]>([
    {
      id: '1',
      author: collaborators[1],
      content: 'Should we add a validation step here? The current flow might miss edge cases.',
      timestamp: '2024-01-15 10:30',
      elementId: 'task-1',
      replies: [
        {
          id: '1-1',
          author: collaborators[0],
          content: 'Good point! Let me add a decision gateway for validation.',
          timestamp: '2024-01-15 10:45',
          replies: [],
          resolved: false,
          type: 'comment'
        }
      ],
      resolved: false,
      type: 'suggestion'
    },
    {
      id: '2',
      author: collaborators[2],
      content: 'This process looks good for approval. Performance metrics align with our targets.',
      timestamp: '2024-01-15 14:20',
      replies: [],
      resolved: true,
      type: 'approval'
    }
  ]);

  const [changeRequests] = useState<ChangeRequest[]>([
    {
      id: '1',
      title: 'Add automated notification step',
      description: 'Add email notification to customers after order confirmation',
      author: collaborators[1],
      status: 'pending',
      priority: 'medium',
      createdAt: '2024-01-15 09:00',
      reviewers: [collaborators[0], collaborators[2]],
      changes: [
        {
          elementId: 'task-2',
          field: 'name',
          oldValue: 'Process Order',
          newValue: 'Process Order & Send Notification'
        }
      ]
    },
    {
      id: '2',
      title: 'Update approval workflow',
      description: 'Streamline approval process for orders under $1000',
      author: collaborators[0],
      status: 'approved',
      priority: 'high',
      createdAt: '2024-01-14 16:30',
      reviewers: [collaborators[2]],
      changes: []
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'reviewer': return 'bg-orange-100 text-orange-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const addComment = () => {
    if (newComment.trim()) {
      toast({
        title: "Comment Added",
        description: "Your comment has been added to the process model.",
      });
      setNewComment('');
    }
  };

  const inviteCollaborator = (email: string, role: string) => {
    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${email} as ${role}.`,
    });
    setIsInviteOpen(false);
  };

  const approveChangeRequest = (id: string) => {
    toast({
      title: "Change Request Approved",
      description: "The change request has been approved and will be implemented.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Collaboration</h2>
          <p className="text-muted-foreground">Real-time collaboration and review workflow</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Video className="w-4 h-4 mr-2" />
            Start Meeting
          </Button>
          <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Invite
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Collaborator</DialogTitle>
              </DialogHeader>
              <InviteForm onInvite={inviteCollaborator} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="collaborators">
            Team ({collaborators.length})
          </TabsTrigger>
          <TabsTrigger value="comments">
            Comments ({comments.length})
          </TabsTrigger>
          <TabsTrigger value="changes">
            Changes ({changeRequests.length})
          </TabsTrigger>
          <TabsTrigger value="activity">
            Activity
          </TabsTrigger>
          <TabsTrigger value="versions">
            Versions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="collaborators" className="space-y-4">
          <div className="grid gap-4">
            {collaborators.map((collaborator) => (
              <Card key={collaborator.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={collaborator.avatar} />
                          <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(collaborator.status)}`} />
                      </div>
                      <div>
                        <p className="font-semibold">{collaborator.name}</p>
                        <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                        <p className="text-xs text-muted-foreground">Last seen: {collaborator.lastSeen}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className={getRoleColor(collaborator.role)}>
                        {collaborator.role}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Edit className="w-3 h-3" />
                        <span className={collaborator.permissions.canEdit ? 'text-green-600' : 'text-gray-400'}>
                          Edit
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-3 h-3" />
                        <span className={collaborator.permissions.canComment ? 'text-green-600' : 'text-gray-400'}>
                          Comment
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Share2 className="w-3 h-3" />
                        <span className={collaborator.permissions.canShare ? 'text-green-600' : 'text-gray-400'}>
                          Share
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span className={collaborator.permissions.canApprove ? 'text-green-600' : 'text-gray-400'}>
                          Approve
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Add Comment</span>
                <Select value={selectedElement || ''} onValueChange={setSelectedElement}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select element" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="task-1">Customer Validation</SelectItem>
                    <SelectItem value="task-2">Process Order</SelectItem>
                    <SelectItem value="gateway-1">Approval Gateway</SelectItem>
                    <SelectItem value="end-1">Process End</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Add your comment or suggestion..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-between">
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comment">Comment</SelectItem>
                    <SelectItem value="suggestion">Suggestion</SelectItem>
                    <SelectItem value="issue">Issue</SelectItem>
                    <SelectItem value="approval">Approval</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={addComment}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Comment
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="changes" className="space-y-4">
          {changeRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{request.title}</h3>
                      <Badge variant={request.status === 'pending' ? 'default' : request.status === 'approved' ? 'default' : 'destructive'}>
                        {request.status}
                      </Badge>
                      <Badge variant="outline" className={
                        request.priority === 'critical' ? 'border-red-500 text-red-700' :
                        request.priority === 'high' ? 'border-orange-500 text-orange-700' :
                        request.priority === 'medium' ? 'border-yellow-500 text-yellow-700' :
                        'border-green-500 text-green-700'
                      }>
                        {request.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{request.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={request.author.avatar} />
                          <AvatarFallback>{request.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{request.author.name}</span>
                      </div>
                      <span className="text-muted-foreground">{request.createdAt}</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{request.reviewers.length} reviewers</span>
                      </div>
                    </div>
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reject
                      </Button>
                      <Button size="sm" onClick={() => approveChangeRequest(request.id)}>
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <ScrollArea className="h-96">
            <div className="space-y-4">
              <ActivityItem
                icon={<Edit className="w-4 h-4" />}
                action="Modified task properties"
                user="Sarah Johnson"
                time="2 minutes ago"
                details="Updated 'Customer Validation' task duration to 2 hours"
              />
              <ActivityItem
                icon={<MessageSquare className="w-4 h-4" />}
                action="Added comment"
                user="Mike Chen"
                time="15 minutes ago"
                details="Suggested adding validation step"
              />
              <ActivityItem
                icon={<CheckCircle className="w-4 h-4" />}
                action="Approved change request"
                user="Lisa Wang"
                time="1 hour ago"
                details="Approved 'Update approval workflow'"
              />
              <ActivityItem
                icon={<Upload className="w-4 h-4" />}
                action="Published new version"
                user="Sarah Johnson"
                time="3 hours ago"
                details="Published v2.1 with performance improvements"
              />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="versions" className="space-y-4">
          <div className="space-y-4">
            <VersionItem
              version="v2.1"
              status="current"
              author="Sarah Johnson"
              date="2024-01-15 14:30"
              description="Added automated notifications and improved validation"
              changes={8}
            />
            <VersionItem
              version="v2.0"
              status="previous"
              author="Mike Chen"
              date="2024-01-12 10:15"
              description="Major restructure of approval workflow"
              changes={15}
            />
            <VersionItem
              version="v1.2"
              status="archived"
              author="Lisa Wang"
              date="2024-01-08 16:45"
              description="Bug fixes and minor improvements"
              changes={3}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'suggestion': return 'bg-blue-100 text-blue-800';
      case 'issue': return 'bg-red-100 text-red-800';
      case 'approval': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={comment.resolved ? 'opacity-75' : ''}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={comment.author.avatar} />
              <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{comment.author.name}</p>
              <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={getTypeColor(comment.type)}>
              {comment.type}
            </Badge>
            {comment.resolved && (
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Resolved
              </Badge>
            )}
          </div>
        </div>
        
        <p className="text-sm mb-3">{comment.content}</p>
        
        {comment.elementId && (
          <Badge variant="outline" className="mb-3">
            {comment.elementId}
          </Badge>
        )}
        
        {comment.replies.length > 0 && (
          <div className="ml-4 border-l-2 border-gray-200 pl-4 space-y-2">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={reply.author.avatar} />
                    <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{reply.author.name}</span>
                  <span className="text-muted-foreground">{reply.timestamp}</span>
                </div>
                <p>{reply.content}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-end gap-2 mt-3">
          <Button variant="ghost" size="sm">
            Reply
          </Button>
          {!comment.resolved && (
            <Button variant="ghost" size="sm">
              Resolve
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityItem: React.FC<{
  icon: React.ReactNode;
  action: string;
  user: string;
  time: string;
  details: string;
}> = ({ icon, action, user, time, details }) => (
  <div className="flex items-start space-x-3 p-3 rounded-lg border">
    <div className="mt-1">{icon}</div>
    <div className="flex-1">
      <p className="text-sm">
        <span className="font-semibold">{user}</span> {action}
      </p>
      <p className="text-xs text-muted-foreground">{details}</p>
      <p className="text-xs text-muted-foreground mt-1">{time}</p>
    </div>
  </div>
);

const VersionItem: React.FC<{
  version: string;
  status: 'current' | 'previous' | 'archived';
  author: string;
  date: string;
  description: string;
  changes: number;
}> = ({ version, status, author, date, description, changes }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{version}</h3>
          <Badge variant={status === 'current' ? 'default' : 'secondary'}>
            {status}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          {status !== 'current' && (
            <Button variant="ghost" size="sm">
              <History className="w-4 h-4 mr-1" />
              Restore
            </Button>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>By {author}</span>
        <span>{date}</span>
        <span>{changes} changes</span>
      </div>
    </CardContent>
  </Card>
);

const InviteForm: React.FC<{ onInvite: (email: string, role: string) => void }> = ({ onInvite }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('viewer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onInvite(email, role);
      setEmail('');
      setRole('viewer');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Email Address</Label>
        <Input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="colleague@company.com"
          required
        />
      </div>
      <div>
        <Label>Role</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="viewer">Viewer - Can view and comment</SelectItem>
            <SelectItem value="editor">Editor - Can edit and comment</SelectItem>
            <SelectItem value="reviewer">Reviewer - Can review and approve</SelectItem>
            <SelectItem value="owner">Owner - Full access</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="notify" />
        <Label htmlFor="notify">Send email notification</Label>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit">Send Invitation</Button>
      </div>
    </form>
  );
};