import { Router } from "express";
import { checkEmail, checkNickname } from "../controllers/checkController";

const router = Router();

router.get("/email", checkEmail);
router.get("/nickname", checkNickname);

module.exports = router;
