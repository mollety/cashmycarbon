// src/app/api/download/[id]/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const svc = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { data: upload, error: fetchErr } = await svc
    .from('user_uploads')
    .select('filename,user_id')
    .eq('id', params.id)
    .single()

  if (fetchErr || !upload) {
    return NextResponse.json({ error: fetchErr?.message }, { status: 404 })
  }

  const { data: urlData, error: urlErr } = await svc
    .storage
    .from('uploads')
    .createSignedUrl(
      `${upload.user_id}/${upload.filename}`,
      60
    )

  if (urlErr || !urlData) {
    return NextResponse.json({ error: urlErr?.message }, { status: 500 })
  }

  return NextResponse.redirect(urlData.signedUrl)
}
