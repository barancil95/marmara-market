import Link from "next/link";
import { redirect } from "next/navigation";
import { pool } from "@/lib/db";
import { getSession } from "@/lib/session";

export default async function MessagesPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/messages");

  const { rows } = await pool.query(
    `select c.id, c.listing_id, c.buyer_id, c.seller_id,
            l.title as listing_title, l.status as listing_status,
            other.full_name as other_full_name, other.email as other_email,
            (select body from messages m where m.conversation_id = c.id order by m.created_at desc limit 1) as last_message,
            (select created_at from messages m where m.conversation_id = c.id order by m.created_at desc limit 1) as last_message_at
     from conversations c
     join listings l on l.id = c.listing_id
     join users other on other.id = (case when c.buyer_id = $1 then c.seller_id else c.buyer_id end)
     where c.buyer_id = $1 or c.seller_id = $1
     order by coalesce(
       (select created_at from messages m where m.conversation_id = c.id order by m.created_at desc limit 1),
       c.created_at
     ) desc`,
    [session.userId],
  );

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Mesajlar</h1>
      {rows.length === 0 && (
        <p className="text-sm text-black/50 dark:text-white/50">
          Henüz bir konuşman yok.
        </p>
      )}
      <div className="divide-y divide-black/10 dark:divide-white/10">
        {rows.map((c) => (
          <Link
            key={c.id}
            href={`/messages/${c.id}`}
            className="block py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
          >
            <p className="text-sm font-medium">{c.listing_title}</p>
            <p className="text-xs text-black/60 dark:text-white/60">
              {c.other_full_name || c.other_email}
            </p>
            {c.last_message && (
              <p className="mt-1 truncate text-sm text-black/70 dark:text-white/70">
                {c.last_message}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
