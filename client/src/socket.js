import { io } from "socket.io-client";
export let socket;
export function connectSocket(baseUrl) {
    socket = io(baseUrl, { transports: ["websocket"] });
    return socket;
}
