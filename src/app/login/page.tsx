'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
 
import Link from 'next/link';

export default function CombinedLoginPage() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [userError, setUserError] = useState<string | null>(null);
    const [adminError, setAdminError] = useState<string | null>(null);

    const handleUserLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setUserError(null);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', userEmail)
        .eq('is_admin', false)
        .single();

      if (error || !data || data.password_hash !== userPassword) {
        setUserError('Invalid credentials');
        return;
      }

      localStorage.setItem('user_id', data.id);
      localStorage.setItem('user_name', data.full_name); // ✅ Store full name
      localStorage.setItem('is_admin', 'false');
      router.push('/wallet');
    };

    const handleAdminLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setAdminError(null);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', adminEmail)
        .eq('is_admin', true)
        .single();

      if (error || !data || data.password_hash !== adminPassword) {
        setAdminError('Invalid credentials');
        return;
      }

      localStorage.setItem('user_id', data.id);
      localStorage.setItem('user_name', data.full_name); // ✅ Store full name
      localStorage.setItem('is_admin', 'true');
      router.push('/admin');
    };

    return (
      <div className="min-h-screen flex flex-col items-center gap-6 p-6 bg-gray-50">
        <div className="w-full max-w-6xl flex justify-between items-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <Link href="/" className="text-blue-600 underline">Home</Link>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-start gap-8 w-full max-w-6xl">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-brandGreen">User Login</h2>
            <form onSubmit={handleUserLogin} className="space-y-4">
              <input type="email" placeholder="User Email" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="w-full border px-3 py-2" />
              <input type="password" placeholder="Password" value={userPassword} onChange={e => setUserPassword(e.target.value)} className="w-full border px-3 py-2" />
              {userError && <p className="text-red-600 text-sm">{userError}</p>}
              <button className="w-full bg-brandGreen text-white py-2 rounded font-semibold">Log In as User</button>
            </form>
          </div>

          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-brandBlue">Admin Login</h2>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input type="email" placeholder="Admin Email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} className="w-full border px-3 py-2" />
              <input type="password" placeholder="Password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} className="w-full border px-3 py-2" />
              {adminError && <p className="text-red-600 text-sm">{adminError}</p>}
              <button className="w-full bg-brandBlue text-white py-2 rounded font-semibold">Log In as Admin</button>
            </form>
          </div>
        </div>
      </div>
    );
}