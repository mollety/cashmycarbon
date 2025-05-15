import Link from 'next/link';
import { ReactNode } from 'react';


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <nav style={{ padding: '1rem', background: '#f1f1f1' }}>
        <Link href="/">Home</Link> |{" "}
        <Link href="/admin">Admin</Link> |{" "}
        <Link href="/users">Users</Link> |{" "}
        <Link href="/payouts">Payouts</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
