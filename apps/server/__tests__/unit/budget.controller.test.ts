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

// eslint-disable-next-line import/order
import createApp from '../../src/app/createApp';

vi.mock('../../src/services/budget.service.ts', () => {
  return {
    budgetService: {
      createBudget: vi.fn(),
    },
  };
});

import { budgetService } from '../../src/services/budget.service';
const app = createApp();
const TEST_END_POINT = '/api/v1/budgets';

describe('budget controller', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
  });

  it('should return 201 and successfully create new budget', async () => {
    const requestData = {
      category_id: 26,
      user_id: 23,
      budget_amount: 1700,
      month: 7,
      year: 2025,
    };

    (budgetService.createBudget as ReturnType<typeof vi.fn>).mockResolvedValue(
      requestData,
    );

    const response = await request(app).post(TEST_END_POINT).send(requestData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Budget created successfully');
    expect(budgetService.createBudget).toHaveBeenCalledExactlyOnceWith(
      requestData,
    );
  });

  it('should return 400 and correctly validate invalid input', async () => {
    // Arrange
    const invalidRequestData = {
      category_id: 26,
      user_id: 23,
      budget_amount: '1700', // should be number
      month: 7,
      year: 1995, // should be > 2025
    };

    const response = await request(app)
      .post(TEST_END_POINT)
      .send(invalidRequestData);

    // Assert
    expect(response.body.message).toBe('Invalid input');
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['year'],
          message: 'Number must be greater than or equal to 2025',
        }),
      ]),
    );
    expect(budgetService.createBudget).not.toHaveBeenCalled();
  });

  it('should return 400 and correctly validate missing fields', async () => {
    // Arrange
    const invalidRequestData = {
      category_id: 26,
      user_id: 23,
      budget_amount: 1700,
      month: 7,
      // year field is missing
    };

    const response = await request(app)
      .post(TEST_END_POINT)
      .send(invalidRequestData);

    // Assert
    expect(response.body.message).toBe('Invalid input');
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['year'],
          message: 'Required',
        }),
      ]),
    );
    expect(budgetService.createBudget).not.toHaveBeenCalled();
  });
});
