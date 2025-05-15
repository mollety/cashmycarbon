'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import UserMap from '@/components/UserMap';

export default function AdminMapPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('full_name, latitude, longitude');
      if (data) setUsers(data);
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
