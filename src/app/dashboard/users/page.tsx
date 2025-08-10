'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import UserDataTable, { ColumnDef } from '@/components/iu/UserDataTable';
import { userService } from '@/services/userService';
import { User } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 20;
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const router = useRouter();

  const loadPage = useCallback(async (targetPage: number) => {
    try {
      setIsLoading(true);
      const res = await userService.getUsers({ page: targetPage, page_size: PAGE_SIZE, search });
      setUsers((prev) => (targetPage === 1 ? res.results : [...prev, ...res.results]));
      setHasMore(Boolean(res.next));
    } finally {
      setIsLoading(false);
    }
  }, [PAGE_SIZE, search]);

  // Reset when search changes
  useEffect(() => {
    setUsers([]);
    setHasMore(true);
    setPage(1);
  }, [search]);

  // Load current page
  useEffect(() => {
    loadPage(page);
  }, [page, loadPage]);

  // Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return;
    const node = loaderRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !isLoading) {
          setPage((p) => p + 1);
        }
      },
      { root: null, rootMargin: '600px', threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  const handleEdit = useCallback((u: User) => {
    router.push(`/dashboard/users/${u.user_id}/edit`);
  }, [router]);

  const handleDelete = useCallback(async (u: User) => {
    const ok = window.confirm(`¿Eliminar al usuario ${u.username}?`);
    if (!ok) return;
    try {
      setDeletingId(u.user_id);
      await userService.deleteUser(u.user_id);
      setUsers((prev) => prev.filter((x) => x.user_id !== u.user_id));
    } finally {
      setDeletingId(null);
    }
  }, []);

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      { key: 'username', header: 'User' },
      { key: 'first_name', header: 'First Name' },
      { key: 'last_name', header: 'Last Name' },
      { key: 'email', header: 'Email' },
      {
        key: 'created_at',
        header: 'Created Date',
        accessor: (u) => new Date(u.created_at).toLocaleDateString(),
      },
      {
        key: 'actions',
        header: 'Actions',
        accessor: (u) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEdit(u)}
              className="px-2 py-1 text-xs rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(u)}
              disabled={deletingId === u.user_id}
              className="px-2 py-1 text-xs rounded-md border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              {deletingId === u.user_id ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        ),
        className: 'w-40',
      },
    ],
    [deletingId, handleDelete, handleEdit]
  );

  return (
    <div className="space-y-3">
      <UserDataTable<User>
        data={users}
        columns={columns}
        selectable
        getRowId={(u) => String(u.user_id)}
        onSearchChange={setSearch}
        leftActions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white text-sm px-3 py-1.5 hover:bg-indigo-700">
            + Add User
          </button>
        }
        renderProfile={(u) => ({
          avatarUrl: '/AvatarDefault.svg',
          title: u.username,
          subtitle: u.email,
          alt: `${u.username} avatar`,
        })}
      />
      <div ref={loaderRef} />
      {isLoading && <div className="text-sm text-gray-500">Loading...</div>}
    </div>
  );
}

