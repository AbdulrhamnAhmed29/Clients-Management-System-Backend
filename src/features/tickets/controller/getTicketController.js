import Ticket from "../model/ticketModel.js";

const objectIdPattern = /^[a-f\d]{24}$/i;

export const getTicketController = async (req, res, next) => {
  const { queueId, limit, cursor } = req.query;

  if (
    queueId !== undefined &&
    (typeof queueId !== "string" || !objectIdPattern.test(queueId))
  ) {
    return res.status(400).json({
      message: "Invalid queueId",
    });
  }
  if (
    cursor !== undefined &&
    (typeof cursor !== "string" || !objectIdPattern.test(cursor))
  ) {
    return res.status(400).json({
      message: "Invalid cursor", // وغيرت كمان رسالة الخطأ عشان تبقى دقيقة مش Invalid queueId
    });
  }

  let hasMore = false;
  try {
    const filter = queueId ? { queueId: queueId } : {};
    if (cursor) {
      filter._id = { $gt: cursor }
    }
    const tickets = await Ticket.find(filter).sort({ createdAt: 1 })
      .limit(limit + 1).select("customerName ticketNumber status")

    if (tickets.length > limit) {
      hasMore = true;
      tickets.pop()
    }
    const nextCursor = hasMore ? tickets[tickets.length - 1]._id : null
    return res.status(200).json({
      count: tickets.length,
      tickets: tickets,
      nextCursor: nextCursor 
    });
  } catch (error) {
    return next(error);
  }
};