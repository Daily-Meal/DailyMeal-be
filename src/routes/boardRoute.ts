import { Router } from "express";
import {
  createBoardController,
  deleteBoardController,
  getBoardsByUserController,
  getBoardsController,
  isLikedController,
  toggleLikeController,
  updateBoardController,
} from "../controllers/boardController";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.post("/", authenticateToken, createBoardController);
router.get("/", getBoardsController);
router.put("/:boardId", authenticateToken, updateBoardController);
router.delete("/:boardId", authenticateToken, deleteBoardController);
router.get("/users/:userId", getBoardsByUserController);
router.post("/:boardId/like", authenticateToken, toggleLikeController);
router.get("/:boardId/isLiked", authenticateToken, isLikedController);

module.exports = router;
