import { Request, Response } from "express";
import { config } from "../../config";

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await config.prisma.project.findMany();
    res.status(200).json({ projects });
  } catch (error) {
    res.json({ message: `ERR_GETTING_PROJECTS::: ${error}` });
  }
};

export const getOneProjectByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  // TODO: get 1 project
  res.status(200).json({ message: "Ten.ma 1 Project here" });
};

export const getProjectsByUser = async () => {};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  // TODO: create a project
  res.status(200).json({ message: "Ten.ma create a Project here" });
};

export const updateOneProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  // TODO: update a project
  res.status(200).json({ message: "Ten.ma update 1 Project here" });
};

export const deleteOneProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  // TODO: delete a project
  res.status(200).json({ message: "Ten.ma delete 1 Project here" });
};
