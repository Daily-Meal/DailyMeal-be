import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  joinUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../services/authService";

export async function join(req: Request, res: Response) {
  const { email, nickname, password } = req.body;
  try {
    // 사용자 가입
    const user = await joinUser(email, nickname, password);

    // 가입 후 자동 로그인하여 토큰 생성
    const { accessToken, refreshToken } = await loginUser(email, password);

    // 성공 응답 반환
    res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "An unknown error occurred" });
    }
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const { accessToken, refreshToken } = await loginUser(email, password);
    res.status(StatusCodes.OK).json({ accessToken, refreshToken });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "An unknown error occurred" });
    }
  }
}

export async function logout(req: Request, res: Response) {
  const userId = req.body.userId;
  try {
    await logoutUser(userId);
    res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "An unknown error occurred" });
    }
  }
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;
  try {
    const { accessToken } = await refreshAccessToken(refreshToken);
    res.status(StatusCodes.OK).json({ accessToken });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(StatusCodes.FORBIDDEN).json({ error: error.message });
    } else {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: "An unknown error occurred" });
    }
  }
}
