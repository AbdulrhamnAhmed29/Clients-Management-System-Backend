import { Router } from "express";
import { validateBody } from "../../middlewares/createMiddlewares.js";
import { createTicketController } from "./controller/createTicketController.js";
import { createTicketSchema } from "./validators/createTicketValidation.js";

export const ticketRouter = Router();

ticketRouter.post(
  "/",
  validateBody(createTicketSchema),
  createTicketController
);