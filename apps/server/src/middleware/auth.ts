import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (typeof decoded === 'string') {
      return res.status(400).json({ error: 'Invalid token format.' });
    }

    // Set the user information in the request object for access in the controller
    req.user = {
      userId: decoded.userId as number,
      username: decoded.username as string,
      iat: decoded.iat!,
      exp: decoded.exp!,
    };
    next();
  } catch {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

export default requireAuth;
