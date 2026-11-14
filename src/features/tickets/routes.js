import { Router } from "express";
import { validateBody } from "../../middlewares/createMiddlewares.js";
import { createTicketController } from "./controller/createTicketController.js";
import { getTicketController } from "./controller/getTicketController.js";
import { getTicketById } from "./controller/getTicketById.js";
import { createTicketSchema } from "./validators/createTicketValidation.js";
import { authenticated } from "../../auth/middlewares/authnticated.js";
import { authorized } from "../../auth/middlewares/authorized.js";

export const ticketRouter = Router();

ticketRouter.get("/",authenticated, authorized("admin" ), getTicketController);
ticketRouter.get("/:id", getTicketById);
ticketRouter.post(
  "/",
  validateBody(createTicketSchema),
  createTicketController
);