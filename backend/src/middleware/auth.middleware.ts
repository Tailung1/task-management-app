import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { AppConfig } from "../config.js";
import { isUuid } from "../utils/request.validation.js";

export const createAuthenticate = (jwtSecret: AppConfig["jwtSecret"]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        res.status(401).json({
          message: "Authentication required",
        });
        return;
      }

      const [scheme, token, extra] = authHeader.split(" ");

      if (scheme !== "Bearer" || !token || extra) {
        res.status(401).json({
          message: "Invalid authorization header",
        });
        return;
      }

      const decoded = jwt.verify(token, jwtSecret, { algorithms: ["HS256"] });

      if (typeof decoded !== "object" || !isUuid(decoded.userId)) {
        res.status(401).json({ message: "Invalid or expired token" });
        return;
      }

      req.user = { id: decoded.userId };
      next();
    } catch {
      res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  };
