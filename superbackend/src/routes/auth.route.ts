import { Router } from "express";
import {
  refreshController,
  registerController,
  sessionByIdController,
  sessionsByUserIdController,
  sessionsController,
  signInController,
  signOutController,
} from "../controllers/auth.controller";
import config from "../config";

const router = Router();

router.post("/register", registerController);
router.post("/signin", signInController);
router.get("/signout", signOutController);
router.get("/refresh", refreshController);
router.get("/session", sessionsController);
router.get("/session/:id", sessionByIdController);
router.get("/session/user/:userId", sessionsByUserIdController);

export default router;
