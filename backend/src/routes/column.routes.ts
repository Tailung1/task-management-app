import { Router } from "express";

const router = Router();

router.get("/boards/:boardId/columns");
router.post("/boards/:boardId/columns");
router.patch("/columns/:columnId");
router.delete("/columns/:columnId");

export default router;
