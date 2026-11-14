import { Tenant } from "../model/model.js";
import { isValidTenantId } from "../validators/TenantSchemaValidate.js";

export const updateTenantController = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidTenantId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid tenant ID",
    });
  }

  try {
    const tenant = await Tenant.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tenant updated successfully",
      data: tenant,
    });
  } catch (error) {
    return next(error);
  }
};
