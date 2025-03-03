import { Router } from "express";

import { signUp } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signUp);

export default router;
