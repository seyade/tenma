import { Router } from "express";

import { signUp, checkAuth } from "../controllers/auth.controller";
import { verifyToken } from "../../middlewares";

const router = Router();

router.post("/auth-check", verifyToken, checkAuth);
router.post("/signup", signUp);

export default router;
