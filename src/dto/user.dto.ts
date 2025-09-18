import z from "zod";

const AccountDTO = z.object({
  bio: z
    .string()
    .min(10, { message: "Bio needs to be atleast 10 character long" }),
  username: z.string().min(1, { message: "Username is required" }),
});

export { AccountDTO };
