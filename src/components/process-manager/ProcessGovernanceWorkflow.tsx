import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, Clock, AlertCircle, User, MessageSquare, FileText, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GovernanceItem {
  id: string;
  processName: string;
  type: 'approval' | 'review' | 'compliance' | 'audit';
  status: 'pending' | 'in-progress' | 'approved' | 'rejected' | 'needs-revision';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: {
    name: string;
    role: string;
    avatar: string;
  };
  dueDate: string;
  description: string;
  comments: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: string;
    type: 'comment' | 'decision' | 'request';
  }>;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
  }>;
  history: Array<{
    id: string;
    action: string;
    user: string;
    timestamp: string;
    details: string;
  }>;
}

export const ProcessGovernanceWorkflow: React.FC = () => {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<GovernanceItem | null>(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [newComment, setNewComment] = useState('');

  const governanceItems: GovernanceItem[] = [
    {
      id: '1',
      processName: 'Customer Onboarding Process v2.1',
      type: 'approval',
      status: 'pending',
      priority: 'high',
      assignee: { name: 'Sarah Johnson', role: 'Process Owner', avatar: '/api/placeholder/32/32' },
      dueDate: '2024-01-15',
      description: 'New customer onboarding process requires approval before implementation',
      comments: [
        { id: '1', author: 'John Smith', content: 'Please review the compliance requirements in section 3', timestamp: '2024-01-10 14:30', type: 'comment' },
        { id: '2', author: 'Sarah Johnson', content: 'Added additional KYC verification step', timestamp: '2024-01-11 09:15', type: 'request' }
      ],
      documents: [
        { id: '1', name: 'Process_Documentation.pdf', type: 'PDF', size: '2.5MB' },
        { id: '2', name: 'Compliance_Checklist.xlsx', type: 'Excel', size: '1.2MB' }
      ],
      history: [
        { id: '1', action: 'Submitted for approval', user: 'John Smith', timestamp: '2024-01-10 10:00', details: 'Initial submission' },
        { id: '2', action: 'Review started', user: 'Sarah Johnson', timestamp: '2024-01-10 14:00', details: 'Assigned to compliance team' }
      ]
    },
    {
      id: '2',
      processName: 'Invoice Processing Automation',
      type: 'compliance',
      status: 'in-progress',
      priority: 'medium',
      assignee: { name: 'Michael Chen', role: 'Compliance Officer', avatar: '/api/placeholder/32/32' },
      dueDate: '2024-01-20',
      description: 'Compliance review for automated invoice processing workflow',
      comments: [],
      documents: [],
      history: []
    },
    {
      id: '3',
      processName: 'Employee Exit Procedure',
      type: 'audit',
      status: 'approved',
      priority: 'low',
      assignee: { name: 'Lisa Wang', role: 'Audit Lead', avatar: '/api/placeholder/32/32' },
      dueDate: '2024-01-18',
      description: 'Quarterly audit of employee exit procedures completed successfully',
      comments: [],
      documents: [],
      history: []
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleApprove = (itemId: string) => {
    toast({
      title: "Process Approved",
      description: "The process has been approved and will be implemented.",
    });
  };

  const handleReject = (itemId: string) => {
    toast({
      title: "Process Rejected",
      description: "The process has been rejected and sent back for revision.",
    });
  };

  const addComment = () => {
    if (newComment.trim()) {
      toast({
        title: "Comment Added",
        description: "Your comment has been added to the governance workflow.",
      });
      setNewComment('');
    }
  };

  const filterItems = (status: string) => {
    if (status === 'pending') return governanceItems.filter(item => item.status === 'pending');
    if (status === 'in-progress') return governanceItems.filter(item => item.status === 'in-progress');
    if (status === 'completed') return governanceItems.filter(item => ['approved', 'rejected'].includes(item.status));
    return governanceItems;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Process Governance</h2>
          <p className="text-muted-foreground">Manage process approvals, compliance, and audits</p>
        </div>
        <Button>
          <Shield className="w-4 h-4 mr-2" />
          New Governance Item
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending ({filterItems('pending').length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({filterItems('in-progress').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({filterItems('completed').length})</TabsTrigger>
          <TabsTrigger value="all">All ({governanceItems.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {filterItems('pending').map((item) => (
            <GovernanceItemCard key={item.id} item={item} onSelect={setSelectedItem} onApprove={handleApprove} onReject={handleReject} />
          ))}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {filterItems('in-progress').map((item) => (
            <GovernanceItemCard key={item.id} item={item} onSelect={setSelectedItem} onApprove={handleApprove} onReject={handleReject} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {filterItems('completed').map((item) => (
            <GovernanceItemCard key={item.id} item={item} onSelect={setSelectedItem} onApprove={handleApprove} onReject={handleReject} />
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {governanceItems.map((item) => (
            <GovernanceItemCard key={item.id} item={item} onSelect={setSelectedItem} onApprove={handleApprove} onReject={handleReject} />
          ))}
        </TabsContent>
      </Tabs>

      {selectedItem && (
        <GovernanceDetailDialog 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)}
          newComment={newComment}
          setNewComment={setNewComment}
          onAddComment={addComment}
        />
      )}
    </div>
  );
};

const GovernanceItemCard: React.FC<{
  item: GovernanceItem;
  onSelect: (item: GovernanceItem) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}> = ({ item, onSelect, onApprove, onReject }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(item)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground">{item.processName}</h3>
              <Badge variant="outline" className={getPriorityColor(item.priority)}>
                {item.priority}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                {getStatusIcon(item.status)}
                <Badge variant="secondary" className={getStatusColor(item.status)}>
                  {item.status.replace('-', ' ')}
                </Badge>
              </div>
              <Badge variant="outline">{item.type}</Badge>
              <span className="text-sm text-muted-foreground">Due: {item.dueDate}</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={item.assignee.avatar} />
                <AvatarFallback>{item.assignee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-foreground">{item.assignee.name}</span>
              <span className="text-sm text-muted-foreground">({item.assignee.role})</span>
            </div>
          </div>

          {item.status === 'pending' && (
            <div className="flex gap-2 ml-4">
              <Button 
                size="sm" 
                variant="outline" 
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={(e) => { e.stopPropagation(); onReject(item.id); }}
              >
                Reject
              </Button>
              <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700"
                onClick={(e) => { e.stopPropagation(); onApprove(item.id); }}
              >
                Approve
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const GovernanceDetailDialog: React.FC<{
  item: GovernanceItem;
  onClose: () => void;
  newComment: string;
  setNewComment: (value: string) => void;
  onAddComment: () => void;
}> = ({ item, onClose, newComment, setNewComment, onAddComment }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{item.processName}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="comments">Comments ({item.comments.length})</TabsTrigger>
            <TabsTrigger value="documents">Documents ({item.documents.length})</TabsTrigger>
            <TabsTrigger value="history">History ({item.history.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <p className="font-semibold capitalize">{item.type}</p>
              </div>
              <div>
                <Label>Status</Label>
                <p className="font-semibold capitalize">{item.status.replace('-', ' ')}</p>
              </div>
              <div>
                <Label>Priority</Label>
                <p className="font-semibold capitalize">{item.priority}</p>
              </div>
              <div>
                <Label>Due Date</Label>
                <p className="font-semibold">{item.dueDate}</p>
              </div>
            </div>
            
            <div>
              <Label>Description</Label>
              <p className="mt-1">{item.description}</p>
            </div>

            <div>
              <Label>Assignee</Label>
              <div className="flex items-center gap-2 mt-1">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={item.assignee.avatar} />
                  <AvatarFallback>{item.assignee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{item.assignee.name}</p>
                  <p className="text-sm text-muted-foreground">{item.assignee.role}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {item.comments.map((comment) => (
                  <div key={comment.id} className="border rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{comment.author}</span>
                      <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    <Badge variant="outline" className="mt-2">{comment.type}</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="space-y-2">
              <Textarea 
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comment">Comment</SelectItem>
                    <SelectItem value="decision">Decision</SelectItem>
                    <SelectItem value="request">Request</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={onAddComment} className="ml-auto">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Comment
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="space-y-2">
              {item.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <div>
                      <p className="font-semibold">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Download</Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {item.history.map((entry) => (
                  <div key={entry.id} className="border-l-2 border-primary pl-4 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{entry.action}</span>
                      <span className="text-sm text-muted-foreground">{entry.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">by {entry.user}</p>
                    <p className="text-sm">{entry.details}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};