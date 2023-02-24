import * as dotenv from "dotenv";
import { logger } from "./logging";
dotenv.config();

import { Server } from "./server";
import { FileStorage } from "./storage/file";
import { createRedisStorage } from "./storage/redis";

(async () => {
  const storage = process.env.REDIS_URL
    ? await createRedisStorage()
    : new FileStorage();

  const server = new Server(storage);
  server.start();

  process.on("exit", () => server.stop());

  logger.info("Server started");
})();
