
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useVoice } from "@/contexts/VoiceContext";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  Shield,
  Activity,
  Clock
} from "lucide-react";

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
  createdAt?: string;
  processesOwned?: number;
  collaborations?: number;
}

interface UserDetailViewProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

export const UserDetailView: React.FC<UserDetailViewProps> = ({ 
  user, 
  open, 
  onClose 
}) => {
  const { speakText } = useVoice();

  if (!user) return null;

  const userStats = [
    { label: "Processes Owned", value: user.processesOwned || 0, icon: <Activity className="h-4 w-4" /> },
    { label: "Active Collaborations", value: user.collaborations || 0, icon: <User className="h-4 w-4" /> },
    { label: "Account Created", value: user.createdAt || "2024-01-15", icon: <Calendar className="h-4 w-4" /> }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto"
        onMouseEnter={() => speakText(`User profile for ${user.name}. View detailed information about team member roles, permissions, and activity.`)}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Role */}
          <div className="flex items-center gap-4">
            <Badge 
              variant={user.status === "Active" ? "default" : user.status === "Pending" ? "secondary" : "outline"}
              className="text-sm"
            >
              {user.status}
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Shield className="h-3 w-3 mr-1" />
              {user.role}
            </Badge>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              
              {user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
                  </div>
                </div>
              )}
              
              {user.department && (
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-sm text-muted-foreground">{user.department}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Last Login</p>
                  <p className="text-sm text-muted-foreground">{user.lastLogin}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* User Statistics */}
          <div className="space-y-4">
            <h3 className="font-medium">Activity Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  {stat.icon}
                  <div>
                    <p className="text-sm font-medium">{stat.label}</p>
                    <p className="text-lg font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bio/Notes */}
          {user.bio && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Notes</h3>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
              </div>
            </>
          )}

          {/* Permissions */}
          <Separator />
          <div className="space-y-4">
            <h3 className="font-medium">Permissions & Access</h3>
            <div className="grid grid-cols-2 gap-2">
              {["Process Modeling", "Repository Access", "Analytics View", "User Management"].map((permission, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    user.role === "Admin" ? "bg-green-500" : 
                    user.role === "Editor" ? "bg-yellow-500" : 
                    "bg-gray-300"
                  }`} />
                  <span className="text-sm">{permission}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
