"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface CurrentUser {
  id: string;
  email: string;
  full_name: string | null;
}

export function Navbar() {
  const [user, setUser] = useState<CurrentUser | null | undefined>(undefined);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setUser(data.user);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Marmara Market
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:underline">
            İlanlar
          </Link>
          {user && (
            <Link href="/listings/new" className="hover:underline">
              İlan Ver
            </Link>
          )}
          {user && (
            <Link href="/messages" className="hover:underline">
              Mesajlar
            </Link>
          )}
          {user && (
            <Link href="/profile" className="hover:underline">
              Profilim
            </Link>
          )}
          {user === null && (
            <Link
              href="/login"
              className="rounded-md bg-black px-3 py-1.5 text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
            >
              Giriş Yap
            </Link>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline dark:text-red-400"
            >
              Çıkış
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
