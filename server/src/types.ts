export type Player = {
  id: string; // socket id
  name: string;
  score: number;
  ready: boolean;
  clicks: number;
};

export type RoomStatus =
  | "lobby"
  | "countdown"
  | "playing"
  | "round_over"
  | "finished";

export type RoomState = {
  code: string;
  createdBy: string; // socket id (host)
  rounds: number; // nb de manches
  currentRound: number; // 1-indexed
  status: RoomStatus;
  players: Map<string, Player>; // socketId -> Player
  targetTitle?: string; // page cible (titre Wikipédia)
  startTitle?: string; // page de départ
  winnerId?: string;
  startedAt?: number; // ms epoch
  paths?: Map<string, string[]>; // per-player path for current round
  history?: Map<number, Map<string, string[]>>; // per-round paths
};

export type ServerToClient = {
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

export type ClientToServer = {
  "room:create": (
    payload: { name: string; rounds: number },
    cb: (res: { code: string }) => void
  ) => void;
  "room:join": (
    payload: { code: string; name: string },
    cb: (res: {
      ok: boolean;
      host: boolean;
      state?: PublicRoomState;
      error?: string;
    }) => void
  ) => void;
  "room:ready": () => void;
  "room:next": () => void; // host only to jump to next round if paused
  "player:navigate": (payload: { title: string }) => void;
};

export type PublicRoomState = {
  code: string;
  rounds: number;
  currentRound: number;
  status: RoomStatus;
  players: Array<{ id: string; name: string; score: number; ready: boolean }>;
  targetTitle?: string;
  startTitle?: string;
  winnerId?: string;
  hostId: string;
  // paths per player for the last finished round
  paths?: Record<string, string[]>;
  // full history of paths for each round
  history?: Record<number, Record<string, string[]>>;
};
