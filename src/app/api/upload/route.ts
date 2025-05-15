// /src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient }        from '@supabase/supabase-js'

// initialize a Supabase client **with** the service‐role key:
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const file = form.get('file') as File | null
  const userId = form.get('user_id') as string | null

  if (!file || !userId) {
    return NextResponse.json(
      { error: 'Missing file or user_id' },
      { status: 400 }
    )
  }

  const path = `${userId}/${file.name}`

  // upload → this bypasses any RLS on storage.objects because we're using service_role key
  const { data, error } = await supabase
    .storage
    .from('uploads')
    .upload(path, file.stream(), {
      contentType: file.type,
      metadata: { user_id: userId },
      upsert: false,
    })

  if (error) {
    console.error('Storage upload error:', error)
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json(data, { status: 200 })
}
