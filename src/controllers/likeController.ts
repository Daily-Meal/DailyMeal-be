import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { isLiked, toggleLike } from "../services/likeService";

export async function toggleLikeController(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const { boardId } = req.params;

    if (!userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const result = await toggleLike(userId, parseInt(boardId));
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred" });
  }
}

export async function isLikedController(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const { boardId } = req.params;

    if (!userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const liked = await isLiked(userId, parseInt(boardId));
    return res.status(StatusCodes.OK).json({ isLiked: liked });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred" });
  }
}
