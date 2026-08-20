"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, CONDITIONS } from "@/lib/categories";
import { inputClass, labelClass, buttonClass } from "@/lib/ui";

interface PendingImage {
  file: File;
  previewUrl: string;
  key?: string;
  uploading: boolean;
  error?: string;
}

export function ListingForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [condition, setCondition] = useState<string>(CONDITIONS[0]);
  const [images, setImages] = useState<PendingImage[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadOne(pending: PendingImage, index: number) {
    try {
      const presignRes = await fetch("/api/uploads/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: pending.file.type }),
      });
      const presignData = await presignRes.json();
      if (!presignRes.ok) {
        throw new Error(presignData.error || "Yükleme başlatılamadı.");
      }

      const putRes = await fetch(presignData.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": pending.file.type },
        body: pending.file,
      });
      if (!putRes.ok) throw new Error("Fotoğraf yüklenemedi.");

      setImages((prev) =>
        prev.map((img, i) =>
          i === index ? { ...img, key: presignData.key, uploading: false } : img,
        ),
      );
    } catch (err) {
      setImages((prev) =>
        prev.map((img, i) =>
          i === index
            ? {
                ...img,
                uploading: false,
                error: err instanceof Error ? err.message : "Hata",
              }
            : img,
        ),
      );
    }
  }

  function handleFilesSelected(files: FileList | null) {
    if (!files) return;
    const remainingSlots = 6 - images.length;
    const selected = Array.from(files).slice(0, remainingSlots);
    const newPending: PendingImage[] = selected.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      uploading: true,
    }));
    const startIndex = images.length;
    setImages((prev) => [...prev, ...newPending]);
    newPending.forEach((pending, i) => uploadOne(pending, startIndex + i));
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const priceNumber = Number(price);
    if (!Number.isFinite(priceNumber) || priceNumber < 0) {
      setError("Geçerli bir fiyat gir.");
      return;
    }
    if (images.some((img) => img.uploading)) {
      setError("Fotoğraflar yükleniyor, biraz bekle.");
      return;
    }
    const imageKeys = images.filter((img) => img.key).map((img) => img.key as string);
    if (imageKeys.length === 0) {
      setError("En az bir fotoğraf ekle.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price: Math.round(priceNumber),
          category,
          condition,
          imageKeys,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "İlan oluşturulamadı.");
      router.push(`/listings/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "İlan oluşturulamadı.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <h1 className="text-xl font-semibold">İlan Ver</h1>

      <div>
        <label className={labelClass}>Başlık</label>
        <input
          required
          maxLength={120}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          placeholder="Örn. Kalkülüs ders kitabı"
        />
      </div>

      <div>
        <label className={labelClass}>Açıklama</label>
        <textarea
          rows={4}
          maxLength={2000}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
          placeholder="Durumu, teslim yeri vb. hakkında bilgi ver"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Fiyat (TL)</label>
          <input
            required
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Durum</label>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className={inputClass}
        >
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Fotoğraflar (en fazla 6)</label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          disabled={images.length >= 6}
          onChange={(e) => handleFilesSelected(e.target.files)}
          className="text-sm"
        />
        {images.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-md border border-black/10 dark:border-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.previewUrl} alt="" className="h-full w-full object-cover" />
                {img.uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs text-white">
                    Yükleniyor...
                  </div>
                )}
                {img.error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-600/80 p-1 text-center text-[10px] text-white">
                    {img.error}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute right-1 top-1 rounded-full bg-black/70 px-1.5 text-xs text-white"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <button type="submit" disabled={submitting} className={buttonClass}>
        {submitting ? "Yayınlanıyor..." : "İlanı Yayınla"}
      </button>
    </form>
  );
}
