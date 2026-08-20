import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { pool } from "@/lib/db";
import { getSession } from "@/lib/session";
import { ChatWindow } from "@/components/ChatWindow";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { conversationId } = await params;

  const { rows } = await pool.query(
    `select c.id, c.listing_id, c.buyer_id, c.seller_id, l.title as listing_title
     from conversations c
     join listings l on l.id = c.listing_id
     where c.id = $1`,
    [conversationId],
  );

  const conversation = rows[0];
  if (!conversation) notFound();
  if (conversation.buyer_id !== session.userId && conversation.seller_id !== session.userId) {
    notFound();
  }

  return (
    <div className="space-y-3">
      <Link href={`/listings/${conversation.listing_id}`} className="text-sm hover:underline">
        &larr; {conversation.listing_title}
      </Link>
      <ChatWindow conversationId={conversation.id} currentUserId={session.userId} />
    </div>
  );
}
