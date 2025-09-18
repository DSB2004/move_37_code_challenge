import { Router } from "express";
import { validate } from "../middleware/dto.middleware";
import {
  createController,
  updateController,
  deleteController,
} from "../controller/option.controller";
import { CreateDTO, UpdateDTO } from "../dto/option.dto";
export const optionRouter = Router();

optionRouter.post("/", validate(CreateDTO), createController);
optionRouter.patch("/:id", validate(UpdateDTO), updateController);
optionRouter.delete("/:id", deleteController);
