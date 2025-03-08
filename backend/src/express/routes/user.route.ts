import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getOneUser,
} from "../controllers/user.controller";
import { authenticate } from "../../middlewares";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getOneUser);
router.post("/create", createUser);
router.patch("/:id/edit", updateUser);
router.post("/:id/remove", deleteUser);

export default router;
