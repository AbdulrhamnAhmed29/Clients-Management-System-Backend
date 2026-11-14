import Queue from "../model/queueModel.js";

export const createQueueController = async (req, res, next) => {
  try {
    const queueData = {
      ...req.body,
      createdBy: req.user.id,
    }
    const queue = await Queue.create(queueData);
    return res.status(201).json({
      message: "Queue created successfully",
      queue
    });
  } catch (error) {
    return next(error);
  }
};
