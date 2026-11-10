import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import { handleDuplicateEmail, toPublicUser } from "./userControllerHelpers.js";

export const createUserController = async (req, res, next) => {
  try {
    const user = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 12),
    });

    return res.status(201).json({
      message: "User created successfully",
      user: toPublicUser(user),
    });
  } catch (error) {
    if (handleDuplicateEmail(error, res)) {
      return;
    }

    return next(error);
  }
};
