import bycrypt from "bcryptjs";
import { UserDocument, UserModel, UserInput } from "../models/User.js";

export const resolvers = {
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
