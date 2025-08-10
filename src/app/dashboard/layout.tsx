'use client';

import React, { useState } from 'react';
import SidebarMenu from '@/components/SidebarMenu';
import NavBar from '@/components/iu/NavBar';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SidebarMenu />
      <div className="p-4 sm:ml-64 min-h-screen">
        <div className="w-full flex flex-col min-h-[calc(100vh-2rem)]">
          <NavBar
            className="mb-4"
            user={{
              name: user ? `${user.first_name} ${user.last_name}`.trim() || user.username : 'Guest',
              email: user?.email || 'No name',
              avatarUrl: '/AvatarDefault.svg',
              badgeLabel: 'Basic',
            }}
            searchValue={search}
            onSearchChange={setSearch}
          />
          <main className="mt-4 flex-1 w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}

