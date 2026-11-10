import Queue from "../model/queueModel.js";

export const createQueueController = async (req, res, next) => {
  try {
    const queue = await Queue.create(req.body);

    return res.status(201).json({
      message: "Queue created successfully",
      queue,
    });
  } catch (error) {
    return next(error);
  }
};
