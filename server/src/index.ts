import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import sanitizeHtml from "sanitize-html";
import {
  createRoom,
  toPublic,
  allReady,
  startNextRound,
  handleNavigate,
  awardScores,
} from "./room.js";
import { getMobileHtml } from "./wiki.js";
import type {
  ClientToServer,
  ServerToClient,
  RoomState,
  Player,
} from "./types.js";

const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

const rooms = new Map<string, RoomState>();

function makeCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++)
    s += alphabet[Math.floor(Math.random() * alphabet.length)];
  if (rooms.has(s)) return makeCode();
  return s;
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
    res.json({ title: canonical, html: clean });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch wiki content" });
  }
});

const server = http.createServer(app);
const io = new Server<ClientToServer, ServerToClient>(server, {
  cors: { origin: CLIENT_ORIGIN },
});

io.on("connection", (socket) => {
  socket.on("room:create", ({ name, rounds }, cb) => {
    const code = makeCode();
    const state = createRoom(code, socket.id, rounds);
    const player: Player = {
      id: socket.id,
      name,
      score: 0,
      ready: false,
      clicks: 0,
    };
    state.players.set(socket.id, player);
    rooms.set(code, state);
    socket.join(code);
    cb({ code });
    io.to(code).emit("room:state", toPublic(state));
  });

  socket.on("room:join", ({ code, name }, cb) => {
    const state = rooms.get(code);
    if (!state) return cb({ ok: false, host: false, error: "Room not found" });
    const exists = state.players.has(socket.id);
    if (!exists) {
      const player: Player = {
        id: socket.id,
        name,
        score: 0,
        ready: false,
        clicks: 0,
      };
      state.players.set(socket.id, player);
    }
    socket.join(code);
    cb({
      ok: true,
      host: state.createdBy === socket.id,
      state: toPublic(state),
    });
    io.to(code).emit("room:state", toPublic(state));
  });

  socket.on("room:ready", async () => {
    const code = [...socket.rooms].find((r) => rooms.has(r));
    if (!code) return;
    const state = rooms.get(code)!;
    const player = state.players.get(socket.id);
    if (!player) return;
    player.ready = true;
    io.to(code).emit("room:state", toPublic(state));

    // Auto-start next round when everyone is ready in lobby OR right after a round.
    if (state.status === "lobby" || state.status === "round_over") {
      if (allReady(state)) {
        await startNextRound(state);
        io.to(code).emit("room:state", toPublic(state));
        io.to(code).emit("round:setup", {
          targetTitle: state.targetTitle!,
          round: state.currentRound,
          rounds: state.rounds,
        });
        setTimeout(() => {
          state.status = "playing";
          state.startedAt = Date.now();
          io.to(code).emit("round:start", { startTitle: state.startTitle! });
          io.to(code).emit("room:state", toPublic(state));
        }, 3000);
      }
    }
  });

  socket.on("player:navigate", ({ title }) => {
    const code = [...socket.rooms].find((r) => rooms.has(r));
    if (!code) return;
    const state = rooms.get(code)!;
    const { winner } = handleNavigate(state, socket.id, title);
    if (winner) {
      const updatedScores = awardScores(state);
      io.to(code).emit("round:over", {
        winnerId: winner.id,
        winnerName: winner.name,
        targetTitle: state.targetTitle!,
        updatedScores,
        winnerPath: state.paths?.get(winner.id) || [],
      });
      io.to(code).emit("room:state", toPublic(state));
      // If last round just ended, mark finished; otherwise auto-advance after short pause
      if (state.currentRound >= state.rounds) {
        state.status = "finished";
        io.to(code).emit("room:state", toPublic(state));
      } else {
        setTimeout(async () => {
          await startNextRound(state);
          io.to(code).emit("room:state", toPublic(state));
          io.to(code).emit("round:setup", {
            targetTitle: state.targetTitle!,
            round: state.currentRound,
            rounds: state.rounds,
          });
          setTimeout(() => {
            state.status = "playing";
            state.startedAt = Date.now();
            io.to(code).emit("round:start", { startTitle: state.startTitle! });
            io.to(code).emit("room:state", toPublic(state));
          }, 2000);
        }, 2000);
      }
    }
  });

  socket.on("room:next", async () => {
    const code = [...socket.rooms].find((r) => rooms.has(r));
    if (!code) return;
    const state = rooms.get(code)!;
    if (state.createdBy !== socket.id) return;
    // If game already finished, ignore
    if (state.status === "finished") return;
    // If last round already played, mark finished and broadcast
    if (state.currentRound >= state.rounds) {
      state.status = "finished";
      io.to(code).emit("room:state", toPublic(state));
      return;
    }
    await startNextRound(state);
    io.to(code).emit("room:state", toPublic(state));
    io.to(code).emit("round:setup", {
      targetTitle: state.targetTitle!,
      round: state.currentRound,
      rounds: state.rounds,
    });
    setTimeout(() => {
      state.status = "playing";
      state.startedAt = Date.now();
      io.to(code).emit("round:start", { startTitle: state.startTitle! });
      io.to(code).emit("room:state", toPublic(state));
    }, 3000);
  });

  socket.on("disconnect", () => {
    for (const [code, state] of rooms) {
      if (state.players.delete(socket.id)) {
        io.to(code).emit("room:state", toPublic(state));
        if (state.players.size === 0) rooms.delete(code);
        break;
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
