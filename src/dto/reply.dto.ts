import z from "zod";

export const VoteDTO = z.object({
  pollId: z.string().min(1, { message: "Poll is required" }),
  optionId: z.string().min(1, { message: "option is required" }),
});
