
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useVoice } from "@/contexts/VoiceContext";
import { useToast } from "@/hooks/use-toast";
import { UserManagementActions } from "./UserManagementActions";
import { UserDetailView } from "./UserDetailView";
import { 
  Users, 
  Search,
  Settings,
  Shield,
  Mail,
  MoreVertical,
  Eye
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  department?: string;
  phone?: string;
  bio?: string;
  processesOwned?: number;
  collaborations?: number;
}

export const UserManagement: React.FC = () => {
  const { speakText } = useVoice();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetailView, setShowDetailView] = useState(false);
  
  const [users, setUsers] = useState<User[]>([
    { 
      id: "1", 
      name: "John Doe", 
      email: "john@company.com", 
      role: "Admin", 
      status: "Active", 
      lastLogin: "2 hours ago",
      department: "IT",
      phone: "+1 (555) 123-4567",
      bio: "Lead system administrator with 10+ years experience",
      processesOwned: 12,
      collaborations: 8
    },
    { 
      id: "2", 
      name: "Jane Smith", 
      email: "jane@company.com", 
      role: "Editor", 
      status: "Active", 
      lastLogin: "1 day ago",
      department: "Operations",
      phone: "+1 (555) 234-5678",
      bio: "Business process analyst specializing in workflow optimization",
      processesOwned: 8,
      collaborations: 15
    },
    { 
      id: "3", 
      name: "Mike Johnson", 
      email: "mike@company.com", 
      role: "Viewer", 
      status: "Inactive", 
      lastLogin: "1 week ago",
      department: "Finance",
      phone: "+1 (555) 345-6789",
      bio: "Financial controller with focus on process compliance",
      processesOwned: 3,
      collaborations: 5
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = (userData: User) => {
    setUsers(prev => [...prev, userData]);
    speakText(`New user ${userData.name} has been added to the system`);
  };

  const handleUpdateUser = (userData: User) => {
    setUsers(prev => prev.map(user => user.id === userData.id ? userData : user));
    speakText(`User ${userData.name} has been updated`);
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    setUsers(prev => prev.filter(user => user.id !== userId));
    if (user) {
      speakText(`User ${user.name} has been removed from the system`);
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowDetailView(true);
    speakText(`Viewing profile for ${user.name}`);
  };

  const stats = [
    { label: "Total Users", value: users.length, icon: <Users className="h-8 w-8 text-blue-500" /> },
    { label: "Active Users", value: users.filter(u => u.status === "Active").length, icon: <Shield className="h-8 w-8 text-green-500" /> },
    { label: "Pending Invites", value: users.filter(u => u.status === "Pending").length, icon: <Mail className="h-8 w-8 text-orange-500" /> }
  ];

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => speakText("User Management Dashboard. Manage user accounts, roles, and permissions for your process modeling platform.")}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage users, roles, and permissions</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <UserManagementActions
            mode="create"
            onSave={handleCreateUser}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {stat.icon}
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    {user.department && (
                      <p className="text-xs text-muted-foreground">{user.department}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{user.role}</Badge>
                  <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                    {user.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    Last login: {user.lastLogin}
                  </p>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewUser(user)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <UserManagementActions
                          mode="edit"
                          user={user}
                          onSave={handleUpdateUser}
                          onDelete={handleDeleteUser}
                        />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <UserDetailView
        user={selectedUser}
        open={showDetailView}
        onClose={() => setShowDetailView(false)}
      />
    </div>
  );
};
