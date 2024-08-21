import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getMyBoards } from "../services/myPageService";

const DEFAULT_LIMIT = 8;
const DEFAULT_OFFSET = 0;

export async function getMyBoardsController(req: Request, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized: Access token is missing or invalid." });
    }

    const limit = parseInt(req.query.limit as string, 10) || DEFAULT_LIMIT;
    const offset = parseInt(req.query.offset as string, 10) || DEFAULT_OFFSET;

    const { boards, total } = await getMyBoards(
      userId,
      limit,
      offset,
    );

    return res.status(StatusCodes.OK).json({
      isSuccess: true,
      boards,
      pagination: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: "Failed to fetch boards by user",
    });
  }
}
