// Extend the Request interface to include user information for middleware
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string | number;
        username: string;
        iat: number;
        exp: number;
      };
    }
  }
}

export {};
