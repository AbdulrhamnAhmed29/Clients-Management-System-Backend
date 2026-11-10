import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: Number,
      required: true,
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
      enum: [
        "waiting",
        "serving",
        "completed",
        "skipped",
        "cancelled",
      ],
      default: "waiting",
    },

    calledAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Unique ticket number inside each queue
ticketSchema.index(
  { queueId: 1, ticketNumber: 1 },
  { unique: true }
);

// Optimize waiting tickets queries
ticketSchema.index({
  queueId: 1,
  status: 1,
  ticketNumber: 1,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;