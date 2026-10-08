import { Router } from "express";
import {
  createTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/task.controller.js";

const router = Router();

router.post("/columns/:columnId/tasks", createTaskController);
router.patch("/tasks/:taskId", updateTaskController);
router.delete("/tasks/:taskId", deleteTaskController);

export default router;

