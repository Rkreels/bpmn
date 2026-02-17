import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useVoice } from '@/contexts/VoiceContext';
import { useIndustry } from '@/contexts/IndustryContext';
import { getIndustryData } from '@/data/industryDemoData';
import { MessageSquare, Users, Send, Video, Phone, Share, CheckCircle, AlertCircle, ThumbsUp } from 'lucide-react';

export const FunctionalCollaboration: React.FC = () => {
  const { currentIndustry } = useIndustry();
  const industryData = getIndustryData(currentIndustry);

  const [comments, setComments] = useState(industryData.comments);
  const [teamMembers] = useState(industryData.teamMembers);
  const [approvals, setApprovals] = useState(industryData.approvals);
  const [newComment, setNewComment] = useState('');
  const { toast } = useToast();
  const { speakText } = useVoice();

  // Reset data when industry changes
  React.useEffect(() => {
    const data = getIndustryData(currentIndustry);
    setComments(data.comments);
    setApprovals(data.approvals);
  }, [currentIndustry]);

  const handleAddComment = useCallback(() => {
    if (!newComment.trim()) return;
    const comment = { id: Date.now().toString(), author: 'Current User', content: newComment, timestamp: new Date().toISOString(), status: 'open' as const, likes: 0 };
    setComments(prev => [comment, ...prev]);
    setNewComment('');
    toast({ title: "Comment Added", description: "Your comment has been posted" });
  }, [newComment, toast]);

  const handleLikeComment = useCallback((commentId: string) => {
    setComments(prev => prev.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
  }, []);

  const handleResolveComment = useCallback((commentId: string) => {
    setComments(prev => prev.map(c => c.id === commentId ? { ...c, status: 'resolved' as const } : c));
    toast({ title: "Comment Resolved", description: "Discussion thread marked as resolved" });
  }, [toast]);

  const handleApproval = useCallback((approvalId: string, decision: 'approved' | 'rejected') => {
    setApprovals(prev => prev.map(a => a.id === approvalId ? { ...a, status: decision } : a));
    const approval = approvals.find(a => a.id === approvalId);
    toast({ title: `Process ${decision}`, description: `${approval?.processName} has been ${decision}` });
  }, [approvals, toast]);

  const handleStartMeeting = useCallback((type: 'video' | 'audio') => {
    const onlineCount = teamMembers.filter(m => m.status === 'online').length;
    toast({ title: "Meeting Started", description: `${type === 'video' ? 'Video' : 'Audio'} meeting initiated with ${onlineCount} available participants` });
  }, [teamMembers, toast]);

  const handleShareProcess = useCallback(() => {
    toast({ title: "Process Shared", description: `Process shared with ${teamMembers.length} team members` });
  }, [teamMembers, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-muted-foreground/40';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-destructive';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-muted-foreground/40';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-primary">{teamMembers.filter(m => m.status === 'online').length}</div><div className="text-sm text-muted-foreground">Online Members</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-primary">{comments.filter(c => c.status === 'open').length}</div><div className="text-sm text-muted-foreground">Active Discussions</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-primary">{approvals.filter(a => a.status === 'pending').length}</div><div className="text-sm text-muted-foreground">Pending Approvals</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-primary">{approvals.filter(a => a.status === 'approved').length}</div><div className="text-sm text-muted-foreground">Approved</div></CardContent></Card>
      </div>

      <div className="flex flex-wrap gap-2 lg:gap-4">
        <Button onClick={() => handleStartMeeting('video')}><Video className="h-4 w-4 mr-2" />Video Call</Button>
        <Button variant="outline" onClick={() => handleStartMeeting('audio')}><Phone className="h-4 w-4 mr-2" />Audio Call</Button>
        <Button variant="outline" onClick={handleShareProcess}><Share className="h-4 w-4 mr-2" />Share Process</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Team Members</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.map(member => (
                <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar><AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                    <div><div className="font-medium text-sm">{member.name}</div><div className="text-xs text-muted-foreground">{member.role}</div></div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                    <div className="text-xs text-muted-foreground mt-1">{member.lastActive}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5" />Discussions</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Textarea placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className="flex-1" />
                <Button onClick={handleAddComment} disabled={!newComment.trim()} size="icon"><Send className="h-4 w-4" /></Button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {comments.map(comment => (
                  <div key={comment.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6"><AvatarFallback className="text-xs">{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                        <span className="font-medium text-sm">{comment.author}</span>
                        <Badge variant={comment.status === 'open' ? 'default' : 'secondary'} className="text-xs">{comment.status}</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(comment.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm mb-2">{comment.content}</p>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => handleLikeComment(comment.id)}><ThumbsUp className="h-3 w-3 mr-1" />{comment.likes}</Button>
                      {comment.status === 'open' && <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => handleResolveComment(comment.id)}><CheckCircle className="h-3 w-3 mr-1" />Resolve</Button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5" />Workflow Approvals</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {approvals.map(approval => (
              <div key={approval.id} className="border rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-medium">{approval.processName}</h4>
                      <Badge className={getStatusColor(approval.status)}>{approval.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{approval.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>By {approval.requester}</span>
                      <span>{new Date(approval.requestDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {approval.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleApproval(approval.id, 'approved')}><CheckCircle className="h-4 w-4 mr-1" />Approve</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleApproval(approval.id, 'rejected')}><AlertCircle className="h-4 w-4 mr-1" />Reject</Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
