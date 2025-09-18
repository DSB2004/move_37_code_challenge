import { Router } from "express";
import { validate } from "../middleware/dto.middleware";
import { AccountDTO } from "../dto/user.dto";

import {
  accountController,
  retrieveController,
  searchController,
} from "../controller/user.controller";

export const userRouter = Router();

userRouter.patch("/", validate(AccountDTO), accountController);
userRouter.get("/", retrieveController);
userRouter.get("/search", searchController);
