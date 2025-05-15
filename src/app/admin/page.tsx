'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'; 
import Link from 'next/link';

interface User {
  id: string;
  full_name: string;
  email: string;
  is_verified: boolean;
  system_info?: string;
  proof_file?: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    const sessionName = localStorage.getItem('user_name');
    const isAdmin = localStorage.getItem('is_admin');
    if (!sessionName || isAdmin !== 'true') {
      router.push('/login');
    } else {
      setAdminName(sessionName);
    }

    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email, is_verified');

      if (error) {
        console.error('Error fetching users:', error.message);
        return;
      }
      setUsers(data || []);
    };

    fetchUsers();
  }, [router]);

  const handleVerify = async (id: string, status: boolean) => {
    const { error } = await supabase
      .from('users')
      .update({ is_verified: status })
      .eq('id', id);

    if (error) {
      alert('Update failed: ' + error.message);
    } else {
      setUsers(prev =>
        prev.map(u => (u.id === id ? { ...u, is_verified: status } : u))
      );
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Welcome, {adminName}</h1>
          <Link href="/" className="text-blue-600 underline">Home</Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-4">User Verifications</h2>
      <table className="w-full bg-white rounded shadow overflow-hidden text-sm">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{user.full_name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                {user.is_verified ? '✅ Verified' : '⏳ Pending'}
              </td>
              <td className="px-4 py-2 space-x-2">
                {!user.is_verified && (
                  <button
                    onClick={() => handleVerify(user.id, true)}
                    className="bg-brandGreen text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                )}
                {user.is_verified && (
                  <button
                    onClick={() => handleVerify(user.id, false)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Revoke
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
