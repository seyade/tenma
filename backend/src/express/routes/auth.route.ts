import { Router } from "express";

import { signUp, checkAuth, verifyEmail } from "../controllers/auth.controller";
import { verifyToken } from "../../middlewares";

const router = Router();

router.post("/auth-check", verifyToken, checkAuth);
router.post("/signup", signUp);
router.post("/verify-email", verifyEmail);

export default router;
