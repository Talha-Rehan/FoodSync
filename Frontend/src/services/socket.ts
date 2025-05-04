import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL, {
  path: "/socket.io",
  transports: ["websocket"], // ensure direct WebSocket connection
  withCredentials: true
});

export default socket;