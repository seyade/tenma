import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getOneUser,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getOneUser);
router.post("/create", createUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
