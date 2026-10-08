import express from "express";
import authRouter from "./routes/auth.routes.js";
import boardRouter from "./routes/board.routes.js";
import columnRouter from "./routes/column.routes.js";
import taskRouter from "./routes/task.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/boards", boardRouter);
app.use("/api", columnRouter);
app.use("/api", taskRouter);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Kanban API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
