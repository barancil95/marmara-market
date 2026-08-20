const SOCKET_INTERNAL_URL =
  process.env.SOCKET_INTERNAL_URL || `http://localhost:${process.env.SOCKET_PORT || 3001}`;

export async function emitNewMessage(conversationId: string, message: unknown): Promise<void> {
  const secret = process.env.INTERNAL_EMIT_SECRET;
  if (!secret) {
    console.warn("INTERNAL_EMIT_SECRET not set; skipping realtime delivery.");
    return;
  }
  try {
    await fetch(`${SOCKET_INTERNAL_URL}/internal/emit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-secret": secret,
      },
      body: JSON.stringify({ conversationId, message }),
    });
  } catch (err) {
    // Realtime delivery is best-effort — the message is already persisted in the DB
    // and will show up next time the recipient loads/polls the conversation.
    console.error("Failed to notify socket server of new message:", err);
  }
}
