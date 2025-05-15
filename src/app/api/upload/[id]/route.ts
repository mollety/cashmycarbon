import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ← service role must live in env
)

export async function GET() {
  // list with join to users
  const { data, error } = await supabase
    .from('user_uploads')
    .select('id, filename, size_bytes, uploaded_at, is_approved, users(full_name,email)')
    .order('uploaded_at', { ascending: false })

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { approve } = await request.json() as { approve: boolean }
  const { error } = await supabase
    .from('user_uploads')
    .update({ is_approved: approve })
    .eq('id', params.id)

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ success: true })
}
