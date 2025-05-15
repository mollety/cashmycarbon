'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Upload = {
  id: string;
  filename: string;
  size_bytes: number;
  uploaded_at: string;
  user_id: string;  // Add this field to your type
};

export default function MyUploadsPage() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        setLoading(false);
        return;
      }
      supabase
        .from('user_uploads')
        .select('*')
        .eq('user_id', user.id)
        .order('uploaded_at', { ascending: false })
        .then(({ data, error }) => {
          if (error) console.error(error);
          else setUploads(data || []);
          setLoading(false);
        });
    });
  }, []);

  if (loading) return <p className="p-6">Loading…</p>;
  if (uploads.length === 0)
    return <p className="p-6">No uploads yet.</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">My Uploads</h1>
      <ul className="space-y-2">
        {uploads.map((u) => {
          // Accessing the publicUrl correctly
          const { data } = supabase
            .storage
            .from('uploads')
            .getPublicUrl(`${u.user_id}/${u.filename}`);

          // Ensure data is available before accessing publicUrl
          const publicUrl = data?.publicUrl;

          return (
            <li key={u.id} className="border p-3 rounded">
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                {u.filename}
              </a>
              <div className="text-xs text-gray-500">
                {(u.size_bytes / 1024).toFixed(1)} KB —{' '}
                {new Date(u.uploaded_at).toLocaleString()}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
