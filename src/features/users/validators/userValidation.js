import { z } from "zod";

const userRoleSchema = z.enum(["admin", "employee"]);
const passwordSchema = z.string().min(8, "Password must be at least 8 characters");

export const isValidUserId = (id) => /^[a-f\d]{24}$/i.test(id);

export const createUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("A valid email is required").toLowerCase(),
  password: passwordSchema,
  role: userRoleSchema.optional(),
});

export const updateUserSchema = z
  .object({
    name: z.string().trim().min(1, "Name cannot be empty").max(100),
    email: z.string().trim().email("A valid email is required").toLowerCase(),
    password: passwordSchema,
    role: userRoleSchema,
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  role: userRoleSchema.optional(),
});
