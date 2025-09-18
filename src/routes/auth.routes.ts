import { Router } from "express";
import { validate } from "../middleware/dto.middleware";
import {
  LoginDTO,
  VerifyDTO,
  SignupDTO,
  ForgetDTO,
  ResetDTO,
} from "../dto/auth.dto";
import {
  loginController,
  signUpController,
  verifyController,
  resetController,
  forgetController,
} from "../controller/auth.controller";
export const authRouter = Router();

authRouter.post("/login", validate(LoginDTO), loginController);
authRouter.post("/signup", validate(SignupDTO), signUpController);
authRouter.post("/verify", validate(VerifyDTO), verifyController);
authRouter.post("/password/forget", validate(ForgetDTO), forgetController);
authRouter.post("/password/reset", validate(ResetDTO), resetController);
