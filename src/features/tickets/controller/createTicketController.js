import Queue from "../../queues/model/queueModel.js";
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

  const {
    queueId,
    customerName,
    customerPhone,
    status,
    scheduledAt,
  } = validation.data;

  try {

    const updateQueue = await Queue.findOneAndUpdate({ _id: queueId },
      { $inc: { lastTicketNumber: 1 } },
      { new: true }
    )
    if (!updateQueue) {
      return res.status(404).json({ message: "Queue not found" });
    }
    const ticketNumber = updateQueue.lastTicketNumber;
    const ticket = await Ticket.create({
      ticketNumber: ticketNumber,
      queueId,
      customerName,
      customerPhone,
      status,
      scheduledAt,
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