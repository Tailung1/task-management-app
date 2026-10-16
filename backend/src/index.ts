import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import boardRouter from "./routes/board.routes.js";
import columnRouter from "./routes/column.routes.js";
import taskRouter from "./routes/task.routes.js";
import { createAuthenticate } from "./middleware/auth.middleware.js";
import { createAuthRouter } from "./routes/auth.routes.js";
import { loadConfig } from "./config.js";
import pool from "./db/pool.js";

const config = loadConfig();
const app = express();

app.disable("x-powered-by");
app.set("trust proxy", config.trustProxy);
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || config.clientOrigins.includes(origin)) {
        // Why i have !origin -->
        // Allow requests without an Origin header (e.g. curl/Postman),
        // because CORS is a browser security mechanism, not authentication.
        callback(null, true); // = allow this origin
        return;
      }
      callback(null, false);
    },
  }),
);
app.use(express.json({ limit: "64kb" })); // The limit is about the request body, not the entire HTTP request

const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many authentication attempts. Try again later." },
});

app.get("/api/health", async (_req, res, next) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "ok" });
  } catch (error) {
    next(error);
  }
});
const authenticate = createAuthenticate(config.jwtSecret);

app.use("/api/auth", authRateLimit, createAuthRouter(config));
app.use("/api/boards", authenticate, boardRouter);
app.use("/api", authenticate, columnRouter);
app.use("/api", authenticate, taskRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const status =
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
      ? error.status
      : 500;

  if (status >= 500) {
    console.error("Request failed", error);
  }

  if (status === 400) {
    res.status(400).json({ message: "Invalid JSON request body" });
    return;
  }
  if (status === 413) {
    res.status(413).json({ message: "Request body is too large" });
    return;
  }

  res.status(500).json({ message: "Internal server error" });
};
app.use(errorHandler);

const server = app.listen(config.port, () => {
  console.info(`API listening on port ${config.port}`);
});

let isShuttingDown = false;
function shutdown(signal: string) {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.info(`${signal} received; shutting down.`);
  server.close((error) => {
    if (error) {
      console.error("HTTP server shutdown failed", error);
      process.exitCode = 1;
    }
    void pool.end().catch((poolError: unknown) => {
      console.error("Database pool shutdown failed", poolError);
      process.exitCode = 1;
    });
  });
}

process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));

export default app;
