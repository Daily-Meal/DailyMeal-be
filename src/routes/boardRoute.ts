import { Router } from "express";
import { createBoardController } from "../controllers/boardController";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.post("/", authenticateToken, createBoardController);

export default router;
