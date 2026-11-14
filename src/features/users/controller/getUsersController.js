import User from "../model/userModel.js";
import { listUsersQuerySchema } from "../validators/userValidation.js";

export const getUsersController = async (req, res, next) => {
  const validation = listUsersQuerySchema.safeParse(req.query);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid user query",
      errors: validation.error.issues.map(({ path, message }) => ({
        field: path.join("."),
        message,
      })),
    });
  }

  const { cursor, limit, role } = validation.data;
  const filter = role ? { role } : {};

  if (cursor) {
    filter._id = { $gt: cursor }
  }

  let hasMore = false;

  try {
    const [users] = await Promise.all([
      User.find(filter)
        .select(" role name")
        .sort({ createdAt: -1 })
        .limit(limit + 1),
    ]);
    if (users.length > limit) {
      hasMore = true;
      users.pop();
    }

    const nextCursor = hasMore ? users[users.length - 1]._id : null
    return res.status(200).json({
      users,
      nextCursor

    });
  } catch (error) {
    return next(error);
  }
};
