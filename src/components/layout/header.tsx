
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Search, Bell, Settings, LogOut, User, Shield, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  pageTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-status-danger/10 text-status-danger border-status-danger/20';
      case 'process-owner': return 'bg-primary/10 text-primary border-primary/20';
      case 'modeler': return 'bg-enterprise-blue-500/10 text-enterprise-blue-700 border-enterprise-blue-500/20';
      case 'analyst': return 'bg-status-success/10 text-status-success border-status-success/20';
      case 'viewer': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <header className="border-b bg-background px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = 'https://skillsim.vercel.app/dashboard'}
            className="flex items-center space-x-2"
          >
            <Home className="h-4 w-4" />
            <span>Master Dashboard</span>
          </Button>
          <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-64 pl-10"
            />
          </div>
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-status-danger rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <Badge variant="outline" className={`text-xs ${getRoleColor(user?.role || '')}`}>
                    {user?.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                    {user?.role}
                  </Badge>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                <p className="text-xs text-muted-foreground">{user?.department}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              {hasRole('admin') && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/user-management" className="flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      User Management
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-status-danger focus:text-status-danger">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
