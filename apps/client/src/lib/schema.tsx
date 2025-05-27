import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(5, { message: 'Username must be at least 5 characters' })
      .max(30, { message: 'Username must be less than 30 characters' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(30, { message: 'Password must be less than 30 characters' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(30, { message: 'Password must be less than 30 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const userDetailsForm = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  default_currency: z
    .string()
    .min(1, { message: 'Default currency is required' }),
  monthly_budget: z.number().min(1, { message: 'Monthly budget is required' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type RegisterSchema = z.infer<typeof registerSchema>;

export type UserDetailsForm = z.infer<typeof userDetailsForm>;
