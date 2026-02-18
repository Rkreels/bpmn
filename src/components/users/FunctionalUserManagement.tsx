import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types/modules";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useUsersData } from "@/hooks/useUsersData";
import { Search, Shield, Eye, Edit, Trash2, UserPlus, CheckCircle, XCircle } from "lucide-react";

interface Role {
  id: string; name: string; description: string; permissions: string[]; userCount: number;
}

const demoRoles: Role[] = [
  { id: 'r1', name: 'Administrator', description: 'Full system access and user management', permissions: ['all'], userCount: 2 },
  { id: 'r2', name: 'Process Manager', description: 'Manage processes and workflows', permissions: ['create_process', 'edit_process', 'view_analytics'], userCount: 5 },
  { id: 'r3', name: 'Analyst', description: 'View and analyze process data', permissions: ['view_process', 'view_analytics', 'export_data'], userCount: 8 },
  { id: 'r4', name: 'Viewer', description: 'Read-only access to processes', permissions: ['view_process'], userCount: 12 },
];

export function FunctionalUserManagement() {
  const usersData = useUsersData();
  const [roles, setRoles] = useState<Role[]>(demoRoles);
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isViewUserOpen, setIsViewUserOpen] = useState(false);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [userForm, setUserForm] = useState({ firstName: '', lastName: '', email: '', role: 'viewer' as User['role'], department: '', isActive: true });
  const [roleForm, setRoleForm] = useState({ name: '', description: '', permissions: [] as string[] });
  const { toast } = useToast();

  const handleCreateUser = () => {
    if (!userForm.firstName || !userForm.email) { toast({ title: 'Required', description: 'Name and email are required', variant: 'destructive' }); return; }
    usersData.create({
      name: `${userForm.firstName} ${userForm.lastName}`, description: '', email: userForm.email, firstName: userForm.firstName, lastName: userForm.lastName,
      role: userForm.role, department: userForm.department, permissions: ['view_process'], lastLogin: new Date().toISOString(),
      isActive: userForm.isActive, status: 'active' as const, createdBy: 'System Admin'
    });
    setIsCreateUserOpen(false);
    resetUserForm();
    toast({ title: 'User Created', description: `${userForm.firstName} ${userForm.lastName} created successfully` });
  };

  const handleEditUser = (userId: string) => {
    const user = usersData.items.find(u => u.id === userId);
    if (!user) return;
    setSelectedUserId(userId);
    setUserForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, department: user.department, isActive: user.isActive });
    setIsEditUserOpen(true);
  };

  const handleUpdateUser = () => {
    if (!selectedUserId) return;
    usersData.update(selectedUserId, { firstName: userForm.firstName, lastName: userForm.lastName, name: `${userForm.firstName} ${userForm.lastName}`, email: userForm.email, role: userForm.role, department: userForm.department, isActive: userForm.isActive });
    setIsEditUserOpen(false);
    setSelectedUserId(null);
    resetUserForm();
    toast({ title: 'User Updated', description: 'User updated successfully' });
  };

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    setIsViewUserOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    const user = usersData.items.find(u => u.id === userId);
    usersData.remove(userId);
    toast({ title: 'User Deleted', description: `${user?.firstName} ${user?.lastName} deleted` });
  };

  const handleToggleUserStatus = (userId: string) => {
    const user = usersData.items.find(u => u.id === userId);
    if (user) {
      usersData.update(userId, { isActive: !user.isActive });
      toast({ title: 'Status Updated', description: `${user.firstName} is now ${!user.isActive ? 'active' : 'inactive'}` });
    }
  };

  const handleCreateRole = () => {
    if (!roleForm.name) { toast({ title: 'Required', description: 'Role name is required', variant: 'destructive' }); return; }
    setRoles(prev => [...prev, { id: `r${Date.now()}`, ...roleForm, userCount: 0 }]);
    setIsCreateRoleOpen(false);
    setRoleForm({ name: '', description: '', permissions: [] });
    toast({ title: 'Role Created', description: `${roleForm.name} created` });
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setRoleForm({ name: role.name, description: role.description, permissions: [...role.permissions] });
    setIsEditRoleOpen(true);
  };

  const handleUpdateRole = () => {
    if (!selectedRole) return;
    setRoles(prev => prev.map(r => r.id === selectedRole.id ? { ...r, ...roleForm } : r));
    setIsEditRoleOpen(false);
    setSelectedRole(null);
    toast({ title: 'Role Updated', description: 'Role updated successfully' });
  };

  const handleDeleteRole = (roleId: string) => {
    if (!confirm('Delete this role?')) return;
    setRoles(prev => prev.filter(r => r.id !== roleId));
    toast({ title: 'Role Deleted', description: 'Role deleted' });
  };

  const resetUserForm = () => setUserForm({ firstName: '', lastName: '', email: '', role: 'viewer' as User['role'], department: '', isActive: true });

  const filteredUsers = usersData.items.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role: string) => ({ admin: 'bg-purple-100 text-purple-800', manager: 'bg-blue-100 text-blue-800', analyst: 'bg-orange-100 text-orange-800' }[role] || 'bg-gray-100 text-gray-800');
  const viewedUser = usersData.items.find(u => u.id === selectedUserId);

  const allPermissions = ['view_process', 'create_process', 'edit_process', 'delete_process', 'view_analytics', 'export_data', 'manage_users', 'manage_roles', 'approve_process', 'all'];

  const UserFormDialog = ({ open, onOpenChange, onSubmit, title, label }: { open: boolean; onOpenChange: (v: boolean) => void; onSubmit: () => void; title: string; label: string }) => (
    <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-w-lg">
      <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4"><div><Label>First Name *</Label><Input value={userForm.firstName} onChange={e => setUserForm(p => ({ ...p, firstName: e.target.value }))} /></div><div><Label>Last Name</Label><Input value={userForm.lastName} onChange={e => setUserForm(p => ({ ...p, lastName: e.target.value }))} /></div></div>
        <div><Label>Email *</Label><Input type="email" value={userForm.email} onChange={e => setUserForm(p => ({ ...p, email: e.target.value }))} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Role</Label><Select value={userForm.role} onValueChange={v => setUserForm(p => ({ ...p, role: v as any }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="admin">Admin</SelectItem><SelectItem value="manager">Manager</SelectItem><SelectItem value="analyst">Analyst</SelectItem><SelectItem value="viewer">Viewer</SelectItem></SelectContent></Select></div>
          <div><Label>Department</Label><Input value={userForm.department} onChange={e => setUserForm(p => ({ ...p, department: e.target.value }))} /></div>
        </div>
        <div className="flex items-center justify-between"><Label>Active</Label><Switch checked={userForm.isActive} onCheckedChange={v => setUserForm(p => ({ ...p, isActive: v }))} /></div>
        <div className="flex justify-end gap-2"><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={onSubmit}>{label}</Button></div>
      </div>
    </DialogContent></Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl sm:text-3xl font-bold">User Management</h1><p className="text-muted-foreground">Manage users, roles, and permissions</p></div>
        <Button onClick={() => { resetUserForm(); setIsCreateUserOpen(true); }}><UserPlus className="h-4 w-4 mr-2" />Add User</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{usersData.items.length}</div><div className="text-sm text-muted-foreground">Total Users</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{usersData.items.filter(u => u.isActive).length}</div><div className="text-sm text-muted-foreground">Active</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{roles.length}</div><div className="text-sm text-muted-foreground">Roles</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{new Set(usersData.items.map(u => u.department)).size}</div><div className="text-sm text-muted-foreground">Departments</div></CardContent></Card>
      </div>

      <div className="relative max-w-sm"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search users..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-8" /></div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4"><TabsTrigger value="users">Users</TabsTrigger><TabsTrigger value="roles">Roles</TabsTrigger><TabsTrigger value="permissions">Permissions</TabsTrigger><TabsTrigger value="settings">Settings</TabsTrigger></TabsList>

        <TabsContent value="users">
          <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-muted/50 border-b"><tr><th className="text-left p-4 font-medium">User</th><th className="text-left p-4 font-medium">Role</th><th className="text-left p-4 font-medium hidden md:table-cell">Department</th><th className="text-left p-4 font-medium">Status</th><th className="text-left p-4 font-medium hidden lg:table-cell">Last Login</th><th className="text-center p-4 font-medium">Actions</th></tr></thead>
            <tbody className="divide-y">{filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-muted/50">
                <td className="p-4"><div className="flex items-center gap-3"><Avatar><AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback></Avatar><div><div className="font-medium">{user.firstName} {user.lastName}</div><div className="text-sm text-muted-foreground">{user.email}</div></div></div></td>
                <td className="p-4"><Badge className={getRoleColor(user.role)}>{user.role}</Badge></td>
                <td className="p-4 hidden md:table-cell">{user.department}</td>
                <td className="p-4"><Badge className={user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>{user.isActive ? <><CheckCircle className="h-3 w-3 mr-1" />Active</> : <><XCircle className="h-3 w-3 mr-1" />Inactive</>}</Badge></td>
                <td className="p-4 hidden lg:table-cell text-sm">{new Date(user.lastLogin).toLocaleDateString()}</td>
                <td className="p-4"><div className="flex justify-center gap-1">
                  <Button size="sm" variant="ghost" onClick={() => handleViewUser(user.id)} title="View"><Eye className="h-3 w-3" /></Button>
                  <Button size="sm" variant="ghost" onClick={() => handleEditUser(user.id)} title="Edit"><Edit className="h-3 w-3" /></Button>
                  <Button size="sm" variant="ghost" onClick={() => handleToggleUserStatus(user.id)} title="Toggle Status">{user.isActive ? <XCircle className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}</Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteUser(user.id)} title="Delete"><Trash2 className="h-3 w-3" /></Button>
                </div></td>
              </tr>
            ))}</tbody></table></div></CardContent></Card>
        </TabsContent>

        <TabsContent value="roles">
          <div className="flex justify-end mb-4"><Button onClick={() => { setRoleForm({ name: '', description: '', permissions: [] }); setIsCreateRoleOpen(true); }}><Shield className="h-4 w-4 mr-2" />Create Role</Button></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map(role => (
              <Card key={role.id} className="hover:shadow-md transition-shadow">
                <CardHeader><div className="flex items-center justify-between"><CardTitle className="text-lg flex items-center gap-2"><Shield className="h-5 w-5" />{role.name}</CardTitle><Badge variant="outline">{role.userCount} users</Badge></div><CardDescription>{role.description}</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                  <div><div className="font-medium text-sm text-muted-foreground mb-2">Permissions</div>{role.permissions.slice(0, 3).map((p, i) => <div key={i} className="text-sm flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-500" />{p.replace(/_/g, ' ')}</div>)}{role.permissions.length > 3 && <div className="text-sm text-muted-foreground">+{role.permissions.length - 3} more</div>}</div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditRole(role)}><Edit className="h-3 w-3 mr-1" />Edit</Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteRole(role.id)}><Trash2 className="h-3 w-3 mr-1" />Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <Card><CardHeader><CardTitle>Permission Matrix</CardTitle><CardDescription>Role-based permissions</CardDescription></CardHeader>
            <CardContent><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-muted/50 border-b"><tr><th className="text-left p-3 font-medium">Permission</th>{roles.map(r => <th key={r.id} className="text-center p-3 font-medium">{r.name}</th>)}</tr></thead>
              <tbody className="divide-y">{['User Management', 'Create Process', 'Edit Process', 'Delete Process', 'View Analytics', 'Export Data', 'Approve Process'].map(perm => (
                <tr key={perm}><td className="p-3 font-medium">{perm}</td>{roles.map(r => <td key={r.id} className="p-3 text-center">{r.permissions.includes('all') || r.permissions.includes(perm.toLowerCase().replace(/ /g, '_')) ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-red-500 mx-auto" />}</td>)}</tr>
              ))}</tbody></table></div></CardContent></Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card><CardHeader><CardTitle>Security Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg"><div className="font-medium">Password Policy</div><div className="text-sm text-muted-foreground">Min 8 chars, mixed case, numbers</div></div>
                <div className="p-4 border rounded-lg"><div className="font-medium">Session Timeout</div><div className="text-sm text-muted-foreground">30 minutes of inactivity</div></div>
                <div className="p-4 border rounded-lg"><div className="font-medium">IP Restrictions</div><div className="text-sm text-muted-foreground">Allow from specific IP ranges</div></div>
                <div className="p-4 border rounded-lg"><div className="font-medium">Multi-Factor Auth</div><div className="text-sm text-muted-foreground">Required for admin accounts</div></div>
              </div>
            </CardContent></Card>
        </TabsContent>
      </Tabs>

      {/* View User Dialog */}
      <Dialog open={isViewUserOpen} onOpenChange={setIsViewUserOpen}><DialogContent>
        <DialogHeader><DialogTitle>User Details</DialogTitle></DialogHeader>
        {viewedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4"><Avatar className="h-16 w-16"><AvatarFallback className="text-lg">{viewedUser.firstName.charAt(0)}{viewedUser.lastName.charAt(0)}</AvatarFallback></Avatar><div><h3 className="text-xl font-bold">{viewedUser.firstName} {viewedUser.lastName}</h3><p className="text-muted-foreground">{viewedUser.email}</p></div></div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Role:</span> <Badge className={getRoleColor(viewedUser.role)}>{viewedUser.role}</Badge></div>
              <div><span className="font-medium">Department:</span> {viewedUser.department}</div>
              <div><span className="font-medium">Status:</span> <Badge className={viewedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>{viewedUser.isActive ? 'Active' : 'Inactive'}</Badge></div>
              <div><span className="font-medium">Last Login:</span> {new Date(viewedUser.lastLogin).toLocaleString()}</div>
            </div>
            <div className="flex gap-2"><Button onClick={() => { setIsViewUserOpen(false); handleEditUser(viewedUser.id); }}><Edit className="h-4 w-4 mr-2" />Edit User</Button><Button variant="outline" onClick={() => handleToggleUserStatus(viewedUser.id)}>{viewedUser.isActive ? 'Deactivate' : 'Activate'}</Button></div>
          </div>
        )}
      </DialogContent></Dialog>

      <UserFormDialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen} onSubmit={handleCreateUser} title="Create New User" label="Create User" />
      <UserFormDialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen} onSubmit={handleUpdateUser} title="Edit User" label="Update User" />

      {/* Create/Edit Role Dialogs */}
      {[{ open: isCreateRoleOpen, setOpen: setIsCreateRoleOpen, onSubmit: handleCreateRole, title: 'Create Role', label: 'Create' },
        { open: isEditRoleOpen, setOpen: setIsEditRoleOpen, onSubmit: handleUpdateRole, title: 'Edit Role', label: 'Update' }
      ].map((dlg, i) => (
        <Dialog key={i} open={dlg.open} onOpenChange={dlg.setOpen}><DialogContent>
          <DialogHeader><DialogTitle>{dlg.title}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Role Name *</Label><Input value={roleForm.name} onChange={e => setRoleForm(p => ({ ...p, name: e.target.value }))} /></div>
            <div><Label>Description</Label><Textarea value={roleForm.description} onChange={e => setRoleForm(p => ({ ...p, description: e.target.value }))} /></div>
            <div><Label>Permissions</Label><div className="grid grid-cols-2 gap-2 mt-2">{allPermissions.map(p => (
              <label key={p} className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={roleForm.permissions.includes(p)} onChange={e => setRoleForm(prev => ({ ...prev, permissions: e.target.checked ? [...prev.permissions, p] : prev.permissions.filter(x => x !== p) }))} />{p.replace(/_/g, ' ')}</label>
            ))}</div></div>
            <div className="flex justify-end gap-2"><Button variant="outline" onClick={() => dlg.setOpen(false)}>Cancel</Button><Button onClick={dlg.onSubmit}>{dlg.label}</Button></div>
          </div>
        </DialogContent></Dialog>
      ))}
    </div>
  );
}
