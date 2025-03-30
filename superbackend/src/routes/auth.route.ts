import { Router } from "express";
import {
  refreshController,
  registerController,
  sessionController,
  signInController,
  signOutController,
} from "../controllers/auth.controller";
import config from "../config";

const router = Router();

router.post("/register", registerController);
router.post("/signin", signInController);
router.get("/signout", signOutController);
router.get("/refresh", refreshController);
router.get("/sessions", sessionController);

router.get("/users", async (req, res, next): Promise<any> => {
  try {
    const users = await config.prisma.user.findMany();
    return res.status(200).json({
      ...users,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
