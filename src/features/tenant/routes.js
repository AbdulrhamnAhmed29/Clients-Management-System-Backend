import {Router} from "express"
import { validateBody } from "../../middlewares/createMiddlewares.js";
import { createTenantSchema } from "./validators/createTenantSchemaValidate.js";
import { authenticated } from "../../auth/middlewares/authnticated.js";
import { authorized } from "../../auth/middlewares/authorized.js";
import { createTenantController } from "./controllers/createTenantController.js";
export const tenantRouter = Router();

tenantRouter.post("/",
    authenticated,
    authorized("super_admin"),
    validateBody(createTenantSchema),
    createTenantController
)