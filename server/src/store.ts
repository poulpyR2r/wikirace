import type { RoomState, Player } from "./types.js";
import { getRedis } from "./redis.js";

const key = (code: string) => `room:${code}`;

function serialize(state: RoomState) {
  return {
    ...state,
    players: Array.from(state.players.values()),
    paths: state.paths ? Object.fromEntries(state.paths) : undefined,
    history: state.history
      ? Object.fromEntries(
          Array.from(state.history.entries()).map(([round, map]) => [
            round,
            Object.fromEntries(map),
          ])
        )
      : undefined,
  } as any;
}

function deserialize(obj: any): RoomState {
  return {
    ...obj,
    players: new Map((obj.players as Player[]).map((p) => [p.id, p])),
    paths: obj.paths ? new Map(Object.entries(obj.paths)) : new Map(),
    history: obj.history
      ? new Map(
          Object.entries(obj.history).map(([round, rec]) => [
            Number(round),
            new Map(Object.entries(rec as Record<string, string[]>)),
          ])
        )
      : new Map(),
  } as any;
}

export async function loadRoom(code: string): Promise<RoomState | null> {
  const r = await (await getRedis()).get(key(code));
  return r ? (deserialize(JSON.parse(r as string)) as RoomState) : null;
}

export async function saveRoom(state: RoomState, ttlSeconds = 6 * 60 * 60) {
  await (
    await getRedis()
  ).set(key(state.code), JSON.stringify(serialize(state)), {
    EX: ttlSeconds,
  });
}

export async function deleteRoom(code: string) {
  await (await getRedis()).del(key(code));
}
