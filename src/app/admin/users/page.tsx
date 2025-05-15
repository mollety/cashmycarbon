'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type User = {
  id: string;
  full_name: string;
  email: string;
  is_verified: boolean;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    supabase
      .from('users')
      .select('id, full_name, email, is_verified')
      .then(({ data }) => { if (data) setUsers(data) });
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">All Users</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Verified</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="border px-2 py-1">{u.full_name}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">
                {u.is_verified ? '✅' : '❌'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
