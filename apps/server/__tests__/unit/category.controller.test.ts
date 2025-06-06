/* eslint-disable import/order */
import request from 'supertest';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/middleware/auth.ts', () => {
  return {
    // This defines the default export of the mocked module
    default: vi.fn((req, res, next) => {
      // auth.ts uses `req.user`, so mock that property
      req.user = {
        userId: 123, // Match the type expected (e.g., number)
        username: 'mockuser',
        iat: Date.now() / 1000,
        exp: Date.now() / 1000 + 3600, // Example expiration
      };
      next(); // Bypass the actual authentication logic
    }),
  };
});

import createApp from '../../src/app/createApp';
vi.mock('../../src/services/category.service.ts', () => {
  return {
    categoryService: {
      getUserCategories: vi.fn(),
    },
  };
});

import { categoryService } from '../../src/services/category.service.ts';
import requireAuth from '../../src/middleware/auth.ts';

const app = createApp();
const TEST_END_POINT = '/api/v1/categories/user';

describe('Category controller', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
  });

  it('should return 400 when user Id is missing in request params', async () => {
    const invalidUserId = 'abc'; // Non-numeric user ID
    const response = await request(app).get(
      `${TEST_END_POINT}/${invalidUserId}`,
    );

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid user ID format');
  });

  it('should return 200 and a list of categories when user Id is valid', async () => {
    const userId = 123;
    const mockCategories = [
      { name: 'Rent', id: 1 },
      { name: 'Groceries', id: 2 },
    ];

    (
      categoryService.getUserCategories as ReturnType<typeof vi.fn>
    ).mockReturnValue(mockCategories);

    const response = await request(app)
      .get(`${TEST_END_POINT}/${userId}`)
      .set('Authorization', 'Bearer MOCKED_JWT_TOKEN');

    expect(response.status).toBe(200);
    expect(response.body.data).toStrictEqual(mockCategories);
    expect(categoryService.getUserCategories).toHaveBeenCalledWith(userId);
    expect(requireAuth).toHaveBeenCalled();
  });
});
