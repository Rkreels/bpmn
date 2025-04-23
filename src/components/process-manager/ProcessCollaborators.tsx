
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Mail, Plus, Search, UserPlus 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Editor" | "Reviewer" | "Viewer";
  avatar: string;
  status: "active" | "pending";
}

const collaborators: Collaborator[] = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "Owner",
    avatar: "",
    status: "active"
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike.j@company.com",
    role: "Editor",
    avatar: "",
    status: "active"
  },
  {
    id: "3",
    name: "Sarah Lee",
    email: "sarah.lee@company.com",
    role: "Reviewer",
    avatar: "",
    status: "active"
  },
  {
    id: "4",
    name: "John Davis",
    email: "john.davis@company.com",
    role: "Viewer",
    avatar: "",
    status: "pending"
  }
];

export const ProcessCollaborators: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const handleInvite = () => {
    toast({
      title: "Invitation Sent",
      description: "Collaboration invitation has been sent successfully."
    });
  };

  const handleRoleChange = (id: string, role: Collaborator["role"]) => {
    toast({
      title: "Role Updated",
      description: `User role has been updated to ${role}.`
    });
  };

  const filterCollaborators = () => {
    if (!searchQuery) return collaborators;
    
    return collaborators.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Process Collaborators</h3>
        <Button onClick={handleInvite} size="sm" className="gap-1">
          <UserPlus className="h-4 w-4" />
          Invite Users
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search collaborators..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-4">
        {filterCollaborators().map((collaborator) => (
          <div key={collaborator.id} className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={collaborator.avatar} />
                <AvatarFallback>{collaborator.name.charAt(0)}{collaborator.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{collaborator.name}</h4>
                  {collaborator.status === "pending" && (
                    <Badge variant="outline" className="text-amber-500 bg-amber-50">Pending</Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 mr-1" />
                  {collaborator.email}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <select 
                className="text-sm border rounded p-1"
                value={collaborator.role}
                onChange={(e) => handleRoleChange(collaborator.id, e.target.value as Collaborator["role"])}
              >
                <option value="Owner">Owner</option>
                <option value="Editor">Editor</option>
                <option value="Reviewer">Reviewer</option>
                <option value="Viewer">Viewer</option>
              </select>
              
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        <Button variant="outline" className="gap-1">
          <Plus className="h-4 w-4" />
          Add New Collaborator
        </Button>
      </div>
    </div>
  );
};
