
import { createTicketServices } from "../services/createTicketServices.js";
import { createTicketSchema } from "../validators/createTicketValidation.js";
export const createTicketController = async (req, res, next) => {
  const validation = createTicketSchema.safeParse(req.body);
  const data = validation.data;
  try {
    const ticket = await createTicketServices(data)
    return res.status(201).json({
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A ticket with this number already exists in this queue",
      });
    }
    return next(error);
  }
};