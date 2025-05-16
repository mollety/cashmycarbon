'use client'

import useSWR from 'swr'

type Upload = {
  id:          string
  filename:    string
  size_bytes:  number
  uploaded_at: string
  is_approved: boolean
  users: {
    full_name: string
    email:     string
  }
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function AdminUploadsPage() {
  const { data, error, mutate } = useSWR<Upload[]>('/api/admin/uploads', fetcher)

  if (error) {
    console.error('Failed to load uploads:', error)
    return <p className="p-6 text-red-600">Failed to load uploads</p>
  }
  if (!data) return <p className="p-6">Loading…</p>

  const toggle = async (id: string, approve: boolean) => {
    await fetch(`/api/admin/uploads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approve })
    })
    mutate()
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Uploads</h1>
      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">User</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">File</th>
            <th className="border px-2 py-1">Uploaded At</th>
            <th className="border px-2 py-1">Size</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(u => (
            <tr key={u.id} className="odd:bg-white even:bg-gray-50">
              <td className="border px-2 py-1">{u.users.full_name}</td>
              <td className="border px-2 py-1">{u.users.email}</td>
              <td className="border px-2 py-1">
                <a
                  href={`/api/download/${u.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {u.filename}
                </a>
              </td>
              <td className="border px-2 py-1">
                {new Date(u.uploaded_at).toLocaleString()}
              </td>
              <td className="border px-2 py-1">
                {(u.size_bytes / 1024).toFixed(1)} KB
              </td>
              <td className="border px-2 py-1">
                {u.is_approved ? '✅ Approved' : '⏳ Pending'}
              </td>
              <td className="border px-2 py-1 space-x-1">
                {!u.is_approved ? (
                  <button
                    onClick={() => toggle(u.id, true)}
                    className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                  >
                    Approve
                  </button>
                ) : (
                  <button
                    onClick={() => toggle(u.id, false)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                  >
                    Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
