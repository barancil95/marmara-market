import Link from "next/link";
import { redirect } from "next/navigation";
import { pool } from "@/lib/db";
import { getSession } from "@/lib/session";
import { getPublicUrl } from "@/lib/storage";
import { MyListingCard } from "@/components/MyListingCard";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/profile");

  const { rows: userRows } = await pool.query(
    "select email, full_name from users where id = $1",
    [session.userId],
  );
  const user = userRows[0];

  const { rows: listingRows } = await pool.query(
    `select l.id, l.title, l.price, l.status,
            (select li.s3_key from listing_images li where li.listing_id = l.id order by li.position limit 1) as first_image_key
     from listings l
     where l.seller_id = $1
     order by l.created_at desc`,
    [session.userId],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold">Profilim</h1>
        <p className="text-sm text-black/60 dark:text-white/60">
          {user?.full_name || user?.email}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">İlanlarım</h2>
          <Link href="/listings/new" className="text-sm hover:underline">
            + Yeni ilan
          </Link>
        </div>
        {listingRows.length === 0 && (
          <p className="text-sm text-black/50 dark:text-white/50">
            Henüz ilan vermedin.
          </p>
        )}
        <div className="space-y-2">
          {listingRows.map((l) => (
            <MyListingCard
              key={l.id}
              id={l.id}
              title={l.title}
              price={l.price}
              status={l.status}
              image={l.first_image_key ? getPublicUrl(l.first_image_key) : null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
