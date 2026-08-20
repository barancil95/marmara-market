"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";
import { inputClass } from "@/lib/ui";

interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  images: string[];
  seller_name: string | null;
  created_at: string;
}

export function ListingsBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [listings, setListings] = useState<Listing[] | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);

    const controller = new AbortController();
    fetch(`/api/listings?${params.toString()}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setListings(data.listings))
      .catch(() => {});

    return () => controller.abort();
  }, [q, category]);

  function updateUrl(nextQ: string, nextCategory: string) {
    const params = new URLSearchParams();
    if (nextQ) params.set("q", nextQ);
    if (nextCategory) params.set("category", nextCategory);
    router.replace(params.toString() ? `/?${params.toString()}` : "/", { scroll: false });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            updateUrl(e.target.value, category);
          }}
          placeholder="Ne arıyorsun? (örn. kitap, buzdolabı)"
          className={inputClass}
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            updateUrl(q, e.target.value);
          }}
          className={`${inputClass} sm:w-56`}
        >
          <option value="">Tüm kategoriler</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {listings === null && (
        <p className="text-sm text-black/50 dark:text-white/50">Yükleniyor...</p>
      )}
      {listings?.length === 0 && (
        <p className="text-sm text-black/50 dark:text-white/50">
          Hiç ilan bulunamadı. İlk ilanı sen ver!
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {listings?.map((listing) => (
          <Link
            key={listing.id}
            href={`/listings/${listing.id}`}
            className="group block overflow-hidden rounded-lg border border-black/10 dark:border-white/10"
          >
            <div className="relative aspect-square bg-black/5 dark:bg-white/5">
              {listing.images[0] && (
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              )}
            </div>
            <div className="p-2">
              <p className="truncate text-sm font-medium">{listing.title}</p>
              <p className="text-sm text-black/60 dark:text-white/60">{listing.price} TL</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
