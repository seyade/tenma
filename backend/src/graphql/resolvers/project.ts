import { config } from "../../config";

const projectResolver = {
  Project: {},
  Query: {
    projects: async () => {
      try {
        return await config.prisma.project.findMany();
      } catch (error: any) {
        throw new Error(`ERROR_GET_PROJECTS: ${error}`);
      }
    },
    project: async (_: any, { id }) => {
      try {
        const project = await config.prisma.project.findUnique({
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
