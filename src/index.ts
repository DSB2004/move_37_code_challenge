import { app } from "./app";
import { PORT } from "./config";
import http from "http";
import { Express } from "express";
import { initSocket } from "./socket";

const serve = (app: Express) => {
  const server = http.createServer(app);
  initSocket(server);
  server.listen(PORT, () => {
    console.info(`Server running on ${PORT}`);
  });
};

serve(app);
