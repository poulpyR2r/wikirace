import Pusher from "pusher-js";
import type { Channel } from "pusher-js";
import type { PublicRoomState } from "./types";

export type ServerEvents = {
  "room:state": (state: PublicRoomState) => void;
  "room:error": (message: string) => void;
  "round:setup": (payload: {
    targetTitle: string;
    round: number;
    rounds: number;
  }) => void;
  "round:start": (payload: { startTitle: string }) => void;
  "round:over": (payload: {
    winnerId: string;
    winnerName: string;
    targetTitle: string;
    updatedScores: Array<{ id: string; name: string; score: number }>;
    winnerPath: string[];
  }) => void;
};

type Unsubscribe = () => void;

export type RoomSocket = {
  id: string;
  on: <K extends keyof ServerEvents>(event: K, cb: ServerEvents[K]) => void;
  off: <K extends keyof ServerEvents>(event: K, cb: ServerEvents[K]) => void;
  emit: (
    event:
      | "room:create"
      | "room:join"
      | "room:ready"
      | "room:start"
      | "room:next"
      | "room:next-auto"
      | "player:navigate",
    payload?: any,
    cb?: (res: any) => void
  ) => void;
  disconnect: () => void;
};

let pusher: Pusher | null = null;
let channel: Channel | null = null;
let currentCode: string | null = null;

export function connectSocket(baseUrl: string): RoomSocket {
  const key = (import.meta.env.VITE_PUSHER_KEY as string) || "";
  const cluster = (import.meta.env.VITE_PUSHER_CLUSTER as string) || "eu";
  const id = crypto.randomUUID();

  pusher = new Pusher(key, { cluster, forceTLS: true });

  const listeners = new Map<string, Set<Function>>();

  function subscribeTo(code: string) {
    if (currentCode === code) return;
    if (channel) {
      channel.unbind_all();
      pusher?.unsubscribe(channel.name);
    }
    currentCode = code;
    console.debug("Pusher: subscribing to", `room-${code}`);
    channel = pusher!.subscribe(`room-${code}`);
    channel.bind("pusher:subscription_succeeded", () => {
      console.debug("Pusher: subscribed", `room-${code}`);
    });
    channel.bind("room:state", (data: any) => {
      console.debug("Pusher evt room:state");
      emitLocal("room:state", data);
    });
    channel.bind("round:setup", (data: any) => {
      console.debug("Pusher evt round:setup");
      emitLocal("round:setup", data);
    });
    channel.bind("round:start", (data: any) => {
      console.debug("Pusher evt round:start");
      emitLocal("round:start", data);
    });
    channel.bind("round:over", (data: any) => {
      console.debug("Pusher evt round:over");
      emitLocal("round:over", data);
    });
  }

  function emitLocal<K extends keyof ServerEvents>(ev: K, data: any) {
    const set = listeners.get(ev as string);
    if (!set) return;
    set.forEach((cb) => {
      try {
        (cb as any)(data);
      } catch {}
    });
  }

  const apiBase = baseUrl;

  async function post(path: string, body: any) {
    try {
      const res = await fetch(`${apiBase}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (e) {
      emitLocal("room:error", "Connexion au serveur impossible");
      throw e;
    }
  }

  const sock: RoomSocket = {
    id,
    on(event, cb) {
      let set = listeners.get(event as string);
      if (!set) {
        set = new Set();
        listeners.set(event as string, set);
      }
      set.add(cb as any);
    },
    off(event, cb) {
      const set = listeners.get(event as string);
      if (set) set.delete(cb as any);
    },
    emit(event, payload, cb) {
      switch (event) {
        case "room:create": {
          post(`/api/room/create`, { ...payload, clientId: id }).then((res) => {
            if (res?.code) subscribeTo(res.code);
            if (res?.state) emitLocal("room:state", res.state);
            cb && cb(res);
          });
          break;
        }
        case "room:join": {
          post(`/api/room/join`, { ...payload, clientId: id }).then((res) => {
            if (res?.state?.code) subscribeTo(res.state.code);
            if (res?.state) emitLocal("room:state", res.state);
            cb && cb(res);
          });
          break;
        }
        case "room:start": {
          if (!currentCode) return;
          post(`/api/room/start`, { code: currentCode, clientId: id });
          break;
        }
        case "room:ready": {
          if (!currentCode) return;
          post(`/api/room/ready`, { code: currentCode, clientId: id });
          break;
        }
        case "room:next": {
          if (!currentCode) return;
          post(`/api/room/next`, { code: currentCode, clientId: id });
          break;
        }
        case "room:next-auto": {
          if (!currentCode) return;
          post(`/api/room/next-auto`, { code: currentCode });
          break;
        }
        case "player:navigate": {
          if (!currentCode) return;
          post(`/api/player/navigate`, {
            code: currentCode,
            clientId: id,
            ...payload,
          });
          break;
        }
      }
    },
    disconnect() {
      if (channel) {
        channel.unbind_all();
        pusher?.unsubscribe(channel.name);
      }
      listeners.clear();
    },
  };

  // expose as global module singleton, preserving previous API
  // so imports that use `socket.emit(...)` work after initialization
  // App.tsx calls connectSocket on mount
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  socket = sock as any;
  return sock;
}

export let socket = null as unknown as RoomSocket;
