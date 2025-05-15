import Link from 'next/link';
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="p-4 bg-gray-200 space-x-4">
        <Link href="/admin/users"  className="underline">Users</Link>
        <Link href="/admin/uploads" className="underline">Uploads</Link>
      </nav>
      <div className="p-6">{children}</div>
    </>
  )
}
