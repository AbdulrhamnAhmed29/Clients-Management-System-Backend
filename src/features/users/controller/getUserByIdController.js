import User from "../model/userModel.js";
import { isValidUserId } from "../validators/userValidation.js";
import { toPublicUser } from "./userControllerHelpers.js";

export const getUserByIdController = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidUserId(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: toPublicUser(user) });
  } catch (error) {
    return next(error);
  }
};
