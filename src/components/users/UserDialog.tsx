
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";

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

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  user?: User;
  onSave: (user: User) => void;
  onDelete?: () => void;
}

export const UserDialog: React.FC<UserDialogProps> = ({
  open,
  onOpenChange,
  mode,
  user,
  onSave,
  onDelete
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Viewer",
    status: "Active",
    department: "",
    phone: "",
    bio: ""
  });

  useEffect(() => {
    if (mode === "edit" && user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        department: user.department || "",
        phone: user.phone || "",
        bio: user.bio || ""
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "Viewer",
        status: "Active",
        department: "",
        phone: "",
        bio: ""
      });
    }
  }, [mode, user, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData: User = {
      id: mode === "edit" && user ? user.id : Date.now().toString(),
      ...formData,
      lastLogin: mode === "edit" && user ? user.lastLogin : "Never",
      processesOwned: mode === "edit" && user ? user.processesOwned : 0,
      collaborations: mode === "edit" && user ? user.collaborations : 0
    };

    onSave(userData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New User" : "Edit User"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex justify-between pt-4">
            <div>
              {mode === "edit" && onDelete && (
                <Button type="button" variant="destructive" onClick={onDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {mode === "create" ? "Create User" : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
