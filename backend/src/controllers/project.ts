import { Request, Response } from "express";

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  // TODO: get all projects
  res.status(200).json({ message: "Tenma all Projects here" });
};

export const getOneProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  // TODO: get 1 project
  res.status(200).json({ message: "Tenma 1 Project here" });
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  // TODO: create a project
  res.status(200).json({ message: "Tenma create a Project here" });
};

export const updateOneProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  // TODO: update a project
  res.status(200).json({ message: "Tenma update 1 Project here" });
};

export const deleteOneProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  // TODO: delete a project
  res.status(200).json({ message: "Tenma delete 1 Project here" });
};
