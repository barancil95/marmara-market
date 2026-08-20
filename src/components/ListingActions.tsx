"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buttonClass } from "@/lib/ui";

export function ListingActions({
  listingId,
  isOwner,
  status,
  isLoggedIn,
}: {
  listingId: string;
  isOwner: boolean;
  status: "available" | "reserved" | "sold";
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleContactSeller() {
    setError(null);
    if (!isLoggedIn) {
      router.push(`/login?next=/listings/${listingId}`);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Konuşma başlatılamadı.");
      router.push(`/messages/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir şeyler ters gitti.");
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkSold() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/listings/${listingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "sold" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Güncellenemedi.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir şeyler ters gitti.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      {!isOwner && status === "available" && (
        <button onClick={handleContactSeller} disabled={loading} className={buttonClass}>
          {loading ? "..." : "Satıcıyla Konuş"}
        </button>
      )}
      {isOwner && status !== "sold" && (
        <button onClick={handleMarkSold} disabled={loading} className={buttonClass}>
          {loading ? "..." : "Satıldı Olarak İşaretle"}
        </button>
      )}
      {status === "sold" && (
        <p className="text-sm font-medium text-black/60 dark:text-white/60">
          Bu ilan satıldı.
        </p>
      )}
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <p className="text-xs text-black/50 dark:text-white/50">
        Ödeme uygulama dışında (kampüste buluşarak) yapılır — alıcı ve satıcı
        mesajlaşarak anlaşır.
      </p>
    </div>
  );
}
