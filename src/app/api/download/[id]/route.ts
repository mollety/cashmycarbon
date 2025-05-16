import { NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const svc: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface UploadRow {
  filename: string;
  user_id: string;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'Missing id param' }, { status: 400 });
  }

  const { data: upload, error: fetchErr } = await svc
    .from('user_uploads')
    .select('filename,user_id')
    .eq('id', id)
    .single<UploadRow>();

  if (fetchErr || !upload) {
    return NextResponse.json(
      { error: fetchErr?.message || 'Upload not found' },
      { status: 404 }
    );
  }

  const { data: urlData, error: urlErr } = await svc.storage
    .from('uploads')
    .createSignedUrl(`${upload.user_id}/${upload.filename}`, 60);

  if (urlErr || !urlData) {
    return NextResponse.json(
      { error: urlErr?.message || 'Failed to generate signed URL' },
      { status: 500 }
    );
  }

  return NextResponse.redirect(urlData.signedUrl);
}
