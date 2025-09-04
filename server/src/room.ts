import { RoomState, Player, PublicRoomState } from "./types.js";
import { getRandomTitle, getRandomTarget, normalizeTitle } from "./wiki.js";

export function createRoom(
  code: string,
  hostSocketId: string,
  rounds: number
): RoomState {
  return {
    code,
    createdBy: hostSocketId,
    rounds,
    currentRound: 0,
    status: "lobby",
    players: new Map(),
    paths: new Map(),
  };
}

export function toPublic(state: RoomState): PublicRoomState {
  return {
    code: state.code,
    rounds: state.rounds,
    currentRound: state.currentRound,
    status: state.status,
    players: Array.from(state.players.values()).map((p) => ({
      id: p.id,
      name: p.name,
      score: p.score,
      ready: p.ready,
    })),
    targetTitle: state.status !== "lobby" ? state.targetTitle : undefined,
    startTitle: state.status !== "lobby" ? state.startTitle : undefined,
    winnerId: state.winnerId,
    hostId: state.createdBy,
    paths:
      state.status === "round_over" || state.status === "finished"
        ? Object.fromEntries(state.paths || [])
        : undefined,
    history: state.history
      ? Object.fromEntries(
          Array.from(state.history.entries()).map(([round, map]) => [
            round,
            Object.fromEntries(map),
          ])
        )
      : undefined,
  };
}

export function allReady(state: RoomState): boolean {
  // Allow single-player for tests
  if (state.players.size < 1) return false;
  for (const p of state.players.values()) if (!p.ready) return false;
  return true;
}

export async function startNextRound(state: RoomState) {
  if (state.currentRound >= state.rounds) {
    state.status = "finished";
    return;
  }
  state.currentRound += 1;
  state.winnerId = undefined;
  state.players.forEach((p) => {
    p.clicks = 0;
    p.ready = false;
  });
  // Initialize per-round path tracking
  state.paths = new Map();
  if (!state.history) state.history = new Map();
  state.history.set(state.currentRound, state.paths);

  let target = getRandomTarget();
  let start = await getRandomTitle();
  let guard = 0;
  while (normalizeTitle(start) === normalizeTitle(target) && guard++ < 10) {
    start = await getRandomTitle();
  }

  state.targetTitle = target;
  state.startTitle = start;
  state.status = "countdown";
}

export function handleNavigate(
  state: RoomState,
  playerId: string,
  title: string
): { winner?: Player } {
  if (state.status !== "playing" || !state.targetTitle) return {};
  const t = normalizeTitle(title);
  const target = normalizeTitle(state.targetTitle);
  const p = state.players.get(playerId);
  if (p) p.clicks += 1;
  // Track path per player
  if (state.paths) {
    const currentPath = state.paths.get(playerId) || [];
    currentPath.push(t);
    state.paths.set(playerId, currentPath);
  }

  if (t === target && !state.winnerId) {
    state.winnerId = playerId;
    state.status = "round_over";
    // Reset all players to not ready for next round
    state.players.forEach((player) => {
      player.ready = false;
    });
    return { winner: p };
  }
  return {};
}

export function awardScores(state: RoomState) {
  if (!state.winnerId)
    return [] as Array<{ id: string; name: string; score: number }>;
  const winner = state.players.get(state.winnerId);
  if (winner) winner.score += 10;
  return Array.from(state.players.values()).map((p) => ({
    id: p.id,
    name: p.name,
    score: p.score,
  }));
}
