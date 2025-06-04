import request from 'supertest';
import { vi, expect, describe, beforeEach, it } from 'vitest';

vi.mock('../../src/services/user.service.ts', () => {
  return {
    userService: {
      updateUserDetails: vi.fn(),
    },
  };
});

import createApp from '../../src/app/createApp';
import { userService } from '../../src/services/user.service';

const app = createApp();
const TEST_END_POINT = '/api/v1/user/me';

describe('User controller', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
  });

  it('should update user details successfully with valid data', async () => {
    const validUserData = {
      userId: 12,
      firstName: 'John',
      lastName: 'Doe',
      defaultCurrencyId: 1,
    };

    (
      userService.updateUserDetails as ReturnType<typeof vi.fn>
    ).mockResolvedValue(undefined);

    const response = await request(app)
      .patch(TEST_END_POINT)
      .send(validUserData)
      .expect(200);

    expect(response.body).toEqual({
      message: 'User profile updated successfully.',
    });

    expect(userService.updateUserDetails).toHaveBeenCalledTimes(1);
    expect(userService.updateUserDetails).toHaveBeenCalledWith(validUserData);
  });

  it('should return 400 for missing fields', async () => {
    const invalidUserData = {
      firstName: 'John',
      lastName: 'Doe',
      // required userId field missing
    };

    const response = await request(app)
      .patch(TEST_END_POINT)
      .send(invalidUserData)
      .expect(400);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid input');

    expect(userService.updateUserDetails).not.toHaveBeenCalled();
  });

  it('should return 400 for invalid input', async () => {
    const invalidTypeData = {
      userId: '123', // should be integer
      firstName: null, // should be string
      lastName: undefined, // should be string
      defaultCurrencyId: [], // should be integer
    };

    const response = await request(app)
      .patch(TEST_END_POINT)
      .send(invalidTypeData)
      .expect(400);

    expect(response.body.message).toBe('Invalid input');
    expect(userService.updateUserDetails).not.toHaveBeenCalled();
  });

  it('should handle service errors gracefully', async () => {
    const validUserData = {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      defaultCurrencyId: 1,
    };

    const serviceError = new Error('Database connection failed');
    (
      userService.updateUserDetails as ReturnType<typeof vi.fn>
    ).mockRejectedValue(serviceError);

    const response = await request(app)
      .patch(TEST_END_POINT)
      .send(validUserData);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
    expect(userService.updateUserDetails).toHaveBeenCalledTimes(1);
    expect(userService.updateUserDetails).toHaveBeenCalledWith(validUserData);
  });

  it('should handle empty request body', async () => {
    const response = await request(app)
      .patch(TEST_END_POINT)
      .send({})
      .expect(400);

    expect(response.body.message).toBe('Invalid input');
    expect(userService.updateUserDetails).not.toHaveBeenCalled();
  });
});
