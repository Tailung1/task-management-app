import { Router } from "express";
import { createLoginController, registerController } from "../controllers/auth.controller.js";

export function createAuthRouter(config: { jwtSecret: string }) {
  const router = Router();

  router.post("/register", registerController);
  router.post("/login", createLoginController(config.jwtSecret));

  return router;
}
