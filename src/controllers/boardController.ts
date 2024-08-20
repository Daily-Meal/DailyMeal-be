import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createBoard } from "../services/boardService";

export async function createBoardController(req: Request, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized: Access token is missing or invalid." });
    }

    const { category, mealType, image } = req.body;
    if (!category || !mealType) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Missing required fields: category or mealType.",
      });
    }

    const newBoard = await createBoard(userId, category, mealType, image);
    return res.status(StatusCodes.CREATED).json(newBoard);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: errorMessage });
  }
}
