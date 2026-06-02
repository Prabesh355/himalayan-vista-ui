import React from 'react';
import { AdminSidebar } from './AdminSidebar';

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden pt-[60px] md:pt-0">
        <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};
