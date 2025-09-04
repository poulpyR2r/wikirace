import "dotenv/config";
import express from "express";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - local shim in types.d.ts
import compression from "compression";
import cors from "cors";
import sanitizeHtml from "sanitize-html";
import Pusher from "pusher";
import {
  createRoom,
  toPublic,
  allReady,
  startNextRound,
  handleNavigate,
  awardScores,
} from "./room.js";
import { getMobileHtml } from "./wiki.js";
import type { RoomState, Player } from "./types.js";
import {
  loadRoom as loadRoomFromRedis,
  saveRoom as saveRoomToRedis,
} from "./store.js";

const PORT = process.env.PORT || 4000;
// Normalize configured client origin by removing a trailing slash
const CLIENT_ORIGIN = (
  process.env.CLIENT_ORIGIN || "http://localhost:5173"
).replace(/\/$/, "");

const app = express();
// Reflect request origin only if it matches our allowed origin (ignoring trailing slash)
const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    // Allow non-browser requests or same-origin (no Origin header)
    if (!origin) return callback(null, true);
    const normalized = origin.replace(/\/$/, "");
    if (normalized === CLIENT_ORIGIN) {
      return callback(null, true);
    }
    return callback(new Error("CORS: Origin not allowed"));
  },
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(compression());

const rooms = new Map<string, RoomState>();

// Log pusher config (masked) to ensure env loaded
console.log("Pusher config:", {
  appId: process.env.PUSHER_APP_ID,
  key: (process.env.PUSHER_KEY || "").slice(0, 6) + "***",
  cluster: process.env.PUSHER_CLUSTER,
});

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "",
  key: process.env.PUSHER_KEY || "",
  secret: process.env.PUSHER_SECRET || "",
  cluster: process.env.PUSHER_CLUSTER || "eu",
  useTLS: true,
  // Explicit host for EU cluster to avoid 404 misroutes if corporate proxy/DNS
  host: process.env.PUSHER_HOST || undefined,
});

function makeCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++)
    s += alphabet[Math.floor(Math.random() * alphabet.length)];
  if (rooms.has(s)) return makeCode();
  return s;
}

async function broadcast(code: string, event: string, payload: any) {
  try {
    await pusher.trigger(`room-${code}`, event, payload);
  } catch (err) {
    console.error("Pusher trigger failed", {
      event,
      code,
      message: (err as Error)?.message,
    });
  }
}

async function getRoom(code: string): Promise<RoomState | null> {
  const local = rooms.get(code);
  if (local) return local;
  try {
    const fromRedis = await loadRoomFromRedis(code);
    if (fromRedis) {
      rooms.set(code, fromRedis);
      return fromRedis;
    }
  } catch (e) {
    console.error("Redis load failed", (e as Error)?.message);
  }
  return null;
}

async function persistRoom(state: RoomState) {
  rooms.set(state.code, state);
  try {
    await saveRoomToRedis(state);
  } catch (e) {
    console.error("Redis save failed", (e as Error)?.message);
  }
}

app.get("/api/wiki/:title", async (req, res) => {
  try {
    const title = String(req.params.title);
    const { html, title: canonical } = await getMobileHtml(title);
    const clean = sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "figure",
        "figcaption",
        "section",
        "header",
        "main",
        "footer",
        "nav",
        "picture",
        "source",
        "table",
        "thead",
        "tbody",
        "tr",
        "td",
        "th",
        "sup",
        "div",
        "span",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "p",
        // MathML tags
        "math",
        "mrow",
        "mi",
        "mo",
        "mn",
        "msup",
        "msub",
        "mfrac",
        "msqrt",
        "mstyle",
        "mtable",
        "mtr",
        "mtd",
        "munderover",
        "mover",
        "munder",
        "mmultiscripts",
        "mspace",
        "mroot",
        "semantics",
        "annotation",
        "annotation-xml",
      ]),
      allowedAttributes: {
        a: ["href", "title", "rel", "target"],
        table: ["role", "border", "cellpadding", "cellspacing", "style"],
        th: [
          "colspan",
          "rowspan",
          "scope",
          "headers",
          "abbr",
          "align",
          "style",
        ],
        td: [
          "colspan",
          "rowspan",
          "scope",
          "headers",
          "abbr",
          "align",
          "style",
        ],
        img: [
          "src",
          "alt",
          "width",
          "height",
          "srcset",
          "sizes",
          "decoding",
          "loading",
        ],
        source: ["srcset", "sizes", "type", "media"],
        // Allow style on all tags for better fidelity of wiki content
        "*": ["id", "class", "style", "xmlns", "display", "mathvariant"],
      },
      allowedSchemes: ["http", "https", "data"],
      allowProtocolRelative: true,
    });
    // Cache wiki payloads at the CDN for 1 hour, allow SWR for 1 minute
    res.set(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=60"
    );
    res.json({ title: canonical, html: clean });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch wiki content" });
  }
});

// Create room
app.post("/api/room/create", async (req, res) => {
  const { name, rounds, clientId } = req.body as {
    name: string;
    rounds: number;
    clientId: string;
  };
  if (!name || !clientId || !rounds)
    return res.status(400).json({ error: "Invalid payload" });
  const code = makeCode();
  const state = createRoom(code, clientId, rounds);
  const player: Player = {
    id: clientId,
    name,
    score: 0,
    ready: false,
    clicks: 0,
  };
  state.players.set(clientId, player);
  await persistRoom(state);
  const publicState = toPublic(state);
  broadcast(code, "room:state", publicState);
  res.json({ code, state: publicState });
});

// Join room
app.post("/api/room/join", async (req, res) => {
  const { code, name, clientId } = req.body as {
    code: string;
    name: string;
    clientId: string;
  };
  let state = await getRoom(code);
  if (!state)
    return res.json({ ok: false, host: false, error: "Room not found" });
  if (!state.players.has(clientId)) {
    const player: Player = {
      id: clientId,
      name,
      score: 0,
      ready: false,
      clicks: 0,
    };
    state.players.set(clientId, player);
  }
  await persistRoom(state);
  broadcast(code, "room:state", toPublic(state));
  res.json({
    ok: true,
    host: state.createdBy === clientId,
    state: toPublic(state),
  });
});

// Player ready
app.post("/api/room/ready", async (req, res) => {
  const { code, clientId } = req.body as { code: string; clientId: string };
  const state = await getRoom(code);
  if (!state) return res.status(404).json({ error: "Room not found" });
  const player = state.players.get(clientId);
  if (!player) return res.status(404).json({ error: "Player not found" });
  player.ready = true;
  await persistRoom(state);
  await broadcast(code, "room:state", toPublic(state));

  if (state.status === "lobby" || state.status === "round_over") {
    if (allReady(state)) {
      await startNextRound(state);
      await persistRoom(state);
      await broadcast(code, "room:state", toPublic(state));
      await broadcast(code, "round:setup", {
        targetTitle: state.targetTitle!,
        round: state.currentRound,
        rounds: state.rounds,
      });
      // Countdown is client-side; host will trigger /api/room/start
    }
  }
  res.json({ ok: true });
});

// Player navigate
app.post("/api/player/navigate", async (req, res) => {
  const { code, clientId, title } = req.body as {
    code: string;
    clientId: string;
    title: string;
  };
  const state = await getRoom(code);
  if (!state) return res.status(404).json({ error: "Room not found" });
  const { winner } = handleNavigate(state, clientId, title);
  // persist clicks/paths even if no winner
  await persistRoom(state);
  if (winner) {
    const updatedScores = awardScores(state);
    await broadcast(code, "round:over", {
      winnerId: winner.id,
      winnerName: winner.name,
      targetTitle: state.targetTitle!,
      updatedScores,
      winnerPath: state.paths?.get(winner.id) || [],
    });

    if (state.currentRound >= state.rounds) {
      state.status = "finished";
      await persistRoom(state);
      await broadcast(code, "room:state", toPublic(state));
    } else {
      // Just set status to round_over, don't start next round yet
      // Next round will start when all players are ready
      state.status = "round_over";
      await persistRoom(state);
      await broadcast(code, "room:state", toPublic(state));
    }
  }
  res.json({ ok: true });
});

// Host-advance to next round
app.post("/api/room/next", async (req, res) => {
  const { code, clientId } = req.body as { code: string; clientId: string };
  const state = await getRoom(code);
  if (!state) return res.status(404).json({ error: "Room not found" });
  if (state.createdBy !== clientId)
    return res.status(403).json({ error: "Only host can advance" });
  if (state.status === "finished") return res.json({ ok: true });
  if (state.currentRound >= state.rounds) {
    state.status = "finished";
    await persistRoom(state);
    await broadcast(code, "room:state", toPublic(state));
    return res.json({ ok: true });
  }
  await startNextRound(state);
  await persistRoom(state);
  await broadcast(code, "room:state", toPublic(state));
  await broadcast(code, "round:setup", {
    targetTitle: state.targetTitle!,
    round: state.currentRound,
    rounds: state.rounds,
  });
  // Host will trigger /api/room/start after countdown
  res.json({ ok: true });
});

// Explicit start endpoint to avoid relying on serverless timers
app.post("/api/room/start", async (req, res) => {
  const { code, clientId } = req.body as { code: string; clientId: string };
  const state = await getRoom(code);
  if (!state) return res.status(404).json({ error: "Room not found" });
  // Only host is allowed to trigger the start
  if (state.createdBy !== clientId)
    return res.status(403).json({ error: "Only host can start" });
  if (state.status !== "countdown")
    return res.status(400).json({ error: "Not ready to start" });

  state.status = "playing";
  state.startedAt = Date.now();
  await persistRoom(state);
  await broadcast(code, "round:start", { startTitle: state.startTitle! });
  await broadcast(code, "room:state", toPublic(state));
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`HTTP server listening on http://localhost:${PORT}`);
});
