import { Tenant } from "../model/model.js";
import { listTenantsQuerySchema } from "../validators/TenantSchemaValidate.js";

export const getTenantsController = async (req, res, next) => {
  const validation = listTenantsQuerySchema.safeParse(req.query);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid tenant query",
      errors: validation.error.issues.map(({ path, message }) => ({
        field: path.join("."),
        message,
      })),
    });
  }

  const { cursor, limit } = validation.data;
  const filter = cursor ? { _id: { $lt: cursor } } : {};

  try {
    const tenants = await Tenant.find(filter)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .lean();

    const hasMore = tenants.length > limit;
    if (hasMore) {
      tenants.pop();
    }

    return res.status(200).json({
      success: true,
      data: tenants,
      pagination: {
        limit,
        hasMore,
        nextCursor: hasMore ? tenants[tenants.length - 1]._id.toString() : null,
      },
    });
  } catch (error) {
    return next(error);
  }
};
