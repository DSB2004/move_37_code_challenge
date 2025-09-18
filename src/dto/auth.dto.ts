import z from "zod";

const SignupDTO = z.object({
  email: z.email({ message: "Please add a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
  redirectURL: z.url({ message: "Please add a valid redirect url" }),
});

const LoginDTO = z.object({
  email: z.email({ message: "Please add a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
  redirectURL: z.url({ message: "Please add a valid redirect url" }),
});

const VerifyDTO = z.object({
  authToken: z.string().min(1, { message: "Auth Token missing" }),
});

const ForgetDTO = z.object({
  email: z.email({ message: "Please add a valid email" }),
  redirectURL: z.url({ message: "Please add a valid redirect url" }),
});

const ResetDTO = z.object({
  authToken: z.string().min(1, { message: "Auth Token missing" }),
  password: z.string().min(1, { message: "Password missing" }),
});

export { VerifyDTO, LoginDTO, SignupDTO, ForgetDTO, ResetDTO };
