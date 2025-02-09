import { prisma } from "../config";

const projectResolver = {
  Project: {},
  Query: {
    projects: async () => {
      try {
        return await prisma.project.findMany();
      } catch (error: any) {
        throw new Error(`ERROR_GET_PROJECTS: ${error}`);
      }
    },
    project: async (_: any, { id }) => {
      try {
        const project = await prisma.project.findUnique({
          where: id,
        });
        return project;
      } catch (error: any) {
        throw new Error(`ERROR_GET_PROJECT: ${error}`);
      }
    },
  },

  Mutation: {},
};

export default projectResolver;
