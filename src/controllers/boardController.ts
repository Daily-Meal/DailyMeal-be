import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createBoard,
  deleteBoard,
  getBoards,
  updateBoard,
} from "../services/boardService";

const DEFAULT_LIMIT = 8;
const DEFAULT_OFFSET = 0;

export async function createBoardController(req: Request, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized: Access token is missing or invalid." });
    }

    const { category, mealType, image, meals, tags } = req.body;

    if (!category || !mealType || !meals || !tags) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Missing required fields.",
      });
    }

    const newBoard = await createBoard(
      userId,
      category,
      mealType,
      image,
      meals,
      tags,
    );
    return res.status(StatusCodes.CREATED).json(newBoard);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: errorMessage });
  }
}

export async function getBoardsController(req: Request, res: Response) {
  try {
    const { category } = req.query;
    const limit = parseInt(req.query.limit as string, 10) || DEFAULT_LIMIT;
    const offset = parseInt(req.query.offset as string, 10) || DEFAULT_OFFSET;

    const { boards, total } = await getBoards(
      category as string,
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
      message: "Failed to fetch boards",
    });
  }
}

export async function updateBoardController(req: Request, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized: Access token is missing or invalid." });
    }

    const { category, mealType, image } = req.body;

    const { boardId } = req.params;
    const parsedBoardId = parseInt(boardId);
    if (isNaN(parsedBoardId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid board ID." });
    }

    const updatedBoard = await updateBoard(
      userId,
      parsedBoardId,
      category,
      mealType,
      image,
    );

    return res.status(StatusCodes.OK).json(updatedBoard);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: errorMessage });
  }
}

export async function deleteBoardController(req: Request, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized: Access token is missing or invalid." });
    }

    const { boardId } = req.params;
    const parsedBoardId = parseInt(boardId);
    if (isNaN(parsedBoardId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid board ID." });
    }

    const result = await deleteBoard(userId, parsedBoardId);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: errorMessage });
  }
}
