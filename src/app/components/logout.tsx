'use client';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();
  return (
    <button onClick={() => { localStorage.clear(); router.push('/login'); }} className="bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
}
