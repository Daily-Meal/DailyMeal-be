import { Router } from "express";
import { join, login, logout, refresh } from "../controllers/authController";

const router = Router();

router.post("/join", join);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);

module.exports = router;
