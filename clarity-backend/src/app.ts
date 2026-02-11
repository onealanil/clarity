/**
 * @file app.ts
 * @description: This file is the entry point for the Express application. It sets up the server, middleware, and routes.
 * It also handles errors and unhandled promise rejections.
* @author Anil Bhandari
 */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import { notFoundHandler } from "./utils/notFound.error";
import { errorHandler } from "./utils/errorHandler";
import userRoute from "../src/domains/user/routes/user.route";
import helmet from "helmet";

const app = express();

app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Cache-Control"
  ],
};

// ---------- Handling CORS Issue --------------------
app.use(cors(corsOptions));

/**
 * Add headers manually as backup
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

/**
 * Other necessary Package 
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

// --------------- Routes -------------------
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Clarity API");
})

//Auth --> user
app.use("/api/v1", userRoute)

//handle not found routes
app.use(notFoundHandler);

app.use(errorHandler);


export default app;
