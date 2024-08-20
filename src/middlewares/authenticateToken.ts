import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { extractUserIdFromPayload, verifyAccessToken } from "../utils/jwtUtils";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const accessToken = req.headers["authorization"];
    if (!accessToken) throw new Error("Unauthorized: Access token is missing.");

    const payload = verifyAccessToken(accessToken);
    const userId = extractUserIdFromPayload(payload);

    req.userId = userId;

    next();
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: error.message });
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "An unknown error occurred" });
    }
  }
}
