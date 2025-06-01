/* eslint-disable import/order */
import request from 'supertest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import createApp from '../../src/app/createApp';

vi.mock('../../src/services/currency.service', () => {
  return {
    currencyService: {
      getAllCurrencies: vi.fn(),
    },
  };
});

import { currencyService } from '../../src/services/currency.service';

const app = createApp();

describe('global error handler', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
  });

  it('should handle service layer errors', async () => {
    (
      currencyService.getAllCurrencies as ReturnType<typeof vi.fn>
    ).mockRejectedValue(new Error('currency service error'));
    const response = await request(app).get('/api/v1/currencies/');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });
});
