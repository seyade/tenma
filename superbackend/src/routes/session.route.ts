import { Router } from "express";
import {
  getSessionsController,
  getSessionByIdController,
  getSessionsByUserIdController,
  getCurrentUserSessionController,
  deleteSessionController,
} from "../controllers/session.controller";

const router = Router();

router.get("/", getSessionsController);
router.get("/:id", getSessionByIdController);
router.get("/user/:userId", getSessionsByUserIdController);
router.get("/user/:userId/current", getCurrentUserSessionController);
router.delete("/delete/:id", deleteSessionController);

export default router;
