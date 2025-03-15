import { Router } from "express";
import { register } from "module";
import { registerController } from "../controllers/auth.controller";

const router = Router();

const authRoutes = null;

router.post("/register", registerController);

export default router;
