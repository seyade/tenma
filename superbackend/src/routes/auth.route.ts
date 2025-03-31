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

const router = Router();

router.post("/register", registerController);
router.post("/signin", signInController);
router.get("/signout", signOutController);
router.get("/refresh", refreshController);
router.get("/session", sessionsController);
router.get("/session/:id", sessionByIdController);
router.get("/session/:userId", sessionsByUserIdController);

export default router;
