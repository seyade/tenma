import { Request, Response, NextFunction } from "express";
import {
  deleteSessionController,
  getCurrentUserSessionController,
  getSessionByIdController,
  getSessionsByUserIdController,
  getSessionsController,
} from "../src/controllers/session.controller";
import * as sessionServices from "../src/services/session.service";
import * as manageCookies from "../src/utils/manageCookies";

jest.mock("../src/services/session.service");
jest.mock("../src/utils/manageCookies");
jest.mock("../src/utils/manageAccessTokens");
jest.mock("../src/utils/appAssert");
jest.mock("../src/config", () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    session: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Session Controllers", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  const REFRESH_API_PATH = "/api/auth/refresh";

  const mockCookiesService = {
    user: { id: "112233-4455", email: "uneet@testeen.ai", username: "uneet" },
    accessToken: "encrypted-access-token",
    refreshToken: "encrypted-refresh-token",
  };

  beforeEach(() => {
    mockReq = {
      body: {},
      headers: {},
      cookies: {},
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks();

    (manageCookies.setAccessTokenCookieOptions as jest.Mock).mockReturnValue({
      httpOnly: true,
    });
    (manageCookies.setRefreshTokenCookieOptions as jest.Mock).mockReturnValue({
      httpOnly: true,
      path: REFRESH_API_PATH,
    });
  });

  describe("User Sessions", () => {
    const mockSessions = [
      {
        id: 1,
        userId: "112233-4455",
        userAgent: "PostmanRuntime/7.43.2",
        createdAt: new Date(),
        expiresAt: new Date(),
      },
      {
        id: 2,
        userId: "667788-9900",
        userAgent: "PostmanRuntime/7.43.2",
        createdAt: new Date(),
        expiresAt: new Date(),
      },
    ];

    beforeEach(() => {
      jest.clearAllMocks();

      mockReq = {
        params: {
          id: "1",
          userId: "112233-4455",
        },
      };
    });

    it("should fetch all existing sessions", async () => {
      (sessionServices.getSessions as jest.Mock).mockResolvedValue(
        mockSessions
      );

      await getSessionsController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(sessionServices.getSessions).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ sessions: mockSessions });
    });

    it("should fetch a session by ID", async () => {
      (sessionServices.getSessionById as jest.Mock).mockResolvedValue(
        mockSessions
      );

      await getSessionByIdController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(sessionServices.getSessionById).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockSessions);
    });

    // left for now. Need to work on the controller first
    it("should fetch all existing sessions by user ID", async () => {
      (sessionServices.getSessionsByUserId as jest.Mock).mockResolvedValue(
        mockSessions
      );

      await getSessionsByUserIdController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );
      expect(sessionServices.getSessionsByUserId).toHaveBeenCalledWith(
        "112233-4455"
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockSessions);
    });

    it("should fetch current session by user", async () => {
      (sessionServices.getCurrentUserSession as jest.Mock).mockResolvedValue(
        mockSessions[0]
      );

      await getCurrentUserSessionController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );
      expect(sessionServices.getCurrentUserSession).toHaveBeenCalledWith(
        "112233-4455"
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockSessions[0]);
    });

    it("should delete a session by ID", async () => {
      (sessionServices.deleteSession as jest.Mock).mockResolvedValue(
        mockSessions[0]
      );

      await deleteSessionController(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(sessionServices.deleteSession).toHaveBeenCalledWith(
        mockSessions[0].id,
        mockReq.userId
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Session is removed.",
      });
    });

    describe("Sessions Services Failures", () => {
      it("should throw an error when fetching all sessions fails", async () => {
        (sessionServices.getSessions as jest.Mock).mockRejectedValue(
          expect.any(Object)
        );

        await getSessionsController(
          mockReq as Request,
          mockRes as Response,
          mockNext
        );

        expect(mockRes.status).not.toHaveBeenCalledWith(200);
        expect(mockRes.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(expect.any(Object));
      });

      it("should throw an error when fetching a session by ID fails", async () => {
        (sessionServices.getSessionById as jest.Mock).mockRejectedValue(
          expect.any(Object)
        );

        await getSessionByIdController(
          mockReq as Request,
          mockRes as Response,
          mockNext
        );

        expect(mockRes.status).not.toHaveBeenCalledWith(200);
        expect(mockRes.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(expect.any(Object));
      });

      it("should throw an error when fetching all sessions by user ID fails", async () => {
        (sessionServices.getSessionsByUserId as jest.Mock).mockRejectedValue(
          expect.any(Object)
        );

        await getSessionsByUserIdController(
          mockReq as Request,
          mockRes as Response,
          mockNext
        );

        expect(mockRes.status).not.toHaveBeenCalledWith(200);
        expect(mockRes.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(expect.any(Object));
      });
    });
  });
});
