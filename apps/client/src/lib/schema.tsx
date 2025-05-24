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
      .regex(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character',
      )
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
      .max(30, { message: 'Password must be less than 30 characters' })
      .regex(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character',
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  username: z
    .string()
    .min(5, { message: 'Username must be at least 5 characters' })
    .max(30, { message: 'Username must be less than 30 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(30, { message: 'Password must be less than 30 characters' })
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character',
    )
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
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
