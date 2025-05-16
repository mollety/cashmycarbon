import { createClient } from '@supabase/supabase-js'

// you probably already have these in env-vars
const supabaseUrl = 'https://tcjrcieasqixejxvueau.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjanJjaWVhc3FpeGVqeHZ1ZWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzEzMzMsImV4cCI6MjA2MTYwNzMzM30.SUkE2DL7Lfpr6DrgkqLZbbCsS5JFtLwJmrid2BeZOHM';

// reuse the same client you use elsewhere
export const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Uploads a proof file into the "uploads" bucket under a folder
 * named after the current user's ID, and tags it with metadata.user_id.
 */
export async function uploadProof(file: File) {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
  
    if (authError || !user) {
      throw new Error('Not authenticated')
    }
  
    // e.g. "user-uuid/yourphoto.jpg"
    const path = `${user.id}/${file.name}`
  
    const { data, error } = await supabase
      .storage
      .from('uploads')
      .upload(path, file, {
        metadata: { user_id: user.id },
        upsert: false
      })
  
    if (error) throw error
    return data
  }
  