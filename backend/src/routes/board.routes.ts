import { Router } from "express";

const router = Router();

router.get("/");
router.get("/:boardId");
router.post("/");
router.patch("/:boardId");
router.delete("/:boardId");

export default router;
