import { Router } from "express";
import {
  createBoardController,
  deleteBoardController,
  getBoardsController,
  updateBoardController,
} from "../controllers/boardController";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.post("/", authenticateToken, createBoardController);
router.get("/", getBoardsController);
router.put("/:boardId", authenticateToken, updateBoardController);
router.delete("/:boardId", authenticateToken, deleteBoardController);

module.exports = router;
