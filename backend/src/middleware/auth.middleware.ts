import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { AppConfig } from "../config.js";
import { isUuid } from "../utils/request.validation.js";
import { findAuthTokenVersion } from "../db/queries/auth.query.js";

export const createAuthenticate = (jwtSecret: AppConfig["jwtSecret"]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let decoded: string | jwt.JwtPayload;
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

      decoded = jwt.verify(token, jwtSecret, { algorithms: ["HS256"] });
    } catch {
      res.status(401).json({
        message: "Invalid or expired token",
      });
      return;
    }

    if (
      typeof decoded !== "object" ||
      !isUuid(decoded.userId) ||
      typeof decoded.authTokenVersion !== "number" ||
      !Number.isSafeInteger(decoded.authTokenVersion) ||
      decoded.authTokenVersion < 0
    ) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    try {
      const currentVersion = await findAuthTokenVersion(decoded.userId);
      if (currentVersion === null || decoded.authTokenVersion !== currentVersion) {
        res.status(401).json({ message: "Invalid or expired token" });
        return;
      }

      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      next(error);
    }
  };
