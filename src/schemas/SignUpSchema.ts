import { z } from 'zod';
import { isValidPhoneNumber } from "react-phone-number-input";

export const SignUpSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid Email"),
    password: z.string()
                .min(8, "Password must be 8+ characters")
                .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),            
    confirmPassword: z.string().min(8, "Confirm Password must be 8+ characters"),
    subDomain: z.string().min(3, "Workspace name must be 3+ characters"),
    companyName: z.string().optional(),
    country: z.string().min(2, "Atleast 2 letter is required"),
    phone: z.string().refine((v) => isValidPhoneNumber(v), "Invalid phone number"),
    website: z.string(),
    // industry: z.string().min(1, "Industry is Required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  })

export type SignUpType = z.infer<typeof SignUpSchema>;