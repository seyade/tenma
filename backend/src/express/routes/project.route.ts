import { Router } from "express";

import {
  getProjects,
  getOneProjectByUser,
  createProject,
  updateOneProject,
  deleteOneProject,
  getProjectsByUser,
} from "../controllers/project.controller";

const router = Router();

router.get("/", getProjects);
router.get("/:userId/explore", getProjectsByUser);
router.get("/:userId/explore/:projectId", getOneProjectByUser);
router.post("/:userId/explore", createProject);
router.patch("/:userId/explore/:projectId", updateOneProject);
router.delete("/:userId/explore/:projectId", deleteOneProject);

export default router;
