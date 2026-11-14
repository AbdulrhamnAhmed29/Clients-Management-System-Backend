import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: Number,
      required: true,
    },
    tenantId: {
      type: mongoose.Types.ObjectId,
      ref: "Tenant"
    },
    queueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Queue",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["waiting", "completed", "skipped", "cancelled"],
      default: "waiting",
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    dateString: {
      type: String,
      required: true,
      index: true,
    },

  },
  { timestamps: true }
);

ticketSchema.index({ queueId: 1, dateString: 1, ticketNumber: 1 }, { unique: true });
ticketSchema.index({ queueId: 1, dateString: 1, status: 1, ticketNumber: 1 });

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;