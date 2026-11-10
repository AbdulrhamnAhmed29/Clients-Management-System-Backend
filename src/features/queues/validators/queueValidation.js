import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Must be a valid MongoDB ObjectId");

const queueStatusSchema = z.enum(["active", "paused", "closed"]);

export const createQueueSchema = z.object({
  name: z.string().trim().min(1, "Queue name is required").max(100),
  description: z.string().trim().max(500).optional(),
  createdBy: objectIdSchema,
  status: queueStatusSchema.optional(),
});

export const updateQueueSchema = z
  .object({
    name: z.string().trim().min(1, "Queue name cannot be empty").max(100),
    description: z.string().trim().max(500),
    status: queueStatusSchema,
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const listQueuesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: queueStatusSchema.optional(),
});
