import rateLimit from 'express-rate-limit';

const userLimiter = (
  timeout: number = 5 * 60 * 1000,
  maxRequests: number = 25,
) => {
  return rateLimit({
    windowMs: timeout,
    max: maxRequests,
    message: 'Too many requests, please try again later.',
    keyGenerator: (req) => {
      return req.user?.userId?.toString() || req.ip || 'unknown';
    },
    statusCode: 429,
    headers: true,
  });
};

export default userLimiter;
