import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DataTable } from './DataTable';
import { Edit, Trash2, Plus } from 'lucide-react';

const mockBlogs = [
  { id: '1', title: 'Top 10 Treks in Nepal for 2026', author: 'Admin', date: '2026-05-20', status: 'Published' },
  { id: '2', title: 'Preparing for Everest Base Camp', author: 'Guide Pemba', date: '2026-05-25', status: 'Draft' },
];

export const BlogManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { key: 'title', header: 'Post Title' },
    { key: 'author', header: 'Author' },
    { key: 'date', header: 'Date' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
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

  const filteredData = mockBlogs.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
          <p className="text-muted-foreground">Manage your blog posts and articles.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DataTable
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item.id}
          onSearch={setSearchTerm}
          searchPlaceholder="Search blogs..."
          actions={actions}
        />
      </motion.div>
    </div>
  );
};
