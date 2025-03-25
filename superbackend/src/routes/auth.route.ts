import { Router } from "express";
import {
  refreshController,
  registerController,
  sessionController,
  signInController,
  signOutController,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerController);
router.post("/signin", signInController);
router.get("/signout", signOutController);
router.get("/refresh", refreshController);
router.get("/sessions", sessionController);

export default router;
