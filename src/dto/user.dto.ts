import z from "zod";

const LoginDTO = z.object({
  email: z.email({ message: "Please add a valid email" }),
  redirectURL: z.url({ message: "Please add a valid redirect url" }),
});

const VerifyDTO = z.object({
  authToken: z.string().min(1, { message: "Auth Token missing" }),
});

const AccountDTO = z.object({
  bio: z
    .string()
    .min(10, { message: "Bio needs to be atleast 10 character long" }),
  username: z.string().min(1, { message: "Username is required" }),
});

export { VerifyDTO, LoginDTO, AccountDTO };
