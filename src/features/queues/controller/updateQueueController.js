import Queue from "../model/queueModel.js";

const objectIdPattern = /^[a-f\d]{24}$/i;

export const updateQueueController = async (req, res, next) => {
  const { id } = req.params;

  if (!objectIdPattern.test(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid queue ID",
    });
  }

  if (!req.user?.tenantId) {
    return res.status(403).json({
      success: false,
      message: "Tenant context is required",
    });
  }

  try {
    const queue = await Queue.findOneAndUpdate(
      { _id: id, tenantId: req.user.tenantId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Queue updated successfully",
      queue,
    });
  } catch (error) {
    return next(error);
  }
};
