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

vi.mock('../../src/services/transaction.service.ts', () => {
  return {
    transactionService: {
      createTransaction: vi.fn(),
    },
  };
});

import { transactionService } from '../../src/services/transaction.service';

// eslint-disable-next-line import/order
import Decimal from 'decimal.js';

const app = createApp();
const TEST_END_POINT = '/api/v1/transactions';

describe('transaction controller', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
  });

  it('should return 201 and successfully create new transaction', async () => {
    // Arrange
    const rawRequestData = {
      name: 'bubble tea',
      category_id: 1,
      transaction_type_id: 1,
      amount: '3.99',
      user_id: 23,
      transaction_date: '2025-06-03T00:24:36.121Z',
      notes: '',
    };

    const validData = {
      ...rawRequestData,
      amount: new Decimal('3.99'),
      transaction_date: new Date('2025-06-03T00:24:36.121Z'),
    };

    (
      transactionService.createTransaction as ReturnType<typeof vi.fn>
    ).mockResolvedValue(validData);

    // Act
    const response = await request(app)
      .post(TEST_END_POINT)
      .send(rawRequestData)
      .expect(201);

    // Assert
    expect(response.body.message).toBe('Transaction created successfully');
    expect(transactionService.createTransaction).toHaveBeenCalledTimes(1);
    expect(transactionService.createTransaction).toHaveBeenCalledWith(
      validData,
    );
  });

  it('should return 400 and correctly validate invalid input', async () => {
    // Arrange
    const invalidData = {
      name: 123, // should be string
      category_id: 1,
      transaction_type_id: 1,
      amount: '3.99',
      user_id: 23,
      transaction_date: '2025-06-02T12:00:00Z',
      notes: '',
    };

    // Act
    const response = await request(app)
      .post(TEST_END_POINT)
      .send(invalidData)
      .expect(400);

    // Assert
    expect(response.body.message).toBe('Invalid input');
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['name'],
          message: 'Expected string, received number',
        }),
      ]),
    );
    expect(transactionService.createTransaction).not.toHaveBeenCalled();
  });

  it('should return 400 and correctly validate missing fields', async () => {
    // Arrange
    const invalidData = {
      name: 'bubble tea',
      // category_id missing
      transaction_type_id: 1,
      amount: '3.99',
      user_id: 23,
      transaction_date: '2025-06-02T12:00:00Z',
      notes: '',
    };

    // Act
    const response = await request(app)
      .post(TEST_END_POINT)
      .send(invalidData)
      .expect(400);

    // Assert
    expect(response.body.message).toBe('Invalid input');
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['category_id'],
          message: 'Required',
        }),
      ]),
    );
    expect(transactionService.createTransaction).not.toHaveBeenCalled();
  });
});
