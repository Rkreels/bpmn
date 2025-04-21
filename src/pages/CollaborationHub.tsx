
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AtSign,
  Filter,
  GitMerge,
  MessageSquare,
  Paperclip,
  Search,
  Send,
  User,
  Users
} from "lucide-react";

// Import the refactored components
import { ModelItem } from "@/components/collaboration/ModelItem";
import { Comment } from "@/components/collaboration/Comment";
import { TaskItem } from "@/components/collaboration/TaskItem";
import { VersionItem } from "@/components/collaboration/VersionItem";
import { ApprovalItem } from "@/components/collaboration/ApprovalItem";
import { ModelViewer } from "@/components/collaboration/ModelViewer";

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
                
                <TabsContent value="recent">
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
                </TabsContent>
                
                <TabsContent value="mine">
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
                      title="Return Process"
                      type="BPMN"
                      author="John Doe"
                      time="3 days ago"
                      comments={2}
                    />
                    <ModelItem
                      title="Customer Acquisition"
                      type="Journey"
                      author="John Doe"
                      time="1 week ago"
                      comments={9}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="shared">
                  <div className="divide-y max-h-[calc(100vh-300px)] overflow-auto">
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
                  </div>
                </TabsContent>
              </Tabs>
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
              <ModelViewer />
              
              <div className="flex-1 flex flex-col">
                <Tabs defaultValue="comments" className="px-6 pt-4">
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="versions">Versions</TabsTrigger>
                    <TabsTrigger value="approvals">Approvals</TabsTrigger>
                  </TabsList>
                  
                  <div className="px-0 py-4 flex-1 overflow-auto max-h-[calc(100vh-600px)]">
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
                </Tabs>
                
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
