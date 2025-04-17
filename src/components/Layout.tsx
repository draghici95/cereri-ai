// components/Layout.tsx
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-white border-b shadow-sm px-4 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-700">Cereri.ai</Link>
          <nav className="space-x-4 text-sm text-gray-600">
            <Link href="/despre" className="hover:underline">Despre</Link>
            <Link href="/termeni" className="hover:underline">Termeni</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-gray-100 px-4 py-6">
        <div className="max-w-2xl mx-auto">{children}</div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-4 border-t">
        &copy; {new Date().getFullYear()} Cereri.ai — Gratuit pentru uz personal
      </footer>
    </div>
  );
}
