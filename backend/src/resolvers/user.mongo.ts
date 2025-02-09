import bycrypt from "bcryptjs";
import { UserDocument, UserModel, UserInput } from "../models/User.js";

const usersListSample = [
  {
    id: "1",
    email: "james.bond@agent007.io",
    username: "jamesbond",
    password: "licensetokill",
  },
  {
    id: "2",
    email: "goku@capsule.co",
    username: "goku",
    password: "kamehameha",
  },
];

const userResolver = {
  Query: {
    users: async () => {
      try {
        const users = await UserModel.find().select("-password");
        return users;
      } catch (error: any) {
        throw new Error(`Fetching Users failed: ${error}`);
      }
    },
    user: async (_: any, { id }: { id: string }) => {
      try {
        const user = await UserModel.findById(id).select("-password");
        return user;
      } catch (error: any) {
        throw new Error(`Fetching the User failed: ${error}`);
      }
    },
  },
  Mutation: {
    registerUser: async (
      _: any,
      { userInput }: { userInput: UserInput },
      context: any
    ): Promise<UserDocument> => {
      try {
        const hashPassword = await bycrypt.hash(userInput.password, 12);
        const user = await UserModel.create({
          ...userInput,
          password: hashPassword,
        });
        return user;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};

export default userResolver;
