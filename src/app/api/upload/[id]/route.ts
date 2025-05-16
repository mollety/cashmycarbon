import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('user_uploads')
    .select('id, filename, size_bytes, uploaded_at, is_approved, users(full_name,email)')
    .order('uploaded_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PATCH(request: Request) {
  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ error: 'Missing ID param' }, { status: 400 })
  }

  const { approve } = await request.json() as { approve: boolean }

  if (typeof approve !== 'boolean') {
    return NextResponse.json({ error: '"approve" must be a boolean' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('user_uploads')
    .update({ is_approved: approve })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json(data)
}
