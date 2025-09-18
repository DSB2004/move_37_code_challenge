import { Server } from "socket.io";
import http from "http";

let io: Server | null = null;

export const initSocket = (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    const pollId = socket.handshake.query.poll;
    if (!pollId || typeof pollId !== "string") {
      console.warn("[WEBSOCKET] Client missing poll id");
      socket.emit("error", {
        message: "poll is missing as query param in url",
      });
      socket.disconnect();
      return;
    }
    console.info("[WEBSOCKET] Client connected:", socket.id, pollId);
    socket.join(pollId);
    socket.on("disconnect", () => {
      console.info("[WEBSOCKET] Client disconnected", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized yet");
  }
  return io;
};

export const publish = ({
  pollId,
  data,
  event,
}: {
  event: string;
  pollId: string;
  data: any;
}) => {
  const io = getIO();

  io.to(pollId).emit(event, {
    pollId,
    data,
  });
};
