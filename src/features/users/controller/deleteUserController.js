import User from "../model/userModel.js";
import { isValidUserId } from "../validators/userValidation.js";

export const deleteUserController = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidUserId(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
