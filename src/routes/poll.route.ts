import { Router } from "express";
import { validate } from "../middleware/dto.middleware";
import {
  createController,
  updateController,
  deleteController,
  searchController,
  retrieveController,
  shareController,
} from "../controller/poll.controller";
import { CreateDTO, ShareDTO, UpdateDTO } from "../dto/poll.dto";
export const pollRouter = Router();

pollRouter.post("/", validate(CreateDTO), createController);
pollRouter.get("/", searchController);
pollRouter.get("/:id", retrieveController);
pollRouter.post("/:id/share", validate(ShareDTO), shareController);
pollRouter.patch("/:id", validate(UpdateDTO), updateController);
pollRouter.delete("/:id", deleteController);
