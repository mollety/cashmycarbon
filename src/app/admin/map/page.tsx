'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import UserMap from '../../components/UserMap';

type User = {
  full_name: string;
  latitude: number;
  longitude: number;
  email: string; // Added email here to match UserMap's expected type
};

export default function AdminMapPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('full_name, latitude, longitude, email'); // Include email in select

      if (error) {
        console.error('Error fetching users:', error);
      } else if (data) {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Map</h1>
      <UserMap users={users} />
    </div>
  );
}
