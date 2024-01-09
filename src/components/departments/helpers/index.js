import { z } from "zod";

export const departmentFormSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  description: z
    .string()
    .max(100, { message: "Must not exceed 100 characters" }),
});
