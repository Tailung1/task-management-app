import { Router } from "express";
import {
  createColumnController,
  updateColumnController,
  deleteColumnController,
} from "../controllers/column.controller.js";

const router = Router();

router.post("/boards/:boardId/columns", createColumnController);
router.patch("/columns/:columnId", updateColumnController);
router.delete("/columns/:columnId", deleteColumnController);

export default router;

