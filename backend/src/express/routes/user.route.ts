import { Router } from "express";
import {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} from "../controllers/user.controller";
import { authenticate } from "../../middlewares";

const router = Router();

router.get("/", getUsers);
router.post("/create", createUsers);
router.post("/edit", updateUsers);
router.post("/remove", deleteUsers);

export default router;
