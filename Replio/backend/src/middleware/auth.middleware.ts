import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "../utils/jwt";
import { verifyToken } from "../utils/jwt";
import { AuthenticationError } from "../utils/errors";
import { logger } from "../utils/logger";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      throw new AuthenticationError("No authentication token provided");
    }

    const payload = verifyToken(token);
    req.user = payload;

    logger.debug(
      {
        userId: payload.userId,
        email: payload.email,
        path: req.path,
      },
      "User authenticated",
    );

    next();
  } catch (error) {
    logger.error({ error, path: req.path }, "Authentication failed");
    throw new AuthenticationError();
  }
}
