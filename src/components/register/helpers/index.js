import { z } from "zod";

export const registrationFormSchema = z
  .object({
    role: z.string({
      required_error: "Please select a role",
    }),
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
