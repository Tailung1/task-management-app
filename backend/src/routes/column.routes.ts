import { Router } from "express";
import { createColumnController } from "../controllers/column.controller.js";

const router = Router();

router.post("/boards/:boardId/columns", createColumnController);

export default router;
