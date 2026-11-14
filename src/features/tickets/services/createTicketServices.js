import Queue from "../../queues/model/queueModel.js";
import Ticket from "../model/ticketModel.js";

export const createTicketServices = async (ticketData) => {
    const data = ticketData;
    // UPDATE LAST TICKET NUMBER
    const updateQueue = await Queue.findOneAndUpdate(
        //id
        { _id: data.queueId },
        // increment
        { $inc: { lastTicketNumber: 1 } },
        { new: true }
    )

    //IF NOT FOUND QUEUE THROW ERROR
    if (!updateQueue) {
        throw new Error("QUEUE_NOT_FOUND");
    }
    const ticketNumber = updateQueue.lastTicketNumber;

    // SEND TICKET DATA
    const ticket = await Ticket.create({ ...data, ticketNumber })
    return ticket

}