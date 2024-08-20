/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { JwtPayload } from "jsonwebtoken";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "your_access_token_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret";
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export function generateAccessToken(userId: number) {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
}

export function generateRefreshToken(userId: number) {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new Error("Invalid access token");
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
}

export function extractUserIdFromPayload(payload: string | JwtPayload): number {
  if (typeof payload === "string") {
    throw new Error(
      "Invalid payload: expected an object but received a string.",
    );
  }

  const userId = payload.userId;
  if (userId == null) {
    throw new Error("User ID not found in the payload.");
  }

  const parsedUserId = parseAndValidateUserId(userId);
  return parsedUserId;
}

function parseAndValidateUserId(userId: any): number {
  const parsedUserId = Number(userId);
  if (isNaN(parsedUserId)) {
    throw new Error("User ID is not a valid number.");
  }
  return parsedUserId;
}
