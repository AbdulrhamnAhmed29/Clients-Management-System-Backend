import Ticket from "../model/ticketModel.js";

const objectIdPattern = /^[a-f\d]{24}$/i;

export const getTicketController = async (req, res, next) => {
  const { queueId } = req.query;

  if (
    queueId !== undefined &&
    (typeof queueId !== "string" || !objectIdPattern.test(queueId))
  ) {
    return res.status(400).json({
      message: "Invalid queueId",
    });
  }

  try {
    const filter = queueId ? { queueId } : {};
    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    return next(error);
  }
};