import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { Server as SocketIOServer } from "socket.io";
import { parseCookie } from "cookie";
import { verifyAuthToken } from "@/lib/auth";
import { pool } from "@/lib/db";
import { SESSION_COOKIE_NAME } from "@/lib/constants";

const PORT = Number(process.env.SOCKET_PORT) || 3001;
const APP_ORIGIN = process.env.APP_ORIGIN || "http://localhost:3000";
const INTERNAL_EMIT_SECRET = process.env.INTERNAL_EMIT_SECRET;

if (!INTERNAL_EMIT_SECRET) {
  throw new Error("INTERNAL_EMIT_SECRET env var is required");
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk as Buffer);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function handleInternalEmit(req: IncomingMessage, res: ServerResponse) {
  if (req.headers["x-internal-secret"] !== INTERNAL_EMIT_SECRET) {
    res.writeHead(401);
    res.end();
    return;
  }
  try {
    const body = (await readJsonBody(req)) as {
      conversationId?: string;
      message?: unknown;
    };
    if (!body.conversationId || !body.message) {
      res.writeHead(400);
      res.end();
      return;
    }
    io.to(`conversation:${body.conversationId}`).emit("message:new", body.message);
    res.writeHead(200);
    res.end();
  } catch {
    res.writeHead(400);
    res.end();
  }
}

const httpServer = createServer((req, res) => {
  if (req.method === "POST" && req.url === "/internal/emit") {
    handleInternalEmit(req, res);
    return;
  }
  res.writeHead(404);
  res.end();
});

const io = new SocketIOServer(httpServer, {
  path: "/socket.io",
  cors: {
    origin: APP_ORIGIN,
    credentials: true,
  },
});

io.use((socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;
    if (!cookieHeader) throw new Error("no cookie");
    const cookies = parseCookie(cookieHeader);
    const token = cookies[SESSION_COOKIE_NAME];
    if (!token) throw new Error("no session cookie");
    const payload = verifyAuthToken(token);
    socket.data.userId = payload.userId;
    next();
  } catch {
    next(new Error("unauthorized"));
  }
});

io.on("connection", (socket) => {
  socket.on("join", async (conversationId: string) => {
    const userId = socket.data.userId as string;
    const { rows } = await pool.query(
      "select 1 from conversations where id = $1 and (buyer_id = $2 or seller_id = $2)",
      [conversationId, userId],
    );
    if (rows.length > 0) {
      socket.join(`conversation:${conversationId}`);
    }
  });

  socket.on("leave", (conversationId: string) => {
    socket.leave(`conversation:${conversationId}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`> Socket.io server ready on http://localhost:${PORT}`);
});
