import Image from "next/image";
import { notFound } from "next/navigation";
import { pool } from "@/lib/db";
import { getSession } from "@/lib/session";
import { getPublicUrl } from "@/lib/storage";
import { ListingActions } from "@/components/ListingActions";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { rows } = await pool.query(
    `select l.id, l.title, l.description, l.price, l.category, l.condition, l.status, l.created_at,
            l.seller_id, u.full_name as seller_name, u.email as seller_email,
            coalesce(
              (select array_agg(li.s3_key order by li.position) from listing_images li where li.listing_id = l.id),
              '{}'
            ) as image_keys
     from listings l
     join users u on u.id = l.seller_id
     where l.id = $1`,
    [id],
  );

  const row = rows[0];
  if (!row) notFound();

  const session = await getSession();
  const images: string[] = (row.image_keys as string[]).map(getPublicUrl);
  const isOwner = session?.userId === row.seller_id;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-black/5 dark:bg-white/5">
          {images[0] && (
            <Image src={images[0]} alt={row.title} fill className="object-cover" />
          )}
        </div>
        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {images.slice(1).map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-md bg-black/5 dark:bg-white/5"
              >
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">{row.title}</h1>
          <p className="text-xl font-medium">{row.price} TL</p>
        </div>

        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-black/5 px-2 py-1 dark:bg-white/10">
            {row.category}
          </span>
          <span className="rounded-full bg-black/5 px-2 py-1 dark:bg-white/10">
            {row.condition}
          </span>
        </div>

        {row.description && (
          <p className="whitespace-pre-wrap text-sm text-black/80 dark:text-white/80">
            {row.description}
          </p>
        )}

        <p className="text-sm text-black/60 dark:text-white/60">
          Satıcı: {row.seller_name || row.seller_email}
        </p>

        <ListingActions
          listingId={row.id}
          isOwner={isOwner}
          status={row.status}
          isLoggedIn={Boolean(session)}
        />
      </div>
    </div>
  );
}
