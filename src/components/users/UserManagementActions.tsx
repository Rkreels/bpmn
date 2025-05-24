
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "@/contexts/VoiceContext";
import { UserPlus, Edit, Trash2 } from "lucide-react";

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
}

interface UserActionsProps {
  user?: User;
  onSave: (user: User) => void;
  onDelete?: (userId: string) => void;
  mode: "create" | "edit";
}

export const UserManagementActions: React.FC<UserActionsProps> = ({ 
  user, 
  onSave, 
  onDelete, 
  mode 
}) => {
  const { toast } = useToast();
  const { speakText } = useVoice();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>(
    user || {
      name: "",
      email: "",
      role: "Viewer",
      status: "Active",
      department: "",
      phone: "",
      bio: ""
    }
  );

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Validation Error",
        description: "Name and email are required fields.",
        variant: "destructive"
      });
      return;
    }

    const userData: User = {
      id: user?.id || `user_${Date.now()}`,
      name: formData.name || "",
      email: formData.email || "",
      role: formData.role || "Viewer",
      status: formData.status || "Active",
      lastLogin: user?.lastLogin || "Never",
      department: formData.department,
      phone: formData.phone,
      bio: formData.bio
    };

    onSave(userData);
    setOpen(false);
    
    toast({
      title: mode === "create" ? "User Created" : "User Updated",
      description: `${userData.name} has been ${mode === "create" ? "created" : "updated"} successfully.`
    });

    speakText(`User ${userData.name} has been ${mode === "create" ? "created" : "updated"} successfully`);
  };

  const handleDelete = () => {
    if (user && onDelete) {
      onDelete(user.id);
      setOpen(false);
      toast({
        title: "User Deleted",
        description: `${user.name} has been removed from the system.`,
        variant: "destructive"
      });
      speakText(`User ${user.name} has been deleted`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={mode === "create" ? "default" : "ghost"}
          size={mode === "create" ? "default" : "sm"}
          onMouseEnter={() => speakText(
            mode === "create" 
              ? "Create new user. Add team members to collaborate on process modeling." 
              : "Edit user details. Update roles, permissions, and contact information."
          )}
        >
          {mode === "create" ? (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New User" : `Edit ${user?.name}`}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="user@company.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                  <SelectItem value="Process Owner">Process Owner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                placeholder="e.g., Operations, IT"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio/Notes</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Additional information about the user..."
              rows={3}
            />
          </div>
        </div>
        
        <div className="flex justify-between">
          <div>
            {mode === "edit" && onDelete && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                onMouseEnter={() => speakText("Delete user. This action cannot be undone.")}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete User
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {mode === "create" ? "Create User" : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
