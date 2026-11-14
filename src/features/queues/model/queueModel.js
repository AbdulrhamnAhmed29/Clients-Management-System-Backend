import mongoose from "mongoose";

const queueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
    },

    status: {
      type: String,
      enum: ["active", "paused", "closed"],
      default: "active",
    },

    lastTicketNumber: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Queue = mongoose.model("Queue", queueSchema);

export default Queue;