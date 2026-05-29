import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DataTable } from './DataTable';
import { Mail, Shield, UserCog, UserX } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'Suspended' },
];

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { 
      key: 'role', 
      header: 'Role',
      render: (item: any) => (
        <span className={`flex items-center gap-1.5 ${item.role === 'Admin' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
          {item.role === 'Admin' ? <Shield className="w-4 h-4" /> : <UserCog className="w-4 h-4" />}
          {item.role}
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
        }`}>
          {item.status}
        </span>
      )
    },
  ];

  const actions = (item: any) => (
    <div className="flex justify-end gap-2 text-muted-foreground">
      <button className="p-1 hover:text-primary transition-colors" title="Email User"><Mail className="w-4 h-4" /></button>
      <button 
        onClick={() => setSelectedUser(item)}
        className="p-1 hover:text-primary transition-colors" 
        title="Edit User"
      >
        <UserCog className="w-4 h-4" />
      </button>
      <button className="p-1 hover:text-rose-500 transition-colors" title="Suspend"><UserX className="w-4 h-4" /></button>
    </div>
  );

  const filteredData = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage user accounts and roles.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DataTable
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item.id}
          onSearch={setSearchTerm}
          searchPlaceholder="Search users by name or email..."
          actions={actions}
        />
      </motion.div>

      {/* Edit User Modal */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User Role</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <p className="text-sm font-medium">User</p>
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <p className="font-semibold">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Role</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="user" selected={selectedUser.role === 'User'}>User</option>
                  <option value="admin" selected={selectedUser.role === 'Admin'}>Admin</option>
                </select>
              </div>
              <button 
                onClick={() => setSelectedUser(null)}
                className="mt-4 bg-primary text-primary-foreground h-10 rounded-md font-medium"
              >
                Update Role
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
