// src/app/signup/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [err, setErr]           = useState<string|null>(null)
  const [loading, setLoading]   = useState(false)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    setLoading(true)

    // 1️⃣ sign up in Auth
    const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
      email, password
    })
    if (signUpErr) {
      setErr(signUpErr.message)
      setLoading(false)
      return
    }

    // 2️⃣ sign them in to get a session
    const { error: signInErr } = await supabase.auth.signInWithPassword({
      email, password
    })
    if (signInErr) {
      setErr(signInErr.message)
      setLoading(false)
      return
    }

    // 3️⃣ insert into your users table (all non-null cols)
    const userId = signUpData.user?.id!
    const { error: profileErr } = await supabase
      .from('users')
      .insert({
        id:            userId,
        full_name:     fullName,
        email,
        password_hash: password,    // ⚠️ swap for real hashing later
        latitude:      null,
        longitude:     null,
        is_verified:   false
      })
    if (profileErr) {
      setErr('Failed to save profile: ' + profileErr.message)
      setLoading(false)
      return
    }

    // 4️⃣ go to upload step
    router.push('/signup/upload')
  }

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
  )
}
