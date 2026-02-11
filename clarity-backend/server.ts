/**
 * Main server file for the application. [server.ts]
 * @author Anil Bhandari
 * @description This file sets up the server and it is main server Entry point.
 * @version 1.0.0
 */
import dotenv from "dotenv";

dotenv.config();

import app from "./src/app";

import connectMongo from './src/config/connection';
import logger from "./src/utils/logger";

const PORT = process.env.PORT || 8000;

export default app;

async function startServer() {
  try {
    await connectMongo();

    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });

    process.on("unhandledRejection", (err: Error) => {
      logger.error(`Unhandled Rejection: ${err.name}, ${err.message}`);
      server.close(() => {
        process.exit(1);
      });
    });

    process.on("SIGTERM", () => {
      logger.info("Server shutting down.");
      server.close(() => process.exit(0));
    });

  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
