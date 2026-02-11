import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();


const MONGO_URL = process.env.MONGO_CONNECTION_URL as string;

if (!MONGO_URL) {
    throw new Error("MONGO_URL is not defined.")
}

const connectionOptions: ConnectOptions = {
    maxPoolSize: 10,
    socketTimeoutMS: 30000,
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
    retryWrites: true,
    retryReads: true,
    heartbeatFrequencyMS: 10000,
}

let cachedConnection: typeof mongoose | null = null;

async function connectMongo(): Promise<typeof mongoose> {
    if (cachedConnection) {
        return cachedConnection;
    }
    try {
        if (process.env.NODE_ENV === "development") {
            mongoose.set("debug", true);
        }
        mongoose.connection.on("connected", () => {
            logger.info("Mongodb connected successfully!");
        })

        mongoose.connection.on("error", (err) => {
            logger.error("Mongodb connection error: ", err);
        })

        mongoose.connection.on("disconnected", () => {
            logger.warn("Mongodb disconnected");
        })

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            logger.info("Mongodb connection closed");
            process.exit(0);
        })

        const connection = await mongoose.connect(MONGO_URL, connectionOptions);
        cachedConnection = connection;
        return connection;

    } catch (error) {
        logger.error("Mongodb connection failed: ", error);
        throw error;
    }
}

export default connectMongo;