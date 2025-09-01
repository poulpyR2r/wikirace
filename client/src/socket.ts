import { io, Socket } from "socket.io-client";
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

export let socket: Socket<ServerEvents, any>;

export function connectSocket(baseUrl: string) {
  socket = io(baseUrl, { transports: ["websocket"] });
  return socket;
}
