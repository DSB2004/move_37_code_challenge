import z from "zod";

const OptionDTO = z.object({
  option: z.string().min(1, { message: "option is required" }),
});

const CreateDTO = z.object({
  pollId: z.string().min(1, { message: "pollId is required" }),
  options: z
    .array(OptionDTO)
    .min(1, { message: "Atleast one option is required" }),
});

const UpdateDTO = z.object({
  option: z.string().min(1, { message: "option is required" }),
});

export { CreateDTO, UpdateDTO };
