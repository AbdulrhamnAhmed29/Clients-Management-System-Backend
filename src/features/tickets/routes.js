import { Router } from "express";
import { validateBody } from "../../middlewares/createMiddlewares.js";
import { createTicketController } from "./controller/createTicketController.js";
import { getTicketController } from "./controller/getTicketController.js";
import { getTicketById } from "./controller/getTicketById.js";
import { createTicketSchema } from "./validators/createTicketValidation.js";

export const ticketRouter = Router();

ticketRouter.get("/", getTicketController);
ticketRouter.get("/:id", getTicketById);
ticketRouter.post(
  "/",
  validateBody(createTicketSchema),
  createTicketController
);