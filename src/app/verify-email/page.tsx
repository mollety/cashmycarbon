'use client';

import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const { data, error: userError } = await supabase.auth.getUser();

      if (userError || !data?.user?.email) {
        throw new Error('User is not logged in or email is missing.');
      }

      const res = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.user.email }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Failed to resend email');

      setMessage('Verification email resent. Please check your inbox.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <Image
        src="/file.svg"
        alt="Envelope"
        width={64}
        height={64}
        className="mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
      <p className="text-gray-600 mb-4">
        We&#39;ve sent a confirmation link to your email.
      </p>

      <button
        onClick={handleResend}
        disabled={loading}
        className="bg-brandBlue text-white px-4 py-2 rounded"
      >
        {loading ? 'Sending…' : 'Resend Email'}
      </button>

      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      <p className="text-sm text-gray-500 mt-4">
        Check your spam folder if you don&#39;t see it.
      </p>
      <a href="/login" className="text-brandBlue mt-4 underline text-sm">
        Back to Login
      </a>
    </div>
  );
}
