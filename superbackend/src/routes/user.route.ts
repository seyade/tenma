import { Router } from "express";
import {
  getUserByIdController,
  getUsersController,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getUsersController);
router.get("/:userId", getUserByIdController);

export default router;
