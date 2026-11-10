import { z } from "zod";

export const createTicketSchema = z.object({
  ticketNumber: z.number().int().positive("ticketNumber must be a positive integer"),
  queueId: z
    .string()
    .regex(/^[a-f\d]{24}$/i, "queueId must be a valid MongoDB ObjectId"),
  customerName: z.string().trim().min(1, "customerName is required"),
  customerPhone: z.string().trim().optional(),
  status: z
    .enum(["waiting", "serving", "completed", "skipped", "cancelled"])
    .default("waiting"),
});
