'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [err, setErr]           = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!fullName.trim()) {
      setErr('Full name is required');
      return;
    }
    if (!email.includes('@')) {
      setErr('Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      setErr('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    // 1️⃣ Sign up in Auth
    const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpErr) {
      setErr(signUpErr.message);
      setLoading(false);
      return;
    }

    // Check if user object exists
    const userId = signUpData.user?.id;
    if (!userId) {
      setErr('User ID not returned from sign up');
      setLoading(false);
      return;
    }

    // 2️⃣ Sign in user
    const { error: signInErr } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInErr) {
      setErr(signInErr.message);
      setLoading(false);
      return;
    }

    // 3️⃣ Insert profile (without password)
    const { error: profileErr } = await supabase.from('users').insert({
      id:          userId,
      full_name:   fullName,
      email,
      latitude:    null,
      longitude:   null,
      is_verified: false,
    });

    if (profileErr) {
      setErr('Failed to save profile: ' + profileErr.message);
      setLoading(false);
      return;
    }

    setLoading(false);

    // 4️⃣ Go to upload step
    router.push('/signup/upload');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        {err && <p className="text-red-600">{err}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brandBlue text-white py-2 rounded font-semibold hover:bg-blue-600"
        >
          {loading ? 'Working…' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
