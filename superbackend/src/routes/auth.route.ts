import { Router } from "express";
import {
  refreshController,
  registerController,
  signInController,
  signOutController,
} from "../controllers/auth.controller";
import config from "../config";

const router = Router();

router.post("/register", registerController);
router.post("/signin", signInController);
router.get("/signout", signOutController);
router.get("/refresh", refreshController);

export default router;
