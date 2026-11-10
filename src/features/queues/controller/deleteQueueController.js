import Queue from "../model/queueModel.js";

const objectIdPattern = /^[a-f\d]{24}$/i;

export const deleteQueueController = async (req, res, next) => {
  const { id } = req.params;

  if (!objectIdPattern.test(id)) {
    return res.status(400).json({ message: "Invalid queue ID" });
  }

  try {
    const queue = await Queue.findByIdAndDelete(id);

    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    return res.status(200).json({
      message: "Queue deleted successfully",
      queue,
    });
  } catch (error) {
    return next(error);
  }
};
