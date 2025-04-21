
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AtSign,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  Clock,
  File,
  FileText,
  Filter,
  GitMerge,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  User,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CollaborationHub() {
  return (
    <MainLayout pageTitle="Collaboration Hub">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Models</CardTitle>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search models..."
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="recent" className="px-4 pb-2">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="mine">Mine</TabsTrigger>
                  <TabsTrigger value="shared">Shared</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="divide-y max-h-[calc(100vh-300px)] overflow-auto">
                <ModelItem
                  title="Order to Cash Process"
                  type="BPMN"
                  author="John Doe"
                  time="10 min ago"
                  comments={5}
                  isActive
                />
                <ModelItem
                  title="Customer Onboarding Journey"
                  type="Journey"
                  author="Lisa Johnson"
                  time="Yesterday"
                  comments={12}
                />
                <ModelItem
                  title="Invoice Approval"
                  type="BPMN"
                  author="Michael Chen"
                  time="2 days ago"
                  comments={3}
                />
                <ModelItem
                  title="Procurement Process"
                  type="BPMN"
                  author="Sarah Miller"
                  time="1 week ago"
                  comments={8}
                />
                <ModelItem
                  title="Client Support Experience"
                  type="Journey"
                  author="Robert Taylor"
                  time="2 weeks ago"
                  comments={15}
                />
                <ModelItem
                  title="Employee Hire to Retire"
                  type="BPMN"
                  author="Jennifer Adams"
                  time="3 weeks ago"
                  comments={7}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GitMerge className="h-5 w-5 text-enterprise-blue-600" />
                    Order to Cash Process
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <User className="h-3.5 w-3.5" />
                    John Doe
                    <span className="text-xs">•</span>
                    v2.3
                    <span className="text-xs">•</span>
                    Last updated 10 min ago
                  </CardDescription>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    9 Collaborators
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="border-t border-b h-[300px] flex items-center justify-center bg-muted/50">
                <div className="text-muted-foreground flex flex-col items-center">
                  <GitMerge className="h-10 w-10 mb-2 opacity-70" />
                  <p>[Process Model Viewer]</p>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <Tabs defaultValue="comments" className="px-6 pt-4">
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="versions">Versions</TabsTrigger>
                    <TabsTrigger value="approvals">Approvals</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="px-6 py-4 flex-1 overflow-auto max-h-[calc(100vh-600px)]">
                  <TabsContent value="comments" className="mt-0 space-y-4">
                    <Comment
                      author="Lisa Johnson"
                      avatar="LJ"
                      time="10 min ago"
                      text="I think we should add a verification step after the order is submitted but before it gets processed. This would help reduce errors that occur in the later stages."
                      replies={[
                        {
                          author: "Michael Chen",
                          avatar: "MC",
                          time: "5 min ago",
                          text: "Good point, Lisa. We've seen several cases where errors in the order led to delivery issues. A verification step could save us a lot of trouble."
                        }
                      ]}
                    />
                    
                    <Comment
                      author="Sarah Miller"
                      avatar="SM"
                      time="1 hour ago"
                      text="The payment processing step needs to account for international transactions. Right now it seems to only handle domestic payments."
                    />
                    
                    <Comment
                      author="Robert Taylor"
                      avatar="RT"
                      time="2 hours ago"
                      text="Can we add more details to the fulfillment step? For instance, we should specify which inventory system we're checking against."
                      replies={[
                        {
                          author: "John Doe",
                          avatar: "JD",
                          time: "1 hour ago",
                          text: "Good catch! I'll add integration points with both our primary and backup inventory systems."
                        }
                      ]}
                    />
                    
                    <Comment
                      author="Jennifer Adams"
                      avatar="JA"
                      time="Yesterday"
                      text="We should also consider adding a customer satisfaction survey at the end of the process. This would give us valuable feedback on how our order fulfillment is performing."
                    />
                  </TabsContent>
                  
                  <TabsContent value="tasks" className="mt-0 space-y-4">
                    <div className="space-y-3">
                      <TaskItem
                        title="Verify order submission flow"
                        assigned="Lisa Johnson"
                        dueDate="Oct 25, 2023"
                        status="In Progress"
                      />
                      <TaskItem
                        title="Update payment processing for international"
                        assigned="Sarah Miller"
                        dueDate="Oct 28, 2023"
                        status="Not Started"
                      />
                      <TaskItem
                        title="Define inventory system integration"
                        assigned="John Doe"
                        dueDate="Oct 22, 2023"
                        status="Completed"
                      />
                      <TaskItem
                        title="Create post-fulfillment satisfaction survey"
                        assigned="Jennifer Adams"
                        dueDate="Nov 5, 2023"
                        status="Not Started"
                      />
                      <TaskItem
                        title="Review entire process with stakeholders"
                        assigned="Robert Taylor"
                        dueDate="Nov 10, 2023"
                        status="Not Started"
                      />
                    </div>
                    
                    <Button variant="outline" size="sm" className="gap-1 mt-2">
                      <Clipboard className="h-4 w-4" />
                      Create New Task
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="versions" className="mt-0 space-y-4">
                    <div className="space-y-3">
                      <VersionItem 
                        version="2.3"
                        date="Oct 15, 2023"
                        author="John Doe"
                        changes={["Added verification step", "Updated payment processing"]}
                        isCurrent
                      />
                      <VersionItem 
                        version="2.2"
                        date="Oct 8, 2023"
                        author="Sarah Miller"
                        changes={["Fixed shipping flow", "Added international options"]}
                      />
                      <VersionItem 
                        version="2.1"
                        date="Sep 25, 2023"
                        author="Michael Chen"
                        changes={["Updated inventory check", "Optimized fulfillment process"]}
                      />
                      <VersionItem 
                        version="2.0"
                        date="Sep 15, 2023"
                        author="John Doe"
                        changes={["Major redesign", "Added digital delivery option"]}
                      />
                      <VersionItem 
                        version="1.2"
                        date="Aug 30, 2023"
                        author="Lisa Johnson"
                        changes={["Bug fixes in approval flow", "Documentation updates"]}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="approvals" className="mt-0 space-y-4">
                    <div className="space-y-3">
                      <ApprovalItem
                        stage="Process Owner Review"
                        approver="John Doe"
                        status="Approved"
                        date="Oct 15, 2023"
                        comment="Looks good, all critical changes implemented."
                      />
                      <ApprovalItem
                        stage="Department Head Review"
                        approver="Lisa Johnson"
                        status="Approved"
                        date="Oct 14, 2023"
                        comment="Approved with minor suggestions for future versions."
                      />
                      <ApprovalItem
                        stage="Compliance Check"
                        approver="Michael Chen"
                        status="Approved"
                        date="Oct 12, 2023"
                        comment="All compliance requirements met."
                      />
                      <ApprovalItem
                        stage="Final Publication"
                        approver="Robert Taylor"
                        status="Pending"
                      />
                    </div>
                  </TabsContent>
                </div>
                
                <div className="px-6 pb-4">
                  <Separator className="mb-4" />
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                      JD
                    </div>
                    <div className="flex-1 relative">
                      <Input 
                        placeholder="Add a comment or @mention someone..." 
                        className="pr-20" 
                      />
                      <div className="absolute right-2 top-2 flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <AtSign className="h-4 w-4" />
                        </Button>
                        <Button size="icon" className="h-6 w-6">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

interface ModelItemProps {
  title: string;
  type: "BPMN" | "DMN" | "Journey";
  author: string;
  time: string;
  comments: number;
  isActive?: boolean;
}

function ModelItem({ title, type, author, time, comments, isActive = false }: ModelItemProps) {
  const icon = type === "BPMN" ? (
    <GitMerge className="h-4 w-4 text-enterprise-blue-600" />
  ) : type === "Journey" ? (
    <Users className="h-4 w-4 text-enterprise-blue-600" />
  ) : (
    <FileText className="h-4 w-4 text-enterprise-blue-600" />
  );
  
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 cursor-pointer",
      isActive ? "bg-enterprise-blue-50" : "hover:bg-muted/50"
    )}>
      <div className="bg-muted rounded-md p-1.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(
          "truncate",
          isActive ? "font-medium" : ""
        )}>
          {title}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{author}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <MessageSquare className="h-3.5 w-3.5" />
        {comments}
      </div>
    </div>
  );
}

interface CommentProps {
  author: string;
  avatar: string;
  time: string;
  text: string;
  replies?: {
    author: string;
    avatar: string;
    time: string;
    text: string;
  }[];
}

function Comment({ author, avatar, time, text, replies = [] }: CommentProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground font-medium">
          {avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{author}</span>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
          <p className="mt-1 text-sm">{text}</p>
          <div className="flex items-center gap-4 mt-2">
            <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
            <button className="text-xs text-muted-foreground hover:text-foreground">Like</button>
          </div>
        </div>
      </div>
      
      {replies.length > 0 && (
        <div className="ml-10 pl-6 border-l space-y-4">
          {replies.map((reply, index) => (
            <div className="flex gap-3" key={index}>
              <div className="w-7 h-7 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-muted-foreground font-medium text-sm">
                {reply.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{reply.author}</span>
                  <span className="text-xs text-muted-foreground">{reply.time}</span>
                </div>
                <p className="mt-1 text-sm">{reply.text}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
                  <button className="text-xs text-muted-foreground hover:text-foreground">Like</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface TaskItemProps {
  title: string;
  assigned: string;
  dueDate: string;
  status: "Not Started" | "In Progress" | "Completed";
}

function TaskItem({ title, assigned, dueDate, status }: TaskItemProps) {
  const statusColors = {
    "Not Started": "bg-muted text-muted-foreground",
    "In Progress": "bg-enterprise-blue-100 text-enterprise-blue-800",
    "Completed": "bg-status-success/10 text-status-success",
  };
  
  return (
    <div className="border rounded-md p-3 hover:border-primary">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {status === "Completed" ? (
            <CheckCircle2 className="h-5 w-5 text-status-success" />
          ) : (
            <File className="h-5 w-5 text-muted-foreground" />
          )}
          <h3 className="font-medium">{title}</h3>
        </div>
        <Badge className={cn(statusColors[status], "font-normal")}>
          {status}
        </Badge>
      </div>
      <div className="ml-7 mt-2 flex items-center justify-between text-sm">
        <div className="text-muted-foreground">
          Assigned to: <span className="text-foreground">{assigned}</span>
        </div>
        <div className="flex items-center text-muted-foreground gap-2">
          <Calendar className="h-3.5 w-3.5" />
          {dueDate}
        </div>
      </div>
    </div>
  );
}

interface VersionItemProps {
  version: string;
  date: string;
  author: string;
  changes: string[];
  isCurrent?: boolean;
}

function VersionItem({ version, date, author, changes, isCurrent = false }: VersionItemProps) {
  return (
    <div className={cn(
      "border rounded-md p-3",
      isCurrent ? "border-enterprise-blue-300 bg-enterprise-blue-50/30" : ""
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="font-medium flex items-center gap-1.5">
            Version {version}
            {isCurrent && <Badge variant="outline" className="font-normal text-xs">Current</Badge>}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {date}
        </div>
      </div>
      
      <div className="mt-2 text-sm">
        <div>
          Created by <span className="font-medium">{author}</span>
        </div>
        
        {changes.length > 0 && (
          <div className="mt-1.5">
            <div className="text-muted-foreground">Changes:</div>
            <ul className="list-disc list-inside pl-1 mt-1 space-y-0.5">
              {changes.map((change, index) => (
                <li key={index} className="text-sm">{change}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 mt-3">
        <Button size="sm" variant="outline" className="text-xs h-7">
          View
        </Button>
        {!isCurrent && (
          <Button size="sm" variant="outline" className="text-xs h-7">
            Compare
          </Button>
        )}
        <Button size="sm" variant="outline" className="text-xs h-7">
          Download
        </Button>
      </div>
    </div>
  );
}

interface ApprovalItemProps {
  stage: string;
  approver: string;
  status: "Pending" | "Approved" | "Rejected";
  date?: string;
  comment?: string;
}

function ApprovalItem({ stage, approver, status, date, comment }: ApprovalItemProps) {
  return (
    <div className="border rounded-md p-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{stage}</h3>
        <Badge
          className={cn(
            status === "Approved" ? "bg-status-success/10 text-status-success" :
            status === "Rejected" ? "bg-status-danger/10 text-status-danger" :
            "bg-status-warning/10 text-status-warning"
          )}
        >
          {status}
        </Badge>
      </div>
      
      <div className="mt-2 flex items-center justify-between text-sm">
        <div>Approver: <span className="font-medium">{approver}</span></div>
        {date && (
          <div className="flex items-center text-muted-foreground gap-2">
            <Clock className="h-3.5 w-3.5" />
            {date}
          </div>
        )}
      </div>
      
      {comment && (
        <div className="mt-2 text-sm bg-muted/50 p-2 rounded-md">
          {comment}
        </div>
      )}
    </div>
  );
}
