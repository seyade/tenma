import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { config } from "../../config";
import { users } from "../../utils/mocks/users";

type User = {
  userId: string;
  name: string;
  password: string;
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await config.prisma.user.findMany();
    res.status(200).json({ users });
  } catch (error) {
    console.log(`ERR_LISTING_USERS: ${error}`);
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  const {
    email = "shank@onepiece.com",
    userId = "7f214693-64ca-4019-b3c0-13ee9d587622",
  } = req.body;

  try {
    const user = await config.prisma.user.findUnique({
      where: {
        email,
        userId,
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    console.log(`ERR_FINDING_USER: ${error}`);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { userId, name, password } = req.body;

  try {
    const newUser: User = {
      userId,
      name,
      password: await bcrypt.hash(password, 10),
    };
    users.push(newUser);
    res.status(201).json({ message: "New user created successfully", newUser });
  } catch (error) {
    throw new Error(`ERR_CREATING_USER:: ${error}`);
  }
};

export const updateUser = async () => {};

export const deleteUser = async () => {};
