import { Router } from "express";
import { validateBody } from "../middlewares/createMiddlewares.js";
import { createUserSchema } from "../features/users/validators/userValidation.js";
import { loginController } from "./controller/loginController.js";
import { registerController } from "./controller/registerController.js";
import { loginSchema } from "./validators/loginValidation.js";
import { authenticated } from "./middlewares/authnticated.js";
import { authorized } from "./middlewares/authorized.js";

export const AuthRoutes = Router();

AuthRoutes.post(
  "/register",
  authenticated,
  authorized("super_admin"),
  validateBody(createUserSchema),
  registerController
);
AuthRoutes.post("/login", validateBody(loginSchema), loginController);