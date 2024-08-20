import { Router } from "express";
import {
  createBoardController,
  updateBoardController,
} from "../controllers/boardController";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.post("/", authenticateToken, createBoardController);
router.put("/:boardId", authenticateToken, updateBoardController);

module.exports = router;
