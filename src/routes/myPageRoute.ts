import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken";
import { getMyBoardsController } from "../controllers/myPageController";

const router = Router();

router.get("/boards", authenticateToken, getMyBoardsController);

module.exports = router;
