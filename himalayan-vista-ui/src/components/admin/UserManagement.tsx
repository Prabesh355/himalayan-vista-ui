import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { DataTable } from './DataTable';
import { Mail, Shield, UserCog, UserX } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { adminService, AdminUser } from '@/services/adminService';

export const UserManagement = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [role, setRole] = useState('user');

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => adminService.getUsers(),
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, nextRole }: { userId: string; nextRole: string }) =>
      adminService.updateUserRole(userId, nextRole),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setSelectedUser(null);
    },
  });

  const users = data?.users || [];

  const filteredData = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      const term = searchTerm.toLowerCase();
      return fullName.includes(term) || email.includes(term) || user.role.toLowerCase().includes(term);
    });
  }, [searchTerm, users]);

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (item: AdminUser) => `${item.firstName} ${item.lastName}`,
    },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Role',
      render: (item: AdminUser) => (
        <span className={`flex items-center gap-1.5 ${item.role === 'admin' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
          {item.role === 'admin' ? <Shield className="w-4 h-4" /> : <UserCog className="w-4 h-4" />}
          {item.role}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: AdminUser) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.isActive === false ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
          {item.isActive === false ? 'Suspended' : 'Active'}
        </span>
      ),
    },
  ];

  const actions = (item: AdminUser) => (
    <div className="flex justify-end gap-2 text-muted-foreground">
      <button className="p-1 hover:text-primary transition-colors" title="Email User">
        <Mail className="w-4 h-4" />
      </button>
      <button
        onClick={() => {
          setSelectedUser(item);
          setRole(item.role || 'user');
        }}
        className="p-1 hover:text-primary transition-colors"
        title="Edit User"
      >
        <UserCog className="w-4 h-4" />
      </button>
      <button className="p-1 hover:text-rose-500 transition-colors" title="Status">
        <UserX className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage user accounts and roles.</p>
      </div>

      {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-700">Unable to load users: {error instanceof Error ? error.message : 'Please try again.'}</div>}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DataTable
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item._id || item.id || item.email}
          onSearch={setSearchTerm}
          searchPlaceholder="Search users by name, email, or role..."
          actions={actions}
          isLoading={isLoading}
        />
      </motion.div>

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
                  <p className="font-semibold">{selectedUser.firstName} {selectedUser.lastName}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>
              <button
                onClick={() => updateRoleMutation.mutate({ userId: selectedUser._id || selectedUser.id || '', nextRole: role })}
                className="mt-4 bg-primary text-primary-foreground h-10 rounded-md font-medium disabled:opacity-50"
                disabled={updateRoleMutation.isPending}
              >
                {updateRoleMutation.isPending ? 'Updating…' : 'Update Role'}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
