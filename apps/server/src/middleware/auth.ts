import type { Request, Response, NextFunction } from 'express';
import jwt, { type JWTPayload } from 'jsonwebtoken';

import { env } from '../schemas/env';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        error: 'Access denied. No token provided.',
      });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JWTPayload;

    if (!decoded.userId || !decoded.username) {
      return res.status(401).json({
        error: 'Invalid token payload.',
      });
    }

    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      iat: decoded.iat,
      exp: decoded.exp,
    };

    next();
  } catch {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

export default requireAuth;
