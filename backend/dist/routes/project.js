import { Router } from "express";
import { getProjects, getOneProject, createProject, updateOneProject, deleteOneProject, } from "../controllers/project";
const router = Router();
router.get("/", getProjects);
router.get("/", getOneProject);
router.post("/", createProject);
router.patch("/", updateOneProject);
router.delete("/", deleteOneProject);
