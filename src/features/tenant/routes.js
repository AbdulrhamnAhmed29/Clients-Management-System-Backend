import { Router } from "express";
import { validateBody } from "../../middlewares/createMiddlewares.js";
import {
  createTenantSchema,
  updateTenantSchema,
} from "./validators/TenantSchemaValidate.js";
import { authenticated } from "../../auth/middlewares/authnticated.js";
import { authorized } from "../../auth/middlewares/authorized.js";
import { createTenantController } from "./controllers/createTenantController.js";
import { updateTenantController } from "./controllers/updateTenantController.js";
import { deleteTenantController } from "./controllers/deleteTenantController.js";
import { getTenantByIdController } from "./controllers/getTenantByIdController.js";
import { getTenantsController } from "./controllers/getTenantsController.js";

export const tenantRouter = Router();

tenantRouter.post(
  "/",
  authenticated,
  authorized("super_admin"),
  validateBody(createTenantSchema),
  createTenantController
);

tenantRouter.get(
  "/",
  authenticated,
  authorized("super_admin"),
  getTenantsController
);

tenantRouter.get(
  "/:id",
  authenticated,
  authorized("super_admin"),
  getTenantByIdController
);

tenantRouter.patch(
  "/:id",
  authenticated,
  authorized("super_admin"),
  validateBody(updateTenantSchema),
  updateTenantController
);

tenantRouter.delete(
  "/:id",
  authenticated,
  authorized("super_admin"),
  deleteTenantController
);