import { Router } from "express";
import { validate } from "../middleware/dto.middleware";

import {
  retrieveController,
  voteController,
} from "../controller/vote.controller";
import { VoteDTO } from "../dto/reply.dto";

export const voteRouter = Router();

voteRouter.put("/:id", validate(VoteDTO), voteController);
voteRouter.get("/:id", retrieveController);
