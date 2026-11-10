import { Router } from "express";
import { validateBody } from "../../middlewares/createMiddlewares.js";
import { createUserController } from "./controller/createUserController.js";
import { deleteUserController } from "./controller/deleteUserController.js";
import { getUserByIdController } from "./controller/getUserByIdController.js";
import { getUsersController } from "./controller/getUsersController.js";
import { updateUserController } from "./controller/updateUserController.js";
import {
  createUserSchema,
  updateUserSchema,
} from "./validators/userValidation.js";

export const userRouter = Router();

userRouter
  .route("/")
  .get(getUsersController)
  .post(validateBody(createUserSchema), createUserController);

userRouter
  .route("/:id")
  .get(getUserByIdController)
  .patch(validateBody(updateUserSchema), updateUserController)
  .delete(deleteUserController);