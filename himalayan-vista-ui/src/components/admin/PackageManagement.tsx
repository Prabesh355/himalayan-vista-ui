import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DataTable } from './DataTable';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Mock Data
const mockPackages = [
  { id: '1', title: 'Everest Base Camp Trek', duration: '14 Days', price: '$1200', status: 'Active' },
  { id: '2', title: 'Annapurna Circuit', duration: '16 Days', price: '$1400', status: 'Active' },
  { id: '3', title: 'Langtang Valley Trek', duration: '10 Days', price: '$900', status: 'Draft' },
];

export const PackageManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { key: 'title', header: 'Package Title' },
    { key: 'duration', header: 'Duration' },
    { key: 'price', header: 'Price' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
        }`}>
          {item.status}
        </span>
      )
    },
  ];

  const actions = (item: any) => (
    <div className="flex justify-end gap-2 text-muted-foreground">
      <button className="p-1 hover:text-primary transition-colors"><Edit className="w-4 h-4" /></button>
      <button className="p-1 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
    </div>
  );

  const filteredData = mockPackages.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Packages</h1>
          <p className="text-muted-foreground">Manage your travel and trekking packages.</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" />
              Add Package
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Package</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Title</label>
                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Everest Base Camp" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Duration</label>
                  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. 14 Days" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Price ($)</label>
                  <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="1200" />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Status</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                </select>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-primary text-primary-foreground h-10 rounded-md font-medium"
              >
                Save Package
              </button>
            </div>
          </DialogContent>
        </Dialog>
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
          searchPlaceholder="Search packages..."
          actions={actions}
        />
      </motion.div>
    </div>
  );
};
