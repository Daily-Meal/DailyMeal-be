import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken";
import {
  getMyBoardsController,
  getMyLikeBoardsController,
} from "../controllers/myPageController";

const router = Router();

router.get("/boards", authenticateToken, getMyBoardsController);
router.get("/likes", authenticateToken, getMyLikeBoardsController);

module.exports = router;
