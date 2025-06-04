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

describe('Currency Controller', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
  });

  it('should return a list of currencies', async () => {
    // Arrange
    (
      currencyService.getAllCurrencies as ReturnType<typeof vi.fn>
    ).mockResolvedValue([{ name: 'US Dollar', symbol: '$', code: 'USD' }]);

    // Act
    const response = await request(app).get('/api/v1/currencies');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(currencyService.getAllCurrencies).toHaveBeenCalledTimes(1);
  });

  it('should return empty array', async () => {
    //Arrange
    (
      currencyService.getAllCurrencies as ReturnType<typeof vi.fn>
    ).mockResolvedValue([]);

    // Act
    const response = await request(app).get('/api/v1/currencies');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.data).length(0);
    expect(response.body.message).toBe('No currencies found.');
  });

  it('should return a 500 error if the service failed', async () => {
    // Arrange
    const errorMessage = 'Internal Server Error';
    (
      currencyService.getAllCurrencies as ReturnType<typeof vi.fn>
    ).mockRejectedValue(new Error(errorMessage));

    // Act
    const response = await request(app).get('/api/v1/currencies');

    // Assert
    expect(response.status).toBe(500);
    expect(response.body.message).toBe(errorMessage);
  });
});
