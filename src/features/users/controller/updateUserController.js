import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import { isValidUserId } from "../validators/userValidation.js";
import { handleDuplicateEmail, toPublicUser } from "./userControllerHelpers.js";

export const updateUserController = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidUserId(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 12);
    }

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: toPublicUser(user),
    });
  } catch (error) {
    if (handleDuplicateEmail(error, res)) {
      return;
    }

    return next(error);
  }
};
