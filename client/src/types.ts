export type PublicRoomState = {
  code: string;
  rounds: number;
  currentRound: number;
  status: "lobby" | "countdown" | "playing" | "round_over" | "finished";
  players: Array<{ id: string; name: string; score: number; ready: boolean }>;
  targetTitle?: string;
  startTitle?: string;
  winnerId?: string;
  hostId: string;
  paths?: Record<string, string[]>;
  history?: Record<number, Record<string, string[]>>;
};
