import { Router } from "express";
import {
  getBoardsController,
  createBoardController,
  updateBoardController,
  deleteBoardController,
} from "../controllers/board.controller.js";

const router = Router();

router.get("/", getBoardsController);
router.post("/", createBoardController);
router.patch("/:boardId", updateBoardController);
router.delete("/:boardId", deleteBoardController);

export default router;
