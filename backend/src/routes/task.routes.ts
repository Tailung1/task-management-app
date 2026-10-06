import { Router } from "express";

const router = Router();

router.get("/columns/:columnId/tasks");
router.post("/columns/:columnId/tasks");
router.patch("/tasks/:taskId");
router.delete("/tasks/:taskId");

export default router;
