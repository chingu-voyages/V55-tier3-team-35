import rateLimit from 'express-rate-limit';

const registerLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message:
    'Too many account creation attempts, please try again after 15 minutes.',
  statusCode: 429, // Too Many Requests
  headers: true, // inform the client about their current rate limiting status with RateLimit-related headers
});

export default registerLimiter;
