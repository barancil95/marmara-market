"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const STATUS_LABELS: Record<string, string> = {
  available: "Yayında",
  reserved: "Ayrıldı",
  sold: "Satıldı",
};

export function MyListingCard({
  id,
  title,
  price,
  status,
  image,
}: {
  id: string;
  title: string;
  price: number;
  status: "available" | "reserved" | "sold";
  image: string | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function updateStatus(next: "sold" | "available") {
    setLoading(true);
    try {
      await fetch(`/api/listings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Bu ilanı silmek istediğine emin misin?")) return;
    setLoading(true);
    try {
      await fetch(`/api/listings/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-black/10 p-3 dark:border-white/10">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-black/5 dark:bg-white/5">
        {image && <Image src={image} alt={title} fill className="object-cover" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="text-sm text-black/60 dark:text-white/60">
          {price} TL &middot; {STATUS_LABELS[status]}
        </p>
      </div>
      <div className="flex shrink-0 gap-2 text-sm">
        {status !== "sold" && (
          <button
            onClick={() => updateStatus("sold")}
            disabled={loading}
            className="rounded-md border border-black/15 px-2 py-1 hover:bg-black/5 disabled:opacity-50 dark:border-white/20 dark:hover:bg-white/10"
          >
            Satıldı
          </button>
        )}
        {status === "sold" && (
          <button
            onClick={() => updateStatus("available")}
            disabled={loading}
            className="rounded-md border border-black/15 px-2 py-1 hover:bg-black/5 disabled:opacity-50 dark:border-white/20 dark:hover:bg-white/10"
          >
            Tekrar Yayınla
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={loading}
          className="rounded-md border border-red-600/30 px-2 py-1 text-red-600 hover:bg-red-600/10 disabled:opacity-50 dark:text-red-400"
        >
          Sil
        </button>
      </div>
    </div>
  );
}
