import cookieParser from 'cookie-parser';
import type { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import { describe, it, expect } from 'vitest';

import createApp from '../../src/app/createApp';
import { logOutUser } from '../../src/controllers/auth.controller';

const mockRequireAuth = (req: Request, res: Response, next: NextFunction) => {
  next();
};

describe('logout user controller', () => {
  const app = createApp();
  app.use(cookieParser());
  app.post('/logout', mockRequireAuth, logOutUser);

  it('logout endpoint should clear JWT token and redirect back to /login', async () => {
    const res = await request(app)
      .post('/logout')
      .set('Cookie', ['token=abc123']);

    expect(res.status).toBe(302);
    expect(res.headers['location']).toBe('/api/v1/auth/login');

    const setCookie = res.headers['set-cookie'];
    expect(setCookie).toBeDefined();
    expect(setCookie?.[0]).toMatch(/^token=;/);
  });
});
