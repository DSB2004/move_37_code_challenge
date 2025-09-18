import { Request, Response } from "express";
import { logIn } from "../services/auth/login.service";
import z from "zod";
import {
  ForgetDTO,
  LoginDTO,
  ResetDTO,
  SignupDTO,
  VerifyDTO,
} from "../dto/auth.dto";
import { signUp } from "../services/auth/signup.service";
import { forget } from "../services/auth/forget.service";
import { reset } from "../services/auth/reset.service";
import { verify } from "../services/auth/verify.service";

export const loginController = async (req: Request, res: Response) => {
  const data = req.body as z.infer<typeof LoginDTO>;
  const { status, ...rest } = await logIn({ ...data });
  return res.status(status).json(rest);
};

export const signUpController = async (req: Request, res: Response) => {
  const data = req.body as z.infer<typeof SignupDTO>;
  const { status, ...rest } = await signUp({ ...data });
  return res.status(status).json(rest);
};

export const verifyController = async (req: Request, res: Response) => {
  const data = req.body as z.infer<typeof VerifyDTO>;
  const { status, ...rest } = await verify({ ...data });
  return res.status(status).json(rest);
};

export const forgetController = async (req: Request, res: Response) => {
  const data = req.body as z.infer<typeof ForgetDTO>;
  const { status, ...rest } = await forget({ ...data });
  return res.status(status).json(rest);
};

export const resetController = async (req: Request, res: Response) => {
  const data = req.body as z.infer<typeof ResetDTO>;
  const { status, ...rest } = await reset({ ...data });
  return res.status(status).json(rest);
};
