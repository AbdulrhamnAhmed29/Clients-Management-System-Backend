import Ticket from "../model/ticketModel.js";
import { createTicketSchema } from "../validators/createTicketValidation.js";

export const createTicketController = async (req, res, next) => {
  const validation = createTicketSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid ticket data",
      errors: validation.error.issues.map(({ path, message }) => ({
        field: path.join("."),
        message,
      })),
    });
  }

  const { ticketNumber, queueId, customerName, customerPhone, status } =
    validation.data;

  try {
    const ticket = await Ticket.create({
      ticketNumber,
      queueId,
      customerName,
      customerPhone,
      status,
    });

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