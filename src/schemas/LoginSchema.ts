import { z } from 'zod';

export const LoginSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid Email"),
    password: z.string()
    .min(8, "Password must be 8+ characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),            
  })