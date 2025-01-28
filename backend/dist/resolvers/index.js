import bycrypt from "bcryptjs";
import { UserModel } from "../models/User.js";
const users = [
    {
        id: "1",
        email: "james.bond@agent007.io",
        username: "jamesbond",
        password: "whatever",
    },
    {
        id: "2",
        email: "goku@capsule.co",
        username: "goku",
        password: "kamehameha",
    },
];
export const resolvers = {
    Query: {
        users: async () => {
            try {
                const users = await UserModel.find().select("-password");
                return users;
            }
            catch (error) {
                throw new Error(`Fetching Users failed: ${error}`);
            }
        },
        user: async (_, { id }) => {
            try {
                const user = await UserModel.findById(id).select("-password");
                return user;
            }
            catch (error) {
                throw new Error(`Fetching the User failed: ${error}`);
            }
        },
    },
    Mutation: {
        registerUser: async (_, { userInput }, context) => {
            try {
                const hashPassword = await bycrypt.hash(userInput.password, 12);
                const user = await UserModel.create({
                    ...userInput,
                    password: hashPassword,
                });
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        },
    },
};
