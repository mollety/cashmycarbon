'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const mapRef = useRef<HTMLDivElement | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)

  // Redirect back if no session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/signup')
    })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !coords) {
      return alert('Pick a file and click on the map to select your location.')
    }
    setLoading(true)

    // fetch current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('No session, please log in again.')
      return router.replace('/signup')
    }

    // 1️⃣ update just the coords on your users table
    const { error: updErr } = await supabase
      .from('users')
      .update({
        latitude: coords.lat,
        longitude: coords.lng
      })
      .eq('id', user.id)
    if (updErr) {
      console.error(updErr)
      return alert('Failed to save location: ' + updErr.message)
    }

    // 2️⃣ upload proof into Storage
    const path = `${user.id}/${file.name}`
    const { error: storageErr } = await supabase
      .storage
      .from('uploads') // Correct bucket name
      .upload(path, file, {
        metadata: { user_id: user.id },
        upsert: false
      })
    if (storageErr) {
      console.error(storageErr)
      return alert('Storage upload failed: ' + storageErr.message)
    }

    // 3️⃣ record metadata in user_uploads
    const { error: metaErr } = await supabase
      .from('user_uploads') // Correct table name
      .insert({
        user_id: user.id,
        filename: file.name,
        mime_type: file.type,
        size_bytes: file.size
      })
    if (metaErr) {
      console.error(metaErr)
      return alert('Metadata insert failed: ' + metaErr.message)
    }

    alert('All done! 🎉')
    router.push('/')
  }

  // init map & allow click-to-place marker
  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 51.509865, lng: -0.118092 },
      zoom: 6
    })

    map.addListener('click', e => {
      const lat = e.latLng?.lat(), lng = e.latLng?.lng()
      if (lat == null || lng == null) return
      setCoords({ lat, lng })
      markerRef.current?.setMap(null)
      markerRef.current = new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Your selected location'
      })
    })

    // show existing users’ pins
    supabase
      .from('users')
      .select('full_name,latitude,longitude')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
      .then(({ data }) =>
        data?.forEach(u => {
          if (u.latitude && u.longitude) {
            new window.google.maps.Marker({
              position: { lat: u.latitude, lng: u.longitude },
              map, title: u.full_name
            })
          }
        })
      )
  }, [])

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Upload Proof & Pick Location
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Proof (PDF/JPG/PNG):</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={e => setFile(e.target.files?.[0] ?? null)}
            className="w-full"
          />
          {file && <p className="mt-1 text-sm">{file.name}</p>}
        </div>

        <p className="text-sm text-gray-500">
          Click on the map to choose your location:
        </p>
        <div ref={mapRef} className="w-full h-64 rounded border" />
        {coords && (
          <p className="mt-1 text-xs">
            Selected: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brandBlue text-white py-2 rounded font-semibold hover:bg-blue-600"
        >
          {loading ? 'Submitting…' : 'Submit Proof'}
        </button>
      </form>
    </div>
  )
}
