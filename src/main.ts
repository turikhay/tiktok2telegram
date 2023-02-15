import * as dotenv from "dotenv";
import { logger } from "./logging";
dotenv.config();

import { Server } from "./server";

const server = new Server();
server.start();

process.on("exit", () => server.stop());

logger.info("Server started");
