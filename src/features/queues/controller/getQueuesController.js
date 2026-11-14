import Queue from "../model/queueModel.js";
import { listQueuesQuerySchema } from "../validators/queueValidation.js";

export const getQueuesController = async (req, res, next) => {
  const validation = listQueuesQuerySchema.safeParse(req.query);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid queue query",
      errors: validation.error.issues.map(({ path, message }) => ({
        field: path.join("."),
        message,
      })),
    });
  }

  const { page, limit, status } = validation.data;
  const filter = status ? {
    status,
    createdBy,
  } : {};

  try {
    const [queues, total] = await Promise.all([
      Queue.find(filter)
        .sort({ createdAt: -1 })
        .limit(limit),
      Queue.countDocuments(filter),
    ]);

    return res.status(200).json({
      queues,
    
    });
  } catch (error) {
    return next(error);
  }
};
