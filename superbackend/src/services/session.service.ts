import config from "../config";

export const getSessions = async () => {
  try {
    const sessions = await config.prisma.session.findMany();
    return sessions;
  } catch (error) {
    throw new Error(`Failed to fetch sessions: ${error}`);
  }
};

export const getSessionById = async (id: number) => {
  try {
    const session = await config.prisma.session.findFirst({
      where: { id },
    });
    return session;
  } catch (error) {
    throw new Error(`Failed to fetch session: ${error}`);
  }
};

export const getSessionsByUserId = async (userId: string) => {
  try {
    const userSessions = await config.prisma.session.findMany({
      where: { userId },
    });

    return userSessions;
  } catch (error) {
    throw new Error(`Failed to fetch user sessions: ${error}`);
  }
};

export const getCurrentUserSession = async (userId: string) => {
  try {
    const currentSession = await config.prisma.session.findFirst({
      where: { userId, expiresAt: { gt: new Date() } },
    });
    return currentSession;
  } catch (error) {
    throw new Error(`Failed to fetch sessions: ${error}`);
  }
};

export const deleteSession = async (id: number, userId: string) => {
  try {
    const deletedSession = await config.prisma.session.delete({
      where: { id, userId },
    });
    return deletedSession;
  } catch (error) {
    throw new Error(`Failed to fetch sessions: ${error}`);
  }
};
