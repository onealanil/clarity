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
import expenseRoute from "../src/domains/expense/routes/expense.route";
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

//Expense
app.use("/api/v1/expenses", expenseRoute)

app.get('/api/v1/proxy-chat', async (req, res) => {
  const { prompt } = req.query as { prompt: string };

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  try {
    const pollinationsUrl = `https://text.pollinations.ai/${encodeURIComponent(prompt)}`;

    const response = await fetch(pollinationsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/plain,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch AI response: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();

    if (text.includes("IMPORTANT NOTICE") || text.includes("deprecated")) {
      throw new Error("API temporarily unavailable");
    }

    res.set({
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    });

    res.send(text);
  } catch (error) {
    console.error('Error proxying chat:', error);
    res.status(500).json({
      error: 'Failed to fetch AI response',
      details: error.message,
    });
  }
});

//handle not found routes
app.use(notFoundHandler);

app.use(errorHandler);


export default app;
