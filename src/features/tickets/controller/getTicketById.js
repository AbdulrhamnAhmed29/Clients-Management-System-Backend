import Ticket from "../model/ticketModel.js";

const objectIdPattern = /^[a-f\d]{24}$/i;

export const getTicketById = async (req, res, next) => {
  const { id } = req.params;

  if (!objectIdPattern.test(id)) {
    return res.status(400).json({
      message: "Invalid ticket ID",
    });
  }

  try {
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    return res.status(200).json({ ticket });
  } catch (error) {
    return next(error);
  }
};