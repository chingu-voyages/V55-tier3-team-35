import type { Request, Response, NextFunction } from 'express';
import jwt, { type JWTPayload } from 'jsonwebtoken';

import { env } from '../schemas/env';

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({
        error: 'Access denied. No token provided.',
      });
      return;
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JWTPayload;

    if (!decoded.userId || !decoded.username) {
      res.status(401).json({
        error: 'Invalid token payload.',
      });
      return;
    }

    req.user = {
      id: decoded.userId,
      username: decoded.username,
      iat: decoded.iat,
      exp: decoded.exp,
    };

    next();
  } catch {
    res.status(401).json({ error: 'Invalid token.' });
    return;
  }
};

export default requireAuth;
