import { Router } from "express";
import { validateBody } from "../../middlewares/createMiddlewares.js";
import { createQueueController } from "./controller/createQueueController.js";
import { deleteQueueController } from "./controller/deleteQueueController.js";
import { getQueueByIdController } from "./controller/getQueueByIdController.js";
import { getQueuesController } from "./controller/getQueuesController.js";
import { updateQueueController } from "./controller/updateQueueController.js";
import {
  createQueueSchema,
  updateQueueSchema,
} from "./validators/queueValidation.js";

export const queueRouter = Router();

queueRouter
  .route("/")
  .get(getQueuesController)
  .post(validateBody(createQueueSchema), createQueueController);

queueRouter
  .route("/:id")
  .get(getQueueByIdController)
  .patch(validateBody(updateQueueSchema), updateQueueController)
  .delete(deleteQueueController);